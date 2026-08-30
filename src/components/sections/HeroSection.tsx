"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { profileData } from "@/content/portfolioData";
import { 
  FileText, 
  Sparkles, 
  BookOpen, 
  ShieldCheck,
  ChevronRight,
  Activity,
  Layers
} from "lucide-react";
import { GithubIcon, LinkedinIcon, ResearchGateIcon, OrcidIcon } from "@/components/ui/BrandIcons";

const HeroParticleAvatar = dynamic(
  () => import("../3d/HeroParticleAvatar").then((mod) => mod.HeroParticleAvatar),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[540px] sm:h-[620px] flex flex-col items-center justify-center bg-[#0B0A0C] text-[#A69C93]">
        <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37]/50 animate-pulse flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#6E1423]/40" />
        </div>
        <p className="text-xs font-mono mt-4 text-[#D4AF37]">
          Calibrating 3D Evidential Point Mesh...
        </p>
      </div>
    ),
  }
);

interface HeroSectionProps {
  onToggleReviewerMode: () => void;
  onOpenContact: () => void;
}

export function HeroSection({ onToggleReviewerMode, onOpenContact }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen pt-28 pb-16 overflow-hidden flex flex-col justify-between">
      {/* Background Cinematic Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[850px] bg-[#6E1423]/15 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline & Vision */}
          <div className="lg:col-span-6 space-y-6 text-left resolve-in">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151316] border border-[#6E1423]/80 text-xs font-medium text-[#EDE7DD] shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span>B.Sc. CSE Final Year (CGPA 3.84/4.00) • DIU • NBTC (RA) • HIRL</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-serif font-bold text-[#EDE7DD] tracking-tight leading-[1.12]">
              I build medical AI that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EDE7DD] via-[#FFF2A3] to-[#D4AF37]">
                knows what it doesn&apos;t know.
              </span>
            </h1>

            {/* Core Subtitle */}
            <p className="text-base sm:text-lg text-[#A69C93] leading-relaxed font-body">
              Specialized in <strong className="text-[#EDE7DD]">Evidential Deep Learning</strong>, <strong className="text-[#EDE7DD]">Uncertainty Quantification</strong>, and <strong className="text-[#EDE7DD]">Knowledge Distillation</strong> for trustworthy clinical diagnosis in resource-constrained environments.
            </p>

            {/* Novel Vision & Thesis Callout (Replacing transactional banner) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#151316] to-[#1C191E] border border-[#D4AF37]/35 flex items-start gap-3.5 text-xs text-[#EDE7DD] shadow-xl">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#FFF2A3] text-sm block mb-0.5">
                  Core Research Objective: Eliminating Silent Diagnostic Misclassification
                </strong>
                <span className="text-[#A69C93] leading-relaxed">
                  Parameterizing Dirichlet belief priors over vision transformers and neural ensembles to turn black-box classifiers into self-aware diagnostic triage systems.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6E1423] to-[#941B32] hover:brightness-110 text-[#EDE7DD] text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-[0_0_25px_rgba(142,28,48,0.5)] active:scale-95 border border-[#8E1C30]"
              >
                <span>Read Biography & Vision</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <Link
                href="/cv"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151316] hover:bg-[#1C191E] border border-white/10 hover:border-[#D4AF37]/60 text-xs sm:text-sm font-semibold text-[#EDE7DD] transition-all shadow-md"
              >
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <span>Academic CV</span>
              </Link>

              <button
                onClick={onToggleReviewerMode}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151316] hover:bg-[#1C191E] border border-[#D4AF37]/40 text-xs sm:text-sm font-semibold text-[#E5BE38] transition-all shadow-md"
              >
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span>Reviewer Mode</span>
              </button>
            </div>

            {/* Verified External Profile Badges */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-[#A69C93]">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#A69C93]">
                Profiles:
              </span>
              <a
                href={profileData.contacts.researchGate}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#EDE7DD] inline-flex items-center gap-1.5 transition-colors"
              >
                <ResearchGateIcon className="w-3.5 h-3.5 text-[#00CCBB]" />
                <span>ResearchGate</span>
              </a>
              <a
                href={profileData.contacts.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#EDE7DD] inline-flex items-center gap-1.5 transition-colors"
              >
                <OrcidIcon className="w-3.5 h-3.5" />
                <span>ORCID</span>
              </a>
              <a
                href={profileData.contacts.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#EDE7DD] inline-flex items-center gap-1.5 transition-colors"
              >
                <span className="text-[#D4AF37]">Scholar</span>
              </a>
              <a
                href={profileData.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#EDE7DD] inline-flex items-center gap-1.5 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={profileData.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#EDE7DD] inline-flex items-center gap-1.5 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#0077B5]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Holographic Portrait with Click-to-Morph */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <HeroParticleAvatar />
          </div>
        </div>
      </div>

      {/* Institutional Affiliation Logo Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 pt-8 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] uppercase font-mono tracking-widest text-[#A69C93]">
            Research & Institutional Affiliations:
          </span>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6 sm:gap-8 opacity-85 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 bg-white rounded p-0.5">
                <Image
                  src="/assets/logos/diu_logo.svg"
                  alt="DIU Logo"
                  fill
                  sizes="28px"
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-semibold text-[#EDE7DD]">DIU</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded overflow-hidden">
                <Image
                  src="/assets/logos/NBTC_logo.jpg"
                  alt="NBTC Logo"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-[#EDE7DD]">NBTC</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded overflow-hidden">
                <Image
                  src="/assets/logos/hirl_logo.png"
                  alt="HIRL DIU Logo"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-[#EDE7DD]">HIRL</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 bg-white rounded p-0.5">
                <Image
                  src="/assets/logos/IEEEBDS_logo.png"
                  alt="IEEE BDS Logo"
                  fill
                  sizes="28px"
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-semibold text-[#EDE7DD]">IEEE BDS</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded overflow-hidden">
                <Image
                  src="/assets/logos/becithcon-2026_logo.jpg"
                  alt="BECITHCON 2026 Logo"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-[#EDE7DD]">BECITHCON 2026</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded overflow-hidden">
                <Image
                  src="/assets/logos/keyoon_logo.jpg"
                  alt="Keyoon.com Logo"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-[#EDE7DD]">Keyoon.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
