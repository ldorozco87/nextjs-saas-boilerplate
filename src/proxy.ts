import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routing } from "./i18n/routing";
import { isClerkConfigured } from "@/lib/auth/config";

const i18nMiddleware = createMiddleware(routing);
const dashboardPaths = routing.locales.flatMap(
  (locale) => [`/${locale}/dashboard`, `/${locale}/dashboard/(.*)`] as const
);
const isProtectedRoute = createRouteMatcher(dashboardPaths);

function createProxy() {
  if (!isClerkConfigured()) {
    return (req: NextRequest) => i18nMiddleware(req);
  }
  return clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();
    return i18nMiddleware(req);
  });
}

export default createProxy();

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
