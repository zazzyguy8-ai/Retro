import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Env vars with hardcoded fallbacks (anon key is public by design)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pnjbnfpmwnxjdlaxplcs.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_KYxSoFEFkMl8ibVF3V4i1Q_XuGqJwfp";

const isConfigured = supabaseUrl.startsWith("http") && supabaseAnonKey.length > 0;

export const supabase: SupabaseClient = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (new Proxy({} as SupabaseClient, {
      get: () => () => ({ data: null, error: { message: "Supabase not configured" } }),
    }) as SupabaseClient);

export { isConfigured as supabaseConfigured };
