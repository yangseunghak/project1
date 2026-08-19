import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  FileSearch,
  Files,
  GitBranch,
  ListFilter,
  ScanSearch,
} from "lucide-react";
import type { CaseNote } from "@/data/caseNotes";
import type { CaseStudy } from "@/data/caseStudyDetails";

type CaseNavigationProps = {
  previous: CaseNote | null;
  next: CaseNote | null;
};

const actionIcons = [Files, FileSearch, GitBranch, ScanSearch, ClipboardCheck, ListFilter];

function CaseLabel({ children }: { children: React.ReactNode }) {
  return <p className="case-report-label">{children}</p>;
}

function CaseRadar() {
  const spokes = Array.from({ length: 8 });
  const rings = [56, 108, 160, 212];

  return (
    <svg className="case-report-radar" viewBox="0 0 520 520" aria-hidden="true">
      <g className="case-report-radar-grid">
        {rings.map((radius) => <circle key={radius} cx="260" cy="260" r={radius} />)}
        {spokes.map((_, index) => <line key={index} x1="260" y1="260" x2="260" y2="48" transform={`rotate(${index * 45} 260 260)`} />)}
      </g>
      <g className="case-report-radar-signal"><circle cx="260" cy="260" r="32" /><circle cx="260" cy="260" r="14" /></g>
      <g className="case-report-radar-points"><circle cx="109" cy="139" r="3" /><circle cx="142" cy="343" r="2.5" /><circle cx="364" cy="106" r="2.5" /><circle cx="415" cy="192" r="3" /><circle cx="392" cy="370" r="2.5" /><circle cx="206" cy="415" r="2.5" /></g>
    </svg>
  );
}

function numberWithSuffix(value: number, suffix = "") {
  return `${value.toLocaleString("ko-KR")}${suffix}`;
}

function reduction(before: number, after: number) {
  return Math.round(((before - after) / before) * 100);
}

