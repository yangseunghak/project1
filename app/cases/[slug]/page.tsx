import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cases } from "@/data/site";
import type { Metadata } from "next";

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = cases.find((caseItem) => caseItem.slug === slug);
  if (!item) return { title: "사례연구" };
  const description = `${item.challenge} ${item.result}`;
  return {
    title: item.title,
    description,
    alternates: { canonical: `/cases/${item.slug}` },
    openGraph: {
      url: `/cases/${item.slug}`,
      title: `${item.title} | COADS`,
      description,
      type: "article"
    }
  };
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = cases.find((caseItem) => caseItem.slug === slug);
  if (!item) notFound();
  const index = cases.findIndex((caseItem) => caseItem.slug === item.slug);
  const next = cases[(index + 1) % cases.length];
  const caseJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.challenge,
    url: `https://coads-homepage.vercel.app/cases/${item.slug}`,
    inLanguage: "ko-KR",
    author: { "@type": "Organization", name: "COADS", url: "https://coads-homepage.vercel.app/" }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd).replace(/</g, "\\u003c") }} />
      <section className="bg-white pt-36">
        <div className="container-wide border-b border-[#E8EBEE] pb-16">
          <p className="eyebrow">{item.industry} CASE</p>
          <h1 className="section-title mt-5 max-w-5xl font-black text-[#071A2B]">{item.title}</h1>
        </div>
      </section>
      <section className="section bg-[#F6F7F8]">
        <div className="container-wide grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
          <aside className="border border-[#E0E5EA] bg-white p-8">
            <h2 className="text-2xl font-black">프로젝트 개요</h2>
            <p className="mt-4 leading-7 text-[#4B5158]">익명화된 {item.category} 리스크 대응 프로젝트입니다.</p>
            <div className="mt-8 flex flex-wrap gap-2">{item.services.map((service) => <span key={service} className="bg-[#EEF3FF] px-3 py-2 text-sm font-bold text-[#185ADB]">{service}</span>)}</div>
          </aside>
          <article className="grid gap-6">
            <Detail title="문제 상황" body={item.challenge} />
            <Detail title="분석" body="초기 원문, 확산 게시물, 검색 노출 가능성, 이해관계자 반응을 나누어 검토했습니다." />
            <Detail title="대응 전략" body={item.approach} />
            <Detail title="결과" body={item.result} />
            <Link href={`/cases/${next.slug}`} className="mt-6 inline-flex items-center gap-2 font-black text-[#185ADB]">다음 사례: {next.title} <ArrowRight size={18} /></Link>
          </article>
        </div>
      </section>
    </>
  );
}

function Detail({ title, body }: { title: string; body: string }) {
  return <section className="border border-[#E0E5EA] bg-white p-8"><h2 className="text-2xl font-black text-[#071A2B]">{title}</h2><p className="mt-4 leading-8 text-[#4B5158]">{body}</p></section>;
}
