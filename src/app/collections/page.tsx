import type { Metadata } from "next";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { SignatureCollection } from "@/components/home/signature-collection";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Featured Collections — BOLEXMAN",
  description:
    "Editorial luxury collections — beachfront villas, romantic escapes, family retreats, and more.",
};

export default function CollectionsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Curated For You"
        title="Featured Collections"
        subtitle="Handpicked categories for every kind of luxury journey."
      />
      <main className="bg-bolex-secondary">
        <FeaturedCollections showHeader={false} />
        <SignatureCollection />
      </main>
    </SiteShell>
  );
}
