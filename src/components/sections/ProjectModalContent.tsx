"use client";

import { useEffect, useRef } from "react";
import { ArchitectureDiagram } from "@/components/web/ArchitectureDiagram";
import { ProjectStatusBadge } from "@/components/web/ProjectStatusBadge";
import { TechTag } from "@/components/ui/TechTag";
import { getProjectMetrics } from "@/lib/content-selectors";
import { uiStrings } from "@/lib/ui-strings";
import type { Project, ProjectMilestone } from "@/types/content";

interface ProjectModalContentProps {
  project: Project;
  titleId: string;
}

const MILESTONE_STATE_LABEL: Record<ProjectMilestone["state"], string> = {
  implemented: "Implemented",
  "in-progress": "In Progress",
  planned: "Planned",
};

/**
 * The project case-study modal's content (Phase 6 Step 9) — code-split via
 * `next/dynamic({ ssr: false })` in ProjectsGrid.tsx, so its JS (and this file's own
 * imports) only load once a visitor actually opens a project, not on initial page load.
 *
 * Milestone states are distinguished by the word itself ("Implemented" / "In Progress"
 * / "Planned"), never by color (CLAUDE.md §8: "never convey state by color alone") —
 * also the only way to stay inside the crimson budget when a project (like the
 * flagship, honestly) has five "in-progress" milestones on screen at once; the single
 * crimson element in this whole modal is the status badge at the top.
 */
export function ProjectModalContent({ project, titleId }: ProjectModalContentProps) {
  const metrics = getProjectMetrics(project);
  const caseStudy = project.caseStudy;
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // This content mounts asynchronously (the dynamic import resolving after
  // `showModal()` has already run — see Dialog.tsx), so the browser's own
  // focus-on-open behavior has nothing to land on yet at that point. Move focus in
  // explicitly once real content — starting with the close control — exists.
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div className="dialog__panel surface surface--chamfered surface--elevated relative p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <ProjectStatusBadge status={project.status} />
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => history.back()}
          className="focus-ring shrink-0 font-mono text-label text-muted underline decoration-border decoration-1 underline-offset-4 hover:text-foreground hover:decoration-accent"
        >
          {uiStrings.closeDialog}
        </button>
      </div>

      <h2 id={titleId} className="mt-4 font-display text-display text-foreground text-balance">
        {project.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{project.summary}</p>

      {caseStudy && (
        <div className="mt-6 space-y-6">
          <section>
            <h3 className="font-mono text-label text-muted uppercase tracking-wide">Problem</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground text-pretty">{caseStudy.problem}</p>
          </section>

          <section>
            <h3 className="font-mono text-label text-muted uppercase tracking-wide">{uiStrings.caseStudyApproachHeading}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground text-pretty">{caseStudy.approach}</p>
          </section>

          <section>
            <h3 className="font-mono text-label text-muted uppercase tracking-wide">
              {uiStrings.caseStudyResponsibilityHeading}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground text-pretty">{caseStudy.responsibility}</p>
          </section>

          {caseStudy.validation && (
            <section>
              <h3 className="font-mono text-label text-muted uppercase tracking-wide">
                {uiStrings.caseStudyValidationHeading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground text-pretty">{caseStudy.validation}</p>
            </section>
          )}

          <section>
            <h3 className="font-mono text-label text-muted uppercase tracking-wide">
              {uiStrings.caseStudyMilestonesHeading}
            </h3>
            <ul className="mt-2 space-y-2">
              {caseStudy.milestones.map((milestone) => (
                <li key={milestone.label} className="flex items-start justify-between gap-3 text-sm">
                  <span className="text-foreground">{milestone.label}</span>
                  <span className="shrink-0 font-mono text-label text-muted whitespace-nowrap uppercase">
                    {MILESTONE_STATE_LABEL[milestone.state]}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {project.architecture && (
        <section className="mt-8">
          <h3 className="font-mono text-label text-muted uppercase tracking-wide">{uiStrings.projectDiagramHeading}</h3>
          <div className="mt-4">
            <ArchitectureDiagram nodes={project.architecture.nodes} />
          </div>
          <p className="mt-3 text-xs text-muted">{uiStrings.projectDiagramCaption}</p>
        </section>
      )}

      {metrics.length > 0 && (
        <section className="mt-8">
          <h3 className="font-mono text-label text-muted uppercase tracking-wide">{uiStrings.caseStudyImpactHeading}</h3>
          <dl className="mt-2 space-y-1">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex items-baseline gap-2 text-sm">
                <dt className="text-muted">{metric.label}</dt>
                <dd className="font-mono text-foreground">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div className="mt-8 flex flex-wrap gap-2 border-t border-border-subtle pt-6">
        {project.tech.map((tech) => (
          <TechTag key={tech}>{tech}</TechTag>
        ))}
      </div>

      {project.links?.github && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring mt-6 inline-flex font-mono text-label text-muted underline decoration-border decoration-1 underline-offset-4 hover:text-foreground hover:decoration-accent"
        >
          {uiStrings.viewOnGithub}
        </a>
      )}
    </div>
  );
}
