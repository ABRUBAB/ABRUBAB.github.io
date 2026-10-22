"use client";

import { useId, type CSSProperties } from "react";
import type { GlyphKind } from "@/content/data";

/**
 * Small abstract motifs for each piece of research — drawn, not photographed,
 * so they stay light and on-palette. 120×80 box; colour comes from the parent
 * (`text-*`) with ember as the single accent.
 */

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export default function Glyph({
  kind,
  className,
  style,
}: {
  kind: GlyphKind;
  className?: string;
  style?: CSSProperties;
}) {
  const id = useId().replace(/:/g, "");
  const glow = `g${id}`;
  const heat = `h${id}`;

  return (
    <svg viewBox="0 0 120 80" className={className} style={style} fill="none" aria-hidden role="presentation">
      <defs>
        <radialGradient id={heat}>
          <stop offset="0" stopColor="#ff8a4c" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#ff5a1f" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ff5a1f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={glow}>
          <stop offset="0" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      {kind === "vit" && (
        <g>
          {Array.from({ length: 24 }).map((_, i) => {
            const c = i % 6;
            const r = Math.floor(i / 6);
            const hot = i === 8 || i === 15 || i === 16;
            return (
              <rect
                key={i}
                x={9 + c * 17}
                y={6 + r * 17}
                width="13"
                height="13"
                rx="3"
                fill={hot ? "url(#" + heat + ")" : "currentColor"}
                fillOpacity={hot ? 1 : 0.1 + hash(i) * 0.3}
                stroke="currentColor"
                strokeOpacity={hot ? 0.9 : 0.25}
                strokeWidth="0.8"
              />
            );
          })}
        </g>
      )}

      {kind === "mri" && (
        <g stroke="currentColor" strokeWidth="1">
          <ellipse cx="60" cy="40" rx="35" ry="31" strokeOpacity="0.55" />
          <ellipse cx="60" cy="40" rx="26" ry="22" strokeOpacity="0.3" />
          <path d="M60 10v60" strokeOpacity="0.18" />
          <path d="M34 36c8-6 14 2 26-2s18 4 26-2M36 48c8 4 14-2 24 2s16-4 24 0" strokeOpacity="0.35" />
          <circle cx="74" cy="32" r="14" fill={`url(#${heat})`} stroke="none" />
          <circle cx="74" cy="32" r="3" fill="#ffb27a" stroke="none" />
        </g>
      )}

      {kind === "cells" && (
        <g stroke="currentColor" strokeWidth="1">
          {[
            [18, 20, 11], [44, 14, 8], [70, 24, 12], [98, 16, 9], [30, 52, 12], [60, 58, 9],
            [86, 50, 13], [108, 64, 7], [12, 70, 7], [52, 36, 6],
          ].map(([x, y, r], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={r} fill="currentColor" fillOpacity={0.07 + hash(i) * 0.12} strokeOpacity="0.5" />
              <circle cx={x} cy={y} r={r * 0.45} strokeOpacity="0.28" />
            </g>
          ))}
          <circle cx="70" cy="24" r="16" fill={`url(#${heat})`} stroke="none" />
          <circle cx="86" cy="50" r="5" fill="#ff8a4c" fillOpacity="0.85" stroke="none" />
        </g>
      )}

      {kind === "xray" && (
        <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.55">
          <path d="M52 12c-14 2-26 14-28 34-1 12 4 20 12 22 8 2 14-4 16-14 2-14 2-28 0-42Z" fill="currentColor" fillOpacity="0.08" />
          <path d="M68 12c14 2 26 14 28 34 1 12-4 20-12 22-8 2-14-4-16-14-2-14-2-28 0-42Z" fill="currentColor" fillOpacity="0.08" />
          <path d="M60 8v66" strokeOpacity="0.3" />
          <path d="M30 28c8 3 16 3 24 0M30 40c8 3 16 3 24 0M66 28c8 3 16 3 24 0M66 40c8 3 16 3 24 0" strokeOpacity="0.28" />
          <circle cx="82" cy="46" r="11" fill={`url(#${heat})`} stroke="none" />
          {[[34, 54], [42, 60], [78, 58], [88, 54]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.8" fill="currentColor" stroke="none" fillOpacity="0.8" />
          ))}
        </g>
      )}

      {kind === "liver" && (
        <g stroke="currentColor" strokeWidth="1">
          <path d="M14 38c10-18 38-26 66-18 16 4 28 14 26 26-2 12-18 18-38 16-20-1-34-4-44-12-6-4-14-6-10-12Z" strokeOpacity="0.55" fill="currentColor" fillOpacity="0.07" />
          <path d="M24 38c10-12 32-18 54-12 12 4 20 10 18 18-2 8-14 12-30 11-16-1-28-3-36-9-4-3-10-4-6-8Z" strokeOpacity="0.3" />
          <path d="M34 40c8-6 24-9 40-5 8 2 12 6 10 10-2 4-10 6-22 5-12-1-20-2-26-6" strokeOpacity="0.2" />
          <circle cx="70" cy="40" r="13" fill={`url(#${heat})`} stroke="none" />
          <circle cx="70" cy="40" r="3.4" fill="#ffb27a" stroke="none" />
        </g>
      )}

      {kind === "gut" && (
        <g stroke="currentColor" strokeWidth="1">
          <circle cx="60" cy="40" r="34" strokeOpacity="0.4" />
          <circle cx="60" cy="40" r="25" strokeOpacity="0.3" />
          <circle cx="62" cy="40" r="16" strokeOpacity="0.45" fill="currentColor" fillOpacity="0.07" />
          <circle cx="64" cy="40" r="7" strokeOpacity="0.6" />
          <path d="M22 26c-5 10-5 22 0 32M98 26c5 10 5 22 0 32" strokeOpacity="0.2" />
          <path d="M34 20a34 34 0 0 1 52 0" stroke="#ff8a4c" strokeWidth="2.2" strokeOpacity="0.9" strokeLinecap="round" />
          <circle cx="86" cy="22" r="9" fill={`url(#${heat})`} stroke="none" />
        </g>
      )}

      {kind === "graph" && (
        <g stroke="currentColor" strokeWidth="1">
          <circle cx="60" cy="40" r="22" fill={`url(#${glow})`} stroke="none" />
          {[[22, 18], [30, 62], [60, 10], [96, 20], [100, 58], [62, 70]].map(([x, y], i) => (
            <g key={i}>
              <path d={`M60 40L${x} ${y}`} strokeOpacity="0.28" strokeDasharray={i % 2 ? "2 3" : undefined} />
              <circle cx={x} cy={y} r={4 + hash(i + 3) * 3} fill="currentColor" fillOpacity="0.14" strokeOpacity="0.6" />
            </g>
          ))}
          <circle cx="60" cy="40" r="7" fill="#ff8a4c" fillOpacity="0.95" stroke="none" />
          <circle cx="60" cy="40" r="12" stroke="#ff8a4c" strokeOpacity="0.45" />
        </g>
      )}

      {kind === "bags" && (
        <g stroke="currentColor" strokeWidth="1">
          {[
            { x: 8, y: 10, w: 32, h: 26 },
            { x: 62, y: 6, w: 34, h: 30 },
            { x: 26, y: 46, w: 38, h: 26 },
            { x: 78, y: 48, w: 30, h: 24 },
          ].map((b, i) => (
            <g key={i}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="7" strokeOpacity="0.4" strokeDasharray="3 3" />
              {Array.from({ length: 5 }).map((_, k) => (
                <circle
                  key={k}
                  cx={b.x + 6 + hash(i * 7 + k) * (b.w - 12)}
                  cy={b.y + 6 + hash(i * 11 + k + 2) * (b.h - 12)}
                  r={1.5 + hash(i * 5 + k + 9) * 2.2}
                  fill="currentColor"
                  fillOpacity={0.5}
                  stroke="none"
                />
              ))}
            </g>
          ))}
          <circle cx="82" cy="20" r="11" fill={`url(#${heat})`} stroke="none" />
          <circle cx="82" cy="20" r="3.2" fill="#ffb27a" stroke="none" />
        </g>
      )}
    </svg>
  );
}
