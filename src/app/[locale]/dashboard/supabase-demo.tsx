import { getTranslations } from "next-intl/server";
import { isSupabaseConfigured } from "@/lib/db/config";

export async function SupabaseDemo() {
  const configured = isSupabaseConfigured();
  const t = await getTranslations("Dashboard");
  const status = configured ? t("supabaseConfigured") : t("supabaseMock");
  return (
    <p className="mt-4 text-sm text-muted-foreground">Supabase: {status}.</p>
  );
}
