"use client";

import Link from "next/link";
import {
  ArrowRight,
  Gauge,
  MapPin,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star
} from "lucide-react";
import { motion } from "framer-motion";

import { HeroSearchPanel } from "@/components/sections/hero-search-panel";
import { ParallaxMedia } from "@/components/ui/parallax-media";
import { blurDataURLBySlug, dealershipInfo, storyMetrics, vehicles } from "@/lib/gallery-data";

const heroVehicle =
  vehicles.find((vehicle) => vehicle.slug === "volkswagen-passat-business-1-5-etsi") ?? vehicles[0];

const previewVehicles = [
  "porsche-911-turbo-s",
  "bmw-x7-m60i-xdrive",
  "peugeot-3008-allure"
]
  .map((slug) => vehicles.find((vehicle) => vehicle.slug === slug))
  .filter((vehicle): vehicle is (typeof vehicles)[number] => Boolean(vehicle));

const heroPills = ["Otomatik", "Sedan", "SUV", "Hızlı teslim"];

const heroNotes = [
  {
    icon: Sparkles,
    value: "Premium vitrin",
    label: "İlk bakışta güçlü etki"
  },
  {
    icon: Gauge,
    value: "30 saniye",
    label: "Araç bul, fiyatı gör"
  },
  {
    icon: ShieldCheck,
    value: "Net bilgi",
    label: "Ekspertiz ve arama akışı hazır"
  }
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_right,rgba(34,74,158,0.22),transparent_34%),radial-gradient(circle_at_top_left,rgba(15,23,42,0.08),transparent_30%)]"
      />

      <div className="page-shell relative">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 space-y-4 lg:order-2"
          >
            <div className="relative min-h-[29rem] overflow-hidden rounded-[34px] border border-foreground/10 bg-[#09101a] shadow-[0_32px_90px_rgba(15,23,42,0.22)] sm:min-h-[36rem]">
              <ParallaxMedia
                src={heroVehicle.image}
                alt={heroVehicle.title}
                blurDataURL={blurDataURLBySlug[heroVehicle.slug]}
                priority
                offset={42}
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(130,170,255,0.28),transparent_24%),linear-gradient(180deg,rgba(7,11,18,0.08),rgba(7,11,18,0.88))]" />

              <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/88 backdrop-blur-md">
                  <Star className="h-3.5 w-3.5" />
                  Bugünün vitrini
                </div>
                <div className="rounded-full border border-white/15 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/70 backdrop-blur-md">
                  Canlı stok
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <div className="rounded-[28px] border border-white/10 bg-black/20 p-4 backdrop-blur-md sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/68">
                        {heroVehicle.eyebrow}
                      </p>
                      <h2 className="max-w-lg font-display text-[2.2rem] uppercase tracking-[-0.05em] text-white sm:text-[3.2rem]">
                        {heroVehicle.title}
                      </h2>
                      <p className="max-w-md text-sm leading-6 text-white/78">
                        {heroVehicle.mileage} • {heroVehicle.fuel} • {heroVehicle.transmission}
                      </p>
                    </div>

                    <div className="space-y-2 text-left sm:text-right">
                      <p className="font-display text-[2rem] uppercase tracking-[-0.05em] text-white sm:text-[2.6rem]">
                        {heroVehicle.price}
                      </p>
                      <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/70">
                        <MapPin className="h-3.5 w-3.5" />
                        {heroVehicle.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute left-4 top-20 grid gap-2 sm:left-6 sm:top-24">
                {heroNotes.slice(0, 2).map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.value}
                      className="max-w-[12rem] rounded-2xl border border-white/10 bg-black/24 px-3 py-3 text-white backdrop-blur-md"
                    >
                      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em]">{item.value}</p>
                      <p className="mt-1 text-xs leading-5 text-white/70">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {previewVehicles.map((vehicle) => (
                <Link
                  key={vehicle.slug}
                  href={`/gallery/${vehicle.slug}`}
                  className="group relative min-h-[8.5rem] overflow-hidden rounded-[22px] border border-foreground/10 bg-[#101722] shadow-[0_16px_38px_rgba(15,23,42,0.14)]"
                >
                  <ParallaxMedia
                    src={vehicle.image}
                    alt={vehicle.title}
                    blurDataURL={blurDataURLBySlug[vehicle.slug]}
                    offset={22}
                    sizes="(max-width: 1024px) 33vw, 18vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition group-hover:from-black/80" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/70">{vehicle.brand}</p>
                    <p className="mt-1 font-display text-lg uppercase tracking-[-0.04em] text-white">
                      {vehicle.series}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 space-y-5 lg:order-1"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-panel/85 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted shadow-sm">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Maslak showroom seçimi
              </span>

              <div className="space-y-3">
                <h1 className="max-w-2xl text-balance font-display text-[3.2rem] uppercase leading-[0.92] tracking-[-0.06em] text-foreground sm:text-[4.8rem] lg:text-[5.6rem]">
                  Görseliyle yakalayan bir galeri vitrini.
                </h1>
                <p className="max-w-xl text-[15px] leading-7 text-muted sm:text-lg sm:leading-8">
                  Mobilde yazıya boğmayan, aracı öne çıkaran, hızlı iletişimi tek dokunuşa indiren
                  güçlü bir vitrin deneyimi.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {heroPills.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-foreground/10 bg-panel/80 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-muted shadow-sm sm:text-[11px]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <a
                href={`tel:${dealershipInfo.phoneRaw}`}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-foreground/10 bg-foreground px-5 py-3 text-xs font-medium uppercase tracking-[0.24em] text-white transition hover:opacity-92"
              >
                <PhoneCall className="h-4 w-4" />
                Hemen Ara
              </a>
              <a
                href={dealershipInfo.whatsapp}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-foreground/10 bg-panel px-5 py-3 text-xs font-medium uppercase tracking-[0.24em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
              >
                <MessageSquareText className="h-4 w-4" />
                WhatsApp
              </a>
              <Link
                href="/gallery"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-foreground/10 bg-panel px-5 py-3 text-xs font-medium uppercase tracking-[0.24em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
              >
                Tüm Stoklar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {storyMetrics.map((item, index) => (
                <div
                  key={item.label}
                  className="rounded-[28px] border border-foreground/10 bg-panel/85 px-4 py-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)]"
                >
                  <p className="text-[10px] uppercase tracking-[0.24em] text-muted">
                    0{index + 1}
                  </p>
                  <p className="mt-3 font-display text-[2.5rem] uppercase tracking-[-0.05em] text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[30px] border border-foreground/10 bg-panel/90 p-4 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Hızlı araç arama</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Marka, kasa ve yakıt seç. Galerideki araçları anında filtrele.
                  </p>
                </div>
                <div className="hidden rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-muted sm:block">
                  Bugün güncel
                </div>
              </div>

              <HeroSearchPanel />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
