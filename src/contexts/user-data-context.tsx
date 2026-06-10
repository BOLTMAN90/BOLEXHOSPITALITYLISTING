"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { useUser } from "@/contexts/user-context";
import type { Trip, TripStatus, UserDataStore } from "@/types/user-data";

interface UserDataContextValue {
  trips: Trip[];
  wishlistIds: string[];
  addTrip: (trip: Omit<Trip, "id">) => void;
  updateTrip: (id: string, trip: Partial<Omit<Trip, "id">>) => void;
  deleteTrip: (id: string) => void;
  addToWishlist: (propertyId: string) => void;
  removeFromWishlist: (propertyId: string) => void;
  isWishlisted: (propertyId: string) => boolean;
  toggleWishlist: (propertyId: string) => void;
}

const UserDataContext = createContext<UserDataContextValue | null>(null);

function storageKey(email: string) {
  return `bolexman-data-${email.toLowerCase()}`;
}

function loadStore(email: string): UserDataStore {
  if (typeof window === "undefined") return { trips: [], wishlist: [] };
  try {
    const raw = localStorage.getItem(storageKey(email));
    return raw
      ? (JSON.parse(raw) as UserDataStore)
      : { trips: [], wishlist: [] };
  } catch {
    return { trips: [], wishlist: [] };
  }
}

function saveStore(email: string, store: UserDataStore) {
  localStorage.setItem(storageKey(email), JSON.stringify(store));
}

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [store, setStore] = useState<UserDataStore>({ trips: [], wishlist: [] });

  useEffect(() => {
    if (user?.email) {
      setStore(loadStore(user.email));
    } else {
      setStore({ trips: [], wishlist: [] });
    }
  }, [user?.email]);

  const persist = useCallback(
    (next: UserDataStore) => {
      setStore(next);
      if (user?.email) saveStore(user.email, next);
    },
    [user?.email]
  );

  const addTrip = useCallback(
    (trip: Omit<Trip, "id">) => {
      const next: UserDataStore = {
        ...store,
        trips: [{ ...trip, id: `trip-${Date.now()}` }, ...store.trips],
      };
      persist(next);
      toast.success("Trip added to your dashboard.");
    },
    [store, persist]
  );

  const updateTrip = useCallback(
    (id: string, updates: Partial<Omit<Trip, "id">>) => {
      const next: UserDataStore = {
        ...store,
        trips: store.trips.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      };
      persist(next);
      toast.success("Trip updated.");
    },
    [store, persist]
  );

  const deleteTrip = useCallback(
    (id: string) => {
      const next: UserDataStore = {
        ...store,
        trips: store.trips.filter((t) => t.id !== id),
      };
      persist(next);
      toast.message("Trip removed.");
    },
    [store, persist]
  );

  const addToWishlist = useCallback(
    (propertyId: string) => {
      if (store.wishlist.includes(propertyId)) return;
      const next: UserDataStore = {
        ...store,
        wishlist: [...store.wishlist, propertyId],
      };
      persist(next);
      toast.success("Saved to wishlist.");
    },
    [store, persist]
  );

  const removeFromWishlist = useCallback(
    (propertyId: string) => {
      const next: UserDataStore = {
        ...store,
        wishlist: store.wishlist.filter((id) => id !== propertyId),
      };
      persist(next);
      toast.message("Removed from wishlist.");
    },
    [store, persist]
  );

  const isWishlisted = useCallback(
    (propertyId: string) => store.wishlist.includes(propertyId),
    [store.wishlist]
  );

  const toggleWishlist = useCallback(
    (propertyId: string) => {
      if (store.wishlist.includes(propertyId)) {
        removeFromWishlist(propertyId);
      } else {
        addToWishlist(propertyId);
      }
    },
    [store.wishlist, addToWishlist, removeFromWishlist]
  );

  const value = useMemo(
    () => ({
      trips: store.trips,
      wishlistIds: store.wishlist,
      addTrip,
      updateTrip,
      deleteTrip,
      addToWishlist,
      removeFromWishlist,
      isWishlisted,
      toggleWishlist,
    }),
    [
      store,
      addTrip,
      updateTrip,
      deleteTrip,
      addToWishlist,
      removeFromWishlist,
      isWishlisted,
      toggleWishlist,
    ]
  );

  return (
    <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within UserDataProvider");
  }
  return context;
}

export type { TripStatus };
