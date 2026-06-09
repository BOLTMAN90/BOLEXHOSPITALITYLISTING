"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
      <Toaster richColors position="top-center" />
    </LazyMotion>
  );
}
