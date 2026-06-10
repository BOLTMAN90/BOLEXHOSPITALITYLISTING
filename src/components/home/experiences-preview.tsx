"use client";

import { CuratedExperiences } from "@/components/home/curated-experiences";
import { ViewAllLink } from "@/components/shared/view-all-link";
import { SectionWrapper } from "@/components/layout/section-wrapper";

export function ExperiencesPreview() {
  return (
    <SectionWrapper
      id="experiences-preview"
      eyebrow="Curated"
      title="Extraordinary Experiences"
      subtitle="Private chefs, boat cruises, safaris, wellness retreats, and cultural immersions."
      className="bg-white"
      action={<ViewAllLink href="/experiences" />}
    >
      <CuratedExperiences embed showConcierge={false} />
    </SectionWrapper>
  );
}
