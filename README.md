# Next.js 16 Starter — SaaS base

Next.js 16 boilerplate with App Router, TypeScript, Tailwind v4, Shadcn/ui, Motion, next-intl (en/es), Clerk + Supabase (with mocks when env vars are missing), and dark/light theme. Intended as a **base for future SaaS projects**: DRY, clean code, full i18n, and shared patterns.

**Vercel ready** — Deploy as-is by connecting your GitHub repo to [Vercel](https://vercel.com); set env vars in the project settings. No code changes required.

**AI agents** — The **`docs/`** folder holds specs and context for AI tools (overview, agent rules, quick references). See **`docs/README.md`** for the index and **`docs/AGENT_RULES.md`** before changing the request pipeline or auth.

## Stack

- **Framework:** Next.js 16.1.6 (App Router, Turbopack, Server Components)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 (CSS-first, no `tailwind.config.js`)
- **UI:** Shadcn/ui + Lucide React
- **Animations:** Motion v12
- **i18n:** next-intl 4.7 (en / es, locale from `src/i18n/routing.ts`)
- **Auth:** Clerk (mocks when `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` not set)
- **DB/Backend:** Supabase (mocks when `NEXT_PUBLIC_SUPABASE_*` not set)
- **Package manager:** bun (or npm)

## Conventions

- **No hardcoded copy** — All user-facing text lives in `messages/en.json` and `messages/es.json` and is used via `useTranslations` / `getTranslations` (next-intl).
- **DRY** — Single source of truth for locales (`routing.locales`), auth config (`lib/auth/config`), DB config (`lib/db/config`, including `getSupabaseAnonKey()`), shared UI (e.g. `AuthPageLayout`, `MockAuthFallback`, `SignOutButton` for header and dashboard).
- **Clean structure** — Feature-oriented under `app/[locale]/`, shared components in `components/`, config and mocks in `lib/`.

## Setup

1. Install dependencies:

   ```bash
   bun install
   # or: npm install
   ```

2. (Optional) Configure Clerk and Supabase via `.env.local`:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
   CLERK_SECRET_KEY=sk_...

   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
   # or NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```

   Mock mode is **per service**: auth mock when Clerk env is not set; DB mock when Supabase env is not set. They can be combined (e.g. real Clerk + mock Supabase). See `.env.example` for the variables; the decision is made in `src/lib/auth/config.ts` (Clerk) and `src/lib/db/config.ts` (Supabase). Without Clerk keys: mock auth (start signed out; use "Go to dashboard" on the sign-in page to sign in; dashboard protected by client guard). Without Supabase keys: mock Supabase (no-op client). Set the keys to enable real auth and real backend.

3. Run dev:

   ```bash
   bun run dev
   # or: npm run dev
   ```

4. Build:

   ```bash
   bun run build
   # or: npm run build
   ```

## Scripts

- `bun run dev` — Start dev server (Turbopack)
- `bun run build` — Production build
- `bun run start` — Start production server
- `bun run lint` — Biome (lint)
- `bun run type-check` — `tsc --noEmit`
- `bun run format` — Biome (format, write)
- `bun run format:check` — Biome (format, check only)
- `npm audit` — Dependency audit (must pass with no vulnerabilities).

## Structure

- `src/app/[locale]/` — App Router with locale (en, es); dashboard has sidebar (`dashboard-sidebar.tsx`) and nav config
- `src/components/` — UI (header, theme/locale toggles, landing hero, auth-page-layout, sign-out-button)
- `src/components/ui/` — Shadcn components; `dropdown-option-toggle` for locale/theme toggles
- `src/hooks/` — `useTheme`, `useLocaleToggle` (locales from `routing.locales`)
- `src/lib/` — `utils`, `auth` (config, Clerk appearance), `db` (Supabase config and client creators)
- `src/mocks/` — Mock UI and logic: `auth/` (provider, guard, fallbacks, buttons), `db/` (Supabase client)
- `src/i18n/` — next-intl routing, request, navigation; `locale.ts` for `LocalePageProps`, `getLocale()`
- `messages/` — `en.json`, `es.json` (namespaces: HomePage, Dashboard, Header, ThemeToggle, LocaleToggle, AuthMock)
- `src/proxy.ts` — Next.js 16 request pipeline (next-intl + Clerk dashboard protection when Clerk env is set). Do not add `middleware.ts`; Next.js 16 uses the proxy convention only.

## i18n

- **Locales** are defined in `src/i18n/routing.ts`; add new locales there and in each `messages/{locale}.json`.
- **Message keys** are grouped by feature (e.g. `Header`, `Dashboard`, `AuthMock`). Use `useTranslations("Namespace")` in client components and `getTranslations("Namespace")` in server components.
- **No copy in code** — Avoid hardcoding strings; add keys to both language files.

See **`docs/README.md`** for a short doc index and pointers for AI agents or future specs.

## Features

- **Landing** — Hero, CTAs (Get started, Sign in), footer (all i18n)
- **Sign-in / Sign-up** — Clerk when configured; shared `MockAuthFallback` in mock mode (i18n)
- **Dashboard** — Sidebar with nav (Dashboard link; extend via `DASHBOARD_NAV_ITEMS`). Protected when Clerk configured (layout redirect); in mock mode protected by client guard (`src/mocks/auth/dashboard-mock-guard.tsx`). Sign out (shared `SignOutButton`) redirects to landing. Supabase status (configured vs mock) with i18n. Sample **items table**: reads from Supabase `items` (or empty with mock); same code path for both. See docs for creating the table in Supabase.
- **Header** — Logo, locale toggle, theme toggle, UserButton or mock Sign in / Sign out (i18n). Sign out redirects to landing.
- **Dark/light** — next-themes, `ThemeToggle` component
