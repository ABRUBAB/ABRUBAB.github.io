"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { profile, socials } from "@/content/data";
import { EASE_OUT, lockScroll, scrollToId, scrollToTop } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import { Close, Download, Menu, Search } from "@/components/ui/Icons";
import { socialIcon } from "@/components/ui/Icons";

const links = [
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "journey", label: "Journey" },
  { id: "beyond", label: "Beyond" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  // client-only fact; the server renders the non-Mac label and React reconciles on hydrate
  const isMac = useSyncExternalStore(
    () => () => {},
    () => /mac|iphone|ipad/i.test(navigator.userAgent),
    () => false,
  );
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  // whichever section crosses the middle of the viewport is "active"
  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < 200 && setActive("");
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  // freeze page scroll while the mobile sheet is open
  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // let the sheet unlock scrolling before we move
    setTimeout(() => scrollToId(id), open ? 60 : 0);
  };

  const openPalette = () => window.dispatchEvent(new Event("palette:open"));

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cobalt-500 via-cobalt-300 to-ember-500"
      />

      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.1, ease: EASE_OUT }}
        className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav
          aria-label="Primary"
          className="glass pointer-events-auto flex items-center gap-1 rounded-full p-1.5 pr-2"
        >
          <a
            href="#top"
            aria-label="Abdullah Rubab — back to top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/[0.07]"
          >
            <Image src="/assets/logos/ar-mark.png" alt="" width={22} height={17} className="h-[17px] w-auto" />
          </a>

          <ul className="hidden items-center md:flex">
            {links.map((l) => (
              <li key={l.id} className="relative">
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.id);
                  }}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-[14px] transition-colors",
                    active === l.id ? "text-white" : "text-ash-300 hover:text-white",
                  )}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.1] shadow-[inset_0_1px_0_rgb(255_255_255/0.14)]"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <span className="mx-1.5 hidden h-5 w-px bg-white/10 md:block" />

          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command menu"
            className="hidden h-10 items-center gap-2 rounded-full px-3.5 text-[13px] text-ash-300 transition-colors hover:bg-white/[0.07] hover:text-white md:inline-flex"
          >
            <Search width={15} height={15} />
            <kbd className="font-mono text-[11px] tracking-wider text-ash-400">{isMac ? "⌘" : "Ctrl"} K</kbd>
          </button>

          <a
            href={profile.cv}
            download
            className="hidden h-10 items-center gap-2 rounded-full bg-ash-50 px-4 text-[13px] font-medium text-ink transition-shadow hover:shadow-[0_8px_30px_-8px_rgb(111_144_255/0.7)] md:inline-flex"
          >
            <Download width={15} height={15} />
            CV
          </a>

          {/* mobile */}
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command menu"
            className="grid size-10 place-items-center rounded-full text-ash-200 hover:bg-white/[0.07] md:hidden"
          >
            <Search width={18} height={18} />
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full text-ash-200 hover:bg-white/[0.07] md:hidden"
          >
            <Menu width={20} height={20} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] flex flex-col bg-ink/95 px-6 pb-10 pt-5"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full border border-white/15 text-ash-100"
              >
                <Close width={20} height={20} />
              </button>
            </div>
            <ul className="mt-10 flex flex-1 flex-col gap-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.8, ease: EASE_OUT }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.id);
                    }}
                    className="display block py-2 text-[clamp(2.8rem,14vw,4.6rem)] text-ash-50"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              <ul className="flex gap-2">
                {socials.map((s) => {
                  const Icon = socialIcon[s.id];
                  return (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="grid size-11 place-items-center rounded-full border border-white/15 text-ash-200"
                      >
                        <Icon />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <a
                href={profile.cv}
                download
                className="inline-flex h-11 items-center gap-2 rounded-full bg-ash-50 px-5 text-sm font-medium text-ink"
              >
                <Download width={16} height={16} /> CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
