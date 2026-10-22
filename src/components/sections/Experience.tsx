"use client";

import { motion } from "motion/react";
import { roles, type Role } from "@/content/data";
import { EASE_OUT } from "@/lib/scroll";
import Chip from "@/components/ui/Chip";
import LogoTile from "@/components/ui/LogoTile";
import SectionHead from "@/components/ui/SectionHead";

const rowLine = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease: EASE_OUT } },
};
const rowBody = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.1, ease: EASE_OUT } },
};

/** One role as a full-width editorial row: period · mark · title/org · tags. */
function RoleRow({ r, last }: { r: Role; last: boolean }) {
  return (
    <motion.li
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      className="group relative"
    >
      <motion.span aria-hidden variants={rowLine} className="absolute inset-x-0 top-0 h-px origin-left bg-white/20" />
      {last && (
        <motion.span aria-hidden variants={rowLine} className="absolute inset-x-0 bottom-0 h-px origin-left bg-white/20" />
      )}
      {/* hover wash */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/[0.06] via-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <motion.div
        variants={rowBody}
        className="relative grid items-center gap-x-8 gap-y-4 py-7 md:grid-cols-[150px_64px_minmax(0,1fr)_auto] md:py-8"
      >
        <span className="flex items-center gap-2.5 font-mono text-[12px] tracking-wide text-ash-300">
          {r.now && (
            <span className="relative grid size-2 place-items-center">
              <span className="ping-soft absolute inset-0 rounded-full bg-ember-500" />
              <span className="size-1.5 rounded-full bg-ember-500" />
            </span>
          )}
          {r.period}
        </span>
        <LogoTile src={r.logo} dark={r.logoBg === "dark"} alt={`${r.org} logo`} size={56} />
        <div className="min-w-0 transition-transform duration-500 ease-out-quint group-hover:translate-x-2">
          <h3 className="text-[clamp(1.45rem,2.8vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ash-50">
            {r.title}
          </h3>
          <p className="mt-2 text-[15px] text-ash-400">{r.org}</p>
          {r.with && <p className="mt-1.5 font-mono text-[11.5px] tracking-wide text-ash-500">with {r.with}</p>}
        </div>
        <ul className="flex flex-wrap gap-1.5 md:max-w-[280px] md:justify-end">
          {r.tags.map((t) => (
            <li key={t}>
              <Chip>{t}</Chip>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section overflow-x-clip">
      {/* depth, so the section is never a flat field */}
      <div aria-hidden className="pointer-events-none absolute -left-52 top-[4%] size-[680px] rounded-full bg-[radial-gradient(closest-side,rgb(27_53_189/0.4),transparent)]" />

      <div className="wrap relative">
        <SectionHead label="Experience" index="03" lead="Work" accent="experience." accentClass="text-ash-300" />

        <ul className="mt-12 lg:mt-16">
          {roles.map((r, i) => (
            <RoleRow key={r.id} r={r} last={i === roles.length - 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}
