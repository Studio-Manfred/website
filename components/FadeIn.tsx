"use client";

import { useEffect, useRef } from "react";

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.unobserve(el);
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
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
