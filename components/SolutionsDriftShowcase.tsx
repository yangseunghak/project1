"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const solutions = [
  { title: "기업 평판 리스크 관리", label: "Reputation Risk", body: "제품, 캠페인, 서비스 이슈의 언급 흐름과 핵심 쟁점을 분리해 대응 우선순위를 제안합니다.", image: "/core-services/monitoring.png", className: "solution-drift-card--one" },
  { title: "브랜드 이슈 조기 탐지", label: "Early Detection", body: "초기 언급의 출처, 반복성, 확산 가능성을 빠르게 평가해 과열 전 신호를 포착합니다.", image: "/core-services/risk-anlysis.png", className: "solution-drift-card--two" },
  { title: "악성 콘텐츠 확산 분석", label: "Spread Analysis", body: "원문, 댓글, 검색 노출을 연결해 허위정보와 악성 콘텐츠의 확산 구조를 분석합니다.", image: "/core-services/response-strategy.png", className: "solution-drift-card--three" },
  { title: "의료기관 평판 보호", label: "Trust Protection", body: "민감한 표현과 환자 경험을 구분해 사실관계 기반의 안정적인 대응 기준을 제공합니다.", image: "/core-services/evidence-archive.png", className: "solution-drift-card--four" }
];

const driftSettings = [
  { x: 18, y: -12, rotate: 2.2, duration: 6.8 },
  { x: -14, y: 16, rotate: -1.8, duration: 8.1 },
  { x: 16, y: 12, rotate: 2.5, duration: 7.4 },
  { x: -18, y: -14, rotate: -2.1, duration: 8.7 }
];

export function SolutionsDriftShowcase() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(Draggable, ScrollTrigger);
    const root = ref.current;
    if (!root) return;

    const context = gsap.context(() => {
      const title = root.querySelector(".solutions-stage-title");
      const heading = root.querySelector(".solutions-heading");
      const board = root.querySelector<HTMLElement>(".solutions-drift-board");
      const cards = gsap.utils.toArray<HTMLElement>(".solution-drift-card", root);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const driftTweens = reduceMotion ? [] : cards.map((card, index) => {
        const drift = driftSettings[index];
        return gsap.to(card, { x: drift.x, y: drift.y, rotation: `+=${drift.rotate}`, duration: drift.duration, ease: "sine.inOut", repeat: -1, yoyo: true });
      });

      const stopDrift = () => {
        driftTweens.forEach((tween) => tween.pause());
        board?.classList.add("is-dragged");
      };

      const draggableInstances = board ? Draggable.create(cards, {
          type: "x,y",
          bounds: board,
          inertia: false,
          minimumMovement: 4,
          onPress: stopDrift,
          onDragStart: stopDrift
        }) : [];

      gsap.fromTo(title, { autoAlpha: 0, y: 42 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: root, start: "top 76%", once: true } });
      gsap.fromTo([heading, board], { autoAlpha: 0, y: 44 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.14, ease: "power3.out", scrollTrigger: { trigger: heading, start: "top 78%", once: true } });

      return () => {
        driftTweens.forEach((tween) => tween.kill());
        draggableInstances.forEach((instance) => instance.kill());
      };
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={ref} className="solutions-section solutions-drift-section" aria-labelledby="solutions-title">
      <div className="container-wide solutions-drift-layout">
        <h2 id="solutions-title" className="solutions-stage-title" aria-label="OUR SOLUTIONS"><span>OUR</span><strong>SOLUTIONS</strong></h2>
        <div className="solutions-heading"><h3 className="solutions-title">상황에 따라 다른<br /><strong>대응 구조</strong>가 필요합니다</h3></div>
        <div className="solutions-drift-board" aria-label="COADS 솔루션">
          {solutions.map((solution) => (
            <article key={solution.title} className={`solution-drift-card ${solution.className}`} aria-label={`${solution.title}: ${solution.body}`}>
              <Image src={solution.image} alt="" fill sizes="(max-width: 767px) 54vw, 26vw" className="solution-drift-image" />
              <div className="solution-drift-shade" aria-hidden />
              <div className="solution-drift-copy"><p>{solution.label}</p><h4>{solution.title}</h4></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
