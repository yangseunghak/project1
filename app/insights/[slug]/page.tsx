import Link from "next/link";
import { notFound } from "next/navigation";
import { insights } from "@/data/site";

export function generateStaticParams() {
  return insights.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = insights.find((insight) => insight.slug === slug);
  return { title: item?.title ?? "인사이트" };
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = insights.find((insight) => insight.slug === slug);
  if (!item) notFound();
  const recommended = insights.filter((insight) => insight.slug !== item.slug).slice(0, 3);
  return (
    <>
      <section className="bg-white pt-36">
        <div className="container-wide border-b border-[#E8EBEE] pb-16">
          <p className="eyebrow">{item.category} · {item.read}</p>
          <h1 className="section-title mt-5 max-w-5xl font-black text-[#071A2B]">{item.title}</h1>
          <p className="lead mt-6 max-w-3xl">{item.summary}</p>
        </div>
      </section>
      <section className="section bg-[#F6F7F8]">
        <article className="container-wide max-w-4xl bg-white p-8 md:p-12">
          {[
            "초기 신호는 작고 분산되어 있지만 반복되는 표현과 채널 이동을 보면 위험의 윤곽이 보입니다.",
            "COADS는 언급량만 보지 않고 출처, 맥락, 감성, 검색 노출 가능성, 증거 보존 필요성을 함께 검토합니다.",
            "정확한 판단은 더 많은 데이터를 쌓는 데서 끝나지 않습니다. 의사결정자가 바로 사용할 수 있는 구조로 정리되어야 합니다."
          ].map((paragraph) => <p key={paragraph} className="mb-7 text-xl leading-9 text-[#34383D]">{paragraph}</p>)}
        </article>
        <div className="container-wide mt-12">
          <h2 className="text-3xl font-black">추천 콘텐츠</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">{recommended.map((post) => <Link key={post.slug} href={`/insights/${post.slug}`} className="card p-6"><p className="eyebrow">{post.category}</p><h3 className="mt-4 text-xl font-black">{post.title}</h3></Link>)}</div>
        </div>
      </section>
    </>
  );
}
