"use client";

import { useEffect, useState } from "react";

export function CaseDetailProgress() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-case-section]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.caseSection));
    }, { rootMargin: "-30% 0px -55%", threshold: [0, 0.25, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return <aside className="case-progress" aria-label="사례 진행 상태"><i style={{ height: `${active * 20}%` }} />{[1,2,3,4,5].map((step) => <span key={step} className={active === step ? "is-active" : ""}>{String(step).padStart(2, "0")}</span>)}</aside>;
}
