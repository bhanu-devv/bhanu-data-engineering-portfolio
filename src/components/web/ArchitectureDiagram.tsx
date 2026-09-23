import { Fragment } from "react";
import { Node } from "@/components/web/Node";
import type { ArchitectureNode } from "@/types/content";

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
}

/**
 * A sanitized, original data-flow diagram (Phase 6 Step 6; CLAUDE.md §2 rule 6):
 * generic architecture vocabulary only, rendered as a simple ordered sequence — every
 * project's `architecture.edges` in this codebase is a straight chain (node i → i+1),
 * so a general graph layout would be unused complexity; this renders `nodes` in array
 * order and connects each to the next.
 *
 * Node labels are real, meaningful content (the stages a screen reader user should
 * hear), so they are NOT `aria-hidden` — only the connector marks between them are,
 * matching CLAUDE.md §8 ("decorative geometry is aria-hidden ... meaningful diagrams
 * have text alternatives"). `role="list"`/`"listitem"` on plain elements (rather than
 * `<ol>`/`<li>`) because the connector marks need to sit between list items as
 * unwrapped siblings, which `<li>` doesn't allow.
 *
 * Responsive: a vertical stack with a short connector below `sm` (matching
 * `ExperienceThread`'s mobile-safe vertical connector), a horizontal flow at `sm`+
 * (matching `About`'s pipeline strand) — both already Playwright-verified patterns,
 * reused here rather than inventing a third layout for a variable node count.
 */
export function ArchitectureDiagram({ nodes }: ArchitectureDiagramProps) {
  return (
    <div role="list" className="flex flex-col items-stretch sm:flex-row sm:items-center">
      {nodes.map((node, i) => (
        <Fragment key={node.id}>
          <div role="listitem" className="flex flex-col items-center gap-1.5 sm:flex-1 sm:px-1">
            <Node size="sm" />
            <span className="font-mono text-label text-muted text-center leading-tight">{node.label}</span>
          </div>
          {i < nodes.length - 1 && (
            <span aria-hidden="true" className="my-2 h-6 w-px self-center bg-border sm:my-0 sm:h-px sm:w-auto sm:flex-1 sm:self-auto" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
