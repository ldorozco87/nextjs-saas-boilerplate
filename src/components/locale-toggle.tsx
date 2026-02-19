"use client";

import { useLocaleToggle } from "@/hooks/use-locale-toggle";
import { DropdownOptionToggle } from "@/components/ui/dropdown-option-toggle";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";

export function LocaleToggle() {
  const { locale, setLocale, locales } = useLocaleToggle();
  const t = useTranslations("LocaleToggle");

  return (
    <DropdownOptionToggle
      menuId="header-locale-menu"
      trigger={<Languages className="size-4" />}
      ariaLabel={t("ariaLabel")}
      options={locales.map((l) => ({ value: l, label: t(l) }))}
      value={locale}
      onValueChange={setLocale}
    />
  );
}
