import { Node } from "@/components/web/Node";
import type { HeroNetworkNode } from "@/types/content";

interface IntroNetworkProps {
  network: HeroNetworkNode[];
}

interface Placement {
  angle: number;
}

// Same five angles HeroWeb.tsx hand-places its satellites at — deliberately reused,
// not re-derived, so the shape the visitor just watched form is the same shape the
// Hero network resolves to a moment later (Phase 9.5 Step 4's "opening strands →
// Hero network lines"). No text labels here (Step 2's "minimal content," Step 18
// "simplify clutter") — the technology names appear once, moments later, in the Hero
// itself; repeating them here during a sub-second animation would be noise, not signal.
const PLACEMENTS: Placement[] = [{ angle: -90 }, { angle: -18 }, { angle: 54 }, { angle: 126 }, { angle: 198 }];

const RADIUS_PERCENT = 38;
// Each connection (strand + its node) appears in sequence, not all at once — reads as
// "connection → node → next connection → next node" (Step 3) via simple staggered
// opacity/transform delays (intro.css), the same technique Reveal.tsx already uses
// for its own stagger, rather than a literal stroke-dashoffset draw per strand: a
// dash-length animation on a `<line>` inside a `preserveAspectRatio="none"` container
// (needed so the network isn't letterboxed at non-square intro viewport sizes) turned
// out not to render reliably hidden across engines — opacity has no such pitfall.
const STAGGER_MS = 90;

/**
 * The intro's own small network — structurally identical geometry to `HeroWeb`
 * (same five curated technologies, same angles), rendered at a fraction of the
 * complexity (no labels, no portrait) because it only has to hold attention for
 * about a second. Entirely `aria-hidden`: it's decorative motion, not information —
 * the same five names are real, accessible text moments later in the Hero itself.
 */
export function IntroNetwork({ network }: IntroNetworkProps) {
  const points = PLACEMENTS.map((placement, i) => {
    const rad = (placement.angle * Math.PI) / 180;
    return {
      node: network[i],
      x: 50 + RADIUS_PERCENT * Math.cos(rad),
      y: 50 + RADIUS_PERCENT * Math.sin(rad),
    };
  }).filter((point) => point.node);

  return (
    <div aria-hidden="true" className="pointer-events-none relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[340px]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {points.map((point, i) => (
          <line
            key={point.node.id}
            className="intro-network__line"
            style={{ transitionDelay: `${i * STAGGER_MS}ms` }}
            x1={50}
            y1={50}
            x2={point.x}
            y2={point.y}
            stroke="var(--color-border)"
            strokeWidth={0.4}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {points.map((point, i) => (
        <div
          key={point.node.id}
          className="intro-network__node absolute"
          style={{ left: `${point.x}%`, top: `${point.y}%`, transform: "translate(-50%, -50%)", transitionDelay: `${i * STAGGER_MS + 60}ms` }}
        >
          <Node variant={point.node.live ? "live" : "default"} size="sm" />
        </div>
      ))}

      <div className="intro-network__hub absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Node size="md" />
      </div>
    </div>
  );
}
