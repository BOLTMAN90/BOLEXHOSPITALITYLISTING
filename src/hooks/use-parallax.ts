"use client";

import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function useParallax(offset = 100) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [offset * 0.5, -offset * 0.5]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 1, 0.6]);

  return { ref, y, opacity, shouldReduceMotion };
}
