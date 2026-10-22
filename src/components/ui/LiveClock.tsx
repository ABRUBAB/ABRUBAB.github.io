"use client";

import { useEffect, useState } from "react";

/** Local time in a given zone, ticking each 20s. Renders a placeholder until mounted to avoid hydration drift. */
export default function LiveClock({ timeZone, className }: { timeZone: string; className?: string }) {
  const [t, setT] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums" }} suppressHydrationWarning>
      {t ?? "--:--"}
    </span>
  );
}
