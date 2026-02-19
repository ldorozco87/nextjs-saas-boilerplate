"use client";

import { SignIn } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { isClerkConfigured } from "@/lib/auth/config";
import { clerkAppearance } from "@/lib/auth/constants";
import { MockSignInFallback } from "@/mocks/auth";
import { AuthPageLayout } from "@/components/auth-page-layout";

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
