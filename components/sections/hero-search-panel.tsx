"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

import { quickFinderOptions } from "@/lib/gallery-data";

export function HeroSearchPanel() {
  const router = useRouter();
  const [brand, setBrand] = useState("Tümü");
  const [bodyStyle, setBodyStyle] = useState("Tümü");
  const [fuel, setFuel] = useState("Tümü");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (brand !== "Tümü") {
      params.set("brand", brand);
    }

    if (bodyStyle !== "Tümü") {
      params.set("body", bodyStyle);
    }

    if (fuel !== "Tümü") {
      params.set("fuel", fuel);
    }

    router.push(`/gallery${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-[26px] border border-foreground/10 bg-background/75 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:grid-cols-[1fr_1fr_1fr_auto] sm:p-5"
    >
      <label className="space-y-2">
        <span className="text-[10px] uppercase tracking-[0.28em] text-muted">Marka</span>
        <select
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
          className="w-full rounded-full border border-foreground/10 bg-panel px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
        >
          {quickFinderOptions.brands.map((item) => (
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
          className="w-full rounded-full border border-foreground/10 bg-panel px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
        >
          {quickFinderOptions.bodyStyles.map((item) => (
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
          className="w-full rounded-full border border-foreground/10 bg-panel px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
        >
          {quickFinderOptions.fuels.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-accent bg-accent px-5 py-3 text-xs uppercase tracking-[0.22em] text-white transition hover:opacity-90 sm:min-h-0 sm:tracking-[0.28em]"
      >
        Stok Ara
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}
