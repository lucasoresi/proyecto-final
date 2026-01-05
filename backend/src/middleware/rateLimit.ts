import rateLimit from "express-rate-limit";
import type { RequestHandler } from "express";

export const loginLimiter: RequestHandler = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        error: "Demasiados intentos. Intentá más tarde."
    }
});

export const createAccountLimiter: RequestHandler = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 5,
    message: { error: 'Demasiados registros desde esta IP. Intentá más tarde.' }
});

export const sensitiveLimiter: RequestHandler = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { error: 'Demasiadas solicitudes. Intentá más tarde.' }
});
