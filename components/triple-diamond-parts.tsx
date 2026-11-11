// Small pieces shared by TripleDiamondRoles and TripleDiamondProcess.
import type { Guide, Level, LevelId } from "@/lib/triple-diamond";

export const label = "text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--color-business-blue)]";

// One brand tint per phase (STU-1173): Light Beige, Blue 50, a lighter Human
// Pink. The panel and the modal header use it, so the phases are easy to tell apart.
export const PHASE_BG = ["var(--beige-light)", "var(--blue-50)", "color-mix(in srgb, var(--pink) 60%, white)"];

export const levelOf = (levels: Level[], id: LevelId) => levels.find((l) => l.id === id)!;

// Three bars, as many filled as the level is hard. Decorative: the name is
// always written next to it.
// `inverted`: white bars for a blue (pressed) button.
export function LevelBars({ levels, id, inverted = false }: { levels: Level[]; id: LevelId; inverted?: boolean }) {
  const n = levels.findIndex((l) => l.id === id) + 1;
  return (
    <span aria-hidden="true" className="inline-flex items-end gap-[2px]">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-[4px] rounded-[1px] ${i <= n ? (inverted ? "bg-white" : "bg-[var(--color-business-blue)]") : inverted ? "bg-white/35" : "bg-[var(--color-border-default)]"}`}
          style={{ height: `${4 + i * 3}px` }}
        />
      ))}
    </span>
  );
}

export function LevelTag({ guide, id }: { guide: Guide; id: LevelId }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-light text-[var(--color-text-muted)] whitespace-nowrap">
      <LevelBars levels={guide.levels} id={id} />
      <span>
        <span className="sr-only">{guide.copy.level}: </span>
        {levelOf(guide.levels, id).name}
      </span>
    </span>
  );
}
