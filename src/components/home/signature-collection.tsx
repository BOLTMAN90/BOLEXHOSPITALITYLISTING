"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ListingImage } from "@/components/shared/listing-image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SIGNATURE_COLLECTIONS } from "@/lib/constants";
import { imageSizes } from "@/lib/image-utils";
import { cn } from "@/lib/utils";

interface SignatureCollectionProps {
  showHeader?: boolean;
  id?: string;
}

export function SignatureCollection({
  showHeader = true,
  id = "signature-collection",
}: SignatureCollectionProps = {}) {
  const [hero, ...rest] = SIGNATURE_COLLECTIONS;

  const grid = (
    <div className="grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
      <ScrollReveal className="lg:col-span-7 lg:row-span-2">
        <Link
          href={hero.href}
          className="editorial-card group relative block h-full min-h-[420px] overflow-hidden lg:min-h-[560px]"
        >
          <ListingImage
            src={hero.image}
            alt={hero.title}
            sizes={imageSizes.hero}
            className="absolute inset-0 size-full transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bolex-dark via-bolex-dark/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
            <p className="text-caption uppercase tracking-[0.2em] text-bolex-accent">
              {hero.subtitle}
            </p>
            <h3 className="font-heading mt-3 max-w-lg text-4xl text-white md:text-5xl">
              {hero.title}
            </h3>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/90 transition-colors group-hover:text-bolex-accent">
              Explore collection
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </ScrollReveal>

      {rest.map((item, index) => (
        <ScrollReveal
          key={item.id}
          delay={0.08 + index * 0.06}
          className={cn("lg:col-span-5", index >= 2 && "lg:col-span-5")}
        >
          <Link
            href={item.href}
            className="editorial-card group relative block min-h-[240px] overflow-hidden lg:min-h-[270px]"
          >
            <ListingImage
              src={item.image}
              alt={item.title}
              sizes={imageSizes.property}
              className="absolute inset-0 size-full transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bolex-primary/95 via-bolex-primary/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-caption text-bolex-accent">{item.subtitle}</p>
              <h3 className="font-heading mt-1 text-2xl text-white">{item.title}</h3>
            </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  );

  if (!showHeader) {
    return (
      <section id={id} className="section-padding scroll-mt-24 bg-bolex-secondary">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{grid}</div>
      </section>
    );
  }

  return (
    <SectionWrapper
      id={id}
      eyebrow="Aspirational Stays"
      title="BOLEXMAN Signature Collection"
      subtitle="Our most extraordinary properties — curated for travelers who expect nothing less than exceptional."
      className="bg-bolex-secondary"
    >
      {grid}
    </SectionWrapper>
  );
}
