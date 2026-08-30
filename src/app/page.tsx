"use client";

import { useState } from "react";
import { useReviewerMode } from "@/hooks/useReviewerMode";
import { Header } from "@/components/ui/Header";
import { ReviewerModeView } from "@/components/ui/ReviewerModeView";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyThisWorkSection } from "@/components/sections/WhyThisWorkSection";
import { ResearchPillarsSection } from "@/components/sections/ResearchPillarsSection";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { InfrastructureSection } from "@/components/sections/InfrastructureSection";
import { RecognitionSection } from "@/components/sections/RecognitionSection";
import { TrajectorySection } from "@/components/sections/TrajectorySection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ContactModal } from "@/components/ui/ContactModal";
import { NeuralNetBackground } from "@/components/ui/NeuralNetBackground";

export default function Home() {
  const { isReviewerMode, toggleReviewerMode, isInitialized } = useReviewerMode();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0B0A0C] text-[#EDE7DD] relative overflow-hidden">
      {/* Interactive Neural Synapse Net Background */}
      <NeuralNetBackground />

      {/* Sticky Header with Reviewer Mode Switch */}
      <Header
        isReviewerMode={isReviewerMode}
        onToggleReviewerMode={toggleReviewerMode}
      />

      {/* Main Content Area: Reviewer Mode vs. 3D Interactive Story */}
      {isReviewerMode ? (
        <ReviewerModeView />
      ) : (
        <div className="flex flex-col">
          {/* Chapter 0: Hero & 3D Interactive Portrait */}
          <HeroSection
            onToggleReviewerMode={toggleReviewerMode}
            onOpenContact={() => setContactModalOpen(true)}
          />

          {/* Chapter 1: Personal Biography & Academic Overview */}
          <AboutSection onOpenContact={() => setContactModalOpen(true)} />

          {/* Chapter 2: Clinical Problem, 3D Brain & Dirichlet Triage */}
          <WhyThisWorkSection />

          {/* Chapter 3: Four Foundational Research Pillars */}
          <ResearchPillarsSection />

          {/* Chapter 4: Publications & Manuscripts Track Record */}
          <PublicationsSection />

          {/* Chapter 5: Flagship Medical AI & Applied Systems */}
          <ProjectsSection />

          {/* Chapter 6: 3D GPU Infrastructure & Systems Leadership */}
          <InfrastructureSection />

          {/* Chapter 7: Recognition, Hackathon Win & Honors */}
          <RecognitionSection />

          {/* Chapter 8: 3D Global Trajectory & Academic Horizon */}
          <TrajectorySection />

          {/* Chapter 9: Footer & Academic Indices */}
          <FooterSection onOpenContact={() => setContactModalOpen(true)} />
        </div>
      )}

      {/* Direct Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </main>
  );
}
