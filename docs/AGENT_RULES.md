# Rules for AI agents

When editing this codebase, follow these rules to avoid breaking conventions or introducing errors.

## Next.js 16: proxy, not middleware

- **Do not add or use `middleware.ts`.** From Next.js 16, the request pipeline is configured via **`proxy.ts`** only.
- The single entry point for the pipeline is **`src/proxy.ts`**. It handles i18n (next-intl) and optional Clerk route protection. Do not create a `middleware.ts` that re-exports from proxy; Next.js will error if both exist.
- Reference: [Next.js middleware-to-proxy](https://nextjs.org/docs/messages/middleware-to-proxy).

## Mock mode (auth / DB)

- Mock mode (auth or DB) is decided only in **`src/lib/auth/config.ts`** and **`src/lib/db/config.ts`**. Do not duplicate env checks elsewhere; use `isClerkConfigured()` and `isSupabaseConfigured()` (and `getSupabaseAnonKey()` when creating Supabase clients).

## Mobile-first and responsive design

- The project is **mobile-first**. Design and implement layouts, components, and styles for small screens first, then enhance for larger breakpoints.
- All UI must be **responsive**: use fluid layouts, responsive units (e.g. `rem`, `%`, `clamp()`), and media queries or container queries where needed so the app works well on phones, tablets, and desktops.
- Avoid fixed widths that break on small viewports; prefer flex/grid and min/max constraints.

## Internationalization (i18n)

- **Always use i18n** for all user-facing text. Do not hardcode strings in code.
- Client components: `useTranslations("Namespace")` (next-intl). Server components: `getTranslations("Namespace")`.
- Add keys to **`messages/en.json`** and **`messages/es.json`** (and any other locale in `src/i18n/routing.ts`).
- Group keys by namespace/feature (e.g. Header, Dashboard, AuthMock). Reference: `src/i18n/routing.ts`, `messages/*.json`.

## TanStack Query (API state)

- **Use TanStack Query for all API state** (fetching, caching, mutations). In client components, prefer `useQuery` and `useMutation`; in server components you may keep direct fetch for initial load when that is sufficient.

## Components and dictionary

- **Reusing components is paramount.** Before creating a new component, check **`docs/COMPONENT_DICTIONARY.md`**. When you create a new reusable component, register it in that dictionary.

## UI components (Shadcn)

- **When creating new UI components**, use **Shadcn/ui** as the base: reuse existing components in **`src/components/ui/`** or add new ones from [shadcn/ui](https://ui.shadcn.com/) when needed (keeping project style and conventions).
- Do not introduce alternative component libraries without justification; keep a single primitive base (Shadcn + Tailwind).

## Zustand (global client state)

- Use **Zustand** for global client state (UI, view preferences, etc.). Do not use React Context for global state when Zustand is sufficient. Reserve TanStack Query for API state only.

## Scripts

- Use `bun run <script>` or `npm run <script>`; both are supported (see root README).

## Testing

- Write and maintain **unit and integration tests** with **Vitest** for logic, stores, and components that warrant them.
- Write **e2e tests** with **Playwright** for critical flows (e.g. login, main navigation).
- Follow the location and command conventions in **`docs/TESTING.md`**. When adding or changing features, add or update tests at the appropriate level.

## MCP

- You may use the project's MCP servers (**user-supabase**, **user-clerk**) when useful: apply migrations, run SQL, list tables/branches, or consult Clerk/Supabase documentation. Tool descriptors are available in the workspace (e.g. `mcps/` folder when present). Use them according to the MCP tool schema before calling any tool.

## Plan de integración (nuevo proyecto)

- When using this boilerplate to start a **new** project in a clean repo, follow the **PLAN.md** in the root. For Clerk + Supabase integration, follow **docs/setup/CLERK_SUPABASE.md**.
- Do not assume a `middleware.ts`-based pipeline; this project uses **`proxy.ts`** (Next.js 16).

## Before changing request pipeline or auth

- Check existing docs: `docs/README.md` (overview), this file (agent rules), root `README.md` (structure and setup).
- For changes that affect auth or how Supabase clients are created, also read **docs/setup/CLERK_SUPABASE.md** (third-party Clerk auth, `accessToken`-based clients).
- Do not assume older Next.js conventions (e.g. `middleware.ts`) without confirming the project's Next version and current setup.
