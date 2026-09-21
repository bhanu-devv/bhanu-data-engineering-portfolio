import type { Metric } from "@/types/content";

/**
 * Proof-strip and project metrics. Every number appears here exactly once and is
 * traced to the resume. Qualifiers ("approximately", "+") are kept as written.
 * Do not derive new figures or percentages.
 */
export const metrics: Metric[] = [
  {
    id: "campus-buildings",
    value: "20+",
    label: "Campus buildings",
    context:
      "Billing, meter, usage, cost, and operational data managed across 20+ campus buildings.",
    source: "Resume: Professional Summary; Data Analyst – Utilities Department",
  },
  {
    id: "monthly-bill-items",
    value: "170+",
    label: "Monthly bill-related items",
    context:
      "Electric, steam, chilled water, natural gas, sewer, and water billing data across campus buildings.",
    source: "Resume: Data Analyst – Utilities Department",
  },
  {
    id: "energy-star-records",
    value: "6,854+",
    label: "Utility records validated",
    context:
      "Processed and validated through automated test workflows prior to REST API transmission.",
    source: "Resume: CSU ENERGY STAR Automation",
  },
  {
    id: "energy-star-prep",
    value: "~3 days → 5 min",
    label: "ENERGY STAR data preparation",
    context:
      "Recurring preparation reduced from approximately 3 workdays to 5 minutes.",
    source: "Resume: CSU ENERGY STAR Automation",
  },
  {
    id: "steam-bill-extraction",
    value: "~1 hr → <2 min",
    label: "Steam-bill data extraction",
    context:
      "Reduced from approximately 1 hour to under 2 minutes (97%) while preserving existing formulas and business rules.",
    source: "Resume: Steam Bill Automation System",
  },
];
