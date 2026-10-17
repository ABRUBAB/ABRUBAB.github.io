"use client";

import React from "react";

interface BacklitGlowProps {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
  containerClassName?: string;
}

export function BacklitGlow({
  children,
  glowColor = "rgba(212, 175, 55, 0.15)",
  className = "",
  containerClassName = ""
}: BacklitGlowProps) {
  return (
    <div className={`relative group ${containerClassName}`}>
      {/* Backlit UI Ambient Radial Glow Effect */}
      <div
        className={`absolute -inset-1 rounded-3xl opacity-60 blur-xl transition-all duration-700 group-hover:opacity-100 group-hover:blur-2xl pointer-events-none ${className}`}
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`
        }}
      />
      {/* Foreground Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
