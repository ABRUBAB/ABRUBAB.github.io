"use client";

import { motion } from "motion/react";
import { beyond, toolbox, type BeyondItem, type BeyondKind } from "@/content/data";
import { EASE_OUT } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import Chip from "@/components/ui/Chip";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";

const kindLabel: Record<BeyondKind, string> = {
  contest: "Contest club",
  olympiad: "Olympiad",
  expo: "Expo",
  conference: "Conference",
  school: "School",
  community: "Community",
  kaggle: "Kaggle",
};

// bento spans for the toolbox on the 12-column grid (lg+)
const toolSpan = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-4", "lg:col-span-3"];

const rule = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: EASE_OUT } },
};
const body = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.08, ease: EASE_OUT } },
};

function LedgerRow({ item, last }: { item: BeyondItem; last: boolean }) {
  return (
    <motion.li
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      className="group relative"
    >
      <motion.span aria-hidden variants={rule} className="absolute inset-x-0 top-0 h-px origin-left bg-white/[0.14]" />
      {last && <motion.span aria-hidden variants={rule} className="absolute inset-x-0 bottom-0 h-px origin-left bg-white/[0.14]" />}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <motion.div
        variants={body}
        className="relative grid items-baseline gap-x-8 gap-y-2 py-6 md:grid-cols-[120px_minmax(0,1fr)_auto]"
      >
        <span className="font-mono text-[12px] tracking-wide text-ash-400">{item.when}</span>
        <div className="min-w-0 transition-transform duration-500 ease-out-quint group-hover:translate-x-1.5">
          <h3 className="text-[clamp(1.2rem,2vw,1.55rem)] font-medium leading-tight tracking-[-0.02em] text-ash-50">{item.title}</h3>
          <p className="mt-1.5 text-[14.5px] text-ash-300">{item.org}</p>
          {item.note && <p className="mt-1 text-[13.5px] leading-snug text-ash-500">{item.note}</p>}
        </div>
        <Chip className="justify-self-start md:justify-self-end">{kindLabel[item.kind]}</Chip>
      </motion.div>
    </motion.li>
  );
}

export default function Beyond() {
  return (
    <section id="beyond" className="relative py-3 sm:py-5">
      <motion.div
        initial={{ opacity: 0, y: 56 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 1, ease: EASE_OUT }}
        className="sheet bg-ash-900 text-ash-50"
      >
        <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(255_90_31/0.16),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-52 -right-40 size-[620px] rounded-full bg-[radial-gradient(closest-side,rgb(61_99_255/0.22),transparent)]" />

        <div className="section wrap">
          <SectionHead label="Extracurricular" lead="Beyond the" accent="lab." accentClass="text-ember-400" />

          <ul className="mt-12 lg:mt-14">
            {beyond.map((b, i) => (
              <LedgerRow key={b.id} item={b} last={i === beyond.length - 1} />
            ))}
          </ul>

          <div className="mt-20 lg:mt-28">
            <Reveal>
              <p className="label flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-ember-500 to-transparent" />
                Toolbox
              </p>
            </Reveal>
            <ul className="mt-6 grid gap-4 lg:grid-cols-12">
              {toolbox.map((g, i) => (
                <li key={g.group} className={cn("min-w-0", toolSpan[i])}>
                  <Reveal delay={(i % 3) * 0.07} className="h-full">
                    <div className="h-full rounded-3xl border border-white/[0.09] bg-white/[0.025] p-6 transition-colors duration-500 hover:border-white/[0.18]">
                      <h3 className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-ash-300">{g.group}</h3>
                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {g.items.map((t) => (
                          <li key={t}>
                            <Chip>{t}</Chip>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
