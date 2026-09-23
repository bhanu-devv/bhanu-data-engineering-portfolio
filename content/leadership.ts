import type { Leadership } from "@/types/content";

/**
 * `bullets` is verbatim from the resume, plus the specific title Bhanu confirmed in
 * Phase 7.5 ("Vice President" → "Vice President of Programming" — GPSA has multiple
 * VP roles). `summary`/`scope`/`expanded` were added in Phase 9.6 from LinkedIn
 * material Bhanu explicitly approved as an additional source (PLANNING.md §15) —
 * dates are deliberately UNCHANGED from the already-validated resume values (LinkedIn
 * lists a different start date; per Bhanu's explicit instruction the master value is
 * authoritative unless he approves changing it).
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
    summary:
      "Lead planning and execution of student-engagement initiatives and programming for GPSA, supporting 100+ graduate students through structured programming and targeted outreach.",
    scope: "100+ graduate students",
    expanded: [
      {
        heading: "Event planning & execution",
        items: [
          "End-to-end planning for student-engagement events — ideation, budgeting, logistics, and on-ground execution — including Graduate Gala Night and WhirlyBall.",
          "Coordinated multiple student-engagement events as part of structured, targeted outreach programming.",
        ],
      },
      {
        heading: "Stakeholder collaboration",
        items: [
          "Collaborated with university leadership, student leadership teams, and administrative units on programming, planning, and communications.",
          "Strengthened Programming Board coordination and workflows.",
        ],
      },
    ],
  },
];
