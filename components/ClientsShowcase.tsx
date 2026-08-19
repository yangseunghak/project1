"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const clients = [
  { name: "김앤장", mark: "K", tone: "#263A5C" },
  { name: "법무법인\n광장", mark: "G", tone: "#1D4ED8" },
  { name: "법무법인\n태평양", mark: "B", tone: "#111827" },
  { name: "법무법인\n세종", mark: "S", tone: "#334155" },
  { name: "율촌", mark: "Y", tone: "#0F766E" },
  { name: "화우", mark: "H", tone: "#7C3AED" },
  { name: "서울아산\n병원", mark: "+", tone: "#0F766E" },
  { name: "세브란스\n병원", mark: "+", tone: "#2563EB" },
  { name: "삼성서울\n병원", mark: "+", tone: "#334155" },
  { name: "서울대병원", mark: "+", tone: "#1D4ED8" },
  { name: "강남세브란스\n병원", mark: "+", tone: "#0E7490" },
  { name: "분당서울대\n병원", mark: "+", tone: "#047857" },
  { name: "삼성전자", mark: "S", tone: "#145CEB" },
  { name: "현대\n자동차", mark: "H", tone: "#002C5F" },
  { name: "카카오", mark: "K", tone: "#111111" },
  { name: "네이버", mark: "N", tone: "#03C75A" },
  { name: "LG전자", mark: "L", tone: "#A50034" },
  { name: "SK\n텔레콤", mark: "SK", tone: "#EA002C" },
  { name: "HYBE", mark: "H", tone: "#111111" },
  { name: "SM\nENTERTAINMENT", mark: "SM", tone: "#D946EF" },
  { name: "JYP\nENTERTAINMENT", mark: "JY", tone: "#0F172A" },
  { name: "YG\nENTERTAINMENT", mark: "YG", tone: "#111111" },
  { name: "CJ ENM", mark: "CJ", tone: "#E11D48" },
  { name: "안테나", mark: "A", tone: "#2563EB" }
];

export function ClientsShowcase() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = ref.current;
    if (!root) return;

    const context = gsap.context(() => {
      const title = root.querySelector(".clients-stage-title");
      const slider = root.querySelector(".clients-slider");
      const rows = gsap.utils.toArray<HTMLElement>(".clients-track", root);
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=3200",
            scrub: 1.4,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true
          }
        });

        timeline
          .set(title, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" })
          .set(slider, { autoAlpha: 0, y: 60, scale: 0.96, filter: "blur(8px)" })
          .to(title, {
            autoAlpha: 0,
            y: "-8vh",
            scale: 0.92,
            filter: "blur(10px)",
            duration: 0.75,
            ease: "power2.inOut"
          })
          .to(slider, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out"
          }, 0.64)
          .to(slider, { duration: 0.8 });
      });

      media.add("(max-width: 1023px)", () => {
        const rowEls = gsap.utils.toArray<HTMLElement>(".clients-row", root);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=2550",
            scrub: 1.35,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true
          }
        });

        timeline
          .set(title, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" })
          .set(slider, { autoAlpha: 0, y: 42, scale: 0.96, filter: "blur(8px)" })
          .set(rowEls, { autoAlpha: 0, y: 22 })
          .to(title, {
            autoAlpha: 0,
            y: "-7vh",
            scale: 0.92,
            filter: "blur(10px)",
            duration: 0.72,
            ease: "power2.inOut"
          })
          .to(slider, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.82,
            ease: "power3.out"
          }, 0.62)
          .to(rowEls, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power3.out"
          }, 0.78)
          .to(slider, { duration: 0.8 });
      });

      rows.forEach((row, index) => {
        gsap.to(row, {
          xPercent: index % 2 === 0 ? -50 : 50,
          duration: index % 2 === 0 ? 23 : 26,
          ease: "none",
          repeat: -1
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

  const clientRows = [
    clients.slice(0, 6),
    clients.slice(6, 12),
    clients.slice(12, 18),
    clients.slice(18, 24)
  ];

  return (
    <section ref={ref} className="clients-section">
      <div className="container-wide clients-layout">
        <h2 className="clients-stage-title" aria-label="OUR CLIENTS">
          <span>OUR</span>
          <strong>CLIENTS</strong>
        </h2>

        <div className="clients-slider" aria-label="주요 클라이언트 업종">
          {clientRows.map((row, rowIndex) => (
            <div key={rowIndex} className="clients-row">
              <div className="clients-track">
                {[...row, ...row].map((client, index) => (
                  <article key={`${client.name}-${index}`} className="client-logo-card">
                    <span className="client-logo-mark" style={{ backgroundColor: client.tone }}>
                      {client.mark}
                    </span>
                    <span className="client-logo-name" style={{ color: client.tone }}>
                      {client.name}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
