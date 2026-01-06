import 'dotenv/config';
import express from 'express';
import { Request, Response } from "express";
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import auth from './middleware/auth';

import authRouter from './routes/auth';
import servicesRouter from './routes/services';
import usuariosRouter from './routes/usuarios';
import testimonialsRouter from './routes/testimonials';
import consultasRouter from './routes/agendar_consultas';
import turnosRouter from './routes/turnos';

const app = express();
app.use(morgan('combined'));
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"],
      frameAncestors: ["'none'"],
    }
  } : false,
  hsts: process.env.NODE_ENV === 'production' ? { maxAge: 31536000, includeSubDomains: true } : undefined,
}));

const frontendOrigin = process.env.FRONTEND_URL || 'http://localhost:8080';
if (frontendOrigin) {
  app.use(cors({ 
    origin: frontendOrigin || process.env.FRONTEND_URL, 
    credentials: true,
    allowedHeaders: ['Content-Type', 'X-CSRF-Token'],
    exposedHeaders: ['X-CSRF-Token']
    }));
} else {
  // fallback during development
  app.use(cors({ origin: '*' }));
}

app.use(express.json());
app.use(cookieParser());

const csrfMiddleware = csurf({
  cookie: {
    httpOnly: true,
    sameSite: 'lax', // 'none' si tenés dominios distintos y secure:true
    secure: false, // para desarrollo, despues cambiarlo 
  }
});


app.use((req: Request, res: Response, next: any) => {
  const publicPaths = [
    '/api/usuarios',
    '/api/auth/login',
    '/api/auth/logout',
    '/health',
  ];

  if (publicPaths.includes(req.path)) {
    return next();
  }

  return csrfMiddleware(req, res, next);
});

app.get('/health', (_req: Request, res: Response) => res.send('ok'));

// ruta de ejemplo protegida
app.get('/api/profile', auth, (req, res) => {
  const anyReq = req as any;
  const user = anyReq.authUser ?? anyReq.user;
  return res.json({ user });
});

// auth (login) endpoint
app.use('/api/auth', authRouter);

app.use('/api/services', servicesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/agendar_consultas', consultasRouter);
app.use('/api/turnos', turnosRouter);

// CSRF error handler
app.use((err: any, req: any, res: any, next: any) => {
  if (err && err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next(err);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening ${PORT}`));
