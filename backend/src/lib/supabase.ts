import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_KEY!;

if (!url || !serviceKey) {
  throw new Error('SUPABASE_URL and SUPABASE_*_KEY must be set in .env');
}

export const supabase = createClient(url, serviceKey);