"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/scroll";

/**
 * Cycles through a list of phrases with a vertical slide. One tiny state change
 * every few seconds; it pauses with the tab and stays on the first phrase for
 * reduced-motion visitors (and before `play`, e.g. while the loading screen is up).
 */
export default function WordCycler({
  words,
  play = true,
  interval = 2600,
  className,
}: {
  words: string[];
  play?: boolean;
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!play || words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setI((v) => (v + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [play, words.length, interval]);

  return (
    <span className={cn("relative inline-flex h-[1.32em] overflow-hidden align-bottom", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          aria-hidden
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-105%", opacity: 0 }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="inline-block whitespace-nowrap"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
