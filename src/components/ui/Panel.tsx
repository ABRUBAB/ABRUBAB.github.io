"use client";

import { useRef, type ComponentType, type HTMLAttributes, type ReactNode, type RefAttributes } from "react";
import { cn } from "@/lib/cn";

type Tag = "div" | "a" | "article" | "li" | "section";

interface Props extends HTMLAttributes<HTMLElement> {
  as?: Tag;
  /** Pointer-following specular light. On by default. */
  spotlight?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  children?: ReactNode;
}

/** Solid ash surface with a hairline edge and a soft cursor-following highlight. */
export default function Panel({
  as = "div",
  spotlight = true,
  className,
  children,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const raf = useRef(0);

  const move = (e: React.PointerEvent<HTMLElement>) => {
    onPointerMove?.(e);
    if (!spotlight || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - r.left}px`);
      el.style.setProperty("--my", `${clientY - r.top}px`);
    });
  };
  const enter = (e: React.PointerEvent<HTMLElement>) => {
    onPointerEnter?.(e);
    if (spotlight && e.pointerType !== "touch") ref.current?.style.setProperty("--glow", "1");
  };
  const leave = (e: React.PointerEvent<HTMLElement>) => {
    onPointerLeave?.(e);
    ref.current?.style.setProperty("--glow", "0");
  };

  // the intrinsic tag is chosen at runtime; every allowed tag takes these props
  const Tag = as as unknown as ComponentType<
    HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement> & { href?: string; target?: string; rel?: string }
  >;
  return (
    <Tag
      ref={ref}
      className={cn("panel", className)}
      onPointerMove={move}
      onPointerEnter={enter}
      onPointerLeave={leave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
