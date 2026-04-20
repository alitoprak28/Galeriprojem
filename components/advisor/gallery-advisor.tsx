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

type GalleryAdvisorProps = {
  title?: string;
  description?: string;
  className?: string;
};

function AdvisorActionLink({ action }: { action: AdvisorAction }) {
  const className = cn(
    "inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.2em] transition sm:text-[11px]",
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
    <div className="overflow-hidden rounded-[24px] border border-foreground/10 bg-panel">
      <div className="flex gap-3 p-3">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[18px] border border-foreground/10 bg-background">
          <Image
            src={recommendation.image}
            alt={recommendation.title}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{recommendation.reason}</p>
            <h4 className="mt-1 font-display text-[1.35rem] uppercase tracking-[-0.04em] text-foreground">
              {recommendation.title}
            </h4>
            <p className="mt-2 text-sm leading-6 text-muted">{recommendation.tagline}</p>
          </div>

          <div className="flex flex-col gap-3 border-t border-foreground/10 pt-3 sm:flex-row sm:items-end sm:justify-between">
            <p className="font-display text-[1.55rem] uppercase tracking-[-0.04em] text-foreground">
              {recommendation.price}
            </p>

            <div className="flex flex-wrap gap-2">
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
    </div>
  );
}

export function GalleryAdvisor({
  title = "Galeri Danismani ile araci kisa yoldan netlestirin.",
  description = "Butce, kasa tipi ve kullanim amacinizi yazin; size stoktan uygun araclari ayirayim.",
  className
}: GalleryAdvisorProps) {
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const titleId = useId();

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
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 120);

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
      <div
        className={cn(
          "rounded-[28px] border border-foreground/10 bg-panel p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-6",
          className
        )}
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
              <Sparkles className="h-3.5 w-3.5" />
              Galeri Danismani
            </span>

            <div className="space-y-3">
              <h3 className="font-display text-[2rem] uppercase tracking-[-0.04em] text-foreground sm:text-[2.35rem]">
                {title}
              </h3>
              <p className="max-w-xl text-[15px] leading-7 text-muted sm:text-base sm:leading-8">
                {description}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:max-w-[24rem]">
            <div className="rounded-[22px] border border-foreground/10 bg-background/70 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted">Butce</p>
              <p className="mt-2 text-sm leading-6 text-foreground">Araligi yazin, uygun ilanlari ayiralim.</p>
            </div>
            <div className="rounded-[22px] border border-foreground/10 bg-background/70 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted">Kasa tipi</p>
              <p className="mt-2 text-sm leading-6 text-foreground">SUV, sedan ya da aile kullanimi fark etmez.</p>
            </div>
            <div className="rounded-[22px] border border-foreground/10 bg-background/70 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted">Aksiyon</p>
              <p className="mt-2 text-sm leading-6 text-foreground">Detaya, WhatsApp'a ya da aramaya yonlendirelim.</p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => handleQuickAction(action.prompt)}
              className="rounded-full border border-foreground/10 bg-background px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-muted transition hover:border-foreground/20 hover:text-foreground sm:text-[11px]"
            >
              {action.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-accent bg-accent px-5 py-3 text-xs font-medium uppercase tracking-[0.22em] text-white transition hover:opacity-90"
          >
            <Bot className="h-4 w-4" />
            Danismana Basla
          </button>
          <a
            href={dealershipInfo.whatsapp}
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-foreground/10 bg-background px-5 py-3 text-xs font-medium uppercase tracking-[0.22em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
          >
            <MessageSquareText className="h-4 w-4" />
            Hizli Iletisim
          </a>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-foreground/18 backdrop-blur-[3px]"
            aria-label="Galeri Danismani panelini kapat"
          />

          <div
            className="absolute inset-x-3 bottom-3 top-auto flex justify-center md:inset-x-auto md:bottom-6 md:right-6"
            style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative flex max-h-[calc(100svh-1.5rem)] w-full max-w-[30rem] flex-col overflow-hidden rounded-[30px] border border-foreground/10 bg-panel shadow-[0_30px_80px_rgba(15,23,42,0.2)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-foreground/10 px-4 py-4 sm:px-5">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-muted">
                    <Sparkles className="h-3.5 w-3.5" />
                    Galeri Danismani
                  </span>
                  <div>
                    <h3
                      id={titleId}
                      className="font-display text-[1.9rem] uppercase tracking-[-0.04em] text-foreground"
                    >
                      Size uygun araclari ayiralim.
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                      Kisa cevaplar yeterli. Stoktan size uygun araclari seceyim, sonra detaya ya da iletisime gecelim.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/10 text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
                  aria-label="Galeri Danismani panelini kapat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="border-b border-foreground/10 px-4 py-3 sm:px-5">
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

              <div
                ref={bodyRef}
                className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[94%] rounded-[24px] border px-4 py-4",
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
                                "text-[10px] uppercase tracking-[0.18em]",
                                message.role === "user" ? "text-white/70" : "text-muted"
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
                  <div className="rounded-[20px] border border-foreground/10 bg-background px-4 py-3 text-sm leading-6 text-muted">
                    {error}
                  </div>
                ) : null}
              </div>

              <form onSubmit={handleSubmit} className="border-t border-foreground/10 p-4 sm:p-5">
                <div className="rounded-[24px] border border-foreground/10 bg-background p-3">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    rows={2}
                    placeholder="Ornek: 2 milyon civari, aile kullanimi icin SUV bakiyorum."
                    className="min-h-[5rem] w-full resize-none bg-transparent text-sm leading-6 text-foreground outline-none placeholder:text-muted"
                  />

                  <div className="mt-3 flex flex-col gap-3 border-t border-foreground/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted">
                      <PhoneCall className="h-3.5 w-3.5" />
                      Kisa cevaplarla ilerler.
                    </div>

                    <button
                      type="submit"
                      disabled={isThinking || input.trim().length === 0}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-accent bg-accent px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Gonder
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
