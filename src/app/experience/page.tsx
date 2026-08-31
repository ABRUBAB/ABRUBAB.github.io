"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/ui/Header";
import { FooterSection } from "@/components/sections/FooterSection";
import { ContactModal } from "@/components/ui/ContactModal";
import { NeuralNetBackground } from "@/components/ui/NeuralNetBackground";
import { experienceRoles } from "@/content/portfolioData";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Network,
  Cpu,
  GraduationCap
} from "lucide-react";

export default function ExperiencePage() {
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
            Appointments & Infrastructure Leadership
          </span>
        </div>

        {/* Page Banner */}
        <div className="mb-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#151316]/90 via-[#100E12]/90 to-[#151316]/90 border border-[#6E1423]/60 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/40 border border-[#6E1423]/90 text-xs font-semibold text-[#EDE7DD]">
            <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            Experience & Systems
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#EDE7DD] tracking-tight leading-tight">
            Research Appointments & Infrastructure Leadership
          </h1>
          <p className="text-base sm:text-lg text-[#A69C93] max-w-3xl leading-relaxed">
            Bridging theoretical oncology research at NBTC & HIRL with high-performance distributed systems architecture at the DIU GPU Cluster.
          </p>
        </div>

        {/* Experience Roles Deep-Dive List */}
        <div className="space-y-8 mb-16">
          {experienceRoles.map((role, idx) => (
            <article
              key={role.id}
              className="p-6 sm:p-10 rounded-3xl bg-[#151316]/90 border border-white/10 hover:border-[#D4AF37]/40 backdrop-blur-xl transition-all shadow-2xl space-y-6"
            >
              {/* Header: Logo, Title, Org & Period */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-[#0B0A0C] border border-[#D4AF37]/40 shrink-0 p-1">
                    <Image
                      src={role.logo || "/assets/logos/website_logo.png"}
                      alt={role.organization}
                      fill
                      sizes="48px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#EDE7DD]">
                      {role.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[#E5BE38] font-medium">
                      {role.organization}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#E5BE38] border border-[#D4AF37]/30 flex items-center gap-1.5 font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    {role.period}
                  </span>
                  <span className="text-[#A69C93] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" />
                    {role.location}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#EDE7DD]/90 leading-relaxed">
                {role.description}
              </p>

              {/* Key Bulleted Contributions */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#A69C93] mb-3">
                  Key Responsibilities & Impact
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-[#A69C93]">
                  {role.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0B0A0C]/70 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="text-[#EDE7DD] leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Tags */}
              <div className="pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#A69C93] mb-2">
                  Skills & Frameworks Applied
                </h3>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl text-xs font-mono bg-[#0B0A0C] border border-white/10 text-[#EDE7DD]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
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
            href="/projects"
            className="p-5 rounded-2xl bg-[#151316] border border-white/10 hover:border-[#D4AF37] transition-all group"
          >
            <span className="text-xs text-[#D4AF37] font-mono block mb-1">Projects</span>
            <span className="text-sm font-serif font-bold text-[#EDE7DD] group-hover:text-[#E5BE38] flex items-center justify-between">
              <span>Flagship Case Studies</span>
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
