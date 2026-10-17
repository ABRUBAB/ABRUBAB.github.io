"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useReviewerMode } from "@/hooks/useReviewerMode";
import { Header } from "@/components/ui/Header";
import { ReviewerModeView } from "@/components/ui/ReviewerModeView";
import { HeroSection } from "@/components/sections/HeroSection";
import { ResearchDiagramsSection } from "@/components/sections/ResearchDiagramsSection";
import { VisualProjectsSection } from "@/components/sections/VisualProjectsSection";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { RecognitionSection } from "@/components/sections/RecognitionSection";
import { ExperienceTimelineSection } from "@/components/sections/ExperienceTimelineSection";
import { SkillsMatrixSection } from "@/components/sections/SkillsMatrixSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ContactModal } from "@/components/ui/ContactModal";
import { BibtexModal } from "@/components/ui/BibtexModal";
import { NeuralNetBackground } from "@/components/ui/NeuralNetBackground";
import { DimensionRipIntro } from "@/components/ui/DimensionRipIntro";
import { Publication } from "@/content/types";
import { 
  HeartPulse,
  ArrowRight,
  GraduationCap,
  FileText
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BorderBeam } from "@/components/ui/BorderBeam";

export default function Home() {
  const { isReviewerMode, toggleReviewerMode } = useReviewerMode();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedBibtexPub, setSelectedBibtexPub] = useState<Publication | null>(null);

  return (
    <main className="min-h-screen bg-[#0B0A0C] text-[#EDE7DD] relative overflow-hidden">
      {/* High-Tech Evidential AI Dimension Rip & Portal Breach Intro */}
      <DimensionRipIntro />

      {/* Interactive Neural Synapse Net Background */}
      <NeuralNetBackground />

      {/* Sticky Header with Multi-Page Navigation and Reviewer Switch */}
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

          {/* Section 1: Morphic Biography & Vision Hook with Backlit UI / Kokonut UI Spotlight */}
          <section className="py-16 sm:py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SpotlightCard
                spotlightColor="rgba(212, 175, 55, 0.14)"
                borderColor="rgba(212, 175, 55, 0.4)"
                className="p-8 sm:p-12 shadow-2xl space-y-6 bg-gradient-to-b from-[#151316]/95 via-[#110F13]/95 to-[#151316]/95 border-[#D4AF37]/40"
              >
                <BorderBeam size={280} duration={14} colorFrom="#D4AF37" colorTo="#6E1423" />
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
                    <span className="text-lg font-serif font-bold text-[#E5BE38]">CGPA 3.80 / 4.00</span>
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
                    <span className="text-[11px] text-[#A69C93] block">NeuralSched • 50+ Teams</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0B0A0C] border border-white/5 space-y-1">
                    <span className="text-[11px] font-mono uppercase text-[#A69C93] block">Campus Compute</span>
                    <span className="text-lg font-serif font-bold text-[#E5BE38]">Team Lead</span>
                    <span className="text-[11px] text-[#A69C93] block">DIU GPU Cluster Platform</span>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </section>

          {/* Section 2: Interactive Scientific Diagrams & Uncertainty Triage Pipeline */}
          <ResearchDiagramsSection />

          {/* Section 3: Visual Flagship Applied Projects */}
          <VisualProjectsSection />

          {/* Section 4: Peer-Reviewed Publications Track Record */}
          <PublicationsSection />

          {/* Section 5: Competitive Honors, Awards & Ceremony Photo */}
          <RecognitionSection />

          {/* Section 6: Research Appointments & Verified Education Timeline */}
          <ExperienceTimelineSection />

          {/* Section 7: Technical Capability & Competency Matrix */}
          <SkillsMatrixSection />

          {/* Section 8: Next Trajectory & Contact Hook */}
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#151316]/90 via-[#0B0A0C]/90 to-[#151316]/90 border border-[#6E1423]/60 backdrop-blur-xl shadow-2xl text-center space-y-6 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/40 border border-[#6E1423]/90 text-xs font-semibold text-[#EDE7DD]">
                  <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Graduate Research Trajectory
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#EDE7DD] tracking-tight">
                  Master&apos;s / PhD in Europe (Fall 2027)
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

      {/* Global Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Global BibTeX Modal */}
      <BibtexModal
        publication={selectedBibtexPub}
        onClose={() => setSelectedBibtexPub(null)}
      />
    </main>
  );
}
