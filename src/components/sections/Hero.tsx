"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { profile, socials } from "@/content/data";
import { EASE_OUT, scrollToId } from "@/lib/scroll";
import { useLoaded } from "@/components/providers/LoadedContext";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import SplitWords from "@/components/ui/SplitWords";
import { ArrowDown, Download, socialIcon } from "@/components/ui/Icons";

/** Ultramarine disc: bright upper-left, deep lower-right, a breath of ember at the foot. */
const DISC =
  "radial-gradient(60% 60% at 86% 96%, rgb(255 90 31 / 0.4), transparent 70%), radial-gradient(120% 120% at 28% 18%, #9db6ff 0%, #3d63ff 38%, #1b35bd 72%, #0c1a66 100%)";

/**
 * Everything here animates transform/opacity only (no filters, no masks, no
 * per-frame JS) and waits for the loading screen, so it plays in view and stays
 * smooth: a staggered rise for the copy, a disc that climbs like a sun with the
 * portrait sliding up in front of it, a slow orbiting dot, a gentle float, and
 * a light pointer parallax. On scroll the name splits apart as the copy lifts.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const loaded = useLoaded();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  });

  // pointer parallax (updated on pointer events only — no animation loop)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 70, damping: 18, mass: 0.6 });
  const stageX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const stageY = useTransform(sy, [-0.5, 0.5], [6, -6]);

  // scroll scrub
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const line1X = useTransform(p, [0, 1], [0, -150]);
  const line2X = useTransform(p, [0, 1], [0, 110]);
  const copyY = useTransform(p, [0, 1], [0, -60]);
  const copyOpacity = useTransform(p, [0, 0.55], [1, 0]);
  const stageLift = useTransform(p, [0, 1], [0, -90]);
  const railOpacity = useTransform(p, [0, 0.2], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative flex min-h-[100svh] items-center overflow-x-clip pb-20 pt-32 lg:pb-24 lg:pt-28"
    >
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1.24fr_1fr] lg:gap-6">
        {/* ── copy ── */}
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10">
          <motion.p {...rise(0.05)} className="flex items-center gap-2.5 font-mono text-[12px] tracking-wide text-ash-300">
            <span className="relative grid size-2 place-items-center">
              <span className="ping-soft absolute inset-0 rounded-full bg-ember-500" />
              <span className="size-1.5 rounded-full bg-ember-500" />
            </span>
            {profile.seeking}
          </motion.p>

          <h1 className="display mt-7 text-[clamp(4.4rem,19vw,5.8rem)] text-ash-50 sm:text-[clamp(4.1rem,12.4vw,11.4rem)]">
            <motion.span style={{ x: line1X }} className="block">
              <SplitWords text="Abdullah" delay={0.1} play={loaded} />
            </motion.span>
            <motion.span style={{ x: line2X }} className="block">
              <SplitWords
                text="Rubab."
                delay={0.26}
                play={loaded}
                wordClassName={() => "serif-italic text-ice pr-[0.08em] text-[1.06em]"}
              />
            </motion.span>
          </h1>

          <motion.p {...rise(0.55)} className="mt-9 max-w-[30rem] text-[clamp(1.05rem,1.5vw,1.3rem)] leading-snug text-ash-300">
            <span className="text-ash-50">{profile.role}.</span> {profile.tagline}
          </motion.p>

          <motion.div {...rise(0.68)} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button onClick={() => scrollToId("work")} trailing={<ArrowDown width={17} height={17} />}>
                Selected work
              </Button>
            </Magnetic>
            <Magnetic>
              <Button variant="outline" href={profile.cv} download leading={<Download width={16} height={16} />}>
                CV
              </Button>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* ── portrait stage ── */}
        <motion.div
          style={{ y: stageLift }}
          className="relative mx-auto w-[var(--w)] [--w:min(80vw,500px)] lg:ml-auto lg:mr-4"
        >
          <motion.div style={{ x: stageX, y: stageY }}>
            <div className="relative [animation:float-y_8s_ease-in-out_infinite]" style={{ height: "calc(var(--w) * 1.08)" }}>
              {/* orbit: a hairline ring with an ember dot circling it */}
              <motion.div
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ duration: 1.2, delay: 0.9 }}
                className="absolute"
                style={{
                  width: "calc(var(--w) * 1.06)",
                  height: "calc(var(--w) * 1.06)",
                  left: "calc(var(--w) * -0.03)",
                  top: "calc(var(--w) * 0.12)",
                }}
              >
                <div className="orbit absolute inset-0 rounded-full border border-white/[0.14]" style={{ ["--orbit" as string]: "26s" }}>
                  <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-500 shadow-[0_0_14px_3px_rgb(255_90_31/0.65)]" />
                  <span className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-cobalt-300" />
                </div>
              </motion.div>

              {/* medallion: the bottom is a clean semicircle; the head breaks out of the top */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ borderBottomLeftRadius: "calc(var(--w) / 2)", borderBottomRightRadius: "calc(var(--w) / 2)" }}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={loaded ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                  transition={{ duration: 1.3, delay: 0.15, ease: EASE_OUT }}
                  className="absolute bottom-0 aspect-square origin-bottom rounded-full"
                  style={{ width: "calc(var(--w) * 0.86)", left: "calc(var(--w) * 0.07)", background: DISC }}
                />
                <motion.div
                  initial={{ y: 56, opacity: 0 }}
                  animate={loaded ? { y: 0, opacity: 1 } : { y: 56, opacity: 0 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: EASE_OUT }}
                  className="absolute inset-x-0 bottom-0"
                >
                  <Image
                    src="/assets/photos/portrait-lit.webp"
                    alt="Portrait of Abdullah Rubab"
                    width={900}
                    height={868}
                    priority
                    sizes="(max-width: 1024px) 80vw, 500px"
                    className="block h-auto w-full"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* bottom rail */}
      <motion.div style={{ opacity: railOpacity }} className="pointer-events-none absolute inset-x-0 bottom-7 hidden lg:block">
        <motion.div {...rise(1.1)} className="wrap flex items-center justify-between">
          <ul className="pointer-events-auto flex gap-2">
            {socials.slice(0, 3).map((s) => {
              const Icon = socialIcon[s.id];
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-full border border-white/[0.14] text-ash-300 transition-colors hover:border-white/35 hover:text-white"
                  >
                    <Icon width={16} height={16} />
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-3 text-ash-400">
            <span className="label">Scroll</span>
            <span className="relative h-9 w-px overflow-hidden bg-white/10">
              <span className="absolute inset-x-0 top-0 h-3 animate-[scroll-cue_1.8s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-cobalt-300 to-transparent" />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
