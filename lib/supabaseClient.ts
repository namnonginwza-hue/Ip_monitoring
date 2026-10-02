import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// ป้องกันการสร้าง Supabase Instance ซ้ำขณะ Fast Refresh ใน Next.js
const globalForSupabase = globalThis as unknown as {
  supabase: ReturnType<typeof createClient>
}

export const supabase =
  globalForSupabase.supabase || createClient(supabaseUrl, supabaseAnonKey)

if (process.env.NODE_ENV !== 'production') globalForSupabase.supabase = supabase