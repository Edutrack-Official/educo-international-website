"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { highlights, kidsClub, site } from "@/lib/site";

const r = (n: number) => Math.round(n * 100) / 100;

/** Confetti bits for the summer-camp card (fixed positions, no randomness). */
const CONFETTI = Array.from({ length: 18 }, (_, i) => ({
  x: (i * 37) % 100,
  y: (i * 53) % 100,
  c: ["#f2b33d", "#e4677a", "#3d8fd6", "#2e9d6b", "#9b5de5"][i % 5],
  rot: (i * 47) % 360,
  d: r((i % 6) * 0.7),
  t: 5 + (i % 4),
  round: i % 3 === 0,
}));

export function KidsClub() {
  const [camp, ...rest] = kidsClub;

  return (
    <section id="kids" aria-labelledby="kids-heading" className="relative overflow-hidden bg-surface-2/60 py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading
          id="kids-heading"
          eyebrow="Kids Club"
          title="Where learning"
          accent="feels like play."
          intro="Summer camps, creative workshops and certificate days. The moments our young learners (and their parents) remember."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          {/* Summer camp feature */}
          <Reveal>
            <div className="relative h-full min-h-[26rem] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ffd27a] via-[#f7a35c] to-[#e4677a] p-8 text-[#2a1606] shadow-lift sm:p-10">
              {CONFETTI.map((p, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="float absolute opacity-80"
                  style={
                    {
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      width: p.round ? 8 : 10,
                      height: p.round ? 8 : 4,
                      background: p.c,
                      borderRadius: p.round ? 999 : 2,
                      rotate: `${p.rot}deg`,
                      "--d": `${-p.d}s`,
                      "--t": `${p.t}s`,
                    } as React.CSSProperties
                  }
                />
              ))}

              {/* Spinning sun */}
              <svg aria-hidden viewBox="0 0 200 200" className="absolute -right-10 -top-10 h-56 w-56 sm:h-64 sm:w-64">
                <g className="spin-slow" style={{ transformOrigin: "100px 100px", "--t": "24s" } as React.CSSProperties}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <rect key={i} x="96" y="6" width="8" height="34" rx="4" fill="#fff4cf" transform={`rotate(${i * 30} 100 100)`} />
                  ))}
                </g>
                <circle cx="100" cy="100" r="46" fill="#fff4cf" />
                <circle cx="84" cy="94" r="4.5" fill="#2a1606" />
                <circle cx="116" cy="94" r="4.5" fill="#2a1606" />
                <path d="M82 112 Q100 128 118 112" stroke="#2a1606" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>

              <div className="relative flex h-full flex-col">
                <span className="w-fit rounded-full bg-[#2a1606] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#ffd27a]">
                  Every summer · limited seats
                </span>
                <h3 className="display mt-6 max-w-sm text-[clamp(2.4rem,5vw,3.6rem)] leading-[0.98]">
                  Summer camp <span className="italic">for kids</span>
                </h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-[#2a1606]/80">{camp.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Spoken English", "Phonics", "Handwriting", "Art & craft", "Drama", "Games"].map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.3 + i * 0.07 }}
                      className="rounded-full bg-white/60 px-3.5 py-1.5 text-sm font-semibold backdrop-blur"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
                <div className="mt-auto pt-8">
                  <a
                    href={`tel:${site.phones[0].href}`}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-[#2a1606] px-6 py-3.5 font-semibold text-[#ffd27a] transition-transform hover:-translate-y-0.5"
                  >
                    <Phone className="h-4 w-4" aria-hidden /> Reserve a seat: {site.phones[0].display}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Other activities */}
          <div className="grid gap-5">
            {rest.map((k, i) => (
              <motion.div
                key={k.title}
                initial={{ opacity: 0, x: 40, rotate: 2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-start gap-5 rounded-[1.75rem] border border-fg/10 bg-surface p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <span
                  aria-hidden
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-3xl transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110"
                  style={{ background: `color-mix(in oklab, ${k.hue} 22%, transparent)` }}
                >
                  {k.emoji}
                </span>
                <div>
                  <h3 className="display text-2xl">{k.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg/65">{k.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Instagram highlights */}
        <Reveal delay={0.1}>
          <div className="mt-14 rounded-[2rem] border border-fg/10 bg-surface p-6 shadow-card sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="display text-2xl">See it all on Instagram</p>
                <p className="mt-1 text-sm text-fg/60">Workshops, camps, reviews and classroom moments.</p>
              </div>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f2b33d] via-[#e4677a] to-[#9b5de5] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <InstagramIcon className="h-4 w-4" /> Follow @{site.instagram.handle}
              </a>
            </div>
            <div className="-mx-2 mt-6 flex gap-5 overflow-x-auto px-2 pb-2 [scrollbar-width:none]">
              {highlights.map((h, i) => (
                <a
                  key={h.label}
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-20 shrink-0 flex-col items-center gap-2 text-center"
                >
                  <span className="story-ring grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full p-[3px]" style={{ animationDelay: `${-i * 0.5}s` }}>
                    <span aria-hidden className="grid h-full w-full place-items-center rounded-full border-[3px] border-surface bg-surface-2 text-2xl transition-transform duration-500 group-hover:scale-90">
                      {h.icon}
                    </span>
                  </span>
                  <span className="text-xs font-semibold leading-tight text-fg/70">{h.label}</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
