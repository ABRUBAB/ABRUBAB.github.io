"use client";

import { useState } from "react";
import { publications } from "@/content/portfolioData";
import { Publication } from "@/content/types";
import { StatusBadge } from "../ui/StatusBadge";
import { BibtexModal } from "../ui/BibtexModal";
import { 
  BookOpen, 
  ExternalLink, 
  Quote, 
  Filter, 
  ChevronDown,
  ChevronUp,
  Sparkles
} from "lucide-react";

export function PublicationsSection() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedBibtexPub, setSelectedBibtexPub] = useState<Publication | null>(null);
  const [expandedPubIds, setExpandedPubIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedPubIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPublications = publications.filter((p) => {
    if (filter === "all") return true;
    return p.status === filter;
  });

  const filterOptions = [
    { id: "all", label: "All Papers", count: publications.length },
    { id: "published", label: "Published (IEEE)", count: publications.filter((p) => p.status === "published").length },
    { id: "accepted", label: "Accepted (BECITHCON)", count: publications.filter((p) => p.status === "accepted").length },
    { id: "under_review", label: "Under Review (Q1)", count: publications.filter((p) => p.status === "under_review").length },
    { id: "in_progress", label: "In Preparation", count: publications.filter((p) => p.status === "in_progress").length },
  ];

  return (
    <section id="publications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6E1423]/30 border border-[#6E1423]/80 text-xs font-semibold text-[#EDE7DD] mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
              Publications & Manuscripts
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#EDE7DD] tracking-tight">
              Research Publications Track Record
            </h2>
            <p className="text-sm sm:text-base text-[#A69C93] mt-2 leading-relaxed">
              7 peer-reviewed and target manuscripts spanning Evidential Deep Learning, Vision Transformers, and Knowledge Distillation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-4 rounded-2xl bg-[#151316] border border-[#D4AF37]/40 text-right shadow-xl">
              <span className="text-[11px] uppercase tracking-wider text-[#A69C93] block">
                Total Output
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#E5BE38]">
                {publications.length} Manuscripts
              </span>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/10 pb-4">
          <span className="text-xs uppercase font-mono text-[#A69C93] flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-[#D4AF37]" /> Filter:
          </span>
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === opt.id
                  ? "bg-gradient-to-r from-[#6E1423] to-[#941B32] text-[#EDE7DD] shadow-lg border border-[#8E1C30]"
                  : "bg-[#151316] text-[#A69C93] hover:text-[#EDE7DD] border border-white/10 hover:border-white/20"
              }`}
            >
              <span>{opt.label}</span>
              <span className="px-2 py-0.5 rounded-full bg-black/40 text-[10px] font-mono font-bold">
                {opt.count}
              </span>
            </button>
          ))}
        </div>

        {/* Clean, Streamlined Publications Cards Grid */}
        <div className="space-y-4">
          {filteredPublications.map((pub) => {
            const isExpanded = !!expandedPubIds[pub.id];

            return (
              <div
                key={pub.id}
                id={`paper-${pub.id}`}
                className={`p-5 sm:p-6 rounded-3xl transition-all duration-300 border ${
                  pub.status === "published"
                    ? "bg-[#151316] border-[#D4AF37]/70 shadow-[0_0_20px_rgba(212,175,55,0.12)] hover:border-[#FFF2A3]"
                    : pub.status === "accepted"
                    ? "bg-[#151316] border-[#D4AF37]/45 hover:border-[#D4AF37]"
                    : pub.status === "under_review"
                    ? "bg-[#151316] border-[#6E1423]/70 hover:border-[#8E1C30]"
                    : "bg-[#151316] border-white/10 hover:border-white/25"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={pub.status} />
                      <span className="text-xs font-mono text-[#A69C93]">
                        {pub.venue} • {pub.year}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#EDE7DD] leading-snug">
                      {pub.title}
                    </h3>

                    <p className="text-xs text-[#D4AF37] font-medium">
                      Authors: {pub.authors.join(", ")}{" "}
                      {pub.rubabRole && (
                        <span className="text-[#A69C93] ml-1 font-mono">({pub.rubabRole})</span>
                      )}
                    </p>
                  </div>

                  {/* Right Action Tools */}
                  <div className="flex items-center gap-2 self-start shrink-0 pt-1">
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 text-xs font-mono font-semibold text-[#E5BE38] transition-colors"
                      >
                        <span>IEEE DOI</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {pub.bibtex && (
                      <button
                        onClick={() => setSelectedBibtexPub(pub)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#EDE7DD] transition-colors"
                      >
                        <Quote className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Cite</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Benchmark Highlights Pill */}
                {pub.metrics && (
                  <div className="flex flex-wrap items-center gap-3 pt-3 mt-3 border-t border-white/5 text-xs font-mono">
                    {pub.metrics.accuracy && (
                      <span className="px-2.5 py-1 rounded-lg bg-[#0B0A0C] border border-white/5 text-[#E5BE38]">
                        Accuracy: <strong>{pub.metrics.accuracy}</strong>
                      </span>
                    )}
                    {pub.metrics.coverage && (
                      <span className="px-2.5 py-1 rounded-lg bg-[#0B0A0C] border border-white/5 text-[#EDE7DD]">
                        Triage: <strong>{pub.metrics.coverage}</strong>
                      </span>
                    )}
                    {pub.metrics.backbone && (
                      <span className="px-2.5 py-1 rounded-lg bg-[#0B0A0C] border border-white/5 text-[#A69C93] truncate">
                        Backbone: {pub.metrics.backbone}
                      </span>
                    )}

                    {/* Expandable Technical Details Button */}
                    <button
                      onClick={() => toggleExpand(pub.id)}
                      className="ml-auto inline-flex items-center gap-1 text-[11px] text-[#A69C93] hover:text-[#EDE7DD] transition-colors"
                    >
                      <span>{isExpanded ? "Hide Abstract" : "Read Abstract & Method"}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                )}

                {/* Expanded Abstract Section */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-white/5 animate-fadeIn space-y-2">
                    <p className="text-xs sm:text-sm text-[#A69C93] leading-relaxed">
                      {pub.details}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-lg bg-[#0B0A0C] border border-white/5 text-[10px] text-[#A69C93]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* BibTeX Modal */}
      <BibtexModal
        publication={selectedBibtexPub}
        onClose={() => setSelectedBibtexPub(null)}
      />
    </section>
  );
}
