"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * A rounded, inset section surface that glides up into place as it enters.
 *
 * The glide is tied to scroll (not to a timer): the sheet starts a little low
 * and settles as its top reaches 40% of the viewport, which makes it travel
 * ~20% slower through that stretch. That is what keeps the handover from the
 * pinned project stack from feeling like a jump. Translate only, on its own
 * layer for just that stretch (`will-change` is switched on only while it moves),
 * so it costs nothing per frame and holds no extra memory afterwards.
 */
export default function Sheet({
  children,
  className,
  lag = 130,
}: {
  children: ReactNode;
  className?: string;
  /** px the sheet trails behind its natural position when it first appears */
  lag?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const calm = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 40%"] });
  const y = useTransform(scrollYProgress, [0, 1], [lag, 0]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (sheet.current) sheet.current.style.willChange = v > 0 && v < 1 ? "transform" : "auto";
  });

  return (
    <div ref={ref}>
      <motion.div ref={sheet} style={calm ? undefined : { y }} className={cn("sheet", className)}>
        {children}
      </motion.div>
    </div>
  );
}
