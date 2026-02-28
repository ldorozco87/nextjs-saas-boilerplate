"use client";

import { UserButton } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/auth/config";
import { clerkAppearance } from "@/lib/auth/constants";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MockAuthButton } from "@/mocks/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggle } from "@/components/locale-toggle";

export function Header() {
  const t = useTranslations("Header");

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
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
