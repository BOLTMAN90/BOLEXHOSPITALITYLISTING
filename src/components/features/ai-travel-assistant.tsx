"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Bot, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useAiAssistant } from "@/components/features/ai-assistant-context";
import { aiSuggestedPrompts } from "@/data/ai-responses";
import { useIsMobile } from "@/hooks/use-media-query";
import { matchAIResponse } from "@/lib/data-helpers";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function ChatPanel({
  messages,
  input,
  setInput,
  onSend,
  onPrompt,
}: {
  messages: ChatMessage[];
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  onPrompt: (prompt: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex h-full min-h-[420px] flex-col">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pr-1">
        {messages.length === 0 ? (
          <div className="rounded-xl bg-bolex-secondary/80 p-4 text-sm text-bolex-primary/70">
            <p className="font-medium text-bolex-primary">Hello, I&apos;m BOLEXMAN AI.</p>
            <p className="mt-2">
              Ask me anything — BOLEXMAN stays, destinations, experiences, budgets,
              weather, visas, packing, or trip planning. I answer based on your question.
            </p>
          </div>
        ) : null}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
              message.role === "user"
                ? "ml-auto bg-bolex-primary text-white"
                : "bg-bolex-secondary text-bolex-primary"
            )}
          >
            {message.content}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {aiSuggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPrompt(prompt)}
            className="rounded-full border border-bolex-accent/30 bg-bolex-accent/5 px-3 py-1.5 text-xs text-bolex-primary transition-colors hover:bg-bolex-accent/10"
          >
            {prompt}
          </button>
        ))}
      </div>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          onSend();
        }}
      >
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask anything — travel, destinations, stays, tips..."
          className="h-11"
        />
        <Button
          type="submit"
          size="icon"
          className="size-11 shrink-0 bg-bolex-accent text-bolex-primary hover:bg-bolex-accent/90"
        >
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  );
}

export function AITravelAssistant() {
  const pathname = usePathname();
  const { open, setOpen } = useAiAssistant();
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const isDashboard =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  if (isDashboard) return null;

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: matchAIResponse(trimmed),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
  };

  const chatProps = {
    messages,
    input,
    setInput,
    onSend: () => sendMessage(input),
    onPrompt: sendMessage,
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-50 flex items-center gap-2 rounded-full border border-bolex-accent/30 bg-bolex-primary px-4 py-3 text-white shadow-lift transition-all hover:scale-[1.02] hover:border-bolex-accent/60 lg:bottom-6 lg:right-6 lg:px-5"
        aria-label="Open BOLEXMAN AI travel assistant"
      >
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-bolex-accent text-bolex-primary">
          <Sparkles className="size-4" />
        </span>
        <span className="hidden text-sm font-medium sm:inline">BOLEXMAN AI</span>
      </button>

      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
            <SheetHeader>
              <SheetTitle className="font-heading flex items-center gap-2 text-left">
                <Bot className="size-5 text-bolex-accent" />
                AI Travel Assistant
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-hidden px-1 pb-6 pt-4">
              <ChatPanel {...chatProps} />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg gap-4">
            <DialogHeader>
              <DialogTitle className="font-heading flex items-center gap-2">
                <Bot className="size-5 text-bolex-accent" />
                AI Travel Assistant
              </DialogTitle>
            </DialogHeader>
            <ChatPanel {...chatProps} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
