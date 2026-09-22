import type { NavSection } from "@/types/content";

/**
 * EXAMPLE CONTENT. This mirrors the real site's default section order. Unlike the real
 * content/navigation.ts (whose order is locked by CLAUDE.md §6 decision 1), a fork is
 * free to reorder, rename, or drop entries here — the order simply lives in one place.
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
  { id: "resume", label: "Resume", inNav: false, inRail: true },
  { id: "contact", label: "Contact", inNav: true, inRail: true },
];
