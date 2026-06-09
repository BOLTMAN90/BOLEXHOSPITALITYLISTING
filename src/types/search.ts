import type { PropertyCategory } from "./property";

export type PropertyType = PropertyCategory | "all";

export interface SearchParams {
  location: string;
  checkIn?: Date;
  checkOut?: Date;
  adults: number;
  children: number;
  rooms: number;
  propertyType: PropertyType;
}
