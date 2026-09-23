import { Surface } from "@/components/ui/Surface";
import { Button } from "@/components/ui/Button";
import { TechTag } from "@/components/ui/TechTag";
import { ProjectStatusBadge } from "@/components/web/ProjectStatusBadge";
import { getProjectHref, getProjectMetrics } from "@/lib/content-selectors";
import { uiStrings } from "@/lib/ui-strings";
import type { Project } from "@/types/content";

interface ProjectCardProps {
  project: Project;
  /** The flagship card gets more width/padding and shows its status inline with the
   *  title (Phase 6 Step 2) — everything else about the card markup is identical. */
  flagship?: boolean;
}

/**
 * A project card (Phase 6 Step 2): enough to evaluate the project without opening
 * anything — status, one-line problem/solution, curated tech, one metric where the
 * project has one, and a real link ("View Case Study", not a click-the-whole-card
 * pattern — Phase 6 Step 11) into the richer modal. Server Component: the only
 * interactive pieces are `Surface`'s tilt and the `Button`/`<a>` links themselves,
 * already client leaves.
 */
export function ProjectCard({ project, flagship = false }: ProjectCardProps) {
  const metrics = getProjectMetrics(project);
  const headlineMetric = metrics[0];

  return (
    <Surface
      chamfered
      tilt
      className={`project-card ${flagship ? "flex h-full flex-col p-8 lg:p-10" : "flex h-full flex-col p-6"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <ProjectStatusBadge status={project.status} />
        {/* A quiet hover/focus response (Phase 9.7 Part 8) — a small activation dot,
            not a literal traveling animation; opacity/transform only, no layout. */}
        <span aria-hidden="true" className="project-card__pulse h-1.5 w-1.5 rounded-full bg-accent" />
      </div>

      <h3 className={`mt-4 font-display text-foreground text-balance ${flagship ? "text-display" : "text-heading"}`}>
        {project.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">{project.summary}</p>

      {headlineMetric && (
        <p className="mt-4 font-mono text-label text-muted">
          <span className="text-foreground">{headlineMetric.value}</span> — {headlineMetric.label}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <TechTag key={tech}>{tech}</TechTag>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
        <Button href={getProjectHref(project.slug)} variant="secondary">
          {uiStrings.viewCaseStudy}
        </Button>
        {project.links?.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring font-mono text-label text-muted underline decoration-border decoration-1 underline-offset-4 hover:text-foreground hover:decoration-accent"
          >
            {uiStrings.viewOnGithub}
          </a>
        )}
      </div>
    </Surface>
  );
}
