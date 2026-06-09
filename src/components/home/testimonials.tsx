"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TravelStoryFeed } from "@/components/features/travel-story-feed";
import { RatingStars } from "@/components/shared/rating-stars";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ViewAllLink } from "@/components/shared/view-all-link";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { CONTAINER_CLASS } from "@/lib/constants";
import { testimonials } from "@/data/testimonials";

interface TestimonialsProps {
  viewAllHref?: string;
  showHeader?: boolean;
}

export function Testimonials({
  viewAllHref,
  showHeader = true,
}: TestimonialsProps = {}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const content = (
    <>
      <ScrollReveal>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="min-w-0 shrink-0 grow-0 basis-full px-1"
              >
                <div className="mx-auto max-w-3xl rounded-2xl bg-bolex-secondary p-8 text-center md:p-12">
                  <RatingStars
                    rating={item.rating}
                    showValue={false}
                    className="justify-center"
                  />
                  <blockquote className="font-heading mt-6 text-xl leading-relaxed text-bolex-primary md:text-2xl">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <div className="mt-8 flex flex-col items-center gap-3">
                    <Avatar size="lg">
                      <AvatarImage src={item.avatar} alt={item.name} />
                      <AvatarFallback>{item.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-bolex-primary">{item.name}</p>
                      <p className="text-caption text-muted-foreground">{item.trip}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`size-2 rounded-full transition-colors ${
                index === selectedIndex ? "bg-bolex-accent" : "bg-bolex-primary/20"
              }`}
            />
          ))}
        </div>
      </ScrollReveal>

      <div className="mt-16">
        <TravelStoryFeed />
      </div>
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
      eyebrow="Guest Stories"
      title="Testimonials & Reviews"
      subtitle="Hear from travelers who discovered their perfect journey with BOLEXMAN."
      className="bg-white"
      action={
        viewAllHref ? <ViewAllLink href={viewAllHref} label="All stories" /> : undefined
      }
    >
      {content}
    </SectionWrapper>
  );
}
