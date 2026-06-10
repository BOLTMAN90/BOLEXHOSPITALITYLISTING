"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AuthGuard } from "@/components/layout/auth-guard";
import { HomeFeatures } from "@/components/home/home-features";

interface SiteShellProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export function SiteShell({ children, hideFooter }: SiteShellProps) {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const showFooter = !hideFooter && !isDashboard;

  return (
    <HomeFeatures>
      <Navbar />
      <AuthGuard>{children}</AuthGuard>
      {showFooter ? <Footer /> : null}
    </HomeFeatures>
  );
}
