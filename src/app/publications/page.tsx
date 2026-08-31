"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { FooterSection } from "@/components/sections/FooterSection";
import { ContactModal } from "@/components/ui/ContactModal";
import { BibtexModal } from "@/components/ui/BibtexModal";
import { NeuralNetBackground } from "@/components/ui/NeuralNetBackground";
import { publications } from "@/content/portfolioData";
import { Publication } from "@/content/types";
import { 
  BookOpen, 
  ExternalLink, 
  Quote, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  ArrowRight,
  Search,
  FileText
} from "lucide-react";

export default function PublicationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBibtexPub, setSelectedBibtexPub] = useState<Publication | null>(null);
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
  const [contactOpen, setContactOpen] = useState(false);

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { id: "all", label: "All Papers", count: publications.length },
    { id: "published", label: "Published (IEEE)", count: publications.filter((p) => p.status === "published").length },
    { id: "accepted", label: "Accepted (BECITHCON)", count: publications.filter((p) => p.status === "accepted").length },
    { id: "under_review", label: "Under Review (Q1)", count: publications.filter((p) => p.status === "under_review").length },
    { id: "in_progress", label: "In Preparation", count: publications.filter((p) => p.status === "in_progress").length },
  ];

  const filteredPublications = publications.filter((pub) => {
    if (selectedCategory === "all") return true;
    return pub.status === selectedCategory;
  });

  const getStatusBadge = (status: Publication["status"]) => {
    switch (status) {
      case "published":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> Published (IEEE ICCIT)
          </span>
        );
      case "accepted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#D4AF37]/20 text-[#E5BE38] border border-[#D4AF37]/40">
            <Sparkles className="w-3.5 h-3.5" /> Accepted (BECITHCON 2026)
          </span>
        );
      case "under_review":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" /> Under Review (Target: Q1)
          </span>
        );
      case "in_progress":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            <FileText className="w-3.5 h-3.5" /> In Preparation
          </span>
        );
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0A0C] text-[#EDE7DD] relative overflow-hidden">
      <NeuralNetBackground />

      <Header
        isReviewerMode={false}
        onToggleReviewerMode={() => {}}
      />

      <div className="pt-28 pb-20 relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A69C93] hover:text-[#E5BE38] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Back to Home</span>
          </Link>
          <span className="text-xs font-mono text-[#D4AF37] px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            7 Manuscripts • First & Co-Author Tracks
          </span>
        </div>

        {/* Page Banner */}
        <div className="mb-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#151316]/90 via-[#100E12]/90 to-[#151316]/90 border border-[#6E1423]/60 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/40 border border-[#6E1423]/90 text-xs font-semibold text-[#EDE7DD]">
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            Publications & Preprints
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#EDE7DD] tracking-tight leading-tight">
            Peer-Reviewed Research & Manuscripts
          </h1>
          <p className="text-base sm:text-lg text-[#A69C93] max-w-3xl leading-relaxed">
            Investigating Evidential Deep Learning, Knowledge Distillation, and Explainable AI across neuro-oncology MRI, histopathology, endoscopy, and hematology.
          </p>
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2.5 pb-8 mb-8 border-b border-white/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 border ${
                selectedCategory === cat.id
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-[1.02]"
                  : "bg-[#151316] text-[#A69C93] hover:text-[#EDE7DD] border-white/10 hover:border-white/25 hover:bg-[#18161A]"
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                selectedCategory === cat.id ? "bg-black/20 text-black" : "bg-white/10 text-[#EDE7DD]"
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Publications Cards Grid */}
        <div className="space-y-6 mb-16">
          {filteredPublications.map((pub, idx) => {
            const isExpanded = !!expandedAbstracts[pub.id];

            return (
              <article
                key={pub.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#151316]/90 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-md transition-all shadow-xl space-y-5"
              >
                {/* Header: Number, Status & Venue */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#0B0A0C] border border-[#D4AF37]/40 flex items-center justify-center font-mono text-xs font-bold text-[#E5BE38]">
                      #{idx + 1}
                    </span>
                    {getStatusBadge(pub.status)}
                  </div>
                  <span className="text-xs font-mono text-[#D4AF37] font-semibold">
                    {pub.venue}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-serif font-bold text-[#EDE7DD] leading-snug">
                  {pub.title}
                </h2>

                {/* Authors List */}
                <p className="text-xs sm:text-sm text-[#A69C93] leading-relaxed">
                  {pub.authors.map((author, i) => (
                    <span key={i}>
                      {author.toLowerCase().includes("abdullah rubab") || author.toLowerCase().includes("rubab") ? (
                        <strong className="text-[#E5BE38] font-bold underline decoration-[#D4AF37]/40 underline-offset-4">
                          {author}
                        </strong>
                      ) : (
                        <span>{author}</span>
                      )}
                      {i < pub.authors.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {pub.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl text-xs font-mono bg-[#0B0A0C] border border-white/10 text-[#EDE7DD]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Expandable Details */}
                <div className="pt-2">
                  <button
                    onClick={() => toggleAbstract(pub.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4AF37] hover:text-[#E5BE38] transition-colors"
                  >
                    <span>{isExpanded ? "Hide Abstract & Method" : "Read Abstract & Methodology"}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 p-5 rounded-2xl bg-[#0B0A0C] border border-white/10 text-xs sm:text-sm text-[#A69C93] leading-relaxed space-y-3 animate-fadeIn">
                      <p>{pub.details}</p>
                      {pub.metrics && (
                        <div className="pt-2 border-t border-white/5 flex flex-wrap gap-4 text-xs font-mono">
                          {pub.metrics.accuracy && (
                            <span className="text-[#EDE7DD]">
                              Accuracy: <strong className="text-[#E5BE38]">{pub.metrics.accuracy}</strong>
                            </span>
                          )}
                          {pub.metrics.auroc && (
                            <span className="text-[#EDE7DD]">
                              AUROC: <strong className="text-[#E5BE38]">{pub.metrics.auroc}</strong>
                            </span>
                          )}
                          {pub.metrics.coverage && (
                            <span className="text-[#EDE7DD]">
                              Coverage: <strong className="text-[#E5BE38]">{pub.metrics.coverage}</strong>
                            </span>
                          )}
                          {pub.metrics.backbone && (
                            <span className="text-[#EDE7DD]">
                              Backbone: <strong className="text-[#E5BE38]">{pub.metrics.backbone}</strong>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Actions: DOI & BibTeX */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {pub.doi ? (
                      <a
                        href={pub.doi.startsWith("http") ? pub.doi : `https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all shadow-md active:scale-95 border border-[#8E1C30]"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>IEEE Xplore DOI</span>
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-[#A69C93]">
                        {pub.status === "accepted" ? "Proceedings In Production" : "Manuscript in Review"}
                      </span>
                    )}

                    <button
                      onClick={() => setSelectedBibtexPub(pub)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B0A0C] hover:bg-white/5 border border-white/10 text-xs font-semibold text-[#EDE7DD] hover:text-[#E5BE38] hover:border-[#D4AF37] transition-all"
                    >
                      <Quote className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Cite (BibTeX)</span>
                    </button>
                  </div>

                  <span className="text-xs font-mono text-[#A69C93]">
                    {pub.year} • Peer-Reviewed Track
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Quick Nav to other subpages */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
          <Link
            href="/about"
            className="p-5 rounded-2xl bg-[#151316] border border-white/10 hover:border-[#D4AF37] transition-all group"
          >
            <span className="text-xs text-[#D4AF37] font-mono block mb-1">Biography</span>
            <span className="text-sm font-serif font-bold text-[#EDE7DD] group-hover:text-[#E5BE38] flex items-center justify-between">
              <span>About Abdullah Rubab</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/projects"
            className="p-5 rounded-2xl bg-[#151316] border border-white/10 hover:border-[#D4AF37] transition-all group"
          >
            <span className="text-xs text-[#D4AF37] font-mono block mb-1">Systems & Code</span>
            <span className="text-sm font-serif font-bold text-[#EDE7DD] group-hover:text-[#E5BE38] flex items-center justify-between">
              <span>Flagship Case Studies</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/cv"
            className="p-5 rounded-2xl bg-[#151316] border border-white/10 hover:border-[#D4AF37] transition-all group"
          >
            <span className="text-xs text-[#D4AF37] font-mono block mb-1">Curriculum Vitae</span>
            <span className="text-sm font-serif font-bold text-[#EDE7DD] group-hover:text-[#E5BE38] flex items-center justify-between">
              <span>Academic Printable CV</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>

      <FooterSection onOpenContact={() => setContactOpen(true)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      
      {/* BibTeX Citation Modal */}
      <BibtexModal
        publication={selectedBibtexPub}
        onClose={() => setSelectedBibtexPub(null)}
      />
    </main>
  );
}
