"use client";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AuthGuard } from "@/components/layout/auth-guard";
import { HomeFeatures } from "@/components/home/home-features";

interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <HomeFeatures>
      <Navbar />
      <AuthGuard>{children}</AuthGuard>
      <Footer />
    </HomeFeatures>
  );
}
