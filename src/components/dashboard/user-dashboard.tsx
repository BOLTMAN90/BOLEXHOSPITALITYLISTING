"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  CalendarDays,
  Camera,
  Heart,
  LogOut,
  Pencil,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import { PropertyCard } from "@/components/shared/property-card";
import { UserAvatar } from "@/components/shared/user-avatar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserData } from "@/contexts/user-data-context";
import { useUser } from "@/contexts/user-context";
import { properties } from "@/data/properties";
import { CONTAINER_CLASS } from "@/lib/constants";
import type { Trip, TripStatus } from "@/types/user-data";
import { cn } from "@/lib/utils";

const TABS = ["profile", "trips", "wishlist"] as const;
type DashboardTab = (typeof TABS)[number];

const EMPTY_TRIP = {
  propertyTitle: "",
  location: "",
  checkIn: "",
  checkOut: "",
  guests: 2,
  status: "upcoming" as TripStatus,
  notes: "",
};

const MAX_AVATAR_BYTES = 300_000;

function isValidTab(value: string | null): value is DashboardTab {
  return TABS.includes(value as DashboardTab);
}

export function UserDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, updateProfile, signOut } = useUser();
  const { trips, wishlistIds, addTrip, updateTrip, deleteTrip, removeFromWishlist } =
    useUserData();

  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<DashboardTab>(
    isValidTab(tabParam) ? tabParam : "profile"
  );

  useEffect(() => {
    if (isValidTab(tabParam)) setActiveTab(tabParam);
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    const tab = value as DashboardTab;
    setActiveTab(tab);
    router.replace(`/dashboard?tab=${tab}`, { scroll: false });
  };

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tripDialogOpen, setTripDialogOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [tripForm, setTripForm] = useState(EMPTY_TRIP);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone ?? "");
    }
  }, [user]);

  const wishlistedProperties = properties.filter((p) =>
    wishlistIds.includes(p.id)
  );

  const openAddTrip = () => {
    setEditingTrip(null);
    setTripForm(EMPTY_TRIP);
    setTripDialogOpen(true);
  };

  const openEditTrip = (trip: Trip) => {
    setEditingTrip(trip);
    setTripForm({
      propertyTitle: trip.propertyTitle,
      location: trip.location,
      checkIn: trip.checkIn,
      checkOut: trip.checkOut,
      guests: trip.guests,
      status: trip.status,
      notes: trip.notes ?? "",
    });
    setTripDialogOpen(true);
  };

  const handleTripSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!tripForm.propertyTitle.trim() || !tripForm.location.trim()) return;

    const payload = {
      propertyTitle: tripForm.propertyTitle.trim(),
      location: tripForm.location.trim(),
      checkIn: tripForm.checkIn,
      checkOut: tripForm.checkOut,
      guests: tripForm.guests,
      status: tripForm.status,
      notes: tripForm.notes.trim() || undefined,
    };

    if (editingTrip) {
      updateTrip(editingTrip.id, payload);
    } else {
      addTrip(payload);
    }
    setTripDialogOpen(false);
  };

  const handleProfileSave = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    updateProfile({ name: name.trim(), phone: phone.trim() || undefined });
  };

  const handleAvatarChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) return;
      if (file.size > MAX_AVATAR_BYTES) {
        toast.error("Please choose an image under 300 KB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          updateProfile({ avatar: reader.result });
        }
      };
      reader.readAsDataURL(file);
      event.target.value = "";
    },
    [updateProfile]
  );

  const handleRemoveAvatar = () => {
    updateProfile({ avatar: undefined });
  };

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-bolex-secondary pt-24 pb-16">
      <div className={CONTAINER_CLASS}>
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-widest text-bolex-accent">
            Your account
          </p>
          <h1 className="font-heading mt-2 text-3xl font-medium text-bolex-primary md:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your profile, trips, and saved stays.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="gap-6">
          <TabsList variant="line" className="w-full justify-start border-b border-border pb-0">
            <TabsTrigger value="profile" className="gap-2">
              <User className="size-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="trips" className="gap-2">
              <CalendarDays className="size-4" />
              My Trips
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="gap-2">
              <Heart className="size-4" />
              Wishlist
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
              <div className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-luxury">
                <div className="relative">
                  <UserAvatar user={user} size="lg" className="size-24" />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 inline-flex size-9 items-center justify-center rounded-full bg-bolex-accent text-bolex-primary shadow-md transition-colors hover:bg-bolex-accent/90"
                    aria-label="Upload avatar"
                  >
                    <Camera className="size-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleAvatarChange}
                  />
                </div>
                <p className="mt-4 font-heading text-lg text-bolex-primary">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {user.avatar ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-muted-foreground"
                    onClick={handleRemoveAvatar}
                  >
                    Remove photo
                  </Button>
                ) : null}
              </div>

              <form
                onSubmit={handleProfileSave}
                className="space-y-6 rounded-2xl bg-white p-8 shadow-luxury"
              >
                <h2 className="font-heading text-xl text-bolex-primary">Profile details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="profile-name">Full name</Label>
                    <Input
                      id="profile-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-email">Email</Label>
                    <Input
                      id="profile-email"
                      type="email"
                      value={user.email}
                      disabled
                      className="bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-phone">Phone</Label>
                    <Input
                      id="profile-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 555 000 0000"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    type="submit"
                    className="bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
                  >
                    Save changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 text-destructive hover:bg-destructive/5 hover:text-destructive"
                    onClick={handleSignOut}
                  >
                    <LogOut className="size-4" />
                    Sign out
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="trips">
            <div className="rounded-2xl bg-white p-6 shadow-luxury md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading text-xl text-bolex-primary">My trips</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add, edit, or remove your upcoming and past stays.
                  </p>
                </div>
                <Button
                  onClick={openAddTrip}
                  className="gap-2 bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
                >
                  <Plus className="size-4" />
                  Add trip
                </Button>
              </div>

              {trips.length === 0 ? (
                <div className="mt-10 rounded-xl border border-dashed border-border py-16 text-center">
                  <CalendarDays className="mx-auto size-10 text-bolex-accent" />
                  <p className="mt-4 font-medium text-bolex-primary">No trips yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Create a trip or browse stays to plan your next journey.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Button
                      onClick={openAddTrip}
                      className="bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
                    >
                      Add your first trip
                    </Button>
                    <Link
                      href="/stays"
                      className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      Browse stays
                    </Link>
                  </div>
                </div>
              ) : (
                <ul className="mt-8 space-y-4">
                  {trips.map((trip) => (
                    <li
                      key={trip.id}
                      className="flex flex-col gap-4 rounded-xl border border-border p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-heading text-lg text-bolex-primary">
                            {trip.propertyTitle}
                          </h3>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "capitalize",
                              trip.status === "upcoming" && "bg-bolex-accent/20 text-bolex-primary",
                              trip.status === "completed" && "bg-green-100 text-green-800",
                              trip.status === "cancelled" && "bg-red-100 text-red-800"
                            )}
                          >
                            {trip.status}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{trip.location}</p>
                        <p className="mt-2 text-sm text-bolex-primary/80">
                          {trip.checkIn || "—"} → {trip.checkOut || "—"} · {trip.guests}{" "}
                          guest{trip.guests !== 1 ? "s" : ""}
                        </p>
                        {trip.notes ? (
                          <p className="mt-2 text-sm italic text-muted-foreground">
                            {trip.notes}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => openEditTrip(trip)}
                        >
                          <Pencil className="size-3.5" />
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-1 text-destructive hover:bg-destructive/5 hover:text-destructive"
                          onClick={() => deleteTrip(trip.id)}
                        >
                          <Trash2 className="size-3.5" />
                          Delete
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            <div className="rounded-2xl bg-white p-6 shadow-luxury md:p-8">
              <h2 className="font-heading text-xl text-bolex-primary">Wishlist</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Stays you have saved from property listings.
              </p>

              {wishlistedProperties.length === 0 ? (
                <div className="mt-10 rounded-xl border border-dashed border-border py-16 text-center">
                  <Heart className="mx-auto size-10 text-bolex-accent" />
                  <p className="mt-4 font-medium text-bolex-primary">Your wishlist is empty</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Tap the heart on any stay to save it here.
                  </p>
                  <Link
                    href="/stays"
                    className="mt-6 inline-flex h-9 items-center justify-center rounded-lg bg-bolex-accent px-4 text-sm font-medium text-bolex-primary transition-colors hover:bg-bolex-accent/90"
                  >
                    Browse stays
                  </Link>
                </div>
              ) : (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {wishlistedProperties.map((property) => (
                    <div key={property.id} className="relative">
                      <PropertyCard property={property} />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute bottom-5 right-5 gap-1 bg-white/95 shadow-sm"
                        onClick={() => removeFromWishlist(property.id)}
                      >
                        <Trash2 className="size-3.5" />
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={tripDialogOpen} onOpenChange={setTripDialogOpen}>
        <DialogContent className="max-w-md gap-4">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editingTrip ? "Edit trip" : "Add trip"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleTripSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="trip-title">Property / stay name</Label>
              <Input
                id="trip-title"
                value={tripForm.propertyTitle}
                onChange={(e) =>
                  setTripForm((f) => ({ ...f, propertyTitle: e.target.value }))
                }
                placeholder="Villa Serenity"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trip-location">Location</Label>
              <Input
                id="trip-location"
                value={tripForm.location}
                onChange={(e) =>
                  setTripForm((f) => ({ ...f, location: e.target.value }))
                }
                placeholder="Santorini, Greece"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trip-checkin">Check-in</Label>
                <Input
                  id="trip-checkin"
                  type="date"
                  value={tripForm.checkIn}
                  onChange={(e) =>
                    setTripForm((f) => ({ ...f, checkIn: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trip-checkout">Check-out</Label>
                <Input
                  id="trip-checkout"
                  type="date"
                  value={tripForm.checkOut}
                  onChange={(e) =>
                    setTripForm((f) => ({ ...f, checkOut: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trip-guests">Guests</Label>
                <Input
                  id="trip-guests"
                  type="number"
                  min={1}
                  max={20}
                  value={tripForm.guests}
                  onChange={(e) =>
                    setTripForm((f) => ({
                      ...f,
                      guests: Number(e.target.value) || 1,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={tripForm.status}
                  onValueChange={(value) =>
                    setTripForm((f) => ({
                      ...f,
                      status: (value ?? "upcoming") as TripStatus,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="trip-notes">Notes (optional)</Label>
              <Input
                id="trip-notes"
                value={tripForm.notes}
                onChange={(e) => setTripForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Special requests, flight info…"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
            >
              {editingTrip ? "Save changes" : "Add trip"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
