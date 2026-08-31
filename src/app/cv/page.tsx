"use client";

import Link from "next/link";
import { 
  profileData, 
  publications, 
  flagshipProjects, 
  experienceRoles, 
  awardsAndLeadership, 
  skillCategories 
} from "@/content/portfolioData";
import { 
  Printer, 
  ArrowLeft, 
  Mail, 
  Globe
} from "lucide-react";
import { GithubIcon, LinkedinIcon, ResearchGateIcon, OrcidIcon } from "@/components/ui/BrandIcons";

export default function AcademicCVPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0B0A0C] text-[#EDE7DD] py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black">
      {/* Top Bar (Hidden on print) */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#A69C93] hover:text-[#EDE7DD] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all shadow-md active:scale-95 border border-[#8E1C30]"
          >
            <Printer className="w-4 h-4 text-[#D4AF37]" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* CV Paper Container */}
      <div className="max-w-4xl mx-auto bg-[#151316] print:bg-white border border-[#6E1423]/40 print:border-none rounded-3xl p-8 sm:p-12 shadow-2xl print:shadow-none print:p-0 print:text-black">
        {/* Header / Identity */}
        <header className="border-b border-neutral-700 print:border-neutral-300 pb-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#EDE7DD] print:text-black tracking-tight">
            {profileData.name}
          </h1>
          <p className="text-base text-[#D4AF37] print:text-neutral-800 font-medium mt-1">
            {profileData.title}
          </p>
          <p className="text-xs text-[#A69C93] print:text-neutral-600 mt-1">
            {profileData.location} • Target Intake: September 2027 (Master&apos;s or PhD in Europe)
          </p>

          {/* Contact Bar */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#A69C93] print:text-neutral-700 font-mono">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              <a href={`mailto:${profileData.contacts.academicEmail}`} className="hover:underline">
                {profileData.contacts.academicEmail}
              </a>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <a href="https://abdullahrubab.me" target="_blank" rel="noopener noreferrer" className="hover:underline">
                abdullahrubab.me
              </a>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ResearchGateIcon className="w-3.5 h-3.5 text-[#00CCBB]" />
              <a href={profileData.contacts.researchGate} target="_blank" rel="noopener noreferrer" className="hover:underline">
                ResearchGate
              </a>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <OrcidIcon className="w-3.5 h-3.5" />
              <a href={profileData.contacts.orcid} target="_blank" rel="noopener noreferrer" className="hover:underline">
                0009-0003-5063-9320
              </a>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <GithubIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
              <a href={profileData.contacts.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                ABRUBAB
              </a>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <LinkedinIcon className="w-3.5 h-3.5 text-[#0077B5]" />
              <a href={profileData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </span>
          </div>
        </header>

        {/* Research Statement */}
        <section className="mb-8">
          <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-[#D4AF37] print:text-neutral-900 border-b border-neutral-800 print:border-neutral-300 pb-1 mb-3">
            Research Statement
          </h2>
          <p className="text-xs sm:text-sm text-[#EDE7DD] print:text-neutral-800 leading-relaxed">
            {profileData.thesis}
          </p>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-[#D4AF37] print:text-neutral-900 border-b border-neutral-800 print:border-neutral-300 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-4">
            {profileData.education.map((edu, idx) => (
              <div key={idx} className="text-xs sm:text-sm">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[#EDE7DD] print:text-black">
                    {edu.institution}
                  </h3>
                  <span className="font-mono text-xs text-[#A69C93] print:text-neutral-600">
                    {edu.period}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-[#D4AF37] print:text-neutral-700 mt-0.5">
                  <span>{edu.degree}</span>
                  <span className="font-bold font-mono">{edu.gradeType || "CGPA"}: {edu.cgpa}</span>
                </div>
                {edu.notes && (
                  <p className="text-xs text-[#A69C93] print:text-neutral-600 mt-1">
                    {edu.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Research & Leadership Experience */}
        <section className="mb-8">
          <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-[#D4AF37] print:text-neutral-900 border-b border-neutral-800 print:border-neutral-300 pb-1 mb-3">
            Research & Leadership Experience
          </h2>
          <div className="space-y-5">
            {experienceRoles.map((role) => (
              <div key={role.id} className="text-xs sm:text-sm">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[#EDE7DD] print:text-black">
                    {role.title} — <span className="text-[#D4AF37] print:text-neutral-800">{role.organization}</span>
                  </h3>
                  <span className="font-mono text-xs text-[#A69C93] print:text-neutral-600">
                    {role.period}
                  </span>
                </div>
                {role.supervisor && (
                  <p className="text-xs text-[#A69C93] print:text-neutral-600 italic">
                    Advisor: {role.supervisor}
                  </p>
                )}
                <ul className="list-disc list-inside space-y-1 mt-2 text-xs text-[#A69C93] print:text-neutral-700">
                  {role.bullets.map((b, i) => (
                    <li key={i} className="leading-relaxed">
                      <span className="text-[#EDE7DD] print:text-neutral-800">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section className="mb-8">
          <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-[#D4AF37] print:text-neutral-900 border-b border-neutral-800 print:border-neutral-300 pb-1 mb-3">
            Publications & Manuscripts ({publications.length})
          </h2>
          <div className="space-y-4">
            {publications.map((pub, idx) => (
              <div key={pub.id} className="text-xs sm:text-sm">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-medium text-[#EDE7DD] print:text-black leading-snug">
                    <span className="font-bold font-mono mr-1">[{idx + 1}]</span>
                    {pub.authors.join(", ")}. &ldquo;{pub.title}&rdquo;.{" "}
                    <em className="text-[#D4AF37] print:text-neutral-800">{pub.venue}</em>, {pub.year}.
                  </p>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/5 print:bg-neutral-100 text-[#E5BE38] print:text-neutral-800 shrink-0 font-bold">
                    {pub.statusLabel}
                  </span>
                </div>
                {pub.doi && (
                  <p className="text-[11px] font-mono text-[#A69C93] print:text-neutral-600 mt-0.5 ml-4">
                    DOI: {pub.doi}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Flagship Projects */}
        <section className="mb-8">
          <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-[#D4AF37] print:text-neutral-900 border-b border-neutral-800 print:border-neutral-300 pb-1 mb-3">
            Flagship Engineering & Research Systems
          </h2>
          <div className="space-y-4">
            {flagshipProjects.map((proj) => (
              <div key={proj.id} className="text-xs sm:text-sm">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[#EDE7DD] print:text-black">
                    {proj.title} {proj.award && `— [${proj.award}]`}
                  </h3>
                </div>
                <p className="text-xs text-[#D4AF37] print:text-neutral-700">{proj.subtitle}</p>
                <p className="text-xs text-[#A69C93] print:text-neutral-600 mt-1 leading-relaxed">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Honors & Awards */}
        <section className="mb-8">
          <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-[#D4AF37] print:text-neutral-900 border-b border-neutral-800 print:border-neutral-300 pb-1 mb-3">
            Honors, Awards & Competitive Finishes
          </h2>
          <div className="space-y-2.5 text-xs sm:text-sm">
            {awardsAndLeadership.map((award) => (
              <div key={award.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-[#EDE7DD] print:text-black">{award.title}</span> —{" "}
                  <span className="text-[#A69C93] print:text-neutral-700">{award.event}</span> ({award.issuer})
                </div>
                <span className="font-mono text-xs text-[#D4AF37] print:text-neutral-600 shrink-0 ml-2">
                  {award.year}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section>
          <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-[#D4AF37] print:text-neutral-900 border-b border-neutral-800 print:border-neutral-300 pb-1 mb-3">
            Technical Skills & Spoken Languages
          </h2>
          <div className="space-y-2 text-xs">
            {skillCategories.map((cat) => (
              <div key={cat.category} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                <span className="font-bold text-[#D4AF37] print:text-neutral-900 w-44 shrink-0">
                  {cat.category}:
                </span>
                <span className="text-[#EDE7DD] print:text-neutral-800">
                  {cat.items.map((it) => `${it.name} (${it.level})`).join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
