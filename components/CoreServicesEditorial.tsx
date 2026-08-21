"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  { number: "01", title: "상시 모니터링", description: "온라인 채널의 언급 흐름과 이상 신호를 지속적으로 감지합니다.", image: "/core-services/monitoring.png" },
  { number: "02", title: "데이터 분석", description: "수집한 데이터를 기반으로 이슈의 원인과 확산 흐름을 분석합니다.", image: "/core-services/risk-anlysis.png" },
  { number: "03", title: "리스크 대응", description: "위험의 우선순위를 판단하고 상황에 맞는 대응 전략을 설계합니다.", image: "/core-services/response-strategy.png" },
  { number: "04", title: "평판 관리", description: "장기적인 관점에서 브랜드 신뢰도와 온라인 평판을 관리합니다.", image: "/core-services/evidence-archive.png" }
];

export function CoreServicesEditorial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showRiskVideo, setShowRiskVideo] = useState(false);
  const [riskImageExpanded, setRiskImageExpanded] = useState(false);
  const [showArchiveVideo, setShowArchiveVideo] = useState(false);
  const [archiveImageExpanded, setArchiveImageExpanded] = useState(false);
  const [showMonitoringVideo, setShowMonitoringVideo] = useState(false);
  const [monitoringImageExpanded, setMonitoringImageExpanded] = useState(false);
  const [showAnalysisVideo, setShowAnalysisVideo] = useState(false);
  const [analysisImageExpanded, setAnalysisImageExpanded] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const riskVideoRef = useRef<HTMLVideoElement>(null);
  const archiveVideoRef = useRef<HTMLVideoElement>(null);
  const monitoringVideoRef = useRef<HTMLVideoElement>(null);
  const analysisVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = riskVideoRef.current;
    if (!video) return;

    if (activeIndex !== 2) {
      setShowRiskVideo(false);
      setRiskImageExpanded(false);
      video.pause();
      video.currentTime = 0;
      return;
    }

    setShowRiskVideo(false);
    setRiskImageExpanded(false);
    video.pause();
    video.currentTime = 0;
    const revealFrame = window.requestAnimationFrame(() => setRiskImageExpanded(true));
    const playbackTimer = window.setTimeout(() => {
      setShowRiskVideo(true);
      video.play().catch(() => undefined);
    }, 900);

    return () => {
      window.cancelAnimationFrame(revealFrame);
      window.clearTimeout(playbackTimer);
    };
  }, [activeIndex]);

  useEffect(() => {
    const video = monitoringVideoRef.current;
    if (!video) return;

    if (activeIndex !== 0) {
      setShowMonitoringVideo(false);
      setMonitoringImageExpanded(false);
      video.pause();
      video.currentTime = 0;
      return;
    }

    setShowMonitoringVideo(false);
    setMonitoringImageExpanded(false);
    video.pause();
    video.currentTime = 0;
    const revealFrame = window.requestAnimationFrame(() => setMonitoringImageExpanded(true));
    const playbackTimer = window.setTimeout(() => {
      setShowMonitoringVideo(true);
      video.play().catch(() => undefined);
    }, 900);

    return () => {
      window.cancelAnimationFrame(revealFrame);
      window.clearTimeout(playbackTimer);
    };
  }, [activeIndex]);

  useEffect(() => {
    const video = archiveVideoRef.current;
    if (!video) return;

    if (activeIndex !== 3) {
      setShowArchiveVideo(false);
      setArchiveImageExpanded(false);
      video.pause();
      video.currentTime = 0;
      return;
    }

    setShowArchiveVideo(false);
    setArchiveImageExpanded(false);
    video.pause();
    video.currentTime = 0;
    const revealFrame = window.requestAnimationFrame(() => setArchiveImageExpanded(true));
    const playbackTimer = window.setTimeout(() => {
      setShowArchiveVideo(true);
      video.play().catch(() => undefined);
    }, 900);

    return () => {
      window.cancelAnimationFrame(revealFrame);
      window.clearTimeout(playbackTimer);
    };
  }, [activeIndex]);

  useEffect(() => {
    const video = analysisVideoRef.current;
    if (!video) return;

    if (activeIndex !== 1) {
      setShowAnalysisVideo(false);
      setAnalysisImageExpanded(false);
      video.pause();
      video.currentTime = 0;
      return;
    }

    setShowAnalysisVideo(false);
    setAnalysisImageExpanded(false);
    video.pause();
    video.currentTime = 0;
    const revealFrame = window.requestAnimationFrame(() => setAnalysisImageExpanded(true));
    const playbackTimer = window.setTimeout(() => {
      setShowAnalysisVideo(true);
      video.play().catch(() => undefined);
    }, 900);

    return () => {
      window.cancelAnimationFrame(revealFrame);
      window.clearTimeout(playbackTimer);
    };
  }, [activeIndex]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const intro = root.querySelector(".services-scroll-intro");
      const layout = root.querySelector(".services-editorial-layout");
      const heading = root.querySelector(".services-editorial-heading");
      const visual = root.querySelector(".services-editorial-visual-media");
      const rows = gsap.utils.toArray<HTMLElement>(".services-editorial-row", root);
      const media = gsap.matchMedia();

      media.add("(min-width: 761px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=3400",
            pin: true,
            pinSpacing: true,
            scrub: 1.4,
            invalidateOnRefresh: true
          }
        });

        timeline
          .set(intro, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" })
          .set([layout, heading, visual, ...rows], { autoAlpha: 0, y: 46 })
          .to(intro, {
            autoAlpha: 0,
            y: -44,
            scale: 0.92,
            filter: "blur(10px)",
            duration: 0.75,
            ease: "power2.inOut"
          })
          .to(layout, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.68)
          .to([heading, visual, ...rows], { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 0.78)
          .to([heading, visual, ...rows], { duration: 0.55 });
      });

      media.add("(max-width: 760px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=2400",
            pin: true,
            pinSpacing: true,
            scrub: 1.25,
            invalidateOnRefresh: true
          }
        });

        timeline
          .set(intro, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" })
          .set(layout, { autoAlpha: 0, y: 0 })
          .to(intro, {
            autoAlpha: 0,
            y: -36,
            scale: 0.94,
            filter: "blur(8px)",
            duration: 0.72,
            ease: "power2.inOut"
          })
          .to(layout, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 0.62)
          .to({}, { duration: 1.15 });
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={ref} className="services-editorial" aria-labelledby="services-title" style={{ minHeight: "100dvh", padding: 0 }}>
      <div className="services-scroll-intro" aria-hidden>
        <span>OUR</span>
        <strong>&nbsp;SERVICE</strong>
      </div>
      <div className="container-wide services-editorial-layout" style={{ position: "absolute", inset: 0, margin: "auto", alignContent: "center", padding: "clamp(72px, 8vh, 110px) 0" }}>
        <header className="services-editorial-heading">
          <h2 id="services-title">브랜드의 <em style={{ color: "#2f6bff", fontStyle: "normal" }}>위험</em>을 읽고<br /><em style={{ color: "#2f6bff", fontStyle: "normal" }}>대응</em>을 <em style={{ color: "#2f6bff", fontStyle: "normal" }}>설계</em>합니다</h2>
        </header>

        <div className="services-editorial-visual" aria-hidden style={{ overflow: "visible", background: "transparent", borderRadius: 0, zIndex: 4 }}>
          <div
            className="services-editorial-visual-media"
            style={{
              position: "relative",
              minHeight: "inherit",
              width: (activeIndex === 0 && monitoringImageExpanded) || (activeIndex === 1 && analysisImageExpanded) || (activeIndex === 2 && riskImageExpanded) || (activeIndex === 3 && archiveImageExpanded) ? "min(40vw, 580px)" : "100%",
              height: "min(780px, calc(100dvh - 18px))",
              marginLeft: (activeIndex === 0 && monitoringImageExpanded) || (activeIndex === 1 && analysisImageExpanded) || (activeIndex === 2 && riskImageExpanded) || (activeIndex === 3 && archiveImageExpanded) ? "max(-72px, calc((100% - min(40vw, 580px)) / 2))" : 0,
              overflow: "hidden",
              borderRadius: 10,
              background: "#0d0e10",
              transition: "width .82s cubic-bezier(.22, 1, .36, 1), height .82s cubic-bezier(.22, 1, .36, 1), margin-left .82s cubic-bezier(.22, 1, .36, 1)"
            }}
          >
          {services.map((service, index) => (
            <Image key={service.image} src={service.image} alt="" fill sizes="(max-width: 900px) 100vw, 38vw" className={`services-editorial-image ${activeIndex === index ? "is-active" : ""}`} />
          ))}
          <video
            ref={riskVideoRef}
            src="/core-services/risk.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
              opacity: showRiskVideo ? 1 : 0,
              transition: "opacity .4s cubic-bezier(.22, 1, .36, 1)"
            }}
          />
          <video
            ref={archiveVideoRef}
            src="/core-services/eividence-archive.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
              opacity: showArchiveVideo ? 1 : 0,
              transition: "opacity .4s cubic-bezier(.22, 1, .36, 1)"
            }}
          />
          <video
            ref={monitoringVideoRef}
            src="/core-services/monitoring.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
              opacity: showMonitoringVideo ? 1 : 0,
              transition: "opacity .4s cubic-bezier(.22, 1, .36, 1)"
            }}
          />
          <video
            ref={analysisVideoRef}
            src="/core-services/risk-anlysis.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
              opacity: showAnalysisVideo ? 1 : 0,
              transition: "opacity .4s cubic-bezier(.22, 1, .36, 1)"
            }}
          />
          </div>
        </div>

        <div className="services-editorial-list">
          {services.map((service, index) => (
            <button key={service.number} type="button" className={`services-editorial-row ${activeIndex === index ? "is-active" : ""}`} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onClick={() => setActiveIndex(index)}>
              <strong>{service.title}</strong>
              <span className="services-editorial-description">{service.description}</span>
              <ArrowUpRight className="services-editorial-arrow" size={22} strokeWidth={1.5} aria-hidden />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
