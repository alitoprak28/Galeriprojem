"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full border border-foreground/10 bg-foreground/[0.04]" />
    );
  }

  const isDark = resolvedTheme !== "light";

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.96 }}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.04] text-foreground transition hover:border-foreground/20 hover:bg-foreground/[0.08]"
      aria-label="Toggle theme"
    >
      <motion.span
        key={resolvedTheme}
        initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
      </motion.span>
    </motion.button>
  );
}
