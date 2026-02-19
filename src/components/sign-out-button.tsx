"use client";

import { useClerk } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { isClerkConfigured } from "@/lib/auth/config";
import { MockSignOutButton } from "@/mocks/auth";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";

function ClerkSignOutButton(props: ButtonProps) {
  const t = useTranslations("Header");
  const { signOut } = useClerk();
  const locale = useLocale();
  return (
    <Button {...props} onClick={() => signOut({ redirectUrl: `/${locale}` })}>
      {t("signOut")}
    </Button>
  );
}

/** Shared Sign out button: signs out (Clerk or mock) and redirects to the landing page. Used in header and dashboard. */
export function SignOutButton(props: ButtonProps) {
  return isClerkConfigured() ? (
    <ClerkSignOutButton {...props} />
  ) : (
    <MockSignOutButton {...props} />
  );
}
