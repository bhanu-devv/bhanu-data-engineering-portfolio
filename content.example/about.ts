import type { About } from "@/types/content";

/** EXAMPLE CONTENT — mirrors content/about.ts's shape with Jordan A. Rivera's fictional facts. */
export const about: About = {
  paragraphs: [
    "I'm Jordan, a Data Engineer working across data engineering, automation, and analytics. Day to day, that means writing Python and SQL to ingest, transform, and validate operational data, then building the pipelines that keep it dependable enough to act on.",
    "Right now I lead the design of a cloud lakehouse that unifies inventory, order, and fulfillment data across 12+ regional warehouses, moving the team off nightly spreadsheet exports and onto one governed platform.",
    "The thread through all of it is the same: catch data-quality issues early, reconcile carefully, and connect raw operational records to the reporting people actually rely on.",
  ],
};
