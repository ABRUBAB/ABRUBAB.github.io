"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { education, honours, roles, stage, type Role, type StageMoment } from "@/content/data";
import { EASE_OUT } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import Chip from "@/components/ui/Chip";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { ArrowUpRight, Trophy } from "@/components/ui/Icons";

function LogoTile({ src, dark, alt, size = 56 }: { src: string; dark?: boolean; alt: string; size?: number }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-2xl p-1.5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]",
        dark ? "bg-black" : "bg-white",
      )}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} width={96} height={96} className="size-full object-contain" />
    </span>
  );
}

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
        <ul className="flex flex-wrap gap-1.5 md:max-w-[260px] md:justify-end">
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

/** A photo from the stage. If the image file is missing it degrades to a typographic panel. */
function StageCard({ m }: { m: StageMoment }) {
  const [failed, setFailed] = useState(false);
  const first = m.id === "champion";
  return (
    <article
      aria-label={`${m.title}, ${m.event}`}
      className="group relative h-full min-h-[500px] overflow-hidden rounded-3xl border border-white/10 bg-ash-900 lg:min-h-[640px]"
    >
      {failed ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(90%_70%_at_75%_10%,rgb(61_99_255/0.55),transparent_65%),linear-gradient(160deg,#142792,#09090b_70%)]"
        >
          <span className="outline-text absolute -right-4 top-6 select-none text-[clamp(9rem,16vw,15rem)] font-medium leading-none tracking-[-0.06em] [--outline:rgb(245_244_241/0.28)]">
            {m.rank.split(" ")[0]}
          </span>
        </div>
      ) : (
        <Image
          src={m.photo}
          alt={`Abdullah Rubab with the ${m.title} trophy at ${m.event}`}
          fill
          sizes="(max-width: 1024px) 100vw, 700px"
          onError={() => setFailed(true)}
          className="object-cover object-[50%_16%] transition-transform duration-[1200ms] ease-out-quint group-hover:scale-[1.035]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 via-[38%] to-transparent to-[68%]" />
      <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
        <Chip tone={first ? "ember" : "cobalt"} className="self-start">
          <Trophy width={12} height={12} /> {m.rank}
        </Chip>
        <h3 className="display mt-5 text-[clamp(2.3rem,4.4vw,3.6rem)] text-ash-50">
          {m.title}
          <span className="serif-italic text-ice mt-1 block pr-1 text-[0.62em] leading-[1.05]">{m.event}</span>
        </h3>
        <p className="mt-3 max-w-md font-mono text-[11.5px] leading-relaxed tracking-wide text-ash-300">{m.sub}</p>
        <a
          href={m.project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 self-start rounded-full border border-white/20 px-3.5 py-1.5 text-[13px] text-ash-100 transition-colors hover:border-white/50 hover:text-white"
        >
          Built: {m.project.name}
          <ArrowUpRight width={14} height={14} />
        </a>
      </div>
    </article>
  );
}

function Gauge() {
  const R = 52;
  const C = 2 * Math.PI * R;
  const pct = education.cgpa / education.scale;
  return (
    <div className="relative size-[148px] shrink-0">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
        <defs>
          <linearGradient id="gauge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9eb6ff" />
            <stop offset="0.7" stopColor="#3d63ff" />
            <stop offset="1" stopColor="#ff5a1f" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="7" />
        <motion.circle
          cx="60"
          cy="60"
          r={R}
          fill="none"
          stroke="url(#gauge)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C * (1 - pct) }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 2, delay: 0.2, ease: EASE_OUT }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <Counter to={education.cgpa} decimals={2} className="block text-[34px] font-medium leading-none tracking-tight text-ash-50" />
          <span className="label mt-2 block">/ 4.00 CGPA</span>
        </div>
      </div>
    </div>
  );
}

function Education() {
  return (
    <div className="flex h-full flex-col justify-center gap-10 lg:pr-6">
      <div className="flex items-center gap-6">
        <Gauge />
        <div className="min-w-0">
          <LogoTile src="/assets/logos/diu_logo.svg" alt="Daffodil International University logo" size={52} />
          <h3 className="mt-4 text-[20px] font-medium leading-tight tracking-tight text-ash-50">{education.degree}</h3>
          <p className="mt-1 text-[14px] text-ash-400">{education.school}</p>
          <p className="mt-2 font-mono text-[11px] tracking-wide text-ash-500">{education.period}</p>
        </div>
      </div>

      <div className="space-y-5 border-t border-white/10 pt-7">
        <ul className="flex flex-wrap gap-1.5">
          {education.earlier.map((e) => (
            <li key={e.label}>
              <Chip tone="cobalt">
                {e.label} · {e.value}
              </Chip>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Languages">
          {education.languages.map((l) => (
            <li key={l.label} className="flex items-baseline gap-2 text-[14px] text-ash-200">
              {l.label}
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-ash-500">{l.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Hairline grid: the 1px gaps show the container colour, so no border arithmetic. */
function Honours() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.1] sm:grid-cols-2 lg:grid-cols-3">
      {honours.map((h, i) => (
        <li key={h.id} className="group relative bg-[#0b0b0d]">
          <Reveal delay={(i % 3) * 0.07} className="h-full">
            <div className="flex h-full min-h-[170px] flex-col justify-between gap-8 p-6">
              <span className="display text-[clamp(2.1rem,3.4vw,3rem)] text-ash-50 transition-colors duration-500 group-hover:text-ember-400">
                {h.big}
              </span>
              <div>
                <p className="text-[15px] font-medium leading-snug text-ash-100">{h.title}</p>
                <p className="mt-1 font-mono text-[11.5px] tracking-wide text-ash-400">{h.sub}</p>
              </div>
            </div>
          </Reveal>
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ember-500 transition-transform duration-700 ease-out-quint group-hover:scale-x-100"
          />
        </li>
      ))}
    </ul>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="section overflow-x-clip">
      {/* depth, so the section is never a flat field */}
      <div aria-hidden className="pointer-events-none absolute -left-52 top-[6%] size-[680px] rounded-full bg-[radial-gradient(closest-side,rgb(27_53_189/0.42),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -right-44 top-[40%] size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(255_90_31/0.12),transparent)]" />

      <div className="wrap relative">
        <SectionHead label="Journey" lead="The" accent="path." accentClass="text-ash-300" />

        <ul className="mt-12 lg:mt-16">
          {roles.map((r, i) => (
            <RoleRow key={r.id} r={r} last={i === roles.length - 1} />
          ))}
        </ul>

        {/* on stage */}
        <div className="mt-20 grid gap-5 lg:mt-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="h-full">
              <StageCard m={stage[0]} />
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.08} className="h-full">
              <StageCard m={stage[1]} />
            </Reveal>
          </div>
        </div>

        {/* education + honours */}
        <div className="mt-16 grid items-stretch gap-12 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal className="h-full">
              <Education />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Honours />
          </div>
        </div>
      </div>
    </section>
  );
}
