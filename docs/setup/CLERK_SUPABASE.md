# Setup: Clerk + Supabase

Configuración paso a paso para integrar **Clerk** (autenticación) con **Supabase** (base de datos) en el boilerplate Next.js. Revisado según documentación oficial (marzo 2026).

## Introducción

Desde **abril 2025**, la forma recomendada de integrar Clerk con Supabase es la **autenticación third-party** de Supabase: Clerk actúa como proveedor de identidad y Supabase acepta los **session tokens** de Clerk directamente. No se usan JWT templates ni el JWT secret de Supabase compartido con Clerk.

- **Clerk** añade el claim `role: "authenticated"` a los session tokens al activar la integración Supabase en el dashboard.
- Los **clientes Supabase** deben recibir ese token en cada petición mediante la opción `accessToken`.
- Con third-party auth **no** se usan cookies de Supabase Auth; la sesión la gestiona Clerk.

**Referencias oficiales:**

- [Supabase: Clerk (third-party)](https://supabase.com/docs/guides/auth/third-party/clerk)
- [Clerk: Integrate Supabase](https://clerk.com/docs/guides/development/integrations/databases/supabase)

---

## Requisitos

- Cuenta en [Clerk](https://clerk.com) y en [Supabase](https://supabase.com).
- Proyecto Next.js con este boilerplate (Clerk y Supabase ya en dependencias).

---

## 1. Clerk

### 1.1 Crear aplicación

1. Entra en [dashboard.clerk.com](https://dashboard.clerk.com) y crea una aplicación (o usa una existente).
2. En **API Keys** copia:
   - **Publishable key** (`pk_...`)
   - **Secret key** (`sk_...`)

### 1.2 Activar integración Supabase

1. Ve a [Clerk → Setup → Supabase](https://dashboard.clerk.com/setup/supabase).
2. Elige **Activate Supabase integration**. Esto hace que los session tokens de Clerk incluyan el claim `role: "authenticated"` que Supabase exige.
3. Copia el **Clerk domain** (ej. `xxx.clerk.accounts.dev`). **No** incluyas `https://`. Lo usarás en el dashboard de Supabase.

---

## 2. Supabase

### 2.1 Crear proyecto

1. En [Supabase Dashboard](https://supabase.com/dashboard) crea un proyecto (o usa uno existente).
2. Ve a **Project Settings → API**.
3. Copia:
   - **Project URL** (ej. `https://xxxx.supabase.co`)
   - **anon public** (clave pública)
   - Opcional: **service_role** (solo para operaciones de backend que ignoren RLS).

### 2.2 Añadir Clerk como proveedor third-party

1. En el proyecto Supabase: **Authentication → Third-party** (o **Sign In / Up** según la versión del dashboard).
2. **Add provider** → elige **Clerk**.
3. Pega el **Clerk domain** que copiaste en el paso 1.2 (ej. `xxx.clerk.accounts.dev`).
4. Guarda.

---

## 3. Variables de entorno

Añade en `.env.local` (y documenta en `.env.example`):

| Variable | Uso | Ejemplo |
|----------|-----|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Cliente (Clerk) | `pk_...` |
| `CLERK_SECRET_KEY` | Servidor (Clerk) | `sk_...` |
| `NEXT_PUBLIC_SUPABASE_URL` | Cliente y servidor | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Cliente y servidor (anon key) | `eyJ...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Opcional; solo servidor, bypass RLS | `eyJ...` |

Las variables con prefijo `NEXT_PUBLIC_` se exponen al navegador; el resto solo en servidor.

Puedes usar `NEXT_PUBLIC_SUPABASE_ANON_KEY` en lugar de `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` si tu proyecto ya usa ese nombre; el boilerplate acepta ambos en `src/lib/db/config.ts`.

---

## 4. Código: clientes Supabase con Clerk

Con third-party Clerk, Supabase **no** usa sus propias cookies de auth. Hay que pasar el **session token de Clerk** en cada petición. La API de `@supabase/ssr` (`createBrowserClient` / `createServerClient`) está pensada para cookies de Supabase Auth; para Clerk se usa `createClient` de `@supabase/supabase-js` con la opción `accessToken`, que inyecta el token en las peticiones.

### 4.1 Cliente en el navegador (Client Components)

Usa `useSession()` de Clerk y crea el cliente con `accessToken`:

```ts
"use client";

import { useMemo } from "react";
import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

export function useSupabaseClient() {
  const { session } = useSession();

  return useMemo(() => {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        async accessToken() {
          return session?.getToken() ?? null;
        },
      }
    );
  }, [session]);
}
```

Referencia: [Clerk – Supabase (Client-side)](https://clerk.com/docs/guides/development/integrations/databases/supabase).

### 4.2 Cliente en el servidor (Server Components / Route Handlers / Server Actions)

Usa `auth()` de `@clerk/nextjs/server` y crea el cliente con `accessToken`:

```ts
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function createServerSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      async accessToken() {
        return (await auth()).getToken();
      },
    }
  );
}
```

Referencia: [Clerk – Supabase (Server-side)](https://clerk.com/docs/guides/development/integrations/databases/supabase#server-side-rendering).

---

## 5. Desarrollo local con Supabase CLI

Si usas Supabase en local (`npx supabase start`), configura Clerk como third-party en `supabase/config.toml`:

```toml
[auth.third_party.clerk]
enabled = true
domain = "tu-dominio.clerk.accounts.dev"
```

Sustituye por tu Clerk domain (el mismo que en el dashboard de Supabase). Sigue siendo necesario tener la integración Supabase activada en el dashboard de Clerk.

---

## 6. RLS (Row Level Security)

En Supabase, el JWT que recibe es el session token de Clerk. El ID de usuario de Clerk está en el claim `sub`. Usa `auth.jwt()->>'sub'` en las políticas RLS.

Ejemplo: tabla `items` con `user_id` (Clerk user ID):

```sql
-- Tabla de ejemplo
create table items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  user_id text not null default (auth.jwt()->>'sub'),
  created_at timestamptz not null default now()
);

