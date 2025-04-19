import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Obter as variáveis de ambiente do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be defined in environment variables")
}

// Criar e exportar o cliente Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
