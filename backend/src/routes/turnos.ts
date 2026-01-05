import { Router } from 'express';
import { supabase } from '../lib/supabase';
import authMiddleware, { AuthenticatedRequest } from '../middleware/auth';
import { adminOnly } from '../middleware/admin';

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
  const user = (req as AuthenticatedRequest).authUser;
  if (!user) return res.status(401).json({ error: 'Missing token' });

  const query = supabase.from('turnos').select('*');

  if ((user as any).role !== 'admin') {
    query.eq('user_id', user.id);
  }

  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'invalid id' });

  const { data, error } = await supabase
    .from('turnos')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return res.status(404).json({ error: 'not found' });

  const user = (req as AuthenticatedRequest).authUser;
  if (!user) return res.status(401).json({ error: 'Missing token' });

  if ((user as any).role !== 'admin' && data.user_id !== user.id) {
    return res.status(403).json({ error: 'forbidden' });
  }

  res.json(data);
});

// Crear turno
router.post("/", authMiddleware, async (req: AuthenticatedRequest, res) => {
  const { fecha, hora } = req.body;

  if (!fecha || !hora) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const { data, error } = await supabase
    .from("turnos")
    .insert({
      fecha,
      hora,
      user_id: req.authUser!.id,
    })
    .select()
    .single();

  if (error) return res.status(500).json({ error: "Error interno" });
  res.status(201).json(data);
});

// Borrar turno por id
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'invalid id' });

  const { data, error } = await supabase
    .from('turnos')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ deleted: data });
});
export default router;