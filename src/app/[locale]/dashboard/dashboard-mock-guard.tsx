"use client";

import { useRouter } from "@/i18n/navigation";
import { isClerkConfigured } from "@/lib/auth/config";
import { MOCK_SIGNING_OUT_KEY } from "@/lib/auth/constants";
import { useMockAuth } from "@/lib/auth/mock";
import { useEffect } from "react";

type Props = { children: React.ReactNode };

function MockDashboardGuardInner({ children }: Props) {
  const router = useRouter();
  const { user } = useMockAuth();

  useEffect(() => {
    if (!user) {
      if (
        typeof window !== "undefined" &&
        sessionStorage.getItem(MOCK_SIGNING_OUT_KEY)
      ) {
        sessionStorage.removeItem(MOCK_SIGNING_OUT_KEY);
        router.replace("/");
      } else {
        router.replace("/sign-in");
      }
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

/**
 * In mock mode, redirects to sign-in when there is no user (dashboard only for "logged in" users).
 * When Clerk is configured, renders children (layout already protects by redirecting unauthenticated users).
 */
export function DashboardMockGuard({ children }: Props) {
  if (isClerkConfigured()) {
    return <>{children}</>;
  }
  return <MockDashboardGuardInner>{children}</MockDashboardGuardInner>;
}
