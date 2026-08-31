"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { FooterSection } from "@/components/sections/FooterSection";
import { ContactModal } from "@/components/ui/ContactModal";
import { NeuralNetBackground } from "@/components/ui/NeuralNetBackground";
import { profileData } from "@/content/portfolioData";
import { 
  User, 
  Sparkles, 
  Code2, 
  FileText, 
  ArrowRight,
  GraduationCap,
  Award,
  Network,
  HeartPulse,
  BookOpen,
  ArrowLeft,
  Terminal,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Globe
} from "lucide-react";

export default function AboutPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0B0A0C] text-[#EDE7DD] relative overflow-hidden">
      <NeuralNetBackground />

      <Header
        isReviewerMode={false}
        onToggleReviewerMode={() => {}}
      />

      <div className="pt-28 pb-20 relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A69C93] hover:text-[#E5BE38] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Back to Home</span>
          </Link>
          <span className="text-xs font-mono text-[#D4AF37] px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            Biography & Academic Dossier
          </span>
        </div>

        {/* Hero Section Banner */}
        <div className="mb-14 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#151316]/90 via-[#100E12]/90 to-[#151316]/90 border border-[#6E1423]/60 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/40 border border-[#6E1423]/90 text-xs font-semibold text-[#EDE7DD]">
            <User className="w-3.5 h-3.5 text-[#D4AF37]" />
            About Abdullah Rubab
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#EDE7DD] tracking-tight leading-tight">
            Researching medical AI that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EDE7DD] via-[#FFF2A3] to-[#D4AF37]">
              knows what it doesn&apos;t know.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#A69C93] max-w-3xl leading-relaxed">
            Final-year Computer Science & Engineering researcher at Daffodil International University (DIU), Research Associate at the NanoBio Technology Center (NBTC), Member at HIRL, and Team Lead for the DIU Campus GPU Cluster.
          </p>
        </div>

        {/* 2-Column Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Personal Narrative & Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#A69C93] leading-relaxed">
            {/* Story 1: The Research Philosophy */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#151316]/90 border border-[#D4AF37]/30 backdrop-blur-md shadow-xl space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#EDE7DD] flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-[#D4AF37]" />
                The Core Thesis: Trust Before Prediction
              </h2>
              <p>
                In standard computer vision, a model will make a 99% confident guess even when handed a corrupted scan, a rare mutation, or an out-of-distribution scanner artifact. In healthcare, silent overconfidence costs lives.
              </p>
              <p>
                Through <strong>Evidential Deep Learning (Dirichlet prior parameterization)</strong> and knowledge distillation, I engineer diagnostic vision architectures that quantify their own epistemic uncertainty in a single pass—autonomously routing high-risk, ambiguous scans to human clinical specialists while accelerating routine cases.
              </p>
            </div>

            {/* Story 2: Competitive Algorithms to Systems */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#151316]/90 border border-white/10 backdrop-blur-md shadow-xl space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#EDE7DD] flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#E5BE38]" />
                From Competitive Coding to Distributed GPU Platforms
              </h2>
              <p>
                My foundation began in competitive algorithmic programming (Top 50 in national UTA contests, 17th in Take-Off contest) and real-time hackathons. In 2026, our team was awarded <strong>1st Place Grand Champion at the DIU AI Innovation Hackathon</strong> for <em>AURA-Cluster</em>, a proactive telemetry system predicting GPU node failures 45 minutes in advance.
              </p>
              <p>
                Beyond mathematical formulation, I lead hands-on systems architecture as the <strong>Team Lead & AI/ML Backend Developer</strong> for the DIU GPU Cluster initiative, building the software platform that pools university laboratory workstations into an elastic high-performance computing cloud for academic AI researchers across the campus.
              </p>
            </div>

            {/* Story 3: Trajectory */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#151316]/90 border border-[#6E1423]/50 backdrop-blur-md shadow-xl space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#EDE7DD] flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#D4AF37]" />
                Graduate Vision & European Research Focus
              </h2>
              <p>
                I am preparing for competitive Master&apos;s and PhD research programs in Europe in the fields of <strong>Trustworthy Medical AI, Uncertainty Quantification, and Edge Health Systems</strong>. My goal is to build clinical foundation models that bridge theoretical Bayesian rigour with lightweight, real-time edge deployment in resource-limited hospitals worldwide.
              </p>
            </div>
          </div>

          {/* Right Column: Academic Dossier & Key Metrics */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Profile Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#18151A] via-[#121014] to-[#18151A] border border-[#D4AF37]/50 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider text-[#D4AF37] block">
                    Researcher Profile
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#EDE7DD]">
                    Academic Overview
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4AF37]/15 text-[#E5BE38] border border-[#D4AF37]/40">
                  CGPA: 3.84 / 4.00
                </span>
              </div>

              {/* Specs */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#EDE7DD] block">B.Sc. in Computer Science & Engineering</strong>
                    <span className="text-[#A69C93]">Daffodil International University (2023 – Present)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#EDE7DD] block">Research Focus</strong>
                    <span className="text-[#A69C93]">Evidential Deep Learning, Uncertainty Quantification, Clinical Triage</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Network className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#EDE7DD] block">Infrastructure Leadership</strong>
                    <span className="text-[#A69C93]">Team Lead, DIU GPU Cluster & Slurm Orchestration</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#EDE7DD] block">Competitive Track Record</strong>
                    <span className="text-[#A69C93]">1st Place AI Hackathon Winner • Rank 48/196 bKash Datathon</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                <Link
                  href="/cv"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all shadow-md active:scale-95 border border-[#8E1C30]"
                >
                  <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>View Academic CV</span>
                </Link>
                <button
                  onClick={() => setContactOpen(true)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B0A0C] hover:bg-white/5 border border-white/10 text-xs font-semibold text-[#EDE7DD] transition-all"
                >
                  <span>Contact Me</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>
            </div>

            {/* Language Proficiency Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#151316]/90 border border-white/10 shadow-xl space-y-4">
              <h3 className="text-base font-serif font-bold text-[#EDE7DD] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                Language Proficiency & Communication
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0B0A0C] border border-white/5">
                  <div>
                    <strong className="text-[#EDE7DD] block">English</strong>
                    <span className="text-[#A69C93] text-xs">Academic, Research Writing & Presentation</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 text-[#E5BE38] text-xs font-mono font-bold">
                    Proficient (5/5)
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0B0A0C] border border-white/5">
                  <div>
                    <strong className="text-[#EDE7DD] block">Bengali</strong>
                    <span className="text-[#A69C93] text-xs">Native / Mother Tongue</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 text-[#E5BE38] text-xs font-mono font-bold">
                    Native (5/5)
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0B0A0C] border border-white/5">
                  <div>
                    <strong className="text-[#EDE7DD] block">Hindi</strong>
                    <span className="text-[#A69C93] text-xs">Conversational Fluency</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 text-[#EDE7DD] text-xs font-mono font-bold">
                    Conversational (3/5)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Nav to other subpages */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
          <Link
            href="/publications"
            className="p-5 rounded-2xl bg-[#151316] border border-white/10 hover:border-[#D4AF37] transition-all group"
          >
            <span className="text-xs text-[#D4AF37] font-mono block mb-1">Publications Track</span>
            <span className="text-sm font-serif font-bold text-[#EDE7DD] group-hover:text-[#E5BE38] flex items-center justify-between">
              <span>7 Manuscripts & DOIs</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/projects"
            className="p-5 rounded-2xl bg-[#151316] border border-white/10 hover:border-[#D4AF37] transition-all group"
          >
            <span className="text-xs text-[#D4AF37] font-mono block mb-1">Systems & Code</span>
            <span className="text-sm font-serif font-bold text-[#EDE7DD] group-hover:text-[#E5BE38] flex items-center justify-between">
              <span>Flagship Case Studies</span>
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
        </div>
      </div>

      <FooterSection onOpenContact={() => setContactOpen(true)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
