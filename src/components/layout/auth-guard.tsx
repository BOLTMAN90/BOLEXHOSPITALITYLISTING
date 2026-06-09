"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { toast } from "sonner";
import { useAuthUI } from "@/contexts/auth-ui-context";
import { useUser } from "@/contexts/user-context";
import { isProtectedPath } from "@/lib/auth";

function AuthGuardInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isReady } = useUser();
  const { openSignIn } = useAuthUI();

  const isProtected = isProtectedPath(pathname);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isReady) return;

    if (isHome && searchParams.get("auth") === "signin" && !user) {
      openSignIn();
      toast.message("Sign in or create an account to explore BOLEXMAN.");
      router.replace("/");
      return;
    }

    if (isProtected && !user) {
      toast.message("Please sign in to access this section.");
      router.replace("/?auth=signin");
    }
  }, [isReady, isProtected, isHome, user, router, searchParams, openSignIn]);

  if (!isReady) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-bolex-secondary">
        <p className="text-body text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (isProtected && !user) {
    return null;
  }

  return children;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center bg-bolex-secondary">
          <p className="text-body text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <AuthGuardInner>{children}</AuthGuardInner>
    </Suspense>
  );
}
