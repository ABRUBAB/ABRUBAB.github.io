"use client";

import { useState } from "react";
import { Copy, Check, X, Quote } from "lucide-react";
import { Publication } from "@/content/types";

interface BibtexModalProps {
  publication: Publication | null;
  onClose: () => void;
}

export function BibtexModal({ publication, onClose }: BibtexModalProps) {
  const [copied, setCopied] = useState(false);

  if (!publication || !publication.bibtex) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publication.bibtex || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error("Failed to copy BibTeX: ", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#151316] border border-[#6E1423]/60 rounded-xl shadow-2xl p-6 overflow-hidden text-[#EDE7DD]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-[#C9A227]" />
            <h3 className="text-lg font-serif font-bold text-[#EDE7DD]">
              BibTeX Citation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#A69C93] hover:text-[#EDE7DD] hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Paper title info */}
        <div className="mb-4 text-sm text-[#A69C93]">
          <span className="font-semibold text-[#EDE7DD]">{publication.title}</span>
          <p className="mt-1 text-xs text-[#A69C93]/80">{publication.venue} ({publication.year})</p>
        </div>

        {/* Code block */}
        <div className="relative rounded-lg bg-[#0B0A0C] border border-white/10 p-4 font-mono text-xs text-[#EDE7DD]/90 overflow-x-auto max-h-64 selection:bg-[#6E1423]">
          <pre>{publication.bibtex}</pre>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-[#A69C93]">
            {copied ? "Copied to clipboard!" : "Click copy to cite in LaTeX or Overleaf."}
          </span>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#A69C93] hover:text-[#EDE7DD] transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#6E1423] hover:bg-[#8E1C30] text-[#EDE7DD] text-xs font-semibold rounded-lg transition-all shadow-md active:scale-95 border border-[#6E1423]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#C9A227]" />
                  <span>Copied BibTeX</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy BibTeX</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
