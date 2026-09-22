import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

/**
 * Typography system (CLAUDE.md §4 "Typography"; PLANNING.md §5.2; Phase 3 Step 2).
 *
 * Two primary families, plus one utility mono for technical labels/tags — see
 * PLANNING.md §5.2 for why a third, narrowly-scoped family doesn't count against the
 * "at most two primary families" instruction:
 *  - Space Grotesk (display + headings): a modern geometric grotesque with real
 *    character at large sizes — technical and premium without being a "sci-fi" font.
 *  - Inter (body/UI): the highly-readable neutral partner for paragraphs, labels, and
 *    interface chrome.
 *  - JetBrains Mono (technical metadata / tech tags only): distinguishes "Python",
 *    "AWS Glue"-style labels from prose, which is the one role neither of the above
 *    families is built for.
 *
 * All self-hosted via next/font (no runtime request to Google, no external <link>,
 * per CLAUDE.md §7 conventions) and exposed as CSS variables that src/styles/tokens.css
 * maps to --font-display/--font-body/--font-mono.
 */

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/** Combined class list for <html>/<body>, so every font's CSS variable is in scope. */
export const fontVariables = `${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`;
