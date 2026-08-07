"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AboutMissionVision() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const title = section.querySelector<HTMLElement>(".about-mission-title");
      const panels = gsap.utils.toArray<HTMLElement>(".about-mission-panel", section);
      if (!title || panels.length !== 2) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([title, ...panels], { autoAlpha: 1, clearProps: "transform,opacity,visibility,filter" });
        return;
      }

      gsap.set(title, { autoAlpha: 1, scale: 1, filter: "blur(0px)", willChange: "transform, opacity, filter" });
      gsap.set(panels, { autoAlpha: 0, y: 46, scale: 0.94, filter: "blur(10px)", willChange: "transform, opacity, filter" });
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: window.matchMedia("(max-width: 760px)").matches ? "+=2600" : "+=3400",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      })
        .to(title, { autoAlpha: 0, scale: 0.9, y: "-7vh", filter: "blur(10px)", duration: 0.72, ease: "power2.inOut" })
        .to(panels[0], { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.88, ease: "power4.out" }, 0.62)
        .to(panels[0], { autoAlpha: 0, y: "-6vh", scale: 0.9, filter: "blur(10px)", duration: 0.68, ease: "power2.inOut" }, "+=1.05")
        .to(panels[1], { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.88, ease: "power4.out" }, ">-0.1")
        .to({}, { duration: 1.1 });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-mission" aria-labelledby="mission-title">
      <div className="about-mission-stage">
        <h2 id="mission-title" className="about-mission-title">
            <span>MISSION</span>
            <span>&amp; <strong>VISION</strong></span>
        </h2>

        <article className="about-mission-panel">
            <h3>당신의 밤에<br /><strong>빛을 켭니다</strong></h3>
            <p>
              COADS는 온라인 위기가 깊은 밤이 되기 전에 작은 위험 신호를 먼저 읽습니다.
              사실과 맥락을 분명히 하고 필요한 대응 방향을 설계해, 흔들린 일상이 다시 빛을 찾도록 돕습니다.
            </p>
        </article>

        <article className="about-mission-panel">
            <h3>누구나 다시<br /><strong>빛날 수 있는 세상</strong></h3>
            <p>
              한순간의 오해와 왜곡된 정보가 개인과 브랜드의 내일을 가리지 않도록.
              누구나 자신의 이름과 가치로 다시 나아갈 수 있는 더 투명하고 건강한 온라인 환경을 만들어갑니다.
            </p>
        </article>
      </div>
    </section>
  );
}
