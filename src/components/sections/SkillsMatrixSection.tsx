"use client";

import { skillCategories } from "@/content/portfolioData";
import { Cpu, Eye, Network, Code2, Globe2, CheckCircle2 } from "lucide-react";

export function SkillsMatrixSection() {
  const getCategoryIcon = (category: string) => {
    if (category.includes("Medical AI")) return <Cpu className="w-4 h-4 text-[#D4AF37]" />;
    if (category.includes("Explainability")) return <Eye className="w-4 h-4 text-[#D4AF37]" />;
    if (category.includes("Distributed")) return <Network className="w-4 h-4 text-[#D4AF37]" />;
    if (category.includes("Languages & Core")) return <Code2 className="w-4 h-4 text-[#D4AF37]" />;
    return <Globe2 className="w-4 h-4 text-[#D4AF37]" />;
  };

  return (
    <section id="skills-matrix" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/35 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD] mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#EDE7DD] tracking-tight">
            Competency & Tooling Matrix
          </h2>
          <p className="text-sm sm:text-base text-[#A69C93] mt-2 leading-relaxed">
            Organized by functional domains. Transparent capability profiles without arbitrary percentage bars.
          </p>
        </div>

        {/* Structured Visual Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-3xl bg-[#151316]/90 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-xl transition-all space-y-4 shadow-xl"
            >
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                {getCategoryIcon(group.category)}
                <h3 className="text-base font-serif font-bold text-[#EDE7DD]">
                  {group.category}
                </h3>
              </div>

              <div className="space-y-3">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-2.5 rounded-xl bg-[#0B0A0C] border border-white/5 space-y-1 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#EDE7DD]">
                        {item.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          item.level === "Expert"
                            ? "bg-[#D4AF37]/15 text-[#E5BE38] border border-[#D4AF37]/30"
                            : item.level === "Advanced"
                            ? "bg-white/10 text-[#EDE7DD]"
                            : "bg-white/5 text-[#A69C93]"
                        }`}
                      >
                        {item.level}
                      </span>
                    </div>

                    {item.note && (
                      <p className="text-[11px] text-[#A69C93] leading-snug">
                        {item.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
