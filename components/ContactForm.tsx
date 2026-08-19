"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  FileText,
  Link2,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  PlayCircle,
  Plus,
  Search,
  UsersRound,
} from "lucide-react";

const inquiryOptions = [
  { value: "악성 게시물", icon: MessageCircle },
  { value: "허위·왜곡 정보", icon: FileText },
  { value: "커뮤니티 확산", icon: UsersRound },
  { value: "검색 노출", icon: Search },
  { value: "영상·SNS", icon: PlayCircle },
  { value: "기타", icon: MoreHorizontal },
] as const;

type FormState = "idle" | "error" | "integration";

export function ContactForm() {
  const consentRef = useRef<HTMLInputElement>(null);
  const [inquiryType, setInquiryType] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [state, setState] = useState<FormState>("idle");

  const clearStatus = () => {
    if (state !== "idle") setState("idle");
  };

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const firstInvalid = form.querySelector<HTMLElement>(":invalid");

    if (firstInvalid || !agreed) {
      setState("error");
      if (firstInvalid) firstInvalid.focus();
      else consentRef.current?.focus();
      return;
    }

    // 현재 프로젝트에는 문의를 전달할 API가 연결되어 있지 않아, 입력 데이터를 외부로 전송하지 않습니다.
    setState("integration");
  }

  return (
    <form className="contact-inquiry-form" onSubmit={onSubmit} noValidate>
      <fieldset className="contact-inquiry-types">
        <legend>문의 유형</legend>
        <div className="contact-inquiry-type-grid">
          {inquiryOptions.map(({ value, icon: Icon }, index) => {
            const selected = inquiryType === value;
            return (
              <label className={`contact-inquiry-type${selected ? " is-selected" : ""}`} key={value}>
                <input
                  type="radio"
                  name="inquiryType"
                  value={value}
                  checked={selected}
                  required={index === 0}
                  onChange={(event) => {
                    setInquiryType(event.target.value);
                    clearStatus();
                  }}
                />
                <Icon aria-hidden="true" size={27} strokeWidth={2.2} />
                <span>{value}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="contact-inquiry-field-grid">
        <InquiryField label="이름" name="name" autoComplete="name" placeholder="이름을 입력해주세요." required onInput={clearStatus} />
        <InquiryField label="회사명 또는 소속" name="organization" autoComplete="organization" placeholder="회사명 또는 소속을 입력해주세요." onInput={clearStatus} />
        <InquiryField label="연락처" name="phone" type="tel" autoComplete="tel" placeholder="연락처를 입력해주세요." required onInput={clearStatus} />
        <InquiryField label="이메일" name="email" type="email" autoComplete="email" placeholder="이메일 주소를 입력해주세요." required onInput={clearStatus} />
      </div>

      <label className="contact-inquiry-field contact-inquiry-url-field">
        <span>관련 URL</span>
        <span className="contact-inquiry-url-input">
          <Link2 aria-hidden="true" size={25} strokeWidth={2.2} />
          <input name="url" type="url" inputMode="url" placeholder="관련 URL을 입력해주세요." onInput={clearStatus} />
          <ArrowRight aria-hidden="true" size={31} strokeWidth={2.5} />
        </span>
      </label>

      <label className="contact-inquiry-field contact-inquiry-message-field">
        <span>문의 내용</span>
        <span className="contact-inquiry-textarea-wrap">
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={1000}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              clearStatus();
            }}
            placeholder="발견 시점과 현재 상황을 편하게 적어주세요."
          />
          <small>{message.length} / 1,000</small>
        </span>
      </label>

      <div className="contact-inquiry-file-field">
        <Paperclip aria-hidden="true" size={25} strokeWidth={2.2} />
        <strong>증빙자료 첨부</strong>
        <span aria-hidden="true" className="contact-inquiry-file-divider" />
        <label htmlFor="contact-proof-file" className="contact-inquiry-file-name">{fileName || "파일 선택"}</label>
        <input
          id="contact-proof-file"
          name="evidence"
          type="file"
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? "");
            clearStatus();
          }}
        />
        <label htmlFor="contact-proof-file" className="contact-inquiry-file-add" aria-label="증빙자료 파일 선택">
          <Plus aria-hidden="true" size={25} strokeWidth={2.5} />
        </label>
      </div>

      <label className="contact-inquiry-consent">
        <input
          ref={consentRef}
          id="contact-consent"
          type="checkbox"
          checked={agreed}
          required
          onChange={(event) => {
            setAgreed(event.target.checked);
            clearStatus();
          }}
        />
        <span>개인정보 수집 및 이용에 동의합니다.</span>
      </label>

      <div className="contact-inquiry-status" aria-live="polite">
        {state === "error" && <p id="contact-form-error">필수 항목과 개인정보 동의 여부를 확인해주세요.</p>}
        {state === "integration" && <p>문의 전송 시스템이 아직 연결되지 않아 입력 내용은 전송되지 않았습니다.</p>}
      </div>

      <button type="submit" className="contact-inquiry-submit">
        <span>무료상담 신청하기</span>
        <i aria-hidden="true"><ArrowRight size={38} strokeWidth={2.3} /></i>
      </button>
    </form>
  );
}

function InquiryField({ label, name, type = "text", autoComplete, placeholder, required = false, onInput }: {
  label: string;
  name: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  placeholder: string;
  required?: boolean;
  onInput: () => void;
}) {
  return (
    <label className="contact-inquiry-field">
      <span>{label}</span>
      <input name={name} type={type} autoComplete={autoComplete} placeholder={placeholder} required={required} onInput={onInput} />
    </label>
  );
}
