"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useMockAuth } from "./provider";
import { MockAuthFallback } from "./mock-auth-fallback";

export function MockSignInFallback() {
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
