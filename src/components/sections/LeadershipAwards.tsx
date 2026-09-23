import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/ui/Reveal";
import { Node } from "@/components/web/Node";
import { leadership, awards } from "@/lib/content";
import { formatDateRange, formatYearMonth } from "@/lib/format-date";

/**
 * The Leadership & Awards section (Phase 7.5): one leadership surface flowing into a
 * row of compact award nodes below it — "professional growth → leadership →
 * recognition" read top to bottom (Step 4), not a side-by-side pair like Education,
 * since this is a cause-and-effect relationship rather than a chronological one. A
 * single vertical connector, unconditionally vertical at every width, avoids the
 * dual-breakpoint-coordinate-system bugs earlier connectors in this project have hit.
 * Restrained by design: grayscale only, no crimson, no trophy iconography.
 *
 * Progressive disclosure (Phase 9.6 Parts 8-9): the collapsed card shows role, org,
 * dates, a concise `summary`, and `scope` ("100+ graduate students") when set; richer
 * detail (event planning, stakeholder collaboration) sits behind the same native
 * `<details>`/`<summary>` pattern Experience uses — self-hides entirely when a record
 * has no `expanded` groups.
 */
export function LeadershipAwards() {
  const role = leadership[0];

  return (
    <SectionShell id="leadership-awards" className="border-t border-border-subtle">
      <Reveal>
        <SectionHeading
          id="leadership-awards-heading"
          eyebrow="08 — Leadership & Awards"
          title="Beyond the pipeline"
          lede="Leadership responsibility and the recognition that followed it."
        />
      </Reveal>

      {role && (
        <Reveal delayMs={60}>
          <Surface chamfered className="mt-10 p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div className="flex items-center gap-2">
                <Node size="sm" />
                <h3 className="font-display text-heading text-foreground">{role.role}</h3>
              </div>
              <span className="font-mono text-label text-muted whitespace-nowrap">
                {formatDateRange(role.start, role.end)}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {role.org} · {role.institution} · {role.location}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground text-pretty">
              {role.summary ?? role.bullets[0]}
            </p>
            {role.scope && <p className="mt-3 font-mono text-label text-muted">{role.scope}</p>}

            {role.expanded && role.expanded.length > 0 && (
              <details className="mt-5 border-t border-border-subtle pt-4">
                <summary className="disclosure__summary focus-ring inline-flex items-center gap-1.5 font-mono text-label text-muted underline decoration-border decoration-1 underline-offset-4 hover:text-foreground hover:decoration-accent">
                  <span className="disclosure__summary-closed">View leadership details</span>
                  <span className="disclosure__summary-open">Show less</span>
                  <svg aria-hidden="true" className="disclosure__chevron" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="mt-4 space-y-5">
                  {role.expanded.map((group) => (
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
                  ))}
                </div>
              </details>
            )}
          </Surface>
        </Reveal>
      )}

      {awards.length > 0 && (
        <>
          <span aria-hidden="true" className="mx-auto my-6 block h-8 w-px bg-border" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {awards.map((award, i) => (
              <Reveal key={award.id} delayMs={100 + i * 50}>
                <Surface chamfered className="h-full p-5">
                  <div className="flex items-center gap-2">
                    <Node size="sm" />
                    <h4 className="font-display text-lede text-foreground text-balance">{award.name}</h4>
                  </div>
                  {(award.org || award.amount || award.date) && (
                    <p className="mt-2 flex flex-wrap items-center gap-x-3 font-mono text-label text-muted">
                      {award.amount && <span className="text-foreground">{award.amount}</span>}
                      {award.org && <span>{award.org}</span>}
                      {award.date && <span>{formatYearMonth(award.date)}</span>}
                    </p>
                  )}
                </Surface>
              </Reveal>
            ))}
          </div>
        </>
      )}
    </SectionShell>
  );
}
