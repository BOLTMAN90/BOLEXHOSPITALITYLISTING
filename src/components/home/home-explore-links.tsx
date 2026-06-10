"use client";

import { ArrowRight, Compass, ConciergeBell, Grid3x3, Map, Sparkles, Star } from "lucide-react";
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
    href: "/destinations",
    icon: Compass,
    title: "Destinations",
    description: "Discover Lagos, Dubai, Cape Town, Santorini, and more.",
  },
  {
    href: "/experiences",
    icon: Sparkles,
    title: "Curated Experiences",
    description: "Private dining, yacht charters, wellness retreats, and cultural tours.",
  },
  {
    href: "/collections",
    icon: Grid3x3,
    title: "Featured Collections",
    description: "Beachfront villas, romantic escapes, family retreats, and more.",
  },
  {
    href: "/concierge",
    icon: ConciergeBell,
    title: "Luxury Concierge",
    description: "Airport pickup, chauffeurs, VIP experiences, and 24/7 support.",
  },
  {
    href: "/testimonials",
    icon: Star,
    title: "Guest Reviews",
    description: "Testimonials, travel stories, and verified guest experiences.",
  },
];

export function HomeExploreLinks() {
  const { user, requireAuth } = useRequireAuth();

  return (
    <SectionWrapper
      id="explore"
      eyebrow="Explore BOLEXMAN"
      title="Every Experience Has Its Own Page"
      subtitle={
        user
          ? "The homepage is your starting point — open any section for the full luxury experience."
          : "Sign in to unlock stays, destinations, experiences, concierge, and more."
      }
      className="bg-white"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LINKS.map((item, index) => (
          <ScrollReveal key={item.href} delay={index * 0.05}>
            <button
              type="button"
              onClick={() => requireAuth(item.href)}
              className="group flex h-full w-full flex-col rounded-2xl border border-bolex-primary/5 bg-bolex-secondary p-8 text-left shadow-luxury transition-all duration-500 hover:-translate-y-1 hover:border-bolex-accent/30 hover:shadow-lift"
            >
              <item.icon className="size-8 text-bolex-accent transition-transform duration-500 group-hover:scale-110" />
              <h3 className="text-h3 mt-5 text-bolex-text">{item.title}</h3>
              <p className="text-body mt-3 flex-1 text-bolex-muted">
                {item.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-bolex-text group-hover:text-bolex-accent">
                {user ? "Open page" : "Sign in to explore"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
