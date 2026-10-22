"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const RING = 2 * Math.PI * 62;
const SEEN_KEY = "ar-seen";

const preload = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new window.Image();
    img.onload = () => (img.decode ? img.decode().catch(() => {}).finally(resolve) : resolve());
    img.onerror = () => resolve();
    img.src = src;
  });

/**
 * Loading screen. Everything that would otherwise stutter on first view is
 * warmed up behind it: web fonts, the hero portrait, the first project poster,
 * and the water shader (which compiles and settles on a quality tier for the
 * visitor's hardware). Progress is real — it follows those tasks — and the
 * curtain only lifts when they are done. It is server-rendered, so the page
 * never flashes before it; <noscript> hides it for visitors without JS.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"loading" | "leaving" | "gone">("loading");
  const numRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const root = document.documentElement;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}

    const minMs = calm ? 250 : seen ? 600 : 1700; // long enough to read as intentional on a first visit
    const maxMs = 5200; // never trap anyone behind a slow asset
    const deepLink = window.scrollY > 200 || location.hash.length > 1; // the hero (and its water) may be off-screen

    root.style.overflow = "hidden";
    const t0 = performance.now();

    let finished = 0;
    let all = false;
    const waterReady =
      deepLink || root.dataset.waterReady === "1"
        ? Promise.resolve()
        : new Promise<void>((res) => window.addEventListener("water:ready", () => res(), { once: true }));
    const tasks = [
      document.fonts?.ready ?? Promise.resolve(),
      preload("/assets/photos/portrait-lit.webp"),
      preload("/assets/projects/yinglong-poster.webp"),
      waterReady,
    ];
    tasks.forEach((t) => Promise.resolve(t).catch(() => {}).then(() => void finished++));
    Promise.all(tasks.map((t) => Promise.resolve(t).catch(() => {}))).then(() => {
      all = true;
    });

    let shown = 0;
    let raf = 0;
    let leaving = false;
    let timers: number[] = [];

    const leave = () => {
      if (leaving) return;
      leaving = true;
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      setPhase("leaving");
      // the hero starts moving as the curtain begins to lift
      timers.push(window.setTimeout(() => doneRef.current(), calm ? 0 : 380));
      timers.push(
        window.setTimeout(
          () => {
            root.style.overflow = "";
            setPhase("gone");
          },
          calm ? 200 : 1100,
        ),
      );
    };

    const paint = () => {
      if (numRef.current) numRef.current.textContent = String(Math.round(shown * 100)).padStart(3, "0");
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(RING * (1 - shown));
    };

    let prev = t0;
    const tick = (now: number) => {
      const elapsed = Math.max(0, now - t0); // rAF timestamps can precede t0 on the first frame
      const dt = Math.max(0, now - prev);
      prev = now;
      // the bar follows real task completion, but can't outrun the minimum show time
      const real = all ? 1 : 0.08 + 0.82 * (finished / tasks.length);
      const target = Math.min(real, 0.03 + 0.97 * (elapsed / minMs));
      // time-based easing, so a slow device doesn't crawl through the last 20%
      shown += (target - shown) * (1 - Math.exp(-dt / 90));
      if (target - shown < 0.002) shown = target;
      paint();
      if ((shown >= 0.999 && all) || elapsed > maxMs) {
        shown = 1;
        paint();
        leave();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      timers = [];
      root.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      id="loader"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-ink transition-[transform,opacity] duration-[950ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:duration-200",
        phase === "leaving" && "-translate-y-full rounded-b-[56px] motion-reduce:translate-y-0 motion-reduce:opacity-0",
      )}
    >
      {/* water-light, static */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_105%,rgb(61_99_255/0.34),transparent_70%),radial-gradient(40%_40%_at_85%_0%,rgb(61_99_255/0.12),transparent_70%)]"
      />

      <div
        className={cn(
          "relative grid place-items-center transition-[transform,opacity] duration-500 ease-out",
          phase === "leaving" && "scale-90 opacity-0",
        )}
      >
        <svg width="148" height="148" viewBox="0 0 148 148" className="-rotate-90" aria-hidden>
          <defs>
            <linearGradient id="loader-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#c7d5ff" />
              <stop offset="0.6" stopColor="#6f90ff" />
              <stop offset="1" stopColor="#ff5a1f" />
            </linearGradient>
          </defs>
          <circle cx="74" cy="74" r="62" fill="none" stroke="rgb(255 255 255 / 0.09)" strokeWidth="1.5" />
          <circle
            ref={ringRef}
            cx="74"
            cy="74"
            r="62"
            fill="none"
            stroke="url(#loader-ring)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={RING}
            strokeDashoffset={RING}
          />
        </svg>
        <Image
          src="/assets/logos/ar-mark.png"
          alt="Abdullah Rubab"
          width={384}
          height={291}
          priority
          className="breathe absolute h-auto w-[64px]"
        />
      </div>

      <p
        className={cn(
          "relative mt-8 font-mono text-[12px] tracking-[0.34em] text-ash-300 transition-opacity duration-300",
          phase === "leaving" && "opacity-0",
        )}
      >
        <span ref={numRef}>000</span>
      </p>

      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.3em] text-ash-500">
        Abdullah Rubab · Portfolio
      </p>
    </div>
  );
}
