"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/scroll";

/**
 * Word-by-word mask reveal. Words (not letters) so kerning inside each word
 * stays intact — important at display sizes with tight tracking.
 * `inView` plays it when scrolled into view instead of on mount.
 */
export default function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.09,
  inView = false,
  play = true,
}: {
  text: string;
  className?: string;
  wordClassName?: (word: string, index: number) => string | undefined;
  delay?: number;
  stagger?: number;
  inView?: boolean;
  /** hold the reveal until true (e.g. until the loading screen lifts) */
  play?: boolean;
}) {
  const words = text.split(" ");
  const target = { y: "0%" };
  const hidden = { y: "112%" };
  return (
    <span aria-label={text} className={cn("inline", className)}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.14em] align-bottom"
          style={{ marginBottom: "-0.14em", marginRight: i < words.length - 1 ? "0.22em" : 0 }}
        >
          <motion.span
            className={cn("inline-block", wordClassName?.(w, i))}
            initial={{ y: "112%" }}
            {...(inView
              ? { whileInView: target, viewport: { once: true, margin: "0px 0px -12% 0px" } }
              : { animate: play ? target : hidden })}
            transition={{ duration: 1.15, delay: delay + i * stagger, ease: EASE_OUT }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
