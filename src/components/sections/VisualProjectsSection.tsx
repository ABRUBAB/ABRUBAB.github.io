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
  AlertCircle,
  Globe,
  Radio,
  Lock,
  Compass
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { projects } from "@/content/portfolioData";
import { BorderBeam } from "@/components/ui/BorderBeam";

export function VisualProjectsSection() {
  const [selectedMriClass, setSelectedMriClass] = useState<"glioma" | "meningioma" | "pituitary">("glioma");

  // Helper for live preview browser frames
  const renderBrowserFrame = (
    imageUrl: string,
    title: string,
    liveUrl: string,
    aspect: string = "aspect-[16/10]"
  ) => (
    <div className="rounded-2xl border border-white/15 bg-[#070608] overflow-hidden shadow-2xl group relative flex flex-col">
      {/* Browser Chrome Header */}
      <div className="px-4 py-2.5 bg-[#151316] border-b border-white/10 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        {/* Address bar mockup */}
        <div className="flex-1 max-w-md mx-auto px-3 py-1 rounded-lg bg-[#0B0A0C] border border-white/5 flex items-center justify-center gap-2 text-[11px] font-mono text-[#A69C93] truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="truncate text-[#EDE7DD]/80">{liveUrl.replace("https://", "")}</span>
        </div>

        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-mono text-[#D4AF37] hover:text-[#FFF2A3] flex items-center gap-1 shrink-0 transition-colors"
        >
          <span>Live</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Screenshot Hero Segment with Animated Hover Zoom */}
      <div className={`relative ${aspect} overflow-hidden bg-[#0A090C]`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle Dark Gradient Overlay at bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0C]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
        
        {/* Hover action pill overlay */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#6E1423] text-white text-xs font-semibold shadow-lg border border-[#8E1C30] hover:bg-[#8E1C30]"
          >
            <span>Visit Live Platform</span>
            <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="visual-projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/35 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD]">
              <Code2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Applied Engineering & Live Systems</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#EDE7DD] tracking-tight">
              Flagship Projects & Live Deployments
            </h2>
            <p className="text-sm sm:text-base text-[#A69C93] max-w-2xl leading-relaxed">
              Real open-source codebases, distributed telemetry platforms, planetary analog simulations, and verified live web apps extracted directly from production repositories.
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
        <div className="space-y-12">
          {/* PROJECT 1: NeuralSched (Large Featured Showcase with Hero Screenshot & Telemetry) */}
          <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#18151A]/95 via-[#121014]/95 to-[#18151A]/95 border-2 border-[#D4AF37]/60 backdrop-blur-xl shadow-2xl space-y-8 relative overflow-hidden">
            <BorderBeam size={350} duration={14} colorFrom="#D4AF37" colorTo="#6E1423" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-bold text-[#E5BE38]">
                  <Award className="w-3.5 h-3.5" />
                  <span>Champion (1st Place Winner) • DIU AI Innovation Hackathon 2026</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#EDE7DD]">
                  NeuralSched: GPU-Cluster Intelligence Middleware
                </h3>
                <p className="text-xs sm:text-sm text-[#A69C93] max-w-3xl leading-relaxed">
                  Middleware operating above Kubernetes and SLURM. Four trained ML models watch the cluster to decide job placement, green routing, predictive failure detection, and idle-GPU cost recovery.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="https://neuralsched.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all shadow-md active:scale-95 border border-[#8E1C30]"
                >
                  <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                  <span>Launch Live Console</span>
                </a>
                <a
                  href="https://github.com/ABRUBAB/neuralsched"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B0A0C] hover:bg-white/5 border border-white/10 text-xs font-semibold text-[#EDE7DD] hover:text-[#E5BE38] hover:border-[#D4AF37] transition-all"
                >
                  <GithubIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span>Repository</span>
                </a>
              </div>
            </div>

            {/* Side-by-Side: Live Hero Screenshot & Architecture Telemetry */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column (7 Cols): Real Live Hero Screenshot Mockup */}
              <div className="lg:col-span-7">
                {renderBrowserFrame(
                  "/assets/projects/neuralsched_hero.png",
                  "NeuralSched Live Console",
                  "https://neuralsched.vercel.app",
                  "aspect-[16/10]"
                )}
              </div>

              {/* Right Column (5 Cols): 4 Cooperating Modules & Hackathon Benchmarks */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                    Four Intelligent Modules
                  </span>
                  <span className="text-[10px] font-mono text-[#A69C93]">Self-Healing Cluster</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#151316] border border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-[#E5BE38] text-xs font-bold">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>SmartPack</span>
                    </div>
                    <p className="text-[11px] text-[#A69C93]">
                      GraphSAGE GNN + PPO for topology-aware GPU placement.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#151316] border border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <Zap className="w-3.5 h-3.5" />
                      <span>GreenSched</span>
                    </div>
                    <p className="text-[11px] text-[#A69C93]">
                      Carbon-intensity LSTM (24h forecast) for green window shifting.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#151316] border border-[#6E1423]/60 space-y-1">
                    <div className="flex items-center gap-2 text-[#FFF2A3] text-xs font-bold">
                      <AlertCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>SentinelAI</span>
                    </div>
                    <p className="text-[11px] text-[#A69C93]">
                      TCN + SHAP predicting hardware failure 45 min before crash.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#151316] border border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold">
                      <Layers className="w-3.5 h-3.5" />
                      <span>CostCut</span>
                    </div>
                    <p className="text-[11px] text-[#A69C93]">
                      Utilization LSTM for idle-GPU forecast and cost recovery.
                    </p>
                  </div>
                </div>

                {/* Live Verified Benchmarks Box */}
                <div className="p-4 rounded-2xl bg-[#0B0A0C] border border-[#D4AF37]/35 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A69C93]">Pre-Crash Lead Time:</span>
                    <strong className="font-serif text-[#E5BE38]">45 Minutes (Zero Loss)</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A69C93]">False Alarm Reduction:</span>
                    <strong className="font-serif text-[#E5BE38]">64% Decrease</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A69C93]">Recognition:</span>
                    <strong className="font-serif text-[#FFF2A3]">Champion (50+ Teams)</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2-COLUMN ROW A: ShadowAstra Atlas & UVERA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* PROJECT 2: ShadowAstra Atlas (NASA Space Apps Challenge 2026 Dhaka) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#151316]/90 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Live Browser Mockup */}
                {renderBrowserFrame(
                  "/assets/projects/shadowastra_hero.png",
                  "ShadowAstra Atlas Live Platform",
                  "https://shadowastra-atlas.vercel.app",
                  "aspect-[16/10]"
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#D4AF37]/15 text-[#E5BE38] border border-[#D4AF37]/30">
                      <Globe className="w-3 h-3 text-[#D4AF37]" />
                      <span>NASA Space Apps 2026 · Dhaka</span>
                    </span>
                    <span className="text-xs font-mono text-emerald-400">Three.js WebGL</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#EDE7DD]">
                    ShadowAstra Atlas: Planetary Analog Simulation
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A69C93] leading-relaxed">
                    &ldquo;Rehearse other worlds on this one.&rdquo; Matches Moon and Mars mission tasks (rover mobility, ice search, lava tube habitats) to terrestrial analog sites on Earth, catching deceptive &ldquo;false friend&rdquo; sites using NASA and ESA open datasets.
                  </p>

                  {/* Highlights from README */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-[#0B0A0C] border border-white/5 text-center">
                      <span className="text-[10px] font-mono text-[#D4AF37] block">Terrain Slabs</span>
                      <strong className="text-xs text-[#EDE7DD] block">3D Scale Comparison</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B0A0C] border border-white/5 text-center">
                      <span className="text-[10px] font-mono text-[#E5BE38] block">Shadow Lab</span>
                      <strong className="text-xs text-[#EDE7DD] block">Polar Ice PSRs</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B0A0C] border border-white/5 text-center">
                      <span className="text-[10px] font-mono text-emerald-400 block">Light Twin</span>
                      <strong className="text-xs text-[#EDE7DD] block">Solar Math Match</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href="https://shadowastra-atlas.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all border border-[#8E1C30]"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Open Live Atlas</span>
                  </a>
                  <a
                    href="https://shadowastra-atlas.vercel.app/lab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0B0A0C] hover:bg-white/5 border border-white/10 text-xs font-semibold text-[#EDE7DD] transition-all"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Analog Lab</span>
                  </a>
                </div>

                <a
                  href="https://github.com/ABRUBAB/ShadowAstra_Atlas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0B0A0C] hover:bg-white/5 border border-white/10 text-xs font-semibold text-[#EDE7DD] transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Code</span>
                </a>
              </div>
            </div>

            {/* PROJECT 3: UVERA (AI DEV FEST 2026 - 4th Place Finalist) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#151316]/90 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Live Browser Mockup */}
                {renderBrowserFrame(
                  "/assets/projects/uvera_hero.png",
                  "UVERA Live Platform",
                  "https://uvera-ai.vercel.app",
                  "aspect-[16/10]"
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#D4AF37]/15 text-[#E5BE38] border border-[#D4AF37]/30">
                      <Award className="w-3 h-3 text-[#D4AF37]" />
                      <span>4th Place Finalist · AI DEV FEST 2026</span>
                    </span>
                    <span className="text-xs font-mono text-emerald-400">&lt;18ms Scoring</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#EDE7DD]">
                    UVERA: Trust You Can Verify
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A69C93] leading-relaxed">
                    A trust layer for mobile money that pauses a scam before money moves, explaining the risk in simple Bangla and English. Features QR Shield for merchant mule cashouts and merges fragmented alerts into single operations cases.
                  </p>

                  {/* Highlights from README */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-[#0B0A0C] border border-white/5 text-center">
                      <span className="text-[10px] font-mono text-[#D4AF37] block">Trust Field</span>
                      <strong className="text-xs text-[#EDE7DD] block">3-Layer Evaluation</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B0A0C] border border-white/5 text-center">
                      <span className="text-[10px] font-mono text-[#E5BE38] block">Pause Ring</span>
                      <strong className="text-xs text-[#EDE7DD] block">Zero False Block</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B0A0C] border border-white/5 text-center">
                      <span className="text-[10px] font-mono text-emerald-400 block">QR Shield</span>
                      <strong className="text-xs text-[#EDE7DD] block">Mule Cashout Check</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href="https://uvera-ai.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all border border-[#8E1C30]"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Open Live Demo</span>
                </a>

                <a
                  href="https://github.com/ABRUBAB/takaresolve-ai-hackathon-2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0B0A0C] hover:bg-white/5 border border-white/10 text-xs font-semibold text-[#EDE7DD] transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>
          </div>

          {/* 2-COLUMN ROW B: YINGLONG & Brain Tumor MRI */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* PROJECT 4: YINGLONG (Verifiable Agent Wallet on FISCO BCOS & Base Sepolia) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#151316]/90 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Live Browser Mockup */}
                {renderBrowserFrame(
                  "/assets/projects/yinglong_hero.png",
                  "YINGLONG Agent Wallet Live App",
                  "https://app.yinglong-agent.tech",
                  "aspect-[16/10]"
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#D4AF37]/15 text-[#E5BE38] border border-[#D4AF37]/30">
                      <Lock className="w-3 h-3 text-[#D4AF37]" />
                      <span>Topic F: Agent Wallet</span>
                    </span>
                    <span className="text-xs font-mono text-[#D4AF37]">FISCO BCOS + Base</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#EDE7DD]">
                    YINGLONG: Verifiable AI Agent Wallet
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A69C93] leading-relaxed">
                    &ldquo;An AI agent that pays for you. It cannot break your rules.&rdquo; Users write spending constraints in plain language which are compiled into sealed smart contracts. The blockchain blocks any out-of-mandate action and generates cryptographic receipts.
                  </p>

                  {/* Highlights from README */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-[#0B0A0C] border border-white/5 text-center">
                      <span className="text-[10px] font-mono text-[#D4AF37] block">Mandate Engine</span>
                      <strong className="text-xs text-[#EDE7DD] block">Plain English Rules</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B0A0C] border border-white/5 text-center">
                      <span className="text-[10px] font-mono text-[#E5BE38] block">Receipt Proofs</span>
                      <strong className="text-xs text-[#EDE7DD] block">Immutable Audit</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B0A0C] border border-white/5 text-center">
                      <span className="text-[10px] font-mono text-emerald-400 block">Passkeys</span>
                      <strong className="text-xs text-[#EDE7DD] block">WebAuthn Security</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href="https://app.yinglong-agent.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all border border-[#8E1C30]"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Open Live App</span>
                </a>

                <a
                  href="https://github.com/ABRUBAB/YINGLONG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0B0A0C] hover:bg-white/5 border border-white/10 text-xs font-semibold text-[#EDE7DD] transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>

            {/* PROJECT 5: Brain Tumor MRI Classification (Interactive Grad-CAM++ Preview) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#151316]/90 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                    Neuro-Oncology & Explainability
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Hugging Face Spaces
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#EDE7DD]">
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
                  <div className="h-28 rounded-xl bg-gradient-to-tr from-[#151316] via-[#100E12] to-[#1C191E] border border-white/10 flex items-center justify-between p-4 relative overflow-hidden">
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
                    <span>Hugging Face Space</span>
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
          </div>
        </div>
      </div>
    </section>
  );
}
