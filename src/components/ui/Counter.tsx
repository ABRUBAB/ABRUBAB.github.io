"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion/react";

/**
 * Counts up when scrolled into view. Server HTML contains the final value, so
 * it reads correctly without JS and under reduced motion; the text node is
 * updated directly to avoid re-rendering on every frame.
 */
export default function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = fmt(0);
    let stop: (() => void) | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const c = animate(0, to, {
          duration,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => {
            el.textContent = fmt(v);
          },
        });
        stop = () => c.stop();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, duration, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {fmt(to)}
    </span>
  );
}
