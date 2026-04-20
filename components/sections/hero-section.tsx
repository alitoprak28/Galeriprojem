"use client";

import Link from "next/link";
import { ArrowRight, MapPin, MessageSquareText, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

import { HeroSearchPanel } from "@/components/sections/hero-search-panel";
import { ParallaxMedia } from "@/components/ui/parallax-media";
import { blurDataURLBySlug, dealershipInfo, vehicles } from "@/lib/gallery-data";

const heroVehicle =
  vehicles.find((vehicle) => vehicle.slug === "volkswagen-passat-business-1-5-etsi") ?? vehicles[0];

const heroVehicleTitleLines = ["Volkswagen Passat", "1.5 eTSI Business"];

const previewVehicles = [
  "bmw-x7-m60i-xdrive",
  "peugeot-3008-allure",
  "toyota-corolla-dream-xpack"
]
  .map((slug) => vehicles.find((vehicle) => vehicle.slug === slug))
  .filter((vehicle): vehicle is (typeof vehicles)[number] => Boolean(vehicle));

const salesMetrics = [
  {
    value: "120+",
    label: "Aktif stok"
  },
  {
    value: "Takas",
    label: "Araç değerleme desteği"
  },
  {
    value: "Aynı Gün",
    label: "Hızlı geri dönüş"
  }
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="page-shell">
        <div className="grid gap-6 lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 space-y-4 lg:order-2"
          >
            <div className="relative min-h-[19rem] overflow-hidden rounded-[28px] border border-foreground/10 bg-[#09101a] shadow-[0_28px_70px_rgba(15,23,42,0.16)] sm:min-h-[30rem]">
              <ParallaxMedia
                src={heroVehicle.image}
                alt={heroVehicle.title}
                blurDataURL={blurDataURLBySlug[heroVehicle.slug]}
                priority
                offset={34}
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4 sm:p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/88">
                  Vitrindeki Araç
                </div>
                <div className="rounded-full border border-white/15 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/70">
                  Güncel Fiyat
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <div className="rounded-[22px] border border-white/10 bg-black/28 p-4 backdrop-blur-sm sm:p-5">
                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/68">
                      {heroVehicle.eyebrow}
                    </p>
                    <h2 className="max-w-[14rem] font-display text-[1.5rem] uppercase leading-[0.9] tracking-[-0.05em] text-white sm:max-w-lg sm:text-[3rem]">
                      <span className="sm:hidden">
                        {heroVehicleTitleLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                      <span className="hidden sm:inline">{heroVehicle.title}</span>
                    </h2>
                    <p className="text-sm leading-6 text-white/78">
                      {heroVehicle.year} model • {heroVehicle.fuel} • {heroVehicle.transmission}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="font-display text-[2rem] uppercase tracking-[-0.05em] text-white sm:text-[2.5rem]">
                        {heroVehicle.price}
                      </p>
                      <div className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/70">
                        <MapPin className="h-3.5 w-3.5" />
                        {heroVehicle.location}
                      </div>
                    </div>
                    <Link
                      href={`/gallery/${heroVehicle.slug}`}
                      className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition hover:bg-white/15 sm:px-5 sm:text-xs sm:tracking-[0.22em]"
                    >
                      Aracı İncele
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden gap-3 sm:grid sm:grid-cols-3">
              {previewVehicles.map((vehicle) => (
                <Link
                  key={vehicle.slug}
                  href={`/gallery/${vehicle.slug}`}
                  className="group relative min-h-[9rem] overflow-hidden rounded-[22px] border border-foreground/10 bg-[#101722] shadow-[0_12px_32px_rgba(15,23,42,0.12)]"
                >
                  <ParallaxMedia
                    src={vehicle.image}
                    alt={vehicle.title}
                    blurDataURL={blurDataURLBySlug[vehicle.slug]}
                    offset={18}
                    sizes="(max-width: 1024px) 33vw, 18vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/70">{vehicle.brand}</p>
                    <p className="mt-1 font-display text-xl uppercase tracking-[-0.04em] text-white">
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
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-panel px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted shadow-sm">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Maslak ikinci el araç stoğu
              </span>

              <div className="space-y-3">
                <h1 className="max-w-2xl text-balance font-display text-[2.05rem] uppercase leading-[0.94] tracking-[-0.05em] text-foreground sm:text-[4.6rem] lg:text-[5.2rem]">
                  Beğendiğiniz aracı görün, fiyatını alın, bugün görüşelim.
                </h1>
                <p className="max-w-xl text-[15px] leading-7 text-muted sm:text-lg sm:leading-8">
                  Sedan, SUV ve aile araçlarımızı tek sayfadan inceleyin. Fiyat, kilometre,
                  model yılı ve iletişim bilgileri net şekilde önünüzde olsun.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <a
                href={`tel:${dealershipInfo.phoneRaw}`}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-3 rounded-full border border-foreground/10 bg-foreground px-5 py-3 text-xs font-medium uppercase tracking-[0.22em] text-white transition hover:opacity-92"
              >
                <PhoneCall className="h-4 w-4" />
                Hemen Ara
              </a>
              <a
                href={dealershipInfo.whatsapp}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-3 rounded-full border border-foreground/10 bg-panel px-5 py-3 text-xs font-medium uppercase tracking-[0.22em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
              >
                <MessageSquareText className="h-4 w-4" />
                WhatsApp
              </a>
              <Link
                href="/gallery"
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-3 rounded-full border border-foreground/10 bg-panel px-5 py-3 text-xs font-medium uppercase tracking-[0.22em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
              >
                Tüm Stoklar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {salesMetrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[22px] border border-foreground/10 bg-panel px-4 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)]"
                >
                  <p className="font-display text-[1.75rem] uppercase tracking-[-0.05em] text-foreground sm:text-[2.2rem]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[26px] border border-foreground/10 bg-panel p-4 shadow-[0_12px_36px_rgba(15,23,42,0.06)] sm:p-5">
              <div className="mb-4 space-y-2">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Hızlı araç arama</p>
                <p className="text-sm leading-6 text-muted">
                  Aradığınız aracı marka, kasa ve yakıt seçerek doğrudan stoktan bulun.
                </p>
              </div>

              <HeroSearchPanel />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
