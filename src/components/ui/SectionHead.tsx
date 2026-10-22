import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Reveal from "./Reveal";
import SplitWords from "./SplitWords";

/**
 * Section title: a mono label, then a display heading whose last word is set
 * in the serif italic. `tone="light"` is for the paper sheet.
 */
export default function SectionHead({
  label,
  lead,
  accent,
  accentClass,
  tone = "dark",
  aside,
}: {
  label: string;
  lead: string;
  accent: string;
  accentClass: string;
  tone?: "dark" | "light";
  aside?: ReactNode;
}) {
  const light = tone === "light";
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
      <div>
        <Reveal blur>
          <p className={cn("label flex items-center gap-3", light && "text-ash-500")}>
            <span className={cn("h-px w-8 bg-gradient-to-r to-transparent", light ? "from-ink" : "from-cobalt-400")} />
            {label}
          </p>
        </Reveal>
        <h2 className={cn("display mt-5 text-[clamp(2.8rem,7.4vw,6.4rem)]", light ? "text-ink" : "text-ash-50")}>
          <SplitWords text={lead} inView />{" "}
          <SplitWords
            text={accent}
            inView
            delay={0.22}
            wordClassName={() => cn("serif-italic pr-[0.06em] text-[1.04em]", accentClass)}
          />
        </h2>
      </div>
      {aside && <Reveal delay={0.2}>{aside}</Reveal>}
    </div>
  );
}
