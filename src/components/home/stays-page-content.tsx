"use client";

import { useSearchParams } from "next/navigation";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { InteractiveMap } from "@/components/home/interactive-map";
import { PageHero } from "@/components/layout/page-hero";
import { getCollectionLabel } from "@/lib/collection-filters";

export function StaysPageContent() {
  const searchParams = useSearchParams();
  const collection = searchParams.get("collection");
  const collectionLabel = getCollectionLabel(collection);

  return (
    <>
      <PageHero
        eyebrow={collectionLabel ? "Collection" : "Handpicked"}
        title={collectionLabel?.title ?? "Featured Luxury Properties"}
        subtitle={
          collectionLabel?.subtitle ??
          "Filter by category, preview on the map, and find your next extraordinary stay."
        }
      />
      <main className="bg-bolex-secondary">
        <FeaturedProperties showHeader={false} collection={collection} />
        <InteractiveMap showHeader={false} />
      </main>
    </>
  );
}
