import { cn } from "@/lib/utils";

/**
 * The Educo crest: a serif "E" inside a ring, with a small orbit and a gold
 * star travelling around it — a student's world, widening.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-10 w-10", className)} aria-hidden>
      <circle cx="20" cy="20" r="19" fill="var(--accent)" />
      <circle cx="20" cy="20" r="15.5" fill="none" stroke="var(--gold-2)" strokeOpacity="0.55" strokeWidth="0.8" />
      <ellipse cx="20" cy="20" rx="17" ry="6.2" fill="none" stroke="var(--gold-2)" strokeWidth="1" transform="rotate(-24 20 20)" />
      <path
        d="M14.5 12.2h11.2v3.1h-1.1l-.5-1.6h-5.7v4.9h4.2l.4-1.3h1v4.4h-1l-.4-1.3h-4.2v5.4h5.9l.7-1.9h1.1l-.3 3.5H14.5v-.9l1.4-.4V13.5l-1.4-.4z"
        fill="var(--accent-ink)"
      />
      <circle cx="33.4" cy="13.6" r="1.9" fill="var(--gold-2)" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="leading-none">
        <span className="display block text-[1.5rem] tracking-tight">Educo</span>
        <span className="mt-1 block text-[0.6rem] font-bold uppercase tracking-[0.34em] text-gold">International</span>
      </span>
    </span>
  );
}
