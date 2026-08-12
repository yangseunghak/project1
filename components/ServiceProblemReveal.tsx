"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { monitoringStages } from "@/components/ServiceMonitoringScroll";
import { CoadsLabBooklet } from "@/components/CoadsLabBooklet";

export function ServiceProblemReveal() {
  const ref = useRef<HTMLElement>(null);
  const mobileTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mobileLabStep, setMobileLabStep] = useState<number | null>(null);
  const [mobileLoadingStep, setMobileLoadingStep] = useState<number | null>(null);

  const closeMobileLab = () => {
    if (mobileTimerRef.current) clearTimeout(mobileTimerRef.current);
    mobileTimerRef.current = null;
    setMobileLoadingStep(null);
    setMobileLabStep(null);
  };

  const openMobileLab = (index: number) => {
    if (!window.matchMedia("(max-width: 768px), (hover: none)").matches) return;
    closeMobileLab();
    setMobileLoadingStep(index);
    mobileTimerRef.current = setTimeout(() => {
      setMobileLoadingStep(null);
      setMobileLabStep(index);
      mobileTimerRef.current = null;
    }, 820);
  };

  useEffect(() => {
    if (mobileLabStep === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileLabStep]);

  useEffect(() => () => {
    if (mobileTimerRef.current) clearTimeout(mobileTimerRef.current);
  }, []);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const preloadLabImages = Array.from({ length: 4 }, (_, index) => {
      const image = new Image();
      image.src = `/labs${String(index + 1).padStart(2, "0")}.png`;
      image.decode?.().catch(() => undefined);
      return image;
    });

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const label = root.querySelector<HTMLElement>(".services-page-section-label");
      const title = root.querySelector<HTMLElement>(".services-page-problem-visual-title");
      const lab = root.querySelector<HTMLElement>(".services-page-problem-lab");
      const copies = gsap.utils.toArray<HTMLElement>(".services-page-problem-lab .monitoring-scroll-copy", root);
      const focuses = gsap.utils.toArray<HTMLElement>(".services-page-problem-lab .monitoring-scroll-focus", root);
      const images = gsap.utils.toArray<HTMLElement>(".services-page-problem-lab .monitoring-scroll-image", root);
      const hotspots = root.querySelector<HTMLElement>(".services-page-problem-lab .monitoring-scroll-hotspots");
      const hotspotButtons = gsap.utils.toArray<HTMLButtonElement>(".services-page-problem-lab .monitoring-scroll-hotspot", root);
      const counter = root.querySelector<HTMLElement>(".services-page-problem-lab .monitoring-scroll-count");
      const transformedSurfaces = [...images, ...(hotspots ? [hotspots] : [])];
      const targets = [label, title, lab, counter, hotspots, ...copies, ...focuses, ...images].filter(Boolean) as HTMLElement[];
      const compactViewport = window.matchMedia("(max-width: 768px)").matches;
      const mobileCameraPositions = ["22% 58%", "50% 43%", "88% 30%", "90% 76%"];

      if (!targets.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.set([label, title], { autoAlpha: 0, y: 42, willChange: "transform, opacity" });
      gsap.set(lab, { autoAlpha: 0, scale: 1.05, willChange: "transform, opacity" });
      gsap.set(copies, { autoAlpha: 0, y: 20 });
      gsap.set(focuses, { autoAlpha: 0 });
      if (compactViewport) gsap.set(images, { objectPosition: mobileCameraPositions[0] });

      let activeIndex = 0;
      const setActiveIndex = (index: number) => {
        if (!counter || index === activeIndex) return;
        activeIndex = index;
        closeMobileLab();
        if (lab) lab.dataset.activeStep = String(index + 1).padStart(2, "0");
        counter.textContent = `${String(index + 1).padStart(2, "0")} / 04`;
      };

      const setActiveHotspot = (index: number | null) => {
        hotspotButtons.forEach((button, buttonIndex) => {
          const isActive = buttonIndex === index;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-disabled", String(!isActive));
          button.tabIndex = isActive ? 0 : -1;
        });
      };

      setActiveHotspot(null);

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "services-problem-sequence",
          trigger: root,
          start: "top top",
          end: "+=11800",
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      })
        .to(label, { autoAlpha: 1, y: 0, duration: 1.35, ease: "power2.out" }, 0.16)
        .to({}, { duration: 2.5 })
        .to(label, { autoAlpha: 0, y: -28, duration: 1.3, ease: "power2.inOut" })
        .to(title, { autoAlpha: 1, y: 0, duration: 2.05, ease: "power3.out" }, ">-0.03")
        .to({}, { duration: 3 })
        .to(title, { autoAlpha: 0, y: -28, duration: 1.35, ease: "power2.inOut" })
        .to(lab, { autoAlpha: 1, scale: 1, duration: 1.9, ease: "power3.out" }, ">-0.03")
        .to(copies[0], { autoAlpha: 1, y: 0, duration: 0.72, ease: "power2.out" }, ">-0.45")
        .to(focuses[0], { autoAlpha: 1, duration: 0.62, ease: "power2.out" }, "<+0.06")
        .to(transformedSurfaces, { scale: monitoringStages[0].zoom, transformOrigin: monitoringStages[0].position, duration: 0.72, ease: "power2.out" }, "<")
        .to(images, { objectPosition: compactViewport ? mobileCameraPositions[0] : monitoringStages[0].position, duration: 1.15, ease: "power2.inOut" }, "<")
        .to({}, { duration: 3 });

      monitoringStages.slice(1).forEach((stage, index) => {
        const nextIndex = index + 1;
        timeline
          .to(copies[nextIndex - 1], { autoAlpha: 0, y: -12, duration: 0.75, ease: "power2.out" })
          .to(copies[nextIndex], { autoAlpha: 1, y: 0, duration: 1.4, ease: "power2.out" }, "<+0.18")
          .to(focuses[nextIndex - 1], { autoAlpha: 0, duration: 0.75, ease: "power2.out" }, "<")
          .to(focuses[nextIndex], { autoAlpha: 1, duration: 1.2, ease: "power2.out" }, "<+0.12")
          .to(transformedSurfaces, { scale: stage.zoom, transformOrigin: stage.position, duration: 1.4, ease: "power2.out" }, "<")
          .to(images, { objectPosition: compactViewport ? mobileCameraPositions[nextIndex] : stage.position, duration: 1.65, ease: "power2.inOut" }, "<")
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
        const labOpacity = lab ? Number(gsap.getProperty(lab, "opacity")) : 0;
        setActiveHotspot(labOpacity > 0.5 && brightestOpacity > 0.5 ? brightestIndex : null);
      });
    }, root);

    return () => {
      preloadLabImages.forEach((image) => {
        image.src = "";
      });
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
              onClick={() => openMobileLab(index)}
              aria-label={`STEP ${String(index + 1).padStart(2, "0")} LAB 페이지 펼치기`}
            />
          ))}
        </div>
        <div className="monitoring-hover-loader" aria-hidden="true">
          <span>LOADING LAB</span>
          <i />
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
          <span className="monitoring-scroll-hover-guide"><span className="guide-desktop">하이라이트 영역에 마우스를 올려보세요</span><span className="guide-mobile">하이라이트 영역을 터치해 보세요</span></span>
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
      {(mobileLoadingStep !== null || mobileLabStep !== null) && (
        <div className={`mobile-lab-viewer ${mobileLabStep !== null ? "is-open" : "is-loading"}`} role="dialog" aria-modal="true" aria-label={`COADS LAB STEP ${String((mobileLabStep ?? mobileLoadingStep ?? 0) + 1).padStart(2, "0")}`}>
          <button type="button" className="mobile-lab-backdrop" onClick={closeMobileLab} aria-label="LAB 화면 닫기" />
          {mobileLoadingStep !== null && <div className="mobile-lab-loading" aria-live="polite"><span>LOADING LAB</span><i /></div>}
          {mobileLabStep !== null && (
            <div className="mobile-lab-sheet">
              <button type="button" className="mobile-lab-close" onClick={closeMobileLab} aria-label="LAB 화면 닫기">×</button>
              <img src={`/labs${String(mobileLabStep + 1).padStart(2, "0")}.png`} alt={`COADS LAB STEP ${String(mobileLabStep + 1).padStart(2, "0")} 상세 페이지`} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
