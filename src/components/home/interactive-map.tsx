"use client";

import dynamic from "next/dynamic";
import { LazyWhenVisible } from "@/components/shared/lazy-when-visible";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { CONTAINER_CLASS } from "@/lib/constants";

const InteractiveMapContent = dynamic(
  () =>
    import("@/components/home/interactive-map-content").then((mod) => ({
      default: mod.InteractiveMapContent,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[400px] animate-pulse rounded-2xl bg-bolex-primary/5" />
    ),
  }
);

interface InteractiveMapProps {
  showHeader?: boolean;
}

export function InteractiveMap({ showHeader = true }: InteractiveMapProps = {}) {
  const mapBlock = (
    <LazyWhenVisible minHeight={480}>
      <InteractiveMapContent />
    </LazyWhenVisible>
  );

  if (!showHeader) {
    return (
      <section id="map" className="section-padding scroll-mt-24 bg-bolex-secondary">
        <div className={CONTAINER_CLASS}>{mapBlock}</div>
      </section>
    );
  }

  return (
    <SectionWrapper
      id="map"
      eyebrow="Discover"
      title="Interactive Map Discovery"
      subtitle="Explore luxury stays across the globe. Click a marker to preview."
      className="bg-bolex-secondary"
    >
      {mapBlock}
    </SectionWrapper>
  );
}
