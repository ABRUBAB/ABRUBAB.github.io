"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { FooterSection } from "@/components/sections/FooterSection";
import { ContactModal } from "@/components/ui/ContactModal";
import { NeuralNetBackground } from "@/components/ui/NeuralNetBackground";
import { projects } from "@/content/portfolioData";
import { 
  Code2, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft,
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  Award
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

export default function ProjectsPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0B0A0C] text-[#EDE7DD] relative overflow-hidden">
      <NeuralNetBackground />

      <Header
        isReviewerMode={false}
        onToggleReviewerMode={() => {}}
      />

      <div className="pt-28 pb-20 relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A69C93] hover:text-[#E5BE38] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Back to Home</span>
          </Link>
          <span className="text-xs font-mono text-[#D4AF37] px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            Systems Architecture & Open-Source Repositories
          </span>
        </div>

        {/* Page Banner */}
        <div className="mb-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#151316]/90 via-[#100E12]/90 to-[#151316]/90 border border-[#6E1423]/60 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/40 border border-[#6E1423]/90 text-xs font-semibold text-[#EDE7DD]">
            <Code2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            Flagship Engineering Projects
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#EDE7DD] tracking-tight leading-tight">
            Applied Medical Systems & High-Performance AI
          </h1>
          <p className="text-base sm:text-lg text-[#A69C93] max-w-3xl leading-relaxed">
            From 1st Place Hackathon-winning predictive GPU telemetry platforms to differential-privacy federated clinical diagnostic systems.
          </p>
        </div>

        {/* Projects Deep-Dive List */}
        <div className="space-y-8 mb-16">
          {projects.map((project, idx) => (
            <article
              key={project.id}
              className={`p-6 sm:p-10 rounded-3xl backdrop-blur-xl transition-all shadow-2xl space-y-6 border ${
                project.award
                  ? "bg-gradient-to-b from-[#18151A]/95 via-[#121014]/95 to-[#18151A]/95 border-[#D4AF37]/50"
                  : "bg-[#151316]/90 border-white/10 hover:border-white/20"
              }`}
            >
              {/* Card Header: Tagline & Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#0B0A0C] border border-[#D4AF37]/40 flex items-center justify-center font-mono text-xs font-bold text-[#E5BE38]">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                    {project.tags[0] || "Medical AI"}
                  </span>
                </div>

                {project.award && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37]/15 text-[#E5BE38] border border-[#D4AF37]/40 shadow-sm">
                    <Award className="w-3.5 h-3.5" />
                    {project.award}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#EDE7DD] mb-2">
                  {project.title}
                </h2>
                <p className="text-sm sm:text-base text-[#E5BE38] font-medium">
                  {project.subtitle}
                </p>
              </div>

              {/* Descriptions */}
              <div className="space-y-3 text-xs sm:text-sm text-[#A69C93] leading-relaxed">
                <p className="text-[#EDE7DD] font-medium">{project.description}</p>
                <p>{project.longDescription}</p>
              </div>

              {/* Key Results / Benchmarks Grid */}
              {project.results && project.results.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#A69C93] mb-3">
                    Validated Benchmarks & Results
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.results.map((res, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-[#0B0A0C] border border-white/5 space-y-1">
                        <span className="text-[11px] font-mono text-[#A69C93] block">{res.label}</span>
                        <span className="text-lg font-serif font-bold text-[#E5BE38] block">{res.value}</span>
                        {res.sublabel && (
                          <span className="text-[10px] text-[#A69C93] block">{res.sublabel}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Methods Applied */}
              {project.methods && (
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#A69C93] mb-2">
                    Methodological Innovations
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#A69C93]">
                    {project.methods.map((method, i) => (
                      <li key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-[#0B0A0C]/60 border border-white/5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="text-[#EDE7DD]">{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div className="pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#A69C93] mb-2">
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl text-xs font-mono bg-[#0B0A0C] border border-white/10 text-[#E5BE38]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions: Code & Live Demo */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all shadow-md active:scale-95 border border-[#8E1C30]"
                    >
                      <GithubIcon className="w-4 h-4 text-[#D4AF37]" />
                      <span>View GitHub Repository</span>
                    </a>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B0A0C] hover:bg-white/5 border border-white/10 text-xs font-semibold text-[#EDE7DD] hover:text-[#E5BE38] transition-all"
                    >
                      <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                      <span>Live Demonstration</span>
                    </a>
                  )}
                </div>

                <span className="text-xs font-mono text-[#A69C93]">
                  Status: Validated Implementation
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Quick Nav to other subpages */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
          <Link
            href="/publications"
            className="p-5 rounded-2xl bg-[#151316] border border-white/10 hover:border-[#D4AF37] transition-all group"
          >
            <span className="text-xs text-[#D4AF37] font-mono block mb-1">Publications</span>
            <span className="text-sm font-serif font-bold text-[#EDE7DD] group-hover:text-[#E5BE38] flex items-center justify-between">
              <span>7 Manuscripts & DOIs</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/experience"
            className="p-5 rounded-2xl bg-[#151316] border border-white/10 hover:border-[#D4AF37] transition-all group"
          >
            <span className="text-xs text-[#D4AF37] font-mono block mb-1">Appointments</span>
            <span className="text-sm font-serif font-bold text-[#EDE7DD] group-hover:text-[#E5BE38] flex items-center justify-between">
              <span>NBTC, HIRL & GPU Cluster</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/about"
            className="p-5 rounded-2xl bg-[#151316] border border-white/10 hover:border-[#D4AF37] transition-all group"
          >
            <span className="text-xs text-[#D4AF37] font-mono block mb-1">Biography</span>
            <span className="text-sm font-serif font-bold text-[#EDE7DD] group-hover:text-[#E5BE38] flex items-center justify-between">
              <span>About Abdullah Rubab</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>

      <FooterSection onOpenContact={() => setContactOpen(true)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
