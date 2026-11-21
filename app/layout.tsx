import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { ScrollProgress } from "@/components/scroll-progress";
import { Curtain } from "@/components/curtain";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const title = `${site.legalName} — IELTS, OET, Spoken English & Hindi, Kids Classes in Thudiyalur, Coimbatore`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.legalName}` },
  description: site.description,
  keywords: [
    "study abroad consultants Coimbatore",
    "overseas education Thudiyalur",
    "IELTS coaching Coimbatore",
    "OET coaching Coimbatore",
    "spoken Hindi classes Coimbatore",
    "Hindi Prachar Sabha exam coaching",
    "kids summer camp Thudiyalur",
    "PTE coaching Coimbatore",
    "TOEFL coaching",
    "Duolingo English test coaching",
    "GRE GMAT coaching Coimbatore",
    "education loan guidance",
    "spoken English classes Thudiyalur",
    "phonics and handwriting classes Coimbatore",
    "public speaking classes",
  ],
  openGraph: {
    title,
    description: site.description,
    url: site.url,
    siteName: site.legalName,
    locale: "en_IN",
    type: "website",
  },
  icons: { icon: "/logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#070c22",
  colorScheme: "light dark",
};

const bootScript = `(function(){try{if(localStorage.getItem('educo-theme')==='dark')document.documentElement.dataset.theme='dark'}catch(e){}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.legalName,
  slogan: site.motto,
  sameAs: [site.instagram.url, site.threads.url],
  description: site.description,
  url: site.url,
  telephone: site.phones.map((p) => p.href),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.lines[0],
    addressLocality: "Thudiyalur, Coimbatore",
    postalCode: "641034",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${fraunces.variable} ${manrope.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only rounded-full bg-accent px-4 py-2 font-medium text-accent-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300]"
        >
          Skip to content
        </a>
        <Curtain />
        <Providers>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <MobileActionBar />
        </Providers>
      </body>
    </html>
  );
}
