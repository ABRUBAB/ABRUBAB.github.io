"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  profileData, 
  publications, 
  flagshipProjects, 
  experienceRoles, 
  awardsAndLeadership, 
  trajectoryTargets,
  skillCategories
} from "@/content/portfolioData";
import { StatusBadge } from "./StatusBadge";
import { BibtexModal } from "./BibtexModal";
import { Publication } from "@/content/types";
import { 
  FileText, 
  ExternalLink, 
  Quote, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  Mail, 
  BookOpen, 
  Printer, 
  Sparkles 
} from "lucide-react";
import { GithubIcon, LinkedinIcon, ResearchGateIcon, OrcidIcon } from "@/components/ui/BrandIcons";

export function ReviewerModeView() {
  const [selectedBibtexPub, setSelectedBibtexPub] = useState<Publication | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0B0A0C] text-[#EDE7DD] pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Reviewer Mode Banner */}
      <div className="mb-8 p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#E5BE38]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-serif font-bold text-[#E5BE38]">
              Scholarship Committee Reviewer Dossier (Fast Text-First Mode)
            </h2>
            <p className="text-xs text-[#A69C93]">
              Optimized for evaluation panels, low bandwidth, and direct print/PDF archiving with zero WebGL load.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#EDE7DD] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Dossier</span>
          </button>
          <Link
            href="/cv"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all shadow-md"
          >
            <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Full CV (PDF)</span>
          </Link>
        </div>
      </div>

      {/* Header Profile Section */}
      <section className="bg-[#151316] border border-[#6E1423]/40 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shrink-0 shadow-lg">
              <Image
                src="/assets/photos/headshot_photo.jpg"
                alt="Abdullah Rubab"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#EDE7DD]">
                {profileData.name}
              </h1>
              <p className="text-sm font-medium text-[#D4AF37] mt-0.5">
                {profileData.title}
              </p>
              <p className="text-xs text-[#A69C93] mt-1">
                {profileData.location} • Final-Year Undergraduate Researcher (CGPA: {profileData.stats.cgpa}/4.00)
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
            <div className="text-center md:text-left">
              <span className="block text-2xl font-serif font-bold text-[#E5BE38]">
                {profileData.stats.publicationsCount}
              </span>
              <span className="text-[11px] text-[#A69C93] uppercase tracking-wider">Papers</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block text-2xl font-serif font-bold text-[#EDE7DD]">
                3.84
              </span>
              <span className="text-[11px] text-[#A69C93] uppercase tracking-wider">CGPA / 4.0</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block text-2xl font-serif font-bold text-[#D4AF37]">
                1st
              </span>
              <span className="text-[11px] text-[#A69C93] uppercase tracking-wider">Hackathon</span>
            </div>
          </div>
        </div>

        {/* Thesis Statement */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs uppercase tracking-wider text-[#A69C93] font-semibold mb-1">
            Research Thesis:
          </p>
          <p className="text-sm sm:text-base text-[#EDE7DD] italic font-serif leading-relaxed">
            &ldquo;{profileData.thesis}&rdquo;
          </p>
        </div>

        {/* Verified Links */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-semibold">
          <a
            href={profileData.contacts.researchGate}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#EDE7DD] hover:text-[#D4AF37] inline-flex items-center gap-1.5 transition-colors"
          >
            <ResearchGateIcon className="w-3.5 h-3.5 text-[#00CCBB]" />
            ResearchGate Profile
          </a>
          <a
            href={profileData.contacts.orcid}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#EDE7DD] hover:text-[#D4AF37] inline-flex items-center gap-1.5 transition-colors"
          >
            <OrcidIcon className="w-3.5 h-3.5" />
            ORCID: 0009-0003-5063-9320
          </a>
          <a
            href={profileData.contacts.googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#EDE7DD] hover:text-[#D4AF37] inline-flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            Google Scholar
          </a>
          <a
            href={profileData.contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#EDE7DD] hover:text-[#D4AF37] inline-flex items-center gap-1.5 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            GitHub (ABRUBAB)
          </a>
          <a
            href={profileData.contacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#EDE7DD] hover:text-[#D4AF37] inline-flex items-center gap-1.5 transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5 text-[#0077B5]" />
            LinkedIn
          </a>
          <a
            href={`mailto:${profileData.contacts.academicEmail}`}
            className="text-[#E5BE38] hover:underline inline-flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            {profileData.contacts.academicEmail}
          </a>
        </div>
      </section>

      {/* Trajectory & Target Alignment */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
          <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-xl font-serif font-bold text-[#EDE7DD]">
            Target Graduate Trajectory: Master&apos;s or PhD in Europe (September 2027)
          </h2>
        </div>

        <div className="p-6 rounded-3xl bg-[#151316] border border-[#D4AF37]/50 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-[#EDE7DD]">
              European Research Institutes & Graduate Fellowships
            </h3>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37] text-black">
              Primary Objective
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#A69C93] leading-relaxed">
            {trajectoryTargets[0].whyTarget}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#0B0A0C] border border-white/5 space-y-1.5 text-xs">
              <span className="font-semibold text-[#D4AF37] block uppercase tracking-wider">Degree Programs:</span>
              <ul className="space-y-1 text-[#EDE7DD]">
                {trajectoryTargets[0].programs.map((p, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-2xl bg-[#0B0A0C] border border-white/5 space-y-1.5 text-xs">
              <span className="font-semibold text-[#E5BE38] block uppercase tracking-wider">Target Fellowships:</span>
              <ul className="space-y-1 text-[#EDE7DD]">
                {trajectoryTargets[0].fundingVehicles.map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#E5BE38]" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-xl font-serif font-bold text-[#EDE7DD]">
              Publications & Manuscripts ({publications.length})
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className={`p-6 rounded-3xl border transition-all ${
                pub.status === "published"
                  ? "bg-[#151316] border-[#D4AF37]/80 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                  : pub.status === "accepted"
                  ? "bg-[#151316] border-[#D4AF37]/45"
                  : pub.status === "under_review"
                  ? "bg-[#151316] border-[#6E1423]/70"
                  : "bg-[#151316] border-white/10"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <StatusBadge status={pub.status} />
                    <span className="text-xs text-[#A69C93] font-mono">
                      {pub.venue} • {pub.year}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#EDE7DD] leading-snug">
                    {pub.title}
                  </h3>
                </div>

                {pub.bibtex && (
                  <button
                    onClick={() => setSelectedBibtexPub(pub)}
                    className="self-start inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#EDE7DD] shrink-0 transition-colors"
                  >
                    <Quote className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>BibTeX</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-[#D4AF37] font-medium mb-2">
                Authors: {pub.authors.join(", ")} {pub.rubabRole && `• (${pub.rubabRole})`}
              </p>

              <p className="text-xs sm:text-sm text-[#A69C93] leading-relaxed mb-3">
                {pub.details}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-lg bg-[#0B0A0C] border border-white/5 text-[11px] text-[#A69C93]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#E5BE38] hover:underline font-mono font-semibold"
                  >
                    <span>DOI: {pub.doi}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flagship Projects */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
          <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-xl font-serif font-bold text-[#EDE7DD]">
            Flagship Engineering & Research Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {flagshipProjects.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-3xl bg-[#151316] border border-white/10 hover:border-[#6E1423]/70 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-base font-serif font-bold text-[#EDE7DD]">
                    {proj.title}
                  </h3>
                  {proj.award && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-[#E5BE38] border border-[#D4AF37]/50 shrink-0">
                      Winner
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#D4AF37] mb-2">{proj.subtitle}</p>
                <p className="text-xs text-[#A69C93] leading-relaxed mb-4">
                  {proj.longDescription}
                </p>
              </div>

              <div>
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 mb-3 bg-[#0B0A0C]/50 rounded-xl px-2">
                  {proj.results.map((res, i) => (
                    <div key={i} className="text-center">
                      <span className="block text-xs font-bold text-[#EDE7DD] font-mono">
                        {res.value}
                      </span>
                      <span className="text-[10px] text-[#A69C93] leading-tight block">
                        {res.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-lg bg-white/5 text-[10px] text-[#A69C93]">
                        {t}
                      </span>
                    ))}
                  </div>
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#EDE7DD] hover:text-[#D4AF37]"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience & Institutional Roles */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
          <Award className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-xl font-serif font-bold text-[#EDE7DD]">
            Institutional Roles & Research Experience
          </h2>
        </div>

        <div className="space-y-4">
          {experienceRoles.map((role) => (
            <div
              key={role.id}
              className="p-6 rounded-3xl bg-[#151316] border border-white/10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#EDE7DD]">
                    {role.title} — <span className="text-[#D4AF37]">{role.organization}</span>
                  </h3>
                  {role.supervisor && (
                    <p className="text-xs text-[#A69C93]">Supervisor: {role.supervisor}</p>
                  )}
                </div>
                <span className="text-xs font-mono font-semibold text-[#D4AF37] px-2.5 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                  {role.period}
                </span>
              </div>

              <ul className="list-disc list-inside space-y-1 text-xs text-[#A69C93] mt-3">
                {role.bullets.map((b, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="text-[#EDE7DD]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="mb-12">
        <h2 className="text-xl font-serif font-bold text-[#EDE7DD] mb-4 border-b border-white/10 pb-2">
          Technical Skills & Competencies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat) => (
            <div key={cat.category} className="p-5 rounded-3xl bg-[#151316] border border-white/10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-3">
                {cat.category}
              </h3>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex items-start justify-between text-xs">
                    <div>
                      <span className="text-[#EDE7DD] font-medium">{item.name}</span>
                      {item.note && (
                        <span className="block text-[10px] text-[#A69C93]">{item.note}</span>
                      )}
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[#A69C93]">
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="mb-12">
        <h2 className="text-xl font-serif font-bold text-[#EDE7DD] mb-4 border-b border-white/10 pb-2">
          Honors, Awards & Competitive Achievements
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {awardsAndLeadership.map((award) => (
            <div
              key={award.id}
              className={`p-5 rounded-3xl border ${
                award.highlight
                  ? "bg-[#6E1423]/20 border-[#D4AF37]/50"
                  : "bg-[#151316] border-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-serif font-bold text-[#EDE7DD]">
                  {award.title}
                </h3>
                <span className="text-xs font-mono text-[#D4AF37] font-semibold">{award.year}</span>
              </div>
              <p className="text-xs text-[#EDE7DD]/80 font-medium">{award.event}</p>
              <p className="text-xs text-[#A69C93] mt-1.5 leading-relaxed">{award.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BibTeX Modal */}
      <BibtexModal
        publication={selectedBibtexPub}
        onClose={() => setSelectedBibtexPub(null)}
      />
    </div>
  );
}
