/** Tiny neutral blur placeholder for next/image `blurDataURL`. */
export const IMAGE_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=";

export const imageSizes = {
  hero: "100vw",
  fullWidth: "100vw",
  destination: "(max-width: 768px) 70vw, 25vw",
  property: "(max-width: 768px) 100vw, 33vw",
  experience: "(max-width: 1024px) 100vw, 33vw",
  experienceFeatured: "(max-width: 1024px) 100vw, 50vw",
  story: "280px",
  mapFallback: "(max-width: 1024px) 100vw, 60vw",
} as const;

/** Request a right-sized Unsplash image instead of full-resolution originals. */
export function optimizeUnsplashUrl(url: string, width = 1200, quality = 75) {
  if (!url.includes("images.unsplash.com")) return url;

  const parsed = new URL(url);
  parsed.searchParams.set("w", String(width));
  parsed.searchParams.set("q", String(quality));
  parsed.searchParams.set("auto", "format");
  parsed.searchParams.set("fit", "crop");
  return parsed.toString();
}
