import { Router, Request, Response } from "express";
import { supabase } from "../lib/supabase";
import { sanitize } from "../lib/sanitize";
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { createAccountLimiter } from '../middleware/rateLimit';

const router = Router();

// GET usuarios 
router.get("/", async (req: Request, res: Response) => {
  try {
    const email = req.query.email ? sanitize(String(req.query.email)) : null;

    if (email) {
      const { data, error } = await supabase
        .from("usuarios")
        .select("id, email, name")
        .eq("email", email)
        .maybeSingle();

      if (error || !data) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      return res.json(data);
    }

    // Nunca devolver password
    const { data, error } = await supabase
      .from("usuarios")
      .select("id, email, name");

    if (error) {
      console.error("Supabase error fetching usuarios:", error);
      return res.status(500).json({ error: "Error interno" });
    }

    res.json(data);
  } catch (err: any) {
    console.error("Unexpected error in GET /api/usuarios:", err?.stack || err);
    res.status(500).json({ error: "Error interno", details: String(err?.message || err) });
  }
});

// GET usuario por id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const { data, error } = await supabase
      .from("usuarios")
      .select("id, email, name")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(data);
  } catch (err: any) {
    console.error("Unexpected error in GET /api/usuarios/:id:", err?.stack || err);
    res.status(500).json({ error: "Error interno", details: String(err?.message || err) });
  }
});

// Crear usuario
const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100).optional(),
  password: z.string().min(8),
  authUserId: z.string().optional(),
});

router.post("/", createAccountLimiter, async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Datos inválidos', details: parsed.error.format() });
    }

    const { email, name, password, authUserId } = parsed.data;

    const insertPayload: any = { email };
    if (name) insertPayload.name = name;
    if (authUserId) insertPayload.id = authUserId;
    // inicializar contadores de bloqueo
    insertPayload.failed_login_attempts = 0;
    insertPayload.locked_until = null;
    if (password) {
      // politica de contraseña: al menos 8 caracteres ya validado por zod; ademas se requiere al menos una letra y un numero
      const strong = /(?=.*[A-Za-z])(?=.*\d)/.test(password);
      if (!strong) {
        return res.status(400).json({ error: 'La contraseña debe contener letras y números.' });
      }
      const hashed = await bcrypt.hash(password, 10);
      insertPayload.password = hashed;
    }

    const { data, error } = await supabase
      .from("usuarios")
      .insert(insertPayload)
      .select("id, email, name")
      .single();

    if (error) {
      console.error("Supabase error creating usuario:", error);
      return res.status(500).json({ error: "No se pudo crear perfil" });
    }

    res.status(201).json(data);
  } catch (err: any) {
    console.error("Unexpected error in POST /api/usuarios:", err?.stack || err);
    res.status(500).json({ error: "Error interno", details: String(err?.message || err) });
  }
});

// Borrar usuario
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const { data, error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id", id)
      .select("id")
      .maybeSingle();

    if (error || !data) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ deleted: true });
  } catch (err: any) {
    console.error("Unexpected error in DELETE /api/usuarios/:id:", err?.stack || err);
    res.status(500).json({ error: "Error interno", details: String(err?.message || err) });
  }
});

export default router;
