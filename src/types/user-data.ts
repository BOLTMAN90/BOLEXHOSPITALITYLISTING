export type TripStatus = "upcoming" | "completed" | "cancelled";

export interface Trip {
  id: string;
  propertyTitle: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: TripStatus;
  notes?: string;
}

export interface UserDataStore {
  trips: Trip[];
  wishlist: string[];
}
