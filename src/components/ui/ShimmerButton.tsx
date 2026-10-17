"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ShimmerButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  shimmerColor?: string;
  shimmerDuration?: string;
  className?: string;
  onClick?: () => void;
}

export function ShimmerButton({
  children,
  shimmerColor = "rgba(212, 175, 55, 0.4)",
  shimmerDuration = "3s",
  className = "",
  onClick,
  ...props
}: ShimmerButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-2xl p-[1px] focus:outline-none transition-shadow duration-300 shadow-lg hover:shadow-[#D4AF37]/20 ${className}`}
      {...props}
    >
      {/* Rotating Shimmer Halo (Kokonut UI signature) */}
      <span
        className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite]"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, #0000 0%, ${shimmerColor} 50%, #0000 100%)`
        }}
      />

      {/* Button Content Surface */}
      <span className="relative inline-flex items-center justify-center w-full h-full px-5 py-2.5 rounded-[15px] bg-[#121014]/95 backdrop-blur-xl text-xs sm:text-sm font-semibold text-[#EDE7DD] hover:text-white transition-colors gap-2">
        {children}
      </span>
    </motion.button>
  );
}
