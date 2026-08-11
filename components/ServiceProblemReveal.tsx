"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { monitoringStages } from "@/components/ServiceMonitoringScroll";
import { CoadsLabBooklet } from "@/components/CoadsLabBooklet";

export function ServiceProblemReveal() {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const label = root.querySelector<HTMLElement>(".services-page-section-label");
      const title = root.querySelector<HTMLElement>(".services-page-problem-visual-title");
      const lab = root.querySelector<HTMLElement>(".services-page-problem-lab");
      const copies = gsap.utils.toArray<HTMLElement>(".services-page-problem-lab .monitoring-scroll-copy", root);
      const focuses = gsap.utils.toArray<HTMLElement>(".services-page-problem-lab .monitoring-scroll-focus", root);
      const images = gsap.utils.toArray<HTMLElement>(".services-page-problem-lab .monitoring-scroll-image", root);
      const counter = root.querySelector<HTMLElement>(".services-page-problem-lab .monitoring-scroll-count");
      const targets = [label, title, lab, counter, ...copies, ...focuses, ...images].filter(Boolean) as HTMLElement[];

      if (!targets.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.set([label, title], { autoAlpha: 0, y: 42, willChange: "transform, opacity" });
      gsap.set(lab, { autoAlpha: 0, scale: 1.05, willChange: "transform, opacity" });
      gsap.set(copies, { autoAlpha: 0, y: 20 });
      gsap.set(focuses, { autoAlpha: 0 });

      let activeIndex = 0;
      const setActiveIndex = (index: number) => {
        if (!counter || index === activeIndex) return;
        activeIndex = index;
        counter.textContent = `${String(index + 1).padStart(2, "0")} / 04`;
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=9200",
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      })
        .to(label, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0.16)
        .to({}, { duration: 0.8 })
        .to(label, { autoAlpha: 0, y: -28, duration: 0.68, ease: "power2.inOut" })
        .to(title, { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out" }, ">-0.08")
        .to({}, { duration: 1.1 })
        .to(title, { autoAlpha: 0, y: -28, duration: 0.7, ease: "power2.inOut" })
        .to(lab, { autoAlpha: 1, scale: 1, duration: 1.15, ease: "power3.out" }, ">-0.08")
        .to(copies[0], { autoAlpha: 1, y: 0, duration: 0.72, ease: "power2.out" }, ">-0.45")
        .to(focuses[0], { autoAlpha: 1, duration: 0.62, ease: "power2.out" }, "<+0.06")
        .to(images, { scale: monitoringStages[0].zoom, transformOrigin: monitoringStages[0].position, duration: 0.72, ease: "power2.out" }, "<")
        .to({}, { duration: 3 });

      monitoringStages.slice(1).forEach((stage, index) => {
        const nextIndex = index + 1;
        timeline
          .to(copies[nextIndex - 1], { autoAlpha: 0, y: -12, duration: 0.75, ease: "power2.out" })
          .to(copies[nextIndex], { autoAlpha: 1, y: 0, duration: 1.4, ease: "power2.out" }, "<+0.18")
          .to(focuses[nextIndex - 1], { autoAlpha: 0, duration: 0.75, ease: "power2.out" }, "<")
          .to(focuses[nextIndex], { autoAlpha: 1, duration: 1.2, ease: "power2.out" }, "<+0.12")
          .to(images, { scale: stage.zoom, transformOrigin: stage.position, duration: 1.4, ease: "power2.out" }, "<")
          .to({}, { duration: 3.5 });
      });

      timeline.eventCallback("onUpdate", () => {
        let brightestIndex = 0;
        let brightestOpacity = -1;

        focuses.forEach((focus, index) => {
          const opacity = Number(gsap.getProperty(focus, "opacity"));
          if (opacity > brightestOpacity) {
            brightestOpacity = opacity;
            brightestIndex = index;
          }
        });

        setActiveIndex(brightestIndex);
      });
    }, root);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={ref} id="services-detail" className="services-page-problem" aria-labelledby="services-problem-title">
      <div className="services-page-problem-lab">
        <div className="monitoring-scroll-media">
          <img className="monitoring-scroll-image monitoring-scroll-base" src="/coads-service-monitoring.png" alt="" />
          {monitoringStages.map((stage) => (
            <div
              key={stage.focusClass}
              className={`monitoring-scroll-focus ${stage.focusClass}`}
            >
              <img className="monitoring-scroll-image" src="/coads-service-monitoring.png" alt="" />
            </div>
          ))}
        </div>
        <div className="monitoring-scroll-overlay" />
        <div className="monitoring-scroll-hotspots">
          {monitoringStages.map((stage, index) => (
            <button
              type="button"
              key={stage.focusClass}
              className={`monitoring-scroll-hotspot ${stage.focusClass}`}
              aria-label={`STEP ${String(index + 1).padStart(2, "0")} LAB 페이지 펼치기`}
            />
          ))}
        </div>
        {monitoringStages.map((stage, index) => (
          <CoadsLabBooklet key={`booklet-${stage.focusClass}`} activeStep={index} open={false} />
        ))}
        <div className="monitoring-scroll-steps">
          {monitoringStages.map((stage, index) => (
            <article className="monitoring-scroll-copy" key={stage.title}>
              <p>STEP {String(index + 1).padStart(2, "0")}</p>
              <h2>{stage.title}</h2>
              <span>{stage.description}</span>
              {stage.labels && <div className="monitoring-scroll-labels">{stage.labels.map((label) => <b key={label}>{label}</b>)}</div>}
            </article>
          ))}
        </div>
        <div className="monitoring-scroll-status">
          <span className="monitoring-scroll-count">01 / 04</span>
          <span>SCROLL TO VIEW</span>
        </div>
      </div>
      <div className="container-wide services-page-problem-grid">
        <p className="services-page-section-label" data-problem-reveal><span>THE</span> <strong>PROBLEM</strong></p>
        <div>
          <h2 className="services-page-problem-visual-title" aria-hidden="true">
            <span>한 줄의 <em>반응</em>이</span>
            <span>브랜드 전체의 <em>인상</em>이 됩니다</span>
          </h2>
          <h2 id="services-problem-title">
            <span data-problem-reveal>한 줄의 반응이</span>
            <strong data-problem-reveal>브랜드 전체의 인상</strong>
            이 됩니다.
          </h2>
          <p data-problem-reveal>광고를 보고 유입된 고객도 검색과 리뷰를 통해 마지막 판단을 내립니다. 방치된 부정 반응은 클릭률, 문의, 예약, 구매 전환에 조용히 영향을 남깁니다.</p>
        </div>
      </div>
    </section>
  );
}
