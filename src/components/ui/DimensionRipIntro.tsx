"use client";

import { useState, useEffect } from "react";
import { Sparkles, ShieldCheck, Cpu, Terminal, ArrowRight, Zap } from "lucide-react";

interface DimensionRipIntroProps {
  onComplete?: () => void;
}

export function DimensionRipIntro({ onComplete }: DimensionRipIntroProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING NEURAL KERNEL...");
  const [stage, setStage] = useState<"loading" | "ripping" | "complete">("loading");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fast boot loader progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 15) + 8;
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 30) {
      setStatusText("CALIBRATING DIRICHLET BELIEF SIMPLEX...");
    } else if (progress < 65) {
      setStatusText("DECODING EPITEMIC UNCERTAINTY TENSORS...");
    } else if (progress < 90) {
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
      }, 1400);

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
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto overflow-hidden select-none font-mono">
      {/* LEFT DIMENSIONAL HALF */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-[#08070A] border-r border-[#D4AF37]/50 shadow-[10px_0_50px_rgba(212,175,55,0.25)] flex flex-col justify-between p-6 sm:p-12 transition-all duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)] z-20 ${
          stage === "ripping" || stage === "complete"
            ? "-translate-x-full -skew-x-6 rotate-[-2deg] opacity-0"
            : "translate-x-0 skew-x-0 rotate-0 opacity-100"
        }`}
      >
        {/* Background Cybernetic Circuit Lines */}
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

        {/* Center-Left HUD Graphic */}
        <div className="relative z-10 self-end mr-4 sm:mr-8 text-right space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#E5BE38] block font-bold">
            RESEARCH VECTOR
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#EDE7DD] leading-none">
            ABDULLAH
          </h2>
          <span className="text-[11px] text-[#A69C93] block">
            DIRICHLET UNCERTAINTY
          </span>
        </div>

        {/* Bottom Left System Specs */}
        <div className="relative z-10 text-[10px] text-[#A69C93] space-y-1">
          <div className="flex items-center gap-2 text-[#E5BE38]">
            <Terminal className="w-3 h-3" />
            <span>NODE: DIU_NBTC_HIRL_01</span>
          </div>
          <span>STATUS: QUANTUM BREACH INITIATED</span>
        </div>
      </div>

      {/* RIGHT DIMENSIONAL HALF */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-[#08070A] border-l border-[#6E1423]/80 shadow-[-10px_0_50px_rgba(110,20,35,0.3)] flex flex-col justify-between p-6 sm:p-12 transition-all duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)] z-20 ${
          stage === "ripping" || stage === "complete"
            ? "translate-x-full skew-x-6 rotate-[2deg] opacity-0"
            : "translate-x-0 skew-x-0 rotate-0 opacity-100"
        }`}
      >
        {/* Background Cybernetic Circuit Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

        {/* Top Right Controls & Skip */}
        <div className="relative z-10 self-end">
          <button
            onClick={handleSkip}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151316] hover:bg-[#6E1423] border border-white/10 hover:border-[#D4AF37] text-xs text-[#EDE7DD] transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <span>Skip Intro</span>
            <ArrowRight className="w-3 h-3 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Center-Right HUD Graphic */}
        <div className="relative z-10 self-start ml-4 sm:ml-8 text-left space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] block font-bold">
            CLINICAL DOSSIER
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#E5BE38] leading-none">
            RUBAB
          </h2>
          <span className="text-[11px] text-[#A69C93] block">
            TRUSTWORTHY MEDICAL AI
          </span>
        </div>

        {/* Bottom Right Telemetry */}
        <div className="relative z-10 self-end text-right text-[10px] text-[#A69C93] space-y-1">
          <div className="flex items-center justify-end gap-2 text-[#D4AF37]">
            <span>LATENCY: 14MS // LOCKED 60FPS</span>
            <Zap className="w-3 h-3 text-[#E5BE38]" />
          </div>
          <span>DIMENSIONAL RIP: READY</span>
        </div>
      </div>

      {/* CENTER HIGH-ENERGY LASER FISSURE (The Rip Seam) */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-full bg-gradient-to-b from-[#FFF2A3] via-[#D4AF37] to-[#6E1423] shadow-[0_0_35px_#D4AF37,0_0_70px_#6E1423] z-30 transition-all duration-700 ${
          stage === "ripping"
            ? "scale-y-150 scale-x-[15] opacity-0 blur-md"
            : "scale-y-100 scale-x-100 opacity-100"
        }`}
      />

      {/* CENTER OVERLAY CORE (HUD Loader & Biometric Ring) */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center justify-center text-center space-y-6 max-w-md w-full px-6 transition-all duration-700 ${
          stage === "ripping" || stage === "complete"
            ? "scale-150 opacity-0 blur-lg"
            : "scale-100 opacity-100"
        }`}
      >
        {/* Animated Cyber Holographic Ring */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          {/* Outer Rotating Dash Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4AF37]/50 animate-spin [animation-duration:8s]" />
          
          {/* Middle Pulse Ring */}
          <div className="absolute inset-2 rounded-full border border-[#6E1423]/80 animate-ping [animation-duration:3s]" />

          {/* Inner Glow Center */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-[#18151A] via-[#100E12] to-[#18151A] border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.4)] flex flex-col items-center justify-center p-2">
            <span className="text-xl sm:text-2xl font-bold font-mono text-[#E5BE38]">
              {progress}%
            </span>
            <span className="text-[9px] text-[#A69C93] uppercase font-mono tracking-tighter">
              TELEMETRY
            </span>
          </div>
        </div>

        {/* Status Line & Bar */}
        <div className="w-full space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-[#EDE7DD] px-1">
            <span className="flex items-center gap-1.5 text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
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

        {/* Enter Button Prompt */}
        <button
          onClick={handleSkip}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#6E1423] to-[#941B32] hover:brightness-125 border border-[#D4AF37]/60 text-xs font-bold text-white uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer active:scale-95"
        >
          ⚡ Breach Portal
        </button>
      </div>
    </div>
  );
}
