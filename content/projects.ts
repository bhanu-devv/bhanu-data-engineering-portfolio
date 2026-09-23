import type { Project } from "@/types/content";

/**
 * Bullets are verbatim from the resume; summaries/caseStudy use only facts stated there.
 *
 * Not yet supplied (omitted, never invented):
 *  - links: no project currently has an explicitly approved public GitHub repository
 *    URL (GitHub integration overall is still Phase 12) — never invented or inferred
 *  - images: no screenshots are planned (sanitized diagrams instead)
 *
 * The lakehouse project is written in the present progressive in the resume, so it is
 * "in-progress" and carries no outcome metrics; every one of its `caseStudy.milestones`
 * is honestly `state: "in-progress"` too — the resume's own bullets ("Architecting",
 * "Implementing", "Designing", "Building") never distinguish a sub-component as
 * finished, so content-check.ts's status-consistency rule (Phase 6) would reject any
 * "implemented" milestone here even if one were added by mistake.
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
    caseStudy: {
      problem:
        "CSU's utility data — billing, meter, usage, and cost — is scattered across spreadsheets and vendor exports for more than 20 campus buildings, which makes reconciliation and reporting slow and error-prone.",
      approach:
        "Designing and building an Azure-based lakehouse that lands raw data first, then progressively validates and reshapes it through Bronze, Silver, and Gold layers before it reaches reporting.",
      responsibility:
        "I'm designing the platform's data model, building the Python and SQL ETL pipelines, and writing the validation and reconciliation logic myself.",
      validation:
        "Every layer applies validation rules — duplicate detection, billing-period gaps, meter-date inconsistencies, unit mismatches — with rejected records routed for review instead of silently discarded.",
      milestones: [
        { label: "ADLS Gen2 with a Bronze / Silver / Gold medallion layout", state: "in-progress" },
        { label: "Databricks, PySpark, and Spark SQL transformation pipelines with schema validation and reconciliation", state: "in-progress" },
        { label: "Incremental processing with MERGE/upsert patterns and SCD Type 1/2 history tracking", state: "in-progress" },
        { label: "Gold-layer dimensional models and governed Power BI reporting", state: "in-progress" },
        { label: "Reusable data-quality controls with rejected records routed for review", state: "in-progress" },
      ],
    },
    architecture: {
      nodes: [
        { id: "sources", label: "Utility Sources" },
        { id: "bronze", label: "Bronze (Raw)" },
        { id: "silver", label: "Silver (Validated)" },
        { id: "gold", label: "Gold (Dimensional)" },
        { id: "powerbi", label: "Power BI" },
      ],
      edges: [
        ["sources", "bronze"],
        ["bronze", "silver"],
        ["silver", "gold"],
        ["gold", "powerbi"],
      ],
    },
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
    caseStudy: {
      problem:
        "Recurring ENERGY STAR Portfolio Manager reporting depended on manually collecting and reformatting multi-utility data by hand — a slow, error-prone workflow repeated on a recurring schedule.",
      approach:
        "Built a Python ETL pipeline that pulls the recurring source data, validates and standardizes it, and prepares it for direct submission through ENERGY STAR's REST API.",
      responsibility: "I built the entire pipeline myself — extraction, validation, transformation, and the API submission logic.",
      validation:
        "Every record is checked against billing periods, meter dates, usage, costs, units, and duplicates before submission; 6,854+ records were processed and validated through this workflow.",
      milestones: [
        { label: "Python ETL extraction from recurring source data", state: "implemented" },
        { label: "Automated validation for billing periods, meter dates, usage, costs, and duplicates", state: "implemented" },
        { label: "API-ready payload preparation and REST API transmission to ENERGY STAR Portfolio Manager", state: "implemented" },
      ],
    },
    architecture: {
      nodes: [
        { id: "source", label: "Source Workbook" },
        { id: "validate", label: "Validate & Map" },
        { id: "transform", label: "Transform" },
        { id: "payload", label: "API Payload" },
        { id: "api", label: "REST API" },
        { id: "log", label: "Response Log" },
      ],
      edges: [
        ["source", "validate"],
        ["validate", "transform"],
        ["transform", "payload"],
        ["payload", "api"],
        ["api", "log"],
      ],
    },
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
    caseStudy: {
      problem:
        "Steam-bill data arrived as semi-structured PDFs that had to be manually transcribed into an Excel workbook, preserving the workbook's existing formulas and business rules.",
      approach:
        "Engineered a Python workflow using pdfplumber to extract bill data from PDFs and openpyxl to populate the existing workbook without breaking its formulas.",
      responsibility: "I built the parsing, normalization, and workbook-population logic, plus the validation and reconciliation checks.",
      validation:
        "Automated checks catch missing meters, zero-usage records, multiplier changes, and usage mismatches before the workbook is finalized.",
      milestones: [
        { label: "PDF parsing and field extraction with pdfplumber", state: "implemented" },
        { label: "Formula-preserving workbook population with openpyxl", state: "implemented" },
        { label: "Automated validation and reconciliation for missing meters, zero-usage records, and mismatches", state: "implemented" },
      ],
    },
    architecture: {
      nodes: [
        { id: "pdf", label: "PDF Bill" },
        { id: "extract", label: "Extraction" },
        { id: "normalize", label: "Normalize" },
        { id: "validate", label: "Validate" },
        { id: "workbook", label: "Workbook" },
        { id: "reconcile", label: "Reconcile" },
      ],
      edges: [
        ["pdf", "extract"],
        ["extract", "normalize"],
        ["normalize", "validate"],
        ["validate", "workbook"],
        ["workbook", "reconcile"],
      ],
    },
    metricIds: ["steam-bill-extraction"],
    featured: true,
  },
];
