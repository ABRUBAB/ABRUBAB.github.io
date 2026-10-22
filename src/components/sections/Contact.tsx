"use client";

import { useState } from "react";
import { profile, socials } from "@/content/data";
import { cn } from "@/lib/cn";
import LiveClock from "@/components/ui/LiveClock";
import Reveal from "@/components/ui/Reveal";
import SplitWords from "@/components/ui/SplitWords";
import Sheet from "@/components/ui/Sheet";
import { ArrowUpRight, Check, Copy, Download, Mail, socialIcon } from "@/components/ui/Icons";

/** A compact, single-line email with a copy button — small type on purpose. */
function EmailPill() {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // clipboard blocked (insecure context / permissions): fall back to a manual selection
      const ta = document.createElement("textarea");
      ta.value = profile.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 1800);
  };

  return (
    <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-ink/20 bg-ash-50/70 p-1.5 pl-5">
      <Mail width={17} height={17} className="shrink-0 text-ash-500" />
      <a
        href={`mailto:${profile.email}`}
        className="min-w-0 truncate px-1 text-[15px] font-medium tracking-tight text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:decoration-ember-500"
      >
        {profile.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={done ? "Email copied" : "Copy email address"}
        className={cn(
          "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium text-ash-50 transition-colors duration-300",
          done ? "bg-cobalt-600" : "bg-ink hover:bg-cobalt-700",
        )}
      >
        {done ? <Check width={15} height={15} /> : <Copy width={15} height={15} />}
        {done ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function Row({
  href,
  label,
  meta,
  icon,
  download,
  external,
}: {
  href: string;
  label: string;
  meta?: string;
  icon: React.ReactNode;
  download?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      download={download}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group -mx-3 flex items-center gap-4 rounded-2xl px-3 py-4 transition-colors duration-300 hover:bg-ink hover:text-ash-50"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-300 group-hover:border-white/25 group-hover:text-ember-400">
        {icon}
      </span>
      <span className="flex-1 text-[clamp(1.2rem,1.9vw,1.55rem)] font-medium tracking-[-0.02em]">{label}</span>
      {meta && <span className="hidden font-mono text-[11px] tracking-wider text-ash-500 sm:block">{meta}</span>}
      <ArrowUpRight
        width={19}
        height={19}
        className="shrink-0 text-ash-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember-400"
      />
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-3 sm:py-5">
      <Sheet className="bg-paper text-ink">
        <div aria-hidden className="bg-paper-grid pointer-events-none absolute inset-0" />
        {/* one warm bloom, low in the corner */}
        <div aria-hidden className="pointer-events-none absolute -bottom-56 -right-40 size-[760px] rounded-full bg-[radial-gradient(closest-side,rgb(255_90_31/0.3),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute -left-48 -top-48 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(111_144_255/0.22),transparent)]" />

        <div className="section wrap">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-3">
              <p className="label flex items-center gap-3 !text-ash-500">
                <span className="h-px w-8 bg-gradient-to-r from-ink to-transparent" />
                <span className="opacity-50">08 /</span>
                Contact
              </p>
              <p className="flex items-center gap-2.5 text-[14px] text-ash-700">
                <span className="relative grid size-2 place-items-center">
                  <span className="ping-soft absolute inset-0 rounded-full bg-ember-500" />
                  <span className="size-1.5 rounded-full bg-ember-500" />
                </span>
                {profile.seekingLong}
              </p>
            </div>
          </Reveal>

          <h2 className="display mt-6 text-[clamp(3.6rem,13vw,12rem)] text-ink">
            <SplitWords text="Let’s" inView />{" "}
            <SplitWords
              text="talk."
              inView
              delay={0.2}
              wordClassName={() => "serif-italic pr-[0.06em] text-[1.04em] text-ember-500"}
            />
          </h2>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-7 lg:justify-between">
              <div className="flex flex-col gap-7">
              <Reveal>
                <p className="max-w-[28rem] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-snug text-ash-700">
                  Applying for funded MSc programmes, and open to research collaborations. Email is the fastest way to reach me.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <EmailPill />
              </Reveal>
              </div>
              <Reveal delay={0.14}>
                <div className="space-y-2 font-mono text-[12px] tracking-wide text-ash-600">
                  <a href={`mailto:${profile.academicEmail}`} className="block w-fit transition-colors hover:text-ink">
                    Academic · {profile.academicEmail}
                  </a>
                  <p>
                    {profile.location} · <LiveClock timeZone={profile.timeZone} />
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <ul className="divide-y divide-ink/15 border-y border-ink/15">
                <li>
                  <Row href={profile.cv} download label="Curriculum vitae" meta="PDF" icon={<Download width={17} height={17} />} />
                </li>
                {socials.map((s) => {
                  const Icon = socialIcon[s.id];
                  return (
                    <li key={s.id}>
                      <Row href={s.href} external label={s.label} icon={<Icon width={17} height={17} />} />
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </Sheet>
    </section>
  );
}
