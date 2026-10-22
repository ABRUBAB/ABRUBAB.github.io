"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { ticker } from "@/content/data";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

const Star = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="mx-[clamp(1.25rem,3vw,3rem)] size-[clamp(1.2rem,2.4vw,2.2rem)] shrink-0 text-ember-500">
    <path fill="currentColor" d="M12 0 14.6 9.4 24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6Z" />
  </svg>
);

/**
 * Big-type ticker. Drifts on its own, then speeds up, reverses and skews with
 * scroll velocity — the page's pulse between hero and work.
 */
export default function Ticker() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 380 });
  const boost = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(smooth, [-1600, 0, 1600], [7, 0, -7]);
  const dir = useRef(1);
  const reduce = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const v = boost.get();
    if (v < -0.02) dir.current = -1;
    else if (v > 0.02) dir.current = 1;
    let move = dir.current * -1.6 * (delta / 1000); // % of the track per second
    move += dir.current * move * Math.abs(v);
    baseX.set(wrap(-50, 0, baseX.get() + move));
  });

  const x = useTransform(baseX, (v) => `${v}%`);
  const row = [...ticker, ...ticker];

  return (
    <div aria-hidden className="relative overflow-hidden py-[clamp(1.5rem,3.5vw,3rem)]">
      <motion.div style={{ x, skewX: skew }} className="flex w-max items-center whitespace-nowrap will-change-transform">
        {row.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center">
            <span
              className={
                i % 2 === 0
                  ? "text-[clamp(3rem,8.4vw,7.6rem)] font-medium leading-none tracking-[-0.05em] text-ash-50"
                  : "outline-text text-[clamp(3rem,8.4vw,7.6rem)] font-medium leading-none tracking-[-0.05em] [--outline:rgb(245_244_241/0.32)]"
              }
            >
              {t}
            </span>
            <Star />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
