"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const solutions = [
  {
    title: "기업 평판 리스크 관리",
    label: "Reputation Risk",
    body: "제품, 캠페인, 서비스 이슈의 언급 흐름과 핵심 쟁점을 분리해 대응 우선순위를 제안합니다."
  },
  {
    title: "브랜드 이슈 조기 탐지",
    label: "Early Detection",
    body: "초기 언급의 출처, 반복성, 확산 가능성을 빠르게 평가해 과열 전 신호를 포착합니다."
  },
  {
    title: "악성 콘텐츠 확산 분석",
    label: "Spread Analysis",
    body: "원문, 댓글, 검색 노출을 연결해 허위정보와 악성 콘텐츠의 확산 구조를 분석합니다."
  },
  {
    title: "의료기관 평판 보호",
    label: "Trust Protection",
    body: "민감한 표현과 환자 경험을 구분해 사실관계 기반의 안정적인 대응 기준을 제공합니다."
  }
];

export function SolutionsShowcase() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = ref.current;
    if (!root) return;

    const context = gsap.context(() => {
      const title = root.querySelector(".solutions-stage-title");
      const heading = root.querySelector(".solutions-heading");
      const list = root.querySelector(".solutions-card-list");
      const items = gsap.utils.toArray<HTMLElement>(".solution-card", root);
      const media = gsap.matchMedia();
      media.add("(min-width: 1024px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=3000",
            scrub: 1,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true
          }
        });

        timeline
          .set(title, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" })
          .set(heading, { autoAlpha: 0, yPercent: -50, y: 0, scale: 0.95, filter: "blur(10px)" })
          .set(list, { autoAlpha: 0 })
          .set(items, { xPercent: -50, yPercent: -50, x: 64, y: 24, scale: 0.94, autoAlpha: 0, filter: "blur(10px)" })
          .to(title, {
            autoAlpha: 0,
            y: "-8vh",
            scale: 0.92,
            filter: "blur(10px)",
            duration: 0.75,
            ease: "power2.inOut"
          })
          .to(heading, {
            autoAlpha: 1,
            yPercent: -50,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out"
          }, 0.62)
          .to(heading, {
            yPercent: -50,
            y: "-4vh",
            scale: 0.92,
            duration: 0.55,
            ease: "power2.inOut"
          }, 1.38)
          .to(heading, {
            autoAlpha: 0,
            yPercent: -50,
            y: "-8vh",
            scale: 0.88,
            filter: "blur(12px)",
            duration: 0.62,
            ease: "power2.inOut"
          }, 1.62)
          .to(list, { autoAlpha: 1, duration: 0.28 }, 1.82);

        items.forEach((card, index) => {
          const at = 1.9 + index * 0.72;
          if (index > 0) {
            timeline.to(items[index - 1], { x: -340, y: 0, scale: 0.8, autoAlpha: 0.28, filter: "blur(7px)", zIndex: index }, at);
          }
          timeline.to(card, { x: 0, y: 0, scale: 1, autoAlpha: 1, filter: "blur(0px)", zIndex: index + 3, duration: 0.58, ease: "power3.out" }, at);
        });
      });

      media.add("(max-width: 1023px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: `+=${items.length * 720 + 1500}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true
          }
        });

        timeline
          .set(title, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" })
          .set(heading, { autoAlpha: 0, y: 34, scale: 0.94, filter: "blur(10px)" })
          .set(list, { autoAlpha: 0 })
          .set(items, { xPercent: -50, yPercent: -50, x: 22, y: 24, scale: 0.94, autoAlpha: 0, filter: "blur(10px)" })
          .to(title, {
            autoAlpha: 0,
            y: "-7vh",
            scale: 0.92,
            filter: "blur(10px)",
            duration: 0.72,
            ease: "power2.inOut"
          })
          .to(heading, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.76,
            ease: "power3.out"
          }, 0.62)
          .to(heading, {
            autoAlpha: 0,
            y: "-6vh",
            scale: 0.9,
            filter: "blur(10px)",
            duration: 0.62,
            ease: "power2.inOut"
          }, 1.36)
          .to(list, { autoAlpha: 1, duration: 0.18 }, 1.74);

        items.forEach((card, index) => {
          const at = 1.84 + index * 0.76;
          if (index > 0) {
            timeline.to(items[index - 1], { x: -42, y: -16, scale: 0.82, autoAlpha: 0.28, filter: "blur(7px)", zIndex: index }, at);
          }
          timeline.to(card, { x: 0, y: 0, scale: 1, autoAlpha: 1, filter: "blur(0px)", zIndex: index + 3, duration: 0.54, ease: "power3.out" }, at);
        });
      });

      return () => {
        media.revert();
      };
    }, root);

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, []);

  return (
    <section ref={ref} className="solutions-section">
      <div className="container-wide solutions-layout">
        <h2 className="solutions-stage-title" aria-label="OUR SOLUTIONS">
          <span>OUR</span>
          <strong>SOLUTIONS</strong>
        </h2>

        <div className="solutions-heading">
          <h3 className="solutions-title" aria-label="모든 이슈에 같은 대응은 통하지 않습니다">
            <span className="solutions-copy-desktop">모든 이슈에 같은<br />대응은 통하지 않습니다</span>
            <span className="solutions-copy-mobile">모든 이슈에<br />같은 대응은<br />통하지 않습니다</span>
          </h3>
        </div>

        <div className="solutions-card-list">
          {solutions.map((solution) => (
            <article key={solution.title} className="solution-card">
              <div className="solution-card-topline">
                <span className="solution-top-label">COADS / SOLUTION</span>
              </div>
              <div className="solution-copy">
                <p className="solution-label">{solution.label}</p>
                <h3>{solution.title}</h3>
                <div className="solution-copy-footer">
                  <p>{solution.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
