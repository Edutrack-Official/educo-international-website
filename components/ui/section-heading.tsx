import { Reveal, Words } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/** Small label with a pulse dot in front of it. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2.5 text-sm font-semibold tracking-wide text-accent", className)}>
      <span aria-hidden className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
        <span className="relative h-2 w-2 rounded-full bg-accent" />
      </span>
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  id?: string;
  className?: string;
  center?: boolean;
};

export function SectionHeading({ eyebrow, title, accent, intro, id, className, center }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <h2 id={id} className="display mt-5 text-[clamp(2.2rem,4.8vw,3.8rem)] leading-[1.02]">
        <Words text={title} accent={accent} />
      </h2>
      {intro && (
        <Reveal delay={0.12}>
          <p className={cn("mt-5 max-w-xl text-base leading-relaxed text-fg/65 sm:text-lg", center && "mx-auto")}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
