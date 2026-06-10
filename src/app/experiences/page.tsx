import type { Metadata } from "next";
import { CuratedExperiences } from "@/components/home/curated-experiences";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Curated Experiences — BOLEXMAN",
  description: "Private dining, yacht charters, wellness retreats, and cultural immersions.",
};

export default function ExperiencesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Curated"
        title="Extraordinary Experiences"
        subtitle="Unforgettable moments crafted by world-class hosts and concierge partners."
      />
      <main className="bg-bolex-secondary">
        <CuratedExperiences showConcierge={false} showHeader={false} showAll />
      </main>
    </SiteShell>
  );
}
