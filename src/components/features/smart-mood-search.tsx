"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PriceDisplay } from "@/components/shared/price-display";
import { properties } from "@/data/properties";
import { getTopMoodMatches } from "@/lib/data-helpers";
import { MOOD_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SmartMoodSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MOOD_EXPLANATIONS: Record<string, string> = {
  romantic:
    "These intimate, scenic properties are curated for romance — privacy, views, and exceptional ambiance.",
  adventure:
    "Bold destinations with unique experiences, from alpine retreats to desert escapes.",
  wellness:
    "Restorative stays focused on spa rituals, nature, and mindful luxury.",
  family:
    "Spacious properties with amenities and locations suited for memorable family journeys.",
  celebration:
    "Statement stays perfect for milestones, from skyline suites to exclusive resorts.",
  "solo-retreat":
    "Tranquil sanctuaries ideal for reflection, discovery, and personal renewal.",
};

function VibeSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-bolex-primary">{label}</span>
        <span className="text-caption text-muted-foreground">{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1.5 w-full cursor-pointer accent-bolex-accent"
      />
    </div>
  );
}

export function SmartMoodSearch({ open, onOpenChange }: SmartMoodSearchProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [energy, setEnergy] = useState(50);
  const [seclusion, setSeclusion] = useState(60);
  const [budget, setBudget] = useState(70);
  const [results, setResults] = useState<ReturnType<typeof getTopMoodMatches>>(
    []
  );
  const [explanation, setExplanation] = useState("");

  const handleSubmit = () => {
    if (!selectedMood) {
      toast.error("Select a mood to find your perfect stay.");
      return;
    }

    const matches = getTopMoodMatches(properties, selectedMood, 3);
    setResults(matches);

    const moodLabel =
      MOOD_OPTIONS.find((m) => m.id === selectedMood)?.label ?? selectedMood;
    const baseExplanation =
      MOOD_EXPLANATIONS[selectedMood] ??
      "These properties align with your selected mood.";

    setExplanation(
      `${baseExplanation} Your vibe profile — Energy ${energy}%, Seclusion ${seclusion}%, Budget comfort ${budget}% — prioritizes ${moodLabel.toLowerCase()} stays with premium BOLEXMAN standards.`
    );

    if (matches.length === 0) {
      toast.message("No exact matches — try another mood.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg gap-6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-h3 flex items-center gap-2">
            <Sparkles className="size-5 text-bolex-accent" />
            Smart Mood Search
          </DialogTitle>
        </DialogHeader>

        <p className="text-body text-muted-foreground">
          How do you want to feel on this journey?
        </p>

        <div className="flex flex-wrap gap-2">
          {MOOD_OPTIONS.map((mood) => (
            <button
              key={mood.id}
              type="button"
              onClick={() => setSelectedMood(mood.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                selectedMood === mood.id
                  ? "border-bolex-accent bg-bolex-accent/10 text-bolex-primary"
                  : "border-border hover:border-bolex-accent/50"
              )}
            >
              {mood.label}
            </button>
          ))}
        </div>

        <div className="space-y-4 rounded-xl border bg-muted/20 p-4">
          <p className="text-caption uppercase tracking-wider text-bolex-accent">
            Fine-tune your vibe
          </p>
          <VibeSlider label="Energy" value={energy} onChange={setEnergy} />
          <VibeSlider label="Seclusion" value={seclusion} onChange={setSeclusion} />
          <VibeSlider label="Budget comfort" value={budget} onChange={setBudget} />
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
        >
          Find My Match
        </Button>

        {results.length > 0 ? (
          <div className="space-y-3 border-t pt-4">
            <p className="text-caption uppercase tracking-wider text-bolex-accent">
              Top matches for you
            </p>
            {explanation ? (
              <p className="text-body text-bolex-primary/70">{explanation}</p>
            ) : null}
            {results.map((property) => (
              <div
                key={property.id}
                className="rounded-xl border bg-muted/30 p-4"
              >
                <p className="font-medium text-bolex-primary">{property.title}</p>
                <p className="text-caption text-muted-foreground">
                  {property.location.city}, {property.location.country}
                </p>
                <PriceDisplay amount={property.pricePerNight} className="mt-2" />
              </div>
            ))}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
