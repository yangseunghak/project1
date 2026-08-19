import type { CaseNote } from "@/data/caseNotes";

export type CaseStudy = CaseNote & {
  industry: string;
  clientLabel: string;
  duration: string;
  summary: string;
  situation: {
    headline: string;
    description: string;
    firstPublishedAt: string;
    metrics: { label: string; value: string }[];
    spreadEvents: { channel: string; time: string; description: string }[];
  };
  actions: { title: string; description: string }[];
  deliverables: string[];
  evidence: { id: string; name: string; recordedAt: string }[];
  comparison: {
    originalLabel: string;
    originalText: string;
    changedLabel: string;
    changedText: string;
    addedPhrases: string[];
    note: string;
  };
  results: { label: string; before?: string; after: string }[];
  resultDescription: string;
};

const channelNames = ["검색", "커뮤니티", "SNS", "뉴스", "블로그", "영상"];
const actionVerbs = ["대조", "보존", "분류", "확인", "요청", "관찰"];

function buildLegacyCaseStudy(note: CaseNote): CaseStudy {
  const seed = note.id;
  const firstHour = 8 + (seed % 7);
  const firstMinute = String((seed * 7) % 60).padStart(2, "0");
  const firstPublishedAt = `08.${String((seed % 24) + 1).padStart(2, "0")} ${String(firstHour).padStart(2, "0")}:${firstMinute}`;
  const relatedCount = 4 + (seed % 9);
  const rankedCount = 2 + (seed % 6);
  const durationDays = 7 + (seed % 15);
  const channels = note.channels.length ? note.channels : [channelNames[seed % channelNames.length]];
  const primaryChannel = channels[0];

  const actions = [
    { title: `${note.title} 관련 상위 노출 결과 보존`, description: `${primaryChannel}와 검색 결과에서 확인된 URL, 게시 시각, 노출 위치를 동일한 기준으로 기록했습니다.` },
    { title: `최초 게시물과 재게시 ${relatedCount}건 문장 대조`, description: `제목과 본문에서 반복된 표현을 분리하고 최초 작성 내용에 없던 문구를 표시했습니다.` },
    { title: `확인 가능한 내부 자료와 주장 비교`, description: `${note.category} 업무 기록과 공개 자료를 기준으로 게시물의 주장별 확인 범위를 정리했습니다.` },
    { title: `채널 운영자에게 정정 또는 삭제 요청`, description: `원문 캡처와 확인 자료를 첨부해 명확히 다른 표현만 선별하여 요청했습니다.` },
    { title: `안내문 게시 후 ${durationDays}일간 검색 결과 재확인`, description: `공식 안내 이후 같은 문구의 재노출과 상위 검색 결과 변화를 날짜별로 기록했습니다.` },
  ];

  const evidence = [
    { id: `EVD-${String(seed).padStart(3, "0")}-01`, name: "최초 게시물 전체 캡처", recordedAt: firstPublishedAt },
    { id: `EVD-${String(seed).padStart(3, "0")}-02`, name: `재게시 ${relatedCount}건 비교표`, recordedAt: `08.${String((seed % 24) + 1).padStart(2, "0")} 13:20` },
    { id: `DOC-${String(seed).padStart(3, "0")}`, name: `${note.category} 확인 자료`, recordedAt: "고객 제공" },
    { id: `LOG-${String(seed).padStart(3, "0")}`, name: "정정·삭제 요청 및 회신 기록", recordedAt: "접수 완료" },
  ];

  return {
    ...note,
    industry: note.category,
    clientLabel: `${note.category} 고객 ${String.fromCharCode(65 + (seed % 5))}`,
    duration: `${durationDays}일`,
    summary: `${note.issue}이 반복 노출된 상황에서 원문과 확산 경로를 확인하고 필요한 조치만 진행한 사례입니다.`,
    situation: {
      headline: `처음 게시된 표현보다 강한 문장이 붙으며 같은 내용이 여러 채널로 이어졌습니다.`,
      description: `최초 게시물은 단일 경험이나 질문을 담고 있었지만 재게시 과정에서 단정적인 표현이 추가됐습니다. ${primaryChannel}을 시작으로 관련 문장이 반복되며 ${note.title} 이슈가 검색 결과까지 연결됐습니다.`,
      firstPublishedAt,
      metrics: [
        { label: "관련 게시", value: `${relatedCount}건` },
        { label: "상위 10위 노출", value: `${rankedCount}건` },
        { label: "확인 채널", value: `${Math.min(5, channels.length + 2)}개` },
      ],
      spreadEvents: [0, 1, 2, 3].map((offset) => ({
        channel: channelNames[(seed + offset) % channelNames.length],
        time: `${String(firstHour + offset).padStart(2, "0")}:${String((Number(firstMinute) + offset * 13) % 60).padStart(2, "0")}`,
        description: offset === 0 ? "최초 게시 확인" : offset === 1 ? "유사 제목 재게시" : offset === 2 ? "댓글 인용 확산" : "검색 결과 노출 확인",
      })),
    },
    actions: actions.map((action, index) => ({ ...action, title: `${String(index + 1).padStart(2, "0")} ${action.title}`, description: `${action.description} (${actionVerbs[(seed + index) % actionVerbs.length]} 기준)` })),
    deliverables: ["원문·재게시 비교표", "채널별 URL 기록", "정정 요청 내역", `${durationDays}일 모니터링 기록`],
    evidence,
    comparison: {
      originalLabel: "최초 게시물",
      originalText: `${note.title}과 관련해 실제 이용 과정에서 확인이 필요하다는 의견이 게시됐습니다.`,
      changedLabel: "재게시 문장",
      changedText: `${note.title}은 문제가 확인된 사례이며 주의가 필요하다는 단정적인 문장으로 바뀌었습니다.`,
      addedPhrases: ["문제가 확인된", "주의가 필요한"],
      note: "추가된 표현은 최초 게시물과 고객 제공 자료에서 동일하게 확인되지 않았습니다.",
    },
    results: [
      { label: "정정·삭제 요청", before: `${relatedCount}건 확인`, after: `${Math.max(1, relatedCount - 3)}건 처리` },
      { label: "작성자 수정", before: "단정 표현 포함", after: `${1 + (seed % 3)}건 문구 수정` },
      { label: "상위 10위 노출", before: `${rankedCount}건`, after: `${Math.max(0, rankedCount - 3)}건` },
      { label: "후속 확인", before: "수시 확인", after: `${durationDays}일 기록 완료` },
    ],
    resultDescription: `삭제 여부만으로 종료하지 않고 남아 있는 게시물과 검색 노출 위치를 다시 확인했습니다. 처리되지 않은 내용은 사실관계와 요청 근거가 부족한 항목으로 분리해 무리한 조치를 진행하지 않았습니다.`,
  };
}

