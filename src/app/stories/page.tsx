import type { Metadata } from "next";
import { Testimonials } from "@/components/home/testimonials";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Guest Stories — BOLEXMAN",
  description: "Testimonials and travel stories from BOLEXMAN guests around the world.",
};

export default function StoriesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Guest Stories"
        title="Testimonials & Travel Stories"
        subtitle="Real journeys from travelers who discovered their perfect stay with BOLEXMAN."
      />
      <main className="bg-bolex-secondary">
        <Testimonials showHeader={false} />
      </main>
    </SiteShell>
  );
}
