"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useAiAssistant } from "@/components/features/ai-assistant-context";
import { SITE_TAGLINE, TRUST_METRICS } from "@/lib/constants";
import { IMAGE_BLUR, imageSizes, optimizeUnsplashUrl } from "@/lib/image-utils";

const HERO_IMAGE = optimizeUnsplashUrl(
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  1920,
  80
);

export function HeroSection() {
  const { openAssistant } = useAiAssistant();

  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Luxury resort infinity pool overlooking the ocean"
        fill
        priority
        placeholder="blur"
        blurDataURL={IMAGE_BLUR}
        sizes={imageSizes.hero}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bolex-primary/75 via-bolex-primary/40 to-bolex-primary/90" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-32 pt-28 text-center">
        <p className="text-caption mb-4 uppercase tracking-[0.3em] text-bolex-accent">
          {SITE_TAGLINE}
        </p>
        <h1 className="text-display max-w-5xl text-white">
          Discover Exceptional Hospitality Experiences
        </h1>
        <p className="text-body-lg mx-auto mt-6 max-w-2xl text-white/85">
          Luxury villas, hotels, apartments, and curated experiences for modern
          travelers.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/#search"
            className="luxury-glow inline-flex h-12 items-center justify-center rounded-lg bg-bolex-accent px-8 text-base font-medium text-bolex-primary transition-colors hover:bg-bolex-accent/90"
          >
            Start Your Search
          </Link>
          <button
            type="button"
            onClick={openAssistant}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 bg-white/5 px-8 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            Ask BOLEXMAN AI
          </button>
        </div>

        <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-6 border-t border-white/15 pt-10 sm:grid-cols-4">
          {TRUST_METRICS.map((metric) => (
            <div key={metric.label} className="text-center">
              <p className="font-price text-2xl font-medium text-white md:text-3xl">
                {"decimals" in metric && metric.decimals
                  ? metric.value.toFixed(metric.decimals)
                  : metric.value.toLocaleString()}
                {metric.suffix}
              </p>
              <p className="text-caption mt-1 text-white/60">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-white/70">
        <ChevronDown className="size-6" />
      </div>
    </section>
  );
}
