# Best practices

This document is the reference for project best practices and technical conventions by layer. For mandatory rules that AI agents must follow, see **[AGENT_RULES.md](AGENT_RULES.md)**.

---

## Frontend

- **Components:** Use Shadcn/ui as the base: reuse or extend components in `src/components/ui/`. Register new reusable components in [COMPONENT_DICTIONARY.md](COMPONENT_DICTIONARY.md). Prefer composition and reuse over new one-off components.
- **State:** Use **Zustand** for global client state (UI, view preferences). Use **TanStack Query** for API state (fetching, caching, mutations). Do not use React Context for global state when Zustand is sufficient.
- **i18n:** All user-visible text must be translated. Use namespaces in `messages/en.json` and `messages/es.json`; in client components use `useTranslations("Namespace")`, in server components use `getTranslations("Namespace")`. Do not hardcode copy in code.
- **Styling:** Tailwind CSS; mobile-first and responsive layouts (fluid units, flex/grid, media or container queries). Align with the rules in AGENT_RULES (mobile-first, no fixed widths that break on small viewports).
- **Client vs Server:** Use `"use client"` only when needed (hooks, interactivity, browser APIs). Prefer Server Components for initial data load when appropriate; use TanStack Query in client components when you need refetch, cache, or mutations.

---

## Backend

- **Next.js App Router:** Prefer Server Actions and Route Handlers for API surface. Do not duplicate business logic in the client; keep it in server code.
- **Supabase:** Use the server client from `src/lib/db/supabase/server.ts` in Server Components and server code; use the browser client from `client.ts` in client components. Always respect `src/lib/db/config.ts` (`isSupabaseConfigured()`, `getSupabaseAnonKey()`); do not check env elsewhere.
- **Auth:** Clerk when configured; mocks in `src/mocks/auth/`. Auth and mock decisions live only in `src/lib/auth/config.ts`; do not duplicate env checks.
- **Errors and validation:** Validate inputs at the boundary (Server Actions, Route Handlers). Return consistent response shapes and HTTP status codes; handle errors explicitly.

---

## Database design

- **Supabase / Postgres:** Use **snake_case** for table and column names. Enable RLS (Row Level Security) where appropriate for multi-tenant or user-scoped data.
- **Schema:** Document new tables (name, columns, relationships) when you introduce them—e.g. in this doc or in an ADR. Keep migrations reproducible.
- **Reference example:** The dashboard sample uses an `items` table with columns `id`, `name`, `created_at`. With Supabase configured, create this table (and RLS if needed) to see data; with mock, the table shows an empty state.

---

## References

- [README](../README.md) (root) — setup, structure, scripts
- [docs/README.md](README.md) — doc index and quick references
- [AGENT_RULES.md](AGENT_RULES.md) — mandatory rules for AI agents
- [COMPONENT_DICTIONARY.md](COMPONENT_DICTIONARY.md) — reusable components
- [shadcn/ui](https://ui.shadcn.com/) — UI component base
- [next-intl](https://next-intl-docs.vercel.app/) — i18n
