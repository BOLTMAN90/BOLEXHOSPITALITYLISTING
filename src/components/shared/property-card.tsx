"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { ListingImage } from "@/components/shared/listing-image";
import { PropertyDetailDialog } from "@/components/shared/property-detail-dialog";
import { PriceDisplay } from "@/components/shared/price-display";
import { RatingStars } from "@/components/shared/rating-stars";
import { Badge } from "@/components/ui/badge";
import { useAuthUI } from "@/contexts/auth-ui-context";
import { useUserData } from "@/contexts/user-data-context";
import { useUser } from "@/contexts/user-context";
import { imageSizes } from "@/lib/image-utils";
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
  const { user } = useUser();
  const { openSignIn } = useAuthUI();
  const { isWishlisted, toggleWishlist } = useUserData();
  const [detailOpen, setDetailOpen] = useState(false);
  const wishlisted = isWishlisted(property.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      openSignIn();
      return;
    }
    toggleWishlist(property.id);
  };

  const handleCardClick = () => {
    onSelect?.();
    setDetailOpen(true);
  };

  return (
    <>
      <article
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
        className={cn(
          "group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-luxury transition-all hover:shadow-lift",
          highlighted && "ring-2 ring-bolex-accent",
          className
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <ListingImage
            src={property.images[0]}
            alt={property.title}
            sizes={imageSizes.property}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <button
            type="button"
            onClick={handleWishlist}
            className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
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
          <p className="text-caption text-bolex-accent">Tap to view details →</p>
        </div>
      </article>

      <PropertyDetailDialog
        property={property}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </>
  );
}
