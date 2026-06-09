"use client";

import { ConciergeServices } from "@/components/features/concierge-services";
import { ExperienceCard } from "@/components/shared/experience-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ViewAllLink } from "@/components/shared/view-all-link";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { CONTAINER_CLASS } from "@/lib/constants";
import { experiences } from "@/data/experiences";

interface CuratedExperiencesProps {
  showConcierge?: boolean;
  viewAllHref?: string;
  showHeader?: boolean;
}

export function CuratedExperiences({
  showConcierge = true,
  viewAllHref,
  showHeader = true,
}: CuratedExperiencesProps = {}) {
  const featured = experiences.find((e) => e.featured) ?? experiences[0];
  const rest = experiences.filter((e) => e.id !== featured.id).slice(0, 4);

  const content = (
    <>
      <div className="grid gap-6 lg:grid-cols-2 lg:grid-rows-2">
        <ScrollReveal className="lg:row-span-2">
          <ExperienceCard experience={featured} featured />
        </ScrollReveal>
        {rest.map((experience, index) => (
          <ScrollReveal key={experience.id} delay={index * 0.08}>
            <ExperienceCard experience={experience} />
          </ScrollReveal>
        ))}
      </div>

      {showConcierge ? (
        <div className="mt-12">
          <ScrollReveal>
            <p className="text-caption mb-6 uppercase tracking-[0.15em] text-bolex-accent">
              Concierge Services
            </p>
          </ScrollReveal>
          <ConciergeServices />
        </div>
      ) : null}
    </>
  );

  if (!showHeader) {
    return (
      <section className="section-padding bg-white">
        <div className={CONTAINER_CLASS}>{content}</div>
      </section>
    );
  }

  return (
    <SectionWrapper
      eyebrow="Curated"
      title="Extraordinary Experiences"
      subtitle="Private dining, yacht charters, wellness retreats, and cultural immersions."
      className="bg-white"
      action={viewAllHref ? <ViewAllLink href={viewAllHref} /> : undefined}
    >
      {content}
    </SectionWrapper>
  );
}
