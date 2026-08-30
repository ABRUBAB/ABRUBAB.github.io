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
  GraduationCap,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
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
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#08070A]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <Link href="/" className="group flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-[#D4AF37]/60 shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:border-[#E5BE38] transition-all group-hover:scale-105 bg-[#151316]">
              <Image
                src="/assets/logos/website_logo.png"
                alt="Abdullah Rubab Logo"
                fill
                sizes="40px"
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-serif font-bold text-[#EDE7DD] group-hover:text-[#E5BE38] transition-colors leading-tight">
                Abdullah Rubab
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#A69C93] font-mono flex items-center gap-1">
                <span>DIU</span>
                <span className="text-[#D4AF37]">•</span>
                <span>NBTC</span>
                <span className="text-[#D4AF37]">•</span>
                <span>HIRL</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          {!isReviewerMode && (
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs uppercase tracking-widest font-semibold text-[#A69C93]">
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

          {/* Action Header Tools */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Reviewer Mode Switch */}
            <button
              onClick={onToggleReviewerMode}
              aria-label="Toggle Reviewer Mode"
              className={`relative inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                isReviewerMode
                  ? "bg-[#D4AF37]/20 text-[#E5BE38] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                  : "bg-[#151316] text-[#A69C93] hover:text-[#EDE7DD] border-white/10 hover:border-white/20"
              }`}
            >
              {isReviewerMode ? (
                <>
                  <BookOpen className="w-3.5 h-3.5 text-[#E5BE38]" />
                  <span className="hidden xs:inline text-[11px] sm:text-xs">Dossier</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-[11px] sm:text-xs">Reviewer</span>
                </>
              )}
            </button>

            {/* Academic CV Direct Link (Hidden on very tiny mobile to make room for Menu) */}
            <Link
              href="/cv"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#151316] hover:bg-[#1C191E] border border-white/10 text-xs font-semibold text-[#EDE7DD] transition-all hover:border-[#D4AF37]"
            >
              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>CV</span>
            </Link>

            {/* Contact Button */}
            <button
              onClick={() => setContactOpen(true)}
              aria-label="Contact"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#6E1423] to-[#941B32] hover:brightness-110 text-xs font-semibold text-white transition-all shadow-md active:scale-95 border border-[#8E1C30]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Contact</span>
            </button>

            {/* Prominent Mobile Menu Hamburger Button (Always visible on mobile/tablet) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-xl bg-[#18151A] border border-[#D4AF37]/40 text-[#EDE7DD] hover:text-[#E5BE38] hover:border-[#D4AF37] shadow-md transition-all active:scale-95 ml-0.5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#E5BE38]" /> : <Menu className="w-5 h-5 text-[#D4AF37]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B0A0C]/98 border-b border-[#D4AF37]/30 px-6 py-5 space-y-3 shadow-2xl backdrop-blur-xl animate-fadeIn mt-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
              <span>Navigation Menu</span>
              <span>7 Sections</span>
            </div>

            <div className="grid grid-cols-1 gap-1 pt-1">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/5 text-sm text-[#EDE7DD] hover:text-[#E5BE38] transition-colors"
              >
                <span>About Me & Vision</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>

              <a
                href="#research"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/5 text-sm text-[#EDE7DD] hover:text-[#E5BE38] transition-colors"
              >
                <span>Research Pillars</span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>

              <a
                href="#publications"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/5 text-sm text-[#EDE7DD] hover:text-[#E5BE38] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>Publications Track Record</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#D4AF37]/20 text-[#E5BE38] text-[10px] font-bold">7</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>

              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/5 text-sm text-[#EDE7DD] hover:text-[#E5BE38] transition-colors"
              >
                <span>Flagship Projects</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>

              <a
                href="#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/5 text-sm text-[#EDE7DD] hover:text-[#E5BE38] transition-colors"
              >
                <span>Experience & Systems</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>

              <a
                href="#awards"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/5 text-sm text-[#EDE7DD] hover:text-[#E5BE38] transition-colors"
              >
                <span>Honors & Hackathons</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>

              <a
                href="#vision"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#6E1423]/25 border border-[#6E1423]/60 text-sm font-semibold text-[#E5BE38]"
              >
                <span>Master&apos;s / PhD in Europe</span>
                <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
              </a>
            </div>

            {/* Quick Mobile Actions */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
              <Link
                href="/cv"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#151316] border border-white/10 text-xs font-semibold text-[#EDE7DD]"
              >
                <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Academic CV</span>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setContactOpen(true);
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#6E1423] border border-[#8E1C30] text-xs font-semibold text-white"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Get in Touch</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Contact Modal */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
