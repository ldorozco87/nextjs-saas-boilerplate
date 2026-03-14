# Component dictionary

**When you add a new reusable component, add an entry here.**


| Component            | Path                                               | Purpose                                                    | Usage                        | Client/Server |
| -------------------- | -------------------------------------------------- | ---------------------------------------------------------- | ---------------------------- | ------------- |
| AuthPageLayout       | `src/components/auth-page-layout.tsx`              | Centered full-height layout for sign-in/sign-up pages      | Wrap auth page content       | Server        |
| AuthProvider         | `src/components/auth-provider.tsx`                 | Wraps app with Clerk or mock auth context                  | Used in locale layout        | Client        |
| Header               | `src/components/header.tsx`                        | Sticky header with logo, locale/theme toggles, auth button | Rendered in locale layout    | Client        |
| LandingHero          | `src/components/landing-hero.tsx`                  | Hero section with title, subtitle, and CTAs                | Landing page hero            | Client        |
| LocaleToggle         | `src/components/locale-toggle.tsx`                 | Dropdown to switch locale (en/es)                          | Header nav                   | Client        |
| QueryProvider        | `src/components/query-provider.tsx`                | TanStack Query client provider                             | Root layout, wraps app       | Client        |
| SignOutButton        | `src/components/sign-out-button.tsx`               | Sign out and redirect to landing                           | Header and dashboard         | Client        |
| ThemeProvider        | `src/components/theme-provider.tsx`                | next-themes provider for dark/light                        | Root layout                  | Client        |
| ThemeToggle          | `src/components/theme-toggle.tsx`                  | Toggle dark/light theme                                    | Header nav                   | Client        |
| Button               | `src/components/ui/button.tsx`                     | Shadcn button primitive                                    | Buttons, CTAs                | Client        |
| DropdownMenu         | `src/components/ui/dropdown-menu.tsx`              | Shadcn dropdown menu                                       | Menus, dropdowns             | Client        |
| DropdownOptionToggle | `src/components/ui/dropdown-option-toggle.tsx`     | Dropdown option with toggle state                          | Locale/theme toggles         | Client        |
| DashboardShell       | `src/app/[locale]/dashboard/dashboard-shell.tsx`   | Dashboard layout with sidebar and mobile overlay           | Wraps dashboard page content | Client        |
| DashboardSidebar     | `src/app/[locale]/dashboard/dashboard-sidebar.tsx` | Sidebar nav for dashboard                                  | Used inside DashboardShell   | Client        |
| DashboardTable       | `src/app/[locale]/dashboard/dashboard-table.tsx`   | Table of items from Supabase                               | Dashboard page content       | Server        |
| SupabaseDemo         | `src/app/[locale]/dashboard/supabase-demo.tsx`     | Shows Supabase configured vs mock status                   | Dashboard page content       | Server        |


