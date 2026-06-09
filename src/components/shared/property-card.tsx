"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PriceDisplay } from "@/components/shared/price-display";
import { RatingStars } from "@/components/shared/rating-stars";
import { IMAGE_BLUR, imageSizes } from "@/lib/image-utils";
import type { Property } from "@/types/property";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  highlighted?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function PropertyCard({
  property,
  highlighted = false,
  onSelect,
  className,
}: PropertyCardProps) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <article
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={(e) => e.key === "Enter" && onSelect?.()}
      className={cn(
        "group overflow-hidden rounded-2xl bg-white shadow-luxury transition-all hover:shadow-lift",
        highlighted && "ring-2 ring-bolex-accent",
        onSelect && "cursor-pointer",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          placeholder="blur"
          blurDataURL={IMAGE_BLUR}
          sizes={imageSizes.property}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted(!wishlisted);
          }}
          className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
          aria-label="Add to wishlist"
        >
          <Heart
            className={cn(
              "size-4",
              wishlisted ? "fill-red-500 text-red-500" : "text-bolex-primary"
            )}
          />
        </button>
        <Badge className="absolute left-3 top-3 bg-bolex-accent/90 capitalize text-bolex-primary hover:bg-bolex-accent/90">
          {property.category}
        </Badge>
      </div>

      <div className="space-y-2 p-5">
        <h3 className="font-heading text-lg font-medium text-bolex-primary line-clamp-1">
          {property.title}
        </h3>
        <p className="text-caption text-muted-foreground">
          {property.location.city}, {property.location.country}
        </p>
        <RatingStars rating={property.rating} reviewCount={property.reviewCount} />
        <PriceDisplay amount={property.pricePerNight} />
      </div>
    </article>
  );
}
