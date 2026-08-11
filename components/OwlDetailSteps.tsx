"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock3, Eye, FileText, Heart, Link2, MessageCircle, Newspaper, Search, Share2, SquarePlay, UsersRound } from "lucide-react";

const channelData = [
  { name: "SEARCH", color: "blue", Icon: Search },
  { name: "NEWS", color: "cyan", Icon: Newspaper },
  { name: "COMMUNITY", color: "lime", Icon: UsersRound },
  { name: "BLOG", color: "yellow", Icon: FileText },
  { name: "SNS", color: "teal", Icon: Heart },
  { name: "YOUTUBE", color: "coral", Icon: SquarePlay },
] as const;

const stepTabs = ["01", "02", "03", "04"];

const labBooklets = [
  {
    step: "01",
    title: "COLLECT",
    koreanTitle: "온라인 게시물 수집",
    summary: "채널별로 흩어진 언급을 빠짐없이 모으고, 확인 가능한 원문을 먼저 보존합니다.",
    details: ["검색 결과", "커뮤니티", "SNS · 뉴스"],
  },
  {
    step: "02",
    title: "REVIEW",
    koreanTitle: "게시물 내용 확인",
    summary: "작성 시점과 핵심 주장, 반복되는 표현과 반응의 맥락을 함께 읽습니다.",
    details: ["주요 주장", "반복 표현", "이용자 반응"],
  },
  {
    step: "03",
    title: "CLASSIFY",
    koreanTitle: "대응 필요 여부 분류",
    summary: "노출 위치와 확산 속도를 기준으로 실제 대응이 필요한 우선순위를 나눕니다.",
    details: ["일반 언급", "추가 확인", "긴급 대응"],
  },
  {
    step: "04",
    title: "RESPOND",
    koreanTitle: "실행할 대응안 작성",
    summary: "원문 보존부터 답변 문안, 채널별 실행 순서까지 하나의 대응안으로 정리합니다.",
    details: ["원문 보존", "답변 문안", "실행 순서"],
  },
] as const;

export function OwlDetailSteps() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeLabStep, setActiveLabStep] = useState<number | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const sections = gsap.utils.toArray<HTMLElement>(".owl-detail-section", root);
      const tabs = gsap.utils.toArray<HTMLElement>(".owl-detail-tab", root);

      if (!reduced) {
        gsap.set(tabs, { autoAlpha: 0 });

        sections.forEach((section, index) => {
          const animated = section.querySelectorAll<HTMLElement>(".owl-reveal");
          gsap.set(animated, { autoAlpha: 0, y: 24 });
          ScrollTrigger.create({
            trigger: section,
            start: "top 66%",
            onEnter: () => {
              gsap.set(tabs, { autoAlpha: 1 });
              tabs.forEach((tab, tabIndex) => tab.classList.toggle("is-active", index === tabIndex));
              gsap.to(animated, { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.07, ease: "power2.out", overwrite: true });
            },
            onEnterBack: () => {
              gsap.set(tabs, { autoAlpha: 1 });
              tabs.forEach((tab, tabIndex) => tab.classList.toggle("is-active", index === tabIndex));
            },
            onLeave: () => { if (index === sections.length - 1) gsap.set(tabs, { autoAlpha: 0 }); },
            onLeaveBack: () => { if (index === 0) gsap.set(tabs, { autoAlpha: 0 }); },
          });
        });
      }
    }, root);
    const labTriggers = [
      ".owl-collect-visual",
      ".owl-review-document",
      ".owl-classify-plant",
      ".owl-plan-visual",
    ];
    const cleanupLabTriggers = labTriggers.flatMap((selector, index) => {
      const trigger = root.querySelector<HTMLElement>(selector);
      if (!trigger) return [];

      const open = () => setActiveLabStep(index);
      const close = () => setActiveLabStep(null);
      trigger.addEventListener("pointerenter", open);
      trigger.addEventListener("pointerleave", close);
      trigger.addEventListener("focusin", open);
      trigger.addEventListener("focusout", close);

      return [
        () => trigger.removeEventListener("pointerenter", open),
        () => trigger.removeEventListener("pointerleave", close),
        () => trigger.removeEventListener("focusin", open),
        () => trigger.removeEventListener("focusout", close),
      ];
    });

    return () => {
      cleanupLabTriggers.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return <section ref={rootRef} className="owl-detail-flow" aria-label="COADS 온라인 평판 대응 상세 과정">
    <LabBooklet activeStep={activeLabStep} />
    <nav className="owl-detail-tabs" aria-label="대응 단계">{stepTabs.map((step, index) => <span className={`owl-detail-tab ${index === 0 ? "is-active" : ""}`} key={step}>{step}</span>)}</nav>
    <StepOne />
    <StepTwo />
    <StepThree />
    <StepFour />
  </section>;
}

