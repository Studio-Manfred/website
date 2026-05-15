"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { prefersReducedMotion } from "@/lib/prefers-reduced-motion";

function CyclingImage({ images, interval, priority }: {
  images: string[];
  interval: number;
  priority?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (images.length <= 1) return;
    // STU-290: hold on the first image for reduced-motion users.
    if (prefersReducedMotion()) return;
    const timer = setInterval(() => {
      setVisible(false);
      const swap = setTimeout(() => {
        setIdx((i) => (i + 1) % images.length);
        setVisible(true);
      }, 350);
      return () => clearTimeout(swap);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <Image
      src={images[idx]}
      fill
      alt=""
      priority={priority}
      sizes="(max-width: 768px) 100vw, 33vw"
      style={{
        objectFit: "cover",
        objectPosition: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.35s ease",
      }}
    />
  );
}

// Five cells, each cycling through 3 photos at staggered intervals
const cells: { images: string[]; interval: number; gridColumn: string; gridRow: string }[] = [
  {
    // Large tall cell — outdoor social
    images: [
      "/vibes/gotth\u00E4ng.jpeg",
      "/vibes/finbild1.jpeg",
      "/vibes/brabild1.jpeg",
    ],
    interval: 3000,
    gridColumn: "1",
    gridRow: "1 / 3",
  },
  {
    // Wide top-middle — work / workshops
    images: [
      "/vibes/manfred-ws.jpeg",
      "/vibes/MIK_8943.jpg",
      "/vibes/moa-xconf.jpeg",
    ],
    interval: 3800,
    gridColumn: "2 / 4",
    gridRow: "1",
  },
  {
    // Tall right — people
    images: [
      "/vibes/axel-jens.jpeg",
      "/vibes/IMG_3375.jpg",
      "/vibes/moa-jens.jpeg",
    ],
    interval: 4300,
    gridColumn: "4",
    gridRow: "1 / 3",
  },
  {
    // Bottom-left of middle — fun / quirky
    images: [
      "/vibes/moa-katt.jpeg",
      "/vibes/manfred-unn.jpeg",
      "/vibes/ws-v\u00E4skan.jpeg",
    ],
    interval: 3400,
    gridColumn: "2",
    gridRow: "2",
  },
  {
    // Wide bottom-right — conference / events
    images: [
      "/vibes/IMG_3542.jpeg",
      "/vibes/moa%3C3.jpeg",
      "/vibes/Image%20from%20iOS%20(6).jpg",
    ],
    interval: 4700,
    gridColumn: "3",
    gridRow: "2",
  },
];

export function VibesGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr 1fr 1.1fr",
        gridTemplateRows: "300px 210px",
        gap: "5px",
      }}
    >
      {cells.map((cell, i) => (
        <div
          key={i}
          style={{
            gridColumn: cell.gridColumn,
            gridRow: cell.gridRow,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <CyclingImage
            images={cell.images}
            interval={cell.interval}
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
}
