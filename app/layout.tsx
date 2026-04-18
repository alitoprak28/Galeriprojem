import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { FloatingContact } from "@/components/layout/floating-contact";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { dealershipInfo } from "@/lib/gallery-data";
import { cn } from "@/lib/utils";

import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: dealershipInfo.name,
  description:
    "Klasik galeri mantığına uygun, çok araç gösteren, sade ve iş odaklı ikinci el otomobil sitesi."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={cn(
          display.variable,
          sans.variable,
          "min-h-screen bg-background text-foreground antialiased"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <SmoothScroll />

          <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-foreground/10" />
          </div>

          <Navbar />
          <FloatingContact />
          <main className="relative z-10 pb-24 md:pb-0">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
