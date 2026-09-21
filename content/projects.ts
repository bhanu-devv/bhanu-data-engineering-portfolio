import type { Project } from "@/types/content";

/**
 * Bullets are verbatim from the resume; summaries use only facts stated there.
 *
 * Not yet supplied (omitted, never invented):
 *  - links (GitHub/demo): only real, Bhanu-approved URLs (GitHub integration is Phase 12)
 *  - images: no screenshots are planned (sanitized diagrams instead)
 *  - architecture: custom sanitized diagram data arrives in Phase 6 (PLANNING.md §9.4)
 *
 * The lakehouse project is written in the present progressive in the resume, so it is
 * "in-progress" and carries no outcome metrics.
 */
export const projects: Project[] = [
  {
    slug: "csu-utilities-lakehouse",
    title: "CSU Utilities Azure Data Engineering & Lakehouse Platform",
    summary:
      "An in-progress, end-to-end Azure data platform that centralizes billing, meter, usage, cost, payment, and operational data across 20+ campus buildings, replacing fragmented spreadsheet-driven workflows.",
    status: "in-progress",
    tech: [
      "Azure Databricks",
      "PySpark",
      "Spark SQL",
      "ADLS Gen2",
      "Delta Lake",
      "Azure SQL",
      "T-SQL",
      "Unity Catalog",
      "Power BI",
    ],
    bullets: [
      "Architecting an end-to-end Azure data platform to centralize billing, meter, usage, cost, payment, and operational data across 20+ campus buildings and 170+ monthly bill-related items, replacing fragmented spreadsheet-driven workflows.",
      "Implementing Azure Data Lake Storage Gen2 (ADLS Gen2) and a Medallion Architecture (Bronze/Silver/Gold) to separate raw source data, validated engineering datasets, and business-ready consumption layers.",
      "Developing transformation pipelines with Azure Databricks, PySpark, Spark SQL, and Delta Lake, including schema validation, standardization, deduplication, source-to-target mapping, and reconciliation.",
      "Designing incremental data processing using business keys, MERGE/upsert patterns, and SCD Type 1/Type 2 techniques to manage current and historical building, vendor, account, and meter attributes.",
      "Building reusable data-quality controls for duplicate detection, billing-period gaps, meter-date inconsistencies, unit mismatches, null validation, and source-to-target reconciliation, with rejected records routed for review instead of silently discarded.",
      "Designing Gold-layer dimensional models and governed datasets for Power BI and operational reporting, incorporating idempotent processing, audit logging, schema evolution, lineage, and role-based access.",
    ],
    featured: true,
  },
  {
    slug: "csu-energy-star-automation",
    title: "CSU ENERGY STAR Automation",
    summary:
      "A Python ETL pipeline that ingests, transforms, validates, and standardizes recurring multi-utility data for ENERGY STAR Portfolio Manager reporting.",
    status: "complete",
    tech: ["Python", "pandas", "REST APIs", "ETL", "Data Validation"],
    bullets: [
      "Built a Python ETL pipeline to ingest, transform, validate, standardize, and prepare recurring multi-utility data for ENERGY STAR Portfolio Manager reporting.",
      "Processed and validated 6,854+ utility records through automated test workflows, verifying billing periods, meter dates, usage, costs, units, duplicate records, and data consistency prior to REST API transmission.",
      "Reduced recurring ENERGY STAR data preparation from approximately 3 workdays to 5 minutes by automating extraction, transformation, validation, reconciliation, and API-ready data preparation.",
    ],
    metricIds: ["energy-star-records", "energy-star-prep"],
    featured: true,
  },
  {
    slug: "steam-bill-automation",
    title: "Steam Bill Automation System",
    summary:
      "A Python ingestion and transformation workflow that parses semi-structured utility PDFs into standardized Excel datasets, with automated validation and reconciliation.",
    status: "complete",
    tech: ["Python", "pdfplumber", "openpyxl", "ETL"],
    bullets: [
      "Engineered a Python ingestion and transformation workflow using pdfplumber and openpyxl to parse semi-structured utility PDFs and convert meter readings, usage, multipliers, billing periods, and charges into standardized Excel datasets.",
      "Reduced steam-bill data extraction from approximately 1 hour to under 2 minutes (97%) while preserving existing formulas and established business rules.",
      "Automated validation and reconciliation for missing meters, zero-usage records, multiplier changes, usage mismatches, and bill-to-workbook discrepancies.",
    ],
    metricIds: ["steam-bill-extraction"],
    featured: true,
  },
];
