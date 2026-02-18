"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const LOCALES = routing.locales as readonly string[];
type Locale = (typeof LOCALES)[number];

export function useLocaleToggle(): {
  locale: Locale;
  setLocale: (next: Locale) => void;
  locales: readonly Locale[];
} {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
  };

  return { locale, setLocale, locales: LOCALES };
}
