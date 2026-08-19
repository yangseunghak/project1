"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AboutHeroScroll() {
  const heroRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const weSee = hero.querySelector<HTMLElement>(".about-hero-we");
      const whatOthers = hero.querySelector<HTMLElement>(".about-hero-what");
      const miss = hero.querySelector<HTMLElement>(".about-hero-miss");
      const title = hero.querySelector<HTMLElement>(".about-hero-message");
      const nightStage = hero.querySelector<HTMLElement>(".about-night-stage");
      const sceneWipe = hero.querySelector<HTMLElement>(".about-scene-wipe");
      const dayWipe = hero.querySelector<HTMLElement>(".about-day-wipe");
      const dayMessage = hero.querySelector<HTMLElement>(".about-day-message");
      const dayMessageTitle = dayMessage?.querySelector<HTMLElement>("h2");
      const dayMessageLines = dayMessage ? gsap.utils.toArray<HTMLElement>("h2 > span, h2 > strong", dayMessage) : [];
      const ceoStage = hero.querySelector<HTMLElement>(".about-ceo-inline");
      const ceoImage = hero.querySelector<HTMLElement>(".about-ceo-inline-image");
      const ceoCopy = hero.querySelector<HTMLElement>(".about-ceo-inline-copy");
      const finalCopy = hero.querySelector<HTMLElement>(".about-final-copy");
      const finalTrust = hero.querySelector<HTMLElement>(".about-final-trust");
      const finalStatement = hero.querySelector<HTMLElement>(".about-final-statement");
      const finalProtection = hero.querySelector<HTMLElement>(".about-final-protection");
      if (!weSee || !whatOthers || !miss || !title || !nightStage || !sceneWipe || !dayWipe || !dayMessage || !dayMessageTitle || !ceoStage || !ceoImage || !ceoCopy || !finalCopy || !finalTrust || !finalStatement || !finalProtection || dayMessageLines.length !== 3) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const compactViewport = window.matchMedia("(max-width: 900px)").matches;
      const lines = [weSee, whatOthers, miss];
      dayMessage.classList.remove("is-ceo-layout");

      const applyCeoTitleLayout = () => {
        if (compactViewport) return;

        const currentPositions = dayMessageLines.map((line) => line.getBoundingClientRect().left);
        dayMessage.classList.add("is-ceo-layout");
        const finalPositions = dayMessageLines.map((line) => line.getBoundingClientRect().left);

        gsap.set(dayMessageLines, {
          x: (index) => currentPositions[index] - finalPositions[index]
        });
      };

      const resetCeoTitleLayout = () => {
        if (compactViewport) return;

        dayMessage.classList.remove("is-ceo-layout");
        gsap.set(dayMessageLines, { clearProps: "transform" });
      };

      if (reduceMotion) {
        gsap.set(lines, { autoAlpha: 1, clearProps: "transform,opacity,visibility,filter,willChange" });
        gsap.set(nightStage, { autoAlpha: 1 });
        gsap.set(sceneWipe, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", backgroundColor: "#030303" });
        gsap.set(dayWipe, { autoAlpha: 1, yPercent: 0 });
        gsap.set(dayMessage, { autoAlpha: 1 });
        gsap.set(ceoStage, { autoAlpha: 1 });
        gsap.set([ceoImage, ceoCopy], { autoAlpha: 1 });
        gsap.set(finalCopy, { autoAlpha: 0 });
        gsap.set(finalTrust, { autoAlpha: 0 });
        gsap.set(finalStatement, { autoAlpha: 0 });
        gsap.set(finalProtection, { autoAlpha: 0 });
        return;
      }

      gsap.set([weSee, whatOthers, miss], {
        autoAlpha: 1,
        clearProps: "transform,opacity,visibility,filter,willChange"
      });
      gsap.set(nightStage, { autoAlpha: 0, scale: 1.04, willChange: "transform, opacity" });
      gsap.set(sceneWipe, { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)", willChange: "clip-path" });
      gsap.set(dayWipe, { autoAlpha: 1, yPercent: 100, willChange: "transform" });
      gsap.set(dayMessage, { autoAlpha: 0, y: 54, width: "100vw", right: "auto", filter: "blur(10px)", willChange: "transform, opacity, width" });
      gsap.set(ceoStage, { autoAlpha: 0, willChange: "opacity" });
      gsap.set([ceoImage, ceoCopy], { autoAlpha: 0, y: 42, willChange: "transform, opacity" });
      gsap.set(finalCopy, { autoAlpha: 0, y: 36, willChange: "transform, opacity" });
      gsap.set(finalTrust, { autoAlpha: 0, y: 36, willChange: "transform, opacity" });
      gsap.set(finalStatement, { autoAlpha: 0, y: 30, willChange: "transform, opacity" });
      gsap.set(finalProtection, { autoAlpha: 0, y: 36, willChange: "transform, opacity" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: compactViewport ? "+=4800" : "+=7200",
          pin: true,
          pinType: "fixed",
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.9,
          invalidateOnRefresh: true
        }
      })
        .to(nightStage, { autoAlpha: 1, scale: 1, duration: 1.35, ease: "power2.out" }, "+=0.58")
        .to({}, { duration: 1.25 })
        .to(title, { autoAlpha: 0, y: -36, duration: 0.65, ease: "power2.inOut" })
        .to(sceneWipe, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.58, ease: "power4.inOut" })
        .to(nightStage, { autoAlpha: 0, duration: 0.28, ease: "power2.out" }, "<")
        .to(finalCopy, { autoAlpha: 1, y: 0, duration: 0.82, ease: "power3.out" }, "<+0.16")
        .to(finalCopy, { autoAlpha: 0, y: -24, duration: 0.56, ease: "power2.inOut" }, "+=1.25")
        .to(finalTrust, { autoAlpha: 1, y: 0, duration: 0.88, ease: "power3.out" }, "<+0.12")
        .to(finalTrust, { autoAlpha: 0, y: -24, duration: 0.56, ease: "power2.inOut" }, "+=1.2")
        .to(finalStatement, { autoAlpha: 1, y: 0, duration: 0.82, ease: "power3.out" }, "<+0.12")
        .to(finalStatement, { autoAlpha: 0, x: -140, duration: 0.72, ease: "power3.inOut" }, "+=1.4")
        .to(finalProtection, { autoAlpha: 1, y: 0, duration: 0.82, ease: "power3.out" }, "<+0.12")
        .to(finalProtection, { autoAlpha: 0, y: -20, duration: 0.72, ease: "power2.inOut" }, "+=1.5")
        .to(dayWipe, {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.inOut",
          onStart: () => document.body.classList.add("about-day-header"),
          onReverseComplete: () => document.body.classList.remove("about-day-header")
        }, "+=0.12")
        .to(dayMessage, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power4.out" }, ">+0.1")
        .to({}, { duration: 0.9 })
        .to(dayMessage, {
          width: compactViewport ? "100vw" : "34.5vw",
          autoAlpha: compactViewport ? 0 : 1,
          y: compactViewport ? -28 : 0,
          duration: 1.12,
          ease: "power3.inOut"
        })
        .to(dayMessageTitle, { fontSize: compactViewport ? "10vw" : "6.15vw", duration: 1.12, ease: "power3.inOut" }, "<")
        .to(dayMessage, {
          duration: 0.001,
          onComplete: applyCeoTitleLayout,
          onReverseComplete: resetCeoTitleLayout
        }, ">-0.36")
        .to(dayMessageLines, {
          x: 0,
          duration: 0.42,
          ease: "power2.out"
        }, "<")
        .to(ceoStage, { autoAlpha: 1, duration: 0.02 }, "<")
        .to(ceoImage, { autoAlpha: 1, y: 0, duration: 0.92, ease: "power4.out" }, "<+0.16")
        .to(ceoCopy, { autoAlpha: 1, y: 0, duration: 0.92, ease: "power4.out" }, "<+0.18")
        .to({}, { duration: 1.05 });

    }, hero);

    return () => {
      heroRef.current?.querySelector(".about-day-message")?.classList.remove("is-ceo-layout");
      document.body.classList.remove("about-day-header");
      context.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="about-hero" aria-labelledby="about-title">
      <div className="about-night-stage" aria-hidden="true">
        <img className="about-night-city" src="/about/night-city.png" alt="" />
      </div>
      <div className="about-scene-wipe" aria-hidden="true" />
      <div className="about-day-wipe" aria-hidden="true" />
      <section className="about-day-message" aria-label="Risk response starts here">
        <h2>
          <span>RISK</span>
          <span>RESPONSE</span>
          <strong>STARTS HERE</strong>
        </h2>
      </section>
      <section className="about-ceo-inline" aria-label="CEO message">
        <div className="about-ceo-inline-spacer" aria-hidden="true" />
        <div className="about-ceo-inline-image">
          <img src="/ceo.png" alt="COADS 대표 양승학" />
        </div>
        <div className="about-ceo-inline-copy">
          <h2>바이럴 마케팅이 아닌<br /><strong>평판관리 전문 솔루션</strong></h2>
          <div className="about-ceo-rule" aria-hidden="true" />
          <p>바이럴 마케팅 시장은 이미 포화 상태에 접어들었습니다.</p>
          <p>페이스북에서 인스타그램, 그리고 스레드로 플랫폼이 변화하는 동안 수많은 기업이 브랜드를 알리고 성장시키는 데 집중해 왔습니다.</p>
          <p>그러나 브랜드의 영향력이 커질수록 그에 따른 위험도 함께 커집니다. 사실과 다른 정보, 맥락이 왜곡된 콘텐츠, 악의적인 반응은 오랜 시간 쌓아 온 브랜드의 신뢰를 흔들고, 결국 매출과 기업 가치에도 영향을 미칠 수 있습니다.</p>
          <p>저는 브랜드를 알리는 것만큼 이미 쌓아 올린 신뢰를 지키는 일도 중요하다고 생각했습니다. 고객이 만들어 온 가치가 한순간의 오해와 왜곡으로 훼손되지 않도록 위험 신호를 먼저 발견하고, 상황에 맞는 대응 방향을 제시하는 회사. 그것이 COADS를 시작한 이유입니다.</p>
          <p>COADS는 고객의 평판과 가치를 지키는 든든한 파트너로서, 더욱 정확하고 실질적인 평판 리스크 대응 솔루션을 제공하겠습니다.</p>
          <p>감사합니다.</p>
          <p className="about-ceo-signature">COADS 대표 양승학</p>
        </div>
      </section>
      <div className="container-wide about-hero-content">
        <h1 id="about-title" className="about-hero-message">
          <span className="about-hero-line about-hero-we">WE SEE</span>
          <span className="about-hero-line about-hero-what">WHAT <i>OTHERS</i></span>
          <strong className="about-hero-line about-hero-miss">MISS</strong>
        </h1>
      </div>
      <div className="about-final-message about-final-copy" aria-live="polite">
        <div className="about-final-message-inner">
          <h2>디지털 평판의 기준을 새롭게 세우다</h2>
          <p>COADS는 온라인에 흩어진 이슈와 여론의 흐름을 정밀하게 읽습니다.</p>
          <p>상시 모니터링과 전략적 대응으로 개인과 브랜드의 위험을 빠르게 낮추고,</p>
          <p>흔들리지 않는 신뢰를 설계하는 것, 그것이 COADS가 존재하는 이유입니다.</p>
        </div>
      </div>
      <div className="about-final-message about-final-trust" aria-label="Reputation built on trust">
        <div className="about-final-message-inner">
          <h2>
            <span>REPUTATION</span>
            <span>BUILT ON</span>
            <strong>TRUST</strong>
          </h2>
        </div>
      </div>
      <div className="about-final-message about-final-statement" aria-live="polite">
        <div className="about-final-message-inner">
          <h2>평판 문제, 더 빠르고 정확하게</h2>
          <p>
            온라인에서 발생한 이슈는 대응 시점에 따라 결과가 달라집니다.<br />
            COADS는 온라인 여론을 상시 모니터링하고 상황에 맞는 대응 방안을 마련해<br />
            개인과 기업의 평판 피해를 줄입니다.
          </p>
        </div>
      </div>
      <div className="about-final-message about-final-protection" aria-live="polite">
        <div className="about-final-message-inner">
          <h2>이름과 브랜드를 안심하고 지킬 수 있도록</h2>
          <p>
            기업에는 브랜드 이미지가, 개인에게는 이름과 신뢰가 중요한 자산입니다.<br />
            COADS는 문제가 생긴 뒤에만 대응하지 않고 평소에도 평판을<br />
            점검하고 관리할 수 있는 전문 서비스를 만들어갑니다.
          </p>
        </div>
      </div>
    </section>
  );
}
