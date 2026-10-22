"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/scroll";

/**
 * Fades and lifts its children once as they scroll into view.
 * `blur` adds an un-blur — only use it on plain text: a CSS `filter` on an
 * ancestor makes it a "backdrop root", which stops glass inside from seeing
 * (and blurring) what is behind it.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  blur = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("reveal", className)}
      initial={{ opacity: 0, y, ...(blur && { filter: "blur(8px)" }) }}
      whileInView={{ opacity: 1, y: 0, ...(blur && { filter: "blur(0px)" }) }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.95, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
