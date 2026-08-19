"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MetricCards() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = ref.current;
    const section = root?.closest<HTMLElement>(".metric-section");
    if (!root || !section) return;

    const context = gsap.context(() => {
      const intro = root.querySelector(".metric-about-intro");
      const copy = root.querySelector(".metric-about-copy");
      const stats = root.querySelector(".metric-about-stats");
      const counters = gsap.utils.toArray<HTMLElement>(".metric-stat-value", root);
      const media = gsap.matchMedia();
      const resetCounters = () => {
        counters.forEach((counter) => {
          counter.textContent = counter.dataset.suffix ? "0+" : "0";
        });
      };
      const countCounters = () => {
        counters.forEach((counter) => {
          const target = Number(counter.dataset.count ?? 0);
          const suffix = counter.dataset.suffix ?? "";

          gsap.fromTo(counter, {
            textContent: 0
          }, {
            textContent: target,
            duration: 1.45,
            ease: "power3.out",
            snap: { textContent: 1 },
            onUpdate: () => {
              counter.textContent = `${Math.round(Number(counter.textContent))}${suffix}`;
            },
            onComplete: () => {
              counter.textContent = `${target}${suffix}`;
            }
          });
        });
      };

      media.add("(min-width: 1024px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=3400",
            scrub: 1.4,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true
          }
        });

        timeline
          .set(intro, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" })
          .set([copy, stats], { autoAlpha: 0, y: 46 })
          .call(resetCounters)
          .to(intro, {
            autoAlpha: 0,
            y: -44,
            scale: 0.92,
            filter: "blur(10px)",
            duration: 0.75,
            ease: "power2.inOut"
          })
          .to(copy, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
          }, 0.68)
          .to(stats, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
          }, 0.86)
          .call(countCounters, undefined, 1.02)
          .to([copy, stats], { duration: 0.55 });
      });

      media.add("(max-width: 1023px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=2700",
            scrub: 1.35,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true
          }
        });

        timeline
          .set(intro, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" })
          .set([copy, stats], { autoAlpha: 0, y: 34 })
          .call(resetCounters)
          .to(intro, {
            autoAlpha: 0,
            y: -32,
            scale: 0.92,
            filter: "blur(10px)",
            duration: 0.72,
            ease: "power2.inOut"
          })
          .to(copy, {
            autoAlpha: 1,
            y: 0,
            duration: 0.78,
            ease: "power3.out"
          }, 0.58)
          .to(stats, {
            autoAlpha: 1,
            y: 0,
            duration: 0.78,
            ease: "power3.out"
          }, 0.76)
          .call(countCounters, undefined, 0.92)
          .to([copy, stats], { duration: 0.5 });
      });

      return () => media.revert();
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
    <div ref={ref} className="metric-panel container-wide">
      <div className="metric-about-intro" aria-label="WHY COADS">
        <span>WHY?</span>
        <strong>&nbsp;COADS</strong>
      </div>

      <div className="metric-about">
        <p className="metric-about-copy">
          <span>COADS는 디지털 환경에서 발생하는 </span><strong>평판 리스크</strong><span>를 분석하는 전문 기업으로</span>
          <br />
          <span>온라인 이슈의 </span><strong>출처와 확산 맥락</strong><span>을 추적하고, </span><strong>위험도</strong><span>를 판단하여</span>
          <br />
          <span>고객사가 </span><strong>신뢰를 잃지 않도록</strong><span> 근거 기반의 대응 구조를 설계합니다</span>
        </p>

        <div className="metric-about-stats" aria-label="회사 주요 지표">
          <div className="metric-about-stat">
            <span className="metric-stat-label">SINCE</span>
            <strong className="metric-stat-value" data-count="2019">2019</strong>
          </div>
          <div className="metric-stat-divider" aria-hidden />
          <div className="metric-about-stat">
            <span className="metric-stat-label">PROJECT</span>
            <strong className="metric-stat-value" data-count="800" data-suffix="+">800+</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
