import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abdullahrubab.me"),
  title: "Abdullah Rubab | Medical AI & Uncertainty Quantification Researcher",
  description: "Academic Research Portfolio of Abdullah Rubab — Evidential Deep Learning, Knowledge Distillation, and Uncertainty-Aware Medical AI. Targeting Master's & PhD Scholarships in Europe & Australia.",
  keywords: [
    "Abdullah Rubab",
    "Medical AI",
    "Evidential Deep Learning",
    "Uncertainty Quantification",
    "Knowledge Distillation",
    "Explainable AI",
    "XAI",
    "Daffodil International University",
    "NBTC",
    "Computer Vision",
    "Erasmus Mundus",
    "La Caixa INPhINIT"
  ],
  authors: [{ name: "Abdullah Rubab", url: "https://abdullahrubab.me" }],
  creator: "Abdullah Rubab",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abdullahrubab.me",
    siteName: "Abdullah Rubab — Research Portfolio",
    title: "Abdullah Rubab | Calibrated Confidence in Medical AI",
    description: "I build medical AI that knows what it doesn't know. Evidential Deep Learning & Uncertainty Quantification for resource-limited clinical settings.",
    images: [
      {
        url: "/assets/photos/headshot_photo.jpg",
        width: 1200,
        height: 630,
        alt: "Abdullah Rubab — Medical AI Researcher"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Rubab | Calibrated Confidence in Medical AI",
    description: "I build medical AI that knows what it doesn't know. Evidential Deep Learning & Uncertainty-Aware Medical Imaging.",
    images: ["/assets/photos/headshot_photo.jpg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0B0A0C] text-[#EDE7DD] font-sans antialiased selection:bg-[#6E1423] selection:text-[#EDE7DD]">
        {children}
      </body>
    </html>
  );
}
