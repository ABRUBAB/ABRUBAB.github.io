"use client";

import { motion } from "motion/react";
import { profile } from "@/content/data";
import { EASE_OUT, scrollToTop } from "@/lib/scroll";
import { ArrowUpRight } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-12">
      <div className="wrap flex flex-col gap-4 border-t border-white/[0.08] pt-6 text-[13px] text-ash-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <p className="font-mono text-[11.5px] tracking-wide">Next.js · Motion · WebGL</p>
        <button
          type="button"
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 self-start text-ash-300 transition-colors hover:text-white sm:self-auto"
        >
          Back to top
          <ArrowUpRight width={15} height={15} className="-rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* oversized wordmark, rising from the page edge */}
      <div aria-hidden className="pointer-events-none mt-10 select-none overflow-hidden">
        <motion.p
          initial={{ y: "70%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          transition={{ duration: 1.6, ease: EASE_OUT }}
          className="display outline-text whitespace-nowrap text-center text-[clamp(3rem,14.6vw,15.5rem)] leading-[0.82] [--outline:rgb(245_244_241/0.3)]"
        >
          Abdullah Rubab
        </motion.p>
      </div>
    </footer>
  );
}
