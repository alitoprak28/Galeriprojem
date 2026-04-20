"use client";

import { startTransition, useEffect, useRef, useState } from "react";

import {
  advisorQuickActions,
  createAdvisorReply,
  initialAdvisorMessage,
  type AdvisorMessage,
  type AdvisorPreferences
} from "@/lib/gallery-advisor";

const thinkingDelayMs = 650;

type UseGalleryAdvisorOptions = {
  initialOpen?: boolean;
  autoOpenDelayMs?: number;
};

export function useGalleryAdvisor({
  initialOpen = false,
  autoOpenDelayMs
}: UseGalleryAdvisorOptions = {}) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isReady, setIsReady] = useState(initialOpen || !autoOpenDelayMs);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<AdvisorMessage[]>([initialAdvisorMessage]);
  const [preferences, setPreferences] = useState<AdvisorPreferences>({});
  const timerRef = useRef<number | null>(null);
  const autoOpenTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }

      if (autoOpenTimerRef.current) {
        window.clearTimeout(autoOpenTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!autoOpenDelayMs || initialOpen) {
      return;
    }

    autoOpenTimerRef.current = window.setTimeout(() => {
      setIsReady(true);
      setIsOpen(true);
      autoOpenTimerRef.current = null;
    }, autoOpenDelayMs);

    return () => {
      if (autoOpenTimerRef.current) {
        window.clearTimeout(autoOpenTimerRef.current);
        autoOpenTimerRef.current = null;
      }
    };
  }, [autoOpenDelayMs, initialOpen]);

  function queueAssistantReply(userText: string, nextPreferences: AdvisorPreferences) {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    setIsThinking(true);
    setError(null);

    timerRef.current = window.setTimeout(() => {
      try {
        const { nextPreferences: mergedPreferences, message } = createAdvisorReply(
          userText,
          nextPreferences
        );

        startTransition(() => {
          setPreferences(mergedPreferences);
          setMessages((current) => [...current, message]);
          setIsThinking(false);
        });
      } catch {
        setIsThinking(false);
        setError("Su an kisa bir aksilik oldu. Isterseniz tekrar deneyin.");
      } finally {
        timerRef.current = null;
      }
    }, thinkingDelayMs);
  }

  function sendMessage(rawText: string) {
    const userText = rawText.trim();

    if (!userText || isThinking) {
      return;
    }

    const userMessage: AdvisorMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: userText
    };

    startTransition(() => {
      setMessages((current) => [...current, userMessage]);
      setInput("");
    });

    queueAssistantReply(userText, preferences);
  }

  function handleQuickAction(prompt: string) {
    setIsOpen(true);
    sendMessage(prompt);
  }

  return {
    isOpen,
    isReady,
    setIsOpen,
    input,
    setInput,
    messages,
    isThinking,
    error,
    quickActions: advisorQuickActions,
    sendMessage,
    handleQuickAction
  };
}
