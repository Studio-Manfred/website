import { monogram } from "@/lib/monogram";

interface MonogramProps {
  color: "white" | "blue";
}

// The M is a dense glyph, so it reads as heavy as the wordmark at a little under
// the wordmark's cap height (27 px at the 44 px phone wordmark): 23 px. The box
// hugs the glyph, so it sits flush with the edge.
export function Monogram({ color }: MonogramProps) {
  const fill =
    color === "white"
      ? "var(--color-brand-logo-paper, #fff)"
      : "var(--color-brand-logo-blue, #2C28EC)";
  return (
    <svg
      data-testid="monogram"
      role="img"
      aria-label="Manfred home"
      viewBox={monogram.tightViewBox}
      height={23}
      width={26}
      focusable="false"
    >
      <path d={monogram.path} fill={fill} />
    </svg>
  );
}
