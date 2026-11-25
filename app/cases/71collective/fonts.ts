import { Archivo, Montserrat, Playfair_Display, Roboto } from "next/font/google";

// The sister companies' own typefaces, so each Ask us answer looks like it
// came from that company. Mather's Pragmatica Extended is an Adobe font;
// Archivo at full width is the closest free stand-in.
const s71Heading = Playfair_Display({ subsets: ["latin"], variable: "--font-s71-heading" });
const s71Body = Roboto({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-s71-body" });
const matherHeading = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-mather-heading" });
const matherBody = Montserrat({ subsets: ["latin"], variable: "--font-mather-body" });

export const groupFontVars = [s71Heading, s71Body, matherHeading, matherBody].map((f) => f.variable).join(" ");
