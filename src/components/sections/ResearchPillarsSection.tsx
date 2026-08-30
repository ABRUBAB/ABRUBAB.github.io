"use client";

import { useState } from "react";
import { researchPillars, publications } from "@/content/portfolioData";
import { 
  ShieldCheck, 
  Cpu, 
  Eye, 
  Network, 
  Layers, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Binary,
  Compass
} from "lucide-react";

export function ResearchPillarsSection() {
  const [activePillarId, setActivePillarId] = useState<string>(researchPillars[0].id);

  const activePillar = researchPillars.find((p) => p.id === activePillarId) || researchPillars[0];

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-[#D4AF37]" />;
      case "Eye":
        return <Eye className="w-5 h-5 text-[#D4AF37]" />;
      case "Network":
      default:
        return <Network className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="research" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/30 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD] mb-3">
            <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
            Foundational Research Pillars
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#EDE7DD] tracking-tight">
            Methodological Disciplines
          </h2>
          <p className="text-sm sm:text-base text-[#A69C93] mt-3 leading-relaxed">
            Our medical AI investigations are anchored in four core mathematical disciplines engineered to guarantee clinical reliability, single-pass inference speed, and privacy.
          </p>
        </div>

        {/* Interactive Pillar Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {researchPillars.map((p) => {
            const isActive = p.id === activePillarId;
            return (
              <button
                key={p.id}
                onClick={() => setActivePillarId(p.id)}
                className={`p-5 rounded-3xl text-left transition-all duration-300 border ${
                  isActive
                    ? "bg-[#1C191E] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)] scale-[1.02]"
                    : "bg-[#151316] border-white/10 hover:border-white/25 hover:bg-[#18161A]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-2xl ${isActive ? "bg-[#D4AF37]/20 border border-[#D4AF37]/40" : "bg-white/5"}`}>
                    {getPillarIcon(p.iconName)}
                  </div>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                  )}
                </div>
                <h3 className={`text-sm font-serif font-bold ${isActive ? "text-[#E5BE38]" : "text-[#EDE7DD]"}`}>
                  {p.title}
                </h3>
                <p className="text-[11px] text-[#A69C93] line-clamp-1 mt-1 font-mono">
                  {p.metricHighlight}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Selected Pillar Card */}
        <div className="rounded-3xl bg-gradient-to-b from-[#151316] via-[#121014] to-[#151316] border border-[#6E1423]/70 p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-[#D4AF37]">
                  {activePillar.latinName}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-xs text-[#A69C93]">Theoretical Paradigm</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#EDE7DD]">
                {activePillar.title}
              </h3>
              <p className="text-sm sm:text-base text-[#E5BE38] font-medium">
                {activePillar.tagline}
              </p>
            </div>

            {/* Metric Benchmark Callout */}
            <div className="shrink-0 p-4 sm:p-5 rounded-2xl bg-[#0B0A0C] border border-[#D4AF37]/40 text-left lg:text-right shadow-xl">
              <span className="text-[11px] uppercase tracking-wider text-[#A69C93] block mb-0.5">
                Benchmark Metric
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-[#E5BE38]">
                {activePillar.metricHighlight}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
            {/* Left Column: Theory & Math Objective */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#A69C93] font-semibold mb-2 flex items-center gap-2">
                  <Binary className="w-3.5 h-3.5 text-[#D4AF37]" /> Theoretical Foundation
                </h4>
                <p className="text-xs sm:text-sm text-[#EDE7DD] leading-relaxed">
                  {activePillar.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#A69C93] font-semibold mb-2 flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#D4AF37]" /> Mathematical Loss Head Formulation
                </h4>
                <div className="p-4 rounded-2xl bg-[#0B0A0C] border border-white/10 font-mono text-xs text-[#E5BE38] overflow-x-auto shadow-inner">
                  {activePillar.mathematicalFoundation}
                </div>
              </div>
            </div>

            {/* Right Column: Key Innovations & Linked Manuscripts */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#A69C93] font-semibold mb-3">
                  Key Methodological Innovations
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#A69C93]">
                  {activePillar.keyContributions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="text-[#EDE7DD] leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Linked Papers */}
              <div className="pt-2">
                <h4 className="text-xs uppercase tracking-wider text-[#A69C93] font-semibold mb-2">
                  Implemented In Manuscripts
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activePillar.relatedPaperIds.map((pId) => {
                    const pub = publications.find((p) => p.id === pId);
                    if (!pub) return null;
                    return (
                      <a
                        key={pub.id}
                        href="#publications"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0B0A0C] border border-white/10 hover:border-[#D4AF37]/60 text-xs text-[#EDE7DD] hover:text-[#E5BE38] transition-colors"
                      >
                        <span className="font-semibold">{pub.shortTitle.split(":")[0]}</span>
                        <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
