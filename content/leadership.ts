import type { Leadership } from "@/types/content";

/**
 * Verbatim from the resume, plus the specific title Bhanu confirmed in Phase 7.5
 * ("Vice President" → "Vice President of Programming" — GPSA has multiple VP roles).
 * Additional detail only if Bhanu supplies real facts.
 */
export const leadership: Leadership[] = [
  {
    id: "gpsa-vice-president",
    role: "Vice President of Programming",
    org: "Graduate and Professional Student Association (GPSA)",
    institution: "Cleveland State University",
    location: "Cleveland, OH",
    start: "2025-08",
    end: "present",
    bullets: [
      "Lead graduate-student initiatives and collaborate with university leadership and cross-functional stakeholders on programming, planning, communications, and organizational initiatives.",
    ],
  },
];
