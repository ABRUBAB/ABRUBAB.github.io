import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tone = {
  default: "border-white/10 bg-white/[0.045] text-ash-300",
  cobalt: "border-cobalt-400/30 bg-cobalt-500/[0.12] text-cobalt-300",
  ember: "border-ember-400/30 bg-ember-500/[0.1] text-ember-400",
};

export default function Chip({
  children,
  tone: t = "default",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none tracking-wide",
        tone[t],
        className,
      )}
    >
      {children}
    </span>
  );
}
