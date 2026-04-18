"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const pointerX = useMotionValue(-200);
  const pointerY = useMotionValue(-200);
  const x = useSpring(pointerX, { stiffness: 120, damping: 24, mass: 0.4 });
  const y = useSpring(pointerY, { stiffness: 120, damping: 24, mass: 0.4 });

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      pointerX.set(event.clientX - 180);
      pointerY.set(event.clientY - 180);
    };

    window.addEventListener("pointermove", handleMove);

    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [pointerX, pointerY]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-20 hidden h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(188,156,118,0.18),rgba(188,156,118,0.06)_28%,transparent_70%)] blur-3xl md:block"
      style={{ x, y }}
    />
  );
}

