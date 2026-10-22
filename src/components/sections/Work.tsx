"use client";

import { createRef, useMemo, useState, type RefObject } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { moreBuilds, projects, type MoreBuild, type Project } from "@/content/data";
import { EASE_OUT } from "@/lib/scroll";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import Glyph from "@/components/ui/Glyph";
import Panel from "@/components/ui/Panel";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { ArrowUpRight, GitHub, Trophy } from "@/components/ui/Icons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT } },
};

/** Each card takes the colour of the product it shows. */
function ProjectCard({ p, index, covered }: { p: Project; index: number; covered: boolean }) {
  const isAward = /place/i.test(p.badge ?? "");
  const n = String(index + 1).padStart(2, "0");
  return (
    <Panel
      as="article"
      aria-label={p.title}
      spotlight={false}
      className="grid gap-5 overflow-hidden rounded-[32px] p-4 sm:p-5 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-8 lg:p-6"
      style={{
        background: `radial-gradient(90% 80% at 100% 0%, color-mix(in oklab, ${p.accent} 28%, transparent), transparent 64%), color-mix(in oklab, ${p.accent} 10%, #0b0b0d)`,
        borderColor: `color-mix(in oklab, ${p.accent} 26%, transparent)`,
      }}
    >
      {/* a pool of the product's colour — a plain gradient, no filters */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-44 -left-36 size-[560px] rounded-full opacity-40"
        style={{ background: `radial-gradient(closest-side, ${p.accent}, transparent)` }}
      />

      {/* copy */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        className="relative order-2 flex flex-col justify-between gap-8 px-2 pb-2 lg:order-1 lg:px-4 lg:py-3"
      >
        {/* big outlined index — fills the middle of the card */}
        <span
          aria-hidden
          className="outline-text pointer-events-none absolute -left-2 top-[40%] hidden select-none text-[clamp(8rem,12.5vw,11.5rem)] font-medium leading-none tracking-[-0.06em] lg:block"
          style={{ ["--outline" as string]: `color-mix(in oklab, ${p.accent} 38%, transparent)` }}
        >
          {n}
        </span>

        <div className="relative">
          <motion.div variants={item} className="flex flex-wrap items-center justify-between gap-3">
            <span className="label">
              {n} <span className="text-ash-600">/ {String(projects.length).padStart(2, "0")}</span>
            </span>
            {p.badge && (
              <Chip tone={isAward ? "ember" : "default"} className={isAward ? undefined : "border-white/20 text-ash-100"}>
                {isAward && <Trophy width={12} height={12} />}
                {p.badge}
              </Chip>
            )}
          </motion.div>
          <motion.h3 variants={item} className="display mt-6 text-[clamp(2.5rem,5vw,4.4rem)] text-ash-50">
            {p.title}
          </motion.h3>
          <motion.p variants={item} className="mt-4 max-w-[22rem] text-[17px] leading-snug text-ash-200/90">
            {p.blurb}
          </motion.p>
        </div>

        <div className="relative">
          <motion.ul variants={item} className="flex flex-wrap gap-1.5" aria-label="Built with">
            {p.tags.map((t) => (
              <li key={t}>
                <Chip className="border-white/15 bg-black/25 text-ash-100">{t}</Chip>
              </li>
            ))}
          </motion.ul>
          {p.role && (
            <motion.p variants={item} className="label mt-5 !text-ash-300">
              {p.role}
            </motion.p>
          )}
          <motion.div variants={item} className="mt-6 flex flex-wrap gap-2.5">
            <Button href={p.live} external trailing={<ArrowUpRight width={17} height={17} />}>
              Live site
            </Button>
            <Button href={p.code} external variant="outline" leading={<GitHub width={16} height={16} />}>
              Code
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* live recording */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1.1, delay: 0.1, ease: EASE_OUT }}
        className="order-1 lg:order-2 lg:flex lg:items-center"
      >
        <div className="w-full">
          <BrowserFrame
            host={p.host}
            href={p.live}
            video={p.video}
            poster={p.poster}
            accent={p.accent}
            title={p.title}
            paused={covered}
          />
        </div>
      </motion.div>
    </Panel>
  );
}

const STICKY_TOP = 92; // px below the viewport top (clears the nav pill)
const STEP = 14; // px each stacked card peeks above the next

/**
 * Cards share one parent and are individually `sticky`, so each new card slides
 * over the previous one. The card underneath darkens (an opacity overlay — no
 * scaling, no filters) and its video pauses once the next card has covered it.
 */
function StackItem({
  p,
  index,
  refs,
}: {
  p: Project;
  index: number;
  refs: RefObject<HTMLDivElement | null>[];
}) {
  const next = refs[index + 1];
  const last = !next;
  const [covered, setCovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: next ?? refs[index],
    offset: ["start end", `start ${STICKY_TOP + (index + 1) * STEP}px`],
  });
  const shade = useTransform(scrollYProgress, [0, 1], [0, last ? 0 : 0.62]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setCovered(!last && v > 0.55));

  return (
    <div ref={refs[index]} className="lg:sticky lg:mb-[15vh] lg:last:mb-0" style={{ top: STICKY_TOP + index * STEP }}>
      <div className="relative">
        <ProjectCard p={p} index={index} covered={covered} />
        <motion.div
          aria-hidden
          style={{ opacity: shade }}
          className="pointer-events-none absolute inset-0 z-10 rounded-[32px] bg-ink"
        />
      </div>
    </div>
  );
}

function BuildTile({ b }: { b: MoreBuild }) {
  const glyph = { brain: "mri", agents: "graph", xray: "xray", memory: "vit" } as const;
  return (
    <Panel
      as="a"
      href={b.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${b.title} on GitHub`}
      className="group flex h-full flex-col justify-between gap-8 rounded-3xl p-5 transition-transform duration-500 ease-out-quint hover:-translate-y-1"
    >
      <div className="flex items-start justify-between">
        <Glyph kind={glyph[b.kind]} className="h-14 w-[84px] text-cobalt-300" />
        <ArrowUpRight
          width={18}
          height={18}
          className="text-ash-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
        />
      </div>
      <div>
        <h4 className="text-[17px] font-medium tracking-tight text-ash-50">{b.title}</h4>
        <p className="mt-1 font-mono text-[11.5px] tracking-wide text-ash-400">{b.line}</p>
      </div>
    </Panel>
  );
}

export default function Work() {
  const refs = useMemo(() => projects.map(() => createRef<HTMLDivElement>()), []);
  return (
    <section id="work" className="section">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-x-0 top-0 h-[75%]" />
      <div className="wrap relative">
        <SectionHead
          label="Selected work"
          lead="Things that"
          accent="run."
          accentClass="text-ember-500"
          aside={
            <p className="flex items-center gap-2.5 pb-2 text-[15px] text-ash-400">
              <span className="relative grid size-2 place-items-center">
                <span className="ping-soft absolute inset-0 rounded-full bg-ember-500" />
                <span className="size-1.5 rounded-full bg-ember-500" />
              </span>
              {projects.length} live products — open any of them.
            </p>
          }
        />

        <div className="mt-12 flex flex-col gap-8 lg:mt-16 lg:block">
          {projects.map((p, i) => (
            <StackItem key={p.id} p={p} index={i} refs={refs} />
          ))}
        </div>

        <div className="mt-16 lg:mt-24">
          <Reveal>
            <p className="label mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-ash-500 to-transparent" />
              More builds · code only
            </p>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {moreBuilds.map((b, i) => (
              <li key={b.id}>
                <Reveal delay={i * 0.07}>
                  <BuildTile b={b} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
