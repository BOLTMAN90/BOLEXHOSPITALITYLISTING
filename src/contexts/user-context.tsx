"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

const STORAGE_KEY = "bolexman-user";

export interface User {
  email: string;
  name: string;
}

interface UserContextValue {
  user: User | null;
  isReady: boolean;
  signIn: (user: User) => void;
  signUp: (user: User) => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

function loadUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUser(loadUser());
    setIsReady(true);
  }, []);

  const persist = useCallback((next: User | null) => {
    setUser(next);
    if (next) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const signIn = useCallback(
    (next: User) => {
      persist(next);
      toast.success(`Welcome back, ${next.name.split(" ")[0]}!`);
    },
    [persist]
  );

  const signUp = useCallback(
    (next: User) => {
      persist(next);
      toast.success(`Account created. Welcome, ${next.name.split(" ")[0]}!`);
    },
    [persist]
  );

  const signOut = useCallback(() => {
    persist(null);
    toast.message("Signed out successfully.");
  }, [persist]);

  const value = useMemo(
    () => ({ user, isReady, signIn, signUp, signOut }),
    [user, isReady, signIn, signUp, signOut]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
