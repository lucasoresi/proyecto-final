import { Request, Response, NextFunction } from "express";

export function adminOnly(req: Request, res: Response, next: NextFunction) {
    const anyReq = req as any;
    const authUser = anyReq.authUser ?? anyReq.user;

    if (!authUser) {
        return res.status(401).json({ error: "No autorizado" });
    }

    const email = authUser.email;
    const isAdmin = (email === "equipopsipbbca@gmail.com");

    if (!isAdmin) {
        return res.status(403).json({ error: "Acceso denegado" });
    }

    next();
}
