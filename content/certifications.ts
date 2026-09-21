import type { Certification } from "@/types/content";

/**
 * Names are verbatim from the resume's "Certifications & Training" list.
 *
 * NOT supplied, therefore ABSENT (never invented, never shown as placeholders):
 *   issued, expires, credentialId, verifyUrl, badge, and `kind`
 *   (the resume does not classify these as certification vs. applied skill vs. training).
 * When Bhanu provides real values, add them here and the UI shows them automatically.
 */
export const certifications: Certification[] = [
  {
    id: "microsoft-applied-skills-sql-to-azure-sql",
    name: "Microsoft Applied Skills: Migrate SQL Server Workloads to Azure SQL Database",
    issuer: "Microsoft",
  },
  {
    id: "oci-2025-ai-foundations-associate",
    name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
  },
  {
    id: "oci-2025-foundations-associate",
    name: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle",
  },
  {
    id: "aws-academy-cloud-foundations",
    name: "AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
  },
  {
    id: "aws-academy-machine-learning-foundations",
    name: "AWS Academy Machine Learning Foundations",
    issuer: "AWS Academy",
  },
];
