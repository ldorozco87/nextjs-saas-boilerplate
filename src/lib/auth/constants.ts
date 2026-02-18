/** Shared Clerk component appearance (theme alignment with app CSS variables). */
export const clerkAppearance = {
  variables: { colorPrimary: "hsl(var(--primary))" },
} as const;

/** sessionStorage key used when signing out in mock mode so the dashboard guard redirects to home, not sign-in. */
export const MOCK_SIGNING_OUT_KEY = "mockSigningOut";
