"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { mockCustomer, type CustomerProfile } from "@/lib/mock-data";

const SESSION_KEY = "bankname_session_meta";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

type SessionMeta = {
  mobile: string;
  customerId?: string;
  verifiedAt: string;
  lastActivity: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  isHydrated: boolean;
  sessionExpired: boolean;
  customer: CustomerProfile;
  mobile: string | null;
  login: (meta: Omit<SessionMeta, "lastActivity">) => void;
  logout: () => void;
  updateCustomer: (patch: Partial<CustomerProfile>) => void;
  touchActivity: () => void;
  dismissSessionExpired: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const listeners = new Set<() => void>();
let sessionExpiredNotice = false;

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function isSessionExpired(meta: SessionMeta): boolean {
  return Date.now() - new Date(meta.lastActivity).getTime() > SESSION_TIMEOUT_MS;
}

/** Stable string snapshot for useSyncExternalStore (must not emit or return new objects). */
function getSessionSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SessionMeta;
    if (isSessionExpired(parsed)) {
      sessionStorage.removeItem(SESSION_KEY);
      sessionExpiredNotice = true;
      return null;
    }
    return raw;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function getSessionExpiredSnapshot(): boolean {
  return sessionExpiredNotice;
}

function parseMeta(snapshot: string | null): SessionMeta | null {
  if (!snapshot) return null;
  try {
    return JSON.parse(snapshot) as SessionMeta;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const sessionSnapshot = useSyncExternalStore(
    subscribe,
    getSessionSnapshot,
    () => null,
  );
  const sessionExpired = useSyncExternalStore(
    subscribe,
    getSessionExpiredSnapshot,
    () => false,
  );
  const isHydrated = useSyncExternalStore(
    subscribe,
    () => typeof window !== "undefined",
    () => false,
  );
  const [customer, setCustomer] = useState<CustomerProfile>(mockCustomer);

  const meta = useMemo(
    () => parseMeta(sessionSnapshot),
    [sessionSnapshot],
  );

  useEffect(() => {
    if (!sessionSnapshot) return;
    const interval = setInterval(() => emitChange(), 60_000);
    return () => clearInterval(interval);
  }, [sessionSnapshot]);

  const touchActivity = useCallback(() => {
    const current = parseMeta(getSessionSnapshot());
    if (!current) return;
    const next: SessionMeta = {
      ...current,
      lastActivity: new Date().toISOString(),
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
    emitChange();
  }, []);

  const login = useCallback((session: Omit<SessionMeta, "lastActivity">) => {
    sessionExpiredNotice = false;
    const next: SessionMeta = {
      ...session,
      lastActivity: new Date().toISOString(),
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
    setCustomer((c) => ({
      ...c,
      mobile: session.mobile,
      customerId: session.customerId ?? c.customerId,
    }));
    emitChange();
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    emitChange();
  }, []);

  const updateCustomer = useCallback((patch: Partial<CustomerProfile>) => {
    setCustomer((c) => ({ ...c, ...patch }));
  }, []);

  const dismissSessionExpired = useCallback(() => {
    sessionExpiredNotice = false;
    emitChange();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(meta),
      isHydrated,
      sessionExpired,
      customer,
      mobile: meta?.mobile ?? null,
      login,
      logout,
      updateCustomer,
      touchActivity,
      dismissSessionExpired,
    }),
    [
      meta,
      isHydrated,
      sessionExpired,
      customer,
      login,
      logout,
      updateCustomer,
      touchActivity,
      dismissSessionExpired,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