function linePath(values: number[]) {
  const high = Math.max(...values);
  const low = Math.min(...values);
  const range = Math.max(high - low, 1);
  return values.map((value, index) => {
    const x = 42 + (616 / Math.max(values.length - 1, 1)) * index;
    const y = 34 + ((high - value) / range) * 156;
    return `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightedCopy({ copy, phrases }: { copy: string; phrases: string[] }) {
  if (!phrases.length) return <>{copy}</>;
  const matcher = new RegExp(`(${phrases.map(escapeRegExp).join("|")})`, "g");
  return <>{copy.split(matcher).map((part, index) => phrases.includes(part) ? <mark key={`${part}-${index}`}>{part}</mark> : part)}</>;
}

export function CaseDetailHero({ study }: { study: CaseStudy }) {
  const report = study.report;
  return (
    <section className="case-report-hero" aria-labelledby="case-report-title">
      <div className="case-report-shell case-report-hero-grid">
        <div className="case-report-hero-copy">
          <CaseLabel>CASE {String(study.id).padStart(2, "0")}</CaseLabel>
          <h1 id="case-report-title" data-case-reveal>{report.title}</h1>
          <p className="case-report-hero-category" data-case-reveal>{report.englishCategory}</p>
          <p className="case-report-hero-flow" data-case-reveal><span>발생</span><b>→</b><span>확산</span><b>→</b><span>확인과 대응</span><b>→</b><span>변화</span></p>
        </div>
        <div className="case-report-radar-wrap" data-case-reveal><CaseRadar /></div>
      </div>
      <span className="case-report-scroll-cue" aria-hidden="true">SCROLL<i /></span>
    </section>
  );
}

function overviewMetrics(study: CaseStudy) {
  const { metrics } = study.report;
  return [
    { label: "모니터링 기간", value: metrics.period },
    { label: "확산 규모", value: metrics.spread },
    { label: "대응 결과", value: metrics.outcome },
  ];
}

export function CaseOverview({ study }: { study: CaseStudy }) {
  const report = study.report;
  return (
    <section className="case-report-overview" aria-labelledby="case-overview-title">
      <div className="case-report-shell">
        <div className="case-report-overview-top">
          <div><CaseLabel>OVERVIEW</CaseLabel><h2 id="case-overview-title">{report.overview}</h2></div>
          <dl className="case-report-overview-notes">
            <div><dt>의뢰인 유형</dt><dd>{report.clientType}</dd></div>
            <div><dt>발생 사건</dt><dd>{report.incident}</dd></div>
            <div><dt>주요 확산 경로</dt><dd>{report.spread.path.join(" → ")}</dd></div>
          </dl>
        </div>
        <div className="case-report-overview-metrics" aria-label="사례 핵심 지표">{overviewMetrics(study).map((metric) => <article key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></article>)}</div>
      </div>
    </section>
  );
}

function StageHeading({ number, title, copy }: { number: string; title: string; copy: string }) {
  return <div className="case-report-stage-heading"><b>{number}</b><h2>{title}</h2><p>{copy}</p></div>;
}

function CaseOccurrence({ study }: { study: CaseStudy }) {
  const { firstPost, repost, changedClaims } = study.report;
  return (
    <section className="case-report-stage case-report-stage--occurrence" aria-labelledby="case-occurrence-title">
      <div className="case-report-shell case-report-stage-grid">
        <StageHeading number="01" title="발생" copy="최초 게시물과 재유포 게시물을 시간·채널·문장 기준으로 대조했습니다." />
        <div className="case-report-occurrence-board">
          <div className="case-report-post-compare">
            <article className="case-report-origin-post"><span>ORIGINAL POST</span><p>“{firstPost.content}”</p><small>{firstPost.detectedAt} · {firstPost.channel} · {firstPost.type}</small></article>
            <i className="case-report-post-arrow" aria-hidden="true">→</i>
            <article className="case-report-origin-post is-repost"><span>REPOST</span><p>“<HighlightedCopy copy={repost.content} phrases={changedClaims} />”</p><small>{repost.detectedAt} · {repost.channel}</small></article>
          </div>
          <dl className="case-report-origin-facts">
            <div><dt>최초 게시</dt><dd>{firstPost.detectedAt}</dd></div>
            <div><dt>최초 채널</dt><dd>{firstPost.channel}</dd></div>
            <div><dt>재유포에서 강화된 표현</dt><dd>{changedClaims.slice(0, 2).join(" · ")}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

export function CaseEvidenceMap({ study }: { study: CaseStudy }) {
  const { spread, changedClaims } = study.report;
  return (
    <section className="case-report-stage case-report-stage--spread" aria-labelledby="case-spread-title">
      <div className="case-report-shell case-report-stage-grid">
        <StageHeading number="02" title="확산" copy="어느 채널에서 다음 채널로 이어졌는지와 표현 변화를 함께 기록했습니다." />
        <div className="case-report-spread-board">
          <div className="case-report-spread-path" aria-label="주요 확산 경로">{spread.path.map((channel, index) => <span key={`${channel}-${index}`}>{channel}{index < spread.path.length - 1 && <b aria-hidden="true">→</b>}</span>)}</div>
          <ol className="case-report-spread-log">{spread.timeline.map((event, index) => <li key={`${event.time}-${event.description}`}><b>{String(index + 1).padStart(2, "0")}</b><span>{event.time}</span><i /><strong>{event.description}</strong></li>)}</ol>
          <aside className="case-report-keywords"><span>재유포 과정에서 추가·강화된 표현</span>{changedClaims.map((claim) => <b key={claim}>#{claim}</b>)}</aside>
        </div>
      </div>
    </section>
  );
}

export function CaseResponseChart({ study }: { study: CaseStudy }) {
  const { actionLog, evidence, changedClaims } = study.report;
  return (
    <section className="case-report-stage case-report-stage--response" aria-labelledby="case-response-title">
      <div className="case-report-shell case-report-stage-grid">
        <StageHeading number="03" title="확인과 대응" copy="확보한 자료, 확인한 사실관계, 날짜별 조치 내용을 분리해 남겼습니다." />
        <div className="case-report-response-board">
          <div className="case-report-evidence-ledger">
            <div className="case-report-graph-label"><span>확보·확인 자료</span><b>EVIDENCE</b></div>
            <div className="case-report-evidence-columns">
              <article><b>확보 자료</b><ul>{evidence.map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article><b>분리한 표현</b><ul>{changedClaims.map((claim) => <li key={claim}>{claim}</li>)}</ul></article>
            </div>
          </div>
          <ol className="case-report-decision-log">{actionLog.map((entry) => <li key={`${entry.date}-${entry.title}`}><b>{entry.date}</b><strong>{entry.title}</strong><span>{entry.items.join(" · ")}</span></li>)}</ol>
        </div>
      </div>
    </section>
  );
}

function CaseChange({ study }: { study: CaseStudy }) {
  const { chart } = study.report;
  const metrics = [chart.negative, chart.highRisk, chart.official, chart.faq];
  return (
    <section className="case-report-stage case-report-stage--change" aria-labelledby="case-change-title">
      <div className="case-report-shell case-report-stage-grid">
        <StageHeading number="04" title="변화" copy="대응 전후의 언급량·고위험 재유포·검색 노출 변화를 같은 기준으로 비교했습니다." />
        <div className="case-report-change-board">
          <div className="case-report-change-graph" role="img" aria-label="부정 언급과 고위험 재유포의 기간별 변화">
            <div className="case-report-graph-label"><span>주차별 변화</span><b>BEFORE → AFTER</b></div>
            <svg viewBox="0 0 700 250" aria-hidden="true"><path className="case-report-chart-grid" d="M40 30H670M40 87H670M40 144H670M40 201H670" /><path className="case-report-chart-line is-muted" d={linePath(chart.negativeSeries)} /><path className="case-report-chart-line is-orange" d={linePath(chart.highRiskSeries)} /></svg>
            <div className="case-report-graph-legend"><span>부정 언급</span><span>고위험 재유포</span><span>1주차</span><span>4주차</span></div>
          </div>
          <div className="case-report-change-results">{metrics.map((metric) => <article key={metric.label}><span>{metric.label}</span><small>{numberWithSuffix(metric.before, metric.suffix)}</small><strong>{numberWithSuffix(metric.after, metric.suffix)} <em>{metric.before > metric.after ? `(${reduction(metric.before, metric.after)}% 감소)` : `(${metric.after - metric.before}%p 증가)`}</em></strong></article>)}</div>
        </div>
      </div>
    </section>
  );
}

export function CaseTimeline({ study }: { study: CaseStudy }) {
  return <div className="case-report-timeline"><CaseOccurrence study={study} /><CaseEvidenceMap study={study} /><CaseResponseChart study={study} /><CaseChange study={study} /></div>;
}

export function CoadsResponse({ study }: { study: CaseStudy }) {
  return (
    <section className="case-report-method" aria-labelledby="case-actions-title">
      <div className="case-report-shell">
        <CaseLabel>CASE ACTIONS</CaseLabel>
        <h2 id="case-actions-title">이 사례에서 실제로 한 일</h2>
        <div className="case-report-method-grid">{study.report.actionSteps.map((step, index) => {
          const Icon = actionIcons[index % actionIcons.length];
          return <article key={step.title}><Icon aria-hidden="true" size={26} strokeWidth={1.4} /><span>{step.title}</span><p>{step.items.join(" · ")}</p>{index < study.report.actionSteps.length - 1 && <b aria-hidden="true">→</b>}</article>;
        })}</div>
      </div>
    </section>
  );
}

export function CaseResult({ study }: { study: CaseStudy }) {
  const { chart, resultText } = study.report;
  const highlight = `${reduction(chart.negative.before, chart.negative.after)}%`;
  return (
    <section className="case-report-result" aria-labelledby="case-result-title">
      <div className="case-report-shell case-report-result-grid">
        <div><CaseLabel>RESULT</CaseLabel><h2 id="case-result-title">{resultText}</h2></div>
        <div className="case-report-result-highlight"><strong>{highlight}</strong><span>{chart.negative.label} 감소</span></div>
        <div className="case-report-result-summary"><span>대응 전후 기록</span><p>원문과 재유포 글을 구분한 뒤, 게시물·검색 결과·안내 페이지 변화를 같은 기간에 확인했습니다.</p><ul><li>{chart.negative.label}: {numberWithSuffix(chart.negative.before, chart.negative.suffix)} → {numberWithSuffix(chart.negative.after, chart.negative.suffix)}</li><li>{chart.official.label}: {numberWithSuffix(chart.official.before, chart.official.suffix)} → {numberWithSuffix(chart.official.after, chart.official.suffix)}</li><li>{chart.faq.label}: {numberWithSuffix(chart.faq.before, chart.faq.suffix)} → {numberWithSuffix(chart.faq.after, chart.faq.suffix)}</li></ul></div>
      </div>
    </section>
  );
}

export function CaseNavigation({ previous, next }: CaseNavigationProps) {
  return (
    <nav className="case-report-navigation" aria-label="사례 연구 이동">
      <div className="case-report-shell">
        {previous ? <Link href={`/cases/${previous.slug}`}><ArrowLeft size={20} aria-hidden="true" /><span>PREVIOUS CASE</span><strong>{previous.title}</strong></Link> : <div className="is-empty"><span>PREVIOUS CASE</span><strong>첫 번째 사례입니다.</strong></div>}
        <Link className="case-report-index-link" href="/cases">CASE ARCHIVE</Link>
        {next ? <Link href={`/cases/${next.slug}`}><span>NEXT CASE</span><strong>{next.title}</strong><ArrowRight size={20} aria-hidden="true" /></Link> : <div className="is-empty"><span>NEXT CASE</span><strong>마지막 사례입니다.</strong></div>}
      </div>
    </nav>
  );
}
