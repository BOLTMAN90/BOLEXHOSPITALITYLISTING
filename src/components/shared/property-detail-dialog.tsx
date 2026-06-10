"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ListingImage } from "@/components/shared/listing-image";
import { PriceDisplay } from "@/components/shared/price-display";
import { RatingStars } from "@/components/shared/rating-stars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/user-context";
import { useUserData } from "@/contexts/user-data-context";
import { imageSizes } from "@/lib/image-utils";
import type { Property } from "@/types/property";

interface PropertyDetailDialogProps {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PropertyDetailDialog({
  property,
  open,
  onOpenChange,
}: PropertyDetailDialogProps) {
  const { user } = useUser();
  const { addTrip } = useUserData();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  if (!property) return null;

  const handleBook = (event: React.FormEvent) => {
    event.preventDefault();
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates.");
      return;
    }
    if (user) {
      addTrip({
        propertyTitle: property.title,
        location: `${property.location.city}, ${property.location.country}`,
        checkIn,
        checkOut,
        guests,
        status: "upcoming",
        notes: "Booked via BOLEXMAN stays",
      });
    }
    toast.success(
      "Booking request received. Our concierge team will confirm your stay shortly."
    );
    setBookingOpen(false);
    setCheckIn("");
    setCheckOut("");
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setBookingOpen(false);
      }}
    >
      <DialogContent className="max-h-[90vh] max-w-2xl gap-0 overflow-y-auto p-0">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <ListingImage
            src={property.images[0]}
            alt={property.title}
            sizes={imageSizes.fullWidth}
          />
          <Badge className="absolute left-4 top-4 bg-bolex-accent/90 capitalize text-bolex-primary">
            {property.category}
          </Badge>
        </div>

        <div className="space-y-5 p-6">
          <DialogHeader className="text-left">
            <DialogTitle className="font-heading text-2xl text-bolex-primary">
              {property.title}
            </DialogTitle>
            <p className="text-caption text-muted-foreground">
              {property.location.city}, {property.location.country}
            </p>
          </DialogHeader>

          <RatingStars rating={property.rating} reviewCount={property.reviewCount} />

          <p className="text-body leading-relaxed text-bolex-primary/80">
            {property.description}
          </p>

          <div>
            <h4 className="text-sm font-medium text-bolex-primary">Amenities</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {property.amenities.map((amenity) => (
                <Badge key={amenity} variant="secondary">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>

          {!bookingOpen ? (
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <PriceDisplay amount={property.pricePerNight} />
              <Button
                onClick={() => setBookingOpen(true)}
                className="bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
              >
                Book this stay
              </Button>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-4 border-t border-border pt-5">
              <h4 className="font-medium text-bolex-primary">Request a booking</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stay-checkin">Check-in</Label>
                  <Input
                    id="stay-checkin"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stay-checkout">Check-out</Label>
                  <Input
                    id="stay-checkout"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stay-guests">Guests</Label>
                <Input
                  id="stay-guests"
                  type="number"
                  min={1}
                  max={20}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value) || 1)}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setBookingOpen(false)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
                >
                  Confirm booking request
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
