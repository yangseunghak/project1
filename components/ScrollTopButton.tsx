"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToHero = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`scroll-top-button ${visible ? "is-visible" : ""}`}
      onClick={scrollToHero}
      aria-label="히어로 섹션으로 이동"
    >
      <ArrowUp size={22} strokeWidth={2.2} aria-hidden />
    </button>
  );
}
