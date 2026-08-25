import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { AboutHeroScroll } from "@/components/AboutHeroScroll";

export const metadata: Metadata = {
  title: "회사소개",
  description: "온라인 평판 리스크를 조기에 발견하고 판단 가능한 근거와 대응 구조를 만드는 COADS의 미션과 방향을 소개합니다.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "회사소개 | COADS", description: "COADS가 온라인 평판 리스크를 발견하고 대응하는 기준을 소개합니다." }
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <AboutHeroScroll />

      <section className="about-cta">
        <div className="container-wide about-cta-layout">
          <div>
            <p className="about-eyebrow">COADS</p>
            <h2>
              RISK RESPONSE
              <br />
              <strong>STARTS HERE.</strong>
            </h2>
          </div>
          <ButtonLink href="/COADS_회사소개서.pdf" variant="blue" download>회사 소개서 다운로드</ButtonLink>
        </div>
      </section>
    </main>
  );
}
