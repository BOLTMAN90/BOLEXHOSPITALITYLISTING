"use client";

import { useState } from "react";
import { BadgeCheck, Crown, Heart, TrendingUp, Trophy } from "lucide-react";
import { ListingImage } from "@/components/shared/listing-image";
import { PropertyDetailDialog } from "@/components/shared/property-detail-dialog";
import { PriceDisplay } from "@/components/shared/price-display";
import { RatingStars } from "@/components/shared/rating-stars";
import { Badge } from "@/components/ui/badge";
import { useAuthUI } from "@/contexts/auth-ui-context";
import { useUserData } from "@/contexts/user-data-context";
import { useUser } from "@/contexts/user-context";
import { imageSizes } from "@/lib/image-utils";
import type { Property, PropertyBadge } from "@/types/property";
import { cn } from "@/lib/utils";

const BADGE_CONFIG: Record<
  PropertyBadge,
  { label: string; icon: typeof BadgeCheck; className: string }
> = {
  verified: {
    label: "Verified",
    icon: BadgeCheck,
    className: "bg-white/95 text-bolex-primary",
  },
  "guest-favorite": {
    label: "Guest Favorite",
    icon: Trophy,
    className: "bg-bolex-primary/90 text-white",
  },
  luxury: {
    label: "Luxury",
    icon: Crown,
    className: "bg-bolex-accent text-bolex-primary",
  },
  trending: {
    label: "Trending",
    icon: TrendingUp,
    className: "bg-white/95 text-bolex-primary",
  },
};

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

  const badges = property.badges ?? (property.featured ? ["luxury" as const] : []);

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
          "group cursor-pointer overflow-hidden rounded-2xl border border-transparent bg-white shadow-luxury transition-all duration-500",
          "hover:-translate-y-1 hover:border-bolex-accent/40 hover:shadow-lift",
          highlighted && "ring-2 ring-bolex-accent luxury-glow",
          className
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <ListingImage
            src={property.images[0]}
            alt={property.title}
            sizes={imageSizes.property}
            className="transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bolex-primary/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <button
            type="button"
            onClick={handleWishlist}
            className={cn(
              "absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-white/95 shadow-sm transition-all duration-300 hover:scale-110",
              wishlisted && "luxury-glow"
            )}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={cn(
                "size-4 transition-colors",
                wishlisted ? "fill-red-500 text-red-500" : "text-bolex-primary"
              )}
            />
          </button>

          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {badges.slice(0, 2).map((badge) => {
              const config = BADGE_CONFIG[badge];
              const Icon = config.icon;
              return (
                <Badge
                  key={badge}
                  className={cn("gap-1 shadow-sm", config.className)}
                >
                  <Icon className="size-3" />
                  {config.label}
                </Badge>
              );
            })}
          </div>
        </div>

        <div className="space-y-2.5 p-5">
          <RatingStars rating={property.rating} reviewCount={property.reviewCount} />
          <h3 className="font-heading text-lg font-medium text-bolex-text line-clamp-1">
            {property.title}
          </h3>
          <p className="text-caption text-bolex-muted">
            {property.location.city}, {property.location.country}
          </p>
          <div className="flex items-end justify-between gap-3 pt-1">
            <PriceDisplay amount={property.pricePerNight} />
            <span className="text-caption capitalize text-bolex-muted">
              {property.category}
            </span>
          </div>
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
