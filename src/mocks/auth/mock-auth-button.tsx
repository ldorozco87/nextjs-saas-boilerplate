"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/sign-out-button";
import { useMockAuth } from "./provider";

export function MockAuthButton() {
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
