import type { NavSection } from "@/types/content";

/**
 * LOCKED section order (PLANNING.md §0 decision 1). The only place order is defined.
 * Identity, then professional credibility, then technical proof.
 *
 * Sections with no renderable content are skipped by the selectors (added in a
 * later phase), so hidden sections leave no dead nav links or rail nodes.
 * The proof strip is a band inside Hero, not a section, and has no entry here.
 */
export const navigation: NavSection[] = [
  { id: "hero", label: "Home", inNav: false, inRail: true },
  { id: "about", label: "About", inNav: true, inRail: true },
  { id: "experience", label: "Experience", inNav: true, inRail: true },
  { id: "projects", label: "Projects", inNav: true, inRail: true },
  { id: "skills", label: "Skills", inNav: true, inRail: true },
  { id: "certifications", label: "Certifications", inNav: true, inRail: true },
  { id: "education", label: "Education", inNav: true, inRail: true },
  { id: "leadership-awards", label: "Leadership & Awards", inNav: false, inRail: true },
  { id: "recommendations", label: "Recommendations", inNav: false, inRail: true },
  { id: "github-links", label: "GitHub / Links", inNav: false, inRail: true },
  // Resume is reached through the top-bar Resume button (an action), not a text link.
  { id: "resume", label: "Resume", inNav: false, inRail: true },
  { id: "contact", label: "Contact", inNav: true, inRail: true },
];
