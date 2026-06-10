"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { ListingImage } from "@/components/shared/listing-image";
import { PriceDisplay } from "@/components/shared/price-display";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { imageSizes } from "@/lib/image-utils";
import type { Destination } from "@/types/destination";

interface DestinationDetailDialogProps {
  destination: Destination | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DestinationDetailDialog({
  destination,
  open,
  onOpenChange,
}: DestinationDetailDialogProps) {
  if (!destination) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl gap-0 overflow-y-auto p-0">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <ListingImage
            src={destination.image}
            alt={destination.name}
            sizes={imageSizes.fullWidth}
          />
        </div>
        <div className="space-y-5 p-6">
          <DialogHeader className="text-left">
            <p className="text-caption text-bolex-accent">{destination.country}</p>
            <DialogTitle className="font-heading text-2xl text-bolex-primary">
              {destination.name}
            </DialogTitle>
          </DialogHeader>

          <p className="text-body leading-relaxed text-bolex-primary/80">
            {destination.description}
          </p>

          <div>
            <h4 className="text-sm font-medium text-bolex-primary">What you&apos;ll experience</h4>
            <ul className="mt-3 space-y-2">
              {destination.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-bolex-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
            <div>
              <p className="text-caption text-muted-foreground">
                {destination.propertyCount} luxury properties
              </p>
              <PriceDisplay
                amount={destination.startingPrice}
                suffix="from"
                className="mt-1"
              />
            </div>
            <Link
              href="/stays"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-bolex-accent px-4 text-sm font-medium text-bolex-primary transition-colors hover:bg-bolex-accent/90"
            >
              Browse stays in {destination.name}
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
