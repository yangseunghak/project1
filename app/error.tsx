"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="container-wide flex min-h-screen flex-col items-start justify-center gap-6 pt-24">
      <h1 className="section-title font-black text-[#071A2B]">페이지를 불러오지 못했습니다.</h1>
      <button className="btn btn-primary" onClick={reset}>다시 시도</button>
    </div>
  );
}
