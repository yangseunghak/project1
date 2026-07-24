"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const context = gsap.context(() => {}, hero);
    let cancelled = false;

    const reveal = () => {
      if (cancelled) return;

      context.add(() => {
        const lines = gsap.utils.toArray<HTMLElement>(".about-hero-line:not(.miss)", hero);
        const miss = hero.querySelector<HTMLElement>(".about-hero-line.miss");
        if (!miss) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isMobile = window.matchMedia("(max-width: 640px)").matches;
        const allLines = [...lines, miss];

        if (reduceMotion) {
          gsap.set(allLines, {
            autoAlpha: 1,
            clearProps: "transform,opacity,visibility,filter,clipPath,letterSpacing,willChange"
          });
          return;
        }

        const lineDuration = isMobile ? 0.68 : 0.8;
        const missDuration = isMobile ? 0.55 : 0.65;
        const missBlur = isMobile ? 6 : 12;

        gsap.set(lines, {
          yPercent: 115,
          rotation: 2,
          autoAlpha: 0,
          willChange: "transform, opacity"
        });
        gsap.set(miss, {
          clipPath: "inset(0 100% 0 0)",
          autoAlpha: 0.2,
          filter: `blur(${missBlur}px)`,
          letterSpacing: "0.12em",
          willChange: "clip-path, opacity, filter, letter-spacing"
        });

        const timeline = gsap.timeline({
          onComplete: () => {
            gsap.set(allLines, {
              clearProps: "transform,opacity,visibility,filter,clipPath,letterSpacing,willChange"
            });
          }
        });

        timeline.to(lines, {
          yPercent: 0,
          rotation: 0,
          autoAlpha: 1,
          duration: lineDuration,
          stagger: 0.12,
          ease: "power4.out"
        });
        timeline.to(miss, {
          clipPath: "inset(0 0% 0 0)",
          autoAlpha: 1,
          filter: "blur(0px)",
          letterSpacing: "0em",
          duration: missDuration,
          ease: "power3.inOut"
        }, Math.max(0, lineDuration + 0.24 - 0.35));
        timeline.to(miss, {
          duration: isMobile ? 0.51 : 0.6,
          scrambleText: {
            text: "MISS",
            chars: "01MX#",
            revealDelay: 0.12,
            speed: 0.45,
            tweenLength: false
          }
        }, Math.max(0, lineDuration + 0.24 - 0.23));
      });
    };

    const fontReady = document.fonts?.ready;
    if (fontReady) {
      fontReady.then(reveal, reveal);
    } else {
      reveal();
    }

    return () => {
      cancelled = true;
      context.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="about-hero" aria-labelledby="about-title">
      <div className="container-wide about-hero-content">
        <h1 id="about-title" className="about-hero-message" aria-label="WE SEE WHAT OTHERS MISS">
          <span className="line-mask"><span className="about-hero-line" aria-hidden="true">WE SEE</span></span>
          <span className="line-mask what-mask"><span className="about-hero-line" aria-hidden="true">WHAT</span></span>
          <span className="line-mask others-mask"><span className="about-hero-line" aria-hidden="true">OTHERS</span></span>
          <span className="line-mask miss-mask"><span className="about-hero-line miss" aria-hidden="true">MISS</span></span>
        </h1>
      </div>
    </section>
  );
}
