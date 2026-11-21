"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { faqs, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative py-24 sm:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="faq-heading"
            eyebrow="FAQ"
            title="Questions families"
            accent="often ask."
            intro="Can't find what you're looking for? Call us. A real person picks up."
          />
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-2">
              {site.phones.map((p) => (
                <a
                  key={p.href}
                  href={`tel:${p.href}`}
                  className="rounded-full border border-fg/12 px-4 py-2 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  {p.display}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="divide-y divide-fg/10 border-y border-fg/10">
          {faqs.map((f, k) => {
            const isOpen = open === k;
            return (
              <Reveal key={f.q} delay={k * 0.05} distance={14}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : k)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${k}`}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={cn("text-lg font-semibold transition-colors sm:text-xl", isOpen ? "text-accent" : "group-hover:text-accent")}>
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-out-expo",
                        isOpen ? "rotate-45 border-accent bg-accent text-accent-ink" : "border-fg/15",
                      )}
                    >
                      <Plus className="h-4 w-4" aria-hidden />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${k}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 leading-relaxed text-fg/65">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
