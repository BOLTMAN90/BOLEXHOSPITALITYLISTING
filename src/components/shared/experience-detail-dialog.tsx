"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Clock, Sparkles, Users } from "lucide-react";
import { ListingImage } from "@/components/shared/listing-image";
import { PriceDisplay } from "@/components/shared/price-display";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/contexts/user-context";
import { useUserData } from "@/contexts/user-data-context";
import { imageSizes } from "@/lib/image-utils";
import type { Experience } from "@/types/experience";

interface ExperienceDetailDialogProps {
  experience: Experience | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExperienceDetailDialog({
  experience,
  open,
  onOpenChange,
}: ExperienceDetailDialogProps) {
  const { user } = useUser();
  const { addTrip } = useUserData();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [form, setForm] = useState({
    date: "",
    guests: 2,
    name: user?.name ?? "",
    email: user?.email ?? "",
    notes: "",
  });

  if (!experience) return null;

  const handleBook = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.date || !form.name || !form.email) {
      toast.error("Please fill in date, name, and email.");
      return;
    }
    if (user) {
      addTrip({
        propertyTitle: experience.title,
        location: experience.category,
        checkIn: form.date,
        checkOut: form.date,
        guests: form.guests,
        status: "upcoming",
        notes: form.notes || `Experience booking: ${experience.title}`,
      });
    }
    toast.success(
      "Experience booking received. Our concierge team will confirm your reservation shortly."
    );
    setBookingOpen(false);
    setForm({ date: "", guests: 2, name: user?.name ?? "", email: user?.email ?? "", notes: "" });
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
            src={experience.image}
            alt={experience.title}
            sizes={imageSizes.fullWidth}
          />
        </div>

        <div className="space-y-5 p-6">
          <DialogHeader className="text-left">
            <p className="text-caption text-bolex-accent">{experience.category}</p>
            <DialogTitle className="font-heading text-2xl text-bolex-primary">
              {experience.title}
            </DialogTitle>
            <div className="flex flex-wrap gap-4 text-caption text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" />
                {experience.duration}
              </span>
              <span className="inline-flex items-center gap-1">
                <Users className="size-3.5" />
                {experience.groupSize}
              </span>
            </div>
          </DialogHeader>

          <p className="text-body leading-relaxed text-bolex-primary/80">
            {experience.description}
          </p>

          <div>
            <h4 className="text-sm font-medium text-bolex-primary">What&apos;s included</h4>
            <ul className="mt-3 space-y-2">
              {experience.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Sparkles className="mt-0.5 size-3.5 shrink-0 text-bolex-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {!bookingOpen ? (
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <PriceDisplay amount={experience.price} suffix="" />
              <Button
                onClick={() => setBookingOpen(true)}
                className="bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
              >
                Book this experience
              </Button>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-4 border-t border-border pt-5">
              <h4 className="font-medium text-bolex-primary">Book your experience</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exp-date">Preferred date</Label>
                  <Input
                    id="exp-date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exp-guests">Guests</Label>
                  <Input
                    id="exp-guests"
                    type="number"
                    min={1}
                    max={20}
                    value={form.guests}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, guests: Number(e.target.value) || 1 }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exp-name">Full name</Label>
                  <Input
                    id="exp-name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exp-email">Email</Label>
                  <Input
                    id="exp-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="exp-notes">Special requests (optional)</Label>
                <Textarea
                  id="exp-notes"
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Dietary needs, accessibility, celebration details…"
                />
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setBookingOpen(false)}>
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
                >
                  Confirm booking
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
