"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { scrollToTop } from "@/lib/scroll";
import { ArrowUpRight } from "./Icons";

/**
 * Appears once the hero is behind you; the ring around it is the page's scroll
 * progress. Opacity/scale/stroke only, driven by motion values (no re-renders).
 */
export default function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const show = useTransform(scrollY, [520, 820], [0, 1]);
  const scale = useTransform(show, [0, 1], [0.7, 1]);
  const events = useTransform(show, (v) => (v > 0.6 ? "auto" : "none"));

  return (
    <motion.a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        scrollToTop();
      }}
      aria-label="Back to top"
      style={{ opacity: show, scale, pointerEvents: events }}
      className="fixed bottom-5 right-5 z-[55] grid size-12 place-items-center rounded-full border border-white/[0.14] bg-ink/90 text-ash-100 shadow-[0_14px_40px_-12px_rgb(0_0_0/0.8)] transition-colors hover:border-white/35 hover:text-white max-sm:bottom-4 max-sm:right-4"
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r="22" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="2" />
        <motion.circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="#ff5a1f"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <ArrowUpRight width={17} height={17} className="-rotate-45" />
    </motion.a>
  );
}
