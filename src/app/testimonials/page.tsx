import type { Metadata } from "next";
import { Testimonials } from "@/components/home/testimonials";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Testimonials — BOLEXMAN",
  description: "Reviews and testimonials from BOLEXMAN guests around the world.",
};

export default function TestimonialsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Testimonials"
        title="Guest Reviews"
        subtitle="Real journeys from travelers who discovered their perfect stay with BOLEXMAN."
      />
      <main className="bg-bolex-secondary">
        <Testimonials showHeader={false} />
      </main>
    </SiteShell>
  );
}
