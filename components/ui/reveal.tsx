"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  distance?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 32,
  ...props
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
