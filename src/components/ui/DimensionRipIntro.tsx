"use client";

import { useState, useEffect } from "react";
import { Sparkles, Cpu, Terminal, ArrowRight, Zap, ShieldCheck } from "lucide-react";

interface DimensionRipIntroProps {
  onComplete?: () => void;
}

export function DimensionRipIntro({ onComplete }: DimensionRipIntroProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING NEURAL KERNEL...");
  const [stage, setStage] = useState<"loading" | "ripping" | "complete">("loading");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fast telemetry boot progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 14) + 7;
        return next > 100 ? 100 : next;
      });
    }, 110);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 25) {
      setStatusText("CALIBRATING DIRICHLET BELIEF SIMPLEX...");
    } else if (progress < 60) {
      setStatusText("DECODING EPISTEMIC UNCERTAINTY TENSORS...");
    } else if (progress < 88) {
      setStatusText("SYNCHRONIZING DIU & NBTC GPU CLUSTERS...");
    } else if (progress >= 100) {
      setStatusText("DIMENSIONAL BARRIER BREACH: ACCESS GRANTED");
      // Trigger rip after a small pause
      const ripTimeout = setTimeout(() => {
        setStage("ripping");
      }, 350);

      // Finish sequence and unmount
      const completeTimeout = setTimeout(() => {
        setStage("complete");
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 1300);

      return () => {
        clearTimeout(ripTimeout);
        clearTimeout(completeTimeout);
      };
    }
  }, [progress, onComplete]);

  const handleSkip = () => {
    setStage("ripping");
    setTimeout(() => {
      setStage("complete");
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto overflow-hidden select-none font-mono">
      {/* LEFT DIMENSIONAL HALF */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-[#08070A] border-r border-[#D4AF37]/50 shadow-[15px_0_60px_rgba(212,175,55,0.25)] flex flex-col justify-between p-6 sm:p-12 transition-all duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)] z-20 ${
          stage === "ripping" || stage === "complete"
            ? "-translate-x-full -skew-x-6 rotate-[-2deg] opacity-0"
            : "translate-x-0 skew-x-0 rotate-0 opacity-100"
        }`}
      >
        {/* Background Cybernetic Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

        {/* Top Left Header Telemetry */}
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span className="tracking-widest uppercase font-bold">SYSTEM // ABRUBAB.ME</span>
          </div>
          <span className="text-[10px] text-[#A69C93] block">
            CORE: EVIDENTIAL DEEP LEARNING (v4.2)
          </span>
        </div>

        {/* Bottom Left System Specs */}
        <div className="relative z-10 text-[10px] text-[#A69C93] space-y-1">
          <div className="flex items-center gap-2 text-[#E5BE38]">
            <Terminal className="w-3.5 h-3.5" />
            <span>NODE: DIU_NBTC_HIRL_01</span>
          </div>
          <span>STATUS: QUANTUM BREACH READY</span>
        </div>
      </div>

      {/* RIGHT DIMENSIONAL HALF */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-[#08070A] border-l border-[#6E1423]/80 shadow-[-15px_0_60px_rgba(110,20,35,0.35)] flex flex-col justify-between p-6 sm:p-12 transition-all duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)] z-20 ${
          stage === "ripping" || stage === "complete"
            ? "translate-x-full skew-x-6 rotate-[2deg] opacity-0"
            : "translate-x-0 skew-x-0 rotate-0 opacity-100"
        }`}
      >
        {/* Background Cybernetic Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

        {/* Top Right Skip Button */}
        <div className="relative z-10 self-end">
          <button
            onClick={handleSkip}
            className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151316] hover:bg-[#6E1423] border border-white/10 hover:border-[#D4AF37] text-xs text-[#EDE7DD] transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <span>Skip Intro</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Right Telemetry */}
        <div className="relative z-10 self-end text-right text-[10px] text-[#A69C93] space-y-1">
          <div className="flex items-center justify-end gap-2 text-[#D4AF37]">
            <span>LATENCY: 14MS // LOCKED 60FPS</span>
            <Zap className="w-3.5 h-3.5 text-[#E5BE38]" />
          </div>
          <span>PORTAL STABILITY: 100%</span>
        </div>
      </div>

      {/* CENTER HIGH-ENERGY LASER FISSURE (The Rip Seam) */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FFF2A3] via-[#D4AF37] to-[#6E1423] shadow-[0_0_35px_#D4AF37,0_0_70px_#6E1423] z-30 transition-all duration-700 pointer-events-none ${
          stage === "ripping"
            ? "scale-y-150 scale-x-[20] opacity-0 blur-lg"
            : "scale-y-100 scale-x-100 opacity-100"
        }`}
      />

      {/* UNIFIED CENTER HUD STACK (Zero Overlap Guaranteed) */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center justify-center text-center space-y-6 max-w-lg w-full px-6 transition-all duration-700 pointer-events-auto ${
          stage === "ripping" || stage === "complete"
            ? "scale-125 opacity-0 blur-lg"
            : "scale-100 opacity-100"
        }`}
      >
        {/* 1. Biometric Telemetry Progress Ring */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          {/* Outer Rotating Dash Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4AF37]/50 animate-spin [animation-duration:8s]" />
          
          {/* Middle Pulse Ring */}
          <div className="absolute inset-2 rounded-full border border-[#6E1423]/80 animate-ping [animation-duration:3s]" />

          {/* Inner Glow Center */}
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-[#18151A] via-[#100E12] to-[#18151A] border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.4)] flex flex-col items-center justify-center p-2">
            <span className="text-lg sm:text-xl font-bold font-mono text-[#E5BE38]">
              {progress}%
            </span>
            <span className="text-[8px] text-[#A69C93] uppercase font-mono tracking-tighter">
              TELEMETRY
            </span>
          </div>
        </div>

        {/* 2. Unified Brand Title */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#6E1423]/40 border border-[#6E1423]/80 text-[10px] uppercase tracking-wider text-[#EDE7DD]">
            <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
            <span>Evidential Researcher Dossier</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-[#EDE7DD]">
            Abdullah <span className="text-[#E5BE38]">Rubab</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#A69C93]">
            Trustworthy Medical AI & Uncertainty Quantification
          </p>
        </div>

        {/* 3. Live Status & Progress Bar */}
        <div className="w-full max-w-sm space-y-2">
          <div className="flex items-center justify-center text-[10px] sm:text-[11px] text-[#D4AF37] px-1">
            <span className="flex items-center gap-1.5 truncate">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{statusText}</span>
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-2 bg-[#151316] rounded-full overflow-hidden border border-white/10 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#6E1423] via-[#D4AF37] to-[#FFF2A3] rounded-full transition-all duration-150 ease-out shadow-[0_0_15px_rgba(212,175,55,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 4. Manual Breach Button */}
        <button
          onClick={handleSkip}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6E1423] to-[#941B32] hover:brightness-125 border border-[#D4AF37]/60 text-xs font-bold text-white uppercase tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all cursor-pointer active:scale-95 flex items-center gap-2"
        >
          <Zap className="w-3.5 h-3.5 text-[#E5BE38]" />
          <span>Breach Dimension</span>
        </button>
      </div>
    </div>
  );
}
