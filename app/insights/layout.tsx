import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "평판 관리 인사이트",
  description: "온라인 이슈의 확산, 디지털 증거 수집, 검색 결과와 브랜드 신뢰, 위기 대응 신호를 COADS의 관점으로 정리합니다.",
  alternates: { canonical: "/insights" },
  openGraph: { url: "/insights", title: "평판 관리 인사이트 | COADS", description: "평판 리스크를 더 정확하게 판단하기 위한 실무 관점을 제공합니다." }
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
