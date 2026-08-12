import { createClient } from '@supabase/supabase-js';

// En Lovable, estas variables se inyectan automáticamente al conectar
// el proyecto a Supabase (botón "Connect Supabase"). En local, crea un
// archivo .env con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // No lanzamos error para no romper el build; solo avisamos en consola.
  console.warn(
    '[Supabase] Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Conecta Supabase desde Lovable o crea un archivo .env.'
  );
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');
