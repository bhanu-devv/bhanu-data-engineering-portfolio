import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/ui/Reveal";
import { TechTag } from "@/components/ui/TechTag";
import { Node } from "@/components/web/Node";
import { formatDateRange } from "@/lib/format-date";
import type { Experience } from "@/types/content";

interface ExperienceThreadProps {
  roles: Experience[];
}

/**
 * The career-path connector (Phase 5 Step 9: "career path → data lineage → connected
 * nodes," transformed from a generic dotted timeline by reusing the site's own
 * dimensional/network language rather than plain circles and a ruler-straight rule):
 * a single hairline vertical connector at a fixed x-offset, with each role's `Node`
 * anchored to it. Server Component — `Surface`/`Reveal`/`Node`/`TechTag` are the only
 * client leaves involved, already built.
 *
 * Visual weight is graduated, current-first, matching `content/experience.ts`'s own
 * order: the current CSU role gets the crimson "live" node, the accent-edge surface,
 * tilt, and the most detail; Vipany and Laxmi share a quieter, untilted treatment,
 * "meaningful but more concise" per the brief. This communicates the same "growing
 * responsibility → current work" story the brief describes, just read top-to-bottom
 * (current, most-detailed role first) rather than left-to-right — the conventional,
 * expected reading order for a portfolio's experience list.
 *
 * Progressive disclosure (Phase 9.6 Parts 3-4): the collapsed card shows role, org,
 * dates, `summary` (1-2 sentences), one `impact` line, and `tech` — the full
 * `highlights` bullet list moved behind a native `<details>`/`<summary>` ("View full
 * experience"), revealing `expanded`'s readable, headed groups when present (falling
 * back to plain `highlights` for a role that doesn't have one). Native `<details>`
 * needs no client JS, no accordion dependency, and toggles instantly with no
 * animation to gate under reduced-motion — see disclosure.css.
 * expected reading order for a portfolio's experience list.
 */
export function ExperienceThread({ roles }: ExperienceThreadProps) {
  return (
    <div className="relative mt-10">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-4 w-px bg-border" />
      <div className="space-y-10">
        {roles.map((role, i) => {
          const isCurrent = i === 0;
          return (
            <Reveal key={role.id} delayMs={i * 80}>
              <article className="relative pl-9 sm:pl-12">
                <span aria-hidden="true" className="absolute top-1 left-4 -translate-x-1/2">
                  <Node variant={isCurrent ? "live" : "default"} size={isCurrent ? "md" : "sm"} />
                </span>

                <Surface
                  chamfered
                  tilt
                  accentEdge={isCurrent}
                  className={isCurrent ? "p-6 sm:p-8" : "p-5 sm:p-6"}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-heading text-foreground">{role.title}</h3>
                    <span className="font-mono text-label text-muted whitespace-nowrap">
                      {formatDateRange(role.start, role.end)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {role.org} · {role.location}
                    {role.employmentType ? ` · ${role.employmentType}` : ""}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-foreground text-pretty">{role.summary}</p>

                  {role.impact && (
                    <p className="mt-4 font-mono text-label text-muted">{role.impact}</p>
                  )}

                  {role.tech && role.tech.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {role.tech.map((tech) => (
                        <TechTag key={tech}>{tech}</TechTag>
                      ))}
                    </div>
                  )}

                  <details className="mt-5 border-t border-border-subtle pt-4">
                    <summary className="disclosure__summary focus-ring inline-flex items-center gap-1.5 font-mono text-label text-muted underline decoration-border decoration-1 underline-offset-4 hover:text-foreground hover:decoration-accent">
                      <span className="disclosure__summary-closed">View full experience</span>
                      <span className="disclosure__summary-open">Show less</span>
                      <svg aria-hidden="true" className="disclosure__chevron" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </summary>

                    <div className="mt-4 space-y-5">
                      {role.expanded && role.expanded.length > 0
                        ? role.expanded.map((group) => (
                            <div key={group.heading}>
                              <h4 className="font-mono text-label text-muted uppercase tracking-wide">{group.heading}</h4>
                              <ul className="mt-2 space-y-2">
                                {group.items.map((item, j) => (
                                  <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border" />
                                    <span className="text-pretty">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))
                        : (
                            <ul className="space-y-2">
                              {role.highlights.map((highlight, j) => (
                                <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border" />
                                  <span className="text-pretty">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                    </div>
                  </details>
                </Surface>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
