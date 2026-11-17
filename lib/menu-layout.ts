// Side padding of the home menu bar and panel header — 20 px at 390 px wide,
// 120 px at 1440 px wide, the two sizes in the design. Both use it so the
// wordmark and the button sit at the same x in the bar and in the open panel.
export const menuGutter = "clamp(20px, calc(9.52vw - 17.1px), 120px)";

// The side inset of the menu rows on a page with a PageNav: what the nav row
// leaves on each side (24 px, or half of whatever is over the page width), so the
// rows, rules and arrows line up with the nav row and the close button.
export const pageInset = (widthPx: number) =>
  `max(24px, calc((100% - ${widthPx}px) / 2))`;
