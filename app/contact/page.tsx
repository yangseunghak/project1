import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "프로젝트 문의" };

export default function ContactPage() {
  return (
    <section className="contact-inquiry" aria-labelledby="contact-inquiry-title">
      <aside className="contact-inquiry-copy">
        <p>TELL US WHAT<br />HAPPENED.</p>
        <h1 id="contact-inquiry-title">CONTACT</h1>
        <div>
          <strong>링크 하나만 남겨도 괜찮아요.<br />확인할 수 있는 것부터 볼게요.</strong>
          <svg viewBox="0 0 178 29" aria-hidden="true"><path d="M2 22C43 5 95 5 173 13" /><path d="M100 16c12-12 24-16 29-11 4 4-5 9-18 9" /></svg>
        </div>
        <span className="contact-inquiry-orbit" aria-hidden="true" />
      </aside>
      <div className="contact-inquiry-panel">
        <ContactForm />
      </div>
    </section>
  );
}
