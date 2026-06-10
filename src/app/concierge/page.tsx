import type { Metadata } from "next";
import { ConciergeServices } from "@/components/features/concierge-services";
import { LuxuryConciergeSection } from "@/components/home/luxury-concierge-section";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";
import { CONTAINER_CLASS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Concierge Services — BOLEXMAN",
  description: "24/7 concierge, airport transfers, private chefs, and bespoke travel planning.",
};

export default function ConciergePage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="White-Glove Service"
        title="Luxury Concierge"
        subtitle="Dedicated support before, during, and after your journey — wherever you are in the world."
      />
      <main>
        <LuxuryConciergeSection showCta={false} />
        <section id="request" className="section-padding scroll-mt-24 bg-white">
          <div className={CONTAINER_CLASS}>
            <p className="text-caption mb-6 uppercase tracking-[0.15em] text-bolex-accent">
              Request a Service
            </p>
            <ConciergeServices />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
