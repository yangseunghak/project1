"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { cases } from "@/data/site";

export default function CasesPage() {
  const categories = useMemo(() => ["전체", ...Array.from(new Set(cases.map((item) => item.category)))], []);
  const [active, setActive] = useState("전체");
  const filtered = active === "전체" ? cases : cases.filter((item) => item.category === active);
  return (
    <>
      <PageHero eyebrow="CASES" title="고객명은 공개하지 않고, 대응 구조와 판단 기준을 보여드립니다." description="민감한 사안의 특성을 고려해 투명하게 정리된 형식으로 구성했습니다." />
      <section className="section bg-[#F6F7F8]">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => <button key={category} onClick={() => setActive(category)} className={`min-h-11 border px-4 font-black ${active === category ? "border-[#185ADB] bg-[#185ADB] text-white" : "border-[#D8DEE4] bg-white"}`}>{category}</button>)}
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {filtered.map((item) => (
              <Link key={item.slug} href={`/cases/${item.slug}`} className="border border-[#E0E5EA] bg-white p-8 transition-transform hover:-translate-y-1">
                <p className="eyebrow">{item.industry}</p>
                <h2 className="mt-5 text-3xl font-black text-[#071A2B]">{item.title}</h2>
                <div className="mt-8 grid gap-4">
                  <p><b>Challenge</b><br />{item.challenge}</p>
                  <p><b>Approach</b><br />{item.approach}</p>
                  <p><b>Result</b><br />{item.result}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 font-black text-[#185ADB]">상세 보기 <ArrowRight size={18} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
