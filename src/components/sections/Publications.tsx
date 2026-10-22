"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { papers, socials, statusMeta, type Paper, type PaperStatus } from "@/content/data";
import { EASE_OUT, lockScroll } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import Glyph from "@/components/ui/Glyph";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import Sheet from "@/components/ui/Sheet";
import { ArrowLeft, ArrowRight, ArrowUpRight, Close, GitHub, Plus, Scholar } from "@/components/ui/Icons";

const order: PaperStatus[] = ["published", "presented", "review", "ready", "preparing"];
const ranked = [...papers].sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));

// grid spans on the 6-column grid (lg+): one featured, two pairs, then three across
const span: Record<number, string> = {
  0: "lg:col-span-6",
  1: "lg:col-span-3",
  2: "lg:col-span-3",
  3: "lg:col-span-3",
  4: "lg:col-span-3",
  5: "lg:col-span-2",
  6: "lg:col-span-2",
  7: "lg:col-span-2",
};

/** Status bar. Hovering a legend entry lights up the matching papers below. */
function Pipeline({ focus, onFocus }: { focus: PaperStatus | null; onFocus: (s: PaperStatus | null) => void }) {
  return (
    <Reveal>
      <div className="rounded-3xl border border-ink/10 bg-ash-50 p-5 sm:p-6">
        <div className="flex gap-1.5" role="img" aria-label="Publication pipeline by status">
          {ranked.map((p, i) => (
            <motion.span
              key={p.id}
              title={`${p.title} — ${statusMeta[p.status].label}`}
              className="h-3 flex-1 origin-left rounded-full transition-opacity duration-300"
              style={{ background: statusMeta[p.status].color, opacity: focus && focus !== p.status ? 0.22 : 1 }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
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
              <li
                key={s}
                onPointerEnter={(e) => e.pointerType === "mouse" && onFocus(s)}
                onPointerLeave={() => onFocus(null)}
                className="flex items-center gap-2.5 text-[13px] text-ash-600"
              >
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

function StatusLabel({ status, className }: { status: PaperStatus; className?: string }) {
  const meta = statusMeta[status];
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-wide", className)} style={{ color: meta.color }}>
      <span className="relative grid size-2 place-items-center">
        {status === "review" && <span className="ping-soft absolute inset-0 rounded-full" style={{ background: meta.color }} />}
        <span className="size-1.5 rounded-full" style={{ background: meta.color }} />
      </span>
      {meta.label}
    </span>
  );
}

/** A paper: the full title is always visible; the whole card opens the detail view. */
function PaperTile({
  p,
  featured,
  dim,
  onOpen,
}: {
  p: Paper;
  featured?: boolean;
  dim: boolean;
  onOpen: (id: string, trigger: HTMLElement) => void;
}) {
  const meta = statusMeta[p.status];
  const link = p.doi ?? p.code;
  return (
    <motion.article
      layoutId={`paper-${p.id}`}
      aria-label={p.title}
      style={{ borderRadius: 26 }}
      className={cn(
        "group relative h-full overflow-hidden border border-ink/10 bg-ash-50 transition-[opacity,box-shadow,border-color] duration-500 ease-out-quint hover:border-ink/30 hover:shadow-[0_34px_60px_-34px_rgb(9_9_11/0.45)]",
        dim && "opacity-40",
      )}
    >
      {/* a wash of the status colour that rises on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 translate-y-full opacity-0 transition-all duration-700 ease-out-quint group-hover:translate-y-0 group-hover:opacity-100"
        style={{ background: `linear-gradient(to top, ${meta.color}22, transparent)` }}
      />

      <div
        className={cn(
          "relative flex h-full flex-col gap-5 p-5 transition-transform duration-500 ease-out-quint group-hover:-translate-y-0.5 sm:p-6",
          featured && "lg:flex-row lg:items-stretch lg:gap-10 lg:p-8",
        )}
      >
        {featured && (
          <div className="relative hidden w-[38%] shrink-0 overflow-hidden rounded-2xl bg-ink p-6 lg:flex lg:flex-col lg:justify-between">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full"
              style={{ background: "radial-gradient(closest-side, rgb(61 99 255 / 0.55), transparent)" }}
            />
            <span className="relative font-mono text-[11px] tracking-wide text-ash-300">{p.year}</span>
            <Glyph kind={p.glyph} className="relative h-auto w-full max-w-[220px] text-cobalt-300" />
            <span className="relative font-mono text-[11px] tracking-wide text-ash-400">{p.venue}</span>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between gap-3">
            <StatusLabel status={p.status} />
            <span className={cn("font-mono text-[11px] tracking-wide text-ash-500", featured && "lg:hidden")}>{p.year}</span>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <Glyph kind={p.glyph} className={cn("h-12 w-[72px] shrink-0 text-cobalt-600", featured && "lg:hidden")} />
            <h3
              className={cn(
                "display text-ink",
                featured ? "text-[clamp(2rem,4.4vw,3.6rem)]" : "text-[clamp(1.7rem,2.5vw,2.3rem)]",
              )}
            >
              {p.title}
            </h3>
          </div>

          <p className={cn("mt-4 leading-snug text-ash-600", featured ? "text-[16px] lg:max-w-[34rem] lg:text-[18px]" : "text-[14.5px]")}>
            {p.full}
          </p>

          <div className="mt-auto flex items-end justify-between gap-3 pt-6">
            <div className="min-w-0 space-y-1 font-mono text-[11px] leading-snug tracking-wide">
              <p className={cn("text-ink", featured && "lg:hidden")}>{p.venue}</p>
              <p className="text-ash-500">{p.role}</p>
            </div>
            <span className="flex shrink-0 items-center gap-2">
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={p.doi ? `${p.title} — DOI` : `${p.title} — code on GitHub`}
                  className="relative z-[3] grid size-10 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-ash-50"
                >
                  {p.doi ? <ArrowUpRight width={17} height={17} /> : <GitHub width={17} height={17} />}
                </a>
              )}
              <span
                aria-hidden
                className="grid size-10 place-items-center rounded-full bg-ink text-ash-50 transition-transform duration-500 ease-out-quint group-hover:rotate-90 group-hover:bg-cobalt-600"
              >
                <Plus width={17} height={17} />
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* the whole card is one big button (links above sit on top of it) */}
      <button
        type="button"
        aria-label={`Read about ${p.title}`}
        aria-haspopup="dialog"
        onClick={(e) => onOpen(p.id, e.currentTarget)}
        className="absolute inset-0 z-[2] cursor-pointer rounded-[26px]"
      />
    </motion.article>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[92px_1fr] gap-x-4 border-t border-ink/10 py-3 sm:grid-cols-[110px_1fr]">
      <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ash-500">{label}</dt>
      <dd className="text-[14.5px] leading-snug text-ink">{children}</dd>
    </div>
  );
}

function DetailBody({ p }: { p: Paper }) {
  const meta = statusMeta[p.status];
  return (
    <div className="grid min-h-full md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
      {/* left: the drawn motif on ink */}
      <div className="relative flex flex-col justify-between gap-8 overflow-hidden bg-ink p-6 text-ash-50 sm:p-8 md:min-h-[460px]">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-[22rem] rounded-full"
          style={{ background: `radial-gradient(closest-side, ${meta.color === "#1b35bd" ? "rgb(61 99 255 / 0.6)" : "rgb(61 99 255 / 0.4)"}, transparent)` }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -left-20 size-[20rem] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgb(255 90 31 / 0.22), transparent)" }}
        />
        <div className="relative flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 font-mono text-[11px] tracking-wide text-ash-100">
            <span className="size-1.5 rounded-full" style={{ background: p.status === "review" ? "#ff5a1f" : "#9eb6ff" }} />
            {meta.label}
          </span>
          <span className="font-mono text-[11px] tracking-wide text-ash-400">{p.year}</span>
        </div>
        <Glyph kind={p.glyph} className="relative h-auto w-full max-w-[250px] text-cobalt-300" />
        <h3 className="display relative text-[clamp(2.4rem,5vw,3.6rem)] text-ash-50">{p.title}</h3>
      </div>

      {/* right: the paper */}
      <div className="p-6 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash-500">{p.role}</p>
        <h4 className="mt-3 text-[clamp(1.2rem,2.2vw,1.55rem)] font-medium leading-[1.2] tracking-[-0.015em] text-ink">{p.full}</h4>

        <p className="mt-5 text-[15.5px] leading-relaxed text-ash-700">{p.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Key ideas">
          {p.ideas.map((t) => (
            <li
              key={t}
              className="rounded-full border border-ink/15 bg-white/60 px-2.5 py-1 font-mono text-[11px] leading-none tracking-wide text-ash-700"
            >
              {t}
            </li>
          ))}
        </ul>

        <dl className="mt-7 border-b border-ink/10">
          <Fact label="Venue">
            {p.venueFull}
            {p.publisher && <span className="text-ash-500"> · {p.publisher}</span>}
            {p.pages && <span className="text-ash-500"> · {p.pages}</span>}
          </Fact>
          <Fact label="Status">{p.statusNote}</Fact>
          <Fact label="Authors">{p.authors}</Fact>
          {p.with && <Fact label="With">{p.with}</Fact>}
        </dl>

        <div className="mt-7 flex flex-wrap gap-2.5">
          {p.doi && (
            <Button href={p.doi} external variant="ink" trailing={<ArrowUpRight width={16} height={16} />}>
              Read the paper
            </Button>
          )}
          {p.code && (
            <Button
              href={p.code}
              external
              variant={p.doi ? "outlineInk" : "ink"}
              leading={<GitHub width={16} height={16} />}
              trailing={<ArrowUpRight width={16} height={16} />}
            >
              Code
            </Button>
          )}
          {!p.doi && !p.code && (
            <Button
              href={socials.find((s) => s.id === "scholar")!.href}
              external
              variant="outlineInk"
              leading={<Scholar width={16} height={16} />}
              trailing={<ArrowUpRight width={16} height={16} />}
            >
              Google Scholar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

const subscribe = () => () => {};

/**
 * Detail view. The card the visitor clicked grows into this panel (a shared
 * layout transition), and ←/→ step through the other papers. Rendered in a
 * portal so no transformed ancestor can trap its `position: fixed`.
 */
function PaperDialog({
  openId,
  origin,
  onClose,
  onStep,
}: {
  openId: string | null;
  origin: string | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const client = useSyncExternalStore(subscribe, () => true, () => false);
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const index = ranked.findIndex((p) => p.id === openId);
  const p = index >= 0 ? ranked[index] : null;

  const step = useCallback(
    (d: 1 | -1) => {
      setDir(d);
      onStep(d);
    },
    [onStep],
  );

  useEffect(() => {
    if (!openId) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [openId, onClose, step]);

  if (!client) return null;

  return createPortal(
    <AnimatePresence>
      {p && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            key="scrim"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/80"
          />
          <motion.div
            key="panel"
            ref={panelRef}
            layoutId={origin ? `paper-${origin}` : undefined}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            style={{ borderRadius: 28 }}
            initial={origin ? undefined : { opacity: 0, y: 40 }}
            animate={origin ? undefined : { opacity: 1, y: 0 }}
            exit={origin ? undefined : { opacity: 0, y: 24 }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="relative z-[1] flex h-[min(92dvh,800px)] w-full max-w-[960px] flex-col overflow-hidden bg-ash-50 text-ink shadow-[0_60px_120px_-30px_rgb(0_0_0/0.8)] outline-none max-sm:!rounded-b-none"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="flex min-h-0 flex-1 flex-col"
            >
              {/* top bar */}
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-ink/10 bg-ash-50 px-4 py-3 sm:px-6">
                <p id={titleId} className="min-w-0 truncate font-mono text-[11.5px] tracking-wide text-ash-600">
                  <span className="text-ink">{String(index + 1).padStart(2, "0")}</span> / {String(ranked.length).padStart(2, "0")}
                  <span className="mx-2 text-ash-400">·</span>
                  {p.title}
                </p>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous paper"
                    className="grid size-9 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-ash-50"
                  >
                    <ArrowLeft width={16} height={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next paper"
                    className="grid size-9 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-ash-50"
                  >
                    <ArrowRight width={16} height={16} />
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="ml-1 grid size-9 place-items-center rounded-full bg-ink text-ash-50 transition-colors hover:bg-cobalt-600"
                  >
                    <Close width={16} height={16} />
                  </button>
                </div>
              </div>

              {/* body: scrolls on its own; swaps with a short slide when stepping */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                <AnimatePresence mode="wait" initial={false} custom={dir}>
                  <motion.div
                    key={p.id}
                    custom={dir}
                    initial={{ opacity: 0, x: dir * 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir * -28 }}
                    transition={{ duration: 0.28, ease: EASE_OUT }}
                  >
                    <DetailBody p={p} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="hidden shrink-0 items-center justify-center gap-5 border-t border-ink/10 py-2.5 font-mono text-[10.5px] tracking-wide text-ash-500 md:flex">
                <span>← → browse</span>
                <span>Esc close</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default function Publications() {
  const scholar = socials.find((s) => s.id === "scholar")!;
  const [openId, setOpenId] = useState<string | null>(null);
  // the tile the panel grew from; dropped once the visitor steps to another paper
  const [origin, setOrigin] = useState<string | null>(null);
  const [focus, setFocus] = useState<PaperStatus | null>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const open = useCallback((id: string, el: HTMLElement) => {
    trigger.current = el;
    setOrigin(id);
    setOpenId(id);
  }, []);

  const close = useCallback(() => {
    setOpenId(null);
    // give focus back to the card that opened the panel
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
  }, []);

  // the ⌘K menu can open any paper directly
  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (!ranked.some((p) => p.id === id)) return;
      trigger.current = null;
      setOrigin(null);
      setOpenId(id);
    };
    window.addEventListener("paper:open", onOpen);
    return () => window.removeEventListener("paper:open", onOpen);
  }, []);

  const step = useCallback((d: 1 | -1) => {
    setOrigin(null);
    setOpenId((cur) => {
      const i = ranked.findIndex((p) => p.id === cur);
      return ranked[(i + d + ranked.length) % ranked.length].id;
    });
  }, []);

  return (
    <section id="publications" className="relative py-3 sm:py-5">
      <Sheet className="bg-paper text-ink">
        <div aria-hidden className="bg-paper-grid pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(111_144_255/0.34),transparent)]" />

        <div className="section wrap">
          <SectionHead
            tone="light"
            label="Publications" index="02"
            lead="Research"
            accent="publications."
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
            <Pipeline focus={focus} onFocus={setFocus} />
          </div>

          <LayoutGroup id="papers">
            <ul className="mt-5 grid gap-5 lg:grid-cols-6">
              {ranked.map((p, i) => (
                <li key={p.id} className={cn("min-w-0", span[i])}>
                  <Reveal delay={(i % 3) * 0.07} className="h-full">
                    <PaperTile p={p} featured={i === 0} dim={focus !== null && focus !== p.status} onOpen={open} />
                  </Reveal>
                </li>
              ))}
            </ul>
            <PaperDialog openId={openId} origin={origin} onClose={close} onStep={step} />
          </LayoutGroup>

          <p className="mt-8 text-center font-mono text-[11.5px] tracking-wide text-ash-500">
            Open any paper for the summary, venue and links.
          </p>
        </div>
      </Sheet>
    </section>
  );
}
