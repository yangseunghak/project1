import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "온라인 평판 관리 사례",
  description: "온라인 모니터링, 허위정보 증거화, 검색 결과와 SNS 여론 회복 등 COADS의 익명화된 평판 리스크 대응 사례를 소개합니다.",
  alternates: { canonical: "/cases" },
  openGraph: { url: "/cases", title: "온라인 평판 관리 사례 | COADS", description: "고객명은 공개하지 않고 대응 구조와 판단 기준을 보여드립니다." }
};

export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
