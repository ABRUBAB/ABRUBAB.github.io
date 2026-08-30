"use client";

import { useState } from "react";
import { flagshipProjects } from "@/content/portfolioData";
import { Project } from "@/content/types";
import { ProjectCard3D } from "../3d/ProjectCard3D";
import { 
  CheckCircle2, 
  X, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  Cpu, 
  ShieldCheck 
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6E1423]/25 border border-[#6E1423]/60 text-xs font-semibold text-[#EDE7DD] mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#C9A227]" />
            Section 04 • Applied Engineering Systems
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#EDE7DD] tracking-tight">
            Flagship Medical AI & Distributed Systems
          </h2>
          <p className="text-sm sm:text-base text-[#A69C93] mt-3 leading-relaxed">
            Translating theoretical uncertainty formulations into production-grade clinical pipelines, multi-agent frameworks, and high-performance GPU infrastructure platforms.
          </p>
        </div>

        {/* 3D Tilt Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flagshipProjects.map((project) => (
            <ProjectCard3D
              key={project.id}
              project={project}
              onOpenDetails={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>
      </div>

      {/* Deep-Dive Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#151316] border border-[#6E1423]/70 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#EDE7DD] overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {selectedProject.award && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-[#C9A227]/20 text-[#E5BE38] border border-[#C9A227]/50">
                      <Sparkles className="w-3.5 h-3.5 text-[#E5BE38]" /> {selectedProject.award}
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#EDE7DD]">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#C9A227] mt-0.5">
                  {selectedProject.subtitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg text-[#A69C93] hover:text-[#EDE7DD] hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6 text-xs sm:text-sm">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#A69C93] font-semibold mb-2">
                  System Architecture & Implementation
                </h4>
                <p className="text-[#EDE7DD] leading-relaxed">
                  {selectedProject.longDescription}
                </p>
              </div>

              {/* Benchmark Results */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#A69C93] font-semibold mb-2">
                  Validated Results & Quantitative Metrics
                </h4>
                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#0B0A0C] border border-white/10">
                  {selectedProject.results.map((r, idx) => (
                    <div key={idx} className="text-center">
                      <span className="block text-base sm:text-lg font-bold font-mono text-[#E5BE38]">
                        {r.value}
                      </span>
                      <span className="text-xs font-semibold text-[#EDE7DD] block mt-0.5">
                        {r.label}
                      </span>
                      {r.sublabel && (
                        <span className="text-[10px] text-[#A69C93] block mt-0.5">
                          {r.sublabel}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Methods Used */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#A69C93] font-semibold mb-2">
                  Core Algorithmic Innovations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.methods.map((m) => (
                    <span
                      key={m}
                      className="px-3 py-1 rounded-lg bg-[#6E1423]/25 border border-[#6E1423]/60 text-xs text-[#EDE7DD]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[11px] text-[#A69C93]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all shadow-md"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
