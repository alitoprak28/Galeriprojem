"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

import { blurDataURLBySlug, dealershipInfo, type Vehicle } from "@/lib/gallery-data";

type VehicleListItemProps = {
  vehicle: Vehicle;
  priority?: boolean;
};

export function VehicleListItem({
  vehicle,
  priority = false
}: VehicleListItemProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="border border-foreground/10 bg-panel shadow-panel"
    >
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[220px_1.1fr_0.9fr_auto] lg:items-center lg:gap-5">
        <Link href={`/gallery/${vehicle.slug}`} className="relative block h-40 overflow-hidden border border-foreground/10 bg-foreground/[0.03] sm:h-44 lg:h-36">
          <Image
            src={vehicle.image}
            alt={vehicle.title}
            fill
            priority={priority}
            placeholder="blur"
            blurDataURL={blurDataURLBySlug[vehicle.slug]}
            sizes="(max-width: 1024px) 100vw, 220px"
            className="object-cover"
          />
          <div className="absolute left-3 top-3 rounded bg-black/55 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/85">
            {vehicle.year}
          </div>
        </Link>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted">
              <span>{vehicle.brand}</span>
              <span className="h-1 w-1 rounded-full bg-muted/40" />
              <span>{vehicle.bodyStyle}</span>
              <span className="h-1 w-1 rounded-full bg-muted/40" />
              <span>{vehicle.eyebrow}</span>
            </div>
            <Link href={`/gallery/${vehicle.slug}`} className="inline-block">
              <h3 className="font-display text-3xl uppercase tracking-[-0.04em] text-foreground sm:text-[2rem]">
                {vehicle.title}
              </h3>
            </Link>
            <p className="max-w-2xl text-sm leading-7 text-muted">{vehicle.tagline}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[vehicle.mileage, vehicle.fuel, vehicle.transmission, vehicle.power].map((item) => (
              <span
                key={item}
                className="rounded border border-foreground/10 bg-foreground/[0.03] px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="border border-foreground/10 bg-foreground/[0.03] px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted">Fiyat</p>
            <p className="mt-2 font-display text-3xl uppercase tracking-[-0.04em] text-foreground">
              {vehicle.price}
            </p>
          </div>
          <div className="border border-foreground/10 bg-foreground/[0.03] px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted">Lokasyon</p>
            <p className="mt-2 text-sm leading-6 text-foreground">{vehicle.location}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href={`/gallery/${vehicle.slug}`}
            className="inline-flex items-center justify-center gap-3 border border-foreground/10 bg-foreground/[0.04] px-5 py-3 text-xs uppercase tracking-[0.24em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.08]"
          >
            Detay
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <a
            href={`tel:${dealershipInfo.phoneRaw}`}
            className="inline-flex items-center justify-center gap-3 border border-foreground/10 px-5 py-3 text-xs uppercase tracking-[0.24em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
          >
            Hemen Ara
            <PhoneCall className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

