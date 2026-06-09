"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { AuthUIProvider } from "@/contexts/auth-ui-context";
import { LocaleProvider } from "@/contexts/locale-context";
import { UserProvider } from "@/contexts/user-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <LocaleProvider>
        <UserProvider>
          <AuthUIProvider>
            {children}
            <Toaster richColors position="top-center" />
          </AuthUIProvider>
        </UserProvider>
      </LocaleProvider>
    </LazyMotion>
  );
}
