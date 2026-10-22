"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/scroll";
import Counter from "./Counter";

/**
 * A grade as a ring that draws itself in when scrolled into view. The number in
 * the middle counts up with it. `tone="light"` is for the paper sheet.
 */
export default function Ring({
  value,
  max,
  size = 96,
  decimals = 2,
  label,
  tone = "light",
}: {
  value: number;
  max: number;
  size?: number;
  decimals?: number;
  label: string;
  tone?: "light" | "dark";
}) {
  const id = useId().replace(/:/g, "");
  const R = 52;
  const C = 2 * Math.PI * R;
  const light = tone === "light";
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`${label} ${value.toFixed(decimals)} out of ${max}`}>
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
        <defs>
          <linearGradient id={`ring-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6f90ff" />
            <stop offset="0.65" stopColor="#2547eb" />
            <stop offset="1" stopColor="#ff5a1f" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={R} fill="none" stroke={light ? "rgb(9 9 11 / 0.08)" : "rgb(255 255 255 / 0.1)"} strokeWidth="8" />
        <motion.circle
          cx="60"
          cy="60"
          r={R}
          fill="none"
          stroke={`url(#ring-${id})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C * (1 - value / max) }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 1.9, delay: 0.15, ease: EASE_OUT }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div className={`font-mono uppercase tracking-[0.1em] ${light ? "text-ash-500" : "text-ash-400"}`} style={{ fontSize: Math.max(8, size * 0.078) }}>
          <span className="block leading-none">{label}</span>
          <span
            className={`my-[0.28em] block font-sans normal-case ${light ? "text-ink" : "text-ash-50"}`}
            style={{ fontSize: size * 0.27, lineHeight: 1 }}
          >
            <Counter to={value} decimals={decimals} className="font-medium tracking-tight" />
          </span>
          <span className="block leading-none">of {max.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
