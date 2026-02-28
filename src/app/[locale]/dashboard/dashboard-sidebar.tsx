"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { type LucideIcon, LayoutDashboard, X } from "lucide-react";

function isActive(href: string, pathname: string): boolean {
  return pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
}

const DASHBOARD_NAV_ITEMS: {
  href: string;
  labelKey: "title";
  icon: LucideIcon;
}[] = [{ href: "/dashboard", labelKey: "title", icon: LayoutDashboard }];

type DashboardSidebarProps = {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

export function DashboardSidebar({
  mobileOpen = false,
  onMobileClose,
}: DashboardSidebarProps) {
  const t = useTranslations("Dashboard");
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex min-h-0 flex-col border-r bg-muted/30 px-3 py-4 transition-transform duration-200 ease-out",
        "fixed inset-y-0 left-0 z-50 h-full w-56 -translate-x-full md:relative md:translate-x-0 md:min-h-0 md:flex-1 md:self-stretch",
        mobileOpen && "translate-x-0"
      )}
      aria-hidden={!mobileOpen}
    >
      {onMobileClose && (
        <div className="mb-3 flex justify-end border-b border-border/50 pb-3 md:hidden">
          <button
            type="button"
            onClick={onMobileClose}
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label={t("closeMenu")}
          >
            <X className="size-5" />
          </button>
        </div>
      )}
      <nav className="flex flex-col gap-1">
        {DASHBOARD_NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onMobileClose}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive(href, pathname)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {t(labelKey)}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
