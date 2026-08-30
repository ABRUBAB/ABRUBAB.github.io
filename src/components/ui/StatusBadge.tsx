"use client";

import { PublicationStatus } from "@/content/types";
import { CheckCircle2, Clock, Sparkles, FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: PublicationStatus;
  className?: string;
  showIcon?: boolean;
}

export function StatusBadge({ status, className, showIcon = true }: StatusBadgeProps) {
  switch (status) {
    case "published":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full",
            "bg-[#C9A227]/15 text-[#E5BE38] border border-[#C9A227]/80 shadow-[0_0_12px_rgba(201,162,39,0.3)]",
            className
          )}
        >
          {showIcon && <Sparkles className="w-3.5 h-3.5 text-[#E5BE38]" />}
          Published
        </span>
      );
    case "accepted":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full",
            "bg-[#C9A227]/10 text-[#EDE7DD] border border-[#C9A227]/50",
            className
          )}
        >
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227]" />}
          Accepted
        </span>
      );
    case "under_review":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full",
            "bg-[#6E1423]/30 text-[#EDE7DD] border border-[#6E1423]/70",
            className
          )}
        >
          {showIcon && <FileSearch className="w-3.5 h-3.5 text-[#8E1C30]" />}
          Under Review (Q1)
        </span>
      );
    case "in_progress":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full",
            "bg-[#1C191E] text-[#A69C93] border border-[#252026]",
            className
          )}
        >
          {showIcon && <Clock className="w-3.5 h-3.5 text-[#706862]" />}
          In Progress
        </span>
      );
  }
}
