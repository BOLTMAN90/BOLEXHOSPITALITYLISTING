"use client";

import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/shared/price-display";
import { IMAGE_BLUR, imageSizes } from "@/lib/image-utils";
import type { Experience } from "@/types/experience";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  experience: Experience;
  featured?: boolean;
  className?: string;
}

export function ExperienceCard({
  experience,
  featured = false,
  className,
}: ExperienceCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl shadow-luxury transition-shadow hover:shadow-lift",
        featured && "min-h-[420px]",
        className
      )}
    >
      <div className={cn("relative overflow-hidden", featured ? "h-full min-h-[420px]" : "aspect-[4/3]")}>
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          placeholder="blur"
          blurDataURL={IMAGE_BLUR}
          sizes={featured ? imageSizes.experienceFeatured : imageSizes.experience}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bolex-primary/95 via-bolex-primary/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-caption text-bolex-accent">{experience.category}</p>
          <h3 className={cn("font-heading mt-1", featured ? "text-h2" : "text-h3")}>
            {experience.title}
          </h3>
          <div className="mt-3 flex flex-wrap gap-4 text-caption text-white/75">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {experience.duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="size-3.5" />
              {experience.groupSize}
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-4">
            <PriceDisplay amount={experience.price} suffix="" className="text-white" />
            <Button
              size="sm"
              className="bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
            >
              Book Experience
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
