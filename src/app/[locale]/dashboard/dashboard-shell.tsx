"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { DashboardSidebar } from "./dashboard-sidebar";

type Props = {
  children: React.ReactNode;
};

export function DashboardShell({ children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("Dashboard");

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 items-stretch">
        <div
          role="presentation"
          aria-hidden={!mobileOpen}
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 md:hidden"
          style={{ opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? "auto" : "none" }}
          onClick={() => setMobileOpen(false)}
        />
        <div className="flex w-0 shrink-0 flex-col md:w-56 md:min-h-0 md:self-stretch">
          <DashboardSidebar
            mobileOpen={mobileOpen}
            onMobileClose={() => setMobileOpen(false)}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-12 shrink-0 items-center border-b bg-background px-4 md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label={t("openMenu")}
            >
              <Menu className="size-5" />
            </button>
          </div>
          <div className="min-h-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
