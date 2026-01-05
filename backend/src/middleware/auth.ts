import { Request, Response, NextFunction } from "express";
import { supabase } from "../lib/supabase";
import { AuthUser } from "../types/auth";
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  authUser?: AuthUser;
}

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const token = (req as any).cookies?.session_jwt;
  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  const secret = process.env.JWT_SECRET || 'dev-secret-change-me';
  let payload: any;

  try {
    payload = jwt.verify(token, secret);
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }

  const userId = Number(payload.sub);
  if (!userId) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const { data, error } = await supabase
    .from("usuarios")
    .select("id, email, name")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) {
    return res.status(401).json({ error: "Invalid token" });
  }

  (req as AuthenticatedRequest).authUser = {
    id: data.id, 
    email: data.email ?? undefined,
  };

  next();
}