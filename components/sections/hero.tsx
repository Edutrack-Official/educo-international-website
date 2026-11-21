"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, CalendarCheck, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { reviewsLink, site, whatsappLink } from "@/lib/site";
import { scrollToId } from "@/lib/scroll";

const r = (n: number) => Math.round(n * 100) / 100;

/** Curtain lifts at ~1.2s; hero entrances start just after. */
const T = 1.15;

const SUBJECTS = ["Spoken English", "IELTS", "OET", "Spoken Hindi", "Phonics", "Handwriting", "GRE & GMAT", "TOEFL & PTE"];

export function Hero() {
  const [k, setK] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setK((c) => (c + 1) % SUBJECTS.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="top" className="island grain relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-24 sm:pt-32">
      <Sky />

      <div className="wrap relative grid flex-1 items-center gap-4 pb-10 sm:gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-4">
        <div className="text-center lg:text-left">
          <p className="enter inline-flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.26em] text-gold sm:text-xs sm:tracking-[0.3em]" style={{ "--d": `${T}s` } as React.CSSProperties}>
            <span className="hidden h-px w-10 bg-gold lg:block" />
            Educo International · {site.address.short}
          </p>

          <h1 className="display mt-4 text-[clamp(2.9rem,8.2vw,7rem)] leading-[0.94] sm:mt-6">
            <span className="word-mask">
              <span className="word" style={{ "--d": `${T + 0.1}s` } as React.CSSProperties}>
                Achieving
              </span>
            </span>{" "}
            <span className="word-mask">
              <span className="word" style={{ "--d": `${T + 0.2}s` } as React.CSSProperties}>
                excellence,
              </span>
            </span>
            <br />
            <span className="word-mask">
              <span className="word shine italic" style={{ "--d": `${T + 0.32}s` } as React.CSSProperties}>
                together.
              </span>
            </span>
          </h1>

          <div className="enter mt-5 flex flex-wrap items-center justify-center gap-2.5 text-lg sm:mt-7 sm:gap-3 sm:text-xl lg:justify-start" style={{ "--d": `${T + 0.45}s` } as React.CSSProperties}>
            <span className="text-fg/60">Learn</span>
            <span className="relative inline-flex h-11 min-w-[11.5rem] items-center justify-center overflow-hidden rounded-full border border-gold/40 bg-gold/10 px-5 lg:justify-start">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={SUBJECTS[k]}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="display whitespace-nowrap italic text-gold"
                >
                  {SUBJECTS[k]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-fg/60">with us.</span>
          </div>

          <p className="enter mt-6 hidden max-w-xl text-lg leading-relaxed text-fg/65 sm:block lg:mx-0 sm:mx-auto" style={{ "--d": `${T + 0.55}s` } as React.CSSProperties}>
            Coaching for IELTS, OET, TOEFL, GRE and GMAT. Spoken English and Hindi for every age. Phonics, handwriting,
            summer camps and workshops for kids. And guidance all the way to a university abroad.
          </p>

          <div className="enter mt-7 flex flex-wrap justify-center gap-3 sm:mt-9 lg:justify-start" style={{ "--d": `${T + 0.65}s` } as React.CSSProperties}>
            <Magnetic>
              <Button href={whatsappLink("Hi Educo, I'd like to book a demo / counselling session.")}>
                <CalendarCheck className="h-4 w-4" aria-hidden />
                Book a session
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={`tel:${site.phones[0].href}`} variant="secondary">
                <Phone className="h-4 w-4" aria-hidden />
                {site.phones[0].display}
              </Button>
            </Magnetic>
          </div>

          <div className="enter mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 lg:justify-start" style={{ "--d": `${T + 0.8}s` } as React.CSSProperties}>
            <a
              href={reviewsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-2xl border border-fg/10 bg-fg/[0.04] p-2.5 pr-5 backdrop-blur-sm transition-colors hover:border-gold/50"
            >
              <span className="display grid h-11 w-11 place-items-center rounded-xl bg-gold text-xl text-gold-ink">{site.rating.value}</span>
              <span>
                <span className="flex gap-0.5 text-gold" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </span>
                <span className="mt-0.5 block text-sm text-fg/65 group-hover:text-fg">{site.rating.count} Google reviews</span>
              </span>
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-2xl border border-fg/10 bg-fg/[0.04] px-4 py-4 text-sm font-semibold text-fg/75 backdrop-blur-sm transition-colors hover:border-gold/50 hover:text-gold"
            >
              <InstagramIcon className="h-5 w-5" />@{site.instagram.handle}
            </a>
          </div>
        </div>

        <div className="enter-fade relative order-first mx-auto w-full max-w-[25rem] sm:max-w-[32rem] lg:order-none lg:max-w-[38rem]" style={{ "--d": `${T - 0.2}s` } as React.CSSProperties}>
          <Notebook />
        </div>
      </div>

      <div className="wrap relative pb-8">
        <a
          href="#programs"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("programs");
          }}
          className="enter mx-auto flex w-fit flex-col items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-fg/45 hover:text-gold"
          style={{ "--d": `${T + 1.1}s` } as React.CSSProperties}
        >
          Explore programmes
          <ArrowDown className="float h-4 w-4" aria-hidden style={{ "--t": "2.4s" } as React.CSSProperties} />
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** Deterministic starfield: integer PRNG, so server and client agree exactly. */
let seed = 20261121;
const rand = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};
const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: r(rand() * 100),
  y: r(rand() * 100),
  s: i % 7 === 0 ? 2.5 : i % 3 === 0 ? 1.6 : 1,
  d: r(rand() * 5),
  t: 3 + (i % 5),
}));

