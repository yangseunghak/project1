import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CaseDetailProgress } from "@/components/CaseDetailProgress";
import { CaseDetailStory } from "@/components/CaseDetailStory";
import { caseNotes } from "@/data/caseNotes";
import { buildCaseStudy } from "@/data/caseStudyDetails";

export function generateStaticParams() {
  return caseNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = caseNotes.find((item) => item.slug === slug);
  if (!note) return { title: "Case not found" };
  const study = buildCaseStudy(note);
  return { title: `${study.report.title} | COADS CASE NOTE`, description: study.report.overview };
}

async function LegacyCaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = caseNotes.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const study = buildCaseStudy(caseNotes[index]);
  const previous = caseNotes[(index - 1 + caseNotes.length) % caseNotes.length];
  const next = caseNotes[(index + 1) % caseNotes.length];

  return (
    <article className="case-study-detail" style={{ "--accent": study.accent } as React.CSSProperties}>
      <CaseDetailProgress />

      <header className="case-study-hero" data-case-section="1">
        <div className="case-study-hero-copy">
          <Link href="/cases" className="case-study-back"><ArrowLeft size={18} /> CASE ARCHIVE</Link>
          <p>COADS CASE NOTE / {String(study.id).padStart(2, "0")}</p>
          <h1>{study.title}</h1>
          <strong>{study.summary}</strong>
          <dl>
            <div><dt>CLIENT</dt><dd>{study.clientLabel}</dd></div>
            <div><dt>CHANNEL</dt><dd>{study.channels.join(" · ")}</dd></div>
            <div><dt>DURATION</dt><dd>{study.duration}</dd></div>
          </dl>
        </div>
        <div className={`case-study-search-window cover-${study.coverType}`}>
          <b>SEARCH RESULT / {String(study.id).padStart(2, "0")}</b>
          {[0, 1, 2].map((item) => <article key={item}><span>{study.situation.spreadEvents[item].channel}</span><strong>{item === 0 ? study.title : study.situation.spreadEvents[item].description}</strong><small>source.example.com/case/{study.id}-{item + 1}</small><time>{study.situation.spreadEvents[item].time}</time></article>)}
        </div>
        <div className="case-study-watermark" aria-hidden="true">{String(study.id).padStart(2, "0")}</div>
      </header>

      <section className="case-study-section case-study-situation" data-case-section="2">
        <div className="case-study-section-heading"><p>01 / 상황</p><h2>{study.situation.headline}</h2><span>{study.situation.description}</span></div>
        <div className="case-study-metrics">
          <article><small>최초 게시</small><strong>{study.situation.firstPublishedAt}</strong></article>
          {study.situation.metrics.map((metric) => <article key={metric.label}><small>{metric.label}</small><strong>{metric.value}</strong></article>)}
        </div>
        <div className="case-study-spread"><i />{study.situation.spreadEvents.map((event) => <article key={`${event.channel}-${event.time}`}><time>{event.time}</time><b>{event.channel}</b><span>{event.description}</span></article>)}</div>
      </section>

      <section className="case-study-section case-study-actions" data-case-section="3">
        <div className="case-study-section-heading"><p>02 / COADS가 한 일</p><h2>확인할 것과 실행할 것을 나눠 순서대로 처리했습니다.</h2></div>
        <div className="case-study-action-grid">
          <div>{study.actions.map((action) => <article key={action.title}><h3>{action.title}</h3><p>{action.description}</p></article>)}</div>
          <aside><small>제출 자료</small>{study.deliverables.map((item) => <span key={item}>{item}</span>)}</aside>
        </div>
      </section>

      <section className="case-study-section case-study-evidence" data-case-section="4">
        <div className="case-study-section-heading"><p>03 / 증빙 자료</p><h2>판단에 사용한 자료와 표현의 변화를 함께 기록했습니다.</h2></div>
        <div className="case-study-comparison">
          <article><small>{study.comparison.originalLabel}</small><p>{study.comparison.originalText}</p></article>
          <ArrowRight aria-hidden="true" />
          <article><small>{study.comparison.changedLabel}</small><p>{study.comparison.changedText.split(new RegExp(`(${study.comparison.addedPhrases.join("|")})`, "g")).map((part, i) => study.comparison.addedPhrases.includes(part) ? <mark key={i}>{part}</mark> : part)}</p></article>
        </div>
        <p className="case-study-evidence-note">{study.comparison.note}</p>
        <div className="case-study-evidence-list">{study.evidence.map((item) => <article key={item.id}><b>{item.id}</b><span>{item.name}</span><time>{item.recordedAt}</time></article>)}</div>
      </section>

      <section className="case-study-section case-study-results" data-case-section="5">
        <div className="case-study-section-heading"><p>04 / {study.duration}</p><h2>확인한 게시물과 남아 있는 노출을 다시 점검했습니다.</h2><span>{study.resultDescription}</span></div>
        <div className="case-study-result-grid">{study.results.map((result) => <article key={result.label}><small>{result.label}</small>{result.before && <del>{result.before}</del>}<strong>{result.after}</strong></article>)}</div>
      </section>

      <footer className="case-study-pagination">
        <Link href={`/cases/${previous.slug}`}><ArrowLeft /><small>PREVIOUS CASE</small><strong>{previous.title}</strong></Link>
        <Link href="/cases"><small>CASE ARCHIVE</small></Link>
        <Link href={`/cases/${next.slug}`}><small>NEXT CASE</small><strong>{next.title}</strong><ArrowRight /></Link>
      </footer>
    </article>
  );
}

