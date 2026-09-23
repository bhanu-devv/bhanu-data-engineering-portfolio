import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/app/fonts";
import { SkipLink } from "@/components/ui/SkipLink";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import { site } from "@/lib/content";
import "./globals.css";

/**
 * Production metadata (Phase 9 Step 8). Deliberately has NO `metadataBase` and NO
 * `openGraph.url`/`alternates.canonical`: the production domain is still unresolved
 * (PLANNING.md §14.2 item 11), and CLAUDE.md's "never invent" rule applies to URLs
 * exactly as it does to any other fact — inventing a Vercel URL or a placeholder
 * domain now would have to be silently swapped out later. Next.js falls back to
 * `http://localhost:3000` for any OG/Twitter image URL resolution in the meantime
 * (a build-time warning, not a runtime error) — expected and documented here, not a
 * bug. Revisit this whole block once a domain exists (Phase 11).
 */
export const metadata: Metadata = {
  title: {
    default: site.seo.title,
    template: `%s | ${site.name.full}`,
  },
  description: site.seo.description,
  authors: [{ name: site.name.full }],
  creator: site.name.full,
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    title: site.seo.title,
    description: site.seo.description,
    siteName: site.seo.title,
    // `firstName`/`lastName` deliberately omitted: the resume gives one full name,
    // not first/last components, and CLAUDE.md §2 rule 10 says use "Bhanudeepak
    // Nagumothu" whole, not split apart.
  },
  twitter: {
    // No social handle exists to invent (CLAUDE.md "never invent... links").
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#050506", // --palette-void — matches the fixed dark theme (no light variant)
};

// Sets `.js` on <html> before first paint, entirely synchronously, so CSS can scope
// JS-only starting states (Reveal's pre-animation opacity/transform, the web mesh's
// unfurl) behind it. Content itself never depends on this: without it, everything
// simply renders in its final, fully visible state (CLAUDE.md §5 "Progressive
// enhancement"). See globals.css and src/styles/web.css for the `.js` selectors this
// enables.
const noFlashScript = `document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  // suppressHydrationWarning: noFlashScript deliberately adds "js" to <html>'s
  // className before React hydrates, so server and client attributes differ by
  // design — this is the documented pattern for any script that must run before
  // hydration (the same technique next-themes uses for its no-flash script). It only
  // silences this one attribute diff on this one element; real mismatches elsewhere
  // still surface normally.
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>
        <PersonJsonLd />
        <div className="grain" aria-hidden="true" />
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
