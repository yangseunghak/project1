"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";

export function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    let cleanupFallback: (() => void) | undefined;
    let startTimer: number | undefined;
    let refreshTimer: number | undefined;

    const applyAosFallback = () => {
      const items = Array.from(document.querySelectorAll<HTMLElement>("[data-aos]"));

      items.forEach((item) => item.classList.add("aos-init"));

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement;
            const delay = Number(target.dataset.aosDelay ?? 0);

            if (!entry.isIntersecting) {
              target.classList.remove("aos-animate");
              return;
            }

            window.setTimeout(() => {
              target.classList.add("aos-animate");
            }, delay);
          });
        },
        {
          rootMargin: "0px 0px -14% 0px",
          threshold: 0.08
        }
      );

      items.forEach((item) => observer.observe(item));

      return () => observer.disconnect();
    };

    const startAos = () => {
      AOS.init({
        duration: 900,
        offset: 160,
        easing: "ease-out-cubic",
        once: false,
        mirror: true
      });

      AOS.refreshHard();
      cleanupFallback = applyAosFallback();
    };

    const scheduleStart = () => {
      startTimer = window.setTimeout(startAos, 1000);
    };

    if (document.readyState === "complete") {
      scheduleStart();
    } else {
      window.addEventListener("load", scheduleStart, { once: true });
    }

    refreshTimer = window.setTimeout(() => {
      AOS.refreshHard();
    }, 1800);

    return () => {
      window.removeEventListener("load", scheduleStart);
      if (startTimer) window.clearTimeout(startTimer);
      if (refreshTimer) window.clearTimeout(refreshTimer);
      cleanupFallback?.();
    };
  }, [pathname]);

  return null;
}