function ReportBridge() {
  return <section className="owl-report-bridge" aria-label="연구소 리포트 출력">
    <div className="owl-report-scene" aria-hidden="true"><img src="/coads-service-monitoring.png" alt="" /><div className="owl-report-shade" /></div>
    <div className="owl-report-lights" aria-hidden="true">{stepTabs.map((step) => <span className="owl-report-light" key={step}>{step}</span>)}</div>
    <div className="owl-print-report" aria-hidden="true">
      <div className="owl-report-paper"><b>COADS LAB / REPORT ARCHIVE</b><span>온라인 평판 대응 과정</span></div>
      <div className="owl-report-cover"><i /><i /><i /><i /><span>COADS LAB REPORT</span><strong>온라인 평판 대응 과정</strong><small>COADS / RESPONSE PROCESS</small></div>
    </div>
  </section>;
}

function LabBooklet({ activeStep }: { activeStep: number | null }) {
  const entry = activeStep === null ? null : labBooklets[activeStep];

  return (
    <aside className={`owl-lab-booklet ${entry ? "is-open" : ""}`} aria-live="polite" aria-hidden={!entry}>
      <div className="owl-lab-booklet-shadow" aria-hidden="true" />
      <div className="owl-lab-booklet-pages">
        <section className="owl-lab-booklet-page owl-lab-booklet-page--left">
          <span>COADS LAB</span>
          <b>{entry?.step ?? "01"} / 04</b>
          <strong>{entry?.title ?? "COLLECT"}</strong>
          <i aria-hidden="true" />
          <small>DIGITAL RISK PROCESS</small>
        </section>
        <section className="owl-lab-booklet-page owl-lab-booklet-page--right">
          <p>{entry?.koreanTitle ?? "온라인 게시물 수집"}</p>
          <strong>{entry?.summary ?? "채널별로 흩어진 언급을 빠짐없이 모읍니다."}</strong>
          <ul>
            {(entry?.details ?? labBooklets[0].details).map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </section>
        <div className="owl-lab-booklet-cover" aria-hidden="true">
          <span>COADS</span>
          <strong>LAB<br />REPORT</strong>
          <small>OPEN PROCESS</small>
        </div>
      </div>
    </aside>
  );
}

function StepIntro({ number, title, lead, description, accent = "blue" }: { number: string; title: string; lead: ReactNode; description: string; accent?: string }) {
  return <header className={`owl-step-intro is-${accent}`}>
    <p className="owl-reveal"><b>• STEP {number}</b></p><div className="owl-step-number owl-reveal">{number}</div><em className="owl-reveal">COADS LAB</em>
    <h2 className="owl-reveal">{title}</h2><strong className="owl-reveal">{lead}</strong><span className="owl-reveal">{description}</span>
  </header>;
}

function StepOne() {
  return <section className="owl-detail-section owl-step-one" aria-labelledby="owl-step-01">
    <div className="owl-detail-inner">
      <StepIntro number="01" title="온라인 게시물 수집" lead="흩어진 게시물을 한곳에 모읍니다." description="검색 결과, 커뮤니티, SNS, 뉴스, 블로그와 유튜브에서 브랜드 관련 게시물을 수집합니다." />
      <div className="owl-collect-visual owl-reveal">
        <div className="owl-channels">{channelData.map(({ name, color, Icon }) => <article className={`is-${color}`} key={name}><b>{name}</b><Icon className="owl-channel-icon" aria-hidden="true" /><span className="owl-source-card"><i /><em /><em /><em /></span><small className="owl-source-file"><i /><em /><em /></small></article>)}</div>
        <div className="owl-collect-lines" aria-hidden="true">{channelData.map(({ name, color }) => <i className={`is-${color}`} key={name}><span /></i>)}</div>
        <div className="owl-collect-table" tabIndex={0}>
          <header><b>RESULT</b><span>온라인 언급 수집표</span><Link2 /><Clock3 /><Eye /><MessageCircle /></header>
          {["2026.08.06 10:03", "2026.08.06 09:58", "2026.08.06 09:47", "2026.08.06 09:22", "2026.08.06 08:55", "2026.08.06 08:21"].map((time, index) => <p key={time}><i className={`is-${channelData[index].color}`} /><span /><b>{time}</b><small>{[1248, 2317, 984, 672, 1105, 3842][index]}</small><small>{[27, 89, 16, 12, 31, 142][index]}</small></p>)}
          <aside>URL<br /><b>https://source.example/post/123456</b><br /><br />작성 시각 · 조회 · 댓글 · 공유</aside>
        </div>
        <img className="owl-collector-illustration" src="/owl-step-01-collector.png" alt="게시물을 수집하는 부엉이 연구원 일러스트" />
      </div>
      <div className="owl-step-one-foot owl-reveal"><div>{["브랜드명", "대표명", "제품명", "연관어"].map((word) => <b key={word}>{word}</b>)}</div><span className="owl-meta-icons"><i><Link2 />URL</i><i><Clock3 />작성 시각</i><i><Eye />조회</i><i><MessageCircle />댓글</i><i><Share2 />공유</i></span></div>
    </div>
  </section>;
}

function StepTwo() {
  const comments = [
    { text: "이 발언은 맥락을 봐야 합니다.", time: "2026.08.06 10:05", reactions: [["동의 128", "agree"], ["반박 34", "disagree"], ["문의 12", "question"]] },
    { text: "회사의 성과는 인정하지만 설명이 필요합니다.", time: "2026.08.06 10:07", reactions: [["동의 96", "agree"], ["반박 58", "disagree"], ["문의 9", "question"]] },
    { text: "관련 글이 계속 재게시되고 있어요.", time: "2026.08.06 10:09", reactions: [["확산 214", "spread"], ["문의 21", "question"]] },
  ];
  return <section className="owl-detail-section owl-step-two" aria-labelledby="owl-step-02">
    <div className="owl-detail-inner">
      <StepIntro number="02" title="게시물 내용 확인" lead={<>게시물 하나씩,<br /><mark>주장과 반응</mark>을 나눠 봅니다.</>} description="제목·본문·댓글에서 반복되는 주장과 표현을 추려내고, 작성 시각과 이용자 반응을 함께 확인합니다." accent="ink" />
      <div className="owl-review-key owl-reveal"><p><b>분석 항목</b><span>주장</span><span>의견</span><span>질문</span><span>재게시</span></p><p><b>반응 유형</b><span>동의</span><span>반박</span><span>문의</span><span>확산</span></p><em><b>RESULT</b> 게시물 내용 확인표</em></div>
      <img className="owl-reviewer-illustration owl-reveal" src="/owl-step-02-reviewer-hq.png" alt="돋보기로 게시물을 확인하는 부엉이 연구원 일러스트" />
      <article className="owl-review-document owl-reveal" tabIndex={0}>
        <div className="owl-doc-labels"><span><FileText /><b>제목</b></span><span><FileText /><b>본문</b></span><span><MessageCircle /><b>댓글</b></span></div>
        <div className="owl-doc-body"><header><h3>OO기업 대표 관련 논란, 커뮤니티에서 확산</h3><p>2026.08.06 10:03:18　|　익명 사용자</p></header><div className="owl-doc-copy"><p>OO기업 대표의 과거 발언이 다시 주목받고 있습니다.</p><p>일부 이용자들은 대표의 경영 철학에 문제를 제기하며 <mark>책임 있는 설명을 요구하고 있습니다.</mark></p><p>반면, 회사의 성과를 근거로 옹호하는 의견도 많습니다.</p><p>관련 게시물이 <mark className="is-yellow">빠르게 공유되며 논쟁이 커지고 있습니다.</mark></p></div><div className="owl-comments">{comments.map((comment) => <article key={comment.time}><i>○</i><span>익명 사용자<br /><b>{comment.text}</b><small>{comment.time}</small></span><div className="owl-comment-reactions">{comment.reactions.map(([label, tone]) => <em className={`is-${tone}`} key={label}>{label}</em>)}</div></article>)}</div></div>
        <aside className="owl-reaction-summary"><h3>반응 집계</h3>{[["♧", "동의", "1,248"], ["♢", "반박", "317"], ["?", "문의", "142"], ["↗", "확산", "2,317"]].map(([icon,label,value]) => <p key={label}><i>{icon}</i><b>{label}</b><span>{value}</span></p>)}<h3>핵심 지표</h3><div><b>반복 표현 <strong>12회</strong></b><b>재게시 <strong>4건</strong></b><b>댓글 <strong>86개</strong></b></div></aside>
      </article>
    </div>
  </section>;
}

function StepThree() {
  return <section className="owl-detail-section owl-step-three" aria-labelledby="owl-step-03">
    <div className="owl-detail-inner">
      <div className="owl-step-three-title owl-reveal"><StepIntro number="03" title="대응 필요 여부 분류" lead="모든 부정 글을 같은 위험으로 보지 않습니다." description="사실관계, 검색 노출, 확산 속도와 이해관계자 영향을 기준으로 대응 우선순위를 나눕니다." /></div>
      <div className="owl-classify-legend owl-reveal"><p><i className="is-teal" /><b>일반 언급</b><span>개인 의견 · 제한적 노출</span></p><p><i className="is-yellow" /><b>추가 확인</b><span>반복 주장 · 검색 상단 노출</span></p><p><i className="is-coral" /><b>긴급 대응</b><span>허위 사실 · 빠른 재확산</span></p><em><b>RESULT</b> 대응 우선순위 분류표</em></div>
      <div className="owl-classify-plant owl-reveal"><div className="owl-classify-input"><b>분류 기준</b>{["사실성", "노출 위치", "확산 속도", "영향 범위"].map((item) => <span key={item}>○　{item}</span>)}</div><div className="owl-rails"><article className="is-teal"><b>●　일반 언급</b><div>{[1,2,3,4].map((item) => <i key={item} />)}</div></article><article className="is-yellow"><b>●　추가 확인</b><div>{[1,2,3].map((item) => <i key={item} />)}</div></article><article className="is-coral" tabIndex={0}><b>!　긴급 대응</b><div>{[1,2,3].map((item) => <i key={item} />)}</div><aside><strong>긴급 대응</strong><p>사실성　낮음</p><p>노출 위치　검색 상단</p><p>확산 속도　빠름</p><p>영향 범위　높음</p><b>허위 사실 · 빠른 재확산</b></aside></article></div></div>
    </div>
  </section>;
}

function StepFour() {
  return <section className="owl-detail-section owl-step-four" aria-labelledby="owl-step-04">
    <div className="owl-detail-inner"><StepIntro number="04" title="실행할 대응안 작성" lead="누가, 언제, 어디에서 대응할지 정리합니다." description="확인된 사실을 기준으로 공식 입장, 답변 문안, 플랫폼 요청과 채널별 실행 순서를 작성합니다." />
      <div className="owl-plan-visual owl-reveal"><div className="owl-action-cards">{[["REPORT", "플랫폼 요청", "blue"], ["REPLY", "답변 문안", "orange"], ["EXPLAIN", "공식 입장", "pink"], ["TRACK", "후속 확인", "teal"]].map(([tag,title,color]) => <article className={`is-${color}`} key={tag} tabIndex={0}><b>{tag}</b><strong>{title}</strong><i>⌂</i><span /><small>담당자 · 승인자 · 실행 채널</small></article>)}</div><div className="owl-plan-timeline">{[["2H", "작성"], ["6H", "검토"], ["24H", "승인"], ["72H", "실행"]].map(([time,label]) => <p key={time}><b>{time}</b><i /><span>{label}</span></p>)}</div><div className="owl-plan-meta"><p>♙ <b>담당자</b><span>이승민</span></p><p>♙ <b>승인자</b><span>김현우</span></p><p>◷ <b>실행 시각</b><span>2026.08.06 14:00</span></p><p>◎ <b>상태</b><span>검토</span></p></div><footer><b>▣　RESULT</b><span>채널별 대응 실행안</span></footer></div>
    </div>
  </section>;
}
