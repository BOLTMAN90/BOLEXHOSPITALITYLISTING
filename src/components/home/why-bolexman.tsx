import {
  Crown,
  Headphones,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionWrapper } from "@/components/layout/section-wrapper";

const PILLARS = [
  {
    icon: Crown,
    title: "Curated Luxury Only",
    description:
      "Every property vetted against our exacting standards for design, service, and exclusivity.",
  },
  {
    icon: Sparkles,
    title: "AI-Personalized Journeys",
    description:
      "Intelligent recommendations tailored to your preferences, mood, and travel style.",
  },
  {
    icon: Headphones,
    title: "24/7 Concierge Access",
    description:
      "Dedicated support before, during, and after your stay — wherever you are.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Premium Hosts",
    description:
      "Trusted hosts with proven track records of exceptional guest experiences.",
  },
];

const STATS = [
  { value: "2,400+", label: "Properties" },
  { value: "180+", label: "Destinations" },
  { value: "98%", label: "Guest Satisfaction" },
];

export function WhyBolexman() {
  return (
    <SectionWrapper
      id="why-bolexman"
      eyebrow="The BOLEXMAN Difference"
      title="Why BOLEXMAN"
      subtitle="More than a marketplace — a luxury hospitality ecosystem built for those who expect the extraordinary."
      className="bg-bolex-secondary"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {PILLARS.map((pillar, index) => (
          <ScrollReveal key={pillar.title} delay={index * 0.06}>
            <div className="rounded-2xl bg-white p-8 shadow-luxury">
              <pillar.icon className="size-8 text-bolex-accent" />
              <h3 className="text-h3 mt-5 text-bolex-primary">{pillar.title}</h3>
              <p className="text-body mt-3 text-bolex-primary/65">
                {pillar.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-14 grid gap-8 border-t border-bolex-primary/10 pt-14 sm:grid-cols-3">
        {STATS.map((stat, index) => (
          <ScrollReveal key={stat.label} delay={index * 0.05}>
            <div className="text-center">
              <p className="font-price text-4xl font-semibold text-bolex-primary md:text-5xl">
                {stat.value}
              </p>
              <p className="text-caption mt-2 uppercase tracking-wider text-bolex-primary/50">
                {stat.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