type DetailProfile = {
  client: string;
  channels: string[];
  focus: string;
  verification: string;
  notice: string;
  records: string[];
  steps: { title: string; description: string }[];
  original: string;
  changed: string;
  phrases: string[];
};

const detailProfiles: Record<string, DetailProfile> = {
  medical: {
    client: "의료기관",
    channels: ["검색", "후기", "커뮤니티", "SNS"],
    focus: "진료 정보와 개인정보가 섞인 후기",
    verification: "익명화한 예약·상담 기록, 진료일자, 공개 가능한 안내 기준",
    notice: "진료 범위와 상담 절차를 설명하는 공식 안내",
    records: ["익명화 상담·예약 확인표", "게시물별 개인정보 포함 여부", "플랫폼 신고 접수 화면", "후속 검색 기록"],
    steps: [
      { title: "후기와 상담 기록의 날짜·표현을 대조", description: "게시물에 적힌 방문 시점과 상담 기록을 익명화해 대조하고, 확인 가능한 사실과 의견을 분리했습니다." },
      { title: "개인정보와 비방성 표현을 분리", description: "환자 정보가 포함된 부분은 즉시 보존한 뒤 별도 신고하고, 단순 만족도 표현은 대응 대상에서 제외했습니다." },
      { title: "의료광고 기준에 맞춰 요청 범위 작성", description: "치료 결과를 단정하거나 확인되지 않은 시술 내용을 담은 문장만 URL 단위로 정리해 플랫폼에 요청했습니다." },
    ],
    original: "진료를 받았는데 설명 없이 문제가 생겼다는 글이 반복 노출되었습니다.",
    changed: "확인되지 않은 치료 결과와 개인정보가 함께 적힌 문장이 재게시 과정에서 추가되었습니다.",
    phrases: ["확인되지 않은 치료 결과", "개인정보"],
  },
  legal: {
    client: "법률 서비스",
    channels: ["검색", "커뮤니티", "SNS", "블로그"],
    focus: "사건 결과와 상담 내용을 왜곡한 게시물",
    verification: "공개 가능한 사건 정보, 상담 접수 로그, 사칭 계정의 식별 정보",
    notice: "상담 접수 및 공식 연락처를 안내하는 공지",
    records: ["공개 사건 정보 대조표", "상담 접수 로그 확인서", "사칭 계정 식별 캡처", "정정 요청 문안"],
    steps: [
      { title: "공개 사건 정보와 게시물 문장을 대조", description: "판결문이나 공개 결정문으로 확인 가능한 범위만 기준으로 삼고, 비공개 상담 내용은 별도로 보호했습니다." },
      { title: "사칭·광고성 계정의 연결 관계 확인", description: "프로필, 연락처, 외부 링크, 게시 시점을 기록해 공식 계정과 무관한 계정을 구분했습니다." },
      { title: "플랫폼별 신고 근거를 나눠 제출", description: "사칭, 명예훼손, 오인 가능 광고를 한 번에 묶지 않고 각 정책에 맞는 자료로 나누어 접수했습니다." },
    ],
    original: "상담 결과가 이미 정해져 있었다는 내용의 게시물이 검색 결과에 노출되었습니다.",
    changed: "확인할 수 없는 사건 결과와 담당자 실명이 결합된 문장으로 바뀌어 확산되었습니다.",
    phrases: ["확인할 수 없는 사건 결과", "담당자 실명"],
  },
  content: {
    client: "콘텐츠·엔터테인먼트",
    channels: ["영상", "SNS", "커뮤니티", "검색"],
    focus: "편집 영상과 맥락이 빠진 발언",
    verification: "원본 영상의 시간대, 게시 시점, 공식 공개 자료",
    notice: "전체 맥락과 확인 시점을 정리한 안내",
    records: ["원본 영상 타임코드", "편집본 비교 캡처", "재게시 채널 목록", "안내문 공개 이력"],
    steps: [
      { title: "원본 영상의 발언 구간을 타임코드로 고정", description: "짧은 클립이 잘라 낸 앞뒤 문장을 포함해 원본 구간을 보존하고, 편집본과 시간대를 맞췄습니다." },
      { title: "재게시 계정과 자막 변형을 분류", description: "동일 클립이라도 자막과 제목이 달라진 게시물을 따로 기록해 확산 경로를 확인했습니다." },
      { title: "오해를 만드는 구간만 우선 요청", description: "비판 자체가 아닌 허위 자막, 맥락을 뒤집는 편집, 사칭 제목 등 정책 위반 요소를 중심으로 요청했습니다." },
    ],
    original: "일부 발언만 잘린 영상이 공유되며 질문과 추측이 늘어났습니다.",
    changed: "원본에 없는 자막과 단정적인 제목이 더해져 사실처럼 소비되기 시작했습니다.",
    phrases: ["원본에 없는 자막", "단정적인 제목"],
  },
  digital: {
    client: "IT·플랫폼",
    channels: ["커뮤니티", "검색", "SNS", "앱 리뷰"],
    focus: "서비스 장애·보안 이슈에 관한 추정성 게시물",
    verification: "장애 공지, 상태 페이지, 접근 로그, 고객 안내 이력",
    notice: "영향 범위와 복구 현황을 단계별로 알리는 공지",
    records: ["상태 페이지 캡처", "공지 발행 시각", "사칭 링크 목록", "노출 추적 로그"],
    steps: [
      { title: "공식 장애 공지와 주장 범위를 대조", description: "실제 영향 시간, 기능 범위, 조치 현황을 기준으로 게시물이 확대 해석한 부분을 구분했습니다." },
      { title: "사칭 공지와 피싱 링크를 우선 차단", description: "공식 도메인과 다른 링크, 업데이트를 유도하는 메시지는 URL과 계정 단위로 보존해 신고했습니다." },
      { title: "고객이 확인할 경로를 하나로 정리", description: "상태 페이지와 FAQ 문구를 맞추고, 검색 결과에서 확인하기 쉬운 안내 링크를 함께 운영했습니다." },
    ],
    original: "일시적인 오류 화면 캡처가 공유되며 서비스 전체가 중단됐다는 글이 올라왔습니다.",
    changed: "확인되지 않은 유출 주장과 외부 링크가 붙으면서 보안 사고처럼 재확산되었습니다.",
    phrases: ["확인되지 않은 유출 주장", "외부 링크"],
  },
  commerce: {
    client: "브랜드·커머스",
    channels: ["후기", "검색", "SNS", "커뮤니티"],
    focus: "상품 정보와 주문 경험을 섞어 쓴 후기",
    verification: "주문·배송·반품 이력, 제품 표기, 고객 응대 기록",
    notice: "제품 정보와 고객 응대 기준을 정리한 안내",
    records: ["주문·배송 이력 확인표", "상품 표기 비교 화면", "후기 반복 계정 목록", "고객 안내문"],
    steps: [
      { title: "주문·배송·반품 이력을 분리 확인", description: "후기마다 주문번호와 배송 상태를 확인해 실제 구매 경험, 배송 이슈, 구매 이력 없는 게시물을 구분했습니다." },
      { title: "상품 고지와 과장된 표현을 대조", description: "상세 페이지의 성분·규격·배송 기준과 게시물 표현을 비교해 수정이 필요한 문장만 선별했습니다." },
      { title: "고객 응대와 플랫폼 요청을 병행", description: "실제 불편에는 답변과 보상 기준을 안내하고, 허위 정보와 반복 계정은 근거를 붙여 별도로 요청했습니다." },
    ],
    original: "배송 지연에 대한 개인 경험이 후기 게시판에 올라왔습니다.",
    changed: "제품 품질 전체가 문제라는 표현과 구매 이력 없는 계정의 댓글이 덧붙었습니다.",
    phrases: ["제품 품질 전체가 문제", "구매 이력 없는 계정"],
  },
  travel: {
    client: "여행·교육 서비스",
    channels: ["후기", "커뮤니티", "검색", "SNS"],
    focus: "이용 조건과 현장 사진이 다른 맥락으로 퍼진 게시물",
    verification: "예약 조건, 이용 일자, 현장 안내문, 고객 문의 이력",
    notice: "예약 조건과 이용 전 확인 사항을 정리한 안내",
    records: ["예약 조건 비교표", "현장 안내문", "사진 출처 확인 기록", "문의 응대 이력"],
    steps: [
      { title: "예약 조건과 이용 일자를 먼저 확인", description: "성수기·비수기, 상품 조건, 변경 공지 여부를 예약 기록과 함께 확인해 사실관계를 정리했습니다." },
      { title: "사진·영상의 촬영 시점과 출처를 확인", description: "오래된 사진이나 다른 시설 이미지를 현재 운영 정보처럼 사용한 게시물을 따로 분류했습니다." },
      { title: "이용자에게 필요한 정보부터 정정", description: "환불·이용 조건처럼 즉시 영향을 주는 내용은 공식 안내에서 먼저 명확히 하고, 나머지는 플랫폼 요청으로 진행했습니다." },
    ],
    original: "현장 이용 경험을 적은 후기가 공유되었습니다.",
    changed: "다른 시기의 사진과 확인되지 않은 운영 시간이 결합되어 현재 정보처럼 노출되었습니다.",
    phrases: ["다른 시기의 사진", "확인되지 않은 운영 시간"],
  },
  general: {
    client: "기업·전문 서비스",
    channels: ["검색", "커뮤니티", "SNS", "뉴스"],
    focus: "사실 확인 전 반복 노출된 문제 게시물",
    verification: "공개 자료, 내부 확인 기록, 게시물 URL과 게시 시각",
    notice: "확인된 사실과 문의 경로를 정리한 안내",
    records: ["게시물 URL·캡처 목록", "사실 확인 메모", "플랫폼 접수 내역", "검색 결과 추적표"],
    steps: [
      { title: "원문과 재게시물을 시간순으로 정리", description: "처음 게시된 글과 인용·복사된 글을 구분해, 어떤 표현이 어디서 추가됐는지 기록했습니다." },
      { title: "확인 가능한 자료 범위를 먼저 설정", description: "공개 가능한 자료와 보호해야 하는 정보를 나눈 뒤, 반박이 가능한 주장만 별도 대조했습니다." },
      { title: "요청·안내·모니터링을 분리 운영", description: "플랫폼 요청, 공식 안내, 잔여 노출 확인을 동시에 진행하되 각각의 기준과 기록을 분리했습니다." },
    ],
    original: "문제 제기 성격의 글이 하나의 채널에서 확인되었습니다.",
    changed: "확인되지 않은 단정 표현과 추정 문장이 반복 게시되며 검색 결과까지 이어졌습니다.",
    phrases: ["확인되지 않은 단정 표현", "추정 문장"],
  },
};

