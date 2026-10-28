import type { Kind } from "./findings";

// What an evaluation looks for. Each group gives findings of one kind; a
// kind is only reported when at least one of its criteria is chosen.

export type Criterion = { id: string; name: string; hint: string };
export type CriteriaGroup = { kind: Kind; name: string; items: Criterion[] };

/** The plain HTML checks; the only criterion that runs without the model. */
export const AUTO_CHECKS = "a11y-html";

export const CRITERIA_GROUPS: CriteriaGroup[] = [
  {
    kind: "usability",
    name: "Usability heuristics",
    items: [
      { id: "h-status", name: "Visibility of system status", hint: "The user always knows what is happening and what just happened." },
      { id: "h-match", name: "Match with the real world", hint: "Words, order and concepts the user knows, not internal jargon." },
      { id: "h-control", name: "User control and freedom", hint: "Easy to go back, undo, change or cancel." },
      { id: "h-consistency", name: "Consistency and standards", hint: "Things that look the same work the same, as on other sites." },
      { id: "h-errors", name: "Error prevention", hint: "The design stops mistakes before they happen." },
      { id: "h-recognition", name: "Recognition rather than recall", hint: "Options and information are visible, not remembered." },
      { id: "h-flexibility", name: "Flexibility and efficiency", hint: "Fast paths for frequent users, without confusing new ones." },
      { id: "h-minimal", name: "Aesthetic and minimalist design", hint: "Nothing competes with what matters for the task." },
      { id: "h-recovery", name: "Help users recover from errors", hint: "Error messages say what went wrong and how to fix it." },
      { id: "h-help", name: "Help and documentation", hint: "Help is there when needed, close to the task." },
    ],
  },
  {
    kind: "accessibility",
    name: "Accessibility (WCAG 2.2 AA)",
    items: [
      { id: AUTO_CHECKS, name: "Automatic HTML checks", hint: "Language, page title, zoom, alt text, labels, names, headings, tab order." },
      { id: "a11y-perceivable", name: "Perceivable", hint: "Contrast, text alternatives, information not by colour alone, zoom and reflow." },
      { id: "a11y-operable", name: "Operable", hint: "Keyboard, visible focus, touch target size, enough time, no traps." },
      { id: "a11y-understandable", name: "Understandable", hint: "Plain language, predictable behaviour, clear help with input." },
      { id: "a11y-cognitive", name: "Cognitive load", hint: "Memory, attention and interruptions: can the task be paused and picked up?" },
    ],
  },
  {
    kind: "improvement",
    name: "Experience and business",
    items: [
      { id: "b-trust", name: "Trust and reassurance", hint: "Security, guarantees, reviews and clear terms at the moments of doubt." },
      { id: "b-conversion", name: "Conversion and drop-off", hint: "Where people leave the flow, and what would keep them." },
      { id: "b-price", name: "Price transparency", hint: "Full price early, no surprises, easy to compare." },
      { id: "b-mobile", name: "Mobile and on the go", hint: "One hand, small screen, poor connection, short sessions." },
      { id: "b-content", name: "Content and findability", hint: "The information people need is there, and easy to find." },
    ],
  },
];

export const ALL_CRITERIA = CRITERIA_GROUPS.flatMap((g) => g.items.map((c) => c.id));

/** The chosen criteria that exist, in menu order. */
export function chosenCriteria(ids: string[]): Criterion[] {
  return CRITERIA_GROUPS.flatMap((g) => g.items).filter((c) => ids.includes(c.id));
}

export function allowedKinds(ids: string[]): Kind[] {
  return CRITERIA_GROUPS.filter((g) => g.items.some((c) => ids.includes(c.id))).map((g) => g.kind);
}
