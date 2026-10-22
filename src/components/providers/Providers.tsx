"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import WaterCanvas from "@/components/background/WaterCanvas";
import LiquidDefs from "@/components/ui/LiquidDefs";
import Cursor from "@/components/ui/Cursor";
import { setLenis } from "@/lib/scroll";

type UAData = { brands?: { brand: string }[] };

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;

    // Water-refraction backdrop filters only render correctly on Chromium.
    const brands = (navigator as Navigator & { userAgentData?: UAData }).userAgentData?.brands;
    if (brands?.some((b) => /chrom/i.test(b.brand))) root.dataset.refract = "";

    let fxOff = false;
    try {
      fxOff = localStorage.getItem("fx") === "off";
    } catch {}
    if (fxOff) return;

    // Lenis honours prefers-reduced-motion on its own (respectReducedMotion).
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      wheelMultiplier: 0.95,
      allowNestedScroll: true,
      anchors: { offset: -88, duration: 1.4 },
    });
    setLenis(lenis);
    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ash-50 px-4 py-2 text-sm font-medium text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <LiquidDefs />
      <WaterCanvas />
      <Cursor />
      {children}
    </>
  );
}
