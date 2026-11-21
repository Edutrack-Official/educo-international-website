import { MapPin, Phone, Star } from "lucide-react";
import { Wordmark } from "@/components/ui/logo-mark";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/brand-icons";
import { navLinks, programs, reviewsLink, site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="island grain relative overflow-hidden pb-28 pt-20 sm:pb-12">
      <div aria-hidden className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-[120px]" />
      <div className="wrap relative">
        <p aria-hidden className="display pointer-events-none select-none text-[clamp(3.6rem,14vw,12rem)] italic leading-[0.85] text-fg/[0.06]">
          Excellence, together.
        </p>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Wordmark />
            <p className="display mt-5 text-lg italic text-gold">&ldquo;{site.motto}&rdquo;</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-fg/60">{site.tagline}. In {site.address.short}.</p>
            <a
              href={whatsappLink("Hi Educo, I'd like to book a counselling session.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-ink transition-transform hover:-translate-y-0.5"
            >
              <WhatsappIcon className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <a
              href={reviewsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-fit items-center gap-2 text-sm font-semibold text-fg/75 transition-colors hover:text-gold"
            >
              <Star className="h-4 w-4 fill-current text-gold" aria-hidden /> {site.rating.value} on Google · {site.rating.count} reviews
            </a>
            <div className="mt-3 flex items-center gap-4 text-sm font-semibold text-fg/75">
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold">
                <InstagramIcon className="h-4 w-4" /> Instagram
              </a>
              <a href={site.threads.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold">
                <span aria-hidden className="text-base leading-none">@</span> Threads
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-fg/40">Explore</p>
            <ul className="mt-4 grid gap-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-fg/75 transition-colors hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-fg/40">Programmes</p>
            <ul className="mt-4 grid gap-2.5">
              <li>
                <a href="#kids" className="text-fg/75 transition-colors hover:text-gold">
                  Kids summer camp
                </a>
              </li>
              {programs.map((p) => (
                <li key={p.id}>
                  <a href="#programs" className="text-fg/75 transition-colors hover:text-gold">
                    {p.kicker}
                  </a>
                </li>
              ))}
              <li>
                <a href="#tests" className="text-fg/75 transition-colors hover:text-gold">
                  IELTS · OET · TOEFL
                </a>
              </li>
              <li>
                <a href="#tests" className="text-fg/75 transition-colors hover:text-gold">
                  PTE · Duolingo · GRE · GMAT
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-fg/40">Visit</p>
            <address className="mt-4 flex gap-3 not-italic text-fg/75">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
              <span>
                {site.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </span>
            </address>
            <div className="mt-4 flex gap-3">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
              {site.phones.map((p) => (
                <a key={p.href} href={`tel:${p.href}`} className="font-semibold hover:text-gold">
                  {p.display}
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-fg/50">{site.hours}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-fg/10 pt-8 text-sm text-fg/45">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
