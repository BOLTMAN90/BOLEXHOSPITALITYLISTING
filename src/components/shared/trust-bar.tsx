"use client";

import { BadgeCheck, CreditCard, Headphones, ShieldCheck, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TRUST_BUILDERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS = {
  verified: BadgeCheck,
  secure: ShieldCheck,
  price: CreditCard,
  concierge: Headphones,
  instant: Zap,
} as const;

interface TrustBarProps {
  variant?: "light" | "dark";
  className?: string;
}

export function TrustBar({ variant = "light", className }: TrustBarProps) {
  const isDark = variant === "dark";

  return (
    <ScrollReveal>
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border px-6 py-4",
          isDark
            ? "border-white/10 bg-white/5 text-white/90"
            : "border-bolex-primary/8 bg-white/80 text-bolex-text shadow-luxury backdrop-blur-sm",
          className
        )}
      >
        {TRUST_BUILDERS.map((item) => {
          const Icon = ICONS[item.id as keyof typeof ICONS];
          return (
            <div
              key={item.id}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Icon
                className={cn("size-4 shrink-0", isDark ? "text-bolex-accent" : "text-bolex-accent")}
              />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </ScrollReveal>
  );
}
