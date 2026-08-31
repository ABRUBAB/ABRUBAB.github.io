"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useReviewerMode } from "@/hooks/useReviewerMode";
import { Header } from "@/components/ui/Header";
import { ReviewerModeView } from "@/components/ui/ReviewerModeView";
import { HeroSection } from "@/components/sections/HeroSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ContactModal } from "@/components/ui/ContactModal";
import { BibtexModal } from "@/components/ui/BibtexModal";
import { NeuralNetBackground } from "@/components/ui/NeuralNetBackground";
import { publications, projects, experienceRoles, awardsAndLeadership } from "@/content/portfolioData";
import { Publication } from "@/content/types";
import { 
  BookOpen, 
  Code2, 
  Building2, 
  Award, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Quote, 
  ShieldCheck, 
  GraduationCap, 
  Cpu, 
  Globe, 
  HeartPulse,
  User,
  X,
  FileText
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

export default function Home() {
  const { isReviewerMode, toggleReviewerMode } = useReviewerMode();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedBibtexPub, setSelectedBibtexPub] = useState<Publication | null>(null);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0B0A0C] text-[#EDE7DD] relative overflow-hidden">
      {/* Interactive Neural Synapse Net Background */}
      <NeuralNetBackground />

      {/* Sticky Header with Multi-Page Links and Reviewer Switch */}
      <Header
        isReviewerMode={isReviewerMode}
        onToggleReviewerMode={toggleReviewerMode}
      />

      {/* Main Content Area: Reviewer Mode vs. Morphological Homepage */}
      {isReviewerMode ? (
        <ReviewerModeView />
      ) : (
        <div className="flex flex-col relative z-10">
          {/* Chapter 0: Hero & 3D Interactive Morphing Avatar */}
          <HeroSection
            onToggleReviewerMode={toggleReviewerMode}
            onOpenContact={() => setContactModalOpen(true)}
          />

          {/* Section 1: Morphic Biography & Vision Hook */}
          <section className="py-16 sm:py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#151316]/90 via-[#110F13]/90 to-[#151316]/90 border border-[#D4AF37]/35 backdrop-blur-xl shadow-2xl space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6E1423]/35 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD]">
                      <HeartPulse className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Research Thesis & Clinical Focus
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#EDE7DD]">
                      Trustworthy Medical AI & Uncertainty Quantification
                    </h2>
                  </div>

                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all shadow-md active:scale-95 border border-[#8E1C30] shrink-0"
                  >
                    <span>Read Full Journey & Philosophy</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </Link>
                </div>

                <p className="text-sm sm:text-base text-[#A69C93] leading-relaxed max-w-4xl">
                  Standard deep learning models produce silent 99% confident misdiagnoses when encountering unseen pathologies or corrupted scanner scans. Through <strong>Evidential Deep Learning (Dirichlet prior parameterization)</strong> and knowledge distillation, I engineer neural architectures that quantify their own epistemic uncertainty in a single pass—autonomously routing high-risk scans to human clinical specialists.
                </p>

                {/* 4 Core Quick Telemetry Pills */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
                  <div className="p-4 rounded-2xl bg-[#0B0A0C] border border-white/5 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-[#A69C93] block">Academic Grade</span>
                    <span className="text-lg font-serif font-bold text-[#E5BE38]">CGPA 3.84 / 4.00</span>
                    <span className="text-[11px] text-[#A69C93] block">B.Sc. CSE Final Year, DIU</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0B0A0C] border border-white/5 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-[#A69C93] block">Research Output</span>
                    <span className="text-lg font-serif font-bold text-[#E5BE38]">7 Manuscripts</span>
                    <span className="text-[11px] text-[#A69C93] block">IEEE ICCIT, BECITHCON, Q1s</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0B0A0C] border border-white/5 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-[#A69C93] block">Hackathon Champion</span>
                    <span className="text-lg font-serif font-bold text-[#E5BE38]">1st Place Winner</span>
                    <span className="text-[11px] text-[#A69C93] block">DIU AI Hackathon 2026</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0B0A0C] border border-white/5 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-[#A69C93] block">Compute Platform</span>
                    <span className="text-lg font-serif font-bold text-[#E5BE38]">Team Lead</span>
                    <span className="text-[11px] text-[#A69C93] block">DIU Campus GPU Cluster</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Selected Research Manuscripts Teaser */}
          <section className="py-16 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/30 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD] mb-3">
                    <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Featured Publications
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#EDE7DD] tracking-tight">
                    Peer-Reviewed Research Track
                  </h2>
                </div>

                <Link
                  href="/publications"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#151316] hover:bg-[#1C191E] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-xs font-semibold text-[#EDE7DD] hover:text-[#E5BE38] transition-all shadow-md active:scale-95"
                >
                  <span>View All 7 Manuscripts & DOIs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </Link>
              </div>

              {/* 3 Compact Highlight Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {publications.slice(0, 3).map((pub, idx) => (
                  <article
                    key={pub.id}
                    className="p-6 rounded-3xl bg-[#151316]/90 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-md transition-all shadow-xl flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#D4AF37] font-semibold">
                          {pub.venue.split("•")[0]}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          pub.status === "published"
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                            : "bg-[#D4AF37]/20 text-[#E5BE38] border border-[#D4AF37]/40"
                        }`}>
                          {pub.status === "published" ? "Published" : "Accepted"}
                        </span>
                      </div>

                      <h3 className="text-base font-serif font-bold text-[#EDE7DD] group-hover:text-[#E5BE38] transition-colors leading-snug line-clamp-3">
                        {pub.title}
                      </h3>

                      <p className="text-xs text-[#A69C93] line-clamp-2 leading-relaxed">
                        {pub.details}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      {pub.doi ? (
                        <a
                          href={pub.doi.startsWith("http") ? pub.doi : `https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono text-[#D4AF37] hover:text-[#E5BE38]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>IEEE DOI</span>
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-[#A69C93]">Proceedings 2026</span>
                      )}

                      <button
                        onClick={() => setSelectedBibtexPub(pub)}
                        className="inline-flex items-center gap-1 text-xs font-mono text-[#A69C93] hover:text-[#EDE7DD]"
                      >
                        <Quote className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Cite</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: Flagship Applied Projects */}
          <section className="py-16 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/30 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD] mb-3">
                    <Code2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Applied Systems
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#EDE7DD] tracking-tight">
                    Flagship Engineering Projects
                  </h2>
                </div>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#151316] hover:bg-[#1C191E] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-xs font-semibold text-[#EDE7DD] hover:text-[#E5BE38] transition-all shadow-md active:scale-95"
                >
                  <span>Explore Full Project Case Studies</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </Link>
              </div>

              {/* 4 Sleek Morphological Project Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.slice(0, 4).map((project) => (
                  <article
                    key={project.id}
                    className={`p-6 sm:p-8 rounded-3xl backdrop-blur-xl transition-all shadow-xl space-y-4 border ${
                      project.award
                        ? "bg-gradient-to-b from-[#18151A]/95 via-[#121014]/95 to-[#18151A]/95 border-[#D4AF37]/50"
                        : "bg-[#151316]/90 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                        {project.tags[0] || "Medical AI"}
                      </span>
                      {project.award && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D4AF37]/15 text-[#E5BE38] border border-[#D4AF37]/40">
                          <Award className="w-3 h-3" />
                          {project.award}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#EDE7DD]">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#A69C93] line-clamp-2 leading-relaxed">
                      {project.subtitle || project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[#0B0A0C] border border-white/10 text-[#E5BE38]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4AF37] hover:text-[#E5BE38]"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Repository</span>
                        </a>
                      )}
                      <Link
                        href="/projects"
                        className="inline-flex items-center gap-1 text-xs font-mono text-[#A69C93] hover:text-[#EDE7DD]"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4: Experience & Institutional Appointments */}
          <section className="py-16 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/30 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD] mb-3">
                    <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Institutional Leadership
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#EDE7DD] tracking-tight">
                    Research Appointments & Infrastructure
                  </h2>
                </div>

                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#151316] hover:bg-[#1C191E] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-xs font-semibold text-[#EDE7DD] hover:text-[#E5BE38] transition-all shadow-md active:scale-95"
                >
                  <span>View Systems & Experience</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </Link>
              </div>

              {/* 4 Compact Experience Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {experienceRoles.map((role) => (
                  <div
                    key={role.id}
                    className="p-6 rounded-3xl bg-[#151316]/90 border border-white/10 hover:border-[#D4AF37]/40 backdrop-blur-md transition-all shadow-xl flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#0B0A0C] border border-[#D4AF37]/40 p-0.5">
                          <Image
                            src={role.logo || "/assets/logos/website_logo.png"}
                            alt={role.organization}
                            fill
                            sizes="36px"
                            className="object-contain"
                          />
                        </div>
                        <span className="text-[10px] font-mono text-[#D4AF37] font-semibold">
                          {role.period.split("–")[0]}
                        </span>
                      </div>

                      <h3 className="text-base font-serif font-bold text-[#EDE7DD] leading-snug">
                        {role.title}
                      </h3>

                      <p className="text-xs text-[#E5BE38] font-medium line-clamp-1">
                        {role.organization}
                      </p>

                      <p className="text-xs text-[#A69C93] line-clamp-2 leading-relaxed">
                        {role.description}
                      </p>
                    </div>

                    <Link
                      href="/experience"
                      className="pt-2 border-t border-white/5 inline-flex items-center gap-1 text-xs font-mono text-[#D4AF37] hover:text-[#E5BE38]"
                    >
                      <span>Read Responsibilities</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 5: Recognition & Hackathon Champion Spotlight */}
          <section className="py-16 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#18151A]/95 via-[#121014]/95 to-[#18151A]/95 border-2 border-[#D4AF37]/60 shadow-2xl space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-bold text-[#E5BE38]">
                      <Award className="w-3.5 h-3.5" />
                      1st Place Grand Champion • 50,000 BDT Prize
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#EDE7DD]">
                      DIU AI Innovation Hackathon 2026 Winner
                    </h2>
                    <p className="text-sm sm:text-base text-[#A69C93] leading-relaxed">
                      Awarded 1st Place for <strong>AURA-Cluster</strong>: an evidential GPU node failure prediction system forecasting hardware crashes 45 minutes in advance across university computing grids.
                    </p>

                    <div className="pt-2 flex items-center gap-4">
                      <button
                        onClick={() => setPhotoModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all shadow-md border border-[#8E1C30]"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Inspect Ceremony Award Photo</span>
                      </button>
                    </div>
                  </div>

                  {/* Winner Photo Thumbnail */}
                  <div
                    onClick={() => setPhotoModalOpen(true)}
                    className="relative w-full max-w-sm h-52 sm:h-60 rounded-3xl overflow-hidden border-2 border-[#D4AF37]/70 cursor-pointer group shadow-2xl shrink-0"
                  >
                    <Image
                      src="/assets/photos/hackathon_win_photo.jpg"
                      alt="DIU AI Hackathon Winner Ceremony"
                      fill
                      sizes="(max-width: 768px) 100vw, 384px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                      <span className="text-xs text-[#EDE7DD] font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#E5BE38]" /> Click to open photo modal
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Next Trajectory & Contact Hook */}
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#151316]/90 via-[#0B0A0C]/90 to-[#151316]/90 border border-[#6E1423]/60 backdrop-blur-xl shadow-2xl text-center space-y-6 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/40 border border-[#6E1423]/90 text-xs font-semibold text-[#EDE7DD]">
                  <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Graduate Research Trajectory
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#EDE7DD] tracking-tight">
                  Master&apos;s / PhD in Europe
                </h2>
                <p className="text-sm sm:text-base text-[#A69C93] max-w-2xl mx-auto leading-relaxed">
                  Preparing for European graduate research admissions in Trustworthy Medical AI, Uncertainty Quantification, and Scalable Edge Computing.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setContactModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#6E1423] to-[#941B32] hover:brightness-110 text-xs sm:text-sm font-semibold text-white transition-all shadow-xl active:scale-95 border border-[#8E1C30]"
                  >
                    <span>Get in Touch with Abdullah Rubab</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>

                  <Link
                    href="/cv"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#151316] hover:bg-[#1C191E] border border-white/10 hover:border-[#D4AF37] text-xs sm:text-sm font-semibold text-[#EDE7DD] hover:text-[#E5BE38] transition-all"
                  >
                    <FileText className="w-4 h-4 text-[#D4AF37]" />
                    <span>View Academic CV</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Global Footer Section */}
      <FooterSection onOpenContact={() => setContactModalOpen(true)} />

      {/* Global Modals */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      <BibtexModal
        publication={selectedBibtexPub}
        onClose={() => setSelectedBibtexPub(null)}
      />

      {/* Photo Lightbox Modal */}
      {photoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setPhotoModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#151316] border border-[#D4AF37]/70 rounded-3xl p-4 sm:p-6 overflow-hidden shadow-2xl text-[#EDE7DD]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#E5BE38]">
                  DIU AI Innovation Hackathon 2026 — Champion Award Ceremony
                </h3>
                <p className="text-xs text-[#A69C93]">AURA-Cluster Evidential Failure Prevention System</p>
              </div>
              <button
                onClick={() => setPhotoModalOpen(false)}
                className="p-1.5 rounded-lg text-[#A69C93] hover:text-[#EDE7DD] hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-[320px] sm:h-[480px] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/assets/photos/hackathon_win_photo.jpg"
                alt="Hackathon Win Ceremony"
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain bg-black"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
