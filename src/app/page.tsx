import type { Metadata } from "next";
import { AdvancedSearch } from "@/components/home/advanced-search";
import { BecomeHostCTA } from "@/components/home/become-host-cta";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { HeroSection } from "@/components/home/hero-section";
import { HomeExploreLinks } from "@/components/home/home-explore-links";
import { Testimonials } from "@/components/home/testimonials";
import { TrendingDestinations } from "@/components/home/trending-destinations";
import { WhyBolexman } from "@/components/home/why-bolexman";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "BOLEXMAN — Luxury Hospitality Marketplace",
  description:
    "Discover hotels, resorts, villas, apartments, and curated luxury experiences.",
};

export default function Home() {
  return (
    <SiteShell>
      <main className="bg-bolex-secondary">
        <HeroSection />
        <AdvancedSearch />
        <TrendingDestinations limit={4} viewAllHref="/destinations" />
        <FeaturedProperties limit={3} viewAllHref="/stays" />
        <WhyBolexman />
        <HomeExploreLinks />
        <Testimonials viewAllHref="/stories" />
        <BecomeHostCTA />
      </main>
    </SiteShell>
  );
}
