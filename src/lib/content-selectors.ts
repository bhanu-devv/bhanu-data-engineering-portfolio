/**
 * Content-access layer, part 2: typed selectors over the raw collections from
 * `@/lib/content` (CLAUDE.md §6). Future components read data through these functions
 * — never by importing `@/lib/content` arrays and re-filtering inline — so the rule for
 * "what counts as approved / public / renderable" lives in exactly one place.
 *
 * No JSX here and nothing UI-specific: these are pure functions, safe to use from
 * Server Components, scripts, or tests alike.
 */
import {
  recommendations,
  socials,
  projects,
  experience,
  skills,
  education,
  certifications,
  leadership,
  awards,
  navigation,
} from "@/lib/content";
import type { NavSection, Project, Recommendation, Social } from "@/types/content";

/** Only recommendations Bhanu has explicitly approved for publishing (CLAUDE.md §2 rule 5). */
export function getApprovedRecommendations(): Recommendation[] {
  return recommendations.filter((entry) => entry.approved === true);
}

/** Only social links marked public. */
export function getPublicSocials(): Social[] {
  return socials.filter((entry) => entry.public === true);
}

/** Projects flagged for the featured showcase. */
export function getFeaturedProjects(): Project[] {
  return projects.filter((entry) => entry.featured === true);
}

/**
 * Whether a given locked section currently has content to render (CLAUDE.md §6
 * "sections are data-driven and self-hiding"). Hero, About, Resume, and Contact are
 * driven by singleton objects (`site`, `resume`) that always carry at least identity
 * data, so they are always renderable; every other section depends on a collection.
 */
export function isSectionRenderable(id: NavSection["id"]): boolean {
  switch (id) {
    case "hero":
    case "about":
    case "resume":
    case "contact":
      return true;
    case "experience":
      return experience.length > 0;
    case "projects":
      return projects.length > 0;
    case "skills":
      return skills.length > 0;
    case "certifications":
      return certifications.length > 0;
    case "education":
      return education.length > 0;
    case "leadership-awards":
      return leadership.length > 0 || awards.length > 0;
    case "recommendations":
      return getApprovedRecommendations().length > 0;
    case "github-links":
      return getPublicSocials().length > 0;
  }
}

/** The locked navigation order, filtered down to sections that are currently renderable. */
export function getRenderableNavigation(): NavSection[] {
  return navigation.filter((section) => isSectionRenderable(section.id));
}
