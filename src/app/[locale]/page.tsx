import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getLocale, type LocalePageProps } from "@/i18n/locale";
import { LandingHero } from "@/components/landing-hero";

export default async function HomePage({ params }: LocalePageProps) {
  await getLocale(params);
  const t = await getTranslations("HomePage");

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col min-h-[calc(100dvh-3.5rem)]">
      <LandingHero title={t("title")} subtitle={t("subtitle")}>
        <Button size="lg" type="button">
          {t("cta")}
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/sign-in">{t("signIn")}</Link>
        </Button>
      </LandingHero>
      <footer className="border-t px-4 py-3 text-center text-sm text-muted-foreground sm:px-6 sm:py-4">
        {t("footer")}
      </footer>
    </main>
  );
}
