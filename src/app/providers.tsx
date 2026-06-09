"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { LocaleProvider } from "@/contexts/locale-context";
import { UserProvider } from "@/contexts/user-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <LocaleProvider>
        <UserProvider>
          {children}
          <Toaster richColors position="top-center" />
        </UserProvider>
      </LocaleProvider>
    </LazyMotion>
  );
}
