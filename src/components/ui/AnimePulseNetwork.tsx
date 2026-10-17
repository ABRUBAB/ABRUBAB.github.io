"use client";

import React, { useEffect, useRef } from "react";
import { animate } from "animejs";

interface AnimePulseNetworkProps {
  className?: string;
  activeLabel?: string;
}

export function AnimePulseNetwork({
  className = "",
  activeLabel = "Dirichlet Prior Inference Active"
}: AnimePulseNetworkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pulseRef1 = useRef<SVGCircleElement>(null);
  const pulseRef2 = useRef<SVGCircleElement>(null);
  const pulseRef3 = useRef<SVGCircleElement>(null);
  const signalRef1 = useRef<SVGCircleElement>(null);
  const signalRef2 = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Pulse nodes animation with Anime.js
    const nodeAnimation = animate(
      [pulseRef1.current, pulseRef2.current, pulseRef3.current],
      {
        r: [3, 6, 3],
        opacity: [0.4, 1, 0.4],
        duration: 2200,
        loop: true,
        ease: "inOutQuad"
      }
    );

    // Traveling signal packets along SVG coordinates
    if (signalRef1.current) {
      animate(signalRef1.current, {
        cx: [20, 100],
        cy: [20, 20],
        opacity: [0, 1, 0],
        duration: 1800,
        loop: true,
        ease: "inOutSine"
      });
    }

    if (signalRef2.current) {
      animate(signalRef2.current, {
        cx: [100, 180],
        cy: [20, 20],
        opacity: [0, 1, 0],
        duration: 1800,
        delay: 600,
        loop: true,
        ease: "inOutSine"
      });
    }

    return () => {
      // Cleanup on unmount
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#121014]/90 border border-[#D4AF37]/30 backdrop-blur-md shadow-lg ${className}`}
    >
      {/* Anime.js Powered Synapse SVG */}
      <svg
        width="120"
        height="24"
        viewBox="0 0 200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 overflow-visible"
      >
        {/* Connection Tracks */}
        <line
          x1="20"
          y1="20"
          x2="100"
          y2="20"
          stroke="rgba(212, 175, 55, 0.25)"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        <line
          x1="100"
          y1="20"
          x2="180"
          y2="20"
          stroke="rgba(212, 175, 55, 0.25)"
          strokeWidth="2"
          strokeDasharray="3 3"
        />

        {/* Nodes */}
        <circle cx="20" cy="20" r="4" fill="#D4AF37" />
        <circle ref={pulseRef1} cx="20" cy="20" r="3" stroke="#D4AF37" strokeWidth="1.5" fill="none" />

        <circle cx="100" cy="20" r="4" fill="#E5BE38" />
        <circle ref={pulseRef2} cx="100" cy="20" r="3" stroke="#E5BE38" strokeWidth="1.5" fill="none" />

        <circle cx="180" cy="20" r="4" fill="#10B981" />
        <circle ref={pulseRef3} cx="180" cy="20" r="3" stroke="#10B981" strokeWidth="1.5" fill="none" />

        {/* Traveling Synapse Signals */}
        <circle ref={signalRef1} cx="20" cy="20" r="2.5" fill="#E5BE38" />
        <circle ref={signalRef2} cx="100" cy="20" r="2.5" fill="#34D399" />
      </svg>

      {/* Dynamic Status Text */}
      <span className="text-[11px] font-mono tracking-tight text-[#EDE7DD]/90 whitespace-nowrap">
        {activeLabel}
      </span>
    </div>
  );
}
