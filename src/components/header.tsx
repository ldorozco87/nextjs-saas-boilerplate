"use client";

import { UserButton } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/auth/config";
import { clerkAppearance } from "@/lib/auth/constants";
import { useMockAuth } from "@/lib/auth/mock";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/sign-out-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggle } from "@/components/locale-toggle";
import { useTranslations } from "next-intl";

function MockAuthButton() {
  const t = useTranslations("Header");
  const { user } = useMockAuth();

  if (user) {
    return <SignOutButton variant="outline" size="sm" />;
  }

  return (
    <Button variant="outline" size="sm" asChild>
      <Link href="/sign-in">{t("signIn")}</Link>
    </Button>
  );
}

export function Header() {
  const t = useTranslations("Header");

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-semibold">
          {t("logo")}
        </Link>
        <nav className="flex items-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
          {isClerkConfigured() ? (
            <UserButton afterSignOutUrl="/" appearance={clerkAppearance} />
          ) : (
            <MockAuthButton />
          )}
        </nav>
      </div>
    </header>
  );
}
