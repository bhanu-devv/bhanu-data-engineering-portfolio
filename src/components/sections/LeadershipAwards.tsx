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
            <p className="mt-4 text-sm leading-relaxed text-foreground text-pretty">{role.bullets[0]}</p>
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
