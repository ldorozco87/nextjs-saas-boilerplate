"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  message: string;
  ctaLabel: string;
} & ({ ctaHref: string } | { onCtaClick: () => void });

export function MockAuthFallback({ message, ctaLabel, ...cta }: Props) {
  const hasHref = "ctaHref" in cta;
  const hasClick = "onCtaClick" in cta;
  if (process.env.NODE_ENV === "development" && hasHref === hasClick) {
    throw new Error(
      "MockAuthFallback: provide exactly one of ctaHref or onCtaClick"
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <p className="text-center text-muted-foreground">{message}</p>
      {hasClick ? (
        <Button onClick={cta.onCtaClick}>{ctaLabel}</Button>
      ) : (
        <Button asChild>
          <Link href={cta.ctaHref}>{ctaLabel}</Link>
        </Button>
      )}
    </main>
  );
}
