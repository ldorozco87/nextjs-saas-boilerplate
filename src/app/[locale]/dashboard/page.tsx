import { getTranslations } from "next-intl/server";
import { getLocale, type LocalePageProps } from "@/i18n/locale";
import { SupabaseDemo } from "./supabase-demo";
import { SignOutButton } from "@/components/sign-out-button";

export default async function DashboardPage({ params }: LocalePageProps) {
  await getLocale(params);
  const t = await getTranslations("Dashboard");

  return (
    <main className="flex-1 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("welcome")}</p>
        <SupabaseDemo />
        <SignOutButton variant="outline" className="mt-6" />
      </div>
    </main>
  );
}
