import type { Metadata } from "next";
import { AdvancedSearch } from "@/components/home/advanced-search";
import { BecomeHostCTA } from "@/components/home/become-host-cta";
import { HeroSection } from "@/components/home/hero-section";
import { WhyBolexman } from "@/components/home/why-bolexman";
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
        <WhyBolexman />
        <BecomeHostCTA />
      </main>
    </SiteShell>
  );
}
