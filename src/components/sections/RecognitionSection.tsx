"use client";

import { useState } from "react";
import Image from "next/image";
import { awardsAndLeadership } from "@/content/portfolioData";
import { Trophy, Sparkles, ExternalLink, X, Award, CheckCircle2 } from "lucide-react";

export function RecognitionSection() {
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  return (
    <section id="awards" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/30 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD] mb-3">
            <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" />
            Honors, Awards & Competitive Finishes
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#EDE7DD] tracking-tight">
            Competitive Honors & Leadership
          </h2>
          <p className="text-sm sm:text-base text-[#A69C93] mt-3 leading-relaxed">
            Proven engineering execution and algorithmic problem solving across hackathons, national machine learning datathons, and symposiums.
          </p>
        </div>

        {/* Highlighted Grand Champion Card with Actual Ceremony Photo */}
        <div className="mb-10 p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-r from-[#151316] via-[#1C191E] to-[#151316] border border-[#D4AF37]/60 shadow-[0_0_35px_rgba(212,175,55,0.2)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#E5BE38] border border-[#D4AF37]/70 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Grand Champion • 1st Place Winner
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#EDE7DD]">
                DIU AI Innovation Hackathon 2026
              </h3>

              <p className="text-sm sm:text-base text-[#D4AF37] font-semibold">
                Project: AURA-Cluster (Evidential Deep Learning for GPU Failure Prevention)
              </p>

              <p className="text-xs sm:text-sm text-[#A69C93] leading-relaxed">
                Awarded First Place out of 50+ university AI engineering teams. Developed a Dirichlet-parameterized telemetry forecasting system providing 45-minute advance warning before catastrophic GPU cluster worker node crashes.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setPhotoModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#6E1423] to-[#941B32] hover:brightness-110 text-xs font-semibold text-[#EDE7DD] transition-all shadow-md active:scale-95 border border-[#8E1C30]"
                >
                  <span>View Ceremony Award Photo</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>
            </div>

            {/* Right Column: Ceremony Photo Preview Thumbnail */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={() => setPhotoModalOpen(true)}
                className="relative w-full max-w-sm h-64 rounded-3xl overflow-hidden border-2 border-[#D4AF37]/70 cursor-pointer group shadow-2xl"
              >
                <Image
                  src="/assets/photos/hackathon_win_photo.jpg"
                  alt="DIU AI Innovation Hackathon 2026 Winner Ceremony"
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs text-[#EDE7DD] font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E5BE38]" /> Click to inspect ceremony award photo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {awardsAndLeadership.slice(1).map((award) => (
            <div
              key={award.id}
              className={`p-6 sm:p-7 rounded-3xl border transition-all ${
                award.highlight
                  ? "bg-[#151316] border-[#D4AF37]/45 shadow-md hover:border-[#D4AF37]"
                  : "bg-[#151316] border-white/10 hover:border-white/25 hover:bg-[#18161A]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#D4AF37] font-semibold px-2.5 py-1 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                  {award.year}
                </span>
                {award.badgeText && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/15 text-[#E5BE38] border border-[#D4AF37]/40">
                    {award.badgeText}
                  </span>
                )}
              </div>

              <h4 className="text-base font-serif font-bold text-[#EDE7DD] mb-1">
                {award.title}
              </h4>
              <p className="text-xs text-[#A69C93] font-medium mb-2">{award.event}</p>
              <p className="text-xs text-[#A69C93]/90 leading-relaxed">{award.details}</p>
            </div>
          ))}
        </div>
      </div>

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
    </section>
  );
}
