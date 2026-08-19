"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CaseStudy } from "@/data/caseStudyDetails";
import type { CaseNote } from "@/data/caseNotes";

const assetRoot = "/COADS-case-study-svg-assets/coads-case-assets";

type CaseDetailStoryProps = {
  study: CaseStudy;
  previous: CaseNote;
  next: CaseNote;
};

function CaseLabel({ children }: { children: React.ReactNode }) {
  return <p className="case-story-label">{children}</p>;
}

// Removed `Owl` component per request (owl images are hidden)

export function CaseDetailStory({ study, previous, next }: CaseDetailStoryProps) {
  const root = useRef<HTMLElement>(null);
  const sourceTitle = study.title;
  const repostTexts = [
    `${sourceTitle} 관련 글을 봤는데, 실제로 같은 문제가 있었던 건가요?`,
    study.comparison.changedText,
    "검색 결과에서도 비슷한 내용이 보입니다. 확인된 안내가 있는지 궁금합니다.",
  ];

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const reveal = gsap.utils.toArray<HTMLElement>("[data-case-reveal]", element);

      if (reduceMotion) {
        gsap.set(reveal, { autoAlpha: 1, clearProps: "transform,opacity,visibility" });
        return;
      }

      const hero = element.querySelector<HTMLElement>(".case-story-hero");
      const heroResults = gsap.utils.toArray<HTMLElement>(".case-story-search-result", element);
      const heroOwl = element.querySelector<HTMLElement>(".case-story-hero-owl");
      if (hero) {
        gsap.set(heroResults, { autoAlpha: 0, x: 24 });
        gsap.set(heroOwl, { autoAlpha: 0, y: 20 });
        gsap.timeline({ scrollTrigger: { trigger: hero, start: "top 76%", once: true } })
          .from(".case-story-hero-copy > *", { autoAlpha: 0, y: 24, duration: 0.65, stagger: 0.1, ease: "power3.out" })
          .to(heroResults, { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.12, ease: "power2.out" }, "<0.14")
          .to(heroOwl, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" }, "<0.18");
      }

      const situation = element.querySelector<HTMLElement>(".case-story-situation");
      if (situation) {
        const branches = situation.querySelector<HTMLElement>(".case-story-branch");
        const posts = gsap.utils.toArray<HTMLElement>(".case-story-repost", situation);
        gsap.set(posts, { autoAlpha: 0, y: 18 });
        if (branches) gsap.set(branches, { clipPath: "inset(0 100% 0 0)" });
        gsap.timeline({ scrollTrigger: { trigger: situation, start: "top 68%", toggleActions: "play none none reverse" } })
          .from(situation.querySelectorAll(".case-story-section-copy > *"), { autoAlpha: 0, y: 28, duration: 0.6, stagger: 0.1, ease: "power3.out" })
          .to(branches, { clipPath: "inset(0 0% 0 0)", duration: 0.65, ease: "power2.inOut" }, "<0.1")
          .to(posts, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.12, ease: "power2.out" }, "<0.1");
      }

      const actions = element.querySelector<HTMLElement>(".case-story-actions");
      if (actions) {
        const path = actions.querySelector<HTMLElement>(".case-story-process-path");
        const steps = gsap.utils.toArray<HTMLElement>(".case-story-process-step", actions);
        const owl = actions.querySelector<HTMLElement>(".case-story-actions-owl");
        gsap.set(steps, { autoAlpha: 0, y: 20 });
        gsap.set(owl, { autoAlpha: 0, y: 24 });
        if (path) gsap.set(path, { clipPath: "inset(0 100% 0 0)" });
        gsap.timeline({ scrollTrigger: { trigger: actions, start: "top 67%", toggleActions: "play none none reverse" } })
          .from(actions.querySelectorAll(".case-story-section-copy > *"), { autoAlpha: 0, y: 28, duration: 0.6, stagger: 0.1, ease: "power3.out" })
          .to(path, { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power2.inOut" }, "<0.12")
          .to(steps, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.12, ease: "power2.out" }, "<0.04")
          .to(owl, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" }, "<0.1");
      }

      const evidence = element.querySelector<HTMLElement>(".case-story-evidence");
      if (evidence) {
        const arrow = evidence.querySelector<HTMLElement>(".case-story-curved-arrow");
        const documents = gsap.utils.toArray<HTMLElement>(".case-story-paper", evidence);
        if (arrow) gsap.set(arrow, { autoAlpha: 0, x: -18 });
        gsap.set(documents, { autoAlpha: 0, y: 22 });
        gsap.timeline({ scrollTrigger: { trigger: evidence, start: "top 67%", toggleActions: "play none none reverse" } })
          .from(evidence.querySelectorAll(".case-story-section-copy > *"), { autoAlpha: 0, y: 28, duration: 0.6, stagger: 0.1, ease: "power3.out" })
          .to(documents[0], { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, "<0.12")
          .to(arrow, { autoAlpha: 1, x: 0, duration: 0.45, ease: "power2.out" }, "<0.1")
          .to(documents[1], { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, "<0.04")
          .to(".case-story-evidence-files, .case-story-evidence-note", { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.1, ease: "power2.out" }, "<0.15");
      }

      const results = element.querySelector<HTMLElement>(".case-story-results");
      if (results) {
        gsap.set(".case-story-result-value, .case-story-before-after, .case-story-results-note", { autoAlpha: 0, y: 20 });
        gsap.timeline({ scrollTrigger: { trigger: results, start: "top 68%", toggleActions: "play none none reverse" } })
          .from(results.querySelectorAll(".case-story-section-copy > *"), { autoAlpha: 0, y: 28, duration: 0.6, stagger: 0.1, ease: "power3.out" })
          .to(".case-story-result-value", { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.12, ease: "power2.out" }, "<0.1")
          .to(".case-story-before-after", { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, "<0.08")
          .to(".case-story-results-note", { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, "<0.1");
      }
    }, element);

    return () => context.revert();
  }, []);

  return (
    <article ref={root} className="case-story" style={{ "--case-accent": study.accent } as React.CSSProperties}>
      <section className="case-story-hero">
        <div className="case-story-hero-copy">
          <Link href="/cases" className="case-story-back"><ArrowLeft size={17} /> CASE ARCHIVE</Link>
          <CaseLabel>CASE NOTE {String(study.id).padStart(2, "0")}</CaseLabel>
          <h1>{study.title}</h1>
          <p>{study.summary}</p>
          <span className="case-story-meta">{study.clientLabel} / {study.channels.join(" · ")} / {study.duration}</span>
        </div>

        <div className="case-story-search-stage" aria-label="문제 게시물 검색 결과">
          {/* connector image removed: case-story-hero-branch */}
          <div className="case-story-search-list">
            {repostTexts.map((text, index) => (
              <article className={`case-story-search-result case-story-search-result--${index + 1}`} key={text}>
                <small>{study.channels[index % study.channels.length]} / {study.situation.spreadEvents[index]?.time}</small>
                <strong>{text}</strong>
                <span>확인 대상 게시물 {String(index + 1).padStart(2, "0")}</span>
              </article>
            ))}
          </div>
          {/* Owl speech removed per request */}
        </div>
      </section>

      <section className="case-story-section case-story-situation">
        <div className="case-story-section-copy">
          <CaseLabel>01 / SITUATION</CaseLabel>
          <h2>처음 글보다 <span className="case-story-coral-phrase">강한 표현<Image className="case-story-coral-underline" src={`${assetRoot}/connectors/coral-underline.svg`} alt="" aria-hidden width={244} height={22} /></span>이<br />붙어 검색 결과까지 이어졌습니다.</h2>
          <p>{study.situation.description}</p>
          <div className="case-story-situation-stats">
            <article><span>최초 게시</span><b>{study.situation.firstPublishedAt.slice(-5)}</b></article>
            <article><span>재게시</span><b>{study.situation.metrics[0]?.value}</b></article>
            <article><span>상위 노출</span><b>{study.situation.metrics[1]?.value}</b></article>
          </div>
        </div>

        <div className="case-story-spread-stage">
          <article className="case-story-original-post">
            <span>최초 게시물 / {study.situation.firstPublishedAt.slice(-5)}</span>
            <strong>{study.comparison.originalText}</strong>
          </article>
          {/* connector image removed: case-story-branch */}
          <div className="case-story-reposts">
            {repostTexts.map((text, index) => <article className={`case-story-repost case-story-repost--${index + 1}`} key={`${text}-${index}`}><span>{study.channels[index % study.channels.length]}</span><strong>{text}</strong></article>)}
          </div>
        </div>
      </section>

      <section className="case-story-section case-story-actions">
        <div className="case-story-section-copy">
          <CaseLabel>02 / COADS RESPONSE</CaseLabel>
          <h2>확인한 내용을<br />하나씩 정리했습니다.</h2>
        </div>

        <div className="case-story-process-stage">
          {/* connector image removed: case-story-process-path */}
          <ol className="case-story-process-list">
            {study.actions.slice(0, 4).map((action, index) => <li className={`case-story-process-step case-story-process-step--${index + 1}`} key={action.title}><b>{String(index + 1).padStart(2, "0")}</b><strong>{action.title.replace(/^\d+\s*\/\s*/, "")}</strong><span>{action.description}</span></li>)}
          </ol>
          {/* Owl removed from actions */}
        </div>
        <aside className="case-story-deliverables"><b>확인 자료 {study.deliverables.length}종</b>{study.deliverables.map((item) => <span key={item}>{item}</span>)}</aside>
      </section>

      <section className="case-story-section case-story-evidence">
        <div className="case-story-section-copy">
          <CaseLabel>03 / EVIDENCE</CaseLabel>
          <h2>바뀐 문장을<br />하나씩 짚고 확인했습니다.</h2>
        </div>
        <div className="case-story-evidence-stage">
          <article className="case-story-paper">
            <span>처음 글 / {study.situation.firstPublishedAt.slice(-5)}</span>
            <p>{study.comparison.originalText}</p>
          </article>
          {/* Curved arrow removed */}
          <article className="case-story-paper case-story-paper--repost">
            <span>재게시 글 / {study.situation.spreadEvents[2]?.time ?? "11:26"}</span>
            <p>{study.comparison.changedText.split(new RegExp(`(${study.comparison.addedPhrases.join("|")})`, "g")).map((part, index) => study.comparison.addedPhrases.includes(part) ? <mark key={index}>{part}</mark> : part)}</p>
          </article>
        </div>
        <div className="case-story-evidence-files">{study.evidence.map((item) => <span key={item.id}>{item.name}</span>)}</div>
        <p className="case-story-evidence-note">{study.comparison.note}</p>
      </section>

      <section className="case-story-section case-story-results">
        <div className="case-story-section-copy">
          <CaseLabel>04 / FOLLOW-UP</CaseLabel>
          <h2>{study.duration} 동안<br />다시 확인했습니다.</h2>
        </div>
        <div className="case-story-results-grid">
          {study.results.slice(0, 2).map((result) => <article className="case-story-result-value" key={result.label}><span>{result.label}</span><strong>{result.after}</strong></article>)}
          <article className="case-story-before-after">
            <span>검색 상위 노출</span>
            <div><b>Before</b><strong>{study.results[2]?.before ?? "확인 전"}</strong></div>
            <i />
            <div><b>After</b><strong>{study.results[2]?.after ?? "확인 후"}</strong></div>
          </article>
          <p className="case-story-results-note">{study.resultDescription}</p>
        </div>
      </section>

      <footer className="case-story-navigation">
        <Link href="/cases"><ArrowLeft size={19} /><span>CASE ARCHIVE</span></Link>
        <Link href={`/cases/${next.slug}`}><small>NEXT CASE</small><strong>{next.title}</strong><ArrowRight size={22} /></Link>
      </footer>
    </article>
  );
}
