"use client";

import { motion } from "motion/react";
import { languages, schools, type Language, type School } from "@/content/data";
import { EASE_OUT } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import LogoTile from "@/components/ui/LogoTile";
import Reveal from "@/components/ui/Reveal";
import Ring from "@/components/ui/Ring";
import SectionHead from "@/components/ui/SectionHead";
import Sheet from "@/components/ui/Sheet";

function SchoolCard({ s }: { s: School }) {
  const big = Boolean(s.current);
  return (
    <div
      className={cn(
        "grid items-center gap-x-6 gap-y-5 rounded-3xl border border-ink/10 bg-ash-50 p-5 sm:grid-cols-[1fr_auto] sm:p-6",
        big && "sm:p-7",
      )}
    >
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-[12px] tracking-wide text-ash-500">{s.period}</span>
            {s.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 font-mono text-[10.5px] tracking-wide text-ash-50">
                <span className="relative grid size-1.5 place-items-center">
                  <span className="ping-soft absolute inset-0 rounded-full bg-ember-500" />
                  <span className="size-1 rounded-full bg-ember-500" />
                </span>
                Final year
              </span>
            )}
          </div>
          {/* phones: a small ring in the top corner so the title keeps the full width */}
          <span className="sm:hidden">
            <Ring value={s.grade} max={s.scale} size={72} label={s.gradeLabel} />
          </span>
        </div>
        <div className="mt-3 flex items-start gap-4">
          {big && (
            <span className="hidden sm:block">
              <LogoTile src="/assets/logos/diu_logo.svg" alt="Daffodil International University logo" size={52} />
            </span>
          )}
          <div className="min-w-0">
            <h3
              className={cn(
                "font-medium leading-[1.12] tracking-[-0.025em] text-ink",
                big ? "text-[clamp(1.5rem,2.6vw,2.15rem)]" : "text-[clamp(1.2rem,1.9vw,1.5rem)]",
              )}
            >
              {s.level}
            </h3>
            <p className="mt-1.5 text-[15px] text-ash-700">{s.org}</p>
            <p className="font-mono text-[11.5px] tracking-wide text-ash-500">{s.place}</p>
          </div>
        </div>
        <p className="mt-4 inline-flex rounded-full border border-ink/12 bg-white/60 px-3 py-1 font-mono text-[11px] tracking-wide text-ash-700">
          {s.note}
        </p>
      </div>
      <span className="hidden sm:block">
        <Ring value={s.grade} max={s.scale} size={big ? 128 : 96} label={s.gradeLabel} />
      </span>
    </div>
  );
}

/** A CEFR meter: six steps (A1 … C2); native speakers fill the whole bar in ember. */
function LanguageRow({ l, index }: { l: Language; index: number }) {
  const native = l.level === "Native";
  return (
    <li className="py-5 first:pt-2 last:pb-1">
      <div className="flex items-baseline justify-between gap-4">
        <p className="flex items-baseline gap-3">
          <span className="text-[clamp(1.35rem,2.2vw,1.7rem)] font-medium tracking-[-0.02em] text-ash-50">{l.name}</span>
          <span lang={l.lang} className="serif-italic text-[1.15rem] text-ash-400">
            {l.script}
          </span>
        </p>
        <span className={cn("font-mono text-[13px] tracking-wide", native ? "text-ember-400" : "text-cobalt-200")}>{l.level}</span>
      </div>
      <motion.div
        className="mt-3 grid grid-cols-6 gap-1.5"
        aria-hidden
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ delayChildren: 0.2 + index * 0.12, staggerChildren: 0.07 }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.1]">
            {i < l.step && (
              <motion.span
                className={cn(
                  "absolute inset-0 origin-left rounded-full",
                  native ? "bg-ember-500" : "bg-gradient-to-r from-cobalt-400 to-cobalt-300",
                )}
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7, ease: EASE_OUT } } }}
              />
            )}
          </span>
        ))}
      </motion.div>
      <p className="mt-2.5 text-[13px] text-ash-500">{l.caption}</p>
    </li>
  );
}

function Languages() {
  return (
    <div className="relative h-full overflow-hidden rounded-3xl bg-ink p-6 text-ash-50 sm:p-8">
      <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(61_99_255/0.45),transparent)]" />
      <span aria-hidden className="pointer-events-none absolute -bottom-32 -left-20 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(255_90_31/0.16),transparent)]" />
      <div className="relative">
        <p className="label !text-ash-300">Language skills</p>
        {/* the scale, aligned with the six steps of every bar below */}
        <div className="mt-6 grid grid-cols-6 gap-1.5 font-mono text-[9.5px] tracking-wider text-ash-500" aria-hidden>
          {["A1", "A2", "B1", "B2", "C1", "C2"].map((c) => (
            <span key={c} className="text-center">
              {c}
            </span>
          ))}
        </div>
        <ul className="mt-2 divide-y divide-white/[0.08]">
          {languages.map((l, i) => (
            <LanguageRow key={l.id} l={l} index={i} />
          ))}
        </ul>
        <p className="mt-5 border-t border-white/[0.08] pt-4 font-mono text-[10.5px] leading-relaxed tracking-wide text-ash-500">
          CEFR scale, self-assessed: the same level for listening, reading, writing and speaking.
        </p>
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="relative py-3 sm:py-5">
      <Sheet className="bg-paper text-ink">
        <div aria-hidden className="bg-paper-grid pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute -left-40 top-10 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(111_144_255/0.3),transparent)]" />

        <div className="section wrap">
          <SectionHead tone="light" label="Education" index="05" lead="My" accent="education." accentClass="text-cobalt-600" />

          <div className="mt-12 grid items-start gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
            <ol className="relative space-y-5 pl-7 sm:pl-9 lg:col-span-7">
              {/* the line draws itself down the list */}
              <motion.span
                aria-hidden
                className="absolute bottom-6 left-[6px] top-6 w-px origin-top bg-ink/25"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 1.6, ease: EASE_OUT }}
              />
              {schools.map((s, i) => (
                <li key={s.id} className="relative">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-7 top-9 size-3.5 rounded-full border-[3px] border-paper sm:-left-9",
                      s.current ? "bg-cobalt-600" : "bg-ink",
                    )}
                  />
                  <Reveal delay={i * 0.08}>
                    <SchoolCard s={s} />
                  </Reveal>
                </li>
              ))}
            </ol>

            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <Reveal delay={0.1}>
                <Languages />
              </Reveal>
            </div>
          </div>
        </div>
      </Sheet>
    </section>
  );
}
