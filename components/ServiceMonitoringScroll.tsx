"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const imageSource = "/coads-service-monitoring.png";

export const monitoringStages = [
  {
    title: "온라인 게시물 수집",
    description: "검색 결과, 커뮤니티, SNS, 뉴스, 블로그와 유튜브에서 브랜드 관련 게시물을 수집합니다.",
    focusClass: "is-collection",
    position: "29% 65%",
    zoom: 1.05
  },
  {
    title: "게시물 내용 확인",
    description: "게시물의 작성 시점, 주요 주장, 반복되는 내용과 이용자 반응을 확인합니다.",
    focusClass: "is-scanning",
    position: "50% 42%",
    zoom: 1.1
  },
  {
    title: "대응 필요 여부 분류",
    description: "일반적인 언급, 추가 확인이 필요한 게시물, 바로 대응해야 하는 게시물을 나눕니다.",
    focusClass: "is-classification",
    position: "79% 31%",
    zoom: 1.12,
    labels: ["일반 언급", "추가 확인", "긴급 대응"]
  },
  {
    title: "실행할 대응안 작성",
    description: "대응 여부, 공식 입장, 답변 문안과 채널별 실행 순서를 정리합니다.",
    focusClass: "is-response",
    position: "79% 73%",
    zoom: 1.1
  }
];

export function ServiceMonitoringScroll() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const copies = gsap.utils.toArray<HTMLElement>(".monitoring-scroll-copy", root);
      const focuses = gsap.utils.toArray<HTMLElement>(".monitoring-scroll-focus", root);
      const images = gsap.utils.toArray<HTMLElement>(".monitoring-scroll-image", root);
      const intro = root.querySelector<HTMLElement>(".monitoring-scroll-intro");
      const counter = root.querySelector<HTMLElement>(".monitoring-scroll-count");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const desktop = window.matchMedia("(min-width: 769px)").matches;

      if (!copies.length || !focuses.length || !images.length || !counter || !intro) return;

      gsap.set(copies, { autoAlpha: 0, y: 20 });
      gsap.set(focuses, { autoAlpha: 0 });

      if (reducedMotion || !desktop) return;

      let activeIndex = 0;
      const setActiveIndex = (index: number) => {
        if (index === activeIndex) return;
        activeIndex = index;
        counter.textContent = `${String(index + 1).padStart(2, "0")} / 04`;
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=4600",
          scrub: 0.85,
          pin: true,
          pinType: "fixed",
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (trigger) => setActiveIndex(Math.min(3, Math.floor(trigger.progress * 4)))
        }
      });

      timeline
        .to({}, { duration: 0.75 })
        .to(intro, { autoAlpha: 0, y: -10, duration: 0.24, ease: "power2.out" })
        .to(copies[0], { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, "<+0.08")
        .to(focuses[0], { autoAlpha: 1, duration: 0.55, ease: "power2.out" }, "<+0.05")
          .to(images, { scale: monitoringStages[0].zoom, transformOrigin: monitoringStages[0].position, duration: 0.6, ease: "power2.out" }, "<")
        .to({}, { duration: 0.75 });
      monitoringStages.slice(1).forEach((stage, index) => {
        const nextIndex = index + 1;
        timeline
          .to(copies[nextIndex - 1], { autoAlpha: 0, y: -10, duration: 0.24, ease: "power2.out" })
          .to(copies[nextIndex], { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, "<+0.08")
          .to(focuses[nextIndex - 1], { autoAlpha: 0, duration: 0.28, ease: "power2.out" }, "<")
          .to(focuses[nextIndex], { autoAlpha: 1, duration: 0.55, ease: "power2.out" }, "<+0.05")
          .to(images, { scale: stage.zoom, transformOrigin: stage.position, duration: 0.6, ease: "power2.out" }, "<");
        timeline.to({}, { duration: 1 });
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={ref} className="monitoring-scroll-section" aria-labelledby="monitoring-scroll-title">
      <div className="monitoring-scroll-sticky">
        <div className="monitoring-scroll-media" aria-hidden="true">
          <img className="monitoring-scroll-image monitoring-scroll-base" src={imageSource} alt="" />
          {monitoringStages.map((stage, index) => (
            <div key={stage.focusClass} className={`monitoring-scroll-focus ${stage.focusClass}`}>
              <img className="monitoring-scroll-image" src={imageSource} alt="" />
            </div>
          ))}
        </div>
        <div className="monitoring-scroll-overlay" aria-hidden="true" />

        <div className="monitoring-scroll-intro">
          <p>SERVICES</p>
          <h1 id="monitoring-scroll-title">COADS 평판 서비스</h1>
          <span>검색 결과, 커뮤니티, SNS, 뉴스, 블로그와 유튜브에서 브랜드 관련 게시물을 확인하고 대응이 필요한 내용을 구분합니다.</span>
        </div>

        <div className="monitoring-scroll-steps" aria-live="polite">
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
        <a className="monitoring-scroll-detail" href="#services-detail">서비스 자세히 보기</a>
      </div>

      <div className="monitoring-mobile-flow">
        <img className="monitoring-mobile-hero-image" src={imageSource} alt="COADS 관제실에서 온라인 게시물을 수집하고 분류하는 과정" />
        <div className="monitoring-mobile-intro">
          <p>SERVICES</p>
          <h1>COADS 평판 서비스</h1>
          <span>검색 결과, 커뮤니티, SNS, 뉴스, 블로그와 유튜브에서 브랜드 관련 게시물을 확인하고 대응이 필요한 내용을 구분합니다.</span>
        </div>
        <div className="monitoring-mobile-steps">
          {monitoringStages.map((stage, index) => (
            <article key={stage.title}>
              <div className={`monitoring-mobile-thumbnail ${stage.focusClass}`}><img src={imageSource} alt="" /></div>
              <p>0{index + 1} / 04</p>
              <h2>{stage.title}</h2>
              <span>{stage.description}</span>
              {stage.labels && <div>{stage.labels.map((label) => <b key={label}>{label}</b>)}</div>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
