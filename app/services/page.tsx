import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { services } from "@/data/site";

export const metadata: Metadata = { title: "서비스" };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="SERVICES" title="온라인 평판 리스크 관리의 전 과정을 수행합니다." description="탐지, 분석, 증거화, 대응, 회복, 정기 보고까지 사건의 맥락을 놓치지 않는 서비스 체계를 제공합니다." />
      <section className="section bg-[#F6F7F8]">
        <div className="container-wide grid gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.slug} className="grid gap-8 border border-[#E0E5EA] bg-white p-8 lg:grid-cols-[.55fr_1.45fr]">
                <div>
                  <Icon color="#185ADB" size={32} />
                  <p className="mt-8 text-6xl font-black text-[#E8EBEE]">{service.number}</p>
                  <h2 className="mt-3 text-3xl font-black text-[#071A2B]">{service.title}</h2>
                  <p className="mt-4 leading-7 text-[#4B5158]">{service.summary}</p>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <Info title="문제 상황" body={service.problem} />
                  <Info title="수행 방식" body={service.method} />
                  <Info title="제공 결과물" body={service.output} />
                  <Info title="진행 절차" body={service.process} />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function Info({ title, body }: { title: string; body: string }) {
  return <div className="border-t border-[#E8EBEE] pt-5"><h3 className="font-black text-[#071A2B]">{title}</h3><p className="mt-3 leading-7 text-[#4B5158]">{body}</p></div>;
}
