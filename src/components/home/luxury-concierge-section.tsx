"use client";

import Link from "next/link";
import {
  Car,
  KeyRound,
  Map,
  Plane,
  Shield,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TrustBar } from "@/components/shared/trust-bar";
import { CONTAINER_CLASS } from "@/lib/constants";

const SERVICES = [
  { icon: Plane, title: "Airport Pickup", description: "Seamless arrivals in luxury vehicles" },
  { icon: Car, title: "Chauffeur Services", description: "Private drivers at your disposal" },
  { icon: KeyRound, title: "Car Rental", description: "Premium fleet, delivered to you" },
  { icon: Map, title: "Tour Guide", description: "Local experts, bespoke itineraries" },
  { icon: Shield, title: "Private Security", description: "Discreet protection when you need it" },
  { icon: Sparkles, title: "VIP Experiences", description: "Exclusive access, unforgettable moments" },
];

export function LuxuryConciergeSection() {
  return (
    <section className="section-padding bg-bolex-dark text-bolex-secondary">
      <div className={CONTAINER_CLASS}>
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-caption uppercase tracking-[0.2em] text-bolex-accent">
            White-Glove Service
          </p>
          <h2 className="text-h1 mt-4 text-white">Luxury Concierge</h2>
          <p className="text-body-lg mt-4 text-white/70">
            From airport transfers to VIP experiences — every detail handled with
            world-class care.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.05}>
              <div className="group rounded-2xl border border-white/10 bg-bolex-card/60 p-6 transition-all duration-500 hover:border-bolex-accent/40 hover:bg-bolex-card luxury-glow-hover">
                <service.icon className="size-8 text-bolex-accent transition-transform duration-500 group-hover:scale-110" />
                <h3 className="font-heading mt-5 text-xl text-white">{service.title}</h3>
                <p className="text-body mt-2 text-white/60">{service.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 flex flex-col items-center gap-6">
          <TrustBar variant="dark" className="w-full max-w-4xl" />
          <Link
            href="/concierge"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-bolex-accent px-8 text-base font-medium text-bolex-primary transition-colors hover:bg-bolex-accent/90"
          >
            Request Concierge Service
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
