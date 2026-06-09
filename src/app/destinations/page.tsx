import type { Metadata } from "next";
import { TrendingDestinations } from "@/components/home/trending-destinations";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Trending Destinations — BOLEXMAN",
  description: "Explore the world's most sought-after luxury travel destinations.",
};

export default function DestinationsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Explore"
        title="Trending Destinations"
        subtitle="From the Maldives to the Swiss Alps — curated locales for the discerning traveler."
      />
      <main className="bg-bolex-secondary">
        <TrendingDestinations showHeader={false} />
      </main>
    </SiteShell>
  );
}
