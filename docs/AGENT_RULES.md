# Rules for AI agents

When editing this codebase, follow these rules to avoid breaking conventions or introducing errors.

## Next.js 16: proxy, not middleware

- **Do not add or use `middleware.ts`.** From Next.js 16, the request pipeline is configured via **`proxy.ts`** only.
- The single entry point for the pipeline is **`src/proxy.ts`**. It handles i18n (next-intl) and optional Clerk route protection. Do not create a `middleware.ts` that re-exports from proxy; Next.js will error if both exist.
- Reference: [Next.js middleware-to-proxy](https://nextjs.org/docs/messages/middleware-to-proxy).

## Mock mode (auth / DB)

- Mock mode (auth or DB) is decided only in **`src/lib/auth/config.ts`** and **`src/lib/db/config.ts`**. Do not duplicate env checks elsewhere; use `isClerkConfigured()` and `isSupabaseConfigured()` (and `getSupabaseAnonKey()` when creating Supabase clients).

## Before changing request pipeline or auth

- Check existing docs: `docs/README.md` (overview), this file (agent rules), root `README.md` (structure and setup).
- Do not assume older Next.js conventions (e.g. `middleware.ts`) without confirming the project's Next version and current setup.
