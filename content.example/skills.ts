import type { SkillGroup } from "@/types/content";

/** EXAMPLE CONTENT. No proficiency ratings by design — group skills by category instead. */
export const skills: SkillGroup[] = [
  {
    id: "programming-data-processing",
    name: "Programming & Data Processing",
    skills: ["Python", "SQL", "PySpark", "Scala", "pandas"],
  },
  {
    id: "data-engineering",
    name: "Data Engineering",
    skills: [
      "ETL/ELT",
      "Data Pipelines",
      "Streaming Ingestion",
      "Batch Processing",
      "CDC",
      "Upserts",
      "Data Transformation",
      "REST APIs",
    ],
  },
  {
    id: "cloud-lakehouse",
    name: "Cloud & Lakehouse",
    skills: ["AWS", "AWS Glue", "S3", "Redshift", "Snowflake", "Delta Lake", "Databricks"],
  },
  {
    id: "data-modeling-quality",
    name: "Data Modeling & Quality",
    skills: ["Dimensional Modeling", "Data Warehousing", "Star Schema", "Data Validation", "Reconciliation", "Deduplication"],
  },
  {
    id: "analytics-engineering-tools",
    name: "Analytics & Engineering Tools",
    skills: ["dbt", "Looker", "Airflow", "Git", "GitHub", "VS Code"],
  },
];
