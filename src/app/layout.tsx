import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/app/fonts";
import { SkipLink } from "@/components/ui/SkipLink";
import { site } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
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
        <div className="grain" aria-hidden="true" />
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
