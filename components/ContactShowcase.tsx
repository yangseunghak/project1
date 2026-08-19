"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Send } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const industries = ["법률", "의료", "엔터테인먼트", "커머스", "금융", "IT/플랫폼", "기타"];

export function ContactShowcase() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = ref.current;
    if (!root) return;

    const context = gsap.context(() => {
      const titleLines = gsap.utils.toArray<HTMLElement>(".contact-cta-title > span", root);
      const projectLine = root.querySelector(".contact-cta-title strong");
      const link = root.querySelector(".contact-cta-link");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=2750",
          scrub: 1.4,
          pin: true,
          pinSpacing: true
        }
      });

      timeline
        .fromTo(titleLines[0], { autoAlpha: 0, y: 70, filter: "blur(10px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .72, ease: "power3.out" })
        .fromTo(titleLines[1], { autoAlpha: 0, y: 70, filter: "blur(10px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .72, ease: "power3.out" }, .72)
        .fromTo(projectLine, { autoAlpha: 0, y: 66, scale: .94, filter: "blur(10px)" }, { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: .82, ease: "power3.out" }, 1.44)
        .fromTo(link, { autoAlpha: 0, y: 20, scale: .96 }, { autoAlpha: 1, y: 0, scale: 1, duration: .55, ease: "power3.out" }, 2.24);
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={ref} className="contact-cta" id="contact" aria-labelledby="contact-title">
      <div className="container-wide contact-cta-content">
        <h2 id="contact-title" className="contact-cta-title">
          <span>ALWAYS READY</span>
          <span>FOR</span>
          <strong>NEW PROJECTS</strong>
        </h2>
        <Link className="contact-cta-link" href="/contact">
          <span>CONTACT US</span>
          <ArrowUpRight size={22} aria-hidden />
        </Link>
      </div>
    </section>
  );

  const [inquiryType, setInquiryType] = useState("긴급 이슈 대응");
  const [industry, setIndustry] = useState("법률");
  const [submitted, setSubmitted] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    setSubmitted(true);
  }

  return (
    <section className="contact-showcase" id="contact" aria-labelledby="contact-title">
      <div className="contact-showcase-background" aria-hidden="true">
        <Image src="/contact/risk-analyst-illustration.png" alt="" fill sizes="100vw" priority />
      </div>
      <div className="contact-showcase-overlay" aria-hidden="true" />
      <div className="container-wide contact-showcase-layout">
        <aside className="contact-showcase-intro">
          <p>CONTACT</p>
          <h2 id="contact-title" className="sr-only">COADS 문의</h2>
        </aside>

        <form className="contact-showcase-form" onSubmit={submit}>
          <fieldset className="contact-fieldset">
            <legend>문의 유형</legend>
            <div className="contact-type-options">
              {["긴급 이슈 대응", "상시 모니터링", "리스크 진단"].map((type) => (
                <label key={type} className="contact-radio">
                  <input type="radio" name="inquiryType" value={type} checked={inquiryType === type} onChange={() => setInquiryType(type)} />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="contact-input-grid">
            <label>성함<input name="name" required placeholder="성함을 입력해 주세요." /></label>
            <label>연락처<input name="phone" required type="tel" placeholder="연락처를 입력해 주세요." /></label>
          </div>
          <label className="contact-full-field">회사명<input name="company" required placeholder="회사명을 입력해 주세요." /></label>

          <fieldset className="contact-fieldset">
            <legend>업종</legend>
            <div className="contact-industry-options">
              {industries.map((item) => (
                <label key={item} className={`contact-chip ${industry === item ? "is-selected" : ""}`}>
                  <input type="radio" name="industry" value={item} checked={industry === item} onChange={() => setIndustry(item)} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="contact-full-field">이메일<input name="email" required type="email" placeholder="회신받을 이메일을 입력해 주세요." /></label>
          <label className="contact-full-field">문의 내용<textarea name="message" required minLength={10} placeholder="현재 상황과 확인이 필요한 내용을 입력해 주세요." /></label>
          <label className="contact-agreement"><input type="checkbox" required /><span>개인정보 수집 및 상담 목적의 연락에 동의합니다.</span></label>

          <button type="submit" className="contact-submit">
            <span>{submitted ? "문의가 접수되었습니다" : "문의 등록"}</span>
            {submitted ? <Check size={19} aria-hidden /> : <Send size={18} aria-hidden />}
          </button>
        </form>
      </div>
    </section>
  );
}
