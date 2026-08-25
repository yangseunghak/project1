import type { Metadata } from "next";
import "aos/dist/aos.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AosInit } from "@/components/AosInit";
import { ScrollTopButton } from "@/components/ScrollTopButton";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://coads-homepage.vercel.app"),
  title: {
    default: "온라인 평판 관리 전문 솔루션 | COADS",
    template: "%s | COADS"
  },
  description: "COADS는 온라인 평판과 여론 리스크를 탐지, 분석, 증거화하고 대응 전략을 설계하는 디지털 리스크 인텔리전스 기업입니다.",
  applicationName: "COADS",
  authors: [{ name: "COADS", url: "https://coads-homepage.vercel.app" }],
  creator: "COADS",
  publisher: "COADS",
  category: "온라인 평판 관리",
  alternates: {
    canonical: "/"
  },
  verification: {
    google: "pvUvVmt-Yxn-diECw3B2sGknSQpnteSAY5WlY21i2IA",
    other: {
      "naver-site-verification": "3c9121780bbd60e4d33a17dd4ef19534aab641a9"
    }
  },
  openGraph: {
    title: "온라인 평판 관리 전문 솔루션 | COADS",
    description: "온라인 평판과 여론 리스크를 조기에 발견하고 분석, 증거화, 대응 전략까지 설계합니다.",
    url: "/",
    siteName: "COADS",
    type: "website",
    locale: "ko_KR"
  },
  twitter: {
    card: "summary_large_image",
    title: "온라인 평판 관리 전문 솔루션 | COADS",
    description: "온라인 평판과 여론 리스크를 조기에 발견하고 대응 구조를 설계합니다."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://coads-homepage.vercel.app/#organization",
      name: "COADS",
      url: "https://coads-homepage.vercel.app/",
      logo: "https://coads-homepage.vercel.app/logo/coads-logo.png",
      description: "온라인 평판과 여론 리스크를 탐지, 분석, 증거화하고 대응 전략을 설계하는 디지털 리스크 인텔리전스 기업입니다.",
      email: "newsamchang@gmail.com",
      telephone: "+82-10-8018-2030",
      address: {
        "@type": "PostalAddress",
        streetAddress: "동부순환로 261 458호",
        addressLocality: "원주시",
        addressRegion: "강원특별자치도",
        addressCountry: "KR"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://coads-homepage.vercel.app/#website",
      url: "https://coads-homepage.vercel.app/",
      name: "COADS",
      inLanguage: "ko-KR",
      publisher: { "@id": "https://coads-homepage.vercel.app/#organization" }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
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
