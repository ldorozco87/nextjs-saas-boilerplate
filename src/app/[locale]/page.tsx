import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getLocale, type LocalePageProps } from "@/i18n/locale";
import { LandingHero } from "@/components/landing-hero";

export default async function HomePage({ params }: LocalePageProps) {
  await getLocale(params);
  const t = await getTranslations("HomePage");

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      <LandingHero title={t("title")} subtitle={t("subtitle")}>
        <Button size="lg" type="button">
          {t("cta")}
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/sign-in">{t("signIn")}</Link>
        </Button>
      </LandingHero>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        {t("footer")}
      </footer>
    </main>
  );
}
