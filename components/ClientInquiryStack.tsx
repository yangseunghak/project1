"use client";

import { Paperclip } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ClientInquiryStack() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const introLabel = root.querySelector<HTMLElement>(".inquiry-intro-label");
      const introLabelLine = root.querySelector<HTMLElement>(".inquiry-intro-label-line");
      const introLines = gsap.utils.toArray<HTMLElement>(".inquiry-intro-title > span", root);
      const introCopy = root.querySelector<HTMLElement>(".inquiry-intro-copy");
      const clientMessage = root.querySelector<HTMLElement>(".inquiry-client-message");
      const clientMessageParts = clientMessage ? gsap.utils.toArray<HTMLElement>("p, span, div", clientMessage) : [];
      const stackStage = root.querySelector<HTMLElement>(".inquiry-stack-stage");
      const stackLabel = root.querySelector<HTMLElement>(".inquiry-stack-label");
      const cards = gsap.utils.toArray<HTMLElement>(".inquiry-post-card", root);
      const followUp = root.querySelector<HTMLElement>(".inquiry-follow-up");
      const answerStage = root.querySelector<HTMLElement>(".inquiry-answer-stage");
      const answerLabel = root.querySelector<HTMLElement>(".inquiry-answer-label");
      const answerLines = gsap.utils.toArray<HTMLElement>(".inquiry-answer-title > span", root);
      const answerCopy = root.querySelector<HTMLElement>(".inquiry-answer-copy");
      const checks = gsap.utils.toArray<HTMLElement>(".inquiry-answer-checks li", root);
      const media = gsap.matchMedia();

      if (!introLabel || !introLabelLine || !introLines.length || !introCopy || !clientMessage || !clientMessageParts.length || !stackStage || !stackLabel || cards.length !== 3 || !followUp || !answerStage || !answerLabel || !answerLines.length || !answerCopy || !checks.length) return;

      media.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set([introLabel, introCopy], { autoAlpha: 0, y: 24 });
        gsap.set(introLabelLine, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(introLines, { autoAlpha: 0, y: 54, clipPath: "inset(0 0 100% 0)" });
        gsap.set(clientMessage, { autoAlpha: 0, y: 86, scale: 0.96, clipPath: "inset(100% 0 0 0)", transformOrigin: "right bottom", willChange: "transform, opacity, clip-path" });
        gsap.set(clientMessageParts, { autoAlpha: 0, y: 12 });
        gsap.set(stackStage, { yPercent: 100 });
        gsap.set(stackLabel, { autoAlpha: 0, y: 20 });
        gsap.set(cards, { autoAlpha: 0, y: 180, scale: 0.94 });
        gsap.set(followUp, { autoAlpha: 0, x: 40 });
        gsap.set(answerStage, { yPercent: 100 });
        gsap.set([answerLabel, answerCopy], { autoAlpha: 0, y: 28 });
        gsap.set(answerLines, { autoAlpha: 0, y: 48, clipPath: "inset(0 0 100% 0)" });
        gsap.set(checks, { autoAlpha: 0, y: 18 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=4400",
            scrub: 0.8,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(introLabel, { autoAlpha: 1, y: 0, duration: 0.48, ease: "power2.out" }, 0.12)
          .to(introLabelLine, { scaleX: 1, duration: 0.7, ease: "power2.out" }, "<+0.06")
          .to(introLines, { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.82, stagger: 0.14, ease: "power3.out" }, ">-0.12")
          .to(introCopy, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }, "<+0.18")
          .to(clientMessage, { autoAlpha: 1, y: 0, scale: 1, clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power3.out" }, "<+0.08")
          .to(clientMessageParts, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.1, ease: "power2.out" }, ">-0.28")
          .to({}, { duration: 0.9 })
          .to(stackStage, { yPercent: 0, duration: 1.05, ease: "power3.inOut" })
          .to(stackLabel, { autoAlpha: 1, y: 0, duration: 0.48, ease: "power2.out" }, "<+0.22")
          .to(cards[0], { autoAlpha: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out" }, "<+0.12")
          .to({}, { duration: 0.85 })
          .to(cards[0], { y: -40, scale: 0.97, autoAlpha: 0.76, duration: 0.55, ease: "power2.out" })
          .to(cards[1], { autoAlpha: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out" }, "<+0.08")
          .to(followUp, { autoAlpha: 1, x: 0, duration: 0.58, ease: "power3.out" }, ">-0.15")
          .to({}, { duration: 0.7 })
          .to(followUp, { autoAlpha: 0, x: 16, duration: 0.38, ease: "power2.in" })
          .to(cards[1], { y: -38, scale: 0.97, autoAlpha: 0.76, duration: 0.55, ease: "power2.out" }, "<")
          .to(cards[2], { autoAlpha: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out" }, "<+0.08")
          .to({}, { duration: 0.9 })
          .to(answerStage, { yPercent: 0, duration: 1.05, ease: "power3.inOut" })
          .to(answerLabel, { autoAlpha: 1, y: 0, duration: 0.46, ease: "power2.out" }, "<+0.28")
          .to(answerLines, { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.76, stagger: 0.13, ease: "power3.out" }, ">-0.08")
          .to(answerCopy, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }, "<+0.2")
          .to(checks, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.15, ease: "power2.out" }, "<+0.06")
          .to({}, { duration: 1.1 });
      });

      media.add("(max-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const mobileTargets = gsap.utils.toArray<HTMLElement>(".inquiry-mobile-reveal", root);
        mobileTargets.forEach((target) => {
          gsap.from(target, {
            autoAlpha: 0,
            y: 26,
            duration: 0.68,
            ease: "power2.out",
            scrollTrigger: { trigger: target, start: "top 84%", once: true },
          });
        });
      });

      return () => media.revert();
    }, root);

    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, []);

  return (
    <section ref={ref} className="client-inquiry-section" aria-labelledby="client-inquiry-title">
      <div className="client-inquiry-intro">
        <div className="container-wide client-inquiry-intro-inner">
          <div className="inquiry-intro-main">
            <p className="inquiry-intro-label"><span className="inquiry-intro-label-line" aria-hidden="true" />CLIENT INQUIRY · 09:41</p>
            <h2 id="client-inquiry-title" className="inquiry-intro-title">
              <span>검색 결과에</span>
              <span><strong>이런 글들이</strong> 보이기 시작했습니다.</span>
            </h2>
            <p className="inquiry-intro-copy">의뢰자가 실제로 마주하는 화면에서 상담은 시작됩니다.</p>
          </div>
          <article className="inquiry-client-message inquiry-mobile-reveal">
            <p>대표 이름을 검색하면 아래 글들이 먼저 나옵니다.<br />최근에는 커뮤니티와 뉴스에도 같은 내용이 보여요.</p>
            <span>브랜드 담당자 · 09:41</span>
            <div><Paperclip size={16} aria-hidden="true" />첨부 링크 3개</div>
          </article>
        </div>
      </div>

      <div className="inquiry-stack-stage">
        <div className="container-wide inquiry-stack-inner">
          <p className="inquiry-stack-label">ATTACHED CONTENT · 3</p>
          <div className="inquiry-post-stack">
            <article className="inquiry-post-card inquiry-post-review inquiry-mobile-reveal">
              <p className="inquiry-post-source">직장 리뷰 · 2026.08</p>
              <h3>“대표의 대응 방식이 너무 감정적입니다.<br />다시는 함께 일하고 싶지 않습니다.”</h3>
              <div className="inquiry-post-detail"><strong>단점</strong><span>업무 지시가 자주 바뀌고 문제 상황에서 직원에게 책임을 돌린다는 의견</span></div>
              <footer>전직원 · 서울</footer>
            </article>

            <article className="inquiry-post-card inquiry-post-community inquiry-mobile-reveal">
              <h3><span>Q.</span> OO기업 대표 관련 이야기, 사실인가요?</h3>
              <p className="inquiry-post-meta">익명 사용자 · 조회수 9,200 · 2026.08.05</p>
              <p className="inquiry-post-quote">정확한 입장은 아직 나오지 않았지만, 비슷한 이야기가 계속 올라오고 있습니다.</p>
              <footer>답변 4 · 공유 17</footer>
            </article>

            <article className="inquiry-post-card inquiry-post-news inquiry-mobile-reveal">
              <p className="inquiry-post-source"><i aria-hidden="true" />온라인 뉴스</p>
              <h3>OO기업 대표 관련 논란, 커뮤니티에서 확산</h3>
              <p className="inquiry-post-body">최근 온라인 커뮤니티를 중심으로 관련 게시물이 반복 노출되며 사실관계 확인을 요구하는 반응이 이어지고 있다…</p>
              <footer>2026.08.06 · 더보기</footer>
            </article>
          </div>
          <aside className="inquiry-follow-up">이 글들부터 지워야 할까요?<span>09:44</span></aside>
        </div>
      </div>

      <div className="inquiry-answer-stage">
        <div className="container-wide inquiry-answer-inner">
          <div>
            <p className="inquiry-answer-label">COADS · 09:46</p>
            <h2 className="inquiry-answer-title">
              <span>링크 확인했습니다.</span>
              <span>삭제 요청보다 먼저</span>
              <span><strong>원문과 확산 범위</strong>를 확인하겠습니다.</span>
            </h2>
            <p className="inquiry-answer-copy">같은 내용이 어디서 시작됐고 어떤 경로로 반복되는지 확인한 뒤,<br />필요한 대응만 정리해 안내드리겠습니다.</p>
          </div>
          <ul className="inquiry-answer-checks">
            <li>원문 보존 여부</li>
            <li>검색 결과 반복 노출</li>
            <li>커뮤니티·뉴스 재확산</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
