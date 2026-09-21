/**
 * The ONLY door from presentation code to /content (CLAUDE.md §6).
 * Components and pages import from "@/lib/content", never from "@content/*".
 * ESLint enforces this. Selectors (hide empty sections, drop unresolved values)
 * are added here in later phases.
 */
export {
  site,
  navigation,
  resume,
  metrics,
  experience,
  projects,
  skills,
  education,
  certifications,
  awards,
  leadership,
  recommendations,
  socials,
} from "@content/index";
