"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const coreServices = [
  {
    number: "01",
    keyword: "MONITORING",
    title: "상시 모니터링",
    summary: "온라인 채널의 언급 흐름과 이상 신호를 지속적으로 감지합니다.",
    image: "/core-services/monitoring.png"
  },
  {
    number: "02",
    keyword: "ANALYSIS",
    title: "리스크 분석",
    summary: "출처, 확산 맥락, 감정 반응을 분리해 실제 위험도를 판단합니다.",
    image: "/core-services/risk-anlysis.png"
  },
  {
    number: "03",
    keyword: "EVIDENCE",
    title: "증거 아카이빙",
    summary: "게시물, 댓글, 검색 노출, 캡처 자료를 대응 가능한 근거로 정리합니다.",
    image: "/core-services/evidence-archive.png"
  },
  {
    number: "04",
    keyword: "RESPONSE",
    title: "대응 전략 설계",
    summary: "사건의 성격과 확산 단계에 맞춰 실행 가능한 대응 구조를 설계합니다.",
    image: "/core-services/response-strategy.png"
  }
];

export function CoreServices() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = ref.current;
    if (!root) return;

    const context = gsap.context(() => {
      const title = root.querySelector(".core-services-title");
      const list = root.querySelector(".core-services-list");
      const items = gsap.utils.toArray<HTMLElement>(".service-item", root);
      const media = gsap.matchMedia();
      const getDeckState = (cardIndex: number, activeIndex: number) => {
        const offset = cardIndex - activeIndex;
        const side = offset < 0 ? -1 : 1;

        if (offset === 0) {
          return {
            autoAlpha: 1,
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            zIndex: 20,
            backgroundColor: "#185adb",
            filter: "brightness(1)"
          };
        }

        if (Math.abs(offset) === 1) {
          return {
            autoAlpha: 0.58,
            xPercent: -50,
            yPercent: -50,
            x: `${offset * 58}vw`,
            y: offset > 0 ? "3vh" : "-3vh",
            rotate: offset * 10,
            scale: 0.86,
            zIndex: 10 - Math.abs(offset),
            backgroundColor: "#050505",
            filter: "brightness(.55)"
          };
        }

        return {
          autoAlpha: 0.22,
          xPercent: -50,
          yPercent: -50,
          x: `${side * 86}vw`,
          y: side > 0 ? "8vh" : "-8vh",
          rotate: side * 16,
          scale: 0.76,
          zIndex: 1,
          backgroundColor: "#050505",
          filter: "brightness(.35)"
        };
      };

      media.add("(min-width: 1024px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=3600",
            scrub: 1,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true
          }
        });

        timeline
          .set(title, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" })
          .set(list, { autoAlpha: 0 })
          .set(items, (index: number) => getDeckState(index, 0))
          .set(items, { autoAlpha: 0 })
          .to(title, {
            autoAlpha: 0,
            y: "-8vh",
            scale: 0.92,
            filter: "blur(10px)",
            duration: 0.75,
            ease: "power2.inOut"
          })
          .to(list, { autoAlpha: 1, duration: 0.2 }, 0.7)
          .to(items, {
            autoAlpha: (index: number) => Number(getDeckState(index, 0).autoAlpha),
            duration: 0.55,
            ease: "power3.out"
          }, 0.78);

        coreServices.forEach((_, activeIndex) => {
          const position = 1.18 + activeIndex * 0.9;

          items.forEach((item, cardIndex) => {
            timeline.to(item, {
              ...getDeckState(cardIndex, activeIndex),
              duration: 0.72,
              ease: "power2.inOut"
            }, position);
          });

          timeline.to({}, { duration: 0.18 }, position + 0.72);
        });
      });

      media.add("(max-width: 1023px)", () => {
        const mobileDeckState = (cardIndex: number, activeIndex: number) => {
          const offset = cardIndex - activeIndex;

          if (offset === 0) {
            return {
              autoAlpha: 1,
              xPercent: -50,
              yPercent: -50,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              zIndex: 20,
              backgroundColor: "#185adb",
              filter: "brightness(1)"
            };
          }

          return {
            autoAlpha: 0,
            xPercent: -50,
            yPercent: -50,
            x: `${offset > 0 ? 74 : -74}vw`,
            y: offset > 0 ? "4vh" : "-4vh",
            rotate: offset > 0 ? 7 : -7,
            scale: 0.92,
            zIndex: 1,
            backgroundColor: "#050505",
            filter: "brightness(.45)"
          };
        };

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: `+=${items.length * 760 + 1100}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true
          }
        });

        timeline
          .set(title, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" })
          .set(list, { autoAlpha: 0 })
          .set(items, (index: number) => mobileDeckState(index, 0))
          .set(items, { autoAlpha: 0 })
          .to(title, {
            autoAlpha: 0,
            y: "-7vh",
            scale: 0.92,
            filter: "blur(10px)",
            duration: 0.72,
            ease: "power2.inOut"
          })
          .to(list, { autoAlpha: 1, duration: 0.18 }, 0.66)
          .to(items, {
            autoAlpha: (index: number) => Number(mobileDeckState(index, 0).autoAlpha),
            duration: 0.5,
            ease: "power3.out"
          }, 0.76);

        coreServices.forEach((_, activeIndex) => {
          const position = 1.15 + activeIndex * 0.82;

          items.forEach((item, cardIndex) => {
            timeline.to(item, {
              ...mobileDeckState(cardIndex, activeIndex),
              duration: 0.68,
              ease: "power2.inOut"
            }, position);
          });

          timeline.to({}, { duration: 0.2 }, position + 0.68);
        });
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
    <section ref={ref} className="section core-services-section">
      <div className="container-wide core-services-layout">
        <h2 className="core-services-title" aria-label="CORE SERVICE">
          <span className="core-title-core">CORE</span>
          <strong className="core-title-services">SERVICE</strong>
        </h2>

        <div className="core-services-list">
          {coreServices.map((service) => (
            <article key={service.number} className="service-item">
              <div className="service-card-header">
                <span>COADS / CORE SERVICE</span>
                <span>{service.number} / 04</span>
              </div>
              <div className="service-visual" aria-hidden>
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100vw, 34vw"
                  className="service-image"
                />
              </div>
              <div className="service-copy">
                <p className="service-keyword">{service.keyword}</p>
                <h3>{service.title}</h3>
                <div className="service-description">
                  <p>{service.summary}</p>
                  <span className="service-index">{service.number}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
