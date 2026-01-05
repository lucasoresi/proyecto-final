import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { loginLimiter } from '../middleware/rateLimit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });

const router = Router();

// POST /api/auth/login
router.post('/login', loginLimiter, async (req: Request, res: Response) => {
    try {
        if (process.env.NODE_ENV === 'production' && process.env.DISABLE_DEV_LOGIN === 'true') {
            return res.status(404).json({ error: 'Not found' });
        }

        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: 'Datos inválidos' });
        }

        const { email, password } = parsed.data;

        let data: any = null;
        try {
            const resp = await supabase
                .from('usuarios')
                .select('id, email, name, password, failed_login_attempts, locked_until')
                .eq('email', email)
                .maybeSingle();

            if (resp.error) throw resp.error;
            data = resp.data;

        } catch (err: any) {
            const msg = String(err?.message || err);
            if (/column .* does not exist/i.test(msg) || /42703/.test(msg)) {
                console.warn('Lockout columns missing, retrying login without them.');

                const fallback = await supabase
                    .from('usuarios')
                    .select('id, email, name, password')
                    .eq('email', email)
                    .maybeSingle();
                    
                if (fallback.error) {
                    console.error('Supabase error on login (fallback):', fallback.error);
                    return res.status(500).json({ error: 'Error interno' });
                }
                data = fallback.data;
            } else {
                console.error('Supabase error on login:', err);
                return res.status(500).json({ error: 'Error interno' });
            }
        }

        if (!data) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // configuracion de bloqueo de cuenta
        const MAX_ATTEMPTS = Number(process.env.LOCKOUT_MAX_ATTEMPTS) || 5;
        const LOCK_MINUTES = Number(process.env.LOCKOUT_DURATION_MIN) || 15;

        // si la cuenta esta bloqueada actualmente, rechazar de inmediato
        if (data.locked_until) {
            const lockedUntil = new Date(data.locked_until);
            if (lockedUntil > new Date()) {
                return res.status(403).json({ error: 'Cuenta bloqueada temporalmente', lockedUntil: lockedUntil.toISOString() });
            }
        }

        const hash = data.password ?? '';
        const match = await bcrypt.compare(password, hash);
        if (!match) {
            // incrementar los intentos fallidos y bloquear si se alcanza el limite
            const prev = Number(data.failed_login_attempts ?? 0);
            const attempts = prev + 1;
            const updates: any = { failed_login_attempts: attempts };
            if (attempts >= MAX_ATTEMPTS) {
                const until = new Date(Date.now() + LOCK_MINUTES * 60 * 1000).toISOString();
                updates.locked_until = until;
            }
            try {
                await supabase.from('usuarios').update(updates).eq('id', data.id);
            } catch (uErr) {
                console.error('Error al actualizar contadores de bloqueo:', uErr);
            }

            const remaining = Math.max(0, MAX_ATTEMPTS - attempts);
            return res.status(401).json({ error: 'Credenciales inválidas', attempts, remaining });
        }

        const user = { id: data.id, email: data.email, name: data.name };

        // inicio de sesion exitoso: reiniciar contadores
        try {
            await supabase.from('usuarios').update({ failed_login_attempts: 0, locked_until: null }).eq('id', data.id);
        } catch (resetErr) {
            console.error('Error al reiniciar contadores de inicio de sesión tras login exitoso:', resetErr);
        }

        const secret = process.env.JWT_SECRET || 'dev-secret-change-me';
        const token = jwt.sign({ sub: String(user.id), email: user.email }, secret, { expiresIn: '1d' });

        const cookieOptions: any = { httpOnly: true, sameSite: 'lax' };
        if (process.env.NODE_ENV === 'production') {
            cookieOptions.secure = true;
            cookieOptions.maxAge = 24 * 60 * 60 * 1000; // 1 dia
        }
        res.cookie('session_jwt', token, cookieOptions);
        res.json({ user });
    } catch (err: any) {
        console.error('Unexpected login error:', err?.stack || err);
        res.status(500).json({ error: 'Error interno' });
    }
});

export default router;

// GET /api/auth/me
router.get('/me', async (req: Request, res: Response) => {
    try {
        const token = req.cookies?.session_jwt;
        if (!token) return res.status(401).json({ error: 'No session' });
        const secret = process.env.JWT_SECRET || 'dev-secret-change-me';
        let payload: any = null;
        try {
            payload = jwt.verify(token, secret) as any;
        } catch (vErr) {
            return res.status(401).json({ error: 'No session' });
        }

        const userId = Number(payload.sub);
        const { data, error } = await supabase
            .from('usuarios')
            .select('id, email, name')
            .eq('id', userId)
            .maybeSingle();

        if (error || !data) return res.status(401).json({ error: 'No session' });
        res.json({ user: data });
    } catch (err) {
        console.error('Error on /api/auth/me', err);
        res.status(500).json({ error: 'Error interno' });
    }
});

// POST /api/auth/logout
router.post('/logout', (req: Request, res: Response) => {
    try {
        res.clearCookie('session_jwt');
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: 'Error interno' });
    }
});

// GET /api/auth/csrf-token
router.get('/csrf-token', (req: Request, res: Response) => {
    try {
        const token = req.csrfToken();
        res.json({ csrfToken: token });
    } catch (err) {
        console.error('Error generating CSRF token', err);
        res.status(500).json({ error: 'Error interno' });
    }
});
