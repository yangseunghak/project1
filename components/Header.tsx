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
  const headerNavItems = navItems.filter((item) => item.href !== "/insights");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [open]);

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
          {headerNavItems.map((item) => (
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
        <div className="fixed inset-0 z-40 h-[100dvh] overflow-y-auto bg-black/95 pt-24 backdrop-blur-xl lg:hidden">
          <nav className="container-wide flex min-h-full flex-col justify-center gap-3 pb-10" aria-label="Mobile navigation">
            {headerNavItems.map((item) => (
              <Link key={item.href} className={`border-b py-5 text-[clamp(30px,9vw,48px)] font-black leading-none tracking-normal text-white transition-colors ${pathname === item.href ? "border-[#2f6bff] text-[#2f6bff]" : "border-white/20"}`} href={item.href} onClick={() => setOpen(false)}>
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
