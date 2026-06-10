"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DestinationDetailDialog } from "@/components/shared/destination-detail-dialog";
import { ListingImage } from "@/components/shared/listing-image";
import { PriceDisplay } from "@/components/shared/price-display";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { scaleOnHover } from "@/lib/animations";
import { imageSizes } from "@/lib/image-utils";
import type { Destination } from "@/types/destination";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export function DestinationCard({ destination, className }: DestinationCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const { user, requireAuth } = useRequireAuth();
  const [detailOpen, setDetailOpen] = useState(false);

  const openDetail = () => {
    if (!user) {
      requireAuth("/destinations");
      return;
    }
    setDetailOpen(true);
  };

  const cardInner = (
    <div className="relative aspect-[3/4] overflow-hidden">
      <ListingImage
        src={destination.image}
        alt={destination.name}
        sizes={imageSizes.destination}
        className="transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bolex-primary/90 via-bolex-primary/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="text-caption text-bolex-accent">{destination.country}</p>
        <h3 className="text-h3 mt-1">{destination.name}</h3>
        <p className="text-caption mt-2 text-white/70">
          {destination.propertyCount} properties
        </p>
        <PriceDisplay
          amount={destination.startingPrice}
          suffix="from"
          className="mt-2 text-white"
        />
        <p className="text-caption mt-3 text-white/60">Tap to explore →</p>
      </div>
    </div>
  );

  return (
    <>
      <motion.div
        initial="rest"
        whileHover={shouldReduceMotion ? undefined : "hover"}
        variants={shouldReduceMotion ? undefined : scaleOnHover}
        className={cn("group relative", className)}
      >
        <button
          type="button"
          onClick={openDetail}
          className="block w-full overflow-hidden rounded-2xl text-left shadow-luxury transition-shadow hover:shadow-lift"
        >
          {cardInner}
        </button>
      </motion.div>

      <DestinationDetailDialog
        destination={destination}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </>
  );
}
