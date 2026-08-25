import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SearchSignalDemo } from "@/components/SearchSignalDemo";
import { ServiceProblemReveal } from "@/components/ServiceProblemReveal";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "온라인 평판 관리 서비스",
  description: "온라인 모니터링, 여론·리스크 분석, 디지털 증거 아카이빙, 위기 대응 전략, 평판 회복 관리 서비스를 제공합니다.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title: "온라인 평판 관리 서비스 | COADS", description: "탐지부터 분석, 증거화, 위기 대응까지 하나의 구조로 관리합니다." }
};

const reviewSignals = [
  ["01", "SEARCH", "검색 결과에서 반복되는 부정 키워드와 연관 콘텐츠를 확인합니다."],
  ["02", "REVIEW", "별점, 후기, 댓글의 감성 변화와 반복 이슈를 분류합니다."],
  ["03", "COMMUNITY", "커뮤니티와 SNS에서 이슈가 재가공되는 흐름을 추적합니다."],
  ["04", "RESPONSE", "근거와 위험도를 바탕으로 필요한 대응의 순서를 설계합니다."]
];

export default function ServicesPage() {
  return (
    <main className="coads-services-page">
      <SearchSignalDemo />

      <ServiceProblemReveal />

      <section className="services-page-signals">
        <div className="container-wide services-page-signal-list">
          {reviewSignals.map(([number, title, body]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-page-system">
        <div className="container-wide">
          <p className="services-page-section-label">COADS SYSTEM</p>
          <div className="services-page-system-heading">
            <h2>발견 이후까지<br /><strong>하나의 대응 구조로.</strong></h2>
            <p>알림만 전달하지 않습니다. 이슈의 출처와 확산 맥락, 보존해야 할 근거, 실행 순서를 하나의 흐름으로 정리합니다.</p>
          </div>
        </div>
      </section>

      <section className="services-page-process-section">
        <div className="container-wide">
          <p className="services-page-section-label">RESPONSE FLOW</p>
          <div className="services-page-process" role="list">
            <article role="listitem"><b>01</b><h3>DETECT</h3><p>위험 신호와 반복 언급을 빠르게 포착합니다.</p></article>
            <article role="listitem"><b>02</b><h3>VERIFY</h3><p>원문, 출처, 문맥을 확인해 실제 위험 여부를 검증합니다.</p></article>
            <article role="listitem"><b>03</b><h3>ARCHIVE</h3><p>변경되거나 사라질 수 있는 자료를 근거로 보존합니다.</p></article>
            <article role="listitem"><b>04</b><h3>RESPOND</h3><p>상황에 맞는 대응 방향과 실행 우선순위를 설계합니다.</p></article>
          </div>
        </div>
      </section>

      <section className="services-page-deliverables">
        <div className="container-wide services-page-deliverables-grid">
          <div>
            <p className="services-page-section-label">WHAT YOU RECEIVE</p>
            <h2>판단을 위한<br /><strong>근거를 남깁니다.</strong></h2>
          </div>
          <div className="services-page-deliverables-list">
            <article><span>01</span><div><h3>이슈 브리프</h3><p>현재 상황, 주요 채널, 위험도, 우선 확인 사항을 한 장의 판단 문서로 정리합니다.</p></div></article>
            <article><span>02</span><div><h3>증거 아카이브</h3><p>원문, 화면, URL, 시점과 변화 이력을 함께 보관해 검토 가능한 근거를 만듭니다.</p></div></article>
            <article><span>03</span><div><h3>대응 시나리오</h3><p>이슈의 단계와 이해관계자를 고려해 메시지와 실행 순서를 설계합니다.</p></div></article>
            <article><span>04</span><div><h3>정기 리포트</h3><p>여론 변화와 조치 현황을 같은 기준으로 공유할 수 있도록 정리합니다.</p></div></article>
          </div>
        </div>
      </section>

      <section className="services-page-catalog">
        <div className="container-wide">
          <div className="services-page-catalog-heading">
            <p className="services-page-section-label">SERVICE SCOPE</p>
            <h2>평판 리스크를<br />끝까지 관리합니다.</h2>
          </div>
          <div className="services-page-catalog-list">
            {services.map((service) => (
              <article key={service.slug}>
                <span>{service.number}</span>
                <div>
                  <p>{service.keyword}</p>
                  <h3>{service.title}</h3>
                </div>
                <p className="services-page-catalog-summary">{service.summary}</p>
                <ArrowUpRight size={26} strokeWidth={1.4} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-page-cta">
        <div className="container-wide services-page-cta-inner">
          <p>COADS / DIGITAL RISK RESPONSE</p>
          <h2>문제가 커지기 전,<br />판단의 기준을 만듭니다.</h2>
          <Link href="/contact" className="services-page-cta-link">무료 상담하기 <ArrowUpRight size={22} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
