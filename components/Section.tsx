import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/ds";

// Section is the single page-level layout primitive used across the
// marketing site. It composes the DS `Container` (semantic max-width
// wrapper) inside a `<section>` (or `<main>` / `<article>` via `as`)
// that owns horizontal page padding, vertical rhythm, and surface
// colour. DS Container's `size` presets (sm/md/lg/xl/2xl → 640/768/
// 1024/1280/1536px) don't line up with our chosen widths (720/960/
// 1200px — picked for line length, not container bands), so we keep
// using Container as the centring shell and override `maxWidth` via
// inline style.

const WIDTH_PX = {
  narrow: 720,
  default: 960,
  wide: 1200,
} as const;

const PADDING_CLASS = {
  /** First section after the PageNav — shorter bottom padding so the
   *  hero feels close to the body that follows. */
  first: "pt-24 md:pt-40 pb-16 md:pb-24",
  /** Default home / training section rhythm. */
  default: "py-28 md:py-40",
  /** Slightly tighter — used by join-us hero, Footer, privacy policy. */
  tight: "py-20 md:py-32",
  /** Roomy — Mission section's extra-tall padding. */
  roomy: "py-40 md:py-56",
  /** None — the consumer is handling vertical padding via className. */
  none: "",
} as const;

const BACKGROUND_CLASS = {
  white: "bg-white",
  /** Brand-blue surface also opts into cursor-white so the custom cursor
   *  stays visible (see STU-291 / cursor-white invariants in CLAUDE.md). */
  blue: "cursor-white bg-[var(--color-business-blue)]",
  cream: "bg-[var(--color-cream)]",
  /** No background — surface colour is owned by the consumer or an
   *  ancestor (e.g. a writing-page <main> that's already brand-blue). */
  transparent: "",
} as const;

export interface SectionProps {
  /** Outer landmark. Defaults to `section`. */
  as?: "section" | "main" | "article" | "div";
  /** Surface background. `transparent` skips both bg + cursor-white. */
  background?: keyof typeof BACKGROUND_CLASS;
  /** Centred content max-width: narrow=720, default=960, wide=1200 px. */
  width?: keyof typeof WIDTH_PX;
  /** Vertical padding preset. */
  padding?: keyof typeof PADDING_CLASS;
  /** Inline content alignment (passed through to the Container). */
  align?: "left" | "center";
  /** Extra classes merged onto the outer landmark. */
  className?: string;
  /** Inline style on the outer landmark. */
  style?: CSSProperties;
  /** Id (e.g. `id="main"` when `as="main"`). */
  id?: string;
  /** Required for `as="main"` to support the skip-link landing. */
  tabIndex?: number;
  children: ReactNode;
}

export function Section({
  as = "section",
  background = "transparent",
  width = "default",
  padding = "default",
  align = "left",
  className,
  style,
  id,
  tabIndex,
  children,
}: SectionProps) {
  const OuterTag = as;
  const outerClass = [
    BACKGROUND_CLASS[background],
    "px-6 md:px-12",
    PADDING_CLASS[padding],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const innerClass = align === "center" ? "text-center" : "";

  return (
    <OuterTag id={id} tabIndex={tabIndex} className={outerClass} style={style}>
      <Container
        as="div"
        className={innerClass || undefined}
        style={{ maxWidth: `${WIDTH_PX[width]}px` }}
      >
        {children}
      </Container>
    </OuterTag>
  );
}
