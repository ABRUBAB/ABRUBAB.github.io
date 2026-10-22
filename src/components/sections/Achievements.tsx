"use client";

import Image from "next/image";
import { useState } from "react";
import { honours, stage, type StageMoment } from "@/content/data";
import Chip from "@/components/ui/Chip";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { ArrowUpRight, Trophy } from "@/components/ui/Icons";

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

export default function Achievements() {
  return (
    <section id="achievements" className="section overflow-x-clip">
      <div aria-hidden className="pointer-events-none absolute -right-44 top-[12%] size-[600px] rounded-full bg-[radial-gradient(closest-side,rgb(255_90_31/0.14),transparent)]" />
      <div className="wrap relative">
        <SectionHead label="Achievements" index="04" lead="Awards &" accent="achievements." accentClass="text-ember-400" />

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-12">
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

        <div className="mt-6">
          <Honours />
        </div>
      </div>
    </section>
  );
}
