"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useAiAssistant } from "@/components/features/ai-assistant-context";
import { useLazyRichMedia } from "@/hooks/use-lazy-rich-media";
import { heroParallax } from "@/lib/animations";
import { IMAGE_BLUR, imageSizes, optimizeUnsplashUrl } from "@/lib/image-utils";

const HERO_POSTER = optimizeUnsplashUrl(
  "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  1920,
  80
);

/** HD variant — much smaller than the previous 2K file. */
const HERO_VIDEO =
  "https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_25fps.mp4";

export function HeroSection() {
  const { openAssistant } = useAiAssistant();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const loadVideo = useLazyRichMedia();
  const { scrollY } = useScroll();
  const contentY = useTransform(
    scrollY,
    heroParallax.contentY.range,
    shouldReduceMotion
      ? heroParallax.contentY.reduced
      : heroParallax.contentY.output
  );
  const contentOpacity = useTransform(
    scrollY,
    heroParallax.contentOpacity.range,
    heroParallax.contentOpacity.output
  );

  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image
        src={HERO_POSTER}
        alt="Luxury resort infinity pool at sunset"
        fill
        priority
        placeholder="blur"
        blurDataURL={IMAGE_BLUR}
        sizes={imageSizes.hero}
        className="object-cover"
      />
      {loadVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={HERO_POSTER}
          className="absolute inset-0 size-full object-cover"
          aria-hidden
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-bolex-primary/70 via-bolex-primary/45 to-bolex-primary/85" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-28 text-center"
      >
        <p className="text-caption mb-6 uppercase tracking-[0.25em] text-bolex-accent">
          Luxury Hospitality Ecosystem
        </p>
        <h1 className="text-display max-w-4xl text-white">
          Where Luxury Finds You
        </h1>
        <p className="text-body-lg mx-auto mt-6 max-w-2xl text-white/80">
          Discover curated hotels, resorts, villas, and extraordinary experiences
          — handpicked for the discerning traveler.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/#stays-preview"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-bolex-accent px-8 text-base font-medium text-bolex-primary transition-colors hover:bg-bolex-accent/90"
          >
            Explore Stays
          </Link>
          <button
            type="button"
            onClick={openAssistant}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 bg-white/5 px-8 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            Plan with AI
          </button>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-white/70"
        animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ChevronDown className="size-6" />
      </motion.div>
    </section>
  );
}
