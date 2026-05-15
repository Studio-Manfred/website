"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { prefersReducedMotion } from "@/lib/prefers-reduced-motion";

interface LoopingPhotoProps {
  images: string[];
  interval?: number;
  style?: CSSProperties;
  sizes?: string;
}

export function LoopingPhoto({
  images,
  interval = 2400,
  style,
  sizes = "50vw",
}: LoopingPhotoProps) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    // STU-290: no cycling for reduced-motion users — first image stays put.
    if (prefersReducedMotion()) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(t);
  }, [images, interval]);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        ...style,
      }}
    >
      <Image
        src={images[idx]}
        fill
        alt=""
        sizes={sizes}
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  );
}
