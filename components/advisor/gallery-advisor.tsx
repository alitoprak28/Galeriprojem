"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef } from "react";
import { Bot, MessageSquareText, Send, Sparkles, X } from "lucide-react";

import { useGalleryAdvisor } from "@/hooks/use-gallery-advisor";
import { dealershipInfo } from "@/lib/gallery-data";
import { cn } from "@/lib/utils";

function AdvisorRecommendationCard({
  recommendation
}: {
  recommendation: {
    slug: string;
    title: string;
    price: string;
    image: string;
    reason: string;
    tagline: string;
  };
}) {
  const whatsappHref = `${dealershipInfo.whatsapp}?text=${encodeURIComponent(
    `${recommendation.title} icin bilgi almak istiyorum.`
  )}`;

  return (
    <div className="overflow-hidden rounded-[22px] border border-foreground/10 bg-background">
      <div className="relative h-28 overflow-hidden border-b border-foreground/10">
        <Image
          src={recommendation.image}
          alt={recommendation.title}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover"
        />
      </div>

      <div className="space-y-3 p-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted">{recommendation.reason}</p>
          <h4 className="mt-2 font-display text-2xl uppercase tracking-[-0.04em] text-foreground">
            {recommendation.title}
          </h4>
          <p className="mt-2 text-sm leading-6 text-muted">{recommendation.tagline}</p>
        </div>

        <div className="flex items-end justify-between gap-3 border-t border-foreground/10 pt-3">
          <p className="font-display text-[1.65rem] uppercase tracking-[-0.04em] text-foreground">
            {recommendation.price}
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={`/gallery/${recommendation.slug}`}
              className="inline-flex items-center justify-center rounded-full border border-foreground/10 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
            >
              Detay
            </Link>
            <a
              href={whatsappHref}
              className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white transition hover:opacity-90"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GalleryAdvisor() {
  const {
    isOpen,
    setIsOpen,
    input,
    setInput,
    messages,
    isThinking,
    error,
    quickActions,
    sendMessage,
    handleQuickAction
  } = useGalleryAdvisor();
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = bodyRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, isThinking, isOpen]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div
      className={cn(
        "fixed z-[70]",
        isOpen
          ? "inset-x-3 bottom-3 md:inset-x-auto md:bottom-4 md:right-4"
          : "bottom-4 right-4 md:bottom-[9.75rem]"
      )}
      style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
    >
      {isOpen ? (
        <div className="w-full rounded-[28px] border border-foreground/10 bg-panel shadow-[0_28px_80px_rgba(15,23,42,0.18)] md:w-[380px]">
          <div className="flex items-start justify-between gap-4 border-b border-foreground/10 p-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-muted">
                <Sparkles className="h-3.5 w-3.5" />
                Galeri Danismani
              </div>
              <div>
                <h3 className="font-display text-2xl uppercase tracking-[-0.04em] text-foreground">
                  Size uygun araci birlikte bulalim.
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                  Butce, kasa tipi ve kullanim amacina gore stoktan uygun araclari cikaririm.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
              aria-label="Galeri Danismani panelini kapat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="border-b border-foreground/10 px-4 py-3">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => handleQuickAction(action.prompt)}
                  className="whitespace-nowrap rounded-full border border-foreground/10 bg-background px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-muted transition hover:border-foreground/20 hover:text-foreground"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div ref={bodyRef} className="max-h-[26rem] space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[92%] rounded-[24px] border px-4 py-3",
                    message.role === "user"
                      ? "border-foreground/10 bg-foreground text-white"
                      : "border-foreground/10 bg-background text-foreground"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {message.role === "assistant" ? (
                      <div className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-panel">
                        <Bot className="h-4 w-4 text-foreground" />
                      </div>
                    ) : null}
                    <div className="min-w-0 space-y-3">
                      <p
                        className={cn(
                          "text-sm leading-6",
                          message.role === "user" ? "text-white" : "text-foreground"
                        )}
                      >
                        {message.text}
                      </p>

                      {message.recommendations?.length ? (
                        <div className="space-y-3">
                          {message.recommendations.map((recommendation) => (
                            <AdvisorRecommendationCard
                              key={recommendation.slug}
                              recommendation={recommendation}
                            />
                          ))}
                        </div>
                      ) : null}

                      {message.actions?.length ? (
                        <div className="flex flex-wrap gap-2">
                          {message.actions.map((action) => (
                            <a
                              key={action.href}
                              href={action.href}
                              className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-panel px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
                            >
                              <MessageSquareText className="h-3.5 w-3.5" />
                              {action.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isThinking ? (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background px-4 py-3 text-sm text-muted">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-muted" />
                  Danisman dusunuyor...
                </div>
              </div>
            ) : null}

            {error ? (
              <div className="rounded-[20px] border border-foreground/10 bg-background px-4 py-3 text-sm leading-6 text-muted">
                {error}
              </div>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-foreground/10 p-4">
            <div className="flex items-end gap-3 rounded-[24px] border border-foreground/10 bg-background px-3 py-3">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={1}
                placeholder="Butce, kasa tipi ya da kullanim amacinizi yazin..."
                className="max-h-28 min-h-[2.5rem] flex-1 resize-none bg-transparent text-sm leading-6 text-foreground outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                disabled={isThinking || input.trim().length === 0}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent bg-accent text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Mesaji gonder"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-panel text-foreground shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition hover:border-foreground/20 hover:bg-background sm:h-auto sm:w-auto sm:gap-3 sm:px-4 sm:py-3 sm:text-xs sm:uppercase sm:tracking-[0.22em]"
          aria-label="Galeri Danismani panelini ac"
        >
          <Bot className="h-4 w-4" />
          <span className="hidden sm:inline">Galeri Danismani</span>
        </button>
      )}
    </div>
  );
}
