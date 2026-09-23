import type { Project } from "@/types/content";

/**
 * EXAMPLE CONTENT — entirely fictional. Shows all three states a real project can be
 * in: `in-progress` with no outcome metrics yet, and two `complete` projects that link
 * to content.example/metrics.ts via `metricIds`.
 */
export const projects: Project[] = [
  {
    slug: "northwind-inventory-lakehouse",
    title: "Northwind Inventory Lakehouse",
    summary:
      "An in-progress cloud lakehouse that unifies inventory, order, and fulfillment data from 12+ regional warehouses into one governed source of truth.",
    status: "in-progress",
    tech: ["AWS", "AWS Glue", "S3", "Delta Lake", "Databricks", "Redshift"],
    bullets: [
      "Designing a Bronze/Silver/Gold lakehouse layout to separate raw warehouse feeds, validated data, and business-ready reporting tables.",
      "Building ingestion pipelines from warehouse scanners and the order platform, with schema validation and deduplication before data lands in Silver.",
      "Defining Gold-layer dimensional models for inventory and fulfillment reporting, with role-based access for the operations and finance teams.",
    ],
    // No metricIds: this project is still in progress, so it carries no outcome
    // metrics yet — same rule as the real site (CLAUDE.md §2 rule 2).
    caseStudy: {
      problem:
        "Inventory, order, and fulfillment data was scattered across 12+ regional warehouses in nightly spreadsheet exports, making it hard to trust or reconcile.",
      approach:
        "Designing and building a cloud lakehouse that lands raw warehouse feeds first, then progressively validates and reshapes them through Bronze, Silver, and Gold layers.",
      responsibility: "I'm designing the data model and building the ingestion and transformation pipelines myself.",
      validation:
        "Schema validation and deduplication run before data lands in Silver, catching mismatched SKUs and missing warehouse scans early.",
      // Every milestone here is honestly "in-progress" — same discipline as the real
      // site's flagship project: an in-progress project claims no "implemented" work.
      milestones: [
        { label: "Bronze / Silver / Gold lakehouse layout on S3 and Delta Lake", state: "in-progress" },
        { label: "Streaming ingestion pipelines from warehouse scanners and the order platform", state: "in-progress" },
        { label: "Gold-layer dimensional models for inventory and fulfillment reporting", state: "in-progress" },
        { label: "Role-based access for the operations and finance teams", state: "in-progress" },
      ],
    },
    architecture: {
      nodes: [
        { id: "sources", label: "Warehouse Sources" },
        { id: "bronze", label: "Bronze (Raw)" },
        { id: "silver", label: "Silver (Validated)" },
        { id: "gold", label: "Gold (Dimensional)" },
        { id: "reporting", label: "Reporting" },
      ],
      edges: [
        ["sources", "bronze"],
        ["bronze", "silver"],
        ["silver", "gold"],
        ["gold", "reporting"],
      ],
    },
    // A fictional repository URL — demonstrates the optional GitHub-link mechanism.
    // Never copy this pattern with a real, unconfirmed URL (CLAUDE.md §2 rule 4).
    links: { github: "https://github.com/jordan-rivera-example/northwind-inventory-lakehouse" },
    featured: true,
  },
  {
    slug: "order-reporting-automation",
    title: "Order Reporting Automation",
    summary: "A streaming pipeline that replaced a twice-daily batch job with near real-time order reporting.",
    status: "complete",
    tech: ["Python", "Kafka", "dbt", "Snowflake"],
    bullets: [
      "Replaced a twice-daily batch export with a streaming pipeline that lands order events in the warehouse within minutes.",
      "Added automated validation for missing warehouse scans and duplicate order events before they reach dashboards.",
    ],
    caseStudy: {
      problem: "Order events reached reporting through a twice-daily batch job, so dashboards were hours behind real activity.",
      approach: "Replaced the batch export with a streaming pipeline that lands order events in the warehouse within minutes.",
      responsibility: "I built the streaming pipeline and its validation checks.",
      validation: "Automated validation catches missing warehouse scans and duplicate order events before they reach dashboards.",
      milestones: [
        { label: "Streaming ingestion pipeline replacing the twice-daily batch export", state: "implemented" },
        { label: "Automated validation for missing scans and duplicate events", state: "implemented" },
      ],
    },
    architecture: {
      nodes: [
        { id: "orders", label: "Order Events" },
        { id: "stream", label: "Streaming Ingest" },
        { id: "validate", label: "Validate" },
        { id: "warehouse", label: "Warehouse" },
        { id: "dashboards", label: "Dashboards" },
      ],
      edges: [
        ["orders", "stream"],
        ["stream", "validate"],
        ["validate", "warehouse"],
        ["warehouse", "dashboards"],
      ],
    },
    metricIds: ["reporting-lag-reduced"],
    featured: true,
  },
  {
    slug: "warehouse-receipt-digitization",
    title: "Warehouse Receipt Digitization",
    summary: "A Python workflow that parses scanned warehouse receipts into structured inventory records.",
    status: "complete",
    tech: ["Python", "pdfplumber", "pandas"],
    bullets: [
      "Built a parsing workflow to extract item counts, SKUs, and received-by information from scanned warehouse receipts.",
      "Automated validation for missing SKUs, quantity mismatches, and duplicate receipt numbers.",
    ],
    caseStudy: {
      problem: "Scanned warehouse receipts had to be manually transcribed into inventory records.",
      approach: "Built a Python workflow that parses scanned receipts and extracts structured inventory records automatically.",
      responsibility: "I built the parsing and validation logic.",
      validation: "Automated validation catches missing SKUs, quantity mismatches, and duplicate receipt numbers.",
      milestones: [
        { label: "Receipt-parsing workflow extracting item counts, SKUs, and received-by information", state: "implemented" },
        { label: "Automated validation for missing SKUs, quantity mismatches, and duplicates", state: "implemented" },
      ],
    },
    architecture: {
      nodes: [
        { id: "receipt", label: "Scanned Receipt" },
        { id: "extract", label: "Extraction" },
        { id: "validate", label: "Validate" },
        { id: "records", label: "Inventory Records" },
      ],
      edges: [
        ["receipt", "extract"],
        ["extract", "validate"],
        ["validate", "records"],
      ],
    },
    metricIds: ["receipt-processing-time"],
    featured: true,
  },
];
