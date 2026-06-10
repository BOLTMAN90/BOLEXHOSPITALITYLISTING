"use client";

import { AiAssistantProvider } from "@/components/features/ai-assistant-context";
import { AITravelAssistant } from "@/components/features/ai-travel-assistant";
import { FloatingConciergeButton } from "@/components/features/floating-concierge-button";

export function HomeFeatures({ children }: { children: React.ReactNode }) {
  return (
    <AiAssistantProvider>
      {children}
      <FloatingConciergeButton />
      <AITravelAssistant />
    </AiAssistantProvider>
  );
}
