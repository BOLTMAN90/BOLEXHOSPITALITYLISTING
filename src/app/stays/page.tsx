import type { Metadata } from "next";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { InteractiveMap } from "@/components/home/interactive-map";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Luxury Stays — BOLEXMAN",
  description: "Browse handpicked hotels, resorts, villas, and apartments on an interactive map.",
};

export default function StaysPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Handpicked"
        title="Featured Luxury Properties"
        subtitle="Filter by category, preview on the map, and find your next extraordinary stay."
      />
      <main className="bg-bolex-secondary">
        <FeaturedProperties showHeader={false} />
        <InteractiveMap showHeader={false} />
      </main>
    </SiteShell>
  );
}