/** Letters from English and Hindi drifting up through the sky. */
const GLYPH_SET = ["A", "अ", "b", "Aa", "ए", "?", "C", "क", "z", "!", "IELTS", "Hello", "नमस्ते", "8.0", "abc"];
const GLYPHS = GLYPH_SET.map((ch, i) => ({
  ch,
  x: r(4 + ((i * 61) % 92)),
  size: r(ch.length > 3 ? 1.1 : 1.6 + (i % 4) * 0.7),
  t: 16 + (i % 5) * 4,
  d: r(i * 2.3),
  o: r(0.08 + (i % 3) * 0.045),
}));

function Sky() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div className="drift absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[#2a3fa8]/45 blur-[120px]" />
      <div className="drift absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gold/20 blur-[130px]" style={{ "--d": "-6s" } as React.CSSProperties} />
      <div className="bg-grid mask-fade absolute inset-0 opacity-40" />
      {GLYPHS.map((g, i) => (
        <span
          key={`g-${i}`}
          className="glyph display absolute bottom-0 italic text-gold"
          style={{ left: `${g.x}%`, fontSize: `${g.size}rem`, "--t": `${g.t}s`, "--d": `${-g.d}s`, "--o": g.o } as React.CSSProperties}
        >
          {g.ch}
        </span>
      ))}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="twinkle absolute rounded-full bg-[#f6e3b0]"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, "--d": `${s.d}s`, "--t": `${s.t}s` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

const LINES = ["Achieving", "Excellence", "Together."];
/** Letter flash cards on the right page: English, Hindi, phonics. */
const CARDS = [
  { big: "Aa", sub: "English", hint: "/æ/ apple" },
  { big: "अ", sub: "Hindi", hint: "a · अनार" },
  { big: "Sh", sub: "Phonics", hint: "/ʃ/ ship" },
  { big: "8.0", sub: "IELTS band", hint: "target" },
];

/** Chips that orbit the notebook. Positions are % of the stage. */
const CHIPS = [
  { label: "IELTS", x: 6, y: 14, mx: 0, my: 8, d: 0 },
  { label: "OET", x: 84, y: 6, mx: 80, my: 6, d: 0.8 },
  { label: "Spoken English", x: 74, y: 88, mx: 54, my: 90, d: 1.6 },
  { label: "Spoken Hindi", x: 2, y: 70, mx: 0, my: 74, d: 0.4 },
  { label: "Phonics", x: 90, y: 50, d: 1.2 },
  { label: "GRE · GMAT", x: 40, y: 1, d: 2 },
  { label: "Summer camp ☀", x: 22, y: 92, d: 2.4 },
];

