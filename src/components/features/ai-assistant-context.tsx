"use client";

import { createContext, useContext, useState } from "react";

interface AiAssistantContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  openAssistant: () => void;
}

const AiAssistantContext = createContext<AiAssistantContextValue | null>(null);

export function AiAssistantProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <AiAssistantContext.Provider
      value={{
        open,
        setOpen,
        openAssistant: () => setOpen(true),
      }}
    >
      {children}
    </AiAssistantContext.Provider>
  );
}

export function useAiAssistant() {
  const context = useContext(AiAssistantContext);
  if (!context) {
    throw new Error("useAiAssistant must be used within AiAssistantProvider");
  }
  return context;
}
