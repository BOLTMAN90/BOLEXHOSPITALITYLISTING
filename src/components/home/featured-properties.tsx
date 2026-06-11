"use client";

import { useState } from "react";
import { PropertyCard } from "@/components/shared/property-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ViewAllLink } from "@/components/shared/view-all-link";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { properties } from "@/data/properties";
import { filterPropertiesByCategory } from "@/lib/data-helpers";
import { filterPropertiesByCollection, getCollectionLabel } from "@/lib/collection-filters";
import { PROPERTY_CATEGORIES, CONTAINER_CLASS } from "@/lib/constants";
import type { PropertyType } from "@/types/search";
import { cn } from "@/lib/utils";

interface FeaturedPropertiesProps {
  limit?: number;
  viewAllHref?: string;
  showHeader?: boolean;
  id?: string;
  collection?: string | null;
}

export function FeaturedProperties({
  limit,
  viewAllHref,
  showHeader = true,
  id,
  collection = null,
}: FeaturedPropertiesProps = {}) {
  const [activeCategory, setActiveCategory] = useState<PropertyType>("all");
  const collectionLabel = getCollectionLabel(collection);
  const byCollection = filterPropertiesByCollection(properties, collection);
  const filtered = filterPropertiesByCategory(byCollection, activeCategory);
  const displayed = limit ? filtered.slice(0, limit) : filtered;

  const content = (
    <>
      {collectionLabel ? (
        <ScrollReveal>
          <p className="mb-6 rounded-2xl border border-bolex-accent/20 bg-bolex-accent/5 px-4 py-3 text-sm text-bolex-primary">
            Showing stays curated for <strong>{collectionLabel.title}</strong>.
          </p>
        </ScrollReveal>
      ) : null}

      <ScrollReveal>
        <div className="mb-8 flex flex-wrap gap-2">
          {PROPERTY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as PropertyType)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                activeCategory === cat.id
                  ? "border-bolex-primary bg-bolex-primary text-white"
                  : "border-border text-bolex-primary/70 hover:border-bolex-primary/30"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {displayed.map((property, index) => (
          <ScrollReveal key={property.id} delay={index * 0.05}>
            <PropertyCard property={property} />
          </ScrollReveal>
        ))}
      </div>
    </>
  );

  if (!showHeader) {
    return (
      <section id={id} className="section-padding scroll-mt-24 bg-white">
        <div className={CONTAINER_CLASS}>{content}</div>
      </section>
    );
  }

  return (
    <SectionWrapper
      id={id}
      eyebrow="Handpicked"
      title="Featured Luxury Properties"
      subtitle="Every stay verified for exceptional quality, service, and design."
      className="bg-white"
      action={viewAllHref ? <ViewAllLink href={viewAllHref} /> : undefined}
    >
      {content}
    </SectionWrapper>
  );
}
