import { Node } from "@/components/web/Node";
import type { Metric } from "@/types/content";

interface ProofStripProps {
  metrics: Metric[];
}

/**
 * Compact credibility band at the foot of the Hero (Phase 4 Step 7). Part of the Hero
 * experience, not a 13th section (CLAUDE.md §6) — no `id`, no landmark, no nav entry.
 * Each item is NUMBER + a short label only, not the full `context` sentence — the
 * brief: "Do not turn this into four paragraphs."
 */
export function ProofStrip({ metrics }: ProofStripProps) {
  return (
    <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border-subtle pt-10 sm:grid-cols-4 lg:mt-20">
      {metrics.map((metric) => (
        <div key={metric.id} className="min-w-0">
          <dt className="mb-2 flex items-center gap-2">
            <Node size="sm" />
            <span className="font-mono text-label tracking-wide text-muted uppercase">{metric.label}</span>
          </dt>
          <dd className="font-display text-heading leading-tight text-foreground text-balance">{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}
