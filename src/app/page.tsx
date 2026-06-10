import type { Metadata } from "next";
import { AdvancedSearch } from "@/components/home/advanced-search";
import { BecomeHostCTA } from "@/components/home/become-host-cta";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { HeroSection } from "@/components/home/hero-section";
import { HomeExploreLinks } from "@/components/home/home-explore-links";
import { Testimonials } from "@/components/home/testimonials";
import { TrendingDestinations } from "@/components/home/trending-destinations";
import { WhyBolexman } from "@/components/home/why-bolexman";
import { TrustBar } from "@/components/shared/trust-bar";
import { SiteShell } from "@/components/layout/site-shell";
import { SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "BOLEXMAN — Luxury Hospitality Marketplace",
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <SiteShell>
      <main className="bg-bolex-secondary pb-20 lg:pb-0">
        <HeroSection />
        <div id="search" className="scroll-mt-24">
          <AdvancedSearch />
        </div>
        <section className="pb-8">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <TrustBar />
          </div>
        </section>
        <TrendingDestinations
          id="destinations-preview"
          limit={4}
          viewAllHref="/destinations"
        />
        <FeaturedProperties
          id="stays-preview"
          limit={3}
          viewAllHref="/stays"
        />
        <HomeExploreLinks />
        <WhyBolexman />
        <Testimonials
          id="testimonials"
          viewAllHref="/testimonials"
          showStoryFeed={false}
        />
        <BecomeHostCTA />
      </main>
    </SiteShell>
  );
}
