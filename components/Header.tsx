"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navItems } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHomeTop = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 translate-y-0 border-b border-transparent bg-transparent transition-all duration-500 ${isHomeTop ? "py-8" : "py-4"}`}>
      <div className="container-wide flex items-center justify-between gap-8">
        <Link href="/" className="header-contrast flex min-h-11 items-center cursor-pointer" aria-label="Go to COADS home">
          <Image
            src="/logo/coads-logo-mark.png"
            alt="COADS"
            width={505}
            height={120}
            priority
            className="h-[34px] w-auto object-contain brightness-0 invert md:h-[38px]"
          />
        </Link>
        <nav className="header-contrast hidden items-center gap-12 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} className={`nav-link ${pathname === item.href ? "active" : ""}`} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link className="btn btn-primary header-cta" href="/contact">
            <span>무료상담하기</span>
            <ArrowRight size={24} aria-hidden />
          </Link>
        </div>
        <button
          className="header-contrast inline-flex min-h-11 min-w-11 items-center justify-center text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 top-[73px] z-40 bg-[#071A2B] lg:hidden">
          <nav className="container-wide flex h-full flex-col justify-center gap-6" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link key={item.href} className="border-b border-white/20 py-4 text-3xl font-black text-white" href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className="btn btn-blue mt-4 justify-center" href="/contact">무료상담하기</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
