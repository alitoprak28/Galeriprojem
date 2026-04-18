import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { VehicleListItem } from "@/components/gallery/vehicle-list-item";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { brandLabels, vehicles } from "@/lib/gallery-data";

const featuredSlugs = [
  "volkswagen-passat-business-1-5-etsi",
  "fiat-egea-cross-1-6-multijet",
  "renault-megane-touch-edc",
  "toyota-corolla-dream-xpack",
  "peugeot-3008-allure",
  "honda-civic-eco-executive",
  "mercedes-s580-4matic-long",
  "bmw-x7-m60i-xdrive"
];

const featuredStock = featuredSlugs
  .map((slug) => vehicles.find((vehicle) => vehicle.slug === slug))
  .filter((vehicle): vehicle is (typeof vehicles)[number] => Boolean(vehicle));

export function HomeStockSection() {
  return (
    <section className="section-space">
      <div className="page-shell space-y-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Güncel Stoklar"
            title="Bugün satışta olan araçlarımız."
            description="Fiyatı, kilometresi, model yılı ve temel bilgileri açık açık görün. Beğendiğiniz aracı seçin, detayına girin ya da hemen bizi arayın."
          />
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-foreground transition hover:text-accent"
          >
            Tüm Stokları Gör
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Reveal className="flex flex-wrap gap-2">
          {brandLabels.slice(0, 12).map((brand) => (
            <span
              key={brand}
              className="rounded border border-foreground/10 bg-panel px-3 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted"
            >
              {brand}
            </span>
          ))}
        </Reveal>

        <div className="space-y-4">
          {featuredStock.map((vehicle, index) => (
            <VehicleListItem key={vehicle.slug} vehicle={vehicle} priority={index < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
