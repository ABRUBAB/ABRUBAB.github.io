"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { experienceRoles } from "@/content/portfolioData";
import { Server, CheckCircle2 } from "lucide-react";

const GpuClusterLattice = dynamic(
  () => import("../3d/GpuClusterLattice").then((mod) => mod.GpuClusterLattice),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[320px] sm:h-[380px] rounded-2xl bg-[#0B0A0C] border border-white/10 flex items-center justify-center text-xs font-mono text-[#A69C93]">
        <span className="text-[#D4AF37]">Rendering Distributed GPU Compute Lattice...</span>
      </div>
    ),
  }
);

export function InfrastructureSection() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/30 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD] mb-3">
            <Server className="w-3.5 h-3.5 text-[#D4AF37]" />
            Experience & Systems Leadership
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#EDE7DD] tracking-tight">
            Institutional Research & Distributed AI Platforms
          </h2>
          <p className="text-sm sm:text-base text-[#A69C93] mt-3 leading-relaxed">
            Leading high-performance GPU infrastructure initiatives, computational medical AI research labs, and scalable backend machine learning platforms.
          </p>
        </div>

        {/* 3D GPU Lattice Scene */}
        <div className="mb-10">
          <GpuClusterLattice />
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {experienceRoles.map((role) => (
            <div
              key={role.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#151316] border border-white/10 hover:border-[#6E1423]/80 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Header with Logo */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  {role.logo && (
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/10 bg-white/5 shrink-0">
                      <Image
                        src={role.logo}
                        alt={role.organization}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <span className="text-xs font-mono font-semibold text-[#D4AF37] px-2.5 py-1 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                    {role.period}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#EDE7DD]">
                  {role.title}
                </h3>
                <p className="text-xs text-[#D4AF37] font-medium mt-0.5 mb-1">
                  {role.organization}
                </p>

                {role.supervisor && (
                  <p className="text-[11px] text-[#A69C93] italic mb-3">
                    Supervised by: {role.supervisor}
                  </p>
                )}

                <p className="text-xs text-[#A69C93] leading-relaxed mb-4">
                  {role.description}
                </p>

                {/* Key Contributions */}
                <ul className="space-y-2 text-xs text-[#A69C93] mb-6">
                  {role.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="text-[#EDE7DD] leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                {role.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-0.5 rounded-lg bg-[#0B0A0C] border border-white/5 text-[10px] text-[#A69C93]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
