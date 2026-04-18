"use client";

import { startTransition, useDeferredValue, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { VehicleListItem } from "@/components/gallery/vehicle-list-item";
import { type Vehicle } from "@/lib/gallery-data";

type InventoryBrowserProps = {
  vehicles: Vehicle[];
  initialBrand?: string;
  initialBody?: string;
  initialFuel?: string;
  initialQuery?: string;
};

const sortOptions = [
  { value: "featured", label: "Öne Çıkanlar" },
  { value: "newest", label: "Model Yılı" },
  { value: "price-desc", label: "Fiyat Yüksekten" },
  { value: "price-asc", label: "Fiyat Düşükten" }
];

function parsePrice(value: string) {
  return Number(value.replace(/[^\d]/g, ""));
}

export function InventoryBrowser({
  vehicles,
  initialBrand = "Tümü",
  initialBody = "Tümü",
  initialFuel = "Tümü",
  initialQuery = ""
}: InventoryBrowserProps) {
  const [query, setQuery] = useState(initialQuery);
  const [brand, setBrand] = useState(initialBrand);
  const [bodyStyle, setBodyStyle] = useState(initialBody);
  const [fuel, setFuel] = useState(initialFuel);
  const [sortBy, setSortBy] = useState("featured");
  const deferredQuery = useDeferredValue(query);

  const brandOptions = ["Tümü", ...new Set(vehicles.map((vehicle) => vehicle.brand))];
  const bodyOptions = ["Tümü", ...new Set(vehicles.map((vehicle) => vehicle.bodyStyle))];
  const fuelOptions = ["Tümü", ...new Set(vehicles.map((vehicle) => vehicle.fuel))];

  let filteredVehicles = vehicles.filter((vehicle) => {
    const queryMatch =
      deferredQuery.trim().length === 0 ||
      `${vehicle.title} ${vehicle.brand} ${vehicle.series} ${vehicle.bodyStyle}`
        .toLocaleLowerCase("tr")
        .includes(deferredQuery.trim().toLocaleLowerCase("tr"));

    const brandMatch = brand === "Tümü" || vehicle.brand === brand;
    const bodyMatch = bodyStyle === "Tümü" || vehicle.bodyStyle === bodyStyle;
    const fuelMatch = fuel === "Tümü" || vehicle.fuel === fuel;

    return queryMatch && brandMatch && bodyMatch && fuelMatch;
  });

  filteredVehicles = [...filteredVehicles].sort((first, second) => {
    if (sortBy === "newest") {
      return Number(second.year) - Number(first.year);
    }

    if (sortBy === "price-desc") {
      return parsePrice(second.price) - parsePrice(first.price);
    }

    if (sortBy === "price-asc") {
      return parsePrice(first.price) - parsePrice(second.price);
    }

    return 0;
  });

  return (
    <div className="space-y-8">
      <div className="space-y-5 border border-foreground/10 bg-panel p-5 shadow-panel sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="eyebrow">Hızlı filtreleme</p>
            <h3 className="font-display text-[2rem] uppercase tracking-[-0.04em] sm:text-4xl">
              Çok araç içinde doğru aracı kısa sürede bulun.
            </h3>
          </div>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted sm:text-[11px] sm:tracking-[0.28em]">
            <SlidersHorizontal className="h-4 w-4" />
            {filteredVehicles.length} araç bulundu
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <label className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted">Arama</span>
            <div className="flex min-h-12 items-center gap-3 border border-foreground/10 bg-background/60 px-4 py-3">
              <Search className="h-4 w-4 text-muted" />
              <input
                value={query}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  startTransition(() => setQuery(nextValue));
                }}
                placeholder="Marka, model, kasa tipi"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted">Marka</span>
            <select
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              className="w-full border border-foreground/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            >
              {brandOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted">Kasa</span>
            <select
              value={bodyStyle}
              onChange={(event) => setBodyStyle(event.target.value)}
              className="w-full border border-foreground/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            >
              {bodyOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted">Yakıt</span>
            <select
              value={fuel}
              onChange={(event) => setFuel(event.target.value)}
              className="w-full border border-foreground/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            >
              {fuelOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted">Sıralama</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full border border-foreground/10 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            >
              {sortOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filteredVehicles.length > 0 ? (
        <div className="space-y-4">
          {filteredVehicles.map((vehicle, index) => (
            <VehicleListItem key={vehicle.slug} vehicle={vehicle} priority={index < 2} />
          ))}
        </div>
      ) : (
        <div className="border border-foreground/10 bg-panel px-6 py-12 text-center shadow-panel sm:px-10">
          <p className="font-display text-3xl uppercase tracking-[-0.04em] text-foreground sm:text-4xl">
            Filtrelere uygun araç bulunamadı.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted">
            Arama kriterlerini genişletin ya da danışmanımıza yazın; kapalı stok veya yeni giriş
            araçlar için hızlı liste paylaşalım.
          </p>
        </div>
      )}
    </div>
  );
}
