// Content widths shared by Section and PageNav, so a page's nav row and its
// content can use the same name and line up at the outer edges.
export const WIDTH_PX = {
  narrow: 720,
  default: 960,
  xl: 1100,
  wide: 1200,
} as const;

export type LayoutWidth = keyof typeof WIDTH_PX;
