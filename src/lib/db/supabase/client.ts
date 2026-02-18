import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseAnonKey, isSupabaseConfigured } from "../config";
import { createMockSupabaseClient } from "../mock";

export function createClient() {
  if (!isSupabaseConfigured()) {
    return createMockSupabaseClient() as ReturnType<typeof createBrowserClient>;
  }
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    getSupabaseAnonKey()
  );
}
