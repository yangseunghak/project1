import {
  Archive,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  FileSearch,
  LineChart,
  LockKeyhole,
  Megaphone,
  MessageSquareWarning,
  Newspaper,
  Search,
  ShieldCheck,
  Stethoscope,
  UsersRound,
  Video
} from "lucide-react";

export const navItems = [
  { href: "/about", label: "회사소개" },
  { href: "/services", label: "서비스" },
  { href: "/solutions", label: "솔루션" },
  { href: "/cases", label: "사례연구" },
  { href: "/insights", label: "인사이트" }
];

export const capabilities = [
  "24/7 디지털 모니터링",
  "멀티채널 분석",
  "증거 기반 리포팅",
  "기밀 대응 체계"
];

export const riskFlow = [
  "작은 게시물 발생",
  "커뮤니티 확산",
  "검색 결과 노출",
  "뉴스 및 SNS 전파",
  "브랜드 신뢰 하락"
];

export const services = [
  {
    slug: "monitoring",
    number: "01",
    title: "상시 모니터링",
    keyword: "MONITORING",
    summary: "온라인 채널의 언급과 이상 징후를 지속적으로 감지합니다.",
    problem: "이슈는 여러 채널에서 작은 강도로 시작되어, 담당자가 인지하기 전에 검색과 SNS로 확장됩니다.",
    method: "포털, 뉴스, 커뮤니티, 블로그, 영상 플랫폼의 언급 흐름을 기준별로 관찰하고 이상 징후를 분류합니다.",
    output: "일일 모니터링 로그, 위험 알림 목록, 채널별 언급 변화, 초기 경보 리포트",
    process: "채널 정의 - 키워드 설정 - 언급 수집 - 위험 분류 - 담당자 공유",
    icon: Search
  },
  {
    slug: "analysis",
    number: "02",
    title: "여론·리스크 분석",
    keyword: "ANALYSIS",
    summary: "키워드, 감성, 확산 경로, 영향도를 기준으로 위험 수준을 분석합니다.",
    problem: "언급량만으로는 실제 위험도를 판단하기 어렵고 대응 우선순위가 흔들릴 수 있습니다.",
    method: "문맥, 감성, 반복 키워드, 확산 패턴, 검색 노출 가능성을 결합해 사건 단위로 분석합니다.",
    output: "리스크 등급, 확산 경로 지도, 키워드 클러스터, 대응 우선순위",
    process: "데이터 정제 - 문맥 검토 - 확산 분석 - 영향도 평가 - 전략 제안",
    icon: BarChart3
  },
  {
    slug: "archive",
    number: "03",
    title: "디지털 증거 아카이빙",
    keyword: "EVIDENCE",
    summary: "게시물, 댓글, 영상, 검색 결과를 체계적으로 수집하고 보존합니다.",
    problem: "온라인 자료는 빠르게 수정되거나 삭제되어, 추후 대응에 필요한 근거가 사라질 수 있습니다.",
    method: "출처, 시점, 화면, 원문, 연결 맥락을 함께 기록해 검색 가능한 증거 묶음으로 보존합니다.",
    output: "증거 목록, 화면 캡처 기준 URL 로그, 변경 이력, 검토 메모",
    process: "대상 선정 - 원문 보존 - 메타데이터 기록 - 검수 - 안전 보관",
    icon: Archive
  },
  {
    slug: "response",
    number: "04",
    title: "위기 대응 전략",
    keyword: "RESPONSE",
    summary: "사건의 성격과 확산 단계에 따라 실행 가능한 대응 전략을 설계합니다.",
    problem: "감정적이거나 늦은 대응은 여론을 악화시키고 내부 의사결정을 지연시킬 수 있습니다.",
    method: "리스크 등급, 이해관계자, 법무·PR 연계 가능성, 커뮤니케이션 톤을 종합해 대응안을 설계합니다.",
    output: "상황 브리프, 대응 시나리오, 메시지 원칙, 실행 체크리스트",
    process: "상황 정의 - 우선순위 결정 - 메시지 설계 - 파트너 연계 - 사후 평가",
    icon: ShieldCheck
  },
  {
    slug: "recovery",
    number: "05",
    title: "평판 회복 관리",
    keyword: "RECOVERY",
    summary: "위기 이후 검색 결과와 여론 흐름이 안정화되도록 장기 관리 체계를 제공합니다.",
    problem: "위기가 종료된 뒤에도 검색 결과, 추천 콘텐츠, 커뮤니티 기록은 장기간 영향을 줄 수 있습니다.",
    method: "검색 노출 상태, 브랜드 신뢰 신호, 신규 콘텐츠 흐름을 평가해 회복 로드맵을 수립합니다.",
    output: "회복 진단 리포트, 콘텐츠 방향성, 검색 결과 평가, 정기 추적 리포트",
    process: "기존 리스크 평가 - 회복 목표 설정 - 실행 관리 - 정기 평가",
    icon: LineChart
  },
  {
    slug: "reporting",
    number: "06",
    title: "정기 리포팅",
    keyword: "REPORTING",
    summary: "경영진과 실무자가 같은 기준으로 판단할 수 있는 리스크 리포트를 제공합니다.",
    problem: "담당자별 보고 방식이 다르면 이슈의 규모와 대응 필요성을 일관되게 판단하기 어렵습니다.",
    method: "핵심 지표와 원문 근거를 함께 정리해 의사결정자가 빠르게 파악할 수 있는 구조로 제공합니다.",
    output: "월간 리스크 리포트, 이슈 타임라인, 증거 인덱스, 권고 사항",
    process: "지표 정리 - 원문 검토 - 근거 첨부 - 리포트 작성 - 브리핑",
    icon: FileSearch
  }
];

