"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { learnerBands, whatsappLink } from "@/lib/site";

const PHONICS = [
  { letter: "A", sound: "/æ/", word: "apple" },
  { letter: "B", sound: "/b/", word: "book" },
  { letter: "S", sound: "/s/", word: "sun" },
  { letter: "Sh", sound: "/ʃ/", word: "ship" },
  { letter: "Th", sound: "/θ/", word: "think" },
];

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading
          id="skills-heading"
          eyebrow="Young learners & English for all ages"
          title="Confidence starts"
          accent="with a single word."
          intro="Spoken English for every age group, plus the foundations children carry for life: phonics, handwriting and the courage to speak on stage."
        />

        {/* Three living tiles */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <Reveal>
            <Tile title="Phonics" body="Hear it, say it, read it. Sounds before spellings, so reading feels natural.">
              <PhonicsCycle />
            </Tile>
          </Reveal>
          <Reveal delay={0.08}>
            <Tile title="Handwriting" body="Letter formation, spacing and flow, practised until neat writing is a habit.">
              <Handwriting />
            </Tile>
          </Reveal>
          <Reveal delay={0.16}>
            <Tile title="Public speaking" body="Structure, voice and stage presence, from the classroom to the interview room.">
              <Waveform />
            </Tile>
          </Reveal>
        </div>

        {/* Age bands */}
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr_1fr_0.9fr]">
          {learnerBands.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div className="group h-full rounded-[1.75rem] border border-fg/10 bg-surface p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/40">
                <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-gold">{b.age}</span>
                <h3 className="display mt-5 text-2xl">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg/65">{b.body}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {b.tags.map((t) => (
                    <span key={t} className="rounded-full border border-fg/12 px-2.5 py-1 text-xs font-semibold text-fg/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.24}>
            <div className="island grain relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7">
              <Users className="h-7 w-7 text-gold" aria-hidden />
              <h3 className="display mt-5 text-2xl">Parents, too.</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg/65">
                Parent education & support: we keep families informed, and show you how to help at home.
              </p>
              <a
                href={whatsappLink("Hi Educo, I'd like to know about classes for my child.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-semibold text-gold hover:underline"
              >
                Ask about classes →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Tile({ title, body, children }: { title: string; body: string; children: React.ReactNode }) {
  return (
    <div className="group h-full overflow-hidden rounded-[1.75rem] border border-fg/10 bg-surface shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative grid h-48 place-items-center overflow-hidden bg-gradient-to-br from-accent/[0.07] via-transparent to-gold/[0.12]">{children}</div>
      <div className="p-7">
        <h3 className="display text-2xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-fg/65">{body}</p>
      </div>
    </div>
  );
}

function PhonicsCycle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % PHONICS.length), 2000);
    return () => window.clearInterval(id);
  }, []);
  const p = PHONICS[i];
  return (
    <div className="flex items-center gap-5" aria-hidden>
      <div className="relative grid h-28 w-28 place-items-center [perspective:600px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={p.letter}
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="display grid h-28 w-28 place-items-center rounded-3xl bg-accent text-6xl text-accent-ink shadow-lift"
          >
            {p.letter}
          </motion.span>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={p.word}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <p className="display text-3xl italic text-gold">{p.sound}</p>
          <p className="mt-1 text-lg font-semibold">{p.word}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Handwriting() {
  return (
    <svg viewBox="0 0 320 120" className="w-[85%]" aria-hidden>
      <line x1="10" y1="88" x2="310" y2="88" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="4 6" />
      <line x1="10" y1="40" x2="310" y2="40" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 6" />
      <text
        x="160"
        y="86"
        textAnchor="middle"
        className="display write-text italic"
        style={{ fontSize: 72 }}
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.4"
      >
        Hello!
      </text>
    </svg>
  );
}

function Waveform() {
  const bars = Array.from({ length: 23 }, (_, i) => i);
  return (
    <div className="flex h-24 items-center gap-1.5" aria-hidden>
      {bars.map((i) => {
        const h = 30 + Math.round(Math.abs(Math.sin(i * 0.7)) * 70);
        return (
          <span
            key={i}
            className="eq block w-1.5 rounded-full bg-gradient-to-t from-accent to-gold"
            style={{ height: `${h}%`, "--d": `${(i % 6) * 0.12}s` } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}
