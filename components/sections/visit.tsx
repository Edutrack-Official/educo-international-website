"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowUpRight, Check, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { WhatsappIcon } from "@/components/ui/brand-icons";
import { mapsEmbed, mapsLink, programs, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const CONCERNS = [...new Set(programs.flatMap((p) => p.items.map((i) => i.name))), "Something else"];
const TIMES = ["Morning", "Afternoon", "Evening"] as const;
const WHO = ["Myself", "My child", "Parent enquiry"] as const;

type Fields = { name: string; phone: string; concern: string; time: string; who: string; note: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please tell us your name.";
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 12) e.phone = "Enter a 10-digit mobile number.";
  if (!v.concern) e.concern = "Pick what you are interested in.";
  return e;
}

/**
 * The site is static, so the booking form doesn't post anywhere: it writes a
 * tidy WhatsApp message to the clinic and opens it, ready to send.
 */
export function Visit() {
  const [v, setV] = useState<Fields>({ name: "", phone: "", concern: "", time: "Evening", who: "Myself", note: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);
  const [shake, setShake] = useState(0);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...v, [k]: e.target.value };
    setV(next);
    if (tried) setErrors(validate(next));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setShake((n) => n + 1);
      return;
    }

    const details = [
      `Name: ${v.name.trim()}`,
      `Phone: ${v.phone.trim()}`,
      `Interested in: ${v.concern}`,
      `For: ${v.who}`,
      `Preferred time: ${v.time}`,
      v.note.trim() && `Notes: ${v.note.trim()}`,
    ].filter(Boolean);
    const message = [`Hello ${site.legalName}, I'd like to book a counselling session.`, "", ...details].join("\n");
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
    window.setTimeout(() => setSent(false), 3500);
  };

  const field =
    "w-full rounded-2xl border bg-bg px-4 py-3.5 text-base outline-none transition-colors placeholder:text-fg/35 focus:border-accent focus:ring-4 focus:ring-accent/15";

  return (
    <section id="visit" aria-labelledby="visit-heading" className="relative overflow-hidden bg-surface-2/60 py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading
          id="visit-heading"
          eyebrow="Book & visit"
          title="Your journey starts"
          accent="with one conversation."
          intro="Send us your details and we'll confirm a counselling slot on WhatsApp. Or just call, whichever is easier."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Booking form */}
          <Reveal>
            <form onSubmit={submit} noValidate className="h-full rounded-[2rem] border border-fg/10 bg-surface p-6 shadow-card sm:p-9">
              <h3 className="display text-3xl">Book a counselling session</h3>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field label="Your name" error={errors.name} id="f-name">
                  <input id="f-name" autoComplete="name" value={v.name} onChange={set("name")} className={cn(field, errors.name ? "border-red-500/70" : "border-fg/12")} placeholder="Full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "f-name-err" : undefined} />
                </Field>
                <Field label="Mobile number" error={errors.phone} id="f-phone">
                  <input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} className={cn(field, errors.phone ? "border-red-500/70" : "border-fg/12")} placeholder="98765 43210" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "f-phone-err" : undefined} />
                </Field>
                <Field label="What are you interested in?" error={errors.concern} id="f-concern" className="sm:col-span-2">
                  <select id="f-concern" value={v.concern} onChange={set("concern")} className={cn(field, "appearance-none", errors.concern ? "border-red-500/70" : "border-fg/12", !v.concern && "text-fg/40")} aria-invalid={!!errors.concern} aria-describedby={errors.concern ? "f-concern-err" : undefined}>
                    <option value="">Select a programme</option>
                    {CONCERNS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <fieldset className="sm:col-span-2">
                  <legend className="mb-2 text-sm font-semibold">Who is it for?</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {WHO.map((t) => (
                      <label
                        key={t}
                        className={cn(
                          "cursor-pointer rounded-2xl border px-3 py-3 text-center text-sm font-semibold transition-all has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/25",
                          v.who === t ? "border-accent bg-accent text-accent-ink" : "border-fg/12 bg-bg hover:border-accent/50",
                        )}
                      >
                        <input type="radio" name="who" value={t} checked={v.who === t} onChange={set("who")} className="sr-only" />
                        {t}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset className="sm:col-span-2">
                  <legend className="mb-2 text-sm font-semibold">Preferred time</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {TIMES.map((t) => (
                      <label
                        key={t}
                        className={cn(
                          "cursor-pointer rounded-2xl border px-3 py-3 text-center text-sm font-semibold transition-all has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/25",
                          v.time === t ? "border-accent bg-accent text-accent-ink" : "border-fg/12 bg-bg hover:border-accent/50",
                        )}
                      >
                        <input type="radio" name="time" value={t} checked={v.time === t} onChange={set("time")} className="sr-only" />
                        {t}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <Field label="Anything we should know? (optional)" id="f-note" className="sm:col-span-2">
                  <textarea id="f-note" rows={3} value={v.note} onChange={set("note")} className={cn(field, "resize-none border-fg/12")} placeholder="e.g. MS in Computer Science, Canada, September intake" />
                </Field>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <motion.span
                  key={shake}
                  className="inline-flex"
                  animate={shake ? { x: [0, -10, 9, -6, 4, 0] } : undefined}
                  transition={{ duration: 0.45 }}
                >
                  <Magnetic strength={0.2}>
                    <Button type="submit" className="min-w-[13.5rem]">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={sent ? "sent" : "idle"}
                          initial={{ y: 14, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -14, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="inline-flex items-center gap-2"
                        >
                          {sent ? (
                            <>
                              <Check className="h-4 w-4" aria-hidden /> Opening WhatsApp
                            </>
                          ) : (
                            <>
                              <WhatsappIcon className="h-4 w-4" /> Send on WhatsApp
                            </>
                          )}
                        </motion.span>
                      </AnimatePresence>
                    </Button>
                  </Magnetic>
                </motion.span>
                <p className="text-sm text-fg/50">Opens WhatsApp with your message ready to send.</p>
              </div>
            </form>
          </Reveal>

          {/* Location */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-fg/10 bg-surface shadow-card">
              <div className="relative h-64 shrink-0 bg-surface-2 sm:h-72">
                <iframe
                  title={`Map showing ${site.legalName}`}
                  src={mapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0 grayscale-[30%] dark:invert-[90%] dark:hue-rotate-180"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <address className="not-italic leading-relaxed">
                    <span className="block font-semibold">{site.legalName}</span>
                    {site.address.lines.map((l) => (
                      <span key={l} className="block text-fg/65">
                        {l}
                      </span>
                    ))}
                  </address>
                </div>

                <div className="mt-5 flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Phone className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="flex flex-col">
                    {site.phones.map((p) => (
                      <a key={p.href} href={`tel:${p.href}`} className="display text-2xl hover:text-accent">
                        {p.display}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Clock className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="self-center text-fg/65">{site.hours}. Call ahead to confirm timings.</p>
                </div>

                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  <Button href={mapsLink} variant="secondary">
                    <Navigation className="h-4 w-4" aria-hidden />
                    Get directions
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  id,
  className,
  children,
}: {
  label: string;
  error?: string;
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
