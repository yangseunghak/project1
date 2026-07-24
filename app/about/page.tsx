import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { AboutHeroScroll } from "@/components/AboutHeroScroll";

export const metadata: Metadata = { title: "About COADS" };

const principles = [
  ["01", "Accuracy", "추측보다 근거를 우선합니다.", "이슈의 출처, 맥락, 영향도를 분리해 확인 가능한 판단 기준을 만듭니다."],
  ["02", "Confidentiality", "민감한 정보는 더 신중하게 다룹니다.", "프로젝트의 모든 과정에서 정보 접근과 공유 범위를 명확하게 관리합니다."],
  ["03", "Professionalism", "대응은 실행 가능한 구조여야 합니다.", "분석 결과를 고객의 의사결정과 현장 대응으로 연결하는 데 집중합니다."]
];

const processSteps = [
  ["01", "Signal", "온라인 채널의 이상 신호를 포착합니다."],
  ["02", "Context", "출처와 확산 맥락을 검토합니다."],
  ["03", "Assessment", "영향도와 우선순위를 판단합니다."],
  ["04", "Response", "상황에 맞는 대응 구조를 설계합니다."]
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <AboutHeroScroll />

      <section className="about-statement">
        <div className="container-wide">
          <p className="about-eyebrow">OUR PERSPECTIVE</p>
          <h2>보이지 않는 위험을<br /><span>가장 먼저 읽는 일.</span></h2>
          <div className="about-statement-detail">
            <p>COADS는 디지털 환경에서 발생하는 온라인 이슈를 관찰하고, 사실과 추측을 구분합니다. 단순히 언급을 수집하는 데서 멈추지 않고, 위험이 어디서 시작되어 어떻게 확산되는지 파악합니다.</p>
            <p>분석 결과는 고객사가 바로 판단하고 움직일 수 있는 대응 체계로 연결됩니다.</p>
          </div>
        </div>
      </section>

      <section className="about-principles" aria-labelledby="principles-title">
        <div className="container-wide">
          <div className="about-section-heading">
            <p className="about-eyebrow">HOW WE WORK</p>
            <h2 id="principles-title">우리는 이렇게<br /><strong>판단합니다.</strong></h2>
          </div>
          <div className="about-principle-list">
            {principles.map(([number, label, title, body]) => (
              <article key={label} className="about-principle" data-aos="fade-up">
                <p>{number}</p>
                <div><span>{label}</span><h3>{title}</h3></div>
                <p className="about-principle-body">{body}</p>
                <ArrowUpRight aria-hidden />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-process" aria-labelledby="process-title">
        <div className="container-wide about-process-layout">
          <div className="about-section-heading">
            <p className="about-eyebrow">PROCESS</p>
            <h2 id="process-title">발견부터<br /><strong>대응까지.</strong></h2>
          </div>
          <div className="about-process-list">
            {processSteps.map(([number, label, body]) => (
              <article key={label} className="about-process-step">
                <span>{number}</span>
                <h3>{label}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container-wide about-cta-layout">
          <div>
            <p className="about-eyebrow">COADS</p>
            <h2>위험을 읽는 것에서<br />대응은 <strong>시작됩니다.</strong></h2>
          </div>
          <ButtonLink href="/contact" variant="blue">프로젝트 문의하기</ButtonLink>
        </div>
      </section>
    </main>
  );
}
