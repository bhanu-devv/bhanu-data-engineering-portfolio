import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/ui/Reveal";
import { Node } from "@/components/web/Node";
import { about, education } from "@/lib/content";
import { getInProgressProjects } from "@/lib/content-selectors";
import { formatYearMonth } from "@/lib/format-date";

// Generic pipeline-stage vocabulary, not personal content (same vocabulary class as
// PLANNING.md §9.4's diagram labels — "Ingest, Validate, Reconcile" — so it lives here,
// not in /content). Restates concepts already stated in about.paragraphs, so the strand
// below can be safely aria-hidden (CLAUDE.md §8: decorative unless conveying new info).
const PIPELINE_STAGES = [
  { id: "ingest", label: "Ingest", live: false },
  { id: "validate", label: "Validate", live: false },
  { id: "transform", label: "Transform", live: false },
  { id: "trusted-output", label: "Trusted Output", live: true },
] as const;

/**
 * The About section (Phase 5). A short, synthesized narrative — not the resume summary
 * pasted in — inside one quiet Surface panel, closing with a small decorative pipeline
 * strand that echoes the Hero's network language without competing with it (Phase 5
 * Step 3: "About should feel quieter and more editorial," "Hero must remain visually
 * dominant").
 */
export function About() {
  const msDegree = education.find((entry) => entry.expected === true);
  const [currentProject] = getInProgressProjects();

  return (
    <SectionShell id="about">
      <Reveal>
        <SectionHeading id="about-heading" eyebrow="02 — About" title="What I build" />
      </Reveal>

      <Reveal delayMs={80}>
        <Surface className="mt-10 p-8 lg:p-10">
          <div className="max-w-(--container-narrow) space-y-5">
            {about.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-lede text-muted-foreground text-pretty leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {(msDegree ?? currentProject) && (
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-border-subtle pt-6">
              {msDegree && (
                <div className="flex items-baseline gap-2">
                  <dt className="font-mono text-label text-muted uppercase tracking-wide">Now studying</dt>
                  <dd className="text-sm text-foreground">
                    {msDegree.degree} — Expected {formatYearMonth(msDegree.end)}
                  </dd>
                </div>
              )}
              {currentProject && (
                <div className="flex items-baseline gap-2">
                  <dt className="font-mono text-label text-muted uppercase tracking-wide">Now building</dt>
                  <dd className="text-sm text-foreground">{currentProject.title}</dd>
                </div>
              )}
            </dl>
          )}

          <div className="relative mt-10" aria-hidden="true">
            <span className="absolute top-1 right-[12.5%] left-[12.5%] h-px bg-border" />
            <div className="relative grid grid-cols-4 gap-2">
              {PIPELINE_STAGES.map((stage) => (
                <div key={stage.id} className="flex flex-col items-center gap-1.5 px-1">
                  <Node variant={stage.live ? "live" : "default"} size="sm" />
                  {/* No `whitespace-nowrap`: each label sits in its own 25%-wide grid
                      cell, so "Trusted Output" wraps to two lines on narrow screens
                      instead of overflowing into the neighboring label (found via
                      Playwright QA at 375px). */}
                  <span className="font-mono text-label text-muted text-center leading-tight">{stage.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Surface>
      </Reveal>
    </SectionShell>
  );
}
