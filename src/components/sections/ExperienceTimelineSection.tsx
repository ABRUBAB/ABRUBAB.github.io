"use client";

import Image from "next/image";
import Link from "next/link";
import { experienceRoles, profileData } from "@/content/portfolioData";
import { 
  Building2, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  User,
  ShieldCheck
} from "lucide-react";

export function ExperienceTimelineSection() {
  return (
    <section id="experience-timeline" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/35 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD]">
              <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Institutional Appointments & Education</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#EDE7DD] tracking-tight">
              Chronology of Research & Engineering
            </h2>
            <p className="text-sm sm:text-base text-[#A69C93] max-w-2xl leading-relaxed">
              Research appointments at university computing centers and laboratories alongside verified academic qualifications.
            </p>
          </div>

          <Link
            href="/experience"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151316] hover:bg-[#1C191E] border border-white/10 hover:border-[#D4AF37] text-xs font-semibold text-[#EDE7DD] transition-all self-start md:self-end"
          >
            <span>View Detailed Roles & Dossier</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Research & Engineering Appointments (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-serif font-bold text-[#EDE7DD] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Research & Leadership Appointments</span>
            </h3>

            <div className="space-y-4">
              {experienceRoles.map((role) => (
                <div
                  key={role.id}
                  className="p-5 sm:p-6 rounded-3xl bg-[#151316]/90 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-xl transition-all shadow-md space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-bold text-[#EDE7DD]">
                          {role.title}
                        </h4>
                        <span className="text-xs text-[#D4AF37] font-semibold">
                          • {role.organization}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono text-[#A69C93]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#D4AF37]" />
                          {role.period}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {role.location}
                        </span>
                      </div>
                    </div>

                    {role.logo && (
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 shrink-0">
                        <Image
                          src={role.logo}
                          alt={role.organization}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {role.supervisor && (
                    <div className="text-xs text-[#D4AF37] font-medium flex items-center gap-1.5 pt-1">
                      <User className="w-3.5 h-3.5" />
                      <span>Supervisor: {role.supervisor}</span>
                    </div>
                  )}

                  <p className="text-xs text-[#A69C93] leading-relaxed">
                    {role.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {role.skills.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-[#0B0A0C] border border-white/5 text-[#EDE7DD]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Verified Academic Degrees & European Roadmap (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-serif font-bold text-[#EDE7DD] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
              <span>Verified Academic Qualifications</span>
            </h3>

            <div className="space-y-4">
              {profileData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-[#151316]/90 border border-white/10 backdrop-blur-xl shadow-md space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#EDE7DD]">
                      {edu.degree}
                    </h4>
                    <span className="text-[11px] font-mono text-[#D4AF37] shrink-0">
                      {edu.period}
                    </span>
                  </div>

                  <div className="text-xs text-[#A69C93]">
                    {edu.institution}
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#0B0A0C] border border-[#D4AF37]/30 text-xs font-mono">
                    <span className="text-[#A69C93]">
                      {edu.gradeType || (edu.degree.includes("B.Sc.") ? "CGPA" : "GPA")}:
                    </span>
                    <strong className="text-[#E5BE38] font-bold">
                      {edu.cgpa}
                    </strong>
                  </div>

                  {edu.notes && (
                    <p className="text-[11px] text-[#A69C93] leading-relaxed pt-1">
                      {edu.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* European Graduate Target Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#6E1423]/25 via-[#151316] to-[#151316] border border-[#8E1C30] space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#D4AF37] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Next Trajectory: Europe (Fall 2027)</span>
              </div>
              <h4 className="text-base font-serif font-bold text-[#EDE7DD]">
                Master&apos;s in Medical AI & Uncertainty
              </h4>
              <p className="text-xs text-[#A69C93] leading-relaxed">
                Applying for Master&apos;s programs in Europe for the September 2027 intake. Dedicated to translational clinical AI and trustworthy deep learning in resource-constrained hospital networks.
              </p>
              <Link
                href="/cv"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:underline pt-1"
              >
                <span>Inspect European Academic CV (PDF)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
