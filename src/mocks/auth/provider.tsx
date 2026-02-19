"use client";

import * as React from "react";

type MockUser = {
  id: string;
  email?: string;
  name?: string;
};

const MockAuthContext = React.createContext<{
  user: MockUser | null;
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
} | null>(null);

const MOCK_USER: MockUser = {
  id: "mock-user-id",
  email: "mock@example.com",
  name: "Mock User",
};

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<MockUser | null>(null);

  const signIn = React.useCallback(() => {
    setUser(MOCK_USER);
  }, []);

  const signOut = React.useCallback(() => {
    setUser(null);
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      isSignedIn: Boolean(user),
      signIn,
      signOut,
    }),
    [user, signIn, signOut]
  );

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  const ctx = React.useContext(MockAuthContext);
  if (!ctx) throw new Error("useMockAuth must be used within MockAuthProvider");
  return ctx;
}
