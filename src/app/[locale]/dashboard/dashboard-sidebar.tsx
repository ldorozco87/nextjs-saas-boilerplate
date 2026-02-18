"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { type LucideIcon, LayoutDashboard } from "lucide-react";

function isActive(href: string, pathname: string): boolean {
  return pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
}

const DASHBOARD_NAV_ITEMS: {
  href: string;
  labelKey: "title";
  icon: LucideIcon;
}[] = [{ href: "/dashboard", labelKey: "title", icon: LayoutDashboard }];

export function DashboardSidebar() {
  const t = useTranslations("Dashboard");
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r bg-muted/30 px-3 py-4">
      <nav className="flex flex-col gap-1">
        {DASHBOARD_NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => (
          <Link
            key={href}
            href={href}
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
