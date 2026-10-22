"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { profile, socials } from "@/content/data";
import { EASE_OUT, scrollToId } from "@/lib/scroll";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import SplitWords from "@/components/ui/SplitWords";
import { ArrowDown, Download, socialIcon } from "@/components/ui/Icons";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.1, delay, ease: EASE_OUT },
});

const ARCH = "round 999px 999px 40px 40px";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // pointer parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 16, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 16, mass: 0.6 });
  const portraitX = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const portraitY = useTransform(sy, [-0.5, 0.5], [8, -8]);

  // scroll scrub: the name splits apart, the copy lifts away, the portrait rises
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const line1X = useTransform(p, [0, 1], [0, -170]);
  const line2X = useTransform(p, [0, 1], [0, 130]);
  const copyY = useTransform(p, [0, 1], [0, -70]);
  const copyOpacity = useTransform(p, [0, 0.6], [1, 0]);
  const portraitLift = useTransform(p, [0, 1], [0, -110]);
  const portraitScale = useTransform(p, [0, 1], [1, 1.1]);
  const railOpacity = useTransform(p, [0, 0.25], [1, 0]);

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
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1.28fr_1fr] lg:gap-6">
        {/* ── copy ── */}
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10">
          <motion.p {...fade(0.15)} className="flex items-center gap-2.5 font-mono text-[12px] tracking-wide text-ash-300">
            <span className="relative grid size-2 place-items-center">
              <span className="ping-soft absolute inset-0 rounded-full bg-ember-500" />
              <span className="size-1.5 rounded-full bg-ember-500" />
            </span>
            {profile.seeking}
          </motion.p>

          <h1 className="display mt-7 text-[clamp(4.4rem,19vw,5.8rem)] text-ash-50 sm:text-[clamp(4.1rem,12.4vw,11.4rem)]">
            <motion.span style={{ x: line1X }} className="block">
              <SplitWords text="Abdullah" delay={0.25} />
            </motion.span>
            <motion.span style={{ x: line2X }} className="block">
              <SplitWords
                text="Rubab."
                delay={0.42}
                wordClassName={() => "serif-italic text-ice pr-[0.08em] text-[1.06em]"}
              />
            </motion.span>
          </h1>

          <motion.p {...fade(0.85)} className="mt-9 max-w-[30rem] text-[clamp(1.05rem,1.5vw,1.3rem)] leading-snug text-ash-300">
            <span className="text-ash-50">{profile.role}.</span> {profile.tagline}
          </motion.p>

          <motion.div {...fade(1)} className="mt-10 flex flex-wrap items-center gap-3">
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

        {/* ── portrait ── */}
        <motion.div
          style={{ y: portraitLift, scale: portraitScale }}
          className="relative mx-auto w-[min(78vw,430px)] lg:ml-auto lg:mr-6"
        >
          <motion.div style={{ x: portraitX, y: portraitY }}>
            <div className="relative aspect-[4/5] [animation:float-y_9s_ease-in-out_infinite]">
              {/* light pooled behind the arch + a ground shadow (outside the clip) */}
              <motion.div
                aria-hidden
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 0.6, ease: EASE_OUT }}
                className="absolute -inset-12 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(61_99_255/0.32),transparent)] blur-2xl"
              />
              <div
                aria-hidden
                className="absolute inset-x-8 -bottom-4 -z-10 h-10 rounded-[50%] bg-black/70 blur-2xl"
              />

              {/* the arch opens upward; the photo settles from a zoom inside it */}
              <motion.div
                initial={{ clipPath: `inset(100% 0% 0% 0% ${ARCH})` }}
                animate={{ clipPath: `inset(0% 0% 0% 0% ${ARCH})` }}
                transition={{ duration: 1.7, delay: 0.5, ease: EASE_OUT }}
                className="absolute inset-0 overflow-hidden rounded-[999px_999px_40px_40px] border border-white/[0.12] bg-[linear-gradient(168deg,#4a4a4e_0%,#2b2b2e_42%,#131315_100%)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(85%_52%_at_68%_4%,rgb(158_182_255/0.4),transparent_62%)]" />
                <motion.div
                  initial={{ scale: 1.32, y: 40 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ duration: 2.4, delay: 0.5, ease: EASE_OUT }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src="/assets/photos/portrait-cutout.webp"
                    alt="Portrait of Abdullah Rubab"
                    width={900}
                    height={868}
                    priority
                    sizes="(max-width: 1024px) 78vw, 430px"
                    className="absolute inset-x-[-5%] bottom-0 h-[90%] w-[110%] max-w-none object-cover object-top [filter:grayscale(0.9)_contrast(1.1)_brightness(1.03)] [mask-image:linear-gradient(to_bottom,#000_74%,transparent_100%)]"
                  />
                </motion.div>
                {/* cobalt grade so the photo sits in the water palette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cobalt-900/75 via-transparent to-cobalt-300/15 mix-blend-soft-light" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* bottom rail */}
      <motion.div style={{ opacity: railOpacity }} className="pointer-events-none absolute inset-x-0 bottom-7 hidden lg:block">
        <motion.div {...fade(1.5)} className="wrap flex items-center justify-between">
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
              <motion.span
                className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-transparent via-cobalt-300 to-transparent"
                animate={{ y: [-12, 40] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
