"use client";

import { SignIn } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { isClerkConfigured } from "@/lib/auth/config";
import { clerkAppearance } from "@/lib/auth/constants";
import { useMockAuth } from "@/lib/auth/mock";
import { AuthPageLayout } from "@/components/auth-page-layout";
import { MockAuthFallback } from "@/components/mock-auth-fallback";

function MockSignInFallback() {
  const router = useRouter();
  const t = useTranslations("AuthMock");
  const { signIn } = useMockAuth();
  return (
    <MockAuthFallback
      message={`${t("message")} ${t("messageSignInHint")}`}
      ctaLabel={t("goToDashboard")}
      onCtaClick={() => {
        signIn();
        router.replace("/dashboard");
      }}
    />
  );
}

export function SignInPageContent() {
  const locale = useLocale();

  if (isClerkConfigured()) {
    return (
      <AuthPageLayout>
        <SignIn
          appearance={clerkAppearance}
          afterSignInUrl={`/${locale}/dashboard`}
          signUpUrl={`/${locale}/sign-up`}
        />
      </AuthPageLayout>
    );
  }

  return <MockSignInFallback />;
}