async function LegacyEditorialCaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = caseNotes.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const study = buildCaseStudy(caseNotes[index]);
  const previous = caseNotes[(index - 1 + caseNotes.length) % caseNotes.length];
  const next = caseNotes[(index + 1) % caseNotes.length];

  return (
    <article className="case-study-detail case-study-detail--editorial" style={{ "--accent": study.accent } as React.CSSProperties}>
      <CaseDetailProgress />

      <header className="case-study-hero" data-case-section="1">
        <div className="case-study-hero-copy">
          <Link href="/cases" className="case-study-back"><ArrowLeft size={17} /> 사례 연구 아카이브</Link>
          <p>CASE STUDY / {String(study.id).padStart(2, "0")}</p>
          <h1>{study.title}</h1>
          <strong>{study.summary}</strong>
        </div>
        <aside className="case-study-brief" aria-label="사례 기본 정보">
          <span>CASE BRIEF</span>
          <dl>
            <div><dt>CLIENT TYPE</dt><dd>{study.clientLabel}</dd></div>
            <div><dt>CHANNELS</dt><dd>{study.channels.join(" · ")}</dd></div>
            <div><dt>REVIEW PERIOD</dt><dd>{study.duration}</dd></div>
          </dl>
          <b>문제 게시물은 한 번에 같은 방식으로 처리하지 않습니다. 사실 확인 범위와 채널 기준을 먼저 정리합니다.</b>
        </aside>
        <div className="case-study-watermark" aria-hidden="true">{String(study.id).padStart(2, "0")}</div>
      </header>

      <section className="case-study-section case-study-situation" data-case-section="2">
        <div className="case-study-section-heading">
          <p>01 / SITUATION REVIEW</p>
          <h2>{study.situation.headline}</h2>
          <span>{study.situation.description}</span>
        </div>
        <div className="case-study-metrics" aria-label="사례 현황">
          <article><small>최초 확인</small><strong>{study.situation.firstPublishedAt}</strong></article>
          {study.situation.metrics.map((metric) => <article key={metric.label}><small>{metric.label}</small><strong>{metric.value}</strong></article>)}
        </div>
        <div className="case-study-spread" aria-label="확산 확인 흐름">
          <i />
          {study.situation.spreadEvents.map((event) => <article key={`${event.channel}-${event.time}`}><time>{event.time}</time><b>{event.channel}</b><span>{event.description}</span></article>)}
        </div>
      </section>

      <section className="case-study-section case-study-actions" data-case-section="3">
        <div className="case-study-section-heading">
          <p>02 / RESPONSE DESIGN</p>
          <h2>무엇을 확인하고, 무엇을 요청할지 구분한 뒤 실행합니다.</h2>
        </div>
        <div className="case-study-action-grid">
          <div>{study.actions.map((action) => <article key={action.title}><h3>{action.title}</h3><p>{action.description}</p></article>)}</div>
          <aside><small>WORKING FILES</small>{study.deliverables.map((item) => <span key={item}>{item}</span>)}</aside>
        </div>
      </section>

      <section className="case-study-section case-study-evidence" data-case-section="4">
        <div className="case-study-section-heading">
          <p>03 / EVIDENCE REVIEW</p>
          <h2>원문과 재게시 문장을 비교해, 대응 근거를 남깁니다.</h2>
        </div>
        <div className="case-study-comparison">
          <article><small>{study.comparison.originalLabel}</small><p>{study.comparison.originalText}</p></article>
          <ArrowRight aria-hidden="true" />
          <article><small>{study.comparison.changedLabel}</small><p>{study.comparison.changedText.split(new RegExp(`(${study.comparison.addedPhrases.join("|")})`, "g")).map((part, itemIndex) => study.comparison.addedPhrases.includes(part) ? <mark key={itemIndex}>{part}</mark> : part)}</p></article>
        </div>
        <p className="case-study-evidence-note">{study.comparison.note}</p>
        <div className="case-study-evidence-list">{study.evidence.map((item) => <article key={item.id}><b>{item.id}</b><span>{item.name}</span><time>{item.recordedAt}</time></article>)}</div>
      </section>

      <section className="case-study-section case-study-results" data-case-section="5">
        <div className="case-study-section-heading">
          <p>04 / FOLLOW-UP LOG</p>
          <h2>요청 이후에도 남은 노출과 새 게시물을 다시 확인합니다.</h2>
          <span>{study.resultDescription}</span>
        </div>
        <div className="case-study-result-grid">{study.results.map((result) => <article key={result.label}><small>{result.label}</small>{result.before && <del>{result.before}</del>}<strong>{result.after}</strong></article>)}</div>
      </section>

      <footer className="case-study-pagination">
        <Link href={`/cases/${previous.slug}`}><ArrowLeft /><small>PREVIOUS CASE</small><strong>{previous.title}</strong></Link>
        <Link href="/cases"><small>사례 연구 아카이브</small></Link>
        <Link href={`/cases/${next.slug}`}><small>NEXT CASE</small><strong>{next.title}</strong><ArrowRight /></Link>
      </footer>
    </article>
  );
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = caseNotes.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  return (
    <CaseDetailStory
      study={buildCaseStudy(caseNotes[index])}
      previous={caseNotes[index - 1] ?? null}
      next={caseNotes[index + 1] ?? null}
    />
  );
}
