"use client";

import { useMemo, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { solutions } from "@/data/site";

export default function SolutionsPage() {
  const tabs = useMemo(() => ["전체", ...solutions.map((solution) => solution.title)], []);
  const [active, setActive] = useState("전체");
  const filtered = active === "전체" ? solutions : solutions.filter((solution) => solution.title === active);

  return (
    <>
      <PageHero eyebrow="SOLUTIONS" title="고객 상황별로 다른 리스크 대응 구조를 설계합니다." description="기업, 기관, 전문직, 의료기관, 콘텐츠 조직의 평판 리스크는 서로 다른 확산 경로와 대응 기준을 가집니다." />
      <section className="section bg-white">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="솔루션 필터">
            {tabs.map((tab) => <button key={tab} onClick={() => setActive(tab)} className={`min-h-11 border px-4 font-black ${active === tab ? "border-[#185ADB] bg-[#185ADB] text-white" : "border-[#D8DEE4] bg-white text-[#071A2B]"}`}>{tab}</button>)}
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {filtered.map((solution) => (
              <article key={solution.slug} className="border border-[#E0E5EA] p-8">
                <p className="eyebrow">{solution.title}</p>
                <h2 className="mt-4 text-3xl font-black text-[#071A2B]">{solution.name}</h2>
                <div className="mt-8 grid gap-5">
                  <Line label="문제" text={solution.problem} />
                  <Line label="대응 방식" text={solution.response} />
                  <Line label="기대 효과" text={solution.effect} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Line({ label, text }: { label: string; text: string }) {
  return <p className="border-t border-[#E8EBEE] pt-4 leading-7 text-[#4B5158]"><b className="text-[#071A2B]">{label}</b><br />{text}</p>;
}
