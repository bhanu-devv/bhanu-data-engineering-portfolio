import type { HeroNetworkNode } from "@/types/content";

/**
 * EXAMPLE CONTENT — mirrors content/hero-network.ts. Every label below appears
 * verbatim in content.example/skills.ts and/or content.example/projects.ts.
 */
export const heroNetwork: HeroNetworkNode[] = [
  { id: "python", label: "Python" },
  { id: "databricks", label: "Databricks" },
  { id: "aws-glue", label: "AWS Glue" },
  { id: "delta-lake", label: "Delta Lake" },
  { id: "snowflake", label: "Snowflake", live: true },
];
