export const PUBLIC_PATHS = ["/"] as const;

export const PROTECTED_PATHS = [
  "/stays",
  "/destinations",
  "/experiences",
  "/concierge",
  "/collections",
  "/testimonials",
  "/stories",
  "/host",
  "/dashboard",
  "/trips",
  "/wishlist",
] as const;

export function isProtectedPath(pathname: string) {
  return PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}
