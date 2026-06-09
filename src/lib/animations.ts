import type { Transition, Variants } from "framer-motion";

export const EASE_LUXURY: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_LUXURY },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_LUXURY },
  },
};

export const scaleOnHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.3, ease: EASE_LUXURY } },
};

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export const reducedMotionStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0, delayChildren: 0 },
  },
};

export const navbarScrollTransition: Transition = {
  duration: 0.35,
  ease: EASE_LUXURY,
};

export const navbarScroll = {
  top: {
    backgroundColor: "rgba(11, 18, 32, 0)",
    borderColor: "rgba(255, 255, 255, 0)",
    backdropFilter: "blur(0px)",
  },
  scrolled: {
    backgroundColor: "rgba(11, 18, 32, 0.82)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(16px)",
  },
};

export const heroParallax = {
  contentY: {
    range: [0, 500] as [number, number],
    output: [0, -100] as [number, number],
    reduced: [0, 0] as [number, number],
  },
  contentOpacity: {
    range: [0, 400] as [number, number],
    output: [1, 0] as [number, number],
  },
};

export function getSectionVariants(
  shouldReduceMotion: boolean,
  stagger = false
): Variants {
  if (shouldReduceMotion) {
    return reducedMotionVariants;
  }

  return stagger ? staggerContainer : fadeInUp;
}

export function getStaggerItemVariants(
  shouldReduceMotion: boolean
): Variants {
  return shouldReduceMotion ? reducedMotionVariants : staggerItem;
}
