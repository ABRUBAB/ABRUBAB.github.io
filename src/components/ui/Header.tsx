"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  FileText, 
  Mail, 
  Menu, 
  X, 
  Sparkles, 
  BookOpen, 
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Building2,
  Code2,
  User,
  Layers
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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/about", label: "About", icon: User },
    { href: "/publications", label: "Publications", badge: "7", icon: BookOpen },
    { href: "/projects", label: "Projects", icon: Code2 },
    { href: "/experience", label: "Experience", icon: Building2 },
    { href: "/cv", label: "CV", icon: FileText },
  ];

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
              <Link 
                href="/" 
                className={`hover:text-[#EDE7DD] transition-colors ${pathname === "/" ? "text-[#E5BE38] font-bold" : ""}`}
              >
                Home
              </Link>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`hover:text-[#EDE7DD] transition-colors flex items-center gap-1.5 ${
                      isActive ? "text-[#E5BE38] font-bold" : ""
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.2 rounded-full bg-[#D4AF37]/20 text-[#E5BE38] text-[10px] font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
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

            {/* Academic CV Direct Link */}
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

            {/* Prominent Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-xl bg-[#18151A] border border-[#D4AF37]/40 text-[#EDE7DD] hover:text-[#E5BE38] hover:border-[#D4AF37] shadow-md transition-all active:scale-95 ml-0.5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#E5BE38]" /> : <Menu className="w-5 h-5 text-[#D4AF37]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B0A0C]/98 border-b border-[#D4AF37]/30 px-6 py-5 space-y-3 shadow-2xl backdrop-blur-xl animate-fadeIn mt-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
              <span>Navigation Pages</span>
              <span>Portfolio Menu</span>
            </div>

            <div className="grid grid-cols-1 gap-1 pt-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/5 text-sm transition-colors ${
                  pathname === "/" ? "text-[#E5BE38] bg-white/5 font-bold" : "text-[#EDE7DD]"
                }`}
              >
                <span>Home</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </Link>

              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/5 text-sm transition-colors ${
                      isActive ? "text-[#E5BE38] bg-white/5 font-bold" : "text-[#EDE7DD]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#D4AF37]" />
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="px-1.5 py-0.2 rounded-full bg-[#D4AF37]/20 text-[#E5BE38] text-[10px] font-bold">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </Link>
                );
              })}
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
                <span>Contact</span>
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
