# Project docs

This folder is the **entry point for project documentation and specs**. Use it as a dictionary or index: link here further specs, ADRs, or agent instructions for AI tools.

**Purpose:** Next.js 16 boilerplate for SaaS apps (App Router, i18n, auth, DB). Stack: Next 16, TypeScript, Tailwind, next-intl, Clerk, Supabase—with mocks when `.env` is not set. Mock (auth or DB) is activated per service according to the variables in `src/lib/auth/config.ts` and `src/lib/db/config.ts`; see `.env.example`.

**For AI agents:** See **[AGENT_RULES.md](AGENT_RULES.md)** before changing the request pipeline, auth, or Next.js conventions (e.g. do not add `middleware.ts`; this project uses `proxy.ts` only in Next.js 16).

**Quick references:**

- **Lint & format:** Biome (see root README → Scripts)
- **Auth (Clerk vs mock):** `src/lib/auth/config.ts`, `src/lib/auth/constants.ts`, `src/components/auth-provider.tsx`
- **DB (Supabase vs mock):** `src/lib/db/config.ts` (`isSupabaseConfigured()`, `getSupabaseAnonKey()`), `src/lib/db/supabase/client.ts` and `server.ts`, `src/lib/db/mock.ts`
- **i18n:** `src/i18n/routing.ts`, `messages/*.json`
- **Structure:** `src/app/[locale]/` (pages), `src/components/`, `src/lib/`
- **Request pipeline:** `src/proxy.ts` (Next.js 16; do not add `middleware.ts`)

**Mock mode (auth):** When Clerk is not configured, the app uses in-memory mock auth. Initial state is signed out (`user === null`). User must go to the sign-in page and click "Go to dashboard" to "sign in" and access the dashboard. The dashboard is protected in mock mode by a client guard ([dashboard-mock-guard.tsx](../src/app/[locale]/dashboard/dashboard-mock-guard.tsx)), not by the proxy (the proxy does not protect routes when in mock). Sign out uses the shared [SignOutButton](../src/components/sign-out-button.tsx) (header and dashboard) and redirects to the landing page. Mock session does not persist on refresh (state is lost).

See the root **README** for setup, conventions, and scripts.
