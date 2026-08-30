"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FileText, 
  Mail, 
  Menu, 
  X, 
  Sparkles, 
  BookOpen, 
  GraduationCap
} from "lucide-react";
import { profileData } from "@/content/portfolioData";
import { ContactModal } from "./ContactModal";

interface HeaderProps {
  isReviewerMode: boolean;
  onToggleReviewerMode: () => void;
}

export function Header({ isReviewerMode, onToggleReviewerMode }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#08070A]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#D4AF37]/60 shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:border-[#E5BE38] transition-all group-hover:scale-105 bg-[#151316]">
              <Image
                src="/assets/logos/website_logo.png"
                alt="Abdullah Rubab Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-serif font-bold text-[#EDE7DD] group-hover:text-[#E5BE38] transition-colors">
                Abdullah Rubab
              </span>
              <span className="text-[11px] text-[#A69C93] font-mono flex items-center gap-1.5">
                <span>DIU</span>
                <span className="text-[#D4AF37]">•</span>
                <span>NBTC</span>
                <span className="text-[#D4AF37]">•</span>
                <span>HIRL</span>
              </span>
            </div>
          </Link>

          {/* Desktop Modern Navigation */}
          {!isReviewerMode && (
            <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest font-semibold text-[#A69C93]">
              <a href="#about" className="hover:text-[#EDE7DD] transition-colors">About</a>
              <a href="#research" className="hover:text-[#EDE7DD] transition-colors">Research</a>
              <a href="#publications" className="hover:text-[#EDE7DD] transition-colors flex items-center gap-1.5">
                <span>Publications</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#D4AF37]/20 text-[#E5BE38] text-[10px] font-bold">7</span>
              </a>
              <a href="#projects" className="hover:text-[#EDE7DD] transition-colors">Projects</a>
              <a href="#experience" className="hover:text-[#EDE7DD] transition-colors">Experience</a>
              <a href="#awards" className="hover:text-[#EDE7DD] transition-colors">Awards</a>
              <a href="#vision" className="hover:text-[#EDE7DD] transition-colors text-[#EDE7DD] flex items-center gap-1">
                <span>Vision</span>
                <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>
            </nav>
          )}

          {/* Action Tools & Reviewer Mode Toggle */}
          <div className="flex items-center gap-3">
            {/* Reviewer Mode Switch */}
            <button
              onClick={onToggleReviewerMode}
              aria-label="Toggle Reviewer Mode"
              className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                isReviewerMode
                  ? "bg-[#D4AF37]/20 text-[#E5BE38] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                  : "bg-[#151316] text-[#A69C93] hover:text-[#EDE7DD] border-white/10 hover:border-white/20"
              }`}
            >
              {isReviewerMode ? (
                <>
                  <BookOpen className="w-3.5 h-3.5 text-[#E5BE38]" />
                  <span>Reviewer Dossier</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="hidden sm:inline">Reviewer Mode</span>
                  <span className="sm:hidden">Reviewer</span>
                </>
              )}
            </button>

            {/* Academic CV Direct Link */}
            <Link
              href="/cv"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#151316] hover:bg-[#1C191E] border border-white/10 text-xs font-semibold text-[#EDE7DD] transition-all hover:border-[#D4AF37]"
            >
              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">CV</span>
            </Link>

            {/* Contact Button */}
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#6E1423] to-[#941B32] hover:brightness-110 text-xs font-semibold text-white transition-all shadow-lg active:scale-95 border border-[#8E1C30]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Contact</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#151316] border border-white/10 text-[#A69C93] hover:text-[#EDE7DD]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && !isReviewerMode && (
          <div className="lg:hidden bg-[#08070A]/95 border-b border-white/10 px-6 py-4 space-y-3 animate-fadeIn">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-[#A69C93] hover:text-[#EDE7DD]">
              About & Vision
            </a>
            <a href="#research" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-[#A69C93] hover:text-[#EDE7DD]">
              Research Pillars
            </a>
            <a href="#publications" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-[#A69C93] hover:text-[#EDE7DD]">
              Publications (7)
            </a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-[#A69C93] hover:text-[#EDE7DD]">
              Flagship Projects
            </a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-[#A69C93] hover:text-[#EDE7DD]">
              Experience & Systems
            </a>
            <a href="#awards" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-[#A69C93] hover:text-[#EDE7DD]">
              Honors & Hackathons
            </a>
            <a href="#vision" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-[#E5BE38]">
              Master&apos;s / PhD in Europe
            </a>
          </div>
        )}
      </header>

      {/* Contact Modal */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
