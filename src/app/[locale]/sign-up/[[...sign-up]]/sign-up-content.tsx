"use client";

import { SignUp } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { isClerkConfigured } from "@/lib/auth/config";
import { clerkAppearance } from "@/lib/auth/constants";
import { AuthPageLayout } from "@/components/auth-page-layout";
import { MockAuthFallback } from "@/components/mock-auth-fallback";

export function SignUpPageContent() {
  const locale = useLocale();
  const t = useTranslations("AuthMock");

  if (isClerkConfigured()) {
    return (
      <AuthPageLayout>
        <SignUp
          appearance={clerkAppearance}
          afterSignUpUrl={`/${locale}/dashboard`}
          signInUrl={`/${locale}/sign-in`}
        />
      </AuthPageLayout>
    );
  }

  return (
    <MockAuthFallback
      message={t("message")}
      ctaLabel={t("backToSignIn")}
      ctaHref="/sign-in"
    />
  );
}
