import type { Experience } from "@/types/content";

/**
 * Verbatim from the resume. Titles are real titles; never relabel them. `bullets` is
 * the fidelity source; `summary`/`highlights`/`impact` (Phase 5) are portfolio-friendly
 * synthesis of the same facts, not a second invented set — see CLAUDE.md §2 rule 1.
 */
export const experience: Experience[] = [
  {
    id: "csu-utilities-data-analyst",
    title: "Data Analyst – Utilities Department",
    org: "Cleveland State University",
    location: "Cleveland, OH",
    start: "2025-08",
    end: "present",
    bullets: [
      "Manage electric, steam, chilled water, natural gas, sewer, and water billing, meter, usage, cost, account, and operational data across 20+ campus buildings and 170+ monthly bill-related items, supporting reconciliation, reporting, and operational decision-making.",
      "Design and develop a centralized Azure SQL Database and Microsoft SQL Server data platform for buildings, vendors, accounts, meters, bills, usage, charges, and payments using relational modeling, schema design, validation rules, and source-to-target mappings.",
      "Build Python and SQL ETL workflows to ingest, transform, validate, reconcile, and prepare data from vendor bills, spreadsheets, APIs, and operational sources for structured storage and analytics.",
      "Implement data-quality controls to identify duplicate records, missing billing periods, meter-date gaps, usage discrepancies, unit mismatches, and reconciliation exceptions through automated validation and root-cause analysis.",
      "Configure secure Azure SQL connectivity, access controls, firewall rules, and workflow automation while supporting downstream Power BI reporting and operational analytics.",
    ],
    summary:
      "Own the data layer behind utility operations across more than 20 campus buildings at Cleveland State University — turning multi-source billing, meter, and usage records into a platform people can trust.",
    highlights: [
      "Design and build a centralized Azure SQL / SQL Server data platform for buildings, vendors, meters, bills, usage, and payments, with relational modeling and validation rules built in.",
      "Build Python and SQL ETL pipelines that ingest, transform, validate, and reconcile vendor bills, spreadsheets, and API data into structured, analysis-ready storage.",
      "Catch data-quality issues before they spread — duplicate records, missing billing periods, meter-date gaps, unit mismatches — through automated validation and root-cause analysis.",
      "Secure the platform's Azure SQL connectivity and access controls, and support the Power BI reporting built on top of it.",
    ],
    impact: "Covers 170+ recurring monthly bill-related items across the platform.",
    tech: ["Python", "SQL", "ETL/ELT", "Azure SQL Database", "Microsoft SQL Server", "Power BI"],
    // Phase 9.6 Part 4/5: the same five `bullets` above, grouped under readable
    // headings for the inline-disclosure "View full experience" state — no new facts.
    expanded: [
      {
        heading: "Utility data scope",
        items: [
          "Electric, steam, chilled water, natural gas, sewer, and water billing, meter, usage, cost, account, and operational data across 20+ campus buildings and 170+ monthly bill-related items, supporting reconciliation, reporting, and operational decision-making.",
        ],
      },
      {
        heading: "Data platform & automation",
        items: [
          "Design and develop a centralized Azure SQL Database and Microsoft SQL Server data platform for buildings, vendors, accounts, meters, bills, usage, charges, and payments using relational modeling, schema design, validation rules, and source-to-target mappings.",
          "Build Python and SQL ETL workflows to ingest, transform, validate, reconcile, and prepare data from vendor bills, spreadsheets, APIs, and operational sources for structured storage and analytics.",
        ],
      },
      {
        heading: "Validation & data quality",
        items: [
          "Implement data-quality controls to identify duplicate records, missing billing periods, meter-date gaps, usage discrepancies, unit mismatches, and reconciliation exceptions through automated validation and root-cause analysis.",
        ],
      },
      {
        heading: "Platform operations & reporting",
        items: [
          "Configure secure Azure SQL connectivity, access controls, firewall rules, and workflow automation while supporting downstream Power BI reporting and operational analytics.",
        ],
      },
    ],
  },
  {
    id: "vipany-cyber-data-review-analyst",
    title: "Cyber Data Review Analyst",
    org: "Vipany Global Ltd",
    location: "Hyderabad, India",
    start: "2023-10",
    end: "2024-12",
    employmentType: "Contract",
    bullets: [
      "Reviewed, validated, cleaned, and reconciled 1,000+ records daily, maintaining high data accuracy through structured quality-control and exception-review processes.",
      "Improved reliability across 80K+ records by identifying data inconsistencies, performing root-cause analysis, standardizing records, and documenting recurring data-quality issues.",
      "Applied structured review and validation procedures to detect missing, inconsistent, and duplicate information while supporting accurate downstream data usage and reporting.",
    ],
    summary:
      "Reviewed high-volume operational data under contract, catching the inconsistencies that would otherwise reach downstream reporting.",
    highlights: [
      "Reviewed, validated, cleaned, and reconciled 1,000+ records daily against structured quality-control and exception-review processes.",
      "Investigated inconsistent, missing, and duplicate data down to the root cause rather than just flagging it.",
      "Documented recurring data-quality issues to standardize how the team caught them going forward.",
    ],
    impact: "Improved reliability across 80,000+ reviewed records.",
    // Phase 9.6 Part 4/6: same three `bullets` above, grouped for the inline
    // disclosure. Deliberately NOT reframed as a Data Engineering role (Part 6): the
    // grouping headings name review/validation work, not pipelines or platforms.
    expanded: [
      {
        heading: "Structured review workflow",
        items: [
          "Reviewed, validated, cleaned, and reconciled 1,000+ records daily, maintaining high data accuracy through structured quality-control and exception-review processes.",
        ],
      },
      {
        heading: "Root-cause analysis & data quality",
        items: [
          "Improved reliability across 80K+ records by identifying data inconsistencies, performing root-cause analysis, standardizing records, and documenting recurring data-quality issues.",
        ],
      },
      {
        heading: "Validation procedures",
        items: [
          "Applied structured review and validation procedures to detect missing, inconsistent, and duplicate information while supporting accurate downstream data usage and reporting.",
        ],
      },
    ],
  },
  {
    id: "laxmi-precast-business-data-analyst",
    title: "Business Data Analyst",
    org: "Laxmi Precast Allied Products",
    location: "Hyderabad, India",
    start: "2020-07",
    end: "2022-12",
    bullets: [
      "Analyzed financial, sales, customer-order, payment, and operational data to support budgeting, cost visibility, business-performance tracking, and management decision-making.",
      "Maintained and reconciled structured datasets for sales, customer orders, payments, expenses, and reporting while identifying and correcting data-quality inconsistencies.",
      "Prepared recurring business and operational analyses to improve visibility into customer activity, payments, costs, and overall business performance.",
    ],
    summary:
      "Analyzed financial and operational data for a manufacturing business, turning scattered records into the reporting leadership used to make decisions.",
    highlights: [
      "Analyzed financial, sales, customer-order, payment, and operational data to support budgeting and business-performance tracking.",
      "Maintained and reconciled structured datasets for sales, customer orders, payments, and expenses, correcting data-quality inconsistencies along the way.",
      "Prepared recurring business and operational analyses that improved visibility into customer activity, costs, and overall performance.",
    ],
    // Phase 9.6 Part 4/7: same three `bullets` above, grouped for the inline
    // disclosure. Deliberately NOT reframed as a technical Data Engineering role
    // (Part 7) — headings name business analysis, not pipelines or platforms.
    expanded: [
      {
        heading: "Financial & operational analysis",
        items: [
          "Analyzed financial, sales, customer-order, payment, and operational data to support budgeting, cost visibility, business-performance tracking, and management decision-making.",
        ],
      },
      {
        heading: "Data maintenance & reconciliation",
        items: [
          "Maintained and reconciled structured datasets for sales, customer orders, payments, expenses, and reporting while identifying and correcting data-quality inconsistencies.",
        ],
      },
      {
        heading: "Reporting & business impact",
        items: [
          "Prepared recurring business and operational analyses to improve visibility into customer activity, payments, costs, and overall business performance.",
        ],
      },
    ],
  },
];
