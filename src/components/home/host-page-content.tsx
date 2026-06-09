"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  BadgeCheck,
  Headphones,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CONTAINER_CLASS } from "@/lib/constants";
import { IMAGE_BLUR, imageSizes, optimizeUnsplashUrl } from "@/lib/image-utils";

const HOST_IMAGE = optimizeUnsplashUrl(
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  1600
);

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Premium earnings",
    description: "Hosts on BOLEXMAN earn up to $12,000/month with verified luxury listings.",
  },
  {
    icon: ShieldCheck,
    title: "Verified guest network",
    description: "Welcome discerning travelers who value quality, service, and design.",
  },
  {
    icon: Headphones,
    title: "Dedicated host support",
    description: "24/7 concierge and onboarding support for every premium host.",
  },
  {
    icon: Sparkles,
    title: "Curated visibility",
    description: "Featured placement across destinations, experiences, and AI recommendations.",
  },
];

export function HostPageContent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    property: "",
    location: "",
    message: "",
  });

  const handleListingSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.property || !form.location) {
      toast.error("Please complete all required fields.");
      return;
    }
    toast.success("Listing request received! Our team will contact you within 48 hours.");
    setForm({ name: "", email: "", property: "", location: "", message: "" });
  };

  return (
    <>
      <section className="relative min-h-[480px] overflow-hidden">
        <Image
          src={HOST_IMAGE}
          alt="Luxury property interior"
          fill
          priority
          placeholder="blur"
          blurDataURL={IMAGE_BLUR}
          sizes={imageSizes.fullWidth}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bolex-primary/80" />

        <ScrollReveal className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 py-28 text-center sm:px-6 lg:px-8 lg:py-36">
          <p className="text-caption uppercase tracking-[0.2em] text-bolex-accent">
            Become a Host
          </p>
          <h1 className="text-h1 mt-4 max-w-3xl text-white">
            Share Your Extraordinary Space
          </h1>
          <p className="text-body-lg mx-auto mt-4 max-w-xl text-white/75">
            Join an exclusive network of premium hosts and welcome guests who
            appreciate the finest in hospitality.
          </p>
          <p className="font-price mt-6 text-xl text-bolex-accent md:text-2xl">
            Hosts earn up to $12,000/month
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#list-your-property"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-bolex-accent px-8 text-base font-medium text-bolex-primary transition-colors hover:bg-bolex-accent/90"
            >
              List Your Property
            </Link>
            <Link
              href="#learn-about-hosting"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-8 text-base font-medium text-white transition-colors hover:bg-white/10"
            >
              Learn About Hosting
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <section id="learn-about-hosting" className="section-padding scroll-mt-24 bg-white">
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <p className="text-caption uppercase tracking-[0.2em] text-bolex-accent">
              Why host with us
            </p>
            <h2 className="text-h2 mt-3 max-w-2xl font-heading text-bolex-primary">
              Learn About Hosting on BOLEXMAN
            </h2>
            <p className="text-body-lg mt-4 max-w-2xl text-bolex-primary/70">
              We partner with exceptional property owners to deliver curated luxury
              stays. Here is what you can expect as a BOLEXMAN host.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {BENEFITS.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 0.06}>
                <div className="rounded-2xl border bg-bolex-secondary p-8 shadow-luxury">
                  <benefit.icon className="size-8 text-bolex-accent" />
                  <h3 className="text-h3 mt-5 text-bolex-primary">{benefit.title}</h3>
                  <p className="text-body mt-3 text-bolex-primary/65">
                    {benefit.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-12 rounded-2xl bg-bolex-primary p-8 text-white md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <BadgeCheck className="size-8 text-bolex-accent" />
                <h3 className="text-h3 mt-4">Ready to get started?</h3>
                <p className="text-body mt-2 max-w-xl text-white/75">
                  Submit your property below and our curation team will review your
                  listing within 48 hours.
                </p>
              </div>
              <Link
                href="#list-your-property"
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-bolex-accent px-6 text-sm font-medium text-bolex-primary hover:bg-bolex-accent/90"
              >
                Start your listing
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="list-your-property" className="section-padding scroll-mt-24 bg-bolex-secondary">
        <div className={CONTAINER_CLASS}>
          <ScrollReveal>
            <p className="text-caption uppercase tracking-[0.2em] text-bolex-accent">
              List your property
            </p>
            <h2 className="text-h2 mt-3 font-heading text-bolex-primary">
              Tell us about your space
            </h2>
            <p className="text-body-lg mt-4 max-w-2xl text-bolex-primary/70">
              Complete the form and our team will reach out to guide you through
              onboarding.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-10">
            <form
              onSubmit={handleListingSubmit}
              className="mx-auto max-w-2xl space-y-5 rounded-2xl bg-white p-8 shadow-luxury md:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="host-name">Full name *</Label>
                  <Input
                    id="host-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="host-email">Email *</Label>
                  <Input
                    id="host-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="host-property">Property name *</Label>
                <Input
                  id="host-property"
                  value={form.property}
                  onChange={(e) => setForm({ ...form, property: e.target.value })}
                  placeholder="Azure Bay Villa"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="host-location">Location *</Label>
                <Input
                  id="host-location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Maldives, Indian Ocean"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="host-message">Additional details</Label>
                <Textarea
                  id="host-message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Property type, amenities, availability..."
                  rows={4}
                />
              </div>
              <Button
                type="submit"
                className="h-11 w-full bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
              >
                Submit listing request
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
