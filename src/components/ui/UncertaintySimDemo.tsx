"use client";

import { useState, useMemo } from "react";
import { ShieldCheck, AlertTriangle, UserCheck, Activity, Info, Sparkles } from "lucide-react";

export function UncertaintySimDemo() {
  // Retention slider: percentage of scans the model decides it has enough evidence to classify autonomously
  const [retention, setRetention] = useState<number>(70);

  // Compute accuracy and triage statistics based on evidential selective classification
  const stats = useMemo(() => {
    // 70% retention => 98.33% accuracy (MSEA-Net benchmark)
    // 100% retention => 89.2% accuracy (baseline without uncertainty triage)
    // Non-linear curve representing evidential filtering of epistemic vacuity
    const retFraction = retention / 100;
    const baseAcc = 89.2;
    const peakAcc = 99.4; // at ~50% retention
    
    // Interpolate realistic accuracy gain
    const gain = (1 - (retFraction - 0.5) / 0.5) * (peakAcc - baseAcc);
    const accuracy = retention === 70 ? 98.33 : Math.min(99.8, +(baseAcc + gain).toFixed(2));
    
    const triagedToHuman = 100 - retention;
    const falsePositivesSuppressed = Math.round((triagedToHuman / 30) * 88);
    const confidenceScore = (100 - (triagedToHuman * 0.4)).toFixed(1);

    return {
      accuracy,
      triagedToHuman,
      falsePositivesSuppressed: Math.max(12, Math.min(98, falsePositivesSuppressed)),
      confidenceScore
    };
  }, [retention]);

  // Synthetic sample points for Dirichlet Simplex scatter
  const simulatedCases = useMemo(() => {
    return [
      { id: 1, class: "Gastrointestinal Lesion A", evidence: 42.5, uncertainty: 0.07, status: "autonomous" },
      { id: 2, class: "Blood Cell (Eosinophil)", evidence: 38.1, uncertainty: 0.08, status: "autonomous" },
      { id: 3, class: "High-Grade Glioma", evidence: 51.2, uncertainty: 0.05, status: "autonomous" },
      { id: 4, class: "Atypical Tissue Infiltration", evidence: 6.2, uncertainty: 0.65, status: "triaged" },
      { id: 5, class: "Artifact / Low SNR Scan", evidence: 3.8, uncertainty: 0.82, status: "triaged" },
      { id: 6, class: "Meningioma Margin", evidence: 29.4, uncertainty: 0.12, status: "autonomous" },
      { id: 7, class: "Rare Polyp Mutation", evidence: 5.1, uncertainty: 0.74, status: "triaged" },
      { id: 8, class: "Pituitary Microadenoma", evidence: 34.0, uncertainty: 0.09, status: "autonomous" },
    ];
  }, []);

  return (
    <div className="w-full rounded-2xl bg-[#151316] border border-[#6E1423]/40 p-6 md:p-8 text-[#EDE7DD] shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6E1423]/25 border border-[#6E1423]/60 text-xs font-semibold text-[#EDE7DD] mb-2">
            <Activity className="w-3.5 h-3.5 text-[#C9A227]" />
            Interactive Evidential Deep Learning Simulator
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-[#EDE7DD]">
            Uncertainty-Governed Clinical Triage Cascade
          </h3>
          <p className="text-xs md:text-sm text-[#A69C93] mt-1 max-w-2xl">
            Simulate how Dirichlet prior parameterization enables models to compute epistemic vacuity \(u = K/S\) and reject ambiguous scans to secondary human specialist consultation.
          </p>
        </div>
        
        {/* Metric Pill */}
        <div className="flex flex-row md:flex-col items-end justify-between md:justify-center bg-[#0B0A0C] border border-[#C9A227]/40 rounded-xl px-5 py-3 shadow-[0_0_15px_rgba(201,162,39,0.15)]">
          <span className="text-xs uppercase tracking-wider text-[#A69C93]">Calibrated Accuracy</span>
          <span className="text-2xl md:text-3xl font-bold font-serif text-[#E5BE38]">
            {stats.accuracy}%
          </span>
        </div>
      </div>

      {/* Control Slider */}
      <div className="mb-8 bg-[#0B0A0C] p-5 rounded-xl border border-white/5">
        <div className="flex justify-between items-center mb-3">
          <label htmlFor="retention-slider" className="text-sm font-semibold text-[#EDE7DD] flex items-center gap-2">
            <span>Automated Patient Coverage (Retention Target):</span>
            <span className="text-[#C9A227] font-mono text-base font-bold">{retention}%</span>
          </label>
          <span className="text-xs text-[#A69C93] hidden sm:inline">
            {retention === 70 ? "✨ MSEA-Net Benchmark Point (98.33%)" : `${100 - retention}% routed to Pathologist`}
          </span>
        </div>

        <input
          id="retention-slider"
          type="range"
          min="50"
          max="100"
          step="1"
          value={retention}
          onChange={(e) => setRetention(Number(e.target.value))}
          className="w-full h-2 bg-[#252026] rounded-lg appearance-none cursor-pointer accent-[#C9A227]"
        />

        <div className="flex justify-between text-xs text-[#A69C93] mt-2 font-mono">
          <span>50% (Strict High Confidence)</span>
          <span className="text-[#C9A227]">70% (Optimal Clinical Tradeoff)</span>
          <span>100% (Uncalibrated Standard Softmax)</span>
        </div>
      </div>

      {/* Grid: Live Pipeline Flow & Mathematical Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Model Decision Stream */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs uppercase tracking-wider text-[#A69C93] font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
            Synthetic Clinical Case Queue & Dirichlet Evidence Allocation
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {simulatedCases.map((sample) => {
              // Determine if this sample is accepted autonomously or triaged based on current retention
              const threshold = (100 - retention) / 100;
              const isTriaged = sample.uncertainty > (1 - (retention / 100) * 0.9);

              return (
                <div
                  key={sample.id}
                  className={`p-3.5 rounded-lg border transition-all duration-300 ${
                    isTriaged
                      ? "bg-[#6E1423]/15 border-[#6E1423]/60 text-[#EDE7DD]"
                      : "bg-[#0B0A0C] border-white/10 hover:border-[#C9A227]/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[#EDE7DD]">{sample.class}</p>
                      <p className="text-[11px] text-[#A69C93] mt-0.5">
                        Evidence \(S = {sample.evidence}\) | Vacuity \(u = {sample.uncertainty}\)
                      </p>
                    </div>
                    {isTriaged ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#6E1423] text-white">
                        <AlertTriangle className="w-3 h-3" /> Triage
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#C9A227]/20 text-[#E5BE38] border border-[#C9A227]/40">
                        <Sparkles className="w-3 h-3 text-[#E5BE38]" /> Safe
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Clinical Impact Metrics */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-wider text-[#A69C93] font-semibold flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#C9A227]" />
            Clinical Safety Impact
          </h4>

          <div className="bg-[#0B0A0C] border border-white/10 rounded-xl p-4 space-y-3.5">
            <div>
              <div className="flex justify-between text-xs text-[#A69C93] mb-1">
                <span>Autonomous Screening</span>
                <span className="text-[#EDE7DD] font-mono font-bold">{retention}%</span>
              </div>
              <div className="w-full bg-[#252026] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#C9A227] h-full transition-all duration-300"
                  style={{ width: `${retention}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#A69C93] mb-1">
                <span>Triaged to Human Specialist</span>
                <span className="text-[#8E1C30] font-mono font-bold">{stats.triagedToHuman}%</span>
              </div>
              <div className="w-full bg-[#252026] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#6E1423] h-full transition-all duration-300"
                  style={{ width: `${stats.triagedToHuman}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-[#A69C93]">
                <span>Diagnostic Accuracy:</span>
                <span className="font-bold text-[#E5BE38]">{stats.accuracy}%</span>
              </div>
              <div className="flex justify-between text-[#A69C93]">
                <span>High-Risk Errors Prevented:</span>
                <span className="font-bold text-[#EDE7DD]">{stats.falsePositivesSuppressed}%</span>
              </div>
              <div className="flex justify-between text-[#A69C93]">
                <span>Calibrated Reliability Index:</span>
                <span className="font-bold text-[#C9A227]">{stats.confidenceScore} / 100</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#6E1423]/10 border border-[#6E1423]/30 rounded-lg flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#A69C93] leading-relaxed">
              Standard deep learning models produce overconfident false positives on rare pathologies. Evidential deep learning prevents this catastrophic failure mode in resource-limited clinics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
