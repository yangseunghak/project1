"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const relatedCards = [
  {
    kind: "직장 리뷰 · 2026.08",
    title: "대표의 대응 방식이 너무 감정적입니다.\n다시는 함께 일하고 싶지 않습니다.",
    body: "단점",
    footer: "익명 사용자 · 서울",
    details: ["평점 1.4 / 5.0", "재직 기간 1년 이상", "최근 30일 이내 등록된 리뷰"],
    className: "related-content-card--one",
  },
  {
    kind: "커뮤니티",
    title: "Q. OO기업 대표 관련 이야기가 사실인가요?",
    body: "정확한 입장은 아직 나오지 않았지만 비슷한 이야기가 계속 올라오고 있습니다.",
    footer: "댓글 4 · 공유 17",
    details: ["관련 게시물 12건", "동일 표현 반복 7건", "최근 6시간 공유량 증가"],
    className: "related-content-card--two",
  },
  {
    kind: "온라인 뉴스",
    title: "OO기업 대표 관련 이슈, 커뮤니티에서 확산",
    body: "최근 온라인 커뮤니티를 중심으로 관련 게시물이 반복 노출되고 사실관계 확인을 요구하는 반응이 이어지고 있습니다.",
    footer: "2026.08.06 · 더보기",
    details: ["관련 기사 3건", "커뮤니티 게시물 인용", "검색 결과 상단 노출 확인"],
    className: "related-content-card--three",
  },
];

export function RelatedContentSequence({ embedded = false, active = true }: { embedded?: boolean; active?: boolean }) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    if (!root) return;

    const searchBox = root.querySelector<HTMLElement>(".related-sequence-search");
    const searchLine = root.querySelector<HTMLElement>(".related-sequence-search-line");
    const count = root.querySelector<HTMLElement>(".related-sequence-count");
    const eyebrow = root.querySelector<HTMLElement>(".related-sequence-eyebrow");
    const titleLines = gsap.utils.toArray<HTMLElement>(".related-sequence-title > span", root);
    const description = root.querySelector<HTMLElement>(".related-sequence-description");
    const closing = root.querySelector<HTMLElement>(".related-sequence-closing");
    const cards = gsap.utils.toArray<HTMLElement>(".related-content-card", root);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!searchBox || !searchLine || !count || !eyebrow || !description || !closing || !titleLines.length || cards.length !== 3) return;

    const setFinalState = () => {
      count.textContent = "관련 콘텐츠 3건 확인";
      gsap.set(searchBox, { x: 0, y: 0, scale: 1, autoAlpha: 1 });
      gsap.set(searchLine, { scaleY: 1, transformOrigin: "top center" });
      gsap.set([eyebrow, description, closing, ...titleLines, ...cards], { autoAlpha: 1, x: 0, y: 0 });
    };

    const context = gsap.context(() => {
      if (embedded) {
        gsap.set(searchBox, { autoAlpha: 0 });
        gsap.set([eyebrow, description, closing, ...titleLines], { autoAlpha: 0 });
        gsap.set(cards, { autoAlpha: 0, x: 110, y: 34 });
        if (active) {
          gsap.timeline()
            .to(cards[0], { autoAlpha: 1, x: 0, y: 0, duration: 0.58, ease: "power3.out" })
            .to(cards[1], { autoAlpha: 1, x: 0, y: 0, duration: 0.58, ease: "power3.out" }, "<+0.2")
            .to(cards[2], { autoAlpha: 1, x: 0, y: 0, duration: 0.58, ease: "power3.out" }, "<+0.2");
        }
        return;
      }

      if (reduceMotion) {
        setFinalState();
        return;
      }

      count.textContent = "관련 콘텐츠 3건 확인";
      gsap.set(searchBox, { x: 0, y: 0, scale: 1, autoAlpha: 1 });
      gsap.set(searchLine, { scaleY: 1, transformOrigin: "top center" });
      gsap.set([eyebrow, description, closing], { autoAlpha: 0, y: 28 });
      gsap.set(titleLines, { autoAlpha: 0, y: 54, clipPath: "inset(0 0 100% 0)" });
      gsap.set(cards, { autoAlpha: 0, x: 110, y: 34 });

      const timeline = gsap.timeline({ paused: true });

      timeline
        .to(cards[0], { autoAlpha: 1, x: 0, y: 0, duration: 0.58, ease: "power3.out" })
        .to(cards[1], { autoAlpha: 1, x: 0, y: 0, duration: 0.58, ease: "power3.out" }, "<+0.2")
        .to(cards[2], { autoAlpha: 1, x: 0, y: 0, duration: 0.58, ease: "power3.out" }, "<+0.2");

      const replay = () => {
        gsap.set(cards, { autoAlpha: 0, x: 110, y: 34 });
        timeline.restart();
      };

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "+=1100",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onEnter: replay,
        onEnterBack: replay,
        onLeaveBack: () => {
          timeline.pause(0);
          gsap.set(cards, { autoAlpha: 0, x: 110, y: 34 });
        },
      });
    }, root);

    return () => context.revert();
  }, [embedded, active]);

  return (
    <section ref={rootRef} className={`related-sequence ${embedded ? "related-sequence--embedded" : ""} ${active ? "is-visible" : ""}`} aria-labelledby="related-sequence-title">
      <div className="related-sequence-search" aria-label="검색 결과 요약">
        <span>OO기업 대표</span>
        <strong className="related-sequence-count">관련 콘텐츠 0건</strong>
        <i className="related-sequence-search-line" aria-hidden="true" />
      </div>

      <div className="related-sequence-copy">
        <p className="related-sequence-eyebrow">RELATED CONTENT · 3</p>
        <h2 id="related-sequence-title" className="related-sequence-title">
          <span>흩어진 반응은</span>
          <span><em>하나의 이슈</em>로</span>
          <span>이어집니다.</span>
        </h2>
        <p className="related-sequence-description">같은 표현이 리뷰, 커뮤니티, 뉴스에서 반복되고 있습니다.</p>
        <p className="related-sequence-closing">흩어진 반응과 반복되는 내용은 <strong>하나의 이슈</strong>로 연결될 수 있습니다.</p>
      </div>

      <div className="related-content-stage" aria-label="관련 콘텐츠 카드">
        {relatedCards.map((card, index) => {
          const detailId = `related-card-details-${index}`;
          return (
            <article key={card.kind} className={`related-content-card ${card.className}`}>
              <button
                type="button"
                className="related-content-card-shell"
                aria-expanded="true"
                aria-controls={detailId}
              >
                <span className="related-card-kind">{card.kind}</span>
                <strong>{card.title}</strong>
                <span className="related-card-body">{card.body}</span>
                <span className="related-card-footer">{card.footer}</span>
                <span id={detailId} className="related-card-details">
                  {card.details.map((detail) => <span key={detail}>{detail}</span>)}
                </span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
