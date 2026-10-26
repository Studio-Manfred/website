import { monogram } from "@/lib/monogram";

interface MonogramProps {
  color: "white" | "blue";
}

// The M at the same optical weight as the wordmark's cap height (27 px at the
// 44 px phone wordmark). The box hugs the glyph, so it sits flush with the edge.
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
      height={27}
      width={30}
      focusable="false"
    >
      <path d={monogram.path} fill={fill} />
    </svg>
  );
}