/**
 * The landing animation: an open notebook. The left page writes the motto
 * line by line with a pencil following along; the right page flips through
 * letter cards (English, Hindi, phonics, an IELTS band); and a paper plane
 * takes off from the page and loops around it — learning that goes places.
 */
function Notebook() {
  const [step, setStep] = useState(0); // 0..3 lines written, 4 = hold
  const [card, setCard] = useState(0);

  useEffect(() => {
    let s = 0;
    const tick = () => {
      s = (s + 1) % 6; // 1,2,3 write; 4,5 hold; 0 reset
      setStep(s > 3 ? 3 : s);
    };
    let loop = 0;
    const start = window.setTimeout(() => {
      tick();
      loop = window.setInterval(tick, 1500);
    }, (T + 0.6) * 1000);
    const flip = window.setInterval(() => setCard((n) => (n + 1) % CARDS.length), 1800);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(loop);
      window.clearInterval(flip);
    };
  }, []);

  const c = CARDS[card];
  // Pencil sits at the end of the line being written.
  const pencil = [
    { x: 112, y: 160 },
    { x: 280, y: 160 },
    { x: 290, y: 236 },
    { x: 262, y: 312 },
  ][step];

  return (
    <div className="relative aspect-[6/5] w-full">
      <div aria-hidden className="absolute inset-[14%] rounded-full bg-[#3d5ad6]/30 blur-[70px]" />

      <svg viewBox="0 0 600 500" className="relative h-full w-full overflow-visible" role="img" aria-label="An open notebook writing Achieving Excellence Together, with a paper plane flying around it">
        <defs>
          <linearGradient id="page-l" x1="0" x2="1">
            <stop offset="0%" stopColor="#fbf6ea" />
            <stop offset="88%" stopColor="#f3ead4" />
            <stop offset="100%" stopColor="#e2d4b0" />
          </linearGradient>
          <linearGradient id="page-r" x1="1" x2="0">
            <stop offset="0%" stopColor="#fbf6ea" />
            <stop offset="88%" stopColor="#f3ead4" />
            <stop offset="100%" stopColor="#e2d4b0" />
          </linearGradient>
          <filter id="book-shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="24" stdDeviation="22" floodColor="#000" floodOpacity="0.45" />
          </filter>
          <path id="paper-plane" d="M0 0 L-22 -9 L-16 0 L-22 9 Z M-16 0 L-22 9 L-13 3 Z" />
          {/* Flight loop around the book */}
          <path id="loop" d="M430 150 C 520 40, 610 160, 540 250 S 330 470, 160 430 S -10 300, 60 180 S 300 10, 430 150" />
        </defs>

        {/* Plane's dashed contrail */}
        <use href="#loop" fill="none" stroke="#e6c77d" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 9" />

        <g className="float" style={{ "--t": "7s" } as React.CSSProperties}>
          <g transform="rotate(-4 300 250)" filter="url(#book-shadow)">
            {/* Cover peeking out */}
            <path d="M48 96 Q300 70 552 96 L560 420 Q300 396 40 420 Z" fill="#1c2d78" />
            <path d="M48 96 Q300 70 552 96 L560 420 Q300 396 40 420 Z" fill="none" stroke="#e6c77d" strokeOpacity="0.6" strokeWidth="1.5" />
            {/* Pages */}
            <path d="M60 88 Q180 72 300 92 L300 406 Q180 386 56 404 Z" fill="url(#page-l)" />
            <path d="M300 92 Q420 72 544 88 L548 404 Q420 386 300 406 Z" fill="url(#page-r)" />
            <line x1="300" y1="92" x2="300" y2="406" stroke="#c9b787" strokeWidth="1.5" />

            {/* Ruled lines, left page */}
            {[176, 252, 328].map((y) => (
              <line key={y} x1="82" y1={y} x2="282" y2={y - 2} stroke="#3d5ad6" strokeOpacity="0.22" />
            ))}
            <line x1="100" y1="100" x2="98" y2="396" stroke="#e4677a" strokeOpacity="0.35" />

            {/* Motto, written line by line */}
            {LINES.map((w, i) => (
              <text
                key={w}
                x="108"
                y={168 + i * 76}
                className="display italic"
                style={{
                  fontSize: 40,
                  strokeDasharray: 900,
                  strokeDashoffset: step > i ? 0 : 900,
                  fill: step > i ? "#1c2d78" : "transparent",
                  transition:
                    step > i
                      ? "stroke-dashoffset 1.3s cubic-bezier(.45,0,.3,1), fill .6s ease 1s"
                      : "stroke-dashoffset .01s linear .6s, fill .5s ease",
                }}
                stroke="#1c2d78"
                strokeWidth="1.1"
              >
                {w}
              </text>
            ))}

            {/* Pencil */}
            <g style={{ transform: `translate(${pencil.x}px, ${pencil.y}px)`, transition: "transform 1.3s cubic-bezier(.45,0,.3,1)" }}>
              <g transform="rotate(-38)">
                <rect x="0" y="-6" width="78" height="12" rx="2" fill="#e6c77d" />
                <rect x="66" y="-6" width="14" height="12" fill="#e4677a" />
                <rect x="62" y="-6" width="5" height="12" fill="#b9bcc8" />
                <path d="M0 -6 L-14 0 L0 6 Z" fill="#f3dcae" />
                <path d="M-9 -2.2 L-14 0 L-9 2.2 Z" fill="#1c2d78" />
              </g>
            </g>

            {/* Right page: flash card */}
            <g transform="translate(334 120)">
              <rect width="178" height="170" rx="18" fill="#1c2d78" />
              <rect x="6" y="6" width="166" height="158" rx="14" fill="none" stroke="#e6c77d" strokeOpacity="0.5" />
              <text key={`b-${card}`} x="89" y="98" textAnchor="middle" className="display hero-card" fill="#f6e3b0" style={{ fontSize: c.big.length > 2 ? 58 : 72 }}>
                {c.big}
              </text>
              <text key={`s-${card}`} x="89" y="140" textAnchor="middle" className="hero-card" fill="#fbf6ea" style={{ fontSize: 14, letterSpacing: "0.18em", fontWeight: 700 }}>
                {c.sub.toUpperCase()}
              </text>
            </g>
            <text key={`h-${card}`} x="423" y="318" textAnchor="middle" className="display hero-card italic" fill="#a87b22" style={{ fontSize: 22 }}>
              {c.hint}
            </text>
            {/* Stars sticker */}
            <g transform="translate(486 360)">
              <g className="spin-slow" style={{ "--t": "18s", transformBox: "fill-box", transformOrigin: "center" } as React.CSSProperties}>
                <circle r="26" fill="#e6c77d" />
                <path d="M0 -15 L4.4 -4.8 L15 -4.6 L6.6 2.2 L9.3 12.6 L0 6.6 L-9.3 12.6 L-6.6 2.2 L-15 -4.6 L-4.4 -4.8 Z" fill="#1c2d78" />
              </g>
            </g>
          </g>
        </g>

        {/* Paper planes looping the book */}
        {[0, 4.5].map((b) => (
          <use key={b} href="#paper-plane" fill="#fbf6ea" stroke="#e6c77d" strokeWidth="1">
            <animateMotion dur="9s" begin={`${r(T + 1 + b)}s`} repeatCount="indefinite" rotate="auto">
              <mpath href="#loop" />
            </animateMotion>
          </use>
        ))}
      </svg>

      {/* Orbiting chips */}
      {CHIPS.map((ch, i) => (
        <span
          key={ch.label}
          className={`enter absolute left-[var(--mx)] top-[var(--my)] sm:left-[var(--x)] sm:top-[var(--y)] ${ch.mx === undefined ? "hidden sm:block" : ""}`}
          style={{ "--x": `${ch.x}%`, "--y": `${ch.y}%`, "--mx": `${ch.mx ?? ch.x}%`, "--my": `${ch.my ?? ch.y}%`, "--d": `${T + 0.5 + i * 0.1}s` } as React.CSSProperties}
        >
          <span
            className="float block whitespace-nowrap rounded-full border border-gold/35 bg-[#0c1230]/85 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#f6e3b0] shadow-lg backdrop-blur sm:text-xs"
            style={{ "--t": `${5 + (i % 3)}s`, "--d": `${-ch.d}s` } as React.CSSProperties}
          >
            {ch.label}
          </span>
        </span>
      ))}
    </div>
  );
}
