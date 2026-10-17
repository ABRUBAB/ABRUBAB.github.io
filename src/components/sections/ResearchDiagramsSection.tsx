"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  Cpu, 
  Eye, 
  Network, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  Layers,
  ChevronRight,
  Database,
  UserCheck
} from "lucide-react";

export function ResearchDiagramsSection() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "comparison" | "xai" | "federated">("pipeline");
  const [simulationSample, setSimulationSample] = useState<"clear" | "ambiguous">("clear");

  return (
    <section id="research-diagrams" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/35 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Scientific Architecture & Workflows</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#EDE7DD] tracking-tight">
              Visualizing Trustworthy Medical AI
            </h2>
            <p className="text-sm sm:text-base text-[#A69C93] max-w-2xl leading-relaxed">
              Transforming black-box classifiers into self-aware clinical triage systems through Dirichlet priors, multi-scale knowledge distillation, and verifiable attribution maps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151316] hover:bg-[#1C191E] border border-white/10 hover:border-[#D4AF37] text-xs font-semibold text-[#EDE7DD] transition-all"
            >
              <span>Explore 7 Manuscripts</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </Link>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-white/10 mb-8">
          <button
            onClick={() => setActiveTab("pipeline")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 border ${
              activeTab === "pipeline"
                ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)] font-bold scale-[1.02]"
                : "bg-[#151316] text-[#A69C93] hover:text-[#EDE7DD] border-white/10 hover:border-white/20"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Uncertainty Triage Pipeline</span>
          </button>

          <button
            onClick={() => setActiveTab("comparison")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 border ${
              activeTab === "comparison"
                ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)] font-bold scale-[1.02]"
                : "bg-[#151316] text-[#A69C93] hover:text-[#EDE7DD] border-white/10 hover:border-white/20"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Softmax vs. Evidential DL</span>
          </button>

          <button
            onClick={() => setActiveTab("xai")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 border ${
              activeTab === "xai"
                ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)] font-bold scale-[1.02]"
                : "bg-[#151316] text-[#A69C93] hover:text-[#EDE7DD] border-white/10 hover:border-white/20"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Explainable AI (Grad-CAM++)</span>
          </button>

          <button
            onClick={() => setActiveTab("federated")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 border ${
              activeTab === "federated"
                ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)] font-bold scale-[1.02]"
                : "bg-[#151316] text-[#A69C93] hover:text-[#EDE7DD] border-white/10 hover:border-white/20"
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Federated Learning Topology</span>
          </button>
        </div>

        {/* TAB 1: Uncertainty-Aware Clinical Triage Pipeline */}
        {activeTab === "pipeline" && (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#151316]/90 border border-[#D4AF37]/35 backdrop-blur-xl shadow-2xl space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] block">
                  Interactive Workflow Simulator
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#EDE7DD]">
                  Evidential Deep Learning Triage Cascade
                </h3>
              </div>

              {/* Simulation Switcher */}
              <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0B0A0C] border border-white/10">
                <span className="text-xs text-[#A69C93] px-2.5 font-mono">Test Input:</span>
                <button
                  onClick={() => setSimulationSample("clear")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                    simulationSample === "clear"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "text-[#A69C93] hover:text-[#EDE7DD]"
                  }`}
                >
                  Clear Scan (In-Distribution)
                </button>
                <button
                  onClick={() => setSimulationSample("ambiguous")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                    simulationSample === "ambiguous"
                      ? "bg-[#6E1423] text-[#FFF2A3] border border-[#8E1C30]"
                      : "text-[#A69C93] hover:text-[#EDE7DD]"
                  }`}
                >
                  Corrupted / Out-of-Distribution
                </button>
              </div>
            </div>

            {/* Visual Workflow Steps Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {/* Step 1: Input Scan */}
              <div className="p-5 rounded-2xl bg-[#0B0A0C] border border-white/10 space-y-2 relative group">
                <span className="w-6 h-6 rounded-lg bg-[#151316] text-[#D4AF37] text-xs font-mono flex items-center justify-center font-bold">1</span>
                <h4 className="text-sm font-bold text-[#EDE7DD]">Clinical Scan</h4>
                <p className="text-xs text-[#A69C93] leading-relaxed">
                  {simulationSample === "clear" ? "High-SNR MRI sequence (BraTS / BloodMNIST)" : "Artifact-degraded scanner frame or rare pathology"}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-[#D4AF37]">
                  <Database className="w-3.5 h-3.5" />
                  <span>Input Tensor: X</span>
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="hidden md:flex justify-center text-[#D4AF37]/50">
                <ChevronRight className="w-5 h-5" />
              </div>

              {/* Step 2: Feature Extraction */}
              <div className="p-5 rounded-2xl bg-[#0B0A0C] border border-white/10 space-y-2">
                <span className="w-6 h-6 rounded-lg bg-[#151316] text-[#D4AF37] text-xs font-mono flex items-center justify-center font-bold">2</span>
                <h4 className="text-sm font-bold text-[#EDE7DD]">Feature Backbone</h4>
                <p className="text-xs text-[#A69C93] leading-relaxed">
                  Vision Transformer (ViT-B/16) or distilled MobileNetV3 with multi-scale attention.
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-[#E5BE38]">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Latent Embeddings: z</span>
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="hidden md:flex justify-center text-[#D4AF37]/50">
                <ChevronRight className="w-5 h-5" />
              </div>

              {/* Step 3: Evidential Dirichlet Head */}
              <div className="p-5 rounded-2xl bg-[#0B0A0C] border border-[#D4AF37]/40 space-y-2 shadow-lg">
                <span className="w-6 h-6 rounded-lg bg-[#D4AF37]/20 text-[#E5BE38] text-xs font-mono flex items-center justify-center font-bold">3</span>
                <h4 className="text-sm font-bold text-[#EDE7DD]">Dirichlet Head</h4>
                <p className="text-xs text-[#A69C93] leading-relaxed">
                  Maps logits to non-negative evidence: α_k = e_k + 1. Total evidence S = Σα_k.
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-[#FFF2A3]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Vacuity: u = K / S</span>
                </div>
              </div>
            </div>

            {/* Split Triage Decision Outcome Card */}
            <div className="p-6 rounded-2xl bg-[#0B0A0C] border-2 border-dashed border-[#D4AF37]/50 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] block">
                Step 4: Autonomous Confidence Triage Decision
              </span>

              {simulationSample === "clear" ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Low Epistemic Vacuity (u = 0.04) → Autonomous Diagnostic Triage</span>
                    </div>
                    <p className="text-xs text-[#A69C93]">
                      Model possesses sufficient evidence support. Scan is categorized autonomously at <strong>98.33% verified accuracy</strong> (MSEA-Net benchmark).
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold shrink-0">
                    PASS: Fast Triage
                  </span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#6E1423]/25 border border-[#8E1C30]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#FFF2A3] font-bold text-sm">
                      <AlertTriangle className="w-4 h-4 text-[#D4AF37]" />
                      <span>High Epistemic Vacuity (u = 0.89) → Routed to Human Clinical Specialist</span>
                    </div>
                    <p className="text-xs text-[#A69C93]">
                      Evidence deficit detected! Standard softmax would produce a silent 99% false prediction. Evidential gate halts automated classification and escalates to a radiologist.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-[#6E1423] text-white font-mono text-xs font-bold shrink-0 border border-[#8E1C30]">
                    ESCALATE: Radiologist Review
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Softmax vs. Evidential Deep Learning */}
        {activeTab === "comparison" && (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#151316]/90 border border-[#D4AF37]/35 backdrop-blur-xl shadow-2xl space-y-6 animate-fadeIn">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] block">
                Theoretical Rigour & Clinical Safety
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#EDE7DD]">
                Conventional Softmax vs. Evidential Deep Learning
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Softmax */}
              <div className="p-6 rounded-2xl bg-[#0B0A0C] border border-red-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-red-400 font-bold">Standard Practice</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/10 text-red-300">High Clinical Risk</span>
                </div>
                <h4 className="text-base font-serif font-bold text-[#EDE7DD]">Conventional Softmax Point Estimates</h4>
                <div className="p-3 rounded-xl bg-white/5 font-mono text-xs text-[#A69C93] space-y-1">
                  <span>Formula: p_k = exp(z_k) / Σ exp(z_j)</span>
                  <span className="block text-red-400 font-bold">Constraint: Σ p_k = 1.0 (Forces false confidence)</span>
                </div>
                <ul className="space-y-2 text-xs text-[#A69C93] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>Cannot distinguish between lack of knowledge (vacuity) and balanced multi-class probability.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>Produces silent 99%+ overconfident diagnoses on out-of-distribution scanner noise or unfamiliar patient demographics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>No built-in metric for safe clinical referral.</span>
                  </li>
                </ul>
              </div>

              {/* Right: Evidential DL */}
              <div className="p-6 rounded-2xl bg-[#0B0A0C] border border-[#D4AF37]/50 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#E5BE38] font-bold">My Research Methodology</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#D4AF37]/20 text-[#FFF2A3]">Trustworthy Triage</span>
                </div>
                <h4 className="text-base font-serif font-bold text-[#EDE7DD]">Dirichlet Evidential Deep Learning</h4>
                <div className="p-3 rounded-xl bg-[#D4AF37]/10 font-mono text-xs text-[#E5BE38] space-y-1 border border-[#D4AF37]/30">
                  <span>Prior: Dir(p | α), where α_k = e_k + 1</span>
                  <span className="block text-[#FFF2A3] font-bold">Uncertainty Metric: u = K / S, where S = Σ α_k</span>
                </div>
                <ul className="space-y-2 text-xs text-[#A69C93] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] font-bold">✓</span>
                    <span>Explicitly decouples epistemic vacuity (no evidence) from aleatoric dissonance (conflicting evidence).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] font-bold">✓</span>
                    <span>Single-pass deterministic inference requiring 0 extra GPU forward passes (unlike Monte Carlo dropout).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] font-bold">✓</span>
                    <span>Enables calibrated risk triage: rejects uncertain scans to human experts while automating routine cases.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Explainable AI & Grad-CAM++ */}
        {activeTab === "xai" && (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#151316]/90 border border-[#D4AF37]/35 backdrop-blur-xl shadow-2xl space-y-6 animate-fadeIn">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] block">
                Neurosurgical & Radiological Verification
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#EDE7DD]">
                Explainable AI (XAI): Multi-Scale Grad-CAM++ Heatmaps
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Image 1: MRI Slice */}
              <div className="p-5 rounded-2xl bg-[#0B0A0C] border border-white/10 space-y-3">
                <span className="text-xs font-mono text-[#D4AF37] block uppercase">1. Raw MRI Volume</span>
                <div className="h-44 rounded-xl bg-gradient-to-b from-[#18151A] via-[#100E12] to-[#18151A] border border-white/5 flex flex-col items-center justify-center p-4 text-center">
                  <Layers className="w-8 h-8 text-[#A69C93] mb-2" />
                  <span className="text-xs text-[#EDE7DD] font-semibold">T1 / T2 / FLAIR Axial Slice</span>
                  <span className="text-[10px] text-[#A69C93] font-mono mt-1">BraTS 2021 Dataset</span>
                </div>
                <p className="text-[11px] text-[#A69C93]">Input sequence presenting suspected intracranial lesion.</p>
              </div>

              {/* Image 2: Multi-Scale Attribution */}
              <div className="p-5 rounded-2xl bg-[#0B0A0C] border border-[#D4AF37]/30 space-y-3">
                <span className="text-xs font-mono text-[#E5BE38] block uppercase">2. Feature Gradient Flow</span>
                <div className="h-44 rounded-xl bg-gradient-to-tr from-[#6E1423]/40 via-[#18151A] to-[#D4AF37]/20 border border-white/5 flex flex-col items-center justify-center p-4 text-center">
                  <Activity className="w-8 h-8 text-[#D4AF37] mb-2" />
                  <span className="text-xs text-[#FFF2A3] font-semibold">Grad-CAM++ Attributions</span>
                  <span className="text-[10px] text-[#A69C93] font-mono mt-1">DenseNet + ConvNeXt Teachers</span>
                </div>
                <p className="text-[11px] text-[#A69C93]">Computes second-order partial derivatives matching tumor edges.</p>
              </div>

              {/* Image 3: Clinician Verification */}
              <div className="p-5 rounded-2xl bg-[#0B0A0C] border border-emerald-500/30 space-y-3">
                <span className="text-xs font-mono text-emerald-400 block uppercase">3. Clinical Validation</span>
                <div className="h-44 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center p-4 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
                  <span className="text-xs text-emerald-300 font-bold">92.3% Boundary Agreement</span>
                  <span className="text-[10px] text-[#A69C93] font-mono mt-1">Neurosurgical Overlap Metric</span>
                </div>
                <p className="text-[11px] text-[#A69C93]">Validates that model attends to genuine oncological tissue, not scanner noise.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Federated Learning Topology */}
        {activeTab === "federated" && (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#151316]/90 border border-[#D4AF37]/35 backdrop-blur-xl shadow-2xl space-y-6 animate-fadeIn">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] block">
                Privacy-Preserving Multi-Center Intelligence
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#EDE7DD]">
                HealthSentinel AI: Distributed Clinical Topology
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#0B0A0C] border border-white/10 space-y-2">
                <span className="text-xs font-mono text-[#D4AF37] block">Hospital Node Alpha</span>
                <h4 className="text-sm font-bold text-[#EDE7DD]">Clinical Notes & EHR</h4>
                <p className="text-xs text-[#A69C93]">Local model training under strict DP-SGD (Differential Privacy). Zero raw health records leave premises.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B0A0C] border border-white/10 space-y-2">
                <span className="text-xs font-mono text-[#E5BE38] block">Hospital Node Beta</span>
                <h4 className="text-sm font-bold text-[#EDE7DD]">Diagnostic Imaging (CT/MRI)</h4>
                <p className="text-xs text-[#A69C93]">Gradient sparsification achieves 78% bandwidth reduction across low-resource regional networks.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B0A0C] border border-[#6E1423]/80 space-y-2">
                <span className="text-xs font-mono text-[#FFF2A3] block">Central Aggregator</span>
                <h4 className="text-sm font-bold text-[#EDE7DD]">Federated Averaging + Priors</h4>
                <p className="text-xs text-[#A69C93]">Global weights aggregation with formal privacy guarantee of (ε=1.2, δ=10⁻⁵). 94.6% tri-modal synergy.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
