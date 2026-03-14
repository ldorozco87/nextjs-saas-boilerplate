# Testing

This project uses **Vitest** for unit and integration tests and **Playwright** for end-to-end (e2e) tests. The goal is a solid base that scales as the SaaS grows.

## Test pyramid

- **Unit:** Pure functions, hooks, stores (e.g. Zustand), utilities. Use Vitest (with jsdom when needed). Fast, isolated.
- **Integration:** Components with providers, Server Actions/Route Handlers with mocks, or multiple units working together. Use Vitest; optionally Testing Library for React components.
- **E2E:** Full user flows in a real browser. Use Playwright. Fewer tests, higher confidence.

## Where to put tests

- **Unit and integration:** Next to the code as `*.test.ts` or `*.test.tsx` (or `*.spec.ts`), e.g. `src/lib/utils.test.ts`, `src/stores/ui.test.ts`.
- **E2E:** In the `e2e/` directory, e.g. `e2e/smoke.spec.ts`.

## Commands

- `bun run test` — Run Vitest in watch mode (unit + integration).
- `bun run test:run` — Run Vitest once (e.g. for CI).
- `bun run test:e2e` — Run Playwright e2e tests (starts the dev server if needed).
- `bun run test:e2e:ui` — Run Playwright with the UI mode.

## Configuration

- **Vitest:** `vitest.config.mts` at the project root (ESM to avoid Vite CJS deprecation). Uses `@vitejs/plugin-react`, `jsdom` environment, and the `@/` alias (same as Next). Include pattern: `src/**/*.{test,spec}.{ts,tsx}`.
- **Playwright:** `playwright.config.ts` at the project root. Uses a `webServer` that runs `bun run dev`; `baseURL` points at the app (with default locale). Tests live in `e2e/`.

## Mocks

Respect the existing mock boundaries: auth and DB configuration live only in `src/lib/auth/config.ts` and `src/lib/db/config.ts`. In tests you can force mock mode via env or module mocks; do not duplicate "is configured or not" logic elsewhere.

## Good practices

- Keep tests deterministic; avoid depending on execution order.
- Reset or isolate state between tests when needed (e.g. Zustand store in `beforeEach`).
- For e2e: use resilient selectors (roles, accessible names) and explicit waits; avoid brittle DOM structure.
- When adding or changing features, add or update tests at the appropriate level (unit, integration, or e2e).

See [AGENT_RULES.md](AGENT_RULES.md) for mandatory testing rules and [BEST_PRACTICES.md](BEST_PRACTICES.md) for broader conventions.
