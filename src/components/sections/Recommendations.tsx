import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/ui/Reveal";
import { getApprovedRecommendations } from "@/lib/content-selectors";
import { uiStrings } from "@/lib/ui-strings";

/**
 * The Recommendations section (Phase 7.5 architecture; real display built Phase 9.6
 * now that one approved record exists). Still `return`s `null` — not an empty
 * `<section>` — whenever there are zero approved records (CLAUDE.md §2 rule 5).
 *
 * Collapsed card (Phase 9.6 Part 11): label, author/role/org, and a short excerpt —
 * never the full recommendation as a wall of text on first render. "Read full
 * recommendation" is a native `<details>`/`<summary>` disclosure (no client JS, same
 * pattern as Experience/Leadership) that reveals the complete, exact quote plus an
 * explicitly-labeled prose summary (never itself inside quotation marks — Part 11).
 * `blockquote`/`cite` semantics are preserved for both the excerpt and the full quote
 * (Part 12/23).
 */
export function Recommendations() {
  const approved = getApprovedRecommendations();
  if (approved.length === 0) return null;

  return (
    <SectionShell id="recommendations" className="border-t border-border-subtle">
      <Reveal>
        <SectionHeading
          id="recommendations-heading"
          eyebrow="09 — Recommendations"
          title="In their words"
        />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {approved.map((rec, i) => (
          <Reveal key={rec.id} delayMs={i * 60}>
            <Surface chamfered className="flex h-full flex-col p-6">
              <p className="font-mono text-label text-muted tracking-wide uppercase">
                {uiStrings.recommendationLabel}
              </p>

              <footer className="mt-3 text-sm text-muted-foreground">
                <cite className="block font-display text-lede text-foreground not-italic">{rec.author}</cite>
                <span className="mt-1 block">{rec.role}</span>
                <span className="block">{rec.org}</span>
              </footer>

              <blockquote className="mt-4 text-lede leading-relaxed text-foreground text-pretty">
                “{rec.excerpt ?? rec.quote}”
              </blockquote>

              <details className="mt-3">
                <summary className="disclosure__summary focus-ring inline-flex items-center gap-1.5 font-mono text-label text-muted underline decoration-border decoration-1 underline-offset-4 hover:text-foreground hover:decoration-accent">
                  <span className="disclosure__summary-closed">{uiStrings.readFullRecommendation}</span>
                  <span className="disclosure__summary-open">Show less</span>
                  <svg aria-hidden="true" className="disclosure__chevron" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>

                <div className="disclosure__open-only mt-4 space-y-4">
                  <blockquote className="text-lede leading-relaxed text-foreground text-pretty">
                    “{rec.quote}”
                  </blockquote>

                  {rec.summary && (
                    <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                      <span className="font-mono text-label text-muted uppercase">
                        {uiStrings.recommendationSummaryLabel}:
                      </span>{" "}
                      {rec.summary}
                    </p>
                  )}
                </div>
              </details>

              <p className="mt-4 font-mono text-label text-muted">{rec.relationship}</p>

              {rec.url && (
                <a
                  href={rec.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-4 inline-flex font-mono text-label text-muted underline decoration-border decoration-1 underline-offset-4 hover:text-foreground hover:decoration-accent"
                >
                  View LinkedIn profile
                </a>
              )}
            </Surface>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
