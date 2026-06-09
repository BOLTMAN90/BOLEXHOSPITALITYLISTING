"use client";

import { ArrowRight, Compass, Map, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { useRequireAuth } from "@/hooks/use-require-auth";

const LINKS = [
  {
    href: "/stays",
    icon: Map,
    title: "Luxury Stays & Map",
    description: "Browse verified properties and explore them on an interactive world map.",
  },
  {
    href: "/experiences",
    icon: Sparkles,
    title: "Curated Experiences",
    description: "Private dining, yacht charters, wellness retreats, and more.",
  },
  {
    href: "/destinations",
    icon: Compass,
    title: "Trending Destinations",
    description: "Discover the world's most sought-after travel locales.",
  },
];

export function HomeExploreLinks() {
  const { user, requireAuth } = useRequireAuth();

  return (
    <SectionWrapper
      id="explore"
      eyebrow="Explore BOLEXMAN"
      title="More to Discover"
      subtitle={
        user
          ? "Each section lives on its own page — dive deeper into what interests you."
          : "Sign in to unlock full access to stays, destinations, experiences, and more."
      }
      className="bg-white"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {LINKS.map((item, index) => (
          <ScrollReveal key={item.href} delay={index * 0.06}>
            <button
              type="button"
              onClick={() => requireAuth(item.href)}
              className="group flex h-full w-full flex-col rounded-2xl border bg-bolex-secondary p-8 text-left shadow-luxury transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <item.icon className="size-8 text-bolex-accent" />
              <h3 className="text-h3 mt-5 text-bolex-primary">{item.title}</h3>
              <p className="text-body mt-3 flex-1 text-bolex-primary/65">
                {item.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-bolex-primary group-hover:text-bolex-accent">
                {user ? "Explore" : "Sign in to explore"}
                <ArrowRight className="size-4" />
              </span>
            </button>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
