import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseAnonKey, isSupabaseConfigured } from "../config";
import { createMockSupabaseClient } from "@/mocks/db";

export async function createClient() {
  if (!isSupabaseConfigured()) {
    return createMockSupabaseClient() as Awaited<
      ReturnType<typeof createServerClient>
    >;
  }
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    getSupabaseAnonKey(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll from Server Component; ignore if middleware refreshes sessions
          }
        },
      },
    }
  );
}
