import type { SkillGroup } from "@/types/content";

/** Group names and items are verbatim from the resume. No proficiency ratings (the resume gives none). */
export const skills: SkillGroup[] = [
  {
    id: "programming-data-processing",
    name: "Programming & Data Processing",
    skills: ["Python", "SQL", "T-SQL", "PySpark", "Spark SQL", "Apache Spark", "pandas"],
  },
  {
    id: "data-engineering",
    name: "Data Engineering",
    skills: [
      "ETL/ELT",
      "Data Pipelines",
      "Data Ingestion & Integration",
      "Batch & Incremental Processing",
      "CDC",
      "MERGE/Upsert",
      "SCD Type 1/2",
      "Data Transformation",
      "REST APIs",
    ],
  },
  {
    id: "cloud-lakehouse",
    name: "Cloud & Lakehouse",
    skills: [
      "Microsoft Azure",
      "Azure Databricks",
      "ADLS Gen2",
      "Delta Lake",
      "Medallion Architecture",
      "Azure SQL Database",
      "Microsoft SQL Server",
      "Unity Catalog",
    ],
  },
  {
    id: "data-modeling-quality",
    name: "Data Modeling & Quality",
    skills: [
      "Relational & Dimensional Modeling",
      "Data Warehousing",
      "Star Schema",
      "Fact & Dimension Tables",
      "Schema Design",
      "Data Validation",
      "Reconciliation",
      "Deduplication",
      "Schema Evolution",
    ],
  },
  {
    id: "analytics-engineering-tools",
    name: "Analytics & Engineering Tools",
    skills: [
      "Power BI",
      "SQL Server Management Studio (SSMS)",
      "Git",
      "GitHub",
      "VS Code",
      "Microsoft Power Automate",
    ],
  },
];
