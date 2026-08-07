import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { AboutHeroScroll } from "@/components/AboutHeroScroll";

export const metadata: Metadata = { title: "About COADS" };

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
