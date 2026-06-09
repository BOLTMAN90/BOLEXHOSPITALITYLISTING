"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { cn } from "@/lib/utils";

interface ViewAllLinkProps {
  href: string;
  label?: string;
  className?: string;
}

export function ViewAllLink({
  href,
  label = "View all",
  className,
}: ViewAllLinkProps) {
  const { user, requireAuth } = useRequireAuth();

  if (user) {
    return (
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium text-bolex-primary transition-colors hover:text-bolex-accent",
          className
        )}
      >
        {label}
        <ArrowRight className="size-4" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => requireAuth(href)}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-bolex-primary transition-colors hover:text-bolex-accent",
        className
      )}
    >
      {label}
      <ArrowRight className="size-4" />
    </button>
  );
}
