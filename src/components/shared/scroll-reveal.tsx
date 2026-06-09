"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  getSectionVariants,
  getStaggerItemVariants,
  staggerItem,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  stagger = false,
  delay = 0,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={getSectionVariants(shouldReduceMotion, stagger)}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollRevealItemProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollRevealItem({ children, className }: ScrollRevealItemProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className={cn(className)}
      variants={shouldReduceMotion ? getStaggerItemVariants(true) : staggerItem}
    >
      {children}
    </motion.div>
  );
}
