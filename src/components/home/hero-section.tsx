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
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { useAiAssistant } from "@/components/features/ai-assistant-context";
import { useLazyRichMedia } from "@/hooks/use-lazy-rich-media";
import { heroParallax } from "@/lib/animations";
import { SITE_TAGLINE, TRUST_METRICS } from "@/lib/constants";
import { IMAGE_BLUR, imageSizes, optimizeUnsplashUrl } from "@/lib/image-utils";

const HERO_POSTER = optimizeUnsplashUrl(
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  1920,
  80
);

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
        alt="Luxury resort infinity pool overlooking the ocean"
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
      <div className="absolute inset-0 bg-gradient-to-b from-bolex-primary/75 via-bolex-primary/40 to-bolex-primary/90" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-32 pt-28 text-center"
      >
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-caption mb-4 uppercase tracking-[0.3em] text-bolex-accent"
        >
          {SITE_TAGLINE}
        </motion.p>
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-display max-w-5xl text-white"
        >
          Discover Exceptional Hospitality Experiences
        </motion.h1>
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-body-lg mx-auto mt-6 max-w-2xl text-white/85"
        >
          Luxury villas, hotels, apartments and curated experiences for modern
          travelers.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
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
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-6 border-t border-white/15 pt-10 sm:grid-cols-4"
        >
          {TRUST_METRICS.map((metric) => (
            <div key={metric.label} className="text-center">
              <p className="text-2xl font-medium text-white md:text-3xl">
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  decimals={"decimals" in metric ? metric.decimals : 0}
                />
              </p>
              <p className="text-caption mt-1 text-white/60">{metric.label}</p>
            </div>
          ))}
        </motion.div>
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
