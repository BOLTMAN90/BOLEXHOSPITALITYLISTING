"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { BadgeCheck, Play } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  id?: string;
}

export function Testimonials({
  viewAllHref,
  showHeader = true,
  id,
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
                <div className="mx-auto max-w-3xl rounded-3xl border border-bolex-primary/5 bg-white p-8 text-center shadow-luxury md:p-12 luxury-glow-hover">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <RatingStars
                      rating={item.rating}
                      showValue={false}
                      className="justify-center"
                    />
                    {item.verified ? (
                      <Badge className="gap-1 bg-bolex-accent/15 text-bolex-primary hover:bg-bolex-accent/15">
                        <BadgeCheck className="size-3" />
                        Verified Guest
                      </Badge>
                    ) : null}
                    {item.hasVideo ? (
                      <Badge variant="secondary" className="gap-1">
                        <Play className="size-3" />
                        Video Review
                      </Badge>
                    ) : null}
                  </div>
                  <blockquote className="font-heading mt-6 text-xl leading-relaxed text-bolex-text md:text-2xl">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <div className="mt-8 flex flex-col items-center gap-3">
                    <Avatar size="lg" className="ring-2 ring-bolex-accent/30">
                      <AvatarImage src={item.avatar} alt={item.name} />
                      <AvatarFallback>{item.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-bolex-text">{item.name}</p>
                      <p className="text-caption text-bolex-muted">{item.trip}</p>
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
      <section id={id} className="section-padding scroll-mt-24 bg-white">
        <div className={CONTAINER_CLASS}>{content}</div>
      </section>
    );
  }

  return (
    <SectionWrapper
      id={id}
      eyebrow="Testimonials"
      title="Guest Reviews"
      subtitle="Hear from travelers who discovered their perfect journey with BOLEXMAN."
      className="bg-white"
      action={
        viewAllHref ? <ViewAllLink href={viewAllHref} label="All testimonials" /> : undefined
      }
    >
      {content}
    </SectionWrapper>
  );
}
