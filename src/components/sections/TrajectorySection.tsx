"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { trajectoryTargets } from "@/content/portfolioData";
import { TrajectoryTarget } from "@/content/types";
import { 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  Languages, 
  Compass,
  Globe2
} from "lucide-react";

const TrajectoryGlobe = dynamic(
  () => import("../3d/TrajectoryGlobe").then((mod) => mod.TrajectoryGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] sm:h-[480px] rounded-3xl bg-[#0B0A0C] border border-white/10 flex items-center justify-center text-xs font-mono text-[#A69C93]">
        <span className="text-[#D4AF37]">Rendering 3D Trajectory Globe (Dhaka → Europe)...</span>
      </div>
    ),
  }
);

export function TrajectorySection() {
  const [selectedTarget, setSelectedTarget] = useState<TrajectoryTarget>(trajectoryTargets[0]);

  const languagesList = [
    {
      name: "English",
      level: "Proficient / Academic",
      note: "Manuscript authoring, academic presentations & professional communication",
      dots: 5,
    },
    {
      name: "Bengali",
      level: "Native",
      note: "Primary native language",
      dots: 5,
    },
    {
      name: "Hindi",
      level: "Conversational",
      note: "Spoken & listening comprehension",
      dots: 3,
    },
  ];

  return (
    <section id="vision" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/30 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD] mb-3">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            Graduate Research Trajectory
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#EDE7DD] tracking-tight">
            Target Intake: Master&apos;s or PhD in Europe
          </h2>
          <p className="text-sm sm:text-base text-[#A69C93] mt-3 leading-relaxed">
            Targeting fully-funded Master&apos;s and Doctoral (PhD) positions across leading European research institutes in evidential deep learning, uncertainty quantification, and clinical AI.
          </p>
        </div>

        {/* 3D Trajectory Globe */}
        <div className="mb-10">
          <TrajectoryGlobe onSelectTarget={(t) => setSelectedTarget(t)} />
        </div>

        {/* Breakdown Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Multilingual Readiness */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#151316] border border-[#D4AF37]/40 shadow-xl">
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#EDE7DD]">
                  <Languages className="w-4 h-4 text-[#D4AF37]" />
                  <span className="uppercase font-mono tracking-wider">Language Proficiency</span>
                </div>
                <Globe2 className="w-3.5 h-3.5 text-[#A69C93]" />
              </div>

              {/* Perfectly Aligned Structured Grid */}
              <div className="space-y-4">
                {languagesList.map((lang) => (
                  <div
                    key={lang.name}
                    className="p-3.5 rounded-2xl bg-[#0B0A0C] border border-white/5 space-y-1.5 transition-all hover:border-[#D4AF37]/30"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-serif font-bold text-[#EDE7DD]">
                        {lang.name}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[#D4AF37]/15 text-[#E5BE38] border border-[#D4AF37]/30 shrink-0">
                        {lang.level}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <p className="text-[11px] text-[#A69C93] leading-tight">
                        {lang.note}
                      </p>
                      {/* Visual 5-dot proficiency meter */}
                      <div className="flex items-center gap-1 shrink-0">
                        {[1, 2, 3, 4, 5].map((d) => (
                          <div
                            key={d}
                            className={`w-1.5 h-1.5 rounded-full ${
                              d <= lang.dots ? "bg-[#D4AF37]" : "bg-white/10"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-[#0B0A0C] border border-white/10 text-xs text-[#A69C93] space-y-2 shadow-lg">
              <span className="text-[#FFF2A3] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Research Readiness:
              </span>
              <p className="leading-relaxed">
                4+ top-tier manuscripts in preparation/under review, proven distributed GPU systems leadership, and 1st place hackathon engineering background.
              </p>
            </div>
          </div>

          {/* Right: Master's or PhD in Europe Detail */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#151316] border border-[#D4AF37]/50 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                    Academic Direction
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-xs text-[#A69C93]">September 2027 Intake</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#EDE7DD] mt-1">
                  Master&apos;s or PhD in Europe
                </h3>
              </div>

              <div className="px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-xs font-bold text-[#E5BE38] flex items-center gap-1.5 self-start">
                <Sparkles className="w-3.5 h-3.5" />
                Graduate Research Priority
              </div>
            </div>

            {/* Strategic Alignment */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#A69C93] font-semibold mb-2">
                Research Alignment
              </h4>
              <p className="text-xs sm:text-sm text-[#EDE7DD] leading-relaxed">
                {selectedTarget.whyTarget}
              </p>
            </div>

            {/* Programs & Funding */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#0B0A0C] border border-white/5 space-y-2">
                <h5 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Degree Tracks
                </h5>
                <ul className="space-y-1.5 text-xs text-[#EDE7DD]">
                  {selectedTarget.programs.map((prog, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{prog}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B0A0C] border border-white/5 space-y-2">
                <h5 className="text-xs font-semibold text-[#E5BE38] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Fellowship Targets
                </h5>
                <ul className="space-y-1.5 text-xs text-[#EDE7DD]">
                  {selectedTarget.fundingVehicles.map((fund, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-[#E5BE38] shrink-0 mt-0.5" />
                      <span className="font-medium text-[#EDE7DD]">{fund}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Focus Areas */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-wider text-[#A69C93] font-semibold mb-2">
                Core Research Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedTarget.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 rounded-xl bg-[#6E1423]/30 border border-[#6E1423]/70 text-xs text-[#EDE7DD]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
