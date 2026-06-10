"use client";

import Link from "next/link";
import { ListingImage } from "@/components/shared/listing-image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { FEATURED_COLLECTIONS } from "@/lib/constants";
import { imageSizes } from "@/lib/image-utils";

interface FeaturedCollectionsProps {
  showHeader?: boolean;
  id?: string;
}

export function FeaturedCollections({
  showHeader = true,
  id,
}: FeaturedCollectionsProps = {}) {
  const content = (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_COLLECTIONS.map((collection, index) => (
          <ScrollReveal key={collection.id} delay={index * 0.06}>
            <Link
              href={collection.href}
              className="editorial-card group luxury-glow-hover block"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ListingImage
                  src={collection.image}
                  alt={collection.title}
                  sizes={imageSizes.property}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bolex-primary/90 via-bolex-primary/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-caption text-bolex-accent">{collection.subtitle}</p>
                  <h3 className="font-heading mt-1 text-2xl">{collection.title}</h3>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
  );

  if (!showHeader) {
    return (
      <section id={id} className="section-padding scroll-mt-24 bg-bolex-secondary">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{content}</div>
      </section>
    );
  }

  return (
    <SectionWrapper
      id={id ?? "collections"}
      eyebrow="Curated For You"
      title="Featured Collections"
      subtitle="Editorial picks for every kind of luxury journey."
      className="bg-bolex-secondary"
    >
      {content}
    </SectionWrapper>
  );
}
