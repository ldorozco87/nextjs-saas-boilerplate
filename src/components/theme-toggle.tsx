"use client";

import { useTheme } from "@/hooks/use-theme";
import { DropdownOptionToggle } from "@/components/ui/dropdown-option-toggle";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("ThemeToggle");

  return (
    <DropdownOptionToggle
      menuId="header-theme-menu"
      trigger={
        <>
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </>
      }
      ariaLabel={t("ariaLabel")}
      options={[
        { value: "light", label: t("light"), icon: <Sun /> },
        { value: "dark", label: t("dark"), icon: <Moon /> },
        { value: "system", label: t("system"), icon: <Monitor /> },
      ]}
      value={(theme ?? "system") as "light" | "dark" | "system"}
      onValueChange={setTheme}
    />
  );
}
