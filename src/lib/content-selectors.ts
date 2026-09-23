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
  metrics,
} from "@/lib/content";
import type { Metric, NavSection, Project, Recommendation, Social } from "@/types/content";

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
 * Projects still in progress (Phase 5) — used by About's short "now building" line.
 * Reads `content/projects.ts` directly rather than duplicating the project's title as
 * separate About prose, so the two never drift out of sync.
 */
export function getInProgressProjects(): Project[] {
  return projects.filter((entry) => entry.status === "in-progress");
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

/**
 * The in-page anchor for a locked section id (Phase 4.5). Typed against `NavSection["id"]`
 * rather than a bare string, so a CTA that links to a section (e.g. Hero's "Explore My
 * Work" → `getSectionHref("projects")`) breaks at compile time if that section's id is
 * ever renamed in `content/navigation.ts` — the anchor can never silently go dead. A
 * section not yet built during phased development is a normal, harmless `#anchor` with
 * nothing to scroll to; it becomes live the moment that section exists, with no code
 * change here.
 */
export function getSectionHref(id: NavSection["id"]): string {
  return `#${id}`;
}

/**
 * The in-page hash used to open a project's case-study modal (Phase 6), e.g.
 * `#project=csu-utilities-lakehouse` — matches PLANNING.md §9.4's locked "hash-synced
 * state" approach (D5): the browser's own Back button closes the modal, no client
 * router or intercepting route needed for a purely client-side, static-export site.
 */
export function getProjectHref(slug: Project["slug"]): string {
  return `#project=${slug}`;
}

/** The real `content/metrics.ts` records a project's `metricIds` point to, in order. */
export function getProjectMetrics(project: Project): Metric[] {
  if (!project.metricIds) return [];
  const bySlug = new Map(metrics.map((metric) => [metric.id, metric]));
  return project.metricIds.map((id) => bySlug.get(id)).filter((metric): metric is Metric => metric !== undefined);
}
