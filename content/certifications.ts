import type { Certification } from "@/types/content";

/**
 * Names are verbatim from the resume's "Certifications & Training" list.
 *
 * `kind` (Phase 7): read directly off each credential's own verbatim name, not
 * invented — "Applied Skills" and "Academy" are the issuers' own category words, and
 * "Certified ... Associate" is Oracle's own certification naming. Structuring what the
 * name already states isn't a new claim; CLAUDE.md §2 rule 4 still applies to
 * everything else, so `issued`/`expires`/`credentialId`/`verifyUrl`/`badge` stay ABSENT
 * (never invented, never shown as placeholders) until Bhanu supplies real values.
 */
export const certifications: Certification[] = [
  {
    id: "microsoft-applied-skills-sql-to-azure-sql",
    name: "Microsoft Applied Skills: Migrate SQL Server Workloads to Azure SQL Database",
    issuer: "Microsoft",
    kind: "applied-skill",
  },
  {
    id: "oci-2025-ai-foundations-associate",
    name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    kind: "certification",
    // Official Oracle verification (Phase 9.6 Part 15, LinkedIn-supported, Bhanu-approved).
    issued: "2026-04",
    credentialId: "103431088OCI25AICFA",
    verifyUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=9241F634CC1926181DC19606380BDBAF5E99877C739C95F4F023F4E4BBC06A11",
  },
  {
    id: "oci-2025-foundations-associate",
    name: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle",
    kind: "certification",
    // Official Oracle verification (Phase 9.6 Part 15, LinkedIn-supported, Bhanu-approved).
    issued: "2026-03",
    expires: "2028-03",
    credentialId: "103431088OCI25FNDCFA",
    verifyUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=9D9DD490628BFBB0C9BCBFCDA6FED1D8E53DB774751C4F0740AB09840CA9361A",
  },
  {
    id: "aws-academy-cloud-foundations",
    name: "AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
    kind: "training",
  },
  {
    id: "aws-academy-machine-learning-foundations",
    name: "AWS Academy Machine Learning Foundations",
    issuer: "AWS Academy",
    kind: "training",
  },
];
