export const PUBLIC_PATHS = ["/"] as const;

export const PROTECTED_PATHS = [
  "/stays",
  "/destinations",
  "/experiences",
  "/concierge",
  "/stories",
  "/host",
  "/trips",
  "/wishlist",
] as const;

export function isProtectedPath(pathname: string) {
  return PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}
