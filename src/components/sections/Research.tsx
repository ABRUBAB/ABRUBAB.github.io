"use client";

import { motion } from "motion/react";
import { papers, socials, statusMeta, type Paper, type PaperStatus } from "@/content/data";
import { hexToTriplet } from "@/lib/color";
import { EASE_OUT } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import Glyph from "@/components/ui/Glyph";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { ArrowUpRight, GitHub, Scholar } from "@/components/ui/Icons";

const order: PaperStatus[] = ["published", "presented", "review", "ready", "preparing"];
const ranked = [...papers].sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));

// bento spans on the 4-column grid (lg+)
const span: Record<string, string> = {
  "cactus-vit": "lg:col-span-2",
  "msea-net": "lg:col-span-2",
  "ram-vit": "lg:col-span-2",
  "puma-mil": "lg:col-span-2",
};

function Pipeline() {
  return (
    <Reveal>
      <div className="rounded-3xl border border-ink/10 bg-ash-50 p-5 sm:p-6">
        <div className="flex gap-1.5" role="img" aria-label="Research pipeline by status">
          {ranked.map((p, i) => (
            <motion.span
              key={p.id}
              title={`${p.title} — ${statusMeta[p.status].label}`}
              className="h-3 flex-1 origin-left rounded-full"
              style={{ background: statusMeta[p.status].color }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: EASE_OUT }}
            />
          ))}
        </div>
        <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-2.5">
          {order.map((s) => {
            const n = papers.filter((p) => p.status === s).length;
            if (!n) return null;
            return (
              <li key={s} className="flex items-center gap-2.5 text-[13px] text-ash-600">
                <span className="size-2 rounded-full" style={{ background: statusMeta[s].color }} />
                <span className="font-mono text-ink">{n}</span>
                {statusMeta[s].label}
              </li>
            );
          })}
        </ul>
      </div>
    </Reveal>
  );
}

function PaperTile({ p, wide, index }: { p: Paper; wide?: boolean; index: number }) {
  const meta = statusMeta[p.status];
  const link = p.doi ?? p.code;
  return (
    <article
      aria-label={p.title}
      className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 bg-ash-50 p-5 transition-[transform,box-shadow,border-color] duration-500 ease-out-quint hover:-translate-y-1.5 hover:border-ink/30 hover:shadow-[0_34px_60px_-34px_rgb(9_9_11/0.45)] sm:p-6"
      style={{ ["--spot" as string]: hexToTriplet(meta.color) }}
    >
      {/* a wash of the status colour that rises on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 translate-y-full opacity-0 transition-all duration-700 ease-out-quint group-hover:translate-y-0 group-hover:opacity-100"
        style={{ background: `linear-gradient(to top, ${meta.color}1f, transparent)` }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-wide" style={{ color: meta.color }}>
          <span className="relative grid size-2 place-items-center">
            {p.status === "review" && <span className="ping-soft absolute inset-0 rounded-full" style={{ background: meta.color }} />}
            <span className="size-1.5 rounded-full" style={{ background: meta.color }} />
          </span>
          {meta.label}
        </span>
        <span className="font-mono text-[11px] tracking-wide text-ash-500">{p.year}</span>
      </div>

      <div className={cn("relative my-4 flex flex-1 items-center", wide && "lg:justify-end lg:pr-4")}>
        {/* scan-line reveal, tile by tile */}
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.4, delay: 0.15 + (index % 4) * 0.1, ease: EASE_OUT }}
          className="w-full"
        >
          <Glyph
            kind={p.glyph}
            className={cn(
              "h-auto max-h-[104px] w-full max-w-[210px] transition-transform duration-700 ease-out-quint group-hover:scale-[1.07]",
              wide && "lg:ml-auto lg:max-h-[132px] lg:max-w-[270px]",
            )}
            style={{ color: meta.color }}
          />
        </motion.div>
        {/* full title, revealed on hover/focus — always present for screen readers */}
        <p className="pointer-events-none absolute inset-0 flex items-center rounded-2xl bg-ash-50/[0.97] p-3 text-[13.5px] leading-snug text-ash-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 max-md:hidden">
          {p.full}
        </p>
        <span className="sr-only md:hidden">{p.full}</span>
      </div>

      <div className="relative flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[23px] font-medium leading-tight tracking-tight text-ink">{p.title}</h3>
          <p className="mt-1.5 truncate font-mono text-[11.5px] tracking-wide text-ash-600">{p.venue}</p>
          <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ash-500">{p.role}</p>
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={p.doi ? `${p.title} — DOI` : `${p.title} — code on GitHub`}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-ash-50"
          >
            {p.doi ? <ArrowUpRight width={17} height={17} /> : <GitHub width={17} height={17} />}
          </a>
        )}
      </div>
    </article>
  );
}

export default function Research() {
  const scholar = socials.find((s) => s.id === "scholar")!;


  return (
    <section id="research" className="relative py-3 sm:py-5">
      <motion.div
        initial={{ opacity: 0, y: 56 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 1, ease: EASE_OUT }}
        className="sheet bg-paper text-ink"
      >
        <div aria-hidden className="bg-paper-grid pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(111_144_255/0.34),transparent)]" />

        <div className="section wrap">
          <SectionHead
            tone="light"
            label="Research"
            lead="The"
            accent="papers."
            accentClass="text-cobalt-600"
            aside={
              <Button
                href={scholar.href}
                external
                variant="outlineInk"
                leading={<Scholar width={16} height={16} />}
                trailing={<ArrowUpRight width={16} height={16} />}
              >
                Google Scholar
              </Button>
            }
          />

          <div className="mt-12 lg:mt-14">
            <Pipeline />
          </div>

          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ranked.map((p, i) => (
              <li key={p.id} className={cn("min-w-0", span[p.id])}>
                <Reveal delay={(i % 4) * 0.07} className="h-full">
                  <PaperTile p={p} wide={Boolean(span[p.id])} index={i} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
