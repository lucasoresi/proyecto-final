import { Router } from 'express';
import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { adminOnly } from '../middleware/admin';
import authMiddleware, { AuthenticatedRequest } from '../middleware/auth';
import { sanitize } from '../lib/sanitize';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('testimonials').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'invalid id' });
  const { data, error } = await supabase.from('testimonials').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
});

// Crear testimonial
router.post('/', authMiddleware, async (req: AuthenticatedRequest, res) => {
  if (!req.authUser) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const { name, location, body, rating } = req.body;

  if (!body || typeof body !== 'string') {
    return res.status(400).json({ error: 'content required' });
  }

  const payload = {
    name: sanitize(name),
    location: sanitize(location),
    body: sanitize(body),
    rating: Number(rating) || null,
    user_id: req.authUser.id,
    created_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('testimonials')
    .insert(payload)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// Borrar testimonial por id
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'invalid id' });

  const { data, error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ deleted: data });
});

export default router;