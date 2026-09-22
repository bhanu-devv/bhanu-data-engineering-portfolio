import type { Metric } from "@/types/content";

/**
 * EXAMPLE CONTENT — entirely fictional. Every real metric must trace to a `source`
 * (CLAUDE.md §2 rule 1); these fictional ones follow the same discipline so the pattern
 * is obvious to copy.
 */
export const metrics: Metric[] = [
  {
    id: "warehouses-connected",
    value: "12+",
    label: "Warehouses connected",
    context: "Inventory and fulfillment data integrated across 12+ regional warehouses.",
    source: "Resume: Professional Summary",
  },
  {
    id: "daily-orders-processed",
    value: "40,000+",
    label: "Daily orders processed",
    context: "Order events processed through the streaming pipeline each day.",
    source: "Resume: Senior Data Engineer, Northwind Retail Group",
  },
  {
    id: "reporting-lag-reduced",
    value: "~2 days → 10 min",
    label: "Reporting lag reduced",
    context: "Time from an order event to it appearing in operational dashboards.",
    source: "Resume: Order Reporting Automation project",
  },
  {
    id: "receipt-processing-time",
    value: "~30 min → 4 min",
    label: "Warehouse receipt processing time",
    context: "Time to turn a scanned warehouse receipt into a structured inventory record.",
    source: "Resume: Warehouse Receipt Digitization project",
  },
];
