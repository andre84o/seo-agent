// Supabase Client Setup
// Konfigurerar Supabase client för server-side användning

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Hämta env-variabler utan att kasta vid import (undviker build-fel)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Skapa Supabase client med service role (full access)
export const supabase: any = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Anon client för UI (med RLS)
export function createAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  return createClient<Database>(url, anon);
}
