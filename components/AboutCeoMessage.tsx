"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AboutCeoMessage() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".ceo-message-reveal", section);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(items, { autoAlpha: 1, clearProps: "transform,opacity,visibility" });
        return;
      }

      gsap.set(items, { autoAlpha: 0, y: 42, willChange: "transform, opacity" });
      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none reverse"
        }
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-ceo-message" aria-labelledby="ceo-message-title">
      <div className="about-ceo-layout">
        <div className="about-ceo-display ceo-message-reveal" aria-hidden="true">
          <p>02 / CEO MESSAGE</p>
          <span>RISK</span>
          <span>RESPONSE</span>
          <strong>STARTS HERE.</strong>
          <small>COADS / ONLINE REPUTATION INTELLIGENCE</small>
        </div>

        <div className="about-ceo-image ceo-message-reveal">
          <Image src="/contact/risk-analyst-illustration.png" alt="디지털 리스크 분석 장면" fill sizes="(max-width: 900px) 100vw, 30vw" priority />
          <span>COADS / RISK RESPONSE</span>
        </div>

        <div className="about-ceo-copy ceo-message-reveal">
          <h2 id="ceo-message-title">사후 대응이 아닌<br /><strong>평판관리 전문 솔루션</strong></h2>
          <div className="about-ceo-rule" aria-hidden="true" />
          <p>
            온라인에서 발생하는 위기는 한순간에 커지지 않습니다. 작은 언급과 반복되는 반응 속에 이미 다음 위험의 징후가 담겨 있습니다.
          </p>
          <p>
            COADS는 사실과 맥락을 분명히 읽고, 필요한 대응의 우선순위를 설계합니다. 문제가 커진 뒤의 수습이 아니라 신뢰를 지킬 수 있는 더 이른 판단을 만듭니다.
          </p>
          <p>
            개인과 브랜드가 다시 자신의 이름으로 나아갈 수 있도록, 흔들린 평판의 흐름을 책임 있게 다루겠습니다.
          </p>
          <p className="about-ceo-signature">COADS 대표 양승학</p>
        </div>
      </div>
    </section>
  );
}
