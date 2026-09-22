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
    metricIds: ["receipt-processing-time"],
    featured: true,
  },
];
