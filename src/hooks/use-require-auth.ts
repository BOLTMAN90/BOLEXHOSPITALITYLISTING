"use client";

import { useRouter } from "next/navigation";
import { useAuthUI } from "@/contexts/auth-ui-context";
import { useUser } from "@/contexts/user-context";

export function useRequireAuth() {
  const { user } = useUser();
  const { openSignIn } = useAuthUI();
  const router = useRouter();

  const requireAuth = (href: string) => {
    if (user) {
      router.push(href);
      return;
    }
    openSignIn();
  };

  return { user, requireAuth, openSignIn, isAuthenticated: !!user };
}
