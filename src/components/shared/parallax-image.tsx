"use client";

import Image, { type ImageProps } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useParallax } from "@/hooks/use-parallax";
import { cn } from "@/lib/utils";

interface ParallaxImageProps extends Omit<ImageProps, "ref"> {
  offset?: number;
  containerClassName?: string;
}

export function ParallaxImage({
  offset = 100,
  containerClassName,
  className,
  alt,
  ...props
}: ParallaxImageProps) {
  const shouldReduceMotion = useReducedMotion();
  const { ref, y } = useParallax(offset);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      {shouldReduceMotion ? (
        <Image alt={alt} className={cn("object-cover", className)} {...props} />
      ) : (
        <motion.div style={{ y }} className="h-full w-full">
          <Image alt={alt} className={cn("object-cover", className)} {...props} />
        </motion.div>
      )}
    </div>
  );
}
