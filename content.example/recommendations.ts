import type { Recommendation } from "@/types/content";

/**
 * EXAMPLE CONTENT — entirely fictional (Alex Chen and Northwind Retail Group are not
 * real). Unlike the real content/recommendations.ts (empty until real, approved text
 * arrives), this one record demonstrates the shape of an approved recommendation:
 * `approved: true` is what makes the Recommendations section render at all
 * (CLAUDE.md §2 rule 5) — never set it to true without the real approval it stands for.
 */
export const recommendations: Recommendation[] = [
  {
    id: "recommendation-alex-chen",
    quote:
      "Jordan turned our nightly batch jobs into a reliable streaming pipeline and made our reporting numbers something the whole team could finally trust.",
    author: "Alex Chen",
    role: "Engineering Manager",
    org: "Northwind Retail Group",
    relationship: "Direct manager",
    approved: true,
  },
];
