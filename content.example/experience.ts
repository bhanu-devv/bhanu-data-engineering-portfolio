import type { Experience } from "@/types/content";

/** EXAMPLE CONTENT — entirely fictional companies, roles, and dates. */
export const experience: Experience[] = [
  {
    id: "northwind-senior-data-engineer",
    title: "Senior Data Engineer",
    org: "Northwind Retail Group",
    location: "Austin, TX",
    start: "2022-03",
    end: "present",
    bullets: [
      "Lead the design of a cloud lakehouse that unifies inventory, order, and fulfillment data across 12+ regional warehouses, replacing a patchwork of nightly spreadsheet exports.",
      "Build streaming ingestion pipelines that reduce reporting lag from roughly two days to about ten minutes.",
      "Introduce data-quality checks that catch duplicate orders, missing warehouse scans, and mismatched SKUs before they reach downstream dashboards.",
    ],
  },
  {
    id: "prairie-analytics-data-engineer",
    title: "Data Engineer",
    org: "Prairie Analytics Co.",
    location: "Denver, CO",
    start: "2021-06",
    end: "2022-02",
    employmentType: "Contract",
    bullets: [
      "Built and maintained ETL pipelines moving client transaction data into a central warehouse for reporting.",
      "Automated a recurring reconciliation process, cutting a two-hour manual review down to a few minutes.",
    ],
  },
  {
    id: "fields-logistics-junior-analyst",
    title: "Junior Data Analyst",
    org: "Fields & Co. Logistics",
    location: "Denver, CO",
    start: "2018-06",
    end: "2019-05",
    bullets: [
      "Maintained shipment and inventory spreadsheets and produced weekly operations summaries for the logistics team.",
    ],
  },
];
