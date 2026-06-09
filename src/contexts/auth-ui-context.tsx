"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { SignInDialog } from "@/components/layout/sign-in-dialog";
import { SignUpDialog } from "@/components/layout/sign-up-dialog";

interface AuthUIContextValue {
  openSignIn: () => void;
  openSignUp: () => void;
}

const AuthUIContext = createContext<AuthUIContextValue | null>(null);

export function AuthUIProvider({ children }: { children: React.ReactNode }) {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const openSignIn = useCallback(() => setSignInOpen(true), []);
  const openSignUp = useCallback(() => setSignUpOpen(true), []);

  const value = useMemo(
    () => ({ openSignIn, openSignUp }),
    [openSignIn, openSignUp]
  );

  return (
    <AuthUIContext.Provider value={value}>
      {children}
      <SignInDialog
        open={signInOpen}
        onOpenChange={setSignInOpen}
        onSwitchToSignUp={() => {
          setSignInOpen(false);
          setSignUpOpen(true);
        }}
      />
      <SignUpDialog
        open={signUpOpen}
        onOpenChange={setSignUpOpen}
        onSwitchToSignIn={() => {
          setSignUpOpen(false);
          setSignInOpen(true);
        }}
      />
    </AuthUIContext.Provider>
  );
}

export function useAuthUI() {
  const context = useContext(AuthUIContext);
  if (!context) {
    throw new Error("useAuthUI must be used within AuthUIProvider");
  }
  return context;
}
