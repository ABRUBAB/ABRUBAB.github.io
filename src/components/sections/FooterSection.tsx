"use client";

import Link from "next/link";
import Image from "next/image";
import { profileData } from "@/content/portfolioData";
import { 
  FileText, 
  Mail, 
  ExternalLink, 
  ArrowUp,
  Sparkles 
} from "lucide-react";
import { GithubIcon, LinkedinIcon, ResearchGateIcon, OrcidIcon } from "@/components/ui/BrandIcons";

export function FooterSection({ onOpenContact }: { onOpenContact: () => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070608] border-t border-white/10 pt-16 pb-12 text-[#EDE7DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Persona & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.25)] bg-[#151316]">
                <Image
                  src="/assets/logos/website_logo.png"
                  alt="Abdullah Rubab Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#EDE7DD]">
                  {profileData.name}
                </h3>
                <p className="text-xs text-[#D4AF37] font-mono">
                  {profileData.title}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A69C93] leading-relaxed max-w-sm">
              &ldquo;{profileData.tagline}&rdquo; — Developing evidential deep learning and uncertainty-governed triage algorithms for safe, trustworthy medical AI.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/cv"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all shadow-md active:scale-95 border border-[#8E1C30]"
              >
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <span>Download CV (PDF)</span>
              </Link>
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151316] hover:bg-[#1C191E] border border-white/10 text-xs font-semibold text-[#EDE7DD] transition-all"
              >
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>Contact Directly</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#D4AF37] font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#A69C93]">
              <li>
                <a href="#about" className="hover:text-[#EDE7DD] transition-colors">
                  About & Vision
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-[#EDE7DD] transition-colors">
                  Research Pillars
                </a>
              </li>
              <li>
                <a href="#publications" className="hover:text-[#EDE7DD] transition-colors">
                  Publications (7)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#EDE7DD] transition-colors">
                  Flagship Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#EDE7DD] transition-colors">
                  Experience & GPU Platform
                </a>
              </li>
              <li>
                <a href="#awards" className="hover:text-[#EDE7DD] transition-colors">
                  Honors & Awards
                </a>
              </li>
              <li>
                <a href="#vision" className="hover:text-[#EDE7DD] transition-colors">
                  Master&apos;s / PhD in Europe
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Indices & Profiles */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#D4AF37] font-semibold">
              Scholarly Profiles & Indices
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={profileData.contacts.researchGate}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#151316] border border-white/5 hover:border-[#D4AF37]/40 text-[#EDE7DD] transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <ResearchGateIcon className="w-4 h-4 text-[#00CCBB]" />
                  <span>ResearchGate Profile</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={profileData.contacts.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#151316] border border-white/5 hover:border-[#D4AF37]/40 text-[#EDE7DD] transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <OrcidIcon className="w-4 h-4" />
                  <span className="font-mono text-[11px]">ORCID: 0009-0003-5063-9320</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={profileData.contacts.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#151316] border border-white/5 hover:border-[#D4AF37]/40 text-[#EDE7DD] transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#D4AF37] font-bold">GS</span>
                  <span>Google Scholar</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={profileData.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#151316] border border-white/5 hover:border-[#D4AF37]/40 text-[#EDE7DD] transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4 text-[#EDE7DD]" />
                  <span>GitHub (ABRUBAB)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={profileData.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#151316] border border-white/5 hover:border-[#D4AF37]/40 text-[#EDE7DD] transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
                  <span>LinkedIn</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A69C93]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-[#EDE7DD]">Abdullah Rubab</span>
            <span>•</span>
            <span>abdullahrubab.me</span>
            <span>•</span>
            <span>All Research Assets & Metrics Verified</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-[#A69C93]">
              Primary: <span className="text-[#D4AF37]">{profileData.contacts.academicEmail}</span>
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#151316] hover:bg-[#1C191E] border border-white/10 text-[#EDE7DD] transition-colors"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
