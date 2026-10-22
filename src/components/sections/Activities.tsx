"use client";

import { motion } from "motion/react";
import { activities, type ActivityItem, type ActivityKind } from "@/content/data";
import { EASE_OUT } from "@/lib/scroll";
import Chip from "@/components/ui/Chip";
import SectionHead from "@/components/ui/SectionHead";

const kindLabel: Record<ActivityKind, string> = {
  contest: "Contest club",
  olympiad: "Olympiad",
  expo: "Expo",
  conference: "Conference",
  school: "School",
  community: "Community",
  kaggle: "Kaggle",
};

const rule = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: EASE_OUT } },
};
const body = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.08, ease: EASE_OUT } },
};

function LedgerRow({ item, last }: { item: ActivityItem; last: boolean }) {
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

export default function Activities() {
  return (
    <section id="activities" className="section overflow-x-clip">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-[6%] size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(255_90_31/0.14),transparent)]" />
      <div className="wrap relative">
        <SectionHead label="Activities" index="07" lead="Extracurricular" accent="activities." accentClass="text-ember-400" />

        <ul className="mt-12 lg:mt-14">
          {activities.map((a, i) => (
            <LedgerRow key={a.id} item={a} last={i === activities.length - 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}
