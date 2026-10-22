"use client";

import { motion } from "motion/react";
import { skills, strengths } from "@/content/data";
import { EASE_OUT } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import Sheet from "@/components/ui/Sheet";

// spans on the 12-column grid (lg+): 7/5, 4/4/4, then the small group beside the strengths
const span = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.15 } },
};
const chip = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

function SkillPanel({ group, items, index }: { group: string; items: string[]; index: number }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.09] bg-white/[0.025] p-6 transition-colors duration-500 hover:border-white/[0.2] sm:p-7">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-cobalt-400 via-cobalt-300 to-ember-500 transition-transform duration-700 ease-out-quint group-hover:scale-x-100"
      />
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[17px] font-medium tracking-[-0.01em] text-ash-50">{group}</h3>
        <span className="font-mono text-[11px] tracking-wide text-ash-600">
          {String(index + 1).padStart(2, "0")} · {items.length}
        </span>
      </div>
      <motion.ul
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        className="mt-5 flex flex-wrap gap-2"
      >
        {items.map((t) => (
          <motion.li
            key={t}
            variants={chip}
            className="cursor-default rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 text-[13px] leading-none text-ash-200 transition-[transform,background,border-color,color] duration-300 ease-out-quint hover:-translate-y-0.5 hover:border-cobalt-400/70 hover:bg-cobalt-500/[0.16] hover:text-white"
          >
            {t}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default function Skills() {
  const small = skills.slice(5);
  const main = skills.slice(0, 5);
  return (
    <section id="skills" className="relative py-3 sm:py-5">
      <Sheet className="bg-ash-900 text-ash-50">
        <div aria-hidden className="pointer-events-none absolute -right-44 -top-40 size-[620px] rounded-full bg-[radial-gradient(closest-side,rgb(61_99_255/0.22),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-52 -left-40 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(255_90_31/0.12),transparent)]" />

        <div className="section wrap">
          <SectionHead label="Skills" index="06" lead="Technical" accent="skills." accentClass="text-cobalt-300" />

          <ul className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-12">
            {main.map((g, i) => (
              <li key={g.group} className={cn("min-w-0", span[i])}>
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <SkillPanel group={g.group} items={g.items} index={i} />
                </Reveal>
              </li>
            ))}
            {small.map((g, i) => (
              <li key={g.group} className="min-w-0 lg:col-span-4">
                <Reveal className="h-full">
                  <SkillPanel group={g.group} items={g.items} index={main.length + i} />
                </Reveal>
              </li>
            ))}
            <li className="min-w-0 lg:col-span-8">
              <Reveal delay={0.06} className="h-full">
                <div className="relative h-full overflow-hidden rounded-3xl border border-white/[0.09] bg-white/[0.025] p-6 sm:p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[17px] font-medium tracking-[-0.01em] text-ash-50">Personal strengths</h3>
                    <span className="font-mono text-[11px] tracking-wide text-ash-600">07 · {strengths.length}</span>
                  </div>
                  <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {strengths.map((s) => (
                      <li key={s.title} className="flex gap-3">
                        <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-ember-500" />
                        <p className="text-[14.5px] leading-snug text-ash-100">
                          {s.title}
                          <span className="block text-[13px] text-ash-400">{s.line}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          </ul>
        </div>
      </Sheet>
    </section>
  );
}
