import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

// Lenis turns off native smooth scrolling, so programmatic scrolls must go through it while it runs.
export function smoothScrollTo(top: number, duration = 1.1) {
  if (lenis) lenis.scrollTo(top, { duration });
  else window.scrollTo({ top, behavior: "smooth" });
}