function getDetailProfile(slug: string) {
  if (/(medical|clinic|doctor|treatment|procedure)/.test(slug)) return detailProfiles.medical;
  if (/(lawfirm|attorney|legal|case-result)/.test(slug)) return detailProfiles.legal;
  if (/(artist|trainee|concert|creator|influencer|fan|streamer|clip|copyright)/.test(slug)) return detailProfiles.content;
  if (/(service|privacy|app|algorithm|game|account|update|outage)/.test(slug)) return detailProfiles.digital;
  if (/(travel|booking|facility|guide|academy|teacher|course|refund|package)/.test(slug)) return detailProfiles.travel;
  if (/(review|ingredient|product|seller|delivery|price|cosmetic|vehicle|dealer|factory|quality)/.test(slug)) return detailProfiles.commerce;
  return detailProfiles.general;
}

function detailTime(hour: number, minute: number, offset: number) {
  const total = hour * 60 + minute + offset;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export function buildCaseStudy(note: CaseNote): CaseStudy {
  const profile = getDetailProfile(note.slug);
  const seed = note.id;
  const hour = 8 + (seed % 5);
  const minute = (seed * 7) % 60;
  const day = String((seed % 24) + 1).padStart(2, "0");
  const firstPublishedAt = `2026.08.${day} ${detailTime(hour, minute, 0)}`;
  const relatedCount = 4 + (seed % 8);
  const rankedCount = 2 + (seed % 5);
  const durationDays = 10 + (seed % 12);
  const requestCount = 2 + (seed % 4);
  const topic = note.title;

  const actions = [
    { title: "원문·재게시 URL과 노출 위치 기록", description: `검색 결과와 ${profile.channels.slice(1, 3).join("·")}에서 확인한 URL ${relatedCount}건을 게시 시각, 계정, 제목 기준으로 정리했습니다.` },
    ...profile.steps,
    { title: "공식 안내 후 잔여 노출 재확인", description: `${profile.notice}를 공개한 뒤 ${durationDays}일 동안 같은 문구의 재노출, 수정 반영, 신규 게시 여부를 날짜별로 기록했습니다.` },
  ].map((step, index) => ({ ...step, title: `${String(index + 1).padStart(2, "0")} / ${step.title}` }));

  return {
    ...note,
    industry: profile.client,
    clientLabel: `${profile.client} · 익명 의뢰 ${String.fromCharCode(65 + (seed % 5))}`,
    duration: `${durationDays}일 모니터링`,
    summary: `${profile.focus}가 반복 노출된 상황에서, 확인 자료와 플랫폼 정책을 기준으로 대응 범위를 정리한 사례입니다.`,
    situation: {
      headline: "처음에는 하나의 게시물이었지만, 재게시 과정에서 확인되지 않은 표현이 더해졌습니다.",
      description: `${topic} 관련 글은 처음에는 개인의 경험 또는 질문에 가까웠습니다. 이후 제목과 댓글이 바뀌며 같은 내용이 여러 채널에 반복 노출됐고, COADS는 ${profile.verification}를 기준으로 대응이 필요한 문장만 추렸습니다.`,
      firstPublishedAt,
      metrics: [
        { label: "확인 URL", value: `${relatedCount}건` },
        { label: "상위 노출", value: `${rankedCount}건` },
        { label: "확인 채널", value: `${profile.channels.length}곳` },
      ],
      spreadEvents: profile.channels.map((channel, index) => ({
        channel,
        time: detailTime(hour, minute, index * 17),
        description: index === 0 ? "최초 게시물 확인" : index === 1 ? "유사 제목 재게시 확인" : index === 2 ? "댓글·인용 확산 확인" : "검색 결과 노출 확인",
      })),
    },
    actions,
    deliverables: ["원문·재게시 URL 목록", ...profile.records.slice(0, 3)],
    evidence: profile.records.map((name, index) => ({
      id: `${index === 0 ? "EVD" : index === 1 ? "LOG" : "DOC"}-${String(seed).padStart(3, "0")}-${String(index + 1).padStart(2, "0")}`,
      name,
      recordedAt: index === 0 ? firstPublishedAt : index === 1 ? `2026.08.${day} ${detailTime(hour, minute, 90)}` : index === 2 ? "의뢰 자료 대조" : "후속 기록 완료",
    })),
    comparison: {
      originalLabel: "최초 게시물",
      originalText: profile.original,
      changedLabel: "재게시 과정",
      changedText: profile.changed,
      addedPhrases: profile.phrases,
      note: "확인되지 않은 비판이나 의견까지 일괄 요청하지 않고, 플랫폼 기준을 충족하는 URL과 문장만 분리해 요청했습니다.",
    },
    results: [
      { label: "기록 완료", before: "산발적 캡처", after: `URL ${relatedCount}건 정리` },
      { label: "플랫폼 요청", before: "요청 근거 미분류", after: `${requestCount}건 접수` },
      { label: "공식 안내", before: "문의 경로 분산", after: "확인 경로 1곳 운영" },
      { label: "후속 확인", before: "재노출 미확인", after: `${durationDays}일 추적` },
    ],
    resultDescription: "삭제 여부만으로 종료하지 않았습니다. 요청 접수, 수정 반영, 남아 있는 검색 노출과 새로 생긴 재게시물을 같은 기록표에서 확인해, 추가 조치가 필요한 항목만 다음 대응으로 넘겼습니다.",
  };
}
