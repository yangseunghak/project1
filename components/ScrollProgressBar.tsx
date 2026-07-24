"use client";

import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div
        className="scroll-progress-fill"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
