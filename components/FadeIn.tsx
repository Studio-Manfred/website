"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/prefers-reduced-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
}

export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // STU-290: reduced-motion users get the final state immediately and we
    // skip the observer entirely.
    if (prefersReducedMotion()) {
      el.classList.add("in-view");
      return;
    }

    // threshold MUST stay 0 (not e.g. 0.06): when the wrapped element is
    // taller than 1/threshold × viewport, intersectionRatio can never reach
    // threshold and the observer never fires. STU-313 wrapped the entire
    // article body in a single FadeIn — those bodies routinely sit around
    // 14k px on an 800 px viewport (≈ 5–7 %) and used to stay at opacity 0
    // forever. The -40px bottom rootMargin still gives the "must enter the
    // viewport by at least 40 px before firing" delay we want.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay > 0 ? `fade-up-delay-${delay}` : "";

  return (
    <div ref={ref} className={`fade-up ${delayClass} ${className}`}>
      {children}
    </div>
  );
}
