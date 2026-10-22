export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const calm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Freeze / release page scroll (mobile menu, command menu). */
export function lockScroll(lock: boolean) {
  document.documentElement.style.overflow = lock ? "hidden" : "";
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: calm() ? "auto" : "smooth" });
}

/** Scroll to a section id (below the floating nav) and reflect it in the URL hash. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top: y, behavior: calm() ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}
