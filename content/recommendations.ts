import type { Recommendation } from "@/types/content";

/**
 * One real, approved record (Phase 9.6 Part 10) — Bhanu's direct manager at Cleveland
 * State University, published exactly as written on LinkedIn, with Bhanu's explicit
 * approval to publish and the author's own LinkedIn recommendation constituting the
 * required permission (CLAUDE.md §2 rule 5). `quote` is the complete, verbatim
 * recommendation — never rewritten and then quoted as if original. `excerpt` is an
 * exact substring of `quote` (not a paraphrase) for the section's collapsed card;
 * `summary` is clearly-labeled prose, never rendered inside quotation marks.
 */
export const recommendations: Recommendation[] = [
  {
    id: "joseph-minerd-manager",
    quote:
      "Bhanudeepak is truly a wonderful person to have on the team. In a very short timeframe, he has successfully identified root issues and applied his knowledge of data processing and analytics to streamline our utility workflow at Cleveland State. Among the many specifics, Bhanudeepak has worked to create automation that parses out PDF text into useable data across many different bill formats. Process redundancy has been eliminated, quality of data has increased, and total workflow time has been greatly improved. He does it all with a smile on his face! Bhanudeepak is a joy to work with.",
    excerpt: "Bhanudeepak is truly a wonderful person to have on the team.",
    summary:
      "Joe specifically recognized identifying root issues and applying data processing and analytics to streamline the utility workflow, automation that parses PDF text into usable data across multiple bill formats, eliminating process redundancy, increasing data quality, and improving total workflow time.",
    author: "Joseph Minerd",
    role: "Utilities and Sustainability Manager",
    org: "Cleveland State University",
    relationship: "Joseph managed me directly.",
    url: "https://www.linkedin.com/in/joseph-minerd-21a59143/",
    approved: true,
  },
];
