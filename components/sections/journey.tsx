"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { Plane } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { journey } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * A flight path down the page: a gold line fills as you scroll, a plane rides
 * its tip, and each milestone lights up as the plane passes it.
 */
export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  const top = useTransform(fill, (v) => `${v * 100}%`);
  const [reached, setReached] = useState(0);
  const n = journey.length;

  useMotionValueEvent(fill, "change", (v) => setReached(Math.min(n, Math.floor(v * (n - 1) + 1.05))));

  return (
    <section id="journey" aria-labelledby="journey-heading" className="relative overflow-hidden bg-surface-2/60 py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading
          id="journey-heading"
          eyebrow="Your journey"
          title="From first conversation"
          accent="to boarding pass."
          intro="Six milestones, one team beside you for all of them."
          center
        />

        <ol ref={ref} className="relative mx-auto mt-20 max-w-5xl">
          {/* Track */}
          <span aria-hidden className="absolute bottom-0 left-6 top-0 w-px bg-fg/12 md:left-1/2" />
          <motion.span
            aria-hidden
            className="absolute left-6 top-0 w-px origin-top bg-gradient-to-b from-gold-2 to-gold md:left-1/2"
            style={{ scaleY: fill, height: "100%" }}
          />
          <motion.span
            aria-hidden
            className="absolute left-6 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
            style={{ top }}
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-gold-ink shadow-[0_0_0_6px_color-mix(in_oklab,var(--gold)_20%,transparent),0_12px_30px_-8px_var(--gold)]">
              <Plane className="h-5 w-5 rotate-[135deg]" aria-hidden />
            </span>
          </motion.span>

          {journey.map((step, i) => {
            const on = i < reached;
            const right = i % 2 === 1;
            return (
              <li key={step.title} className="relative grid pb-14 last:pb-0 md:grid-cols-2 md:gap-16">
                {/* Milestone dot */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-6 top-6 h-4 w-4 -translate-x-1/2 rotate-45 border-2 transition-all duration-500 md:left-1/2",
                    on ? "scale-125 border-gold bg-gold" : "border-fg/25 bg-bg",
                  )}
                />
                <motion.div
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className={cn("pl-16 md:pl-0", right ? "md:col-start-2" : "md:text-right")}
                >
                  <div
                    className={cn(
                      "rounded-[1.75rem] border p-6 transition-all duration-700 sm:p-8",
                      on ? "border-gold/40 bg-surface shadow-lift" : "border-fg/10 bg-surface/60",
                    )}
                  >
                    <span className={cn("display text-5xl italic transition-colors duration-500", on ? "text-gold" : "text-fg/20")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="display mt-3 text-3xl">{step.title}</h3>
                    <p className="mt-3 leading-relaxed text-fg/65">{step.body}</p>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
