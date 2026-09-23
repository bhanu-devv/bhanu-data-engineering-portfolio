/**
 * Chrome strings: the only user-facing text allowed inside components (CLAUDE.md §6).
 * Nothing about Bhanu belongs here; that lives in /content.
 */
export const uiStrings = {
  // Project case-study modal (Phase 6).
  viewCaseStudy: "View Case Study",
  viewOnGithub: "View on GitHub",
  closeDialog: "Close",
  projectDiagramHeading: "How the data flows",
  // Verbatim caption required by PLANNING.md §9.4's diagram-sanitization policy —
  // identical across every project, so it lives here once rather than being repeated
  // as content on each project record.
  projectDiagramCaption: "Simplified architecture illustration. Contains no operational data.",
  caseStudyApproachHeading: "Approach",
  caseStudyResponsibilityHeading: "What I built",
  caseStudyValidationHeading: "Validation & reliability",
  caseStudyMilestonesHeading: "Build status",
  caseStudyImpactHeading: "Impact",
  // Certifications (Phase 7).
  verifyCredential: "Verify credential",
} as const;
