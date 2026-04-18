import Link from "next/link";

import { dealershipInfo } from "@/lib/gallery-data";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-foreground/10 bg-panel pb-10 pt-10">
      <div className="page-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="max-w-2xl space-y-4">
          <span className="eyebrow">{dealershipInfo.name}</span>
          <h2 className="font-display text-3xl uppercase tracking-[-0.04em] sm:text-4xl">
            Beğendiğiniz aracı seçin, detayına bakın, bizi arayın.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-muted sm:text-base">
            Araç bilgisi, ekspertiz özeti, takas görüşmesi ve noter planlaması tek yerden yürür.
            Temiz araç, net bilgi ve hızlı geri dönüş bizim için esastır.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-3 text-sm text-muted">
            <p className="text-[11px] uppercase tracking-[0.28em]">İletişim</p>
            <a href={`tel:${dealershipInfo.phoneRaw}`} className="block transition hover:text-foreground">
              {dealershipInfo.phoneDisplay}
            </a>
            <a href={`mailto:${dealershipInfo.email}`} className="block transition hover:text-foreground">
              {dealershipInfo.email}
            </a>
            <p>{dealershipInfo.address}</p>
            <p>{dealershipInfo.hours}</p>
          </div>

          <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.22em] text-muted sm:text-xs">
            <Link href="/" className="transition hover:text-foreground">
              Ana Sayfa
            </Link>
            <Link href="/gallery" className="transition hover:text-foreground">
              Tüm Stoklar
            </Link>
            <Link href="/#hizmetler" className="transition hover:text-foreground">
              Hizmetler
            </Link>
            <Link href="/#guvence" className="transition hover:text-foreground">
              Müşteri Yorumları
            </Link>
            <Link href="/#iletisim" className="transition hover:text-foreground">
              İletişim
            </Link>
            <a href={dealershipInfo.whatsapp} className="transition hover:text-foreground">
              WhatsApp Danışma
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
