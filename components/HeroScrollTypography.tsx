"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const heroPhrases = [
  { label: "WE READ", content: <><span className="hero-scroll-accent">WE</span><span>READ</span></> },
  { label: "DIGITAL RISKS", content: <><span>DIGITAL</span><span className="hero-scroll-accent">RISKS</span></> },
  { label: "COADS", content: <>COADS</> }
];

export function HeroScrollTypography() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const hero = root?.closest<HTMLElement>("#hero");
    if (!root || !hero) return;

    const phrases = gsap.utils.toArray<HTMLElement>(".hero-scroll-phrase", root);

    const ctx = gsap.context(() => {
      gsap.set(phrases, {
        autoAlpha: 0,
        yPercent: 0,
        rotateX: 0,
        scaleY: 0.72,
        transformOrigin: "50% 50%"
      });

      const desktop = window.matchMedia("(min-width: 768px)").matches;

      if (!desktop) {
        gsap.set(phrases[0], { autoAlpha: 1, scaleY: 1 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: desktop ? "+=2200" : "+=1500",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          refreshPriority: 2,
          invalidateOnRefresh: true
        }
      });

      phrases.forEach((phrase, index) => {
        const position = index * 0.86;
        const isLast = index === phrases.length - 1;

        tl.to(phrase, {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          scaleY: 1,
          duration: 0.38,
          ease: "power3.out"
        }, position);

        if (!isLast) {
          tl.to(phrase, {
            autoAlpha: 0,
            yPercent: 0,
            rotateX: 0,
            scaleY: 0.08,
            duration: 0.34,
            ease: "power3.inOut"
          }, position + 0.48);
        }
      });
    }, root);

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-scroll-typography" aria-label="WE READ DIGITAL RISKS COADS">
      <h1 className="hero-scroll-title">
        {heroPhrases.map((phrase) => (
          <span key={phrase.label} className="hero-scroll-phrase" aria-hidden="true">
            {phrase.content}
          </span>
        ))}
      </h1>
    </div>
  );
}
