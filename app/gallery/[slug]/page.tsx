import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageSquareText, PhoneCall } from "lucide-react";
import { notFound } from "next/navigation";

import { VehicleListItem } from "@/components/gallery/vehicle-list-item";
import { ParallaxMedia } from "@/components/ui/parallax-media";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  blurDataURLBySlug,
  dealershipInfo,
  getRelatedVehicles,
  getVehicleBySlug,
  vehicles
} from "@/lib/gallery-data";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({
    slug: vehicle.slug
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const vehicle = getVehicleBySlug(params.slug);

  if (!vehicle) {
    return {
      title: `Araç Bulunamadı | ${dealershipInfo.name}`
    };
  }

  return {
    title: `${vehicle.title} | ${dealershipInfo.name}`,
    description: vehicle.description
  };
}

export default function VehicleDetailPage({ params }: PageProps) {
  const vehicle = getVehicleBySlug(params.slug);

  if (!vehicle) {
    notFound();
  }

  const related = getRelatedVehicles(vehicle.slug, 3);
  const whatsappHref = `${dealershipInfo.whatsapp}?text=${encodeURIComponent(
    `${vehicle.title} hakkında bilgi almak istiyorum.`
  )}`;
  const detailRows = [
    ["Fiyat", vehicle.price],
    ["Kredi Örneği", vehicle.monthlyPayment],
    ["Model Yılı", vehicle.year],
    ["Kilometre", vehicle.mileage],
    ["Yakıt", vehicle.fuel],
    ["Şanzıman", vehicle.transmission],
    ["Çekiş", vehicle.drivetrain],
    ["Motor Gücü", vehicle.power],
    ["Renk", vehicle.color],
    ["Koltuk", vehicle.seats],
    ["Lokasyon", vehicle.location],
    ["Ekspertiz / Garanti", vehicle.warranty]
  ] as const;
  const operationNotes = [
    "Takas değerlendirmesi aynı gün içinde paylaşılır.",
    "Ekspertiz özeti, boya bilgisi ve video talep üzerine gönderilir.",
    "Kapora, noter ve şehir dışı teslimat tek ekip üzerinden planlanır."
  ];

  return (
    <>
      <section className="pt-28 sm:pt-36">
        <div className="page-shell space-y-8">
          <Reveal>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Stok listesine dön
            </Link>
          </Reveal>

          <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
            <Reveal className="relative min-h-[24rem] overflow-hidden border border-foreground/10 bg-panel shadow-panel sm:min-h-[30rem]">
              <ParallaxMedia
                src={vehicle.image}
                alt={vehicle.title}
                blurDataURL={blurDataURLBySlug[vehicle.slug]}
                priority
                offset={52}
                sizes="(max-width: 1280px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">
                    {vehicle.eyebrow}
                  </p>
                  <h1 className="mt-2 font-display text-4xl uppercase tracking-[-0.05em] text-white sm:text-5xl">
                    {vehicle.title}
                  </h1>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-display text-3xl uppercase tracking-[-0.04em] text-white sm:text-4xl">
                    {vehicle.price}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
                    {vehicle.location}
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="space-y-5">
              <Reveal className="border border-foreground/10 bg-panel p-5 shadow-panel sm:p-6">
                <span className="eyebrow">Araç Özeti</span>
                <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{vehicle.tagline}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {detailRows.map(([label, value]) => (
                    <div
                      key={label}
                      className="border border-foreground/10 bg-background/70 px-4 py-4"
                    >
                      <p className="text-[10px] uppercase tracking-[0.3em] text-muted sm:text-[11px]">
                        {label}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-foreground sm:text-base">{value}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal
                delay={0.08}
                className="border border-foreground/10 bg-panel p-5 shadow-panel sm:p-6"
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Hızlı İşlem</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <a
                    href={whatsappHref}
                    className="inline-flex items-center justify-center gap-3 border border-accent bg-accent px-5 py-4 text-xs uppercase tracking-[0.28em] text-white transition hover:opacity-90"
                  >
                    WhatsApp'tan Sor
                    <MessageSquareText className="h-4 w-4" />
                  </a>
                  <a
                    href={`tel:${dealershipInfo.phoneRaw}`}
                    className="inline-flex items-center justify-center gap-3 border border-foreground/10 px-5 py-4 text-xs uppercase tracking-[0.28em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
                  >
                    Hemen Ara
                    <PhoneCall className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-5 grid gap-3 border-t border-foreground/10 pt-5 sm:grid-cols-3">
                  {["Takas değerlendirme", "Noter günü planlama", "Şehir dışı teslimat"].map((item) => (
                    <div
                      key={item}
                      className="border border-foreground/10 bg-background/70 px-4 py-4 text-sm leading-6 text-muted"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-shell space-y-10">
          <SectionHeading
            eyebrow="Araç Bilgileri"
            title="Müşterinin sorduğu temel bilgiler tek ekranda."
            description="Araç geçmişi, satış notları ve öne çıkan donanımlar açık şekilde gösterilir. Amaç müşterinin hızlı karar vermesidir."
          />

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal className="space-y-5 border border-foreground/10 bg-panel p-5 shadow-panel sm:p-6">
              <p className="text-base leading-8 text-muted">{vehicle.description}</p>
              <p className="text-base leading-8 text-muted">{vehicle.narrative}</p>
              <p className="text-sm leading-7 text-muted">{vehicle.priceNote}</p>
            </Reveal>

            <div className="space-y-5">
              <Reveal
                delay={0.06}
                className="border border-foreground/10 bg-panel p-5 shadow-panel sm:p-6"
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Öne Çıkanlar</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {vehicle.highlights.map((item) => (
                    <span
                      key={item}
                      className="border border-foreground/10 bg-background/70 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-muted"
                    >
                      {item}
                    </span>
                  ))}
                  <span className="border border-foreground/10 bg-background/70 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-muted">
                    {vehicle.atmosphere}
                  </span>
                </div>
              </Reveal>

              <Reveal
                delay={0.12}
                className="border border-foreground/10 bg-panel p-5 shadow-panel sm:p-6"
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Satış Notları</p>
                <div className="mt-4 grid gap-3">
                  {operationNotes.map((item) => (
                    <div
                      key={item}
                      className="border border-foreground/10 bg-background/70 px-4 py-4 text-sm leading-7 text-muted"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="page-shell space-y-10">
          <SectionHeading
            eyebrow="Benzer Stoklar"
            title="Aynı segmentte bakılan diğer araçlar."
            description="Karşılaştırma yapan ziyaretçi için benzer araçları da görünür tutuyoruz."
          />
          <div className="space-y-4">
            {related.map((item, index) => (
              <VehicleListItem key={item.slug} vehicle={item} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
