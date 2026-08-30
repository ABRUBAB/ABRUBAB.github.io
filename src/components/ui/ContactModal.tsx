"use client";

import { useState } from "react";
import { Mail, Copy, Check, X, Send, ExternalLink, ShieldCheck } from "lucide-react";
import { profileData } from "@/content/portfolioData";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copiedAcademic, setCopiedAcademic] = useState(false);
  const [copiedPersonal, setCopiedPersonal] = useState(false);

  if (!isOpen) return null;

  const copyEmail = async (email: string, isAcademic: boolean) => {
    try {
      await navigator.clipboard.writeText(email);
      if (isAcademic) {
        setCopiedAcademic(true);
        setTimeout(() => setCopiedAcademic(false), 2200);
      } else {
        setCopiedPersonal(true);
        setTimeout(() => setCopiedPersonal(false), 2200);
      }
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#151316] border border-[#6E1423]/70 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#EDE7DD] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#6E1423]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#6E1423]/30 border border-[#6E1423]/60 text-[#EDE7DD]">
              <Mail className="w-5 h-5 text-[#C9A227]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#EDE7DD]">
                Direct Academic Contact
              </h3>
              <p className="text-xs text-[#A69C93]">
                For scholarship committees, admissions, and research inquiries
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A69C93] hover:text-[#EDE7DD] hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Emails Container */}
        <div className="space-y-4 mb-6">
          {/* Academic Email */}
          <div className="p-4 rounded-xl bg-[#0B0A0C] border border-[#C9A227]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#C9A227] font-semibold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Primary Academic Address (DIU)</span>
              </div>
              <p className="font-mono text-sm text-[#EDE7DD] select-all">
                {profileData.contacts.academicEmail}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => copyEmail(profileData.contacts.academicEmail, true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium transition-colors"
              >
                {copiedAcademic ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span className="text-[#C9A227]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#A69C93]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <a
                href={`mailto:${profileData.contacts.academicEmail}?subject=Academic%20Inquiry%20regarding%20PhD/Master's%20Research`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6E1423] hover:bg-[#8E1C30] text-xs font-semibold text-white transition-all shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Mailto</span>
              </a>
            </div>
          </div>

          {/* Personal Email */}
          <div className="p-4 rounded-xl bg-[#0B0A0C] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-[#A69C93] font-medium block mb-1">
                Alternate Personal Address
              </span>
              <p className="font-mono text-sm text-[#EDE7DD] select-all">
                {profileData.contacts.personalEmail}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => copyEmail(profileData.contacts.personalEmail, false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium transition-colors"
              >
                {copiedPersonal ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span className="text-[#C9A227]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#A69C93]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <a
                href={`mailto:${profileData.contacts.personalEmail}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252026] hover:bg-[#322B34] text-xs font-semibold text-[#EDE7DD] transition-all"
              >
                <Send className="w-3.5 h-3.5 text-[#A69C93]" />
                <span>Mailto</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#A69C93]">
          <span>Profiles:</span>
          <div className="flex items-center gap-3">
            <a
              href={profileData.contacts.researchGate}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EDE7DD] hover:text-[#C9A227] inline-flex items-center gap-1 transition-colors"
            >
              ResearchGate <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={profileData.contacts.orcid}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EDE7DD] hover:text-[#C9A227] inline-flex items-center gap-1 transition-colors"
            >
              ORCID <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={profileData.contacts.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EDE7DD] hover:text-[#C9A227] inline-flex items-center gap-1 transition-colors"
            >
              Scholar <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={profileData.contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EDE7DD] hover:text-[#C9A227] inline-flex items-center gap-1 transition-colors"
            >
              GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
