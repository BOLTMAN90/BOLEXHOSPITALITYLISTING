"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { IMAGE_BLUR, imageSizes, optimizeUnsplashUrl } from "@/lib/image-utils";

const HOST_IMAGE = optimizeUnsplashUrl(
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  1600
);

const HOST_BENEFITS = [
  "Premium guest verification",
  "Dedicated host concierge",
  "Professional photography",
  "Flexible payout schedule",
];

const SUCCESS_STORIES = [
  { name: "Amara O.", location: "Lagos", earnings: "$9,200/mo" },
  { name: "David K.", location: "Dubai", earnings: "$14,500/mo" },
  { name: "Sofia R.", location: "Santorini", earnings: "$11,800/mo" },
];

export function BecomeHostCTA() {
  const { requireAuth } = useRequireAuth();
  const [nightlyRate, setNightlyRate] = useState(350);
  const [nightsBooked, setNightsBooked] = useState(18);
  const estimated = nightlyRate * nightsBooked;

  return (
    <section id="become-host" className="relative min-h-[560px] scroll-mt-24 overflow-hidden">
      <Image
        src={HOST_IMAGE}
        alt="Luxury property interior"
        fill
        placeholder="blur"
        blurDataURL={IMAGE_BLUR}
        sizes={imageSizes.fullWidth}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-bolex-dark/88" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-32">
        <ScrollReveal>
          <p className="text-caption uppercase tracking-[0.2em] text-bolex-accent">
            Become a Host
          </p>
          <h2 className="text-h1 mt-4 text-white">Earn More With BOLEXMAN</h2>
          <p className="text-body-lg mt-4 text-white/75">
            Join an exclusive network of premium hosts. List your villa, apartment,
            or boutique property and welcome guests who value exceptional hospitality.
          </p>

          <ul className="mt-8 space-y-3">
            {HOST_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-white/85">
                <CheckCircle2 className="size-5 shrink-0 text-bolex-accent" />
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => requireAuth("/host#list-your-property")}
              className="luxury-glow inline-flex h-12 items-center justify-center rounded-lg bg-bolex-accent px-8 text-base font-medium text-bolex-primary transition-colors hover:bg-bolex-accent/90"
            >
              List Your Property
            </button>
            <button
              type="button"
              onClick={() => requireAuth("/host#learn-about-hosting")}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-8 text-base font-medium text-white transition-colors hover:bg-white/10"
            >
              Learn About Hosting
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
            <div className="flex items-center gap-2 text-bolex-accent">
              <TrendingUp className="size-5" />
              <p className="text-sm font-medium uppercase tracking-wider">
                Earnings Calculator
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nightly-rate" className="text-white/80">
                  Nightly rate ($)
                </Label>
                <Input
                  id="nightly-rate"
                  type="number"
                  min={50}
                  value={nightlyRate}
                  onChange={(e) => setNightlyRate(Number(e.target.value) || 0)}
                  className="border-white/20 bg-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nights-booked" className="text-white/80">
                  Nights booked / month
                </Label>
                <Input
                  id="nights-booked"
                  type="number"
                  min={1}
                  max={30}
                  value={nightsBooked}
                  onChange={(e) => setNightsBooked(Number(e.target.value) || 0)}
                  className="border-white/20 bg-white/10 text-white"
                />
              </div>
            </div>

            <p className="font-price mt-8 text-4xl text-white">
              ${estimated.toLocaleString()}
              <span className="text-base font-normal text-white/60"> / month</span>
            </p>
            <p className="text-caption mt-2 text-white/50">
              Estimated earnings before fees. Actual results vary by location and season.
            </p>

            <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
              <p className="text-sm font-medium text-white/90">Host success stories</p>
              {SUCCESS_STORIES.map((story) => (
                <div
                  key={story.name}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm"
                >
                  <span className="text-white/85">
                    {story.name} · {story.location}
                  </span>
                  <span className="font-price text-bolex-accent">{story.earnings}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
