import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "고객별 평판 리스크 솔루션",
  description: "기업, 기관, 전문직, 의료기관, 콘텐츠 조직의 상황에 맞춘 온라인 평판 리스크 대응 솔루션을 확인하세요.",
  alternates: { canonical: "/solutions" },
  openGraph: { url: "/solutions", title: "고객별 평판 리스크 솔루션 | COADS", description: "고객과 업종에 따라 다른 리스크 확산 경로와 대응 기준을 설계합니다." }
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