export const processSteps = [
  ["01", "Detect", "이상 신호와 언급 패턴을 빠르게 발견합니다."],
  ["02", "Verify", "출처와 맥락을 확인해 실제 위험 여부를 검증합니다."],
  ["03", "Analyze", "확산 경로, 감성, 영향도를 기준으로 위험 수준을 판단합니다."],
  ["04", "Archive", "대응에 필요한 디지털 증거를 체계적으로 보존합니다."],
  ["05", "Respond", "법무, PR, 운영 관점의 실행 우선순위를 설계합니다."],
  ["06", "Recover", "이슈 이후의 평판 흐름과 검색 노출을 지속 관리합니다."]
];

export const audiences = [
  { title: "기업 및 브랜드", body: "제품, 서비스, 캠페인과 관련된 온라인 여론 변화를 조기에 파악합니다.", icon: Building2 },
  { title: "공공기관 및 협회", body: "공적 신뢰와 이해관계자 커뮤니케이션에 영향을 주는 이슈를 관리합니다.", icon: UsersRound },
  { title: "법무·전문 서비스 조직", body: "분쟁, 허위정보, 명예 리스크와 관련된 자료를 구조화합니다.", icon: BriefcaseBusiness },
  { title: "병원 및 의료기관", body: "민감한 위기, 검색 결과, 커뮤니티 반응을 신중하게 분석합니다.", icon: Stethoscope },
  { title: "경영진 및 전문직 종사자", body: "개인 평판과 조직 신뢰가 연결되는 리스크를 정밀하게 평가합니다.", icon: LockKeyhole },
  { title: "엔터테인먼트·크리에이터", body: "영상 플랫폼과 팬 커뮤니티의 이슈 확산 흐름을 관찰합니다.", icon: Video }
];

export const solutions = [
  { slug: "enterprise", title: "기업·브랜드", name: "기업 평판 리스크 관리", problem: "제품, 캠페인, 서비스 이슈가 여러 채널에서 동시에 해석됩니다.", response: "채널별 언급 흐름과 핵심 쟁점을 분리해 대응 우선순위를 제안합니다.", effect: "의사결정자가 같은 기준으로 리스크를 판단할 수 있습니다." },
  { slug: "early-detection", title: "기관·협회", name: "브랜드 이슈 조기 탐지", problem: "작은 민원과 커뮤니티 반응이 검색 결과로 확산될 수 있습니다.", response: "초기 언급의 출처, 반복성, 확산 가능성을 빠르게 평가합니다.", effect: "불필요한 확산 전에 대응 가능성을 확보합니다." },
  { slug: "malicious-content", title: "법무·전문 서비스", name: "악성 콘텐츠 확산 분석", problem: "허위정보와 악성 콘텐츠가 복제되며 근거 추적이 어려워집니다.", response: "원문, 댓글, 검색 노출을 묶어 확산 구조를 분석합니다.", effect: "법무·PR 검토에 필요한 자료 체계를 갖출 수 있습니다." },
  { slug: "medical", title: "의료기관", name: "의료기관 평판 보호", problem: "민감한 표현과 환자 경험이 온라인 신뢰에 직접 영향을 미칩니다.", response: "사실관계와 감정 반응을 구분해 과열 대응을 줄이는 기준을 제공합니다.", effect: "환자 신뢰와 운영 리스크를 함께 고려할 수 있습니다." },
  { slug: "executive", title: "경영진·전문직", name: "개인 및 조직 평판 보호", problem: "개인 이슈가 조직 신뢰와 검색 결과에 연결될 수 있습니다.", response: "노출 경로와 이해관계자 영향을 분석해 비공개 대응안을 설계합니다.", effect: "민감한 사안을 안전하고 절제된 방식으로 관리합니다." },
  { slug: "content", title: "콘텐츠·엔터테인먼트", name: "플랫폼 이슈 모니터링", problem: "영상 댓글과 커뮤니티 반응은 빠른 속도로 재가공됩니다.", response: "영상 플랫폼과 커뮤니티 반응을 함께 추적해 맥락을 보존합니다.", effect: "콘텐츠 확산 흐름을 놓치지 않고 대응 자료를 확보합니다." }
];

