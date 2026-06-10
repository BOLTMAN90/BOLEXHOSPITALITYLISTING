"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FALLBACK_LISTING_IMAGE,
  IMAGE_BLUR,
  optimizeUnsplashUrl,
} from "@/lib/image-utils";
import { cn } from "@/lib/utils";

interface ListingImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes: string;
  className?: string;
  priority?: boolean;
}

export function ListingImage({
  src,
  alt,
  fill = true,
  sizes,
  className,
  priority,
}: ListingImageProps) {
  const [imgSrc, setImgSrc] = useState(() => optimizeUnsplashUrl(src));

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={IMAGE_BLUR}
      className={cn("object-cover", className)}
      onError={() => setImgSrc(optimizeUnsplashUrl(FALLBACK_LISTING_IMAGE))}
    />
  );
}
