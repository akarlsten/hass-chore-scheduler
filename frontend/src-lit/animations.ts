/**
 * Completion animation utilities.
 * Respects prefers-reduced-motion.
 */

const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function playCheckmarkPop(element: HTMLElement): void {
  if (prefersReducedMotion()) return;
  element.classList.add("completing");
  element.addEventListener(
    "animationend",
    () => element.classList.remove("completing"),
    { once: true }
  );
}

export function triggerHaptic(): void {
  if (prefersReducedMotion()) return;
  if ("vibrate" in navigator) {
    navigator.vibrate([50, 30, 80]);
  }
}
