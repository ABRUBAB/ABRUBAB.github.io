"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { papers, profile, projects, socials } from "@/content/data";
import { EASE_OUT, lockScroll, scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import { ArrowRight, ArrowUpRight, Copy, Download, Mail, Search } from "@/components/ui/Icons";
import { socialIcon } from "@/components/ui/Icons";

interface Item {
  id: string;
  group: string;
  label: string;
  hint?: string;
  keywords?: string;
  icon: ReactNode;
  run: () => void | Promise<void>;
  keepOpen?: boolean;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const openRef = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const nav = (id: string, label: string) => ({
      id: `go-${id}`,
      group: "Go to",
      label,
      icon: <ArrowRight width={16} height={16} />,
      run: () => scrollToId(id),
    });
    return [
      nav("projects", "Projects"),
      nav("publications", "Publications"),
      nav("experience", "Experience"),
      nav("achievements", "Achievements"),
      nav("education", "Education"),
      nav("skills", "Skills & languages"),
      nav("activities", "Extracurricular activities"),
      nav("contact", "Contact"),
      ...papers.map<Item>((p) => ({
        id: `paper-${p.id}`,
        group: "Publications",
        label: p.title,
        hint: p.venue,
        keywords: `${p.full} ${p.ideas.join(" ")} paper`,
        icon: <ArrowRight width={16} height={16} />,
        run: () => void window.dispatchEvent(new CustomEvent("paper:open", { detail: p.id })),
      })),
      ...projects.map<Item>((p) => ({
        id: `live-${p.id}`,
        group: "Live projects",
        label: p.title,
        hint: p.host,
        keywords: p.tags.join(" "),
        icon: <ArrowUpRight width={16} height={16} />,
        run: () => void window.open(p.live, "_blank", "noopener,noreferrer"),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        keywords: "mail contact",
        icon: <Copy width={16} height={16} />,
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setFlash("Copied to clipboard");
          } catch {
            setFlash(profile.email);
          }
          setTimeout(() => setFlash(null), 1800);
        },
      },
      {
        id: "email",
        group: "Actions",
        label: "Send an email",
        icon: <Mail width={16} height={16} />,
        run: () => void (window.location.href = `mailto:${profile.email}`),
      },
      {
        id: "cv",
        group: "Actions",
        label: "Download CV",
        hint: "PDF",
        icon: <Download width={16} height={16} />,
        run: () => {
          const a = document.createElement("a");
          a.href = profile.cv;
          a.download = "";
          a.click();
        },
      },
      ...socials.map<Item>((s) => {
        const Icon = socialIcon[s.id];
        return {
          id: `social-${s.id}`,
          group: "Elsewhere",
          label: s.label,
          icon: <Icon width={16} height={16} />,
          run: () => void window.open(s.href, "_blank", "noopener,noreferrer"),
        };
      }),
      {
        id: "fx",
        group: "Preferences",
        label: "Toggle water effects",
        hint: "Reloads the page",
        keywords: "animation motion performance webgl",
        icon: <Search width={16} height={16} />,
        run: () => void window.dispatchEvent(new Event("fx:toggle")),
      },
    ];
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((i) => `${i.label} ${i.group} ${i.hint ?? ""} ${i.keywords ?? ""}`.toLowerCase().includes(s));
  }, [items, q]);

  // open / close wiring
  useEffect(() => {
    const onOpen = () => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setQ("");
      setCursor(0);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (openRef.current) setOpen(false);
        else onOpen();
      }
    };
    window.addEventListener("palette:open", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("palette:open", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    lockScroll(open);
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
    else returnFocus.current?.focus?.();
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const exec = (item: Item | undefined) => {
    if (!item) return;
    if (!item.keepOpen) close();
    // wait a beat so focus returns before navigation side effects
    setTimeout(() => void item.run(), item.keepOpen ? 0 : 120);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      exec(filtered[cursor]);
    }
  };

  // group headings between runs of the same group
  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-start justify-center bg-ink/80 px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onKeyDown={onKeyDown}
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.38, ease: EASE_OUT }}
            className="glass glass-dense w-full max-w-[560px] overflow-hidden rounded-3xl"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-5">
              <Search width={18} height={18} className="shrink-0 text-ash-400" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setCursor(0);
                }}
                placeholder="Jump to…"
                aria-label="Search commands"
                className="h-14 w-full bg-transparent text-[16px] text-ash-50 outline-none placeholder:text-ash-500"
              />
              <kbd className="rounded-md border border-white/10 px-1.5 py-1 font-mono text-[10px] text-ash-400">ESC</kbd>
            </div>

            <ul ref={listRef} className="max-h-[52vh] overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 && <li className="px-4 py-8 text-center text-sm text-ash-400">Nothing matches “{q}”.</li>}
              {filtered.map((item, i) => {
                const heading = item.group !== lastGroup;
                lastGroup = item.group;
                return (
                  <li key={item.id} role="presentation">
                    {heading && <p className="label px-3 pb-1.5 pt-3">{item.group}</p>}
                    <button
                      type="button"
                      role="option"
                      aria-selected={i === cursor}
                      data-index={i}
                      onMouseMove={() => setCursor(i)}
                      onClick={() => exec(item)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-[14px] transition-colors",
                        i === cursor ? "bg-white/[0.08] text-white" : "text-ash-200",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-xl border",
                          i === cursor ? "border-cobalt-400/40 bg-cobalt-400/10 text-cobalt-300" : "border-white/[0.08] text-ash-400",
                        )}
                      >
                        {item.icon}
                      </span>
                      <span className="flex-1 truncate">{item.label}</span>
                      {(item.id === "copy-email" && flash) || item.hint ? (
                        <span className="truncate font-mono text-[11px] text-ash-400">
                          {item.id === "copy-email" && flash ? flash : item.hint}
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
