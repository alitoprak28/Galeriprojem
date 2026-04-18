import { MessageSquareText, PhoneCall } from "lucide-react";

import { dealershipInfo } from "@/lib/gallery-data";

export function FloatingContact() {
  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 hidden flex-col gap-3 md:flex">
        <a
          href={dealershipInfo.whatsapp}
          className="inline-flex items-center gap-3 border border-foreground/10 bg-background/90 px-5 py-4 text-xs uppercase tracking-[0.28em] text-foreground shadow-panel backdrop-blur-xl transition hover:border-foreground/20 hover:bg-background"
        >
          <MessageSquareText className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={`tel:${dealershipInfo.phoneRaw}`}
          className="inline-flex items-center gap-3 border border-foreground/10 bg-foreground/[0.04] px-5 py-4 text-xs uppercase tracking-[0.28em] text-foreground shadow-panel backdrop-blur-xl transition hover:border-foreground/20 hover:bg-foreground/[0.08]"
        >
          <PhoneCall className="h-4 w-4" />
          Hemen Ara
        </a>
      </div>

      <div className="fixed inset-x-4 bottom-4 z-50 grid grid-cols-2 gap-3 md:hidden">
        <a
          href={dealershipInfo.whatsapp}
          className="inline-flex items-center justify-center gap-3 border border-foreground/10 bg-background/90 px-4 py-4 text-xs uppercase tracking-[0.24em] text-foreground shadow-panel backdrop-blur-xl"
        >
          <MessageSquareText className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={`tel:${dealershipInfo.phoneRaw}`}
          className="inline-flex items-center justify-center gap-3 border border-foreground/10 bg-foreground/[0.06] px-4 py-4 text-xs uppercase tracking-[0.24em] text-foreground shadow-panel backdrop-blur-xl"
        >
          <PhoneCall className="h-4 w-4" />
          Ara
        </a>
      </div>
    </>
  );
}
