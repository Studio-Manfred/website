interface MenuIconProps {
  /** The close button's icon: it rests as a cross and morphs from three lines (see globals.css). */
  morph?: boolean;
}

// Three lines in a 24 px box; the lines run edge to edge (with round caps), so the
// box edge is the visible edge. Strokes, not backgrounds, so forced colours keep them.
export function MenuIcon({ morph = false }: MenuIconProps) {
  return (
    <svg
      className={`menu-icon${morph ? " menu-icon--morph" : ""}`}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <line className="menu-icon__top" x1="1" y1="5" x2="23" y2="5" />
      <line className="menu-icon__middle" x1="1" y1="12" x2="23" y2="12" />
      <line className="menu-icon__bottom" x1="1" y1="19" x2="23" y2="19" />
    </svg>
  );
}
