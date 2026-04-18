"use client";

import Link from "next/link";
import { ArrowRight, MapPin, MessageSquareText, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

import { HeroSearchPanel } from "@/components/sections/hero-search-panel";
import { blurDataURLBySlug, dealershipInfo, storyMetrics, vehicles } from "@/lib/gallery-data";
import { ParallaxMedia } from "@/components/ui/parallax-media";

const heroVehicle =
  vehicles.find((vehicle) => vehicle.slug === "volkswagen-passat-business-1-5-etsi") ?? vehicles[0];

export function HeroSection() {
  return (
    <section className="pt-28 sm:pt-32">
      <div className="page-shell">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 border border-foreground/10 bg-panel p-5 shadow-panel sm:space-y-6 sm:p-8"
          >
            <div className="space-y-3">
              <span className="eyebrow">İstanbul Maslak ikinci el araç stoğu</span>
              <h1 className="text-balance font-display text-[2.75rem] uppercase tracking-[-0.05em] text-foreground sm:text-6xl lg:text-7xl">
                Çok araç, net fiyat, hızlı iletişim.
              </h1>
              <p className="max-w-3xl text-[15px] leading-7 text-muted sm:text-lg sm:leading-8">
                Aradığınız aracı kolayca bulun, fiyatını görün, bizi tek tuşla arayın. Sedan,
                SUV, dizel, benzinli ve farklı marka seçenekleriyle güncel stoklarımız burada.
              </p>
            </div>

            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <a
                href={`tel:${dealershipInfo.phoneRaw}`}
                className="inline-flex items-center justify-center gap-3 border border-foreground/10 bg-foreground/[0.04] px-5 py-3 text-xs font-medium uppercase tracking-[0.24em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.08]"
              >
                <PhoneCall className="h-4 w-4" />
                Hemen Ara
              </a>
              <a
                href={dealershipInfo.whatsapp}
                className="inline-flex items-center justify-center gap-3 border border-foreground/10 px-5 py-3 text-xs font-medium uppercase tracking-[0.24em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
              >
                <MessageSquareText className="h-4 w-4" />
                WhatsApp
              </a>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center gap-3 border border-foreground/10 px-5 py-3 text-xs font-medium uppercase tracking-[0.24em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
              >
                Tüm Stoklar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {storyMetrics.map((item) => (
                <div
                  key={item.label}
                  className="border border-foreground/10 bg-background/70 px-4 py-4"
                >
                  <p className="font-display text-3xl uppercase tracking-[-0.04em] text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-foreground/10 pt-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
                Hızlı araç arama
              </p>
              <HeroSearchPanel />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6"
          >
            <div className="relative min-h-[18rem] overflow-hidden border border-foreground/10 bg-panel shadow-panel sm:min-h-[24rem]">
              <ParallaxMedia
                src={heroVehicle.image}
                alt={heroVehicle.title}
                blurDataURL={blurDataURLBySlug[heroVehicle.slug]}
                priority
                offset={40}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">
                      Günün öne çıkan aracı
                    </p>
                    <h2 className="mt-2 font-display text-[2rem] uppercase tracking-[-0.04em] text-white sm:text-3xl">
                      {heroVehicle.title}
                    </h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-white/80">
                      {heroVehicle.mileage} • {heroVehicle.fuel} • {heroVehicle.transmission}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-display text-3xl uppercase tracking-[-0.04em] text-white">
                      {heroVehicle.price}
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
                      {heroVehicle.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-foreground/10 bg-panel p-5 shadow-panel">
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
                  Showroom Adresi
                </p>
                <p className="mt-3 text-base leading-7 text-foreground">{dealershipInfo.address}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
                  <MapPin className="h-4 w-4" />
                  Yerinde araç gösterimi
                </div>
              </div>

              <div className="border border-foreground/10 bg-panel p-5 shadow-panel">
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
                  Çalışma Düzeni
                </p>
                <p className="mt-3 text-base leading-7 text-foreground">{dealershipInfo.hours}</p>
                <p className="mt-4 text-sm leading-7 text-muted">
                  Gelmeden önce arayın, ilgilendiğiniz aracı hazırlayalım. Takas ve noter sürecini
                  de aynı görüşmede konuşalım.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
