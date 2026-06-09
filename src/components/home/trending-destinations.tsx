"use client";

import useEmblaCarousel from "embla-carousel-react";
import { DestinationCard } from "@/components/shared/destination-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ViewAllLink } from "@/components/shared/view-all-link";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { CONTAINER_CLASS } from "@/lib/constants";
import { destinations } from "@/data/destinations";

interface TrendingDestinationsProps {
  limit?: number;
  viewAllHref?: string;
  showHeader?: boolean;
}

export function TrendingDestinations({
  limit,
  viewAllHref,
  showHeader = true,
}: TrendingDestinationsProps = {}) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const items = limit ? destinations.slice(0, limit) : destinations;

  const content = (
    <>
      <div className="hidden gap-6 lg:grid lg:grid-cols-4">
        {items.map((destination, index) => (
          <ScrollReveal key={destination.id} delay={index * 0.05}>
            <DestinationCard destination={destination} />
          </ScrollReveal>
        ))}
      </div>

      <div className="overflow-hidden lg:hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {items.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              className="min-w-[75%] shrink-0 sm:min-w-[45%]"
            />
          ))}
        </div>
      </div>
    </>
  );

  if (!showHeader) {
    return (
      <section className="section-padding bg-bolex-secondary">
        <div className={CONTAINER_CLASS}>{content}</div>
      </section>
    );
  }

  return (
    <SectionWrapper
      eyebrow="Explore"
      title="Trending Destinations"
      subtitle="The world's most sought-after locales, curated for the discerning traveler."
      className="bg-bolex-secondary"
      action={viewAllHref ? <ViewAllLink href={viewAllHref} /> : undefined}
    >
      {content}
    </SectionWrapper>
  );
}
