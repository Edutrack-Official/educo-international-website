import { LogoMark } from "@/components/ui/logo-mark";

/**
 * Opening curtain: midnight panel with the crest that lifts away on load.
 * Pure CSS, so it plays before hydration and never blocks the page.
 */
export function Curtain() {
  return (
    <div
      aria-hidden
      className="curtain island pointer-events-none fixed inset-0 z-[200] flex items-center justify-center"
    >
      <div className="curtain-crest flex flex-col items-center gap-5">
        <LogoMark className="h-16 w-16" />
        <span className="display text-sm uppercase text-gold">Educo International</span>
        <span className="display -mt-2 text-xs italic tracking-[0.2em] text-fg/60">Achieving Excellence Together</span>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}
