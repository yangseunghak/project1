import { Archive, ArrowUpRight, CircleAlert, LineChart } from "lucide-react";

export function DashboardMockup() {
  const bars = [68, 44, 82, 55, 74, 38, 62];
  return (
    <section className="section bg-white">
      <div className="container-wide grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <p className="eyebrow">COADS REPORT INTERFACE</p>
          <h2 className="section-title mt-4 font-black">판단에 필요한 신호만 남기는 분석 리포트.</h2>
          <p className="lead mt-6">언급량, 감성, 확산 키워드, 증거 현황과 대응 우선순위를 한 화면에서 확인할 수 있도록 정보 밀도를 조정했습니다.</p>
        </div>
        <div className="risk-dashboard border border-[#1D3557] bg-[#071A2B] p-4 shadow-[0_24px_80px_rgba(7,26,43,.18)]">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[.06] px-5 py-4">
            <div>
              <p className="text-sm font-black text-[#8CB6FF]">Issue Risk Overview</p>
              <p className="text-xs text-white/58">Updated after evidence review</p>
            </div>
            <span className="inline-flex items-center gap-2 bg-[#185ADB] px-3 py-2 text-sm font-bold text-white"><CircleAlert size={15} /> Review</span>
          </div>
          <div className="grid gap-4 p-4 lg:grid-cols-3">
            <div className="risk-card p-5 lg:col-span-1">
              <p className="text-sm font-bold text-[#656C74]">이슈 위험도</p>
              <div className="mt-4 text-5xl font-black text-[#071A2B]">High</div>
              <p className="mt-3 text-sm leading-6 text-[#4B5158]">검색 노출 전환 가능성이 있어 우선 검토가 필요합니다.</p>
            </div>
            <div className="risk-card p-5 lg:col-span-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#656C74]">시간대별 언급 추이</p>
                <LineChart size={18} color="#185ADB" />
              </div>
              <div className="mt-8 flex h-32 items-end gap-3">
                {bars.map((bar, index) => <span key={index} className="flex-1 bg-[#185ADB]" style={{ height: `${bar}%`, opacity: .28 + index * .08 }} />)}
              </div>
            </div>
            <div className="risk-card p-5">
              <p className="text-sm font-bold text-[#656C74]">감성 비율</p>
              <div className="mt-5 grid gap-3 text-sm">
                <span className="flex justify-between"><b>긍정</b><em>낮음</em></span>
                <span className="flex justify-between"><b>중립</b><em>관찰</em></span>
                <span className="flex justify-between"><b>부정</b><em>상승</em></span>
              </div>
            </div>
            <div className="risk-card p-5">
              <p className="text-sm font-bold text-[#656C74]">주요 확산 키워드</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["후기", "검색", "커뮤니티", "해명", "원문"].map((tag) => <span key={tag} className="bg-[#EEF3FF] px-3 py-2 text-sm font-bold text-[#185ADB]">{tag}</span>)}
              </div>
            </div>
            <div className="risk-card p-5">
              <p className="text-sm font-bold text-[#656C74]">수집된 증거</p>
              <div className="mt-4 flex items-center gap-3 text-[#071A2B]"><Archive /><b>원문, 댓글, 검색 화면 보존</b></div>
            </div>
          </div>
          <div className="mx-4 mb-4 flex items-center justify-between bg-white/[.08] px-5 py-4 text-white">
            <span className="font-bold">대응 우선순위: 원문 확인, 검색 노출 점검, 내부 메시지 정리</span>
            <ArrowUpRight aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
