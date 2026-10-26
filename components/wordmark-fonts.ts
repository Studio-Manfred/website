import {
  Bungee,
  Great_Vibes,
  Inter_Tight,
  Playfair_Display,
  Raleway,
  Rock_Salt,
  Rubik_Wet_Paint,
  Space_Grotesk,
  Special_Elite,
  UnifrakturCook,
} from "next/font/google";

// The fonts for the wordmark easter egg (lib/wordmark-fonts.ts). Nothing here
// loads with the page: preload is off, and useWordmarkEgg imports this module
// only on the first hover or tap. Next calls each loader at build time, so the
// call arguments must be literals, so there is no shared options object.

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
const rubikWetPaint = Rubik_Wet_Paint({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
const interTight = Inter_Tight({
  weight: "800",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
const unifrakturCook = UnifrakturCook({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
const raleway = Raleway({
  weight: "200",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
const playfairDisplay = Playfair_Display({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
const rockSalt = Rock_Salt({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});
const spaceGrotesk = Space_Grotesk({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const wordmarkFamilies: Record<string, string> = {
  "great-vibes": greatVibes.style.fontFamily,
  "rubik-wet-paint": rubikWetPaint.style.fontFamily,
  "inter-tight": interTight.style.fontFamily,
  "unifraktur-cook": unifrakturCook.style.fontFamily,
  raleway: raleway.style.fontFamily,
  bungee: bungee.style.fontFamily,
  "playfair-display": playfairDisplay.style.fontFamily,
  "special-elite": specialElite.style.fontFamily,
  "rock-salt": rockSalt.style.fontFamily,
  "space-grotesk": spaceGrotesk.style.fontFamily,
};
