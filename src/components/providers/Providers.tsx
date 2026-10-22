"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import WaterCanvas from "@/components/background/WaterCanvas";
import Loader from "./Loader";
import { LoadedContext } from "./LoadedContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const home = usePathname() === "/";
  const [loaded, setLoaded] = useState(!home); // only the home page has a loading screen

  return (
    <MotionConfig reducedMotion="user">
    <LoadedContext.Provider value={loaded}>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ash-50 px-4 py-2 text-sm font-medium text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <WaterCanvas />
      {home && <Loader onDone={() => setLoaded(true)} />}
      {children}
    </LoadedContext.Provider>
    </MotionConfig>
  );
}
