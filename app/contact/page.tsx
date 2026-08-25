import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "무료 상담 문의",
  description: "기업, 브랜드, 기관, 전문직의 온라인 평판과 여론 리스크 대응을 COADS에 안전하게 문의하세요.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "무료 상담 문의 | COADS", description: "온라인 평판 및 디지털 리스크 대응 범위를 함께 정리합니다." }
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="CONTACT" title="온라인 이슈 대응이 필요하다면 안전하게 문의해주세요." description="상담 내용과 전달 자료는 기밀성을 기준으로 관리됩니다. 현재 상황을 가능한 범위에서 공유해주시면 대응 범위를 함께 정리합니다." />
      <section className="section bg-[#F6F7F8]">
        <div className="container-wide grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
          <aside>
            <p className="eyebrow">REQUEST BRIEF</p>
            <h2 className="mt-4 text-4xl font-black text-[#071A2B]">필수 정보만으로도 초기 판단을 시작할 수 있습니다.</h2>
            <p className="lead mt-6">긴급 사안은 발생 채널과 현재 노출 상태를 중심으로 작성해주세요. 제출 후 화면에서 접수 완료 상태를 확인할 수 있습니다.</p>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
