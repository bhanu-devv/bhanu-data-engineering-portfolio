import { Fragment } from "react";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/ui/Reveal";
import { Node } from "@/components/web/Node";
import { education } from "@/lib/content";
import { formatYearMonth } from "@/lib/format-date";

/**
 * The Education section (Phase 7): a short two-node path, not a card grid (Step 15 —
 * Skills and Certifications already use card grids; Education gets its own identity
 * as a "foundational timeline"). Sorted chronologically by `end` (foundation first,
 * current specialization last) rather than `content/education.ts`'s own current-first
 * array order — Step 13 explicitly frames this section as "foundation →
 * specialization," which reads naturally only in that direction; ordering is
 * presentation logic here; the content itself is untouched.
 *
 * The connector reuses `ArchitectureDiagram`'s proven responsive shape (a flex row
 * that becomes a flex column below `sm`, with the connector as a sibling flex item)
 * rather than an absolutely-positioned line spanning two different coordinate
 * systems — the kind of dual-breakpoint math that has caused real bugs elsewhere in
 * this project (Phase 6's dialog centering, Phase 5's label wrapping).
 */
export function Education() {
  const timeline = [...education].sort((a, b) => a.end.localeCompare(b.end));

  return (
    <SectionShell id="education" className="border-t border-border-subtle">
      <Reveal>
        <SectionHeading
          id="education-heading"
          eyebrow="07 — Education"
          title="Foundation to specialization"
          lede="A Bachelor's in Electronics & Communication, building toward a Master's in Information Systems — the academic path behind the Data Engineering direction."
        />
      </Reveal>

      <div className="mt-10 flex flex-col items-stretch sm:flex-row sm:items-start">
        {timeline.map((edu, i) => {
          const isCurrent = edu.expected === true;
          return (
            <Fragment key={edu.id}>
              <Reveal delayMs={i * 80} className="sm:flex-1">
                <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
                  <Node variant={isCurrent ? "live" : "default"} size={isCurrent ? "md" : "sm"} />
                  <Surface chamfered className="w-full p-6">
                    <h3 className="font-display text-heading text-foreground">{edu.degree}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {edu.school} · {edu.location}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-label text-muted">
                      <span>
                        {edu.start ? `${formatYearMonth(edu.start)} – ` : ""}
                        {isCurrent ? "Expected " : ""}
                        {formatYearMonth(edu.end)}
                      </span>
                      {edu.gpa && (
                        <span>
                          {edu.gpa.label} {edu.gpa.value}
                        </span>
                      )}
                    </div>
                  </Surface>
                </div>
              </Reveal>
              {i < timeline.length - 1 && (
                <span
                  aria-hidden="true"
                  className="my-4 h-6 w-px self-center bg-border sm:my-0 sm:mt-4 sm:h-px sm:w-10 sm:self-start"
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </SectionShell>
  );
}
