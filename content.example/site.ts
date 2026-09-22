import { needsInput } from "@/lib/needs-input";
import type { Site } from "@/types/content";

/**
 * EXAMPLE CONTENT — entirely fictional. This mirrors the shape of the real
 * content/site.ts so a fork can see the pattern before writing their own (PLANNING.md
 * §12). "Jordan Rivera" is not a real person; replace every field with your own facts.
 */
export const site: Site = {
  name: {
    full: "Jordan A. Rivera",
    short: "Jordan",
    monogram: "JR",
  },

  // Your own positioning statement, written from your own resume — kept short and honest.
  positioning:
    "Data Engineer designing resilient cloud pipelines and automation that turn scattered operational data into dependable, well-governed systems.",

  location: "Austin, TX",

  contact: {
    // example.com is the domain IANA reserves for documentation and examples — safe to
    // use here. Replace with your own address.
    email: "jordan.rivera@example.com",
    // 555-01XX is the range NANPA reserves for fictional use in the US and Canada.
    phone: { display: "206-555-0142", tel: "+12065550142" },
  },

  seo: {
    title: "Jordan A. Rivera | Data Engineer",
    description:
      "Jordan A. Rivera, Data Engineer designing resilient cloud pipelines and automation that turn scattered operational data into dependable, well-governed systems.",
    // Left unresolved on purpose — demonstrates needsInput(): the site builds and
    // content:check passes with this still open; it just isn't invented.
    url: needsInput("Canonical site URL (known once a domain is chosen)"),
  },

  portrait: {
    // No image ships with the template — add your own under public/images/profile/
    // and point this at it. The real site treats the source file as read-only and
    // applies all visual treatment (grayscale, framing) in CSS at render time.
    src: "/images/profile/example-portrait.png",
    alt: "Portrait of Jordan A. Rivera",
    width: 400,
    height: 400,
  },
};
