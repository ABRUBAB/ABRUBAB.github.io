"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Code2, 
  ExternalLink, 
  Award, 
  ArrowRight, 
  Cpu, 
  Activity, 
  Layers, 
  ShieldCheck, 
  Terminal, 
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { projects } from "@/content/portfolioData";

export function VisualProjectsSection() {
  const [selectedMriClass, setSelectedMriClass] = useState<"glioma" | "meningioma" | "pituitary">("glioma");
  const [telemetrySimActive, setTelemetrySimActive] = useState(false);

  return (
    <section id="visual-projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/35 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD]">
              <Code2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Applied Engineering & Systems</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#EDE7DD] tracking-tight">
              Flagship Projects & Live Systems
            </h2>
            <p className="text-sm sm:text-base text-[#A69C93] max-w-2xl leading-relaxed">
              Real open-source codebases, distributed telemetry platforms, and clinically validated diagnostic web applications.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151316] hover:bg-[#1C191E] border border-white/10 hover:border-[#D4AF37] text-xs font-semibold text-[#EDE7DD] transition-all self-start md:self-end"
          >
            <span>Explore All Project Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </Link>
        </div>

        {/* Heterogeneous Visual Compositions Grid */}
        <div className="space-y-8">
          {/* PROJECT 1: NeuralSched (Large Featured Showcase with Visual Architecture & Telemetry) */}
          <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#18151A]/95 via-[#121014]/95 to-[#18151A]/95 border-2 border-[#D4AF37]/60 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-bold text-[#E5BE38]">
                  <Award className="w-3.5 h-3.5" />
                  <span>Champion (1st Place Winner) • DIU AI Innovation Hackathon 2026</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#EDE7DD]">
                  NeuralSched: GPU-Cluster Intelligence Middleware
                </h3>
                <p className="text-xs sm:text-sm text-[#A69C93] max-w-3xl">
                  Middleware operating above Kubernetes and SLURM. Employs four cooperative ML models to predict hardware failure 45 minutes in advance, triggering automated checkpoint offloading with zero GPU work loss.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="https://github.com/ABRUBAB/neuralsched"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all shadow-md active:scale-95 border border-[#8E1C30]"
                >
                  <GithubIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>

            {/* Visual Telemetry & Architecture Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Architecture Nodes Flow (7 Cols) */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0B0A0C] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                    Pipeline Architecture Topology
                  </span>
                  <span className="text-[10px] font-mono text-[#A69C93]">4 Cooperating ML Models</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#151316] border border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-[#E5BE38] text-xs font-bold">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>GraphSAGE GNN + PPO</span>
                    </div>
                    <p className="text-[11px] text-[#A69C93]">
                      Topology-aware job placement optimizing PCIe bandwidth and node proximity.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#151316] border border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Carbon-Aware LSTM</span>
                    </div>
                    <p className="text-[11px] text-[#A69C93]">
                      Green scheduling shifting non-urgent batch training to low-carbon grid windows.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#151316] border border-[#6E1423]/60 space-y-1">
                    <div className="flex items-center gap-2 text-[#FFF2A3] text-xs font-bold">
                      <AlertCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>TCN Failure Predictor + SHAP</span>
                    </div>
                    <p className="text-[11px] text-[#A69C93]">
                      Monitors VRAM thermals & bus errors to forecast crashes 45 min before failure.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#151316] border border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Checkpoint Offloader</span>
                    </div>
                    <p className="text-[11px] text-[#A69C93]">
                      Automated migration to standby nodes, eliminating lost compute hours.
                    </p>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {["PyTorch", "GraphSAGE", "Temporal ConvNet", "FastAPI", "PostgreSQL", "React", "SLURM"].map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-white/5 border border-white/10 text-[#EDE7DD]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Verified Telemetry Metrics (5 Cols) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0B0A0C] border border-[#D4AF37]/35 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-semibold block">
                    Verified Benchmark Metrics
                  </span>
                  <span className="text-[11px] text-[#A69C93]">Measured in multi-GPU cluster simulation</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-[#151316] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#A69C93] block">Pre-Crash Lead Time</span>
                      <strong className="text-base font-serif text-[#E5BE38]">45 Minutes</strong>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                      Zero Work Loss
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#151316] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#A69C93] block">False Alarm Reduction</span>
                      <strong className="text-base font-serif text-[#E5BE38]">64% Decrease</strong>
                    </div>
                    <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded">
                      Calibrated Thresholds
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#151316] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#A69C93] block">Hackathon Award</span>
                      <strong className="text-base font-serif text-[#FFF2A3]">1st Place Champion</strong>
                    </div>
                    <span className="text-[10px] font-mono text-white bg-[#6E1423] px-2 py-1 rounded">
                      50+ Teams
                    </span>
                  </div>
                </div>

                <div className="text-[10px] text-[#A69C93] font-mono flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Presented to DIU Leadership & World AI Alliance (WAA)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2-COLUMN ROW: Brain Tumor MRI (Interactive Grad-CAM) + ResearchForge-AI */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* PROJECT 2: Brain Tumor MRI Classification (Interactive Grad-CAM++ Preview) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#151316]/90 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                    Neuro-Oncology & Explainability
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Live Demo Online
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#EDE7DD]">
                  Brain Tumor MRI Classification & Grad-CAM++
                </h3>

                <p className="text-xs sm:text-sm text-[#A69C93] leading-relaxed">
                  Ensemble of ConvNeXt, Vision Transformer (ViT-B/16), and EfficientNetV2 for 4-class intracranial lesion classification with clinician-facing Grad-CAM++ attribution heatmaps.
                </p>

                {/* Interactive Class Selector & Heatmap Visualizer */}
                <div className="p-4 rounded-2xl bg-[#0B0A0C] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A69C93] font-mono">Select Pathology:</span>
                    <div className="flex gap-1.5">
                      {(["glioma", "meningioma", "pituitary"] as const).map((cls) => (
                        <button
                          key={cls}
                          onClick={() => setSelectedMriClass(cls)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono capitalize transition-all ${
                            selectedMriClass === cls
                              ? "bg-[#D4AF37] text-black font-bold"
                              : "bg-[#151316] text-[#A69C93] hover:text-[#EDE7DD]"
                          }`}
                        >
                          {cls}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Slice & Overlay Canvas Graphic */}
                  <div className="h-32 rounded-xl bg-gradient-to-tr from-[#151316] via-[#100E12] to-[#1C191E] border border-white/10 flex items-center justify-between p-4 relative overflow-hidden">
                    <div className="space-y-1 z-10">
                      <span className="text-[10px] font-mono text-[#D4AF37] block uppercase">
                        Diagnosed: {selectedMriClass.toUpperCase()}
                      </span>
                      <strong className="text-sm font-bold text-[#EDE7DD] block">
                        Confidence: 96.8% (±0.4% Epistemic)
                      </strong>
                      <span className="text-[10px] text-[#A69C93] font-mono block">
                        Inference Latency: 14ms (Single T4 GPU)
                      </span>
                    </div>

                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#6E1423]/80 via-[#D4AF37]/50 to-transparent border border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center p-2 text-center">
                      <span className="text-[9px] font-mono font-bold text-[#FFF2A3]">
                        Grad-CAM++ Hotspot
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href="https://huggingface.co/spaces/ABRUBAB/brain-tumor-classifier"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all border border-[#8E1C30]"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Hugging Face Spaces</span>
                  </a>

                  <a
                    href="https://github.com/ABRUBAB/brain-tumor-mri-classification"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B0A0C] hover:bg-white/5 border border-white/10 text-xs font-semibold text-[#EDE7DD] transition-all"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Code</span>
                  </a>
                </div>

                <span className="text-xs font-mono text-[#A69C93]">
                  92.3% Boundary Agreement
                </span>
              </div>
            </div>

            {/* PROJECT 3: ResearchForge-AI (Multi-Agent Swarm) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#151316]/90 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                    Multi-Agent AI Systems
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/15 text-[#E5BE38] border border-[#D4AF37]/30">
                    13 Agents Swarm
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#EDE7DD]">
                  ResearchForge-AI: Autonomous Q1 Research Swarm
                </h3>

                <p className="text-xs sm:text-sm text-[#A69C93] leading-relaxed">
                  Coordinates 13 specialized LLM agents in three automated phases: literature review, architecture debate and mathematical verification, and code generation with automated Kaggle experiment execution.
                </p>

                {/* 3-Phase Workflow Diagram */}
                <div className="p-4 rounded-2xl bg-[#0B0A0C] border border-white/5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A69C93] font-mono">Agent Execution Pipeline:</span>
                    <span className="text-[#D4AF37] font-mono text-[10px]">LangGraph Orchestrated</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-xl bg-[#151316] border border-white/5 text-center space-y-1">
                      <span className="text-[10px] font-mono text-[#D4AF37] block">Phase 1</span>
                      <strong className="text-xs text-[#EDE7DD] block leading-tight">Literature Synthesis</strong>
                      <span className="text-[9px] text-[#A69C93] block">Dense RAG + DOIs</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#151316] border border-white/5 text-center space-y-1">
                      <span className="text-[10px] font-mono text-[#E5BE38] block">Phase 2</span>
                      <strong className="text-xs text-[#EDE7DD] block leading-tight">Theory Debate</strong>
                      <span className="text-[9px] text-[#A69C93] block">Math Formalization</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#151316] border border-white/5 text-center space-y-1">
                      <span className="text-[10px] font-mono text-emerald-400 block">Phase 3</span>
                      <strong className="text-xs text-[#EDE7DD] block leading-tight">Code Execution</strong>
                      <span className="text-[9px] text-[#A69C93] block">Kaggle GPU Runs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href="https://github.com/ABRUBAB/ResearchForge-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all border border-[#8E1C30]"
                >
                  <GithubIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span>GitHub Repository</span>
                </a>

                <div className="flex items-center gap-3 text-xs font-mono text-[#A69C93]">
                  <span>4.5x Speedup</span>
                  <span>•</span>
                  <span className="text-emerald-400">99.2% DOI Precision</span>
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT 4: UVERA (AI DEV FEST 2026 - 4th Place Finalist) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#151316]/90 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-bold text-[#E5BE38]">
                <Award className="w-3.5 h-3.5" />
                <span>4th Place Finalist • AI DEV FEST 2026 AI Hackathon</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#EDE7DD]">
                UVERA: Editorial Multi-Modal Fraud Prevention
              </h3>
              <p className="text-xs sm:text-sm text-[#A69C93] leading-relaxed">
                A 3-layer trust field architecture evaluating multi-modal transaction risks under 18ms. Triggers a mid-edge pause ring to hold fraudulent transactions in real-time with zero friction for legitimate users.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <div className="p-3 rounded-xl bg-[#0B0A0C] border border-white/10 text-center font-mono">
                <span className="text-[10px] text-[#A69C93] block uppercase">Scoring Latency</span>
                <strong className="text-sm font-bold text-[#E5BE38]">&lt;18ms</strong>
              </div>
              <a
                href="https://github.com/ABRUBAB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B0A0C] hover:bg-white/5 border border-white/10 text-xs font-semibold text-[#EDE7DD] hover:text-[#E5BE38] hover:border-[#D4AF37] transition-all"
              >
                <GithubIcon className="w-4 h-4 text-[#D4AF37]" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
