"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AboutVision() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const title = section.querySelector<HTMLElement>(".about-vision-title");
      const copy = section.querySelector<HTMLElement>(".about-vision-copy");
      const intro = section.querySelector<HTMLElement>(".about-vision-intro");
      const surface = section.querySelector<HTMLElement>(".about-vision-intro-surface");
      const night = section.querySelector<HTMLElement>(".about-vision-night");
      const nightTitle = section.querySelector<HTMLElement>(".about-vision-night-title");
      const nightAccent = section.querySelector<HTMLElement>(".about-vision-night-title strong");
      if (!title || !copy || !intro || !surface || !night || !nightTitle || !nightAccent) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([title, copy, nightTitle], { autoAlpha: 1, clearProps: "transform,opacity,visibility,clipPath" });
        return;
      }

      gsap.set(title, { autoAlpha: 0, y: 56, scale: 0.96, willChange: "transform, opacity" });
      gsap.set(copy, { autoAlpha: 0, y: 32, willChange: "transform, opacity" });
      gsap.set(nightTitle, { autoAlpha: 0, y: 44, scale: 0.94, filter: "blur(10px)", willChange: "transform, opacity, filter" });

      gsap.timeline({
        scrollTrigger: {
          trigger: intro,
          start: "top top",
          end: "+=2400",
          pin: true,
          pinSpacing: true,
          scrub: 0.75,
          invalidateOnRefresh: true
        }
      })
        .to(title, { autoAlpha: 1, y: 0, scale: 1, duration: 0.82, ease: "power4.out" })
        .to({}, { duration: 0.26 })
        .to(title, { scale: 5.8, autoAlpha: 0, duration: 0.82, ease: "power4.in", transformOrigin: "50% 50%" })
        .to(surface, { autoAlpha: 0, duration: 0.08, ease: "none" }, ">-0.08")
        .to(nightTitle, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.82, ease: "power4.out" }, ">-0.02")
        .fromTo(nightAccent, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.38, ease: "power3.out" }, "<+0.24")
        .to({}, { duration: 0.56 });

      gsap.to(copy, {
        autoAlpha: 1,
        y: 0,
        duration: 0.72,
        ease: "power3.out",
        scrollTrigger: {
          trigger: copy,
          start: "top 78%",
          toggleActions: "play none none reverse"
        }
      });

    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-vision" aria-labelledby="vision-title">
      <div className="about-vision-intro">
        <div className="about-vision-intro-surface">
          <h2 id="vision-title" className="about-vision-title" aria-label="COADS VISION">
            <span>COADS</span>
            <strong>VISION</strong>
          </h2>
        </div>
        <section className="about-vision-night" aria-labelledby="night-vision-title">
        <h2 id="night-vision-title" className="about-vision-night-title">
          <span>어두운 밤을</span><br />
          <strong>밝혀드리겠습니다</strong>
        </h2>
        </section>
      </div>
      <div className="container-wide about-vision-copy">
        <p>COADS는 온라인에서 발생하는 이슈와 여론의 변화를 빠르게 읽고, 브랜드와 개인이 신뢰를 지킬 수 있는 판단의 기준을 설계합니다.</p>
        <p>문제가 커진 뒤의 대응을 넘어, 더 이른 신호를 발견하고 실행 가능한 다음 선택을 만드는 것이 우리의 비전입니다.</p>
      </div>
    </section>
  );
}
