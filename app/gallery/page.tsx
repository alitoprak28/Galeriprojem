import Link from "next/link";
import { MessageSquareText, PhoneCall } from "lucide-react";

import { InventoryBrowser } from "@/components/gallery/inventory-browser";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { dealershipInfo, vehicles } from "@/lib/gallery-data";

type GalleryPageProps = {
  searchParams?: {
    brand?: string;
    body?: string;
    fuel?: string;
    q?: string;
  };
};

export default function GalleryPage({ searchParams }: GalleryPageProps) {
  return (
    <>
      <section className="pt-32 sm:pt-36">
        <div className="page-shell space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="Araç Listesi"
              title="Satışta olan araçlarımız burada."
              description="Fiyatı, kilometresi, model yılı ve temel bilgileri net şekilde görün. Beğendiğiniz araç için detay sayfasına geçin ya da doğrudan bizi arayın."
            />
          </Reveal>

          <Reveal className="grid gap-4 md:grid-cols-3">
            <div className="border border-foreground/10 bg-panel p-5 shadow-panel">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
                Hızlı Bilgi
              </p>
              <p className="mt-3 text-base leading-7 text-foreground">
                Son fiyat, ekspertiz özeti ve takas bilgisi için doğrudan satış ekibimize ulaşın.
              </p>
            </div>
            <a
              href={`tel:${dealershipInfo.phoneRaw}`}
              className="flex items-center justify-between gap-4 border border-foreground/10 bg-panel p-5 shadow-panel transition hover:border-foreground/20"
            >
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
                  Telefon
                </p>
                <p className="mt-3 text-lg text-foreground">{dealershipInfo.phoneDisplay}</p>
              </div>
              <PhoneCall className="h-5 w-5 text-foreground" />
            </a>
            <a
              href={dealershipInfo.whatsapp}
              className="flex items-center justify-between gap-4 border border-foreground/10 bg-panel p-5 shadow-panel transition hover:border-foreground/20"
            >
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
                  WhatsApp
                </p>
                <p className="mt-3 text-lg text-foreground">Anında mesaj gönderin</p>
              </div>
              <MessageSquareText className="h-5 w-5 text-foreground" />
            </a>
          </Reveal>

          <Reveal className="text-sm leading-7 text-muted">
            <p>
              Toplam örnek stok: <strong className="text-foreground">{vehicles.length}</strong> araç
            </p>
            <p>
              Aradığınız araç listede yoksa <Link href="/#iletisim" className="text-foreground underline underline-offset-4">bize yazın, yeni gelecek araçları da paylaşalım</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-8">
        <div className="page-shell">
          <InventoryBrowser
            vehicles={vehicles}
            initialBrand={searchParams?.brand}
            initialBody={searchParams?.body}
            initialFuel={searchParams?.fuel}
            initialQuery={searchParams?.q}
          />
        </div>
      </section>
    </>
  );
}
