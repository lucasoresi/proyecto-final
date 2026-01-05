import { Router } from "express";
import { Request, Response } from "express";
import { supabase } from "../lib/supabase";
import authMiddleware from "../middleware/auth";
import auth from "../middleware/auth";

const router = Router();
const TABLE = process.env.SUPABASE_SERVICES_TABLE || "services";

// GET todos (público)
router.get("/", async (_req: Request, res: Response) => {
  const { data, error } = await supabase.from(TABLE).select("*");
  if (error) return res.status(500).json({ error: "Error interno" });
  res.json(data);
});

// GET por id (público)
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select("id, nombre, descripcion, precio")
    .eq("id", id)
    .maybeSingle();

  if (!data) {
    return res.status(404).json({ error: "Servicio no encontrado" });
  }

  res.json(data);
});

// CREAR servicio (SOLO ADMIN)
router.post("/", auth, async (req, res) => {
  const { name, price } = req.body;
  if (!name || typeof price !== "number") {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert({ name, price })
    .select()
    .single();

  if (error) return res.status(500).json({ error: "No se pudo crear" });
  res.status(201).json(data);
});

// BORRAR servicio (SOLO ADMIN)
router.delete("/:id", authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(404).json({ error: "Servicio no encontrado" });
  }

  res.json({ deleted: true });
});

export default router;
