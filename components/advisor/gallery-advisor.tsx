"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useId, useRef } from "react";
import {
  Bot,
  MessageSquareText,
  PhoneCall,
  Send,
  Sparkles,
  UserRound,
  X
} from "lucide-react";

import { useGalleryAdvisor } from "@/hooks/use-gallery-advisor";
import { type AdvisorAction, type AdvisorRecommendation } from "@/lib/gallery-advisor";
import { dealershipInfo } from "@/lib/gallery-data";
import { cn } from "@/lib/utils";

function AdvisorActionLink({ action }: { action: AdvisorAction }) {
  const className = cn(
    "inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.18em] transition sm:text-[11px]",
    action.tone === "primary"
      ? "border-accent bg-accent text-white hover:opacity-90"
      : "border-foreground/10 bg-panel text-foreground hover:border-foreground/20 hover:bg-foreground/[0.05]"
  );

  if (action.href.startsWith("/")) {
    return (
      <Link href={action.href} className={className}>
        {action.label}
      </Link>
    );
  }

  return (
    <a href={action.href} className={className}>
      {action.label}
    </a>
  );
}

function AdvisorRecommendationCard({
  recommendation
}: {
  recommendation: AdvisorRecommendation;
}) {
  const whatsappHref = `${dealershipInfo.whatsapp}?text=${encodeURIComponent(
    `${recommendation.title} icin bilgi almak istiyorum.`
  )}`;

  return (
    <div className="rounded-[22px] border border-foreground/10 bg-panel p-3">
      <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3">
        <div className="relative h-[5.5rem] overflow-hidden rounded-[16px] border border-foreground/10 bg-background">
          <Image
            src={recommendation.image}
            alt={recommendation.title}
            fill
            sizes="88px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 space-y-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted">{recommendation.reason}</p>
            <h4 className="mt-1 font-display text-[1.15rem] uppercase tracking-[-0.04em] text-foreground sm:text-[1.3rem]">
              {recommendation.title}
            </h4>
            <p className="mt-2 text-sm leading-6 text-muted">{recommendation.tagline}</p>
          </div>

          <div className="flex flex-col gap-3 border-t border-foreground/10 pt-3">
            <p className="font-display text-[1.4rem] uppercase tracking-[-0.04em] text-foreground">
              {recommendation.price}
            </p>

            <div className="flex flex-wrap gap-2">
              <Link
                href={`/gallery/${recommendation.slug}`}
                className="inline-flex items-center justify-center rounded-full border border-foreground/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
              >
                Detaya Git
              </Link>
              <a
                href={whatsappHref}
                className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white transition hover:opacity-90"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GalleryAdvisor() {
  const {
    isOpen,
    isReady,
    setIsOpen,
    input,
    setInput,
    messages,
    isThinking,
    error,
    quickActions,
    sendMessage,
    handleQuickAction
  } = useGalleryAdvisor({ autoOpenDelayMs: 10000 });
  const bodyRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const titleId = useId();
  const conversationMessages = messages.filter((message) => message.id !== "welcome");
  const showQuickActions = conversationMessages.length === 0;

  useEffect(() => {
    const viewport = bodyRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: isOpen ? "smooth" : "auto"
    });
  }, [messages, isThinking, isOpen]);

  useEffect(() => {
    document.body.dataset.advisorOpen = isOpen ? "true" : "false";

    return () => {
      delete document.body.dataset.advisorOpen;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 140);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setIsOpen]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-foreground/16 backdrop-blur-[3px]"
            aria-label="Galeri Danismani panelini kapat"
          />

          <div
            className="absolute inset-x-0 bottom-0 top-auto flex justify-center md:inset-x-auto md:bottom-6 md:right-6"
            style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative flex max-h-[90svh] w-full flex-col overflow-y-auto rounded-t-[28px] border border-foreground/10 bg-panel shadow-[0_28px_80px_rgba(15,23,42,0.16)] md:max-h-[min(78svh,46rem)] md:w-[32rem] md:max-w-[32rem] md:rounded-[28px] md:overflow-hidden"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="border-b border-foreground/10 px-4 py-4 sm:px-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-muted">
                      <Sparkles className="h-3.5 w-3.5" />
                      Galeri Danismani
                    </span>

                    <div className="space-y-2">
                      <h2
                        id={titleId}
                        className="font-display text-[1.2rem] uppercase leading-[0.94] tracking-[-0.04em] text-foreground sm:text-[1.8rem]"
                      >
                        Size uygun araci birlikte bulalim.
                      </h2>
                      <p className="max-w-sm text-sm leading-6 text-muted">
                        Birkac kisa soruyla sizi dogru stoklara yonlendirebilirim.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-background text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
                    aria-label="Galeri Danismani panelini kapat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {showQuickActions ? (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => handleQuickAction(action.prompt)}
                        className="min-h-[2.8rem] rounded-[16px] border border-foreground/10 bg-background px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-muted transition hover:border-foreground/20 hover:text-foreground"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div ref={bodyRef} className="space-y-3 px-4 py-4 sm:px-5 md:min-h-0 md:flex-1 md:overflow-y-auto">
                {conversationMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-full rounded-[22px] border px-4 py-3 md:max-w-[95%]",
                        message.role === "user"
                          ? "border-foreground bg-foreground text-white"
                          : "border-foreground/10 bg-background text-foreground"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                            message.role === "user"
                              ? "border-white/15 bg-white/10 text-white"
                              : "border-foreground/10 bg-panel text-foreground"
                          )}
                        >
                          {message.role === "user" ? (
                            <UserRound className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1 space-y-3">
                          <div>
                            <p
                              className={cn(
                                "text-[10px] uppercase tracking-[0.16em]",
                                message.role === "user" ? "text-white/72" : "text-muted"
                              )}
                            >
                              {message.role === "user" ? "Siz" : "Galeri Danismani"}
                            </p>
                            <p
                              className={cn(
                                "mt-2 text-sm leading-6",
                                message.role === "user" ? "text-white" : "text-foreground"
                              )}
                            >
                              {message.text}
                            </p>
                          </div>

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
                                <AdvisorActionLink key={`${message.id}-${action.href}`} action={action} />
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
                  <div className="rounded-[18px] border border-foreground/10 bg-background px-4 py-3 text-sm leading-6 text-muted">
                    {error}
                  </div>
                ) : null}

              </div>

              <form onSubmit={handleSubmit} className="border-t border-foreground/10 p-4 sm:p-5">
                <div className="rounded-[22px] border border-foreground/10 bg-background/90 p-3">
                  {showQuickActions ? (
                    <div className="mb-3 rounded-[18px] border border-foreground/10 bg-accent/[0.06] px-4 py-3">
                      <p className="text-[15px] leading-7 text-foreground sm:text-base">
                        Butceniz, arac tipi ya da kullanim amacinizi yazin; size uygun ilanlari hemen ayirayim.
                      </p>
                    </div>
                  ) : null}

                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    rows={2}
                    placeholder="Ornek: 2 milyon civari, aile kullanimi icin SUV bakiyorum."
                    className="min-h-[5.5rem] w-full resize-none bg-transparent text-sm leading-6 text-foreground outline-none placeholder:text-muted"
                  />

                  <div className="mt-3 flex flex-col gap-3 border-t border-foreground/10 pt-3">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted">
                      <PhoneCall className="h-3.5 w-3.5" />
                      Kisa ve net cevaplarla ilerler.
                    </div>

                    <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                      <button
                        type="submit"
                        disabled={isThinking || input.trim().length === 0}
                        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-accent bg-accent px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Gonder
                        <Send className="h-4 w-4" />
                      </button>

                      <a
                        href={dealershipInfo.whatsapp}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-foreground/10 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
                      >
                        <MessageSquareText className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      ) : isReady ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-[65] inline-flex min-h-12 items-center gap-3 rounded-full border border-foreground/10 bg-background/96 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-foreground shadow-[0_18px_38px_rgba(15,23,42,0.12)] backdrop-blur-xl transition hover:border-foreground/20 hover:bg-background md:bottom-[9.6rem]"
          style={{ marginBottom: "max(0px, env(safe-area-inset-bottom))" }}
          aria-label="Galeri Danismani panelini ac"
        >
          <Bot className="h-4 w-4" />
          <span>Galeri Danismani</span>
        </button>
      ) : null}
    </>
  );
}
