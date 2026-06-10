"use client";

import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  CalendarIcon,
  MapPin,
  Minus,
  Plus,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SmartMoodSearch } from "@/components/features/smart-mood-search";
import { GlassPanel } from "@/components/shared/glass-panel";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { destinations } from "@/data/destinations";
import { CONTAINER_CLASS, PROPERTY_CATEGORIES, QUICK_SEARCH_PILLS } from "@/lib/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PropertyType } from "@/types/search";

const LOCATION_SUGGESTIONS = destinations.map((d) => `${d.name}, ${d.country}`);

function GuestStepper({
  label,
  value,
  onChange,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-bolex-primary">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="inline-flex size-8 items-center justify-center rounded-full border hover:bg-muted"
        >
          <Minus className="size-3.5" />
        </button>
        <span className="w-4 text-center text-sm font-medium">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="inline-flex size-8 items-center justify-center rounded-full border hover:bg-muted"
        >
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

function SearchFields({
  location,
  setLocation,
  dateRange,
  setDateRange,
  adults,
  setAdults,
  children,
  setChildren,
  rooms,
  setRooms,
  propertyType,
  setPropertyType,
  onSearch,
  onMoodSearch,
  compact = false,
}: {
  location: string;
  setLocation: (v: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (v: DateRange | undefined) => void;
  adults: number;
  setAdults: (v: number) => void;
  children: number;
  setChildren: (v: number) => void;
  rooms: number;
  setRooms: (v: number) => void;
  propertyType: PropertyType;
  setPropertyType: (v: PropertyType) => void;
  onSearch: () => void;
  onMoodSearch: () => void;
  compact?: boolean;
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const filtered = LOCATION_SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(location.toLowerCase())
  );

  const guestSummary = `${adults} adult${adults !== 1 ? "s" : ""}${children ? `, ${children} child${children !== 1 ? "ren" : ""}` : ""} · ${rooms} room${rooms !== 1 ? "s" : ""}`;

  return (
    <div className={cn("space-y-4", compact && "space-y-5")}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Where to?"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="h-11 pl-10"
        />
        {showSuggestions && location && filtered.length > 0 ? (
          <div className="absolute z-20 mt-1 w-full rounded-lg border bg-popover p-1 shadow-lg">
            {filtered.slice(0, 5).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
                onClick={() => {
                  setLocation(suggestion);
                  setShowSuggestions(false);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className={cn("grid gap-3", compact ? "grid-cols-1" : "md:grid-cols-2")}>
        <Popover>
          <PopoverTrigger className="flex h-11 w-full items-center gap-2 rounded-lg border border-input px-3 text-left text-sm hover:bg-muted/50">
            <CalendarIcon className="size-4 text-muted-foreground" />
            {dateRange?.from && dateRange?.to
              ? `${format(dateRange.from, "MMM d")} – ${format(dateRange.to, "MMM d")}`
              : "Check-in — Check-out"}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={compact ? 1 : 2}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger className="flex h-11 w-full items-center gap-2 rounded-lg border border-input px-3 text-left text-sm hover:bg-muted/50">
            <Users className="size-4 text-muted-foreground" />
            {guestSummary}
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4" align="start">
            <GuestStepper label="Adults" value={adults} onChange={setAdults} min={1} />
            <GuestStepper label="Children" value={children} onChange={setChildren} />
            <GuestStepper label="Rooms" value={rooms} onChange={setRooms} min={1} />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-wrap gap-2">
        {QUICK_SEARCH_PILLS.map((pill) =>
          "href" in pill && pill.href ? (
            <Link
              key={pill.id}
              href={pill.href}
              className="rounded-full border border-bolex-primary/10 px-4 py-2 text-xs font-medium text-bolex-text transition-all hover:border-bolex-accent/50 hover:bg-bolex-accent/5 hover:text-bolex-primary sm:text-sm"
            >
              {pill.label}
            </Link>
          ) : (
            <button
              key={pill.id}
              type="button"
              onClick={() => setPropertyType(pill.id as PropertyType)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition-all sm:text-sm",
                propertyType === pill.id
                  ? "border-bolex-accent bg-bolex-accent/10 text-bolex-primary"
                  : "border-bolex-primary/10 text-bolex-text hover:border-bolex-accent/50 hover:bg-bolex-accent/5"
              )}
            >
              {pill.label}
            </button>
          )
        )}
      </div>

      <Tabs
        value={propertyType}
        onValueChange={(v) => setPropertyType(v as PropertyType)}
      >
        <TabsList className="w-full justify-start overflow-x-auto">
          {PROPERTY_CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id} className="text-xs sm:text-sm">
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          onClick={onSearch}
          className="h-11 flex-1 bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
        >
          <Search className="size-4" />
          Search
        </Button>
        <Button
          variant="outline"
          onClick={onMoodSearch}
          className="h-11 flex-1 border-bolex-accent/40 text-bolex-primary hover:bg-bolex-accent/5"
        >
          <Sparkles className="size-4 text-bolex-accent" />
          Mood Search
        </Button>
      </div>
    </div>
  );
}

export function AdvancedSearch() {
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [propertyType, setPropertyType] = useState<PropertyType>("all");
  const [moodOpen, setMoodOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = () => {
    toast.success("Searching luxury stays...", {
      description: location || "All destinations",
    });
    setMobileOpen(false);
  };

  const fieldProps = {
    location,
    setLocation,
    dateRange,
    setDateRange,
    adults,
    setAdults,
    children,
    setChildren,
    rooms,
    setRooms,
    propertyType,
    setPropertyType,
    onSearch: handleSearch,
    onMoodSearch: () => setMoodOpen(true),
  };

  return (
    <>
      <div className={cn(CONTAINER_CLASS, "relative z-20 -mt-12 mb-8 space-y-4")}>
        <ScrollReveal className="hidden md:block">
          <GlassPanel className="luxury-glow p-5 shadow-lift md:p-7">
            <p className="text-caption mb-4 uppercase tracking-[0.15em] text-bolex-accent">
              Find Your Perfect Stay
            </p>
            <SearchFields {...fieldProps} />
          </GlassPanel>
        </ScrollReveal>

        <ScrollReveal className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="flex h-14 w-full items-center gap-3 rounded-2xl border bg-white/95 px-4 shadow-lift backdrop-blur-sm">
              <Search className="size-5 text-bolex-accent" />
              <div className="text-left">
                <p className="text-sm font-medium text-bolex-primary">Where to?</p>
                <p className="text-caption text-muted-foreground">
                  Anywhere · Any week · Add guests
                </p>
              </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
              <SheetHeader>
                <SheetTitle className="font-heading text-left">Search stays</SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto px-1 pb-8 pt-4">
                <SearchFields {...fieldProps} compact />
              </div>
            </SheetContent>
          </Sheet>
        </ScrollReveal>
      </div>

      <SmartMoodSearch open={moodOpen} onOpenChange={setMoodOpen} />
    </>
  );
}
