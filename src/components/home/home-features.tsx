"use client";

import { AiAssistantProvider } from "@/components/features/ai-assistant-context";
import { AITravelAssistant } from "@/components/features/ai-travel-assistant";

export function HomeFeatures({ children }: { children: React.ReactNode }) {
  return (
    <AiAssistantProvider>
      {children}
      <AITravelAssistant />
    </AiAssistantProvider>
  );
}
