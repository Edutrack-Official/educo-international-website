"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { ArrowUpRight, Compass, HeartHandshake, Layers, ShieldCheck, Star } from "lucide-react";
import { Eyebrow } from "@/components/ui/section-heading";
import { Reveal, Words } from "@/components/ui/reveal";
import { reviewsLink, site } from "@/lib/site";

const PROMISES = [
  { icon: Layers, title: "One desk, every step", body: "Counselling, test prep, applications and loans, without being passed around." },
  { icon: Compass, title: "Honest guidance", body: "Advice built on your marks, budget and goals, not on what's easiest to sell." },
  { icon: HeartHandshake, title: "Families included", body: "Parents are welcome in every conversation and kept informed throughout." },
  { icon: ShieldCheck, title: "Every age, every level", body: "From a child's first phonics lesson to a professional's GMAT." },
];

export function Reviews() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const [val, setVal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const a = animate(0, site.rating.value, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: setVal });
    const b = animate(0, site.rating.count, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setCount(Math.round(v)) });
    return () => {
      a.stop();
      b.stop();
    };
  }, [inView]);

  const pct = (val / 5) * 100;

  return (
    <section aria-labelledby="reviews-heading" className="relative overflow-hidden py-24 sm:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div ref={ref}>
          <Reveal>
            <Eyebrow>What families say</Eyebrow>
          </Reveal>
          <h2 id="reviews-heading" className="display mt-5 text-[clamp(2.2rem,4.8vw,3.8rem)] leading-[1.02]">
            <Words text="Trusted by students" accent="and their parents." />
          </h2>

          <div className="mt-10 flex items-end gap-6">
            <p className="display text-[clamp(6rem,14vw,10rem)] leading-[0.8] text-gold tabular-nums">{val.toFixed(1)}</p>
            <div className="pb-3">
              {/* Stars fill left to right as the number counts up */}
              <div className="relative w-fit" aria-label={`${site.rating.value} out of 5 stars`} role="img">
                <div className="flex gap-1 text-fg/15">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-7 w-7 fill-current" />
                  ))}
                </div>
                <div className="absolute inset-0 flex gap-1 overflow-hidden text-gold" style={{ width: `${pct}%` }}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-7 w-7 shrink-0 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-fg/65">
                from <span className="font-semibold text-fg tabular-nums">{count}</span> Google reviews
              </p>
            </div>
          </div>

          <Reveal delay={0.1}>
            <a
              href={reviewsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-2 rounded-full border border-fg/15 px-6 py-3.5 font-semibold transition-colors hover:border-gold hover:text-gold"
            >
              Read the reviews on Google
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" aria-hidden />
            </a>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PROMISES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={i % 2 ? "sm:translate-y-10" : ""}
            >
              <div className="group h-full rounded-[1.75rem] border border-fg/10 bg-surface p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-gold transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                  <p.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="display mt-5 text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg/65">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
