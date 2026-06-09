"use client";

import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Property } from "@/types/property";

/** Free dark map tiles — no API key required (CARTO + OpenStreetMap). */
const TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

function createPriceIcon(price: number, selected: boolean) {
  return L.divIcon({
    className: "bolex-map-marker",
    html: `<span class="${selected ? "bolex-map-marker__pill bolex-map-marker__pill--active" : "bolex-map-marker__pill"}">$${price}</span>`,
    iconSize: [72, 32],
    iconAnchor: [36, 16],
  });
}

function FitBounds({ properties }: { properties: Property[] }) {
  const map = useMap();

  useEffect(() => {
    if (properties.length === 0) return;
    const bounds = L.latLngBounds(
      properties.map((property) => [
        property.location.lat,
        property.location.lng,
      ])
    );
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 5 });
  }, [map, properties]);

  return null;
}

function FlyToSelected({ property }: { property: Property | null }) {
  const map = useMap();

  useEffect(() => {
    if (!property) return;
    map.flyTo([property.location.lat, property.location.lng], 8, {
      duration: 0.8,
    });
  }, [map, property]);

  return null;
}

interface LeafletMapViewProps {
  properties: Property[];
  selectedId: string | null;
  onSelect: (property: Property) => void;
}

export function LeafletMapView({
  properties,
  selectedId,
  onSelect,
}: LeafletMapViewProps) {
  return (
    <MapContainer
      center={[20, 10]}
      zoom={2}
      scrollWheelZoom
      className="bolex-leaflet-map h-full min-h-[400px] rounded-2xl"
      zoomControl
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
      <FitBounds properties={properties} />
      <FlyToSelected
        property={properties.find((p) => p.id === selectedId) ?? null}
      />
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.location.lat, property.location.lng]}
          icon={createPriceIcon(
            property.pricePerNight,
            property.id === selectedId
          )}
          eventHandlers={{
            click: () => onSelect(property),
          }}
        >
          <Popup>
            <div className="space-y-1 p-1">
              <p className="font-medium text-bolex-primary">{property.title}</p>
              <p className="text-xs text-muted-foreground">
                {property.location.city}, {property.location.country}
              </p>
              <p className="text-sm font-semibold text-bolex-accent">
                ${property.pricePerNight}/night
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
