import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/ui/Reveal";
import { getApprovedRecommendations } from "@/lib/content-selectors";

/**
 * The Recommendations section (Phase 7.5 Steps 5-7). Renders nothing at all —
 * `return null`, not an empty `<section>` — when there are zero approved records
 * (CLAUDE.md §2 rule 5): an empty-but-present landmark would be its own accessibility
 * artifact (Step 16), and there is no "coming soon" state. `content/recommendations.ts`
 * is currently empty on the real site, so this section is intentionally absent from
 * the rendered page; the architecture (this component, `getApprovedRecommendations()`,
 * the schema's `approved` gate) is ready the moment a real, approved record exists,
 * with no code changes required. Pure Server Component: a blockquote needs no
 * interactivity, so a hidden section ships zero client JS (Step 7's own instruction).
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
              <blockquote className="text-lede leading-relaxed text-foreground text-pretty">
                “{rec.quote}”
              </blockquote>
              <footer className="mt-4 text-sm text-muted-foreground">
                <cite className="font-medium text-foreground not-italic">{rec.author}</cite> — {rec.role},{" "}
                {rec.org}
                <span className="mt-1 block font-mono text-label text-muted">{rec.relationship}</span>
              </footer>
              {rec.url && (
                <a
                  href={rec.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-4 inline-flex font-mono text-label text-muted underline decoration-border decoration-1 underline-offset-4 hover:text-foreground hover:decoration-accent"
                >
                  View source
                </a>
              )}
            </Surface>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
