"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "ink" | "outlineInk";
  size?: "md" | "sm";
  external?: boolean;
  download?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

const variants = {
  primary:
    "bg-ash-50 text-ink hover:bg-white hover:shadow-[0_0_0_1px_rgb(255_255_255/0.25),0_14px_44px_-10px_rgb(111_144_255/0.65)]",
  outline:
    "border border-white/[0.16] text-ash-50 hover:border-white/35 hover:bg-white/[0.06] hover:text-white",
  ghost: "text-ash-200 hover:text-white hover:bg-white/[0.06]",
  // for the light "paper" sheet
  ink: "bg-ink text-ash-50 hover:bg-cobalt-700",
  outlineInk: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-ash-50",
};

const sizes = {
  md: "h-12 gap-2.5 px-6 text-[15px]",
  sm: "h-9 gap-2 px-4 text-[13px]",
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  external,
  download,
  leading,
  trailing,
  className,
  children,
  ...aria
}: Props) {
  const cls = cn(
    "group inline-flex shrink-0 items-center justify-center rounded-full font-medium tracking-tight transition-[background,box-shadow,color] duration-300 ease-out-quint",
    variants[variant],
    sizes[size],
    className,
  );
  const inner = (
    <>
      {leading}
      <span>{children}</span>
      {trailing && (
        <span className="transition-transform duration-300 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {trailing}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...aria}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} {...aria}>
      {inner}
    </button>
  );
}
