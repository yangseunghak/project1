"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navItems, partnerFields } from "@/data/site";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    let frameId = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateReveal = () => {
      frameId = 0;
      const remainingScroll = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      const footerHeight = footerRef.current?.offsetHeight ?? 0;
      // The fixed footer starts becoming visible as soon as the page reaches
      // its reserved footer-height spacer, so begin the reveal at that edge.
      const revealDistance = footerHeight;
      const shouldReveal = reducedMotion || remainingScroll <= revealDistance;

      setIsRevealed((current) => current === shouldReveal ? current : shouldReveal);
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateReveal);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`coads-footer${isRevealed ? " is-revealed" : ""}`}
      aria-label="COADS footer"
    >
      <div className="container-wide coads-footer-layout">
        <div className="coads-footer-info">
          <div className="coads-footer-company-info">
          <p className="coads-footer-company">COADS</p>
          <div className="coads-footer-details">
            <p><b>Address.</b> 강원도 원주시 동부순환로 261 458호</p>
            <p><b>Tel.</b> <a href="tel:01080182030">010-8018-2030</a></p>
            <p><b>Email.</b> <a href="mailto:newsamchang@gmail.com">newsamchang@gmail.com</a></p>
            <p><b>Business No.</b> 144-53-15863</p>
            <p><b>Representative.</b> 양승학</p>
          </div>
          </div>
          <nav className="coads-footer-page-nav" aria-label="Footer navigation">
            {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </div>

        <div className="coads-footer-signoff">
          <span>© 2026 COADS. ALL RIGHTS RESERVED.</span>
        </div>

        <div className="coads-footer-logo-lockup">
          <Image
            src="/logo/coads-logo-mark.png"
            alt="COADS"
            width={505}
            height={120}
            className="coads-footer-logo"
          />
        </div>
      </div>
    </footer>
  );

  return (
    <footer className="bg-[#071A2B] py-16 text-white">
      <div className="container-wide grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link href="/" className="mb-6 inline-flex items-center cursor-pointer" aria-label="Go to COADS home">
            <Image
              src="/logo/coads-logo-mark.png"
              alt="COADS"
              width={505}
              height={120}
              className="h-[36px] w-auto object-contain brightness-0 invert"
            />
          </Link>
          <p className="max-w-xl text-lg leading-8 text-white/72">
            온라인 평판과 여론 리스크를 탐지, 분석, 증거화하고 대응 체계를 설계하는 디지털 리스크 인텔리전스 기업입니다.
          </p>
        </div>
        <div>
          <p className="mb-5 text-sm font-black uppercase text-white/50">Sitemap</p>
          <div className="grid gap-3">
            {navItems.map((item) => <Link key={item.href} href={item.href} className="text-white/80 hover:text-white">{item.label}</Link>)}
            <Link href="/contact" className="text-white/80 hover:text-white">프로젝트 문의</Link>
          </div>
        </div>
        <div>
          <p className="mb-5 text-sm font-black uppercase text-white/50">Partner Network</p>
          <div className="flex flex-wrap gap-2">
            {partnerFields.map((field) => <span key={field} className="border border-white/16 px-3 py-2 text-sm text-white/78">{field}</span>)}
          </div>
        </div>
      </div>
      <div className="container-wide mt-12 border-t border-white/12 pt-6 text-sm text-white/46">
        Copyright 2026 COADS. All rights reserved. 상담 내용과 전달 자료는 안전하게 관리됩니다.
      </div>
    </footer>
  );
}
