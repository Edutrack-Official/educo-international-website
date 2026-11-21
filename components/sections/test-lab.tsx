"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { Check, Globe2, Monitor } from "lucide-react";
import { Eyebrow } from "@/components/ui/section-heading";
import { Reveal, Words } from "@/components/ui/reveal";
import { tests, whatsappLink, type Test } from "@/lib/site";
import { cn } from "@/lib/utils";

const r = (n: number) => Math.round(n * 100) / 100;

/** Gauge geometry: a 240° arc. */
const CX = 160;
const CY = 160;
const R = 128;
const START = 150; // degrees, measured clockwise from +x
const SWEEP = 240;

function polar(deg: number, rad = R) {
  const a = (deg * Math.PI) / 180;
  return { x: r(CX + rad * Math.cos(a)), y: r(CY + rad * Math.sin(a)) };
}
const A0 = polar(START);
const A1 = polar(START + SWEEP);
const TRACK = `M${A0.x} ${A0.y} A${R} ${R} 0 1 1 ${A1.x} ${A1.y}`;

export function TestLab() {
  const [active, setActive] = useState(0);
  const t = tests[active];

  return (
    <section id="tests" aria-labelledby="tests-heading" className="island grain relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="drift absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[#2a3fa8]/40 blur-[120px]" />
      <div aria-hidden className="bg-grid mask-fade absolute inset-0 opacity-30" />

      <div className="wrap relative">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <Eyebrow>The test lab</Eyebrow>
            </Reveal>
            <h2 id="tests-heading" className="display mt-5 text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02]">
              <Words text="Seven exams." accent="One goal: your score." />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-lg text-lg leading-relaxed text-fg/65 lg:justify-self-end">
              Pick a test to see how it works. Then let us coach you through it, with practice under real exam conditions
              and feedback after every attempt.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div role="tablist" aria-label="Exams" className="mt-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            {tests.map((x, i) => (
              <button
                key={x.id}
                role="tab"
                type="button"
                aria-selected={active === i}
                aria-controls="test-panel"
                onClick={() => setActive(i)}
                className={cn(
                  "relative shrink-0 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] transition-colors",
                  active === i ? "text-accent-ink" : "text-fg/60 hover:text-fg",
                )}
              >
                {active === i && (
                  <motion.span layoutId="test-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 360, damping: 32 }} />
                )}
                {active !== i && <span className="absolute inset-0 rounded-full border border-fg/12" />}
                <span className="relative">{x.name}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div id="test-panel" role="tabpanel" className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-fg/10 bg-surface/70 p-6 backdrop-blur sm:p-8">
              <Gauge test={t} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full rounded-[2rem] border border-fg/10 bg-surface/70 p-6 backdrop-blur sm:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{t.scoreLabel}</p>
                  <h3 className="display mt-3 text-4xl sm:text-5xl">{t.name}</h3>
                  <p className="mt-2 text-fg/55">{t.full}</p>

                  <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-fg/45">Sections</p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {t.sections.map((s, i) => (
                      <motion.li
                        key={s}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.07 }}
                        className="flex items-center gap-3 rounded-xl border border-fg/10 bg-fg/[0.03] px-4 py-3"
                      >
                        <Check className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                        {s}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Fact icon={<Monitor className="h-4 w-4" />} label="Format" value={t.format} />
                    <Fact icon={<Globe2 className="h-4 w-4" />} label="Accepted for" value={t.usedFor} />
                  </div>

                  <a
                    href={whatsappLink(`Hi Educo, I'd like to join your ${t.name} coaching.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
                  >
                    Join {t.name} coaching
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-fg/[0.04] p-4">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
        {icon}
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-fg/75">{value}</p>
    </div>
  );
}

/** Score dial: the needle sweeps to an example target score whenever the test changes. */
function Gauge({ test }: { test: Test }) {
  const frac = (test.target - test.min) / (test.max - test.min);
  const progress = useMotionValue(0);
  const [shown, setShown] = useState(test.min);

  useEffect(() => {
    progress.set(0);
    const controls = animate(progress, frac, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(test.min + v * (test.max - test.min)),
    });
    return () => controls.stop();
  }, [test, frac, progress]);

  // The needle is drawn pointing up (270°); rotate it onto the arc.
  const needle = useRef<SVGGElement>(null);
  useMotionValueEvent(progress, "change", (v) => {
    needle.current?.setAttribute("transform", `rotate(${r(START + v * SWEEP - 270)} ${CX} ${CY})`);
  });
  const dash = useTransform(progress, (v) => `${v} 1`);
  const decimals = test.max <= 9 ? 1 : 0;

  const ticks = Array.from({ length: 41 }, (_, i) => {
    const deg = START + (i / 40) * SWEEP;
    const major = i % 5 === 0;
    const a = polar(deg, R + 12);
    const b = polar(deg, R + (major ? 24 : 18));
    return { a, b, major, i };
  });

  const labels = [0, 0.25, 0.5, 0.75, 1].map((f) => {
    const p = polar(START + f * SWEEP, R - 26);
    const v = test.min + f * (test.max - test.min);
    return { ...p, v: decimals ? r(v).toString() : Math.round(v).toString() };
  });

  return (
    <div className="relative mx-auto max-w-md">
      <svg viewBox="0 0 320 300" className="w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="gauge-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--gold)" />
            <stop offset="100%" stopColor="var(--gold-2)" />
          </linearGradient>
        </defs>
        {ticks.map((k) => (
          <line
            key={k.i}
            x1={k.a.x}
            y1={k.a.y}
            x2={k.b.x}
            y2={k.b.y}
            stroke="currentColor"
            strokeOpacity={k.major ? 0.45 : 0.18}
            strokeWidth={k.major ? 1.6 : 1}
          />
        ))}
        <path d={TRACK} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="14" strokeLinecap="round" />
        <motion.path
          d={TRACK}
          pathLength={1}
          fill="none"
          stroke="url(#gauge-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          style={{ strokeDasharray: dash }}
        />
        {labels.map((l) => (
          <text key={l.v + l.x} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="middle" className="fill-current text-[11px] opacity-50">
            {l.v}
          </text>
        ))}
        <g ref={needle} transform={`rotate(${START - 270} ${CX} ${CY})`}>
          <path d={`M${CX - 4} ${CY} L${CX} ${CY - R + 18} L${CX + 4} ${CY} Z`} fill="var(--gold-2)" />
        </g>
        <circle cx={CX} cy={CY} r="10" fill="var(--gold)" />
        <circle cx={CX} cy={CY} r="4" fill="var(--bg)" />
      </svg>

      <div className="-mt-14 text-center">
        <p className="display text-6xl tabular-nums text-gold sm:text-7xl">{shown.toFixed(decimals)}</p>
        <p className="mt-2 text-sm text-fg/55">
          Example target score on the {test.name} scale ({test.min}–{test.max})
        </p>
      </div>
    </div>
  );
}
