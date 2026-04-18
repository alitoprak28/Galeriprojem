"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

type ParallaxMediaProps = {
  src: string;
  alt: string;
  blurDataURL: string;
  className?: string;
  priority?: boolean;
  offset?: number;
  sizes?: string;
};

export function ParallaxMedia({
  src,
  alt,
  blurDataURL,
  className,
  priority = false,
  offset = 72,
  sizes = "100vw"
}: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div className="absolute inset-x-0 -inset-y-10" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          placeholder="blur"
          blurDataURL={blurDataURL}
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

