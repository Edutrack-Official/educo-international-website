"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { programs, whatsappLink, type Program } from "@/lib/site";

const ROMAN = ["I", "II", "III", "IV"];
const EASE = [0.22, 1, 0.36, 1] as const;

export function Programs() {
  return (
    <section id="programs" aria-labelledby="programs-heading" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading
          id="programs-heading"
          eyebrow="Four ways we help you grow"
          title="Everything between you"
          accent="and your future."
          intro="A test score, a confident voice, a child's first sentences or a university abroad. It all starts at one desk in Thudiyalur."
        />

        <div className="mt-16 grid gap-6 [perspective:1400px] md:grid-cols-2">
          {programs.map((p, k) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 60, rotateX: 14 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 1, delay: (k % 2) * 0.14, ease: EASE }}
            >
              <ProgramCard p={p} n={ROMAN[k]} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ p, n }: { p: Program; n: string }) {
  return (
    <SpotlightCard className="h-full rounded-[2rem]">
      <span aria-hidden className="glow-ring opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100" />
      <div className="flex h-full flex-col p-7 sm:p-9">
        <div className="flex items-start justify-between">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent text-accent-ink shadow-[0_14px_30px_-14px_var(--accent)]">
            {p.icon === "Plane" ? <PlaneIcon /> : p.icon === "Target" ? <TargetIcon /> : p.icon === "Kite" ? <KiteIcon /> : <MicIcon />}
          </span>
          <span aria-hidden className="num-fill display text-7xl italic leading-none">
            {n}
          </span>
        </div>

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.28em] text-gold">{p.kicker}</p>
        <h3 className="display mt-3 text-[2rem] leading-[1.05]">{p.title}</h3>
        <p className="mt-4 leading-relaxed text-fg/65">{p.summary}</p>

        <span aria-hidden className="mt-7 block h-px origin-left scale-x-50 bg-gradient-to-r from-gold to-transparent transition-transform duration-700 ease-out-expo group-hover/spot:scale-x-100" />

        <ul className="mt-6 grid gap-1">
          {p.items.map((it, i) => (
            <motion.li
              key={it.name}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: EASE }}
              className="group/row -mx-3 flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent/[0.06]"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold transition-transform duration-500 group-hover/row:rotate-[225deg] group-hover/row:scale-150" />
              <span>
                <span className="block font-semibold">{it.name}</span>
                <span className="block text-sm text-fg/55">{it.note}</span>
              </span>
            </motion.li>
          ))}
        </ul>

        <a
          href={whatsappLink(`Hi Educo, I'd like to know more about ${p.kicker.toLowerCase()}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="group/cta mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-accent"
        >
          Ask about {p.kicker.toLowerCase()}
          <span className="grid h-8 w-8 place-items-center rounded-full border border-accent/30 transition-all duration-500 ease-out-expo group-hover/cta:rotate-45 group-hover/cta:bg-accent group-hover/cta:text-accent-ink">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </a>
      </div>
    </SpotlightCard>
  );
}

/* Animated icons -------------------------------------------------------- */

function PlaneIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 26c6-1 11-4 15-9" pathLength={1} strokeOpacity="0.5" className="flight" style={{ strokeDasharray: "0.08 0.06", "--t": "3s" } as React.CSSProperties} />
      <g className="bob">
        <path d="M27.5 5.5 14 12.5l-4.5-1.6-2 1.4 3.6 2.8L9.4 19l1.6.9 3.3-2.3 2.8 3.6 1.4-2-1.6-4.5 7-13.5z" fill="currentColor" fillOpacity="0.15" />
      </g>
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <circle cx="15" cy="17" r="11" className="target-pulse" />
      <circle cx="15" cy="17" r="6.5" className="target-pulse" style={{ "--d": "0.4s" } as React.CSSProperties} />
      <circle cx="15" cy="17" r="2" fill="currentColor" />
      <path d="M15 17 27 5M23 5h4v4" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <rect x="9" y="4" width="8" height="14" rx="4" />
      <path d="M5.5 14a7.5 7.5 0 0 0 15 0M13 21.5V27M9 27h8" />
      {[0, 1, 2].map((i) => (
        <line key={i} x1={24 + i * 2.6} y1="9" x2={24 + i * 2.6} y2="19" className="eq" style={{ "--d": `${i * 0.18}s` } as React.CSSProperties} />
      ))}
    </svg>
  );
}

function KiteIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <g className="kite">
        <path d="M18 3 27 12 18 21 9 12z" fill="currentColor" fillOpacity="0.15" />
        <path d="M18 3v18M9 12h18" strokeOpacity="0.6" />
      </g>
      <path d="M18 21c-1 3-4 3-5 5s-3 3-6 3" pathLength={1} className="flight" style={{ strokeDasharray: "0.1 0.06", "--t": "2.5s" } as React.CSSProperties} />
    </svg>
  );
}
