"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/shared/property-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { properties } from "@/data/properties";
import type { Property } from "@/types/property";

const LeafletMapView = dynamic(
  () =>
    import("@/components/home/leaflet-map-view").then((mod) => ({
      default: mod.LeafletMapView,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[400px] animate-pulse rounded-2xl bg-bolex-primary/10" />
    ),
  }
);

export function InteractiveMapContent() {
  const [selected, setSelected] = useState<Property | null>(properties[0] ?? null);

  const handleSelect = useCallback((property: Property) => {
    setSelected(property);
  }, []);

  return (
    <ScrollReveal>
      <div className="mb-4 flex justify-end">
        <Button
          variant="outline"
          className="border-bolex-primary/20"
          onClick={() => toast.message("Searching this area...")}
        >
          Search this area
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <LeafletMapView
            properties={properties}
            selectedId={selected?.id ?? null}
            onSelect={handleSelect}
          />
        </div>

        <div className="hidden max-h-[520px] space-y-4 overflow-y-auto lg:col-span-2 lg:block">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              highlighted={selected?.id === property.id}
              onSelect={() => handleSelect(property)}
            />
          ))}
        </div>
      </div>

      {selected ? (
        <div className="mt-4 lg:hidden">
          <PropertyCard property={selected} highlighted />
        </div>
      ) : null}
    </ScrollReveal>
  );
}