alter table items enable row level security;

-- Solo ver sus propios items
create policy "User can view own items"
  on items for select
  to authenticated
  using ( (auth.jwt()->>'sub') = user_id );

-- Solo insertar con su user_id
create policy "User can insert own items"
  on items for insert
  to authenticated
  with check ( (auth.jwt()->>'sub') = user_id );
```

Para organizaciones, puedes usar claims de Clerk como `org_id` o `org_role` en políticas más complejas (ver [Clerk session tokens](https://clerk.com/docs/backend-requests/resources/session-tokens)).

---

## 7. Opcional: Webhooks Clerk → Supabase

Si necesitas **sincronizar usuarios u organizaciones** en tablas propias de Supabase (ej. `public.users`), configura un webhook de Clerk:

1. En Clerk Dashboard: **Webhooks → Add Endpoint**. URL de tu API (ej. `https://tu-dominio.com/api/webhooks/clerk`).
2. Suscríbete a los eventos que necesites, por ejemplo: `user.created`, `user.updated`, `user.deleted`, `organization.*`, `organizationMembership.*`.
3. Copia el **Signing Secret** (`whsec_...`) y añádelo a `.env.local` como `CLERK_WEBHOOK_SECRET`.
4. En tu endpoint, verifica la firma y escribe en Supabase (con `SUPABASE_SERVICE_ROLE_KEY` si quieres saltarte RLS para esas tablas).

Documentación: [Clerk Webhooks](https://clerk.com/docs/guides/development/webhooks/overview). Si tienes un doc de diseño de sincronización (ej. `AUTH_SYNC.md`), enlázalo aquí.

---

## 8. Verificación

1. **Login sin error:** Inicia sesión en la app con Clerk. No debe aparecer error de JWT ni de Supabase.
2. **RLS:** Crea o consulta filas en una tabla con RLS que use `auth.jwt()->>'sub'`. Comprueba que solo ves/modificas datos del usuario actual.
3. **Webhook (si aplica):** En Clerk → Webhooks, revisa que el último request a tu endpoint devuelva 200.

---

*Última revisión: marzo 2026. Consulta las guías oficiales de [Supabase](https://supabase.com/docs/guides/auth/third-party/clerk) y [Clerk](https://clerk.com/docs/guides/development/integrations/databases/supabase) por si hay cambios posteriores.*
