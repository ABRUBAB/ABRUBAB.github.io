"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

/**
 * A quiet custom cursor for fine pointers: a small dot that swells over
 * links and buttons, and becomes a labelled disc over anything marked
 * `data-cursor="Label"` (e.g. the live project frames). Hidden on touch,
 * with reduced motion, or when effects are switched off.
 */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 50, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 900, damping: 50, mass: 0.2 });
  const [mode, setMode] = useState<"dot" | "link" | "label">("dot");
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);

  // client-only capability check (fine pointer, motion allowed, effects on)
  const on = useSyncExternalStore(
    () => () => {},
    () => {
      let fxOff = false;
      try {
        fxOff = localStorage.getItem("fx") === "off";
      } catch {}
      return (
        window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        !fxOff
      );
    },
    () => false,
  );

  useEffect(() => {
    if (!on) return;
    document.documentElement.dataset.cursor = "on";

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target instanceof Element ? e.target : null;
      const tagged = el?.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        setMode("label");
        setLabel(tagged.dataset.cursor ?? "");
      } else if (el?.closest("a, button, summary, [role='button']")) {
        setMode("link");
      } else {
        setMode("dot");
      }
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", dn, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      delete document.documentElement.dataset.cursor;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [on, x, y]);

  if (!on) return null;

  const size = mode === "label" ? 92 : mode === "link" ? 44 : 12;

  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[95]">
      <motion.div
        animate={{ width: size, height: size, scale: down ? 0.86 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.6 }}
        className={
          mode === "label"
            ? "-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-ash-50 text-ink"
            : "-translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-white mix-blend-difference"
        }
        style={mode === "link" ? { background: "transparent" } : undefined}
      >
        <AnimatePresence>
          {mode === "label" && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-[11px] font-medium uppercase tracking-[0.14em]"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
