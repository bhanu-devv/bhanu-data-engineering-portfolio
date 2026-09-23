import type { Leadership } from "@/types/content";

/** EXAMPLE CONTENT — entirely fictional. */
export const leadership: Leadership[] = [
  {
    id: "wwc-austin-chapter-co-lead",
    role: "Chapter Co-Lead",
    org: "Women Who Code — Austin Chapter",
    institution: "Women Who Code",
    location: "Austin, TX",
    start: "2022-06",
    end: "present",
    bullets: [
      "Organize monthly data-engineering workshops and mentor members transitioning into data careers.",
    ],
    summary:
      "Organize monthly data-engineering workshops and mentor members transitioning into data careers, supporting 50+ chapter members.",
    scope: "50+ chapter members",
    expanded: [
      {
        heading: "Programming & mentorship",
        items: [
          "Plan and run monthly workshops covering practical data-engineering skills for career-changers.",
          "Pair new members with mentors and track progress toward their first data role.",
        ],
      },
    ],
  },
];
