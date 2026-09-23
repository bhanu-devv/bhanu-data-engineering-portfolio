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
  // GitHub / Links (Phase 7.5). Deliberately "View ... Profile", not a stats claim
  // ("Explore 20 repositories") — Step 9 bans exactly that without a real data source.
  viewGithubProfile: "View GitHub Profile",
  viewLinkedinProfile: "View LinkedIn Profile",
  // Cinematic opening (Phase 9.5). Device wording differs (touch vs. pointer-fine),
  // toggled by CSS media query, not JS — see intro.css.
  introRoleLabel: "Data Engineer",
  introConnectTouch: "Tap to connect",
  introConnectPointer: "Click to connect",
  introSkip: "Skip intro",
} as const;
