"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { PageLoader } from "@/components/layout/page-loader";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { AuthUIProvider } from "@/contexts/auth-ui-context";
import { LocaleProvider } from "@/contexts/locale-context";
import { UserDataProvider } from "@/contexts/user-data-context";
import { UserProvider } from "@/contexts/user-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <SmoothScroll>
        <LocaleProvider>
          <UserProvider>
            <UserDataProvider>
              <AuthUIProvider>
                <PageLoader />
                <ScrollProgress />
                {children}
                <Toaster richColors position="top-center" />
              </AuthUIProvider>
            </UserDataProvider>
          </UserProvider>
        </LocaleProvider>
      </SmoothScroll>
    </LazyMotion>
  );
}
