"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const labPages = [
  {
    code: "01 / 04",
    title: "DETECT",
    src: "/labs01.png",
    alt: "COADS LAB DETECT 화면. 온라인 게시물의 초기 위험 신호를 감지하는 모니터링 화면",
  },
  {
    code: "02 / 04",
    title: "VERIFY",
    src: "/labs02.png",
    alt: "COADS LAB VERIFY 화면. 원문과 확산 문구를 대조해 사실과 변형을 검증하는 화면",
  },
  {
    code: "03 / 04",
    title: "ARCHIVE",
    src: "/labs03.png",
    alt: "COADS LAB ARCHIVE 화면. 게시물 캡처와 메타데이터, 변경 이력을 보존하는 화면",
  },
  {
    code: "04 / 04",
    title: "RESPOND",
    src: "/labs04.png",
    alt: "COADS LAB RESPOND 화면. 사안별 대응 방안과 실행 타임라인을 정리하는 화면",
  },
];

export function CoadsLabSequence() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      if (window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)").matches) return;

      const pages = gsap.utils.toArray<HTMLElement>(".coads-lab-sequence-page", root);
      const stageCode = root.querySelector<HTMLElement>(".coads-lab-sequence-code");
      const stageTitle = root.querySelector<HTMLElement>(".coads-lab-sequence-current");
      const intro = root.querySelector<HTMLElement>(".coads-lab-sequence-intro");

      if (pages.length !== labPages.length) return;

      const updateStage = (index: number) => {
        const page = labPages[index];
        if (stageCode) stageCode.textContent = page.code;
        if (stageTitle) stageTitle.textContent = page.title;
      };

      gsap.set(intro, { autoAlpha: 0, x: -18 });
      gsap.set(pages, {
        autoAlpha: 0,
        xPercent: 7,
        yPercent: 5,
        scale: 0.975,
        transformOrigin: "50% 50%",
      });
      gsap.set(pages[0], { autoAlpha: 1, xPercent: 0, yPercent: 0, scale: 1 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=440%",
          scrub: 1.15,
          pin: ".coads-lab-sequence-stage",
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(intro, { autoAlpha: 1, x: 0, duration: 0.7, ease: "power2.out" }, 0)
        .to({}, { duration: 1.4 });

      labPages.slice(1).forEach((_, index) => {
        const nextIndex = index + 1;
        const previousPage = pages[nextIndex - 1];
        const nextPage = pages[nextIndex];

        timeline
          .addLabel(`stage-${nextIndex}`)
          .to(previousPage, {
            autoAlpha: 0.18,
            xPercent: -3,
            yPercent: -2,
            scale: 0.955,
            duration: 1.1,
            ease: "power2.inOut",
          })
          .to(nextPage, {
            autoAlpha: 1,
            xPercent: 0,
            yPercent: 0,
            scale: 1,
            duration: 1.25,
            ease: "power3.out",
          }, "<+0.1")
          .to({}, { duration: 1.55 });
      });

      timeline.eventCallback("onUpdate", () => {
        const time = timeline.time();
        if (time >= timeline.labels["stage-3"]) updateStage(3);
        else if (time >= timeline.labels["stage-2"]) updateStage(2);
        else if (time >= timeline.labels["stage-1"]) updateStage(1);
        else updateStage(0);
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={ref} className="coads-lab-sequence" aria-labelledby="coads-lab-sequence-title">
      <div className="coads-lab-sequence-stage">
        <div className="coads-lab-sequence-intro">
          <p>COADS</p>
          <h2 id="coads-lab-sequence-title">LAB</h2>
          <span />
        </div>

        <div className="coads-lab-sequence-deck">
          {labPages.map((page) => (
            <figure className="coads-lab-sequence-page" key={page.src}>
              <img src={page.src} alt={page.alt} />
            </figure>
          ))}
        </div>

        <div className="coads-lab-sequence-status" aria-live="polite">
          <span className="coads-lab-sequence-code">01 / 04</span>
          <span className="coads-lab-sequence-current">DETECT</span>
        </div>
        <p className="coads-lab-sequence-scroll">SCROLL TO EXPLORE</p>
      </div>
    </section>
  );
}
