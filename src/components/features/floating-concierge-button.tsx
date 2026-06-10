"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Headphones } from "lucide-react";

export function FloatingConciergeButton() {
  const pathname = usePathname();
  const isDashboard =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  if (isDashboard) return null;

  return (
    <Link
      href="/concierge"
      className="fixed bottom-20 left-4 z-50 flex max-w-[220px] items-center gap-3 rounded-full border border-white/10 bg-bolex-dark/95 px-4 py-3 text-white shadow-lift backdrop-blur-md transition-all hover:scale-[1.02] hover:border-bolex-accent/50 lg:bottom-6 lg:left-6 lg:max-w-xs lg:px-5"
      aria-label="Need help planning your stay? Contact concierge"
    >
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-bolex-accent text-bolex-primary">
        <Headphones className="size-4" />
      </span>
      <span className="text-left leading-tight">
        <span className="block text-xs font-medium text-bolex-accent">
          Concierge
        </span>
        <span className="block text-sm font-medium">
          Need help planning your stay?
        </span>
      </span>
    </Link>
  );
}
