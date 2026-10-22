import type Lenis from "lenis";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// The Lenis instance lives here (created in <Providers/>) so any component can
// drive scrolling without reaching into globals. Null when smooth scroll is off.
let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export function lockScroll(lock: boolean) {
  if (lock) instance?.stop();
  else instance?.start();
}

export function scrollToTop() {
  if (instance) instance.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Smooth-scroll to a section id and reflect it in the URL hash. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) instance.scrollTo(el, { offset: -88, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}
