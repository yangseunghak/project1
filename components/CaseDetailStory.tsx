"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CaseNote } from "@/data/caseNotes";
import type { CaseStudy } from "@/data/caseStudyDetails";
import {
  CaseDetailHero,
  CaseNavigation,
  CaseOverview,
  CaseResult,
  CaseTimeline,
  CoadsResponse,
} from "@/components/CaseReportSections";

type CaseDetailStoryProps = {
  study: CaseStudy;
  previous: CaseNote | null;
  next: CaseNote | null;
};

export function CaseDetailStory({ study, previous, next }: CaseDetailStoryProps) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const heroItems = gsap.utils.toArray<HTMLElement>(".case-report-hero [data-case-reveal]", element);
      if (heroItems.length) {
        gsap.from(heroItems, { autoAlpha: 0, y: 28, scale: 0.985, duration: 0.8, stagger: 0.14, ease: "power3.out", clearProps: "transform,opacity,visibility" });
      }

      const sections = gsap.utils.toArray<HTMLElement>(".case-report-overview, .case-report-stage, .case-report-method, .case-report-result", element);
      sections.forEach((section) => {
        const targets = section.querySelectorAll(":scope > .case-report-shell > *, .case-report-stage-grid > *");
        if (!targets.length) return;
        gsap.from(targets, {
          autoAlpha: 0,
          y: 26,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });
      });
    }, element);

    return () => context.revert();
  }, []);

  return (
    <article ref={root} className="case-report" style={{ "--case-report-accent": study.accent } as React.CSSProperties}>
      <CaseDetailHero study={study} />
      <CaseOverview study={study} />
      <CaseTimeline study={study} />
      <CoadsResponse study={study} />
      <CaseResult study={study} />
      <CaseNavigation previous={previous} next={next} />
    </article>
  );
}
