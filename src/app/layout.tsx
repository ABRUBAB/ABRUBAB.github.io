import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import { papers, profile, socials } from "@/content/data";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const title = "Abdullah Rubab — AI researcher & engineer";
const description =
  "Medical-imaging AI research, intelligent systems and shipped products. Final-year CSE student at Daffodil International University, applying for MSc programmes in Europe and Australia (Sept 2027).";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title,
  description,
  applicationName: "Abdullah Rubab",
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  keywords: [
    "Abdullah Rubab",
    "medical AI",
    "deep learning",
    "evidential deep learning",
    "knowledge distillation",
    "explainable AI",
    "computer vision",
    "Daffodil International University",
    "MSc scholarship",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: profile.site,
    siteName: profile.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const person = {
  "@type": "Person",
  "@id": `${profile.site}/#person`,
  name: profile.name,
  url: profile.site,
  image: `${profile.site}/assets/photos/portrait-card.jpg`,
  jobTitle: "AI researcher & engineer",
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Daffodil International University" },
  knowsAbout: ["Medical image analysis", "Deep learning", "Uncertainty quantification", "Explainable AI", "Knowledge distillation"],
  knowsLanguage: ["Bengali", "English", "Hindi", "Spanish"],
  sameAs: socials.map((s) => s.href),
};

// only work that has actually been published or presented
const articles = papers
  .filter((p) => p.status === "published" || p.status === "presented")
  .map((p) => ({
    "@type": "ScholarlyArticle",
    headline: p.full,
    datePublished: String(p.year),
    isPartOf: { "@type": "Periodical", name: p.venueFull },
    author: { "@id": `${profile.site}/#person` },
    ...(p.doi ? { url: p.doi, sameAs: p.doi } : {}),
  }));

const personLd = { "@context": "https://schema.org", "@graph": [person, ...articles] };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body className="min-h-screen font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }}
        />
        <noscript>
          <style>{`#loader{display:none!important}.reveal,#top *,.sheet,h1 [style],h2 [style],[style*="opacity:0"],[style*="opacity: 0"],[style*="scaleX(0)"],[style*="scaleY(0)"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
