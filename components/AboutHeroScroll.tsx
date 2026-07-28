"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { decompressFrames, parseGIF, type GifFrame } from "gifuct-js";

export function AboutHeroScroll() {
  const heroRef = useRef<HTMLElement>(null);
  const mascotCanvasRef = useRef<HTMLCanvasElement>(null);
  const mascotProgressRef = useRef(0);
  const renderMascotFrameRef = useRef<(progress: number) => void>(() => undefined);

  useEffect(() => {
    const canvas = mascotCanvasRef.current;
    if (!canvas) return;

    let cancelled = false;

    const loadFrames = async () => {
      const response = await fetch("/coads-mascot-fly-in.gif");
      const source = await response.arrayBuffer();
      const frames = decompressFrames(parseGIF(source), true) as GifFrame[];
      if (cancelled || frames.length === 0) return;

      const width = Math.max(...frames.map((frame) => frame.dims.left + frame.dims.width));
      const height = Math.max(...frames.map((frame) => frame.dims.top + frame.dims.height));
      const composite = document.createElement("canvas");
      composite.width = width;
      composite.height = height;
      const compositeContext = composite.getContext("2d");
      const displayContext = canvas.getContext("2d");
      if (!compositeContext || !displayContext) return;

      const renderedFrames: ImageData[] = [];
      for (const frame of frames) {
        const previous = compositeContext.getImageData(0, 0, width, height);
        const patch = document.createElement("canvas");
        patch.width = frame.dims.width;
        patch.height = frame.dims.height;
        const patchContext = patch.getContext("2d");
        if (!patchContext) continue;

        const patchData = new Uint8ClampedArray(frame.patch.length);
        patchData.set(frame.patch);
        patchContext.putImageData(new ImageData(patchData, frame.dims.width, frame.dims.height), 0, 0);
        compositeContext.drawImage(patch, frame.dims.left, frame.dims.top);
        renderedFrames.push(compositeContext.getImageData(0, 0, width, height));

        if (frame.disposalType === 2) {
          compositeContext.clearRect(frame.dims.left, frame.dims.top, frame.dims.width, frame.dims.height);
        } else if (frame.disposalType === 3) {
          compositeContext.putImageData(previous, 0, 0);
        }
      }

      if (cancelled || renderedFrames.length === 0) return;
      canvas.width = width;
      canvas.height = height;

      renderMascotFrameRef.current = (progress) => {
        const index = Math.min(renderedFrames.length - 1, Math.round(progress * (renderedFrames.length - 1)));
        displayContext.putImageData(renderedFrames[index], 0, 0);
      };
      renderMascotFrameRef.current(mascotProgressRef.current);
    };

    void loadFrames();

    return () => { cancelled = true; };
  }, []);

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
      const car = hero.querySelector<HTMLElement>(".about-night-car");
      const sceneWipe = hero.querySelector<HTMLElement>(".about-scene-wipe");
      const finalCopy = hero.querySelector<HTMLElement>(".about-final-copy");
      const finalTrust = hero.querySelector<HTMLElement>(".about-final-trust");
      const finalStatement = hero.querySelector<HTMLElement>(".about-final-statement");
      const finalProtection = hero.querySelector<HTMLElement>(".about-final-protection");
      const mascotStage = hero.querySelector<HTMLElement>(".about-mascot-stage");
      const mascot = hero.querySelector<HTMLElement>(".about-mascot");
      const rope = hero.querySelector<HTMLElement>(".about-rope-drop");
      if (!weSee || !whatOthers || !miss || !title || !nightStage || !car || !sceneWipe || !finalCopy || !finalTrust || !finalStatement || !finalProtection || !mascotStage || !mascot || !rope) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const lines = [weSee, whatOthers, miss];
      const updateMascotFrame = (progress: number) => {
        mascotProgressRef.current = progress;
        renderMascotFrameRef.current(progress);
      };

      if (reduceMotion) {
        gsap.set(lines, { autoAlpha: 1, clearProps: "transform,opacity,visibility,filter,willChange" });
        gsap.set(nightStage, { autoAlpha: 1 });
        gsap.set(car, { autoAlpha: 1, xPercent: 120 });
        gsap.set(sceneWipe, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", backgroundColor: "#030303", mixBlendMode: "normal" });
        gsap.set(finalCopy, { autoAlpha: 0 });
        gsap.set(finalTrust, { autoAlpha: 0 });
        gsap.set(finalStatement, { autoAlpha: 0 });
        gsap.set(finalProtection, { autoAlpha: 0 });
        gsap.set(mascotStage, { autoAlpha: 1 });
        gsap.set(mascot, { autoAlpha: 1, xPercent: 0, yPercent: 12, scale: 1 });
        gsap.set(rope, { autoAlpha: 1, scaleY: 1 });
        return;
      }

      gsap.set([weSee, whatOthers], { x: -72, autoAlpha: 0, willChange: "transform, opacity" });
      gsap.set(miss, { y: 28, autoAlpha: 0, filter: "blur(6px)", willChange: "transform, opacity, filter" });
      gsap.set(nightStage, { autoAlpha: 0, scale: 1.04, willChange: "transform, opacity" });
      gsap.set(car, { autoAlpha: 0, xPercent: -80, willChange: "transform, opacity" });
      gsap.set(sceneWipe, { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)", willChange: "clip-path, background-color" });
      gsap.set(finalCopy, { autoAlpha: 0, y: 36, willChange: "transform, opacity" });
      gsap.set(finalTrust, { autoAlpha: 0, y: 36, willChange: "transform, opacity" });
      gsap.set(finalStatement, { autoAlpha: 0, y: 30, willChange: "transform, opacity" });
      gsap.set(finalProtection, { autoAlpha: 0, y: 36, willChange: "transform, opacity" });
      gsap.set(mascotStage, { autoAlpha: 0 });
      gsap.set(mascot, { autoAlpha: 0, xPercent: 125, yPercent: 12, scale: 1, willChange: "transform, opacity" });
      gsap.set(rope, { autoAlpha: 0, scaleY: 0, transformOrigin: "top center", willChange: "transform, opacity" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=7600",
          pin: true,
          pinSpacing: true,
          scrub: 0.9,
          invalidateOnRefresh: true
        }
      })
        .to(weSee, { x: 0, autoAlpha: 1, duration: 0.78, ease: "power3.out" })
        .to(whatOthers, { x: 0, autoAlpha: 1, duration: 0.78, ease: "power3.out" }, "+=0.16")
        .to(miss, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.9, ease: "power2.out" }, "+=0.12")
        .to(title, { autoAlpha: 0, y: -36, duration: 0.65, ease: "power2.inOut" }, "+=0.4")
        .to(nightStage, { autoAlpha: 1, scale: 1, duration: 0.9, ease: "power2.out" }, "<")
        .to(car, { autoAlpha: 1, xPercent: 260, duration: 2.8, ease: "none" }, "<+0.12")
        .to(sceneWipe, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.58, ease: "power4.inOut" })
        .set(sceneWipe, { backgroundColor: "#030303", mixBlendMode: "normal" })
        .to(nightStage, { autoAlpha: 0, duration: 0.28, ease: "power2.out" }, "<")
        .to(finalCopy, { autoAlpha: 1, y: 0, duration: 0.82, ease: "power3.out" }, "<+0.16")
        .to(finalCopy, { autoAlpha: 0, y: -24, duration: 0.56, ease: "power2.inOut" }, "+=1.25")
        .to(finalTrust, { autoAlpha: 1, y: 0, duration: 0.88, ease: "power3.out" }, "<+0.12")
        .to(finalTrust, { autoAlpha: 0, y: -24, duration: 0.56, ease: "power2.inOut" }, "+=1.2")
        .to(finalStatement, { autoAlpha: 1, y: 0, duration: 0.82, ease: "power3.out" }, "<+0.12")
        .to(finalStatement, { autoAlpha: 0, x: -140, duration: 0.72, ease: "power3.inOut" }, "+=1.4")
        .to(finalProtection, { autoAlpha: 1, y: 0, duration: 0.82, ease: "power3.out" }, "<+0.12")
        .to(finalProtection, { autoAlpha: 0, y: -20, duration: 0.72, ease: "power2.inOut" }, "+=1.5")
        .to(mascotStage, { autoAlpha: 1, duration: 0.2 }, "<")
        .to(mascot, { autoAlpha: 1, xPercent: 0, duration: 1.45, ease: "none", onStart: () => updateMascotFrame(0) }, "<+0.08")
        .to({ progress: 0 }, {
          progress: 1,
          duration: 1.45,
          ease: "none",
          onUpdate() { updateMascotFrame(this.targets()[0].progress); }
        }, "<")
        .to(rope, {
          autoAlpha: 1,
          scaleY: 1,
          duration: 1.12,
          ease: "power2.in"
        })
        .to(mascot, { xPercent: 2, yPercent: 25, rotation: 2, duration: 0.68, ease: "power2.inOut" })
        .to(rope, { scaleY: 1.12, y: 16, duration: 0.68, ease: "power2.inOut" }, "<");

    }, hero);

    return () => context.revert();
  }, []);

  return (
    <section ref={heroRef} className="about-hero" aria-labelledby="about-title">
      <div className="about-night-stage" aria-hidden="true">
        <img className="about-night-city" src="/about/night-city.png" alt="" />
        <img className="about-night-car" src="/about/coads-car.png" alt="" />
      </div>
      <div className="about-scene-wipe" aria-hidden="true" />
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
      <div className="about-mascot-stage" aria-hidden="true">
        <canvas ref={mascotCanvasRef} className="about-mascot" />
        <div className="about-rope-drop" />
      </div>
    </section>
  );
}