export const cases = [
  { slug: "manufacturer-community-risk", category: "기업·브랜드", title: "제조기업 A사의 커뮤니티 이슈 조기 발견 및 확산 차단", industry: "제조", challenge: "제품 관련 오해가 특정 커뮤니티에서 반복적으로 재생산되고 있었습니다.", approach: "원문과 댓글 흐름을 분리하고 검색 노출 가능성이 높은 키워드를 추적했습니다.", result: "내부 대응 기준과 고객 커뮤니케이션 원칙을 빠르게 정리했습니다.", services: ["상시 모니터링", "여론·리스크 분석"] },
  { slug: "professional-false-information", category: "법무·전문 서비스", title: "전문 서비스 B사의 허위정보 증거화 및 대응 체계 구축", industry: "전문 서비스", challenge: "사실과 다른 게시물이 여러 플랫폼에 남아 지속 대응 근거가 필요했습니다.", approach: "출처, 시점, 화면, 댓글 맥락을 정리해 증거 인덱스를 구축했습니다.", result: "법무 검토와 커뮤니케이션 판단에 필요한 자료 흐름을 확보했습니다.", services: ["디지털 증거 아카이빙", "위기 대응 전략"] },
  { slug: "consumer-brand-recovery", category: "기업·브랜드", title: "소비재 브랜드 C사의 검색 결과와 SNS 여론 회복", industry: "소비재", challenge: "과거 이슈가 검색 결과와 SNS 추천 흐름에 반복 노출되고 있었습니다.", approach: "기존 리스크 키워드와 긍정 신뢰 신호의 노출 구조를 함께 분석했습니다.", result: "단기 대응과 장기 평판 회복 과제를 분리해 실행했습니다.", services: ["평판 회복 관리", "정기 리포팅"] },
  { slug: "content-platform-monitoring", category: "콘텐츠·엔터테인먼트", title: "콘텐츠 기업 D사의 영상 플랫폼 악성 반응 모니터링", industry: "콘텐츠", challenge: "영상 댓글과 커뮤니티 반응이 빠르게 확산되며 맥락이 사라지고 있었습니다.", approach: "영상, 댓글, 외부 게시물의 연결 관계를 시간대별로 기록했습니다.", result: "콘텐츠 대응 우선순위와 증거 보존 기준을 확보했습니다.", services: ["상시 모니터링", "디지털 증거 아카이빙"] }
];

export const insights = [
  { slug: "how-reputation-risk-spreads", category: "Risk", title: "온라인 평판 리스크는 어떻게 확산되는가", summary: "작은 언급이 검색, 커뮤니티, SNS, 뉴스로 이어지는 전환 지점을 살펴봅니다.", read: "8분" },
  { slug: "signals-before-crisis", category: "Monitoring", title: "위기 발생 전 확인해야 할 5가지 신호", summary: "반복 키워드, 댓글 속도, 감성 변화, 검색 노출, 외부 인용을 점검합니다.", read: "6분" },
  { slug: "evidence-archive-mistakes", category: "Evidence", title: "디지털 증거 수집에서 놓치기 쉬운 요소", summary: "화면 캡처만으로 부족한 이유와 메타데이터 보존의 중요성을 정리합니다.", read: "7분" },
  { slug: "search-results-and-trust", category: "Strategy", title: "검색 결과가 브랜드 신뢰에 미치는 영향", summary: "검색 화면의 첫인상이 의사결정에 미치는 영향을 평판 관리 관점에서 분석합니다.", read: "5분" }
];

export const partnerFields = ["Legal", "Public Relations", "Security", "Data Analysis", "Content Strategy"];

export const issueChannels = ["포털 검색", "뉴스", "커뮤니티", "SNS", "블로그", "영상 플랫폼", "기타"];
export const inquiryTypes = ["상시 모니터링", "긴급 이슈 대응", "증거 수집", "평판 분석", "평판 회복", "기타"];

export const channelIcons = [Newspaper, MessageSquareWarning, Megaphone, Search, BarChart3, Archive];
