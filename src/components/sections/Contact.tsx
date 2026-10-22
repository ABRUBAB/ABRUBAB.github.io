"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { profile, socials } from "@/content/data";
import { cn } from "@/lib/cn";
import LiveClock from "@/components/ui/LiveClock";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";
import SplitWords from "@/components/ui/SplitWords";
import { ArrowUpRight, Check, Copy, Download, Mail, socialIcon } from "@/components/ui/Icons";

function CopyEmail() {
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
    <div className="flex items-center justify-between gap-3 rounded-[28px] bg-ash-50 p-2 pl-6 text-ink shadow-[0_40px_80px_-40px_rgb(7_15_61/0.9)] sm:pl-8">
      <a
        href={`mailto:${profile.email}`}
        className="group flex min-w-0 items-center gap-4 py-4 text-[clamp(1.05rem,2.6vw,1.9rem)] font-medium tracking-tight"
      >
        <Mail width={24} height={24} className="shrink-0 text-cobalt-600" />
        <span className="truncate underline decoration-ink/15 decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-cobalt-600">
          {profile.email}
        </span>
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={done ? "Email copied" : "Copy email address"}
        className={cn(
          "inline-flex h-14 shrink-0 items-center gap-2 rounded-[20px] px-5 text-[14px] font-medium text-ash-50 transition-colors duration-300",
          done ? "bg-cobalt-600" : "bg-ink hover:bg-cobalt-700",
        )}
      >
        {done ? <Check width={17} height={17} /> : <Copy width={17} height={17} />}
        <span className="hidden sm:inline">{done ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 20%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <section id="contact" ref={ref} className="relative py-3 sm:py-5">
      <motion.div
        style={{ scale, y, transformOrigin: "50% 0%" }}
        className="sheet bg-cobalt-600 text-white"
      >
        {/* light from the upper right, depth to the lower left, two slow colour pools */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_88%_0%,rgb(111_144_255/0.85),transparent_62%),radial-gradient(80%_90%_at_0%_100%,rgb(7_15_61/0.9),transparent_60%)]" />
        <div aria-hidden className="drift pointer-events-none absolute -left-32 top-[10%] size-[520px] rounded-full bg-cobalt-300/30 blur-3xl" style={{ ["--drift" as string]: "20s" }} />
        <div aria-hidden className="drift pointer-events-none absolute -bottom-40 right-[8%] size-[480px] rounded-full bg-ember-500/25 blur-3xl" style={{ ["--drift" as string]: "26s" }} />

        <div className="section wrap">
          <Reveal blur>
            <p className="label flex items-center gap-3 !text-white/70">
              <span className="h-px w-8 bg-gradient-to-r from-white to-transparent" />
              Contact
            </p>
          </Reveal>
          <h2 className="display mt-6 text-[clamp(3.6rem,12vw,11rem)] text-white">
            <SplitWords text="Let’s" inView />{" "}
            <SplitWords
              text="talk."
              inView
              delay={0.2}
              wordClassName={() => "serif-italic pr-[0.06em] text-[1.04em] text-ember-400"}
            />
          </h2>

          <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-[1.35fr_1fr] lg:gap-6">
            <div className="flex flex-col justify-between gap-8">
              <Reveal>
                <CopyEmail />
              </Reveal>
              <Reveal delay={0.08}>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 px-2 text-[15px] text-white/80">
                  <span className="flex items-center gap-2.5">
                    <span className="relative grid size-2 place-items-center">
                      <span className="ping-soft absolute inset-0 rounded-full bg-ember-400" />
                      <span className="size-1.5 rounded-full bg-ember-400" />
                    </span>
                    {profile.seekingLong}
                  </span>
                  <span className="font-mono text-[12px] tracking-wide text-white/70">
                    {profile.location} · <LiveClock timeZone={profile.timeZone} />
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.14}>
                <a
                  href={`mailto:${profile.academicEmail}`}
                  className="inline-flex px-2 font-mono text-[12.5px] tracking-wide text-white/60 transition-colors hover:text-white"
                >
                  Academic · {profile.academicEmail}
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <ul className="overflow-hidden rounded-[28px] bg-ink shadow-[0_40px_80px_-40px_rgb(7_15_61/0.9)]">
                <li>
                  <Magnetic strength={0.06} className="block">
                    <a
                      href={profile.cv}
                      download
                      className="group flex items-center gap-4 border-b border-white/[0.07] px-6 py-5 transition-colors hover:bg-white/[0.045]"
                    >
                      <span className="grid size-10 place-items-center rounded-full border border-white/[0.14] text-ash-200 transition-colors group-hover:border-ember-400 group-hover:text-ember-400">
                        <Download width={17} height={17} />
                      </span>
                      <span className="flex-1 text-[16px] font-medium text-ash-50">Curriculum vitae</span>
                      <span className="font-mono text-[11px] tracking-wider text-ash-500">PDF</span>
                    </a>
                  </Magnetic>
                </li>
                {socials.map((s, i) => {
                  const Icon = socialIcon[s.id];
                  return (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-white/[0.045]",
                          i < socials.length - 1 && "border-b border-white/[0.07]",
                        )}
                      >
                        <span className="grid size-10 place-items-center rounded-full border border-white/[0.14] text-ash-300 transition-colors group-hover:border-cobalt-400 group-hover:text-cobalt-300">
                          <Icon width={17} height={17} />
                        </span>
                        <span className="flex-1 text-[16px] text-ash-100">{s.label}</span>
                        <ArrowUpRight
                          width={17}
                          height={17}
                          className="text-ash-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
