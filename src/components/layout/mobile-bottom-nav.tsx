"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, Search, Sparkles, User } from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#search", label: "Search", icon: Search },
  { href: "/stays", label: "Explore", icon: Compass },
  { href: "/experiences", label: "Experiences", icon: Sparkles },
  { href: "/dashboard", label: "Account", icon: User },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useUser();

  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return null;
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-bolex-primary/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-glass lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {LINKS.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : link.href.startsWith("/#")
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

          const href =
            link.href === "/dashboard" && !user ? "/" : link.href;

          return (
            <Link
              key={link.label}
              href={href}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] font-medium transition-colors",
                isActive ? "text-bolex-accent" : "text-bolex-muted hover:text-bolex-text"
              )}
            >
              <link.icon className="size-5" />
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
