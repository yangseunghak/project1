"use client";

import { useState } from "react";
import { inquiryTypes, issueChannels } from "@/data/site";

type State = "idle" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [agreed, setAgreed] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity() || !agreed) {
      setState("error");
      form.reportValidity();
      return;
    }
    setState("success");
    form.reset();
    setAgreed(false);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 border border-[#E0E5EA] bg-white p-6 md:p-8" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="이름" name="name" required />
        <Field label="회사명" name="company" required />
        <Field label="연락처" name="phone" required />
        <Field label="이메일" name="email" type="email" required />
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <Select label="문의 유형" name="type" options={inquiryTypes} required />
        <Select label="이슈 발생 채널" name="channel" options={issueChannels} required />
        <Select label="긴급도" name="urgency" options={["일반 검토", "빠른 상담 필요", "긴급 대응 필요"]} required />
      </div>
      <label className="grid gap-2 font-bold text-[#071A2B]">
        문의 내용
        <textarea name="message" required minLength={10} className="min-h-44 border border-[#D8DEE4] p-4 font-normal text-[#101214]" placeholder="현재 상황, 확인된 채널, 필요한 대응 범위를 적어주세요." />
      </label>
      <label className="flex items-start gap-3 text-sm leading-6 text-[#34383D]">
        <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} className="mt-1 min-h-5 min-w-5" />
        개인정보 수집 및 상담 목적의 연락에 동의합니다. 전달 자료와 상담 내용은 안전하게 관리됩니다.
      </label>
      {state === "success" && <p className="border border-[#B8D5C1] bg-[#F0FAF3] p-4 font-bold text-[#1F6F3E]">문의가 접수되었습니다. 담당자가 내용을 검토한 뒤 연락드리겠습니다.</p>}
      {state === "error" && <p className="border border-[#F0C5C5] bg-[#FFF4F4] p-4 font-bold text-[#A33A3A]">필수 항목과 개인정보 동의 여부를 확인해주세요.</p>}
      <button type="submit" className="btn btn-blue justify-center">프로젝트 문의 제출</button>
    </form>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 font-bold text-[#071A2B]">
      {label}
      <input name={name} type={type} required={required} className="min-h-12 border border-[#D8DEE4] px-4 font-normal text-[#101214]" />
    </label>
  );
}

function Select({ label, name, options, required = false }: { label: string; name: string; options: string[]; required?: boolean }) {
  return (
    <label className="grid gap-2 font-bold text-[#071A2B]">
      {label}
      <select name={name} required={required} className="min-h-12 border border-[#D8DEE4] bg-white px-4 font-normal text-[#101214]">
        <option value="">선택</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
