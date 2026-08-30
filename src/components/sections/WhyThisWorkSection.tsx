"use client";

import dynamic from "next/dynamic";
import { UncertaintySimDemo } from "../ui/UncertaintySimDemo";
import { AlertCircle, CheckCircle2, ShieldCheck, Activity } from "lucide-react";

const MedicalBrainScene = dynamic(
  () => import("../3d/MedicalBrainScene").then((mod) => mod.MedicalBrainScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[360px] sm:h-[420px] rounded-3xl bg-[#0B0A0C] border border-white/10 flex items-center justify-center text-xs font-mono text-[#A69C93]">
        <span className="text-[#D4AF37]">Rendering 3D Evidential Neural Manifold...</span>
      </div>
    ),
  }
);

export function WhyThisWorkSection() {
  return (
    <section id="clinical-vision" className="py-20 relative">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#6E1423]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/30 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD] mb-3">
            <Activity className="w-3.5 h-3.5 text-[#D4AF37]" />
            Clinical Problem & Methodology
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#EDE7DD] tracking-tight">
            The Quest for Calibrated Confidence in Medical AI
          </h2>
          <p className="text-sm sm:text-base text-[#A69C93] mt-3 leading-relaxed">
            Standard deep learning models suffer from silent overconfidence—generating 99% confident diagnostic predictions even on corrupt inputs or rare pathologies. My research equips models with epistemic self-awareness, ensuring they autonomously recognize their uncertainty and trigger specialist triage.
          </p>
        </div>

        {/* 3D Medical Brain & Synaptic Evidential Matrix */}
        <div className="mb-10">
          <MedicalBrainScene />
        </div>

        {/* Comparison Cards: Overconfident Black Box vs. Evidential Triage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card 1: Standard AI Problem */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#151316] border border-rose-950/60 shadow-lg relative overflow-hidden">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4" />
              The Baseline Problem: Overconfident Softmax
            </div>
            <h3 className="text-lg font-serif font-bold text-[#EDE7DD] mb-2">
              Silent Misdiagnosis on Out-of-Distribution Scans
            </h3>
            <p className="text-xs sm:text-sm text-[#A69C93] leading-relaxed mb-4">
              Standard cross-entropy forces neural networks to arbitrarily divide 100% probability across known classes, generating confident false positives on scanner artifacts or novel pathological mutations.
            </p>
            <div className="p-3 bg-[#0B0A0C] rounded-xl border border-white/5 font-mono text-xs text-rose-300/80">
              Output: Point Softmax &rarr; 98.5% False Certainty
            </div>
          </div>

          {/* Card 2: Evidential Deep Learning Solution */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#151316] border border-[#D4AF37]/50 shadow-[0_0_25px_rgba(212,175,55,0.12)] relative overflow-hidden">
            <div className="flex items-center gap-2 text-[#E5BE38] text-xs font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              Our Methodology: Evidential Deep Learning & Triage
            </div>
            <h3 className="text-lg font-serif font-bold text-[#EDE7DD] mb-2">
              Epistemic Vacuity & Autonomous Clinical Triage
            </h3>
            <p className="text-xs sm:text-sm text-[#A69C93] leading-relaxed mb-4">
              By parameterizing Dirichlet priors over belief space, networks compute total evidence <em>S</em> and explicit epistemic vacuity <em>u = K/S</em>, routing uncertain scans to senior clinicians.
            </p>
            <div className="p-3 bg-[#0B0A0C] rounded-xl border border-[#D4AF37]/35 font-mono text-xs text-[#E5BE38]">
              Output: Dirichlet Evidence &rarr; Vacuity (<em>u = 0.85</em>) &rarr; <span className="text-white font-bold">Specialist Triage</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Dirichlet Simulator */}
        <UncertaintySimDemo />
      </div>
    </section>
  );
}
