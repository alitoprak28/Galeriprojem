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
      className="fixed inset-x-0 top-0 z-50 border-b border-foreground/10 bg-background/98"
    >
      <div className="page-shell">
        <div
          className={cn(
            "py-3 transition-all duration-300",
            scrolled ? "shadow-[0_10px_24px_rgba(15,23,42,0.05)]" : ""
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="group inline-flex min-w-0 items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
              <div className="min-w-0">
                <p className="truncate font-display text-[12px] uppercase tracking-[0.14em] text-foreground sm:text-xl">
                  {dealershipInfo.name}
                </p>
                <p className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-muted sm:block sm:text-[11px]">
                  {dealershipInfo.tagline}
                </p>
              </div>
            </Link>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <nav className="hidden items-center gap-6 lg:flex">
                {links.map((link) => {
                  const active = link.href === "/gallery" ? pathname === "/gallery" : false;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-[11px] font-medium uppercase tracking-[0.18em] text-muted transition hover:text-foreground",
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
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-foreground/10 bg-panel px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.05] sm:min-h-11 sm:px-4 sm:text-[11px]"
              >
                <PhoneCall className="h-4 w-4" />
                <span className="hidden sm:inline">{dealershipInfo.phoneDisplay}</span>
                <span className="sm:hidden">Ara</span>
              </a>
            </div>
          </div>

          <nav className="mt-3 flex items-center gap-5 overflow-x-auto border-t border-foreground/10 pb-1 pt-3 lg:hidden">
            {links.map((link) => {
              const active = link.href === "/gallery" ? pathname === "/gallery" : false;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "whitespace-nowrap border-b border-transparent pb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted transition hover:text-foreground",
                    active && "border-foreground/40 text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
