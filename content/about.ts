import type { About } from "@/types/content";

/**
 * Short professional narrative for the About section (Phase 5). Synthesized from the
 * resume, not pasted from it — every claim traces back to `experience.ts`/`skills.ts`.
 * Never strengthened with seniority language content-check doesn't already ban
 * elsewhere (senior/expert/architect/industry leader/...).
 */
export const about: About = {
  paragraphs: [
    "I'm Bhanu, a Data Engineer working across data engineering, database development, automation, and analytics. Day to day, that means writing Python and SQL to ingest, transform, and validate operational data, then building the pipelines and platforms that keep it trustworthy enough to act on.",
    "Right now I manage utility data — billing, meters, usage, and cost — across Cleveland State University's campus, and I'm building an Azure-based lakehouse with Databricks, ADLS Gen2, and Delta Lake to bring that data into one governed, analysis-ready platform.",
    "The thread through all of it is the same: validate early, reconcile carefully, and connect raw operational records to the reporting and systems people actually rely on.",
  ],
};
