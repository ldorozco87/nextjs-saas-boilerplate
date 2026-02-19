"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import { useMockAuth } from "./provider";
import { MOCK_SIGNING_OUT_KEY } from "./constants";

export function MockSignOutButton(props: ButtonProps) {
  const t = useTranslations("Header");
  const { signOut } = useMockAuth();
  const router = useRouter();
  return (
    <Button
      {...props}
      onClick={() => {
        sessionStorage.setItem(MOCK_SIGNING_OUT_KEY, "1");
        router.replace("/");
        signOut();
      }}
    >
      {t("signOut")}
    </Button>
  );
}
