import { getTranslations } from "next-intl/server";
import { getLocale, type LocalePageProps } from "@/i18n/locale";
import { SupabaseDemo } from "./supabase-demo";
import { DashboardTable } from "./dashboard-table";
import { SignOutButton } from "@/components/sign-out-button";

export default async function DashboardPage({ params }: LocalePageProps) {
  await getLocale(params);
  const t = await getTranslations("Dashboard");

  return (
    <main className="flex-1 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-xl font-bold sm:text-2xl">{t("title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-[length:inherit]">{t("welcome")}</p>
        <SupabaseDemo />
        <h2 className="mt-6 text-base font-semibold sm:text-lg">{t("tableTitle")}</h2>
        <DashboardTable />
        <SignOutButton variant="outline" className="mt-6" />
      </div>
    </main>
  );
}
