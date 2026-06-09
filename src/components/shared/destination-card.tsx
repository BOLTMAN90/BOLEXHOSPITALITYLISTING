"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { PriceDisplay } from "@/components/shared/price-display";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { scaleOnHover } from "@/lib/animations";
import { IMAGE_BLUR, imageSizes } from "@/lib/image-utils";
import type { Destination } from "@/types/destination";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export function DestinationCard({ destination, className }: DestinationCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const { user, requireAuth } = useRequireAuth();

  const cardInner = (
    <div className="relative aspect-[3/4] overflow-hidden">
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        placeholder="blur"
        blurDataURL={IMAGE_BLUR}
        sizes={imageSizes.destination}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
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
      </div>
    </div>
  );

  return (
    <motion.div
      initial="rest"
      whileHover={shouldReduceMotion ? undefined : "hover"}
      variants={shouldReduceMotion ? undefined : scaleOnHover}
      className={cn("group relative", className)}
    >
      {user ? (
        <Link
          href="/destinations"
          className="block overflow-hidden rounded-2xl shadow-luxury transition-shadow hover:shadow-lift"
        >
          {cardInner}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => requireAuth("/destinations")}
          className="block w-full overflow-hidden rounded-2xl text-left shadow-luxury transition-shadow hover:shadow-lift"
        >
          {cardInner}
        </button>
      )}
    </motion.div>
  );
}
