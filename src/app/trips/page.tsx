"use client";

import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";
import { useUser } from "@/contexts/user-context";
import { CONTAINER_CLASS } from "@/lib/constants";

export default function TripsPage() {
  const { user } = useUser();

  return (
    <SiteShell>
      <PageHero
        eyebrow="Your account"
        title="My Trips"
        subtitle="View upcoming and past luxury stays booked through BOLEXMAN."
      />
      <main className="bg-bolex-secondary">
        <section className="section-padding">
          <div className={CONTAINER_CLASS}>
            {!user ? (
              <div className="mx-auto max-w-lg rounded-2xl bg-white p-10 text-center shadow-luxury">
                <CalendarDays className="mx-auto size-10 text-bolex-accent" />
                <h2 className="text-h3 mt-6 text-bolex-primary">Sign in to view trips</h2>
                <p className="text-body mt-3 text-bolex-primary/65">
                  Your upcoming and past bookings will appear here once you sign in.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-bolex-accent px-6 text-sm font-medium text-bolex-primary hover:bg-bolex-accent/90"
                >
                  Go to homepage to sign in
                </Link>
              </div>
            ) : (
              <div className="mx-auto max-w-lg rounded-2xl bg-white p-10 text-center shadow-luxury">
                <MapPin className="mx-auto size-10 text-bolex-accent" />
                <h2 className="text-h3 mt-6 text-bolex-primary">No trips yet</h2>
                <p className="text-body mt-3 text-bolex-primary/65">
                  Hi {user.name.split(" ")[0]}, you have no bookings yet. Start exploring
                  luxury stays worldwide.
                </p>
                <Link
                  href="/stays"
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-bolex-accent px-6 text-sm font-medium text-bolex-primary hover:bg-bolex-accent/90"
                >
                  Browse stays
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
