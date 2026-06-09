"use client";

import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { PropertyCard } from "@/components/shared/property-card";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";
import { useUser } from "@/contexts/user-context";
import { properties } from "@/data/properties";
import { CONTAINER_CLASS } from "@/lib/constants";

export default function WishlistPage() {
  const { user } = useUser();
  const saved = properties.slice(0, 2);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Your account"
        title="Wishlist"
        subtitle="Save extraordinary stays and experiences for your next journey."
      />
      <main className="bg-bolex-secondary">
        <section className="section-padding">
          <div className={CONTAINER_CLASS}>
            {!user ? (
              <div className="mx-auto max-w-lg rounded-2xl bg-white p-10 text-center shadow-luxury">
                <Heart className="mx-auto size-10 text-bolex-accent" />
                <h2 className="text-h3 mt-6 text-bolex-primary">Sign in to save favorites</h2>
                <p className="text-body mt-3 text-bolex-primary/65">
                  Use the heart icon on property cards to build your wishlist after signing in.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-bolex-accent px-6 text-sm font-medium text-bolex-primary hover:bg-bolex-accent/90"
                >
                  Go to homepage to sign in
                </Link>
              </div>
            ) : saved.length === 0 ? (
              <div className="mx-auto max-w-lg rounded-2xl bg-white p-10 text-center shadow-luxury">
                <MapPin className="mx-auto size-10 text-bolex-accent" />
                <h2 className="text-h3 mt-6 text-bolex-primary">Your wishlist is empty</h2>
                <p className="text-body mt-3 text-bolex-primary/65">
                  Hi {user.name.split(" ")[0]}, tap the heart on any stay to save it here.
                </p>
                <Link
                  href="/stays"
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-bolex-accent px-6 text-sm font-medium text-bolex-primary hover:bg-bolex-accent/90"
                >
                  Browse stays
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {saved.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
