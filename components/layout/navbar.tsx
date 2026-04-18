"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { PhoneCall } from "lucide-react";
import { useState } from "react";

import { dealershipInfo } from "@/lib/gallery-data";
import { cn } from "@/lib/utils";

const links = [
  { href: "/gallery", label: "Stoklar" },
  { href: "/#hizmetler", label: "Hizmetler" },
  { href: "/#guvence", label: "Yorumlar" },
  { href: "/#iletisim", label: "İletişim" }
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="page-shell pt-4 sm:pt-6">
        <div
          className={cn(
            "flex items-center justify-between gap-4 border bg-background px-4 py-3 transition-all duration-300 sm:px-6",
            scrolled
              ? "border-foreground/10 shadow-panel"
              : "border-foreground/10"
          )}
        >
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
            <div>
              <p className="font-display text-base uppercase tracking-[0.16em] text-foreground sm:text-xl">
                {dealershipInfo.name}
              </p>
              <p className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-muted sm:block sm:text-[11px]">
                {dealershipInfo.tagline}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="hidden items-center gap-5 lg:flex">
              {links.map((link) => {
                const active = link.href === "/gallery" ? pathname === "/gallery" : false;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-[11px] font-medium uppercase tracking-[0.2em] text-muted transition hover:text-foreground",
                      active && "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <a
              href={`tel:${dealershipInfo.phoneRaw}`}
              className="inline-flex items-center gap-2 border border-foreground/10 bg-foreground/[0.04] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.08] sm:text-[11px]"
            >
              <PhoneCall className="h-4 w-4" />
              {dealershipInfo.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
