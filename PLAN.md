# Plan de Desarrollo — [Nombre del proyecto]

Este documento define la hoja de ruta técnica para integrar este boilerplate en un **repo limpio** y llevar el proyecto a producción con Clerk y Supabase reales (sin mocks).

**Para agentes:** Trabaja por fases. Antes de empezar una fase:

1. Lee [docs/README.md](docs/README.md) (orden de lectura y quick refs).
2. Lee **solo** los docs listados en "Docs requeridos" de esa fase.
3. Al completar la fase → [§ Verificación por Fase](#verificación-por-fase).
4. **MCP:** Puedes usar los MCP del proyecto (**user-supabase**, **user-clerk**) cuando sea útil: aplicar migraciones, ejecutar SQL, listar tablas/ramas, consultar documentación de Clerk o Supabase. Ver [docs/AGENT_RULES.md](docs/AGENT_RULES.md) (sección MCP).

Arquitectura base: Next.js App Router, Supabase (PostgreSQL + RLS), Clerk como proveedor de identidad (third-party auth en Supabase).

---

## Verificación por Fase

Al completar **cada** fase, obligatorio:

- **Build:** `bun run build`. No avanzar si falla.
- **Tests:** `bun run test:e2e` debe pasar cuando aplique. Si la fase introduce flujos críticos nuevos, incluir o actualizar tests E2E. Ver [docs/TESTING.md](docs/TESTING.md).
- **Criterios E2E:** Los que se indiquen al final de la fase (solo si aplican).
- **Commit sugerido:** Al terminar la fase, el agente recomendará un **commit name** (título, tipo/alcance) y un **commit message** (cuerpo con resumen de los cambios) para que el usuario pueda hacer el commit manualmente.

---

## Fase 0: Setup, Cleanup & Integración Clerk + Supabase

**Docs requeridos:** [docs/AGENT_RULES.md](docs/AGENT_RULES.md), [docs/README.md](docs/README.md), [docs/setup/CLERK_SUPABASE.md](docs/setup/CLERK_SUPABASE.md)

**Objetivo:** Limpiar el boilerplate de mocks y preparar el entorno con Clerk y Supabase reales.

### 0.1 Metadatos

- [ ] Actualizar `package.json` (name del proyecto), README y metadatos de la app.
- [ ] Actualizar `.env.example` con lista explícita de variables: Clerk (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`), Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` o `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` si aplica). Añadir opcionales según proyecto (ej. webhooks: `CLERK_WEBHOOK_SECRET`).

### 0.2 Limpieza

- [ ] Eliminar mocks de auth y DB: carpetas `src/mocks/auth/` y `src/mocks/db/`, y todas las referencias (dashboard-table, sign-in/sign-up, layout dashboard, header, auth-provider).
- [ ] Eliminar imports y usos de `createMockSupabaseClient`, `MockAuthProvider`, `DashboardMockGuard`, `MockAuthFallback`, `MockSignInFallback`, etc.
- [ ] Clerk y Supabase pasan a ser obligatorios; sin fallback mock. Actualizar `src/lib/auth/config.ts`, `src/lib/db/config.ts` y los creadores de clientes Supabase según [docs/setup/CLERK_SUPABASE.md](docs/setup/CLERK_SUPABASE.md) (clientes con `accessToken` de Clerk).

### 0.3 Convenciones

- [ ] Configurar `.cursorrules` (o equivalente): App Router, Tailwind, TypeScript strict. Referencia a [docs/AGENT_RULES.md](docs/AGENT_RULES.md).

### 0.4 Documentación

- [ ] Decidir ubicación de docs (raíz vs `/docs`). Si se mueven, actualizar referencias en PLAN y README.
- [ ] Asegurar que PLAN.md y docs/README.md referencien el setup ([docs/setup/CLERK_SUPABASE.md](docs/setup/CLERK_SUPABASE.md)) y el plan.

### 0.5 MCP (Supabase y Clerk)

- [ ] Configurar MCP para Supabase (conexión al proyecto, consultas, etc.).
- [ ] Configurar MCP para Clerk (acceso al dashboard/API si aplica).

### 0.6 Supabase CLI (opcional)

- [ ] Si se usa Supabase local: tener Docker (y daemon en ejecución) para `npx supabase start`.
- [ ] Tener Supabase CLI disponible vía `npx supabase`; verificar `npx supabase --version`.
- [ ] Crear o verificar carpeta `supabase/` y migraciones en `supabase/migrations/`.
- [ ] Enlazar proyecto remoto: `npx supabase link --project-ref <ref>` con la contraseña de la base de datos.
- [ ] Probar aplicación de migraciones: `npx supabase db push` y verificar en Supabase Dashboard (Table Editor) que las tablas existan.

### 0.7 Integración Clerk + Supabase

Checklist siguiendo [docs/setup/CLERK_SUPABASE.md](docs/setup/CLERK_SUPABASE.md):

- [ ] **Clerk:** Aplicación creada; API keys (Publishable `pk_...`, Secret `sk_...`) en `.env.local`.
- [ ] **Clerk:** Integración Supabase activada (Setup → Supabase); **Clerk domain** copiado (ej. `xxx.clerk.accounts.dev`, sin `https://`).
- [ ] **Supabase:** Proyecto creado; en Project Settings → API copiar URL, anon (public) y opcionalmente service_role; variables en `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` o `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` si aplica).
- [ ] **Supabase Auth:** Dashboard → Authentication → Third-party → Add provider → Clerk; pegar Clerk domain; guardar.
- [ ] **Migraciones:** Aplicadas al proyecto (vía MCP user-supabase o `npx supabase link` + `npx supabase db push`); verificar tablas en Table Editor.
- [ ] **Clientes Supabase:** Creados con `accessToken` que devuelve el token de Clerk (no cookies de Supabase Auth), según [docs/setup/CLERK_SUPABASE.md §4](docs/setup/CLERK_SUPABASE.md#4-código-clientes-supabase-con-clerk) (browser y server).
- [ ] **Variables:** `.env.local` y `.env.example` completos según el setup.
- [ ] **Verificación:** (1) Login en la app sin error de JWT/Supabase. (2) Consulta a una tabla con RLS y `auth.jwt()->>'sub'` devuelve datos correctos. (3) Si hay webhook Clerk, último request 200 en Clerk Dashboard.

**Verificación Fase 0:** → [§ Verificación por Fase](#verificación-por-fase). `bun run build` debe pasar. E2E: si existen tests para auth/dashboard, deben pasar.
