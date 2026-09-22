import type { HeroNetworkNode } from "@/types/content";

/**
 * A small, curated set of real technologies for the Hero's network visualization
 * (Phase 4 Step 3) — a source → processing → storage/lakehouse → trusted-output story,
 * not an exhaustive list (CLAUDE.md §6: don't hard-code content the content layer
 * already provides). Every label below appears verbatim in content/skills.ts and/or
 * content/projects.ts; `npm run content:check` cross-checks this.
 *
 * "Power BI" is the one `live` node — the pipeline's trusted-output stage, which also
 * echoes the positioning statement's closing phrase ("...into trusted systems").
 */
export const heroNetwork: HeroNetworkNode[] = [
  { id: "python", label: "Python" },
  { id: "databricks", label: "Azure Databricks" },
  { id: "adls", label: "ADLS Gen2" },
  { id: "delta-lake", label: "Delta Lake" },
  { id: "power-bi", label: "Power BI", live: true },
];
