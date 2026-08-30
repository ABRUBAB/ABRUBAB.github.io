"use client";

import Link from "next/link";
import { 
  User, 
  Sparkles, 
  Code2, 
  FileText, 
  ArrowRight,
  GraduationCap,
  Award,
  Network,
  HeartPulse
} from "lucide-react";

export function AboutSection({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle Background Lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#6E1423]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/30 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD] mb-3">
            <User className="w-3.5 h-3.5 text-[#D4AF37]" />
            About Me & My Journey
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#EDE7DD] tracking-tight">
            Hi, I&apos;m Abdullah Rubab
          </h2>
          <p className="text-base sm:text-lg text-[#D4AF37] font-medium mt-2">
            Undergraduate AI Researcher • Systems Builder • Medical AI Explorer
          </p>
        </div>

        {/* Main 2-Column Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Authentic Personal Story */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#A69C93] leading-relaxed">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#151316] border border-[#6E1423]/50 shadow-xl space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#EDE7DD] flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-[#D4AF37]" />
                Building AI Doctors Can Actually Trust
              </h3>
              <p>
                I am a final-year Computer Science & Engineering student at <strong>Daffodil International University (DIU)</strong>, a <strong>Research Associate</strong> at the <strong>NanoBio Technology Center (NBTC)</strong> under Dr. Md. Ali Hossain, and an active member of the <strong>Health Informatics Research Laboratory (HIRL)</strong>.
              </p>
              <p>
                My passion is solving real-world medical safety problems. Most standard AI models are dangerously overconfident—they will make a 99% confident guess even when handed a corrupted scan, a rare disease, or a low-quality image. My research focuses on giving medical AI models self-awareness, so they know their own limits and automatically flag uncertain cases for human doctors to review.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#151316] border border-white/10 shadow-xl space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#EDE7DD] flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#E5BE38]" />
                From Competitive Coding to Large-Scale GPU Systems
              </h3>
              <p>
                My journey started with competitive problem-solving in national programming contests and hackathons. In 2026, our team won <strong>1st Place Champion at the DIU AI Innovation Hackathon</strong> with <em>AURA-Cluster</em>, a system that predicts GPU server crashes before they happen.
              </p>
              <p>
                I also love building real infrastructure. As the <strong>Team Lead & AI/ML Backend Developer</strong> for the DIU GPU Cluster initiative, I designed the software platform that pools university lab computers into a shared computing cloud for faculty and student AI researchers.
              </p>
            </div>
          </div>

          {/* Right Column: Key Dossier Overview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#18151A] via-[#121014] to-[#18151A] border border-[#D4AF37]/45 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider text-[#D4AF37] block">
                    Fast Snapshot
                  </span>
                  <h4 className="text-lg font-serif font-bold text-[#EDE7DD]">
                    Academic Overview
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4AF37]/15 text-[#E5BE38] border border-[#D4AF37]/40">
                  CGPA: 3.84 / 4.00
                </span>
              </div>

              {/* Quick Spec List */}
              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#EDE7DD] block">B.Sc. in Computer Science & Engineering</strong>
                    <span className="text-[#A69C93]">Daffodil International University (Final Year)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HeartPulse className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#EDE7DD] block">Research Focus</strong>
                    <span className="text-[#A69C93]">Trustworthy Medical AI & Uncertainty Quantification</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Network className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#EDE7DD] block">Systems Leadership</strong>
                    <span className="text-[#A69C93]">Team Lead, DIU Campus GPU Cluster Platform</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#EDE7DD] block">Competitive Achievements</strong>
                    <span className="text-[#A69C93]">1st Place AI Hackathon Winner • Rank 48/196 National Datathon</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                <Link
                  href="/cv"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all shadow-md active:scale-95 border border-[#8E1C30]"
                >
                  <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>View Academic CV</span>
                </Link>
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B0A0C] hover:bg-white/5 border border-white/10 text-xs font-semibold text-[#EDE7DD] transition-all"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
