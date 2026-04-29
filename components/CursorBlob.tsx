"use client";

import { useEffect, useRef, useState } from "react";

export function CursorBlob() {
  const blobRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const pos = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as Element | null;
      setActive(!!target?.closest("[data-cursor='view']"));
    }

    function loop() {
      // Smooth follow
      current.current.x += (pos.current.x - current.current.x) * 0.12;
      current.current.y += (pos.current.y - current.current.y) * 0.12;

      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }

      raf.current = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full bg-[var(--color-business-blue)] text-white font-extrabold transition-[width,height,opacity,margin] duration-200 ease-out"
      style={{
        width: active ? "60px" : "0px",
        height: active ? "60px" : "0px",
        marginLeft: active ? "-30px" : "0px",
        marginTop: active ? "-30px" : "0px",
        opacity: active ? 1 : 0,
        fontSize: "13px",
        letterSpacing: "0.02em",
        willChange: "transform",
      }}
    >
      {active ? "view" : null}
    </div>
  );
}
