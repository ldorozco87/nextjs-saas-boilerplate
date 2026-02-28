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

## Scripts

- Use `bun run <script>` or `npm run <script>`; both are supported (see root README).

## Before changing request pipeline or auth

- Check existing docs: `docs/README.md` (overview), this file (agent rules), root `README.md` (structure and setup).
- Do not assume older Next.js conventions (e.g. `middleware.ts`) without confirming the project's Next version and current setup.
