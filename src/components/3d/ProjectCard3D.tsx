"use client";

import { useState, useRef } from "react";
import { Project } from "@/content/types";
import { ExternalLink, Activity, Eye, Layers, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

interface ProjectCard3DProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export function ProjectCard3D({ project, onOpenDetails }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Render authentic diagnostic result visualization for back face / texture
  const renderDiagnosticVisual = () => {
    switch (project.visualType) {
      case "gradcam":
        return (
          <div className="relative w-full h-44 rounded-lg bg-[#0B0A0C] border border-[#C9A227]/40 p-3 overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] text-[#A69C93] font-mono">
              <span className="flex items-center gap-1 text-[#E5BE38]">
                <Eye className="w-3.5 h-3.5" /> Grad-CAM Heatmap
              </span>
              <span>Slice: Axial T1-Gd</span>
            </div>
            
            {/* Simulated MRI scan with radiological Grad-CAM heatmap overlay */}
            <div className="relative my-auto h-24 w-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 rounded border border-white/10 flex items-center justify-center overflow-hidden">
              {/* Brain anatomical silhouette */}
              <div className="w-20 h-20 rounded-full border border-neutral-700/60 bg-black/40 flex items-center justify-center relative">
                {/* High activation lesion region */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6E1423] via-[#C9A227] to-[#FFE380] blur-[7px] opacity-90 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center text-[9px] font-mono text-white font-bold drop-shadow">
                  Glioma 96.8%
                </div>
              </div>
            </div>

            <div className="text-[10px] text-[#A69C93] flex justify-between font-mono">
              <span>Agreement: 92.3%</span>
              <span className="text-[#C9A227]">p-val &lt; 0.001</span>
            </div>
          </div>
        );

      case "coverage_curve":
      case "architecture":
        return (
          <div className="relative w-full h-44 rounded-lg bg-[#0B0A0C] border border-[#6E1423]/50 p-3 overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] text-[#A69C93] font-mono">
              <span className="flex items-center gap-1 text-[#C9A227]">
                <Layers className="w-3.5 h-3.5" /> Tri-Modal Architecture
              </span>
              <span>DP: (ε=1.2)</span>
            </div>

            {/* Architecture node flow */}
            <div className="my-auto py-2 flex items-center justify-around text-[10px] font-mono text-[#EDE7DD]">
              <div className="p-2 rounded bg-[#1C191E] border border-white/10 text-center">
                <span className="block text-[9px] text-[#A69C93]">Clinical Text</span>
                <span className="text-[#C9A227] font-bold">BioBERT</span>
              </div>
              <div className="text-[#6E1423] font-bold">→</div>
              <div className="p-2 rounded bg-[#6E1423]/25 border border-[#6E1423] text-center">
                <span className="block text-[9px] text-[#A69C93]">Fusion Core</span>
                <span className="text-[#E5BE38] font-bold">Cross-Attn</span>
              </div>
              <div className="text-[#6E1423] font-bold">→</div>
              <div className="p-2 rounded bg-[#1C191E] border border-white/10 text-center">
                <span className="block text-[9px] text-[#A69C93]">Dirichlet</span>
                <span className="text-[#C9A227] font-bold">Evidence</span>
              </div>
            </div>

            <div className="text-[10px] text-[#A69C93] flex justify-between font-mono">
              <span>Client Nodes: 8 Hospitals</span>
              <span className="text-[#E5BE38]">F1: 94.6%</span>
            </div>
          </div>
        );

      case "cluster":
        return (
          <div className="relative w-full h-44 rounded-lg bg-[#0B0A0C] border border-[#C9A227]/40 p-3 overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] text-[#A69C93] font-mono">
              <span className="flex items-center gap-1 text-[#E5BE38]">
                <Activity className="w-3.5 h-3.5" /> GPU Telemetry Stream
              </span>
              <span className="text-emerald-400">45m Lead Alert</span>
            </div>

            {/* Simulated Live telemetry pulse */}
            <div className="my-auto h-20 bg-neutral-950 rounded border border-white/5 p-2 flex items-end gap-1.5 justify-between">
              {[40, 48, 55, 62, 58, 71, 84, 92, 65, 59, 45, 52].map((val, i) => (
                <div
                  key={i}
                  className={`w-full rounded-t transition-all ${
                    val > 80 ? "bg-[#6E1423]" : val > 65 ? "bg-[#C9A227]" : "bg-neutral-700"
                  }`}
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>

            <div className="text-[10px] text-[#A69C93] flex justify-between font-mono">
              <span>Failure Vacuity: 0.89</span>
              <span className="text-[#E5BE38]">1st Place Champion</span>
            </div>
          </div>
        );

      case "agent":
      default:
        return (
          <div className="relative w-full h-44 rounded-lg bg-[#0B0A0C] border border-white/10 p-3 overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] text-[#A69C93] font-mono">
              <span className="flex items-center gap-1 text-[#C9A227]">
                <Sparkles className="w-3.5 h-3.5" /> Multi-Agent Pipeline
              </span>
              <span>4 Specialized Roles</span>
            </div>

            <div className="grid grid-cols-2 gap-2 my-auto text-[10px] font-mono">
              <div className="p-1.5 rounded bg-white/5 border border-white/10">
                <span className="text-[#C9A227] font-bold block">Literature Agent</span>
                <span className="text-[9px] text-[#A69C93]">ArXiv / PubMed RAG</span>
              </div>
              <div className="p-1.5 rounded bg-white/5 border border-white/10">
                <span className="text-[#C9A227] font-bold block">LaTeX Auditor</span>
                <span className="text-[9px] text-[#A69C93]">Formal Proof Proofing</span>
              </div>
            </div>

            <div className="text-[10px] text-[#A69C93] flex justify-between font-mono">
              <span>Zero Hallucinations</span>
              <span className="text-[#E5BE38]">99.2% DOI Match</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 w-full"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full rounded-2xl transition-transform duration-200 ease-out preserve-3d"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card Body */}
        <div className="w-full rounded-2xl bg-[#151316] border border-white/10 hover:border-[#6E1423]/80 p-6 sm:p-7 shadow-2xl transition-colors">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {project.award && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#C9A227]/20 text-[#E5BE38] border border-[#C9A227]/50">
                    <Sparkles className="w-3 h-3 text-[#E5BE38]" /> {project.award}
                  </span>
                )}
                {project.featured && !project.award && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-[#EDE7DD] border border-white/10">
                    Flagship System
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#EDE7DD]">
                {project.title}
              </h3>
            </div>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#A69C93] hover:text-[#EDE7DD] transition-colors shrink-0"
              title="Toggle Diagnostic Result View"
            >
              {isFlipped ? "Overview" : "Results"}
            </button>
          </div>

          <p className="text-xs text-[#C9A227] font-medium mb-3">{project.subtitle}</p>

          {/* Conditional View: Description or Diagnostic Result */}
          {!isFlipped ? (
            <div>
              <p className="text-xs sm:text-sm text-[#A69C93] leading-relaxed mb-4 min-h-[54px]">
                {project.description}
              </p>

              {/* Metric Highlights */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 mb-4 bg-[#0B0A0C]/50 rounded-lg px-2">
                {project.results.map((res, i) => (
                  <div key={i} className="text-center">
                    <span className="block text-xs sm:text-sm font-bold text-[#EDE7DD] font-mono">
                      {res.value}
                    </span>
                    <span className="text-[10px] text-[#A69C93] leading-tight block">
                      {res.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-4">
              {renderDiagnosticVisual()}
            </div>
          )}

          {/* Tags & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-[#0B0A0C] border border-white/5 text-[10px] text-[#A69C93]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={() => onOpenDetails(project)}
                className="text-[#E5BE38] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Deep Dive</span>
                <ExternalLink className="w-3 h-3" />
              </button>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A69C93] hover:text-[#EDE7DD] flex items-center gap-1"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
