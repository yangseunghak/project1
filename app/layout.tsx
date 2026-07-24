import type { Metadata } from "next";
import "aos/dist/aos.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AosInit } from "@/components/AosInit";
import { ScrollTopButton } from "@/components/ScrollTopButton";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

export const metadata: Metadata = {
  title: {
    default: "COADS | Reputation Intelligence",
    template: "%s | COADS"
  },
  description: "COADS는 온라인 평판과 여론 리스크를 탐지, 분석, 증거화하고 대응 전략을 설계하는 디지털 리스크 인텔리전스 기업입니다.",
  openGraph: {
    title: "COADS | Digital Risk Management",
    description: "보이지 않는 온라인 위험을 가장 먼저 발견합니다.",
    type: "website",
    locale: "ko_KR"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <AosInit />
        <ScrollProgressBar />
        <Header />
        <main>{children}</main>
        <ScrollTopButton />
        <Footer />
      </body>
    </html>
  );
}
