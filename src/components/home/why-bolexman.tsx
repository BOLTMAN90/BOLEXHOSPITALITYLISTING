"use client";

import {
  BadgeCheck,
  CreditCard,
  Headphones,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { TRUST_BUILDERS } from "@/lib/constants";

const TRUST_DETAILS: Record<
  (typeof TRUST_BUILDERS)[number]["id"],
  { icon: typeof BadgeCheck; description: string }
> = {
  verified: {
    icon: BadgeCheck,
    description:
      "Every listing is personally vetted for quality, authenticity, and guest satisfaction.",
  },
  secure: {
    icon: ShieldCheck,
    description:
      "Bank-grade encryption and trusted payment partners protect every transaction.",
  },
  price: {
    icon: CreditCard,
    description:
      "Find a lower verified rate elsewhere and we will match it — guaranteed.",
  },
  concierge: {
    icon: Headphones,
    description:
      "Dedicated luxury concierge support before, during, and after your stay.",
  },
  experiences: {
    icon: Sparkles,
    description:
      "Handpicked experiences — from private chefs to yacht charters and safaris.",
  },
  instant: {
    icon: Zap,
    description:
      "Confirm your stay in seconds with real-time availability and instant booking.",
  },
};

export function WhyBolexman() {
  return (
    <SectionWrapper
      id="why-bolexman"
      eyebrow="Trust & Excellence"
      title="Why Choose BOLEXMAN"
      subtitle="A luxury hospitality marketplace built on verified quality, seamless booking, and world-class concierge care."
      className="bg-bolex-secondary"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TRUST_BUILDERS.map((item, index) => {
          const { icon: Icon, description } = TRUST_DETAILS[item.id];
          return (
            <ScrollReveal key={item.id} delay={index * 0.05}>
              <div className="group h-full rounded-2xl border border-bolex-primary/5 bg-white p-7 shadow-luxury transition-all duration-500 hover:-translate-y-1 hover:border-bolex-accent/30 hover:shadow-lift luxury-glow-hover">
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-bolex-accent/10 text-bolex-accent transition-colors group-hover:bg-bolex-accent group-hover:text-bolex-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-h3 mt-5 text-bolex-primary">{item.label}</h3>
                <p className="text-body mt-3 text-bolex-muted">{description}</p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
