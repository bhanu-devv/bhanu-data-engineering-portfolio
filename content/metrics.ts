import type { Metric } from "@/types/content";

/**
 * Proof-strip and project metrics. Every number appears here exactly once and is
 * traced to the resume. Qualifiers ("approximately", "+") are kept as written.
 * Do not derive new figures or percentages.
 */
export const metrics: Metric[] = [
  {
    // Phase 9.6 Part 1: the Hero proof strip's first item, combining the two scope
    // facts below into one compound value ("20+ campus buildings · 170+ monthly
    // bill-related items") under a label naming the platform itself. A scope/scale
    // statement, not a completion claim — the project's own status badge (Current
    // Build) is what says whether it's finished, not this metric.
    id: "azure-platform-scope",
    value: "20+ campus buildings · 170+ monthly bill-related items",
    label: "Azure Utility Data Platform",
    context:
      "Billing, meter, usage, cost, and operational data in scope across 20+ campus buildings and 170+ monthly bill-related items.",
    source: "Resume: Professional Summary; Data Analyst – Utilities Department",
  },
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
