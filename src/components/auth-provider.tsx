"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { MockAuthProvider } from "@/lib/auth/mock";
import { isClerkConfigured } from "@/lib/auth/config";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (isClerkConfigured()) {
    return (
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      >
        {children}
      </ClerkProvider>
    );
  }
  return <MockAuthProvider>{children}</MockAuthProvider>;
}
