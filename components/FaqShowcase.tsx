"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const faqItems = [
  {
    question: "어떤 온라인 채널을 모니터링하나요?",
    answer: "검색 결과, 커뮤니티, SNS, 뉴스, 리뷰 등 이슈의 성격과 확산 경로에 맞는 채널을 우선적으로 설정합니다."
  },
  {
    question: "이슈가 발생한 뒤에도 대응을 시작할 수 있나요?",
    answer: "가능합니다. 현재 확산 단계와 핵심 쟁점을 분석한 뒤, 필요한 증거 확보와 대응 우선순위부터 빠르게 정리합니다."
  },
  {
    question: "모니터링 결과는 어떤 방식으로 공유되나요?",
    answer: "의사결정에 필요한 신호와 근거를 중심으로 정리해 정기 리포트 또는 긴급 알림 체계로 공유합니다."
  },
  {
    question: "법률 또는 홍보 대응과 함께 진행할 수 있나요?",
    answer: "사안에 따라 법률, 홍보, 보안, 콘텐츠 분야의 파트너와 협업할 수 있도록 대응 구조를 설계합니다."
  },
  {
    question: "상담 전에 준비해야 할 자료가 있나요?",
    answer: "현재 상황을 알 수 있는 링크, 캡처, 관련 일정이 있다면 도움이 됩니다. 자료가 없어도 초기 진단부터 함께 시작할 수 있습니다."
  },
  {
    question: "대응 범위는 상황에 맞춰 조정할 수 있나요?",
    answer: "가능합니다. 단기 이슈 진단부터 상시 모니터링, 증거 아카이빙, 유관 파트너 협업까지 필요한 범위를 기준으로 설계합니다."
  },
  {
    question: "비용은 어떤 기준으로 산정되나요?",
    answer: "이슈의 복잡도, 모니터링 채널, 대응 기간, 필요한 분석 범위를 바탕으로 상담 후 필요한 업무만 제안합니다."
  },
  {
    question: "상담 내용과 자료는 비공개로 관리되나요?",
    answer: "네. 전달받은 자료와 상담 내용은 대응 검토 목적 안에서 안전하게 관리하며, 외부에 공개하지 않습니다."
  }
];

export function FaqShowcase() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="container-wide faq-layout">
        <header className="faq-heading">
          <h2 id="faq-title">COADS <strong>FAQ</strong></h2>
        </header>

        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <article key={item.question} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="faq-number">0{index + 1}</span>
                  <span>{item.question}</span>
                  {isOpen ? <Minus aria-hidden size={22} strokeWidth={1.8} /> : <Plus aria-hidden size={22} strokeWidth={1.8} />}
                </button>
                <div id={answerId} className="faq-answer" hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
