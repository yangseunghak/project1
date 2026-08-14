"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RelatedContentSequence } from "@/components/RelatedContentSequence";

const searchTerm = "OO기업 대표";

const notifications = [
  { source: "SEARCH", message: "검색 결과 상위 노출이 감지되었습니다.", level: "normal" },
  { source: "COMMUNITY", message: "같은 제목의 게시물이 다시 등록되었습니다.", level: "normal" },
  { source: "COMMUNITY", message: "커뮤니티 언급량이 빠르게 증가하고 있습니다.", level: "normal" },
  { source: "SNS", message: "관련 게시물 링크가 공유되고 있습니다.", level: "normal" },
  { source: "COMMUNITY", message: "새로운 댓글 18개가 등록되었습니다.", level: "urgent" },
  { source: "SEARCH", message: "관련 키워드 검색량이 증가하고 있습니다.", level: "urgent" },
  { source: "NEWS", message: "뉴스 영역에서 동일 이슈가 확인되었습니다.", level: "urgent" }
];

const typingDelays = [0.1, 0.12, 0.11, 0.16, 0.09, 0.1, 0.15, 0.1, 0.3];

export function SearchSignalDemo() {
  const rootRef = useRef<HTMLElement>(null);
  const [showCards, setShowCards] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    if (!root) return;

    const query = root.querySelector<HTMLElement>(".search-signal-query");
    const status = root.querySelector<HTMLElement>(".search-signal-status");
    const count = root.querySelector<HTMLElement>(".search-signal-count");
    const searchInterface = root.querySelector<HTMLElement>(".search-signal-interface");
    const background = root.querySelector<HTMLElement>(".search-signal-background");
    const cards = gsap.utils.toArray<HTMLLIElement>(".search-signal-notification", root);
    const backgroundLines = gsap.utils.toArray<HTMLElement>(".search-signal-background-line", root);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scrollLocked = false;
    let unlockCall: gsap.core.Tween | null = null;
    let sequenceTrigger: ScrollTrigger | null = null;

    const preventScroll = (event: Event) => {
      if (scrollLocked) event.preventDefault();
    };

    const preventScrollKeys = (event: KeyboardEvent) => {
      if (!scrollLocked || event.ctrlKey || event.metaKey || event.altKey) return;
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        event.preventDefault();
      }
    };

    const lockScroll = () => {
      scrollLocked = true;
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventScrollKeys, { passive: false });
    };

    const unlockScroll = () => {
      scrollLocked = false;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScrollKeys);
    };

    if (!query || !status || !count || !searchInterface || !background) return;

    const reset = () => {
      query.textContent = "";
      cards.forEach((card) => {
        card.classList.remove("is-latest", "is-archived");
      });
      gsap.set(searchInterface, { autoAlpha: 0, y: 48 });
      gsap.set(background, { autoAlpha: 0 });
      gsap.set(status, { autoAlpha: 0, y: 8 });
      gsap.set(count, { autoAlpha: 0, y: 8 });
      gsap.set(cards, { display: "none", autoAlpha: 0, x: 80, y: 70, scale: 0.94 });
    };

    const showStaticState = () => {
      query.textContent = searchTerm;
      cards.forEach((card, index) => {
        card.classList.toggle("is-latest", index === cards.length - 1);
        card.style.display = "block";
      });
      gsap.set([searchInterface, background, status, count, cards], { autoAlpha: 1, x: 0, y: 0, scale: 1 });
    };

    const context = gsap.context(() => {
      if (reduceMotion) {
        showStaticState();
        return;
      }

      reset();

      const timeline = gsap.timeline({ paused: true });
      timeline
        .to({}, { duration: 0.42 })
        .to(searchInterface, { autoAlpha: 1, y: 0, duration: 0.82, ease: "power3.out" })
        .to({}, { duration: 0.22 });

      searchTerm.split("").forEach((_, index) => {
        timeline.call(() => {
          query.textContent = searchTerm.slice(0, index + 1);
        });
        timeline.to({}, { duration: typingDelays[index] ?? 0.1 });
      });

      timeline
        .to(status, { autoAlpha: 1, y: 0, duration: 0.24, ease: "power2.out" })
        .to({}, { duration: 0.82 })
        .to(count, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" });

      const notificationDelays = [0.7, 0.24, 0.18, 0.15, 0.13, 0.12, 0.1];
      cards.forEach((card, index) => {
        timeline
          .to({}, { duration: notificationDelays[index] })
          .call(() => {
            cards.forEach((item) => item.classList.remove("is-latest"));
            card.classList.add("is-latest");
          })
          .set(card, { display: "block" })
          .to(card, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.28, ease: "power3.out" });

        if (index === 0) {
          timeline.to(background, { autoAlpha: 1, duration: 0.32, ease: "power2.out" }, "<");
        }

        const visibleCards = cards.slice(0, index);
        if (visibleCards.length) {
          timeline.fromTo(visibleCards, { y: -8 }, { y: 0, duration: 0.24, ease: "power2.out" }, "<");
        }

        if (index >= 4) {
          const archivedCards = cards.slice(0, index - 3);
          timeline.call(() => archivedCards.forEach((item) => item.classList.add("is-archived")));
          timeline.to(archivedCards, { autoAlpha: 0.45, x: 12, y: 8, scale: 0.97, duration: 0.22, ease: "power2.out" }, "<");
        }
      });

      timeline
        .to({}, { duration: 0.3 })
        .call(() => {
          setShowCards(true);
        });

      backgroundLines.forEach((line, index) => {
        gsap.to(line, {
          x: index % 2 === 0 ? 18 : -18,
          duration: 4.6 + index * 0.35,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      });

      const replay = () => {
        unlockCall?.kill();
        lockScroll();
        setShowCards(false);
        reset();
        timeline.restart();
      };

      timeline.eventCallback("onComplete", () => {
        setShowCards(true);
        unlockCall = gsap.delayedCall(1.65, () => {
          unlockScroll();
        });
      });

      sequenceTrigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => window.matchMedia("(min-width: 769px)").matches ? "+=1500" : "+=1050",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onEnter: () => {
          replay();
        },
        onEnterBack: () => {
          replay();
        },
        onLeaveBack: () => {
          unlockCall?.kill();
          unlockScroll();
          timeline.pause(0);
          setShowCards(false);
          reset();
        }
      });
    }, root);

    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      unlockCall?.kill();
      unlockScroll();
      context.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="search-signal-demo" aria-labelledby="search-signal-title">
      <div className="search-signal-background" aria-hidden="true">
        <span className="search-signal-background-line line-one">이거 진짜 맞는 얘기인가요? 너무 충격인데요.</span>
        <span className="search-signal-background-line line-two">댓글 보니까 예전부터 말 많았던 것 같아요.</span>
        <span className="search-signal-background-line line-three">대표는 지금까지 뭐 하고 있었던 거예요?</span>
        <span className="search-signal-background-line line-four">검색만 해도 관련 글이 계속 나오네요.</span>
        <span className="search-signal-background-line line-five">이런 식이면 누가 다시 믿겠어요.</span>
        <span className="search-signal-background-line line-six">해명은 없고 말만 계속 바뀌는 느낌이에요.</span>
        <span className="search-signal-background-line line-seven">커뮤니티 반응 장난 아니네요.</span>
        <span className="search-signal-background-line line-eight">처음엔 아닌 줄 알았는데 글이 너무 많아요.</span>
        <span className="search-signal-background-line line-nine">공식 입장 언제 나오는 건가요?</span>
        <span className="search-signal-background-line line-ten">이슈 커지기 전에 정리했어야 했던 거 아닌가요?</span>
      </div>

      <div className="search-signal-interface">
        <h2 id="search-signal-title" className="search-signal-sr-only">검색 신호 시연</h2>
        <div className="search-signal-box" role="status" aria-live="polite">
          <svg className="search-signal-search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.5" stroke="currentColor" strokeWidth="1.7" />
            <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <span className="search-signal-query" aria-hidden="true" />
          <span className="search-signal-caret" aria-hidden="true" />
          <span className="search-signal-sr-only">{searchTerm}</span>
          <span className="search-signal-action" aria-hidden="true">SEARCH</span>
          <svg className="search-signal-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12h15M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="search-signal-status" aria-live="polite">검색 결과를 불러오는 중<span className="search-signal-dots" aria-hidden="true"><i>·</i><i>·</i><i>·</i></span></p>
      </div>

      <div className="search-signal-notifications" aria-live="polite" aria-label="감지된 신호 알림">
        <p className="search-signal-count">알림 7+</p>
        <ol className="search-signal-notification-list">
          {notifications.map((notification) => (
            <li key={`${notification.source}-${notification.message}`} className={`search-signal-notification search-signal-notification--${notification.level}`}>
              <div className="search-signal-notification-meta">
                <span className="search-signal-notification-source"><i aria-hidden="true" />{notification.source}</span>
                <time>방금</time>
              </div>
              <p>{notification.message}</p>
            </li>
          ))}
        </ol>
      </div>
      <RelatedContentSequence embedded active={showCards} />
    </section>
  );
}
