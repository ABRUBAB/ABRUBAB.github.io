"use client";

import { useState, useEffect } from "react";

export function useReviewerMode() {
  const [isReviewerMode, setIsReviewerMode] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Check URL parameters for ?mode=reviewer or ?reviewer=true
    const urlParams = new URLSearchParams(window.location.search);
    const urlParamReviewer = urlParams.get("reviewer") === "true" || urlParams.get("mode") === "reviewer";

    // Check localStorage
    const stored = localStorage.getItem("rubab_reviewer_mode");
    if (urlParamReviewer) {
      setIsReviewerMode(true);
    } else if (stored !== null) {
      setIsReviewerMode(stored === "true");
    }
    setIsInitialized(true);
  }, []);

  const toggleReviewerMode = () => {
    setIsReviewerMode((prev) => {
      const next = !prev;
      localStorage.setItem("rubab_reviewer_mode", String(next));
      return next;
    });
  };

  const setMode = (val: boolean) => {
    setIsReviewerMode(val);
    localStorage.setItem("rubab_reviewer_mode", String(val));
  };

  return { isReviewerMode, toggleReviewerMode, setMode, isInitialized };
}
