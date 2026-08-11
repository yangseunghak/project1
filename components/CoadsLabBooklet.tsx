const labPages = [
  {
    title: "온라인 게시물 수집",
    lead: "흩어진 게시물을 한곳에 모읍니다.",
    description: "검색 결과, 커뮤니티, SNS, 뉴스, 블로그와 유튜브에서 브랜드 관련 게시물을 수집합니다.",
    details: ["검색 결과", "커뮤니티", "SNS · 뉴스"],
  },
  {
    title: "게시물 내용 확인",
    lead: "게시물 하나의 주장과 반응을 함께 읽습니다.",
    description: "작성 시점, 주요 주장, 반복되는 내용과 이용자 반응을 확인합니다.",
    details: ["주요 주장", "반복 표현", "이용자 반응"],
  },
  {
    title: "대응 필요 여부 분류",
    lead: "모든 게시글을 같은 위험도로 보지 않습니다.",
    description: "일반 언급, 추가 확인이 필요한 게시물, 바로 대응해야 하는 게시물을 나눕니다.",
    details: ["일반 언급", "추가 확인", "긴급 대응"],
  },
  {
    title: "실행할 대응안 작성",
    lead: "무엇을, 언제, 어디에서 대응할지 정리합니다.",
    description: "대응 여부, 공식 입장, 답변 문안과 채널별 실행 순서를 정리합니다.",
    details: ["원문 보존", "답변 문안", "실행 순서"],
  },
] as const;

export function CoadsLabBooklet({ activeStep, open }: { activeStep: number; open: boolean }) {
  const step = String(activeStep + 1).padStart(2, "0");

  return (
    <aside className={`owl-lab-booklet ${open ? "is-open" : ""}`} data-step={step} aria-live="polite" aria-hidden={!open}>
      <div className="owl-lab-booklet-shadow" aria-hidden="true" />
      <div className="owl-lab-booklet-pages">
        <figure className="owl-lab-booklet-spread">
          <img src={`/labs${step}.png`} alt={`COADS LAB STEP ${step} 상세 페이지`} />
          <i aria-hidden="true" />
        </figure>
        <div className="owl-lab-booklet-cover" aria-hidden="true">
          <span>COADS LAB</span>
          <strong>STEP<br />{step}</strong>
          <small>ONLINE REPUTATION RESPONSE</small>
        </div>
      </div>
    </aside>
  );
}
