"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
};

/**
 * Defers heavy media (hero video, etc.) until the user interacts or after a
 * long idle period — skipped on slow connections and reduced-motion prefs.
 */
export function useLazyRichMedia(fallbackDelayMs = 8000) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || ready) return;

    const connection = (navigator as Navigator & { connection?: NetworkInformation })
      .connection;

    if (connection?.saveData) return;
    if (
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g"
    ) {
      return;
    }

    const activate = () => setReady(true);
    const events = ["scroll", "click", "touchstart", "keydown"] as const;

    const onInteract = () => {
      activate();
      events.forEach((event) =>
        window.removeEventListener(event, onInteract, true)
      );
    };

    events.forEach((event) =>
      window.addEventListener(event, onInteract, { capture: true, passive: true })
    );

    const timer = window.setTimeout(activate, fallbackDelayMs);

    return () => {
      window.clearTimeout(timer);
      events.forEach((event) =>
        window.removeEventListener(event, onInteract, true)
      );
    };
  }, [shouldReduceMotion, ready, fallbackDelayMs]);

  return ready && !shouldReduceMotion;
}
