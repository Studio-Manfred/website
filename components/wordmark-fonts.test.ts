import { describe, expect, it, vi } from "vitest";
import { WORDMARK_FONTS, WORDMARK_FONT_KEYS } from "@/lib/wordmark-fonts";

// Each next/font loader becomes a spy that returns a family named after itself.
const loaders = vi.hoisted(() => ({
  Great_Vibes: "great-vibes",
  Rubik_Wet_Paint: "rubik-wet-paint",
  Inter_Tight: "inter-tight",
  UnifrakturCook: "unifraktur-cook",
  Raleway: "raleway",
  Bungee: "bungee",
  Playfair_Display: "playfair-display",
  Special_Elite: "special-elite",
  Rock_Salt: "rock-salt",
  Space_Grotesk: "space-grotesk",
}));

vi.mock("next/font/google", () => {
  const spies: Record<string, unknown> = {};
  for (const name of Object.keys(loaders)) {
    spies[name] = vi.fn(() => ({ style: { fontFamily: `family-${name}` } }));
  }
  return spies;
});

describe("wordmark fonts", () => {
  it("has a family for every font in the cycle, and none more", async () => {
    const { wordmarkFamilies } = await import("./wordmark-fonts");
    expect(Object.keys(wordmarkFamilies).sort()).toEqual(
      [...WORDMARK_FONT_KEYS].sort(),
    );
  });

  it("loads each font with the weight the metadata says, without preloading it", async () => {
    await import("./wordmark-fonts");
    const google = await import("next/font/google");
    for (const [name, key] of Object.entries(loaders)) {
      const font = WORDMARK_FONTS.find((f) => f.key === key);
      const spy = (google as unknown as Record<string, ReturnType<typeof vi.fn>>)[name];
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          weight: String(font?.weight),
          preload: false,
          display: "swap",
        }),
      );
    }
  });

  it("maps each key to the family its own loader gave", async () => {
    const { wordmarkFamilies } = await import("./wordmark-fonts");
    for (const [name, key] of Object.entries(loaders)) {
      expect(wordmarkFamilies[key]).toBe(`family-${name}`);
    }
  });
});
