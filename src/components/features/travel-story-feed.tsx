"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PenLine } from "lucide-react";
import { GuestAvatar } from "@/components/shared/guest-avatar";
import { ListingImage } from "@/components/shared/listing-image";
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
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { imageSizes } from "@/lib/image-utils";
import { stories } from "@/data/stories";
import { cn } from "@/lib/utils";

export function TravelStoryFeed() {
  const [shareOpen, setShareOpen] = useState(false);
  const [form, setForm] = useState({
    username: "",
    destination: "",
    story: "",
  });

  const handleShare = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.username || !form.destination || !form.story) {
      toast.error("Please complete all fields.");
      return;
    }
    toast.success("Thank you! Your story has been submitted for review.");
    setForm({ username: "", destination: "", story: "" });
    setShareOpen(false);
  };

  return (
    <div id="stories">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <ScrollReveal>
          <p className="text-caption uppercase tracking-[0.15em] text-bolex-accent">
            Travel Story Feed
          </p>
          <h3 className="text-h3 mt-2 text-bolex-text">
            Real journeys from our community
          </h3>
        </ScrollReveal>
        <Button
          variant="outline"
          onClick={() => setShareOpen(true)}
          className="border-bolex-primary/15 hover:border-bolex-accent/40 hover:bg-bolex-accent/5"
        >
          <PenLine className="size-4" />
          Share Your Story
        </Button>
      </div>

      <ScrollReveal>
        <div className="masonry-grid">
          {stories.map((story, index) => (
            <article
              key={story.id}
              className={cn(
                "masonry-item editorial-card luxury-glow-hover overflow-hidden",
                index % 3 === 0 && "sm:mt-0",
                index % 3 === 1 && "sm:mt-4"
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden",
                  index % 2 === 0 ? "aspect-[4/5]" : "aspect-[16/10]"
                )}
              >
                <ListingImage
                  src={story.image}
                  alt={story.destination}
                  sizes={imageSizes.story}
                  className="transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <GuestAvatar src={story.avatar} name={story.username} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-bolex-text">
                      @{story.username}
                    </p>
                    <p className="text-caption text-bolex-accent">
                      {story.destination}
                    </p>
                  </div>
                </div>
                <p className="text-body mt-3 text-bolex-muted line-clamp-3">
                  {story.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </ScrollReveal>

      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="max-w-md gap-4">
          <DialogHeader>
            <DialogTitle className="font-heading">Share Your Story</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleShare} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="story-username">Username</Label>
              <Input
                id="story-username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="@yourname"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="story-destination">Destination</Label>
              <Input
                id="story-destination"
                value={form.destination}
                onChange={(e) =>
                  setForm({ ...form, destination: e.target.value })
                }
                placeholder="Where did you travel?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="story-text">Your story</Label>
              <Textarea
                id="story-text"
                value={form.story}
                onChange={(e) => setForm({ ...form, story: e.target.value })}
                placeholder="Tell us about your experience..."
                rows={4}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
            >
              Submit Story
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
