// Fluid type scales used across the marketing site.
//
// DS Typography (headline1..4 / large / body / bodySmall / label / caption)
// covers everyday text; reach for it first. These constants exist for the
// hero-scale clamp() sizes the DS doesn't ship and for the per-section
// lead-body sizes that vary by surface. Centralised here so a redesign
// touches one file instead of 60+ inline style props.

export const fontSize = {
  /** Home hero h1 — "Building Better Product Companies". */
  heroDisplay: "clamp(2.5rem, 5.5vw, 5rem)",
  /** Writing list + writing slug h1 — bigger, narrower line-length. */
  pageHero: "clamp(48px, 10vw, 86px)",
  /** Section h2 — "Want to join us?", "What else?", etc. */
  sectionTitle: "clamp(2.5rem, 6vw, 5rem)",
  /** Lead paragraph that sits directly under a section title. */
  lead: "clamp(1.125rem, 2vw, 1.75rem)",
  /** Body-large copy — e.g. the WhatElse / Services prose. */
  bodyLarge: "clamp(1.25rem, 2.5vw, 2rem)",
  /** Default body copy inside training / join-us cards. */
  body: "clamp(1rem, 1.4vw, 1.15rem)",
  /** Small body / metadata captions. */
  bodySmall: "clamp(0.875rem, 1.2vw, 1rem)",
  /** Eyebrow / inline numerics. */
  eyebrow: "clamp(1.5rem, 2.2vw, 2rem)",
  /** Article-card title (writing list rows). */
  articleCardTitle: "clamp(28px, 5vw, 48px)",
} as const;

export type FontSizeToken = keyof typeof fontSize;
