"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { destinations, whatsappLink, type Destination } from "@/lib/site";

/**
 * On large screens the section pins and the country cards glide sideways as
 * you scroll down. On phones it is a plain swipeable row.
 */
export function Destinations() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  // Travel exactly far enough for the last card to land at the right edge.
  const track = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  useEffect(() => {
    const measure = () => {
      if (track.current) distance.set(Math.max(0, track.current.scrollWidth - window.innerWidth + 64));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [distance]);
  const x = useTransform(() => -smooth.get() * distance.get());
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <section id="destinations" aria-labelledby="dest-heading" className="relative">
      {/* Desktop: pinned horizontal track */}
      <div ref={ref} className="relative hidden h-[300vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="wrap flex items-end justify-between gap-10">
            <SectionHeading
              id="dest-heading"
              eyebrow="Destinations"
              title="Where in the world"
              accent="will you study?"
              intro="We guide students to universities across the globe. Here are the countries families ask us about most."
            />
            <div className="mb-3 w-56 shrink-0">
              <div className="h-px w-full bg-fg/15">
                <motion.div className="h-px origin-left bg-gold" style={{ scaleX: bar }} />
              </div>
              <p className="mt-3 text-right text-xs font-bold uppercase tracking-[0.24em] text-fg/45">Scroll to travel</p>
            </div>
          </div>

          <motion.div ref={track} style={{ x }} className="mt-14 flex w-max gap-6 pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            {destinations.map((d, i) => (
              <Card key={d.code} d={d} i={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Phones and tablets: swipe */}
      <div className="py-24 sm:py-32 lg:hidden">
        <div className="wrap">
          <SectionHeading
            eyebrow="Destinations"
            title="Where in the world"
            accent="will you study?"
            intro="We guide students to universities across the globe. Here are the countries families ask us about most."
          />
        </div>
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-8">
          {destinations.map((d, i) => (
            <div key={d.code} className="snap-center">
              <Card d={d} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ d, i }: { d: Destination; i: number }) {
  return (
    <article className="group relative flex h-[27rem] w-[19rem] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-fg/10 bg-surface p-7 shadow-card transition-[transform,box-shadow] duration-700 ease-out-expo hover:-translate-y-2 hover:shadow-lift sm:w-[22rem]">
      {/* Colour wash in the country's hue */}
      <div
        aria-hidden
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-25 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-45"
        style={{ background: d.hue }}
      />
      <span aria-hidden className="display pointer-events-none absolute -bottom-8 -right-3 text-[9rem] italic leading-none text-fg/[0.05] transition-transform duration-700 ease-out-expo group-hover:-translate-x-3">
        {d.code}
      </span>

      <div className="relative flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.26em] text-gold">{String(i + 1).padStart(2, "0")}</span>
        <span className="rounded-full border border-fg/12 px-3 py-1 text-xs font-bold tracking-[0.16em]">{d.code}</span>
      </div>

      <h3 className="display relative mt-10 text-[2.4rem] leading-[1.02]">{d.name}</h3>
      <p className="relative mt-3 text-fg/65">{d.line}</p>

      <ul className="relative mt-6 grid gap-2 text-sm">
        {d.points.map((p) => (
          <li key={p} className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
            {p}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto flex items-center justify-between border-t border-fg/10 pt-5">
        <span className="text-xs font-semibold text-fg/50">{d.tests}</span>
        <a
          href={whatsappLink(`Hi Educo, I'm interested in studying in ${d.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ask about studying in ${d.name}`}
          className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-500 ease-out-expo group-hover:-rotate-45"
        >
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </article>
  );
}
