"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type AuthUser = { id: string; fullName: string; email: string; role: string };
type AuthState = { user: AuthUser | null; token: string | null };
type AuthCtx = AuthState & { login: (user: AuthUser, token: string) => void; logout: () => void };

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, token: null });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("oc_auth");
      if (raw) setState(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  function login(user: AuthUser, token: string) {
    const next = { user, token };
    setState(next);
    localStorage.setItem("oc_auth", JSON.stringify(next));
    document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 3600}; SameSite=Lax`;
  }

  function logout() {
    setState({ user: null, token: null });
    localStorage.removeItem("oc_auth");
    document.cookie = "token=; path=/; max-age=0";
  }

  if (!ready) return null;

  return <Ctx.Provider value={{ ...state, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
