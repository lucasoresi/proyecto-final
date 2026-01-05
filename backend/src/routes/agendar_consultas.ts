import { Router, Response, Request } from "express";
import { supabase } from "../lib/supabase";
import { sanitize } from "../lib/sanitize";
import auth, { AuthenticatedRequest } from "../middleware/auth";

const router = Router();

// GET todas (solo campos públicos)
router.get("/", async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("agendar_consultas")
      .select("*");

    if (error) {
      console.error("Supabase error fetching agendar_consultas:", error);
      return res.status(500).json({ error: "Error interno" });
    }

    res.json(data);
  } catch (err: any) {
    console.error("Unexpected error in GET /api/agendar_consultas:", err?.stack || err);
    res.status(500).json({ error: "Error interno", details: String(err?.message || err) });
  }
});

// GET por id
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  try {
    const { data, error } = await supabase
      .from("agendar_consultas")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Supabase error fetching agendar_consultas by id:", error);
      return res.status(500).json({ error: "Error interno" });
    }

    if (!data) return res.status(404).json({ error: "No encontrado" });
    res.json(data);
  } catch (err: any) {
    console.error("Unexpected error in GET /api/agendar_consultas/:id:", err?.stack || err);
    res.status(500).json({ error: "Error interno", details: String(err?.message || err) });
  }
});

// CREAR consulta (AUTH + VALIDACIÓN)
router.post("/", auth, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.authUser) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { name, email, phone, date, modalidad } = req.body;

  if (!name || !email || !phone || !date || !modalidad) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const payload = {
    name: sanitize(name),
    email: sanitize(email),
    phone,
    date,
    modalidad: sanitize(modalidad),
    user_id: req.authUser.id,
  };

  try {
    const { data, error } = await supabase
      .from("agendar_consultas")
      .insert(payload)
      .select("id, name, email, phone, date, modalidad")
      .single();

    if (error) {
      console.error("Supabase error inserting agendar_consulta:", error);
      return res.status(500).json({ error: "No se pudo crear" });
    }

    res.status(201).json(data);
  } catch (err: any) {
    console.error("Unexpected error in POST /api/agendar_consultas:", err?.stack || err);
    res.status(500).json({ error: "Error interno", details: String(err?.message || err) });
  }
});

router.delete("/:id", auth, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.authUser) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const { error } = await supabase
      .from("agendar_consultas")
      .delete()
      .eq("id", id)
      .eq("user_id", req.authUser.id);

    if (error) {
      console.error("Supabase error deleting agendar_consulta:", error);
      return res.status(404).json({ error: "No encontrado" });
    }

    res.json({ deleted: true });
  } catch (err: any) {
    console.error("Unexpected error in DELETE /api/agendar_consultas/:id:", err?.stack || err);
    res.status(500).json({ error: "Error interno", details: String(err?.message || err) });
  }
});

export default router;
