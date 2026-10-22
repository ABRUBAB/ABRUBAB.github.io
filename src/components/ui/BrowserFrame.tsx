"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Lock } from "./Icons";

/**
 * A browser window that plays a short recording of the real, live site.
 * The video only loads once it nears the viewport, and plays only while it is
 * on screen and not covered by the next stacked card — so at most one decodes
 * at a time. Reduced-motion and data-saver users get the poster frame.
 */
export default function BrowserFrame({
  host,
  href,
  video,
  poster,
  accent,
  title,
  paused = false,
}: {
  host: string;
  href: string;
  video: string;
  poster: string;
  accent: string;
  title: string;
  paused?: boolean;
}) {
  const wrapRef = useRef<HTMLAnchorElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const near = useInView(wrapRef, { margin: "300px 0px", once: true });
  const visible = useInView(wrapRef, { margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();
  const saveData = useSyncExternalStore(
    () => () => {},
    () => Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData),
    () => false,
  );

  // H.264 MP4 where the browser can decode it, otherwise the VP9 WebM.
  const mp4 = useSyncExternalStore(
    () => () => {},
    () => document.createElement("video").canPlayType('video/mp4; codecs="avc1.42E01E"') !== "",
    () => true,
  );
  const src = mp4 ? video : video.replace(/\.mp4$/, ".webm");

  const canPlay = !reduce && !saveData;

  useEffect(() => {
    const v = vidRef.current;
    if (!v || !canPlay || !near) return;
    if (visible && !paused) v.play().catch(() => {});
    else v.pause();
  }, [visible, paused, near, canPlay]);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[48px] opacity-45"
        style={{ background: `radial-gradient(60% 60% at 55% 50%, ${accent}66, transparent 72%)` }}
      />
      <a
        ref={wrapRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${title} live site`}
        className="group relative block overflow-hidden rounded-[20px] border border-white/[0.11] bg-ink shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)] transition-transform duration-500 ease-out-quint hover:-translate-y-1"
      >
        <div className="flex h-9 items-center gap-3 border-b border-white/[0.07] bg-white/[0.045] px-3.5">
          <span className="flex gap-1.5" aria-hidden>
            <i className="size-2.5 rounded-full bg-white/[0.14]" />
            <i className="size-2.5 rounded-full bg-white/[0.14]" />
            <i className="size-2.5 rounded-full bg-white/[0.14]" />
          </span>
          <span className="mx-auto flex h-[22px] max-w-[70%] items-center gap-1.5 truncate rounded-full bg-black/35 px-3 font-mono text-[10.5px] tracking-wide text-ash-400">
            <Lock width={10} height={10} className="shrink-0 text-cobalt-400" />
            <span className="truncate">{host}</span>
          </span>
          <span className="w-[42px]" aria-hidden />
        </div>

        <div className="relative aspect-[16/10] bg-ink">
          <video
            ref={vidRef}
            className="absolute inset-0 size-full object-cover object-top"
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            aria-hidden
            // the source is attached only when the card is near the viewport
            src={canPlay && near ? src : undefined}
          />
          {/* hover affordance */}
          <span className="pointer-events-none absolute bottom-4 right-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-ash-50 px-3.5 py-2 text-[12px] font-medium text-ink opacity-0 shadow-lg transition-all duration-300 ease-out-quint group-hover:translate-y-0 group-hover:opacity-100">
            Open live ↗
          </span>
        </div>
      </a>
    </div>
  );
}
