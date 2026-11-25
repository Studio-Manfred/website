import Image from "next/image";
import { Logo } from "@/components/ds";

// The three companies' marks, used as chat avatars and, animated, while each
// company is thinking. Manfred's M comes from the DS; SeventyOne's leaf is cut
// from its logo; Mather's pixel mark is redrawn here as blocks so it can be
// built up one block at a time.

// Mather's mark on a 5 × 6 grid, listed top to bottom (the order it builds in).
const MATHER_BLOCKS: [number, number][] = [
  [2, 0], [2, 1], [1, 2], [3, 2], [1, 3], [2, 3], [3, 3], [0, 4], [4, 4], [0, 5], [4, 5],
];

export function MatherMark({ size, animated = false }: { size: number; animated?: boolean }) {
  return (
    <svg viewBox="0 0 5 6" width={(size * 5) / 6} height={size} fill="currentColor" aria-hidden>
      {MATHER_BLOCKS.map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={1.02}
          height={1.02}
          className={animated ? "motion-safe:animate-think-build" : undefined}
          style={animated ? { animationDelay: `${i * 110}ms` } : undefined}
        />
      ))}
    </svg>
  );
}

export function SeventyOneLeaf({ size, className }: { size: number; className?: string }) {
  return <Image src="/group/s71-leaf.png" alt="" width={size} height={size} className={className} />;
}

export function ManfredMark({ size }: { size: number }) {
  return <Logo variant="monogram" color="white" height={size} />;
}
