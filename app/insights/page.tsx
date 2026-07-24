"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { insights } from "@/data/site";

export default function InsightsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const categories = useMemo(() => ["전체", ...Array.from(new Set(insights.map((item) => item.category)))], []);
  const filtered = insights.filter((item) => (category === "전체" || item.category === category) && item.title.includes(query));

  return (
    <>
      <PageHero eyebrow="INSIGHTS" title="평판 리스크를 더 정확하게 판단하기 위한 관점" description="온라인 이슈의 확산, 증거 수집, 검색 신뢰와 대응 신호를 기업 매거진 형식으로 정리합니다." />
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="아티클 검색" className="min-h-12 border border-[#D8DEE4] px-4" aria-label="아티클 검색" />
            <div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`min-h-12 border px-4 font-black ${category === item ? "border-[#185ADB] bg-[#185ADB] text-white" : "border-[#D8DEE4] bg-white"}`}>{item}</button>)}</div>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {filtered.map((item, index) => <Link key={item.slug} href={`/insights/${item.slug}`} className={`border border-[#E0E5EA] p-8 ${index === 0 ? "bg-[#071A2B] text-white lg:col-span-2" : "bg-[#F6F7F8]"}`}><p className="text-sm font-black text-[#185ADB]">{item.category}</p><h2 className="mt-5 text-3xl font-black">{item.title}</h2><p className="mt-5 leading-7 opacity-75">{item.summary}</p><p className="mt-8 text-sm font-bold">{item.read}</p></Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
