import Image from "next/image";
import { Node } from "@/components/web/Node";
import { NetworkMesh } from "@/components/web/NetworkMesh";
import { Surface } from "@/components/ui/Surface";
import type { HeroNetworkNode } from "@/types/content";

interface HeroWebProps {
  portrait: { src: string; alt: string; width: number; height: number };
  network: HeroNetworkNode[];
}

interface NodePlacement {
  /** Degrees, 0 = +x axis (right), measured clockwise (SVG y grows downward). */
  angle: number;
  /** Which side of the dot the label sits on, so text flows away from the hub. */
  labelSide: "bottom" | "left" | "right";
}

// Hand-placed, not derived from `generateWeb` (Phase 3's organic decorative generator):
// exactly 5 fixed nodes need readable label placement, which a generic radial formula
// fights (a label can't gracefully flow "away from center" for every angle at once).
// The soft background mesh below still uses the Phase 3 generator, for atmosphere.
const PLACEMENTS: NodePlacement[] = [
  { angle: -90, labelSide: "bottom" }, // top
  { angle: -18, labelSide: "right" }, // upper-right
  { angle: 54, labelSide: "right" }, // lower-right
  { angle: 126, labelSide: "left" }, // lower-left
  { angle: 198, labelSide: "left" }, // upper-left
];

const RADIUS_PERCENT = 40;

/**
 * "Treat my portrait as one important node in a larger data system" (Phase 4 Step 3):
 * the portrait sits at the hub of a small, curated technology network — straight
 * connector lines (structural, technical) to a handful of real, resume-supported
 * technologies (content/hero-network.ts), layered over Phase 3's soft organic
 * NetworkMesh (atmospheric background) for depth. Server Component: geometry is pure
 * math, no client-only state — only its NetworkMesh/Node/Surface children need
 * `"use client"`, and already have it (CLAUDE.md §6 "push 'use client' as far down the
 * tree as possible").
 *
 * Mobile simplification (Phase 4 Step 10): below `sm` (640px) there isn't room for five
 * mono-font tech labels around the hub without them crowding or colliding, so the
 * constellation and its background mesh are dropped entirely and only the framed
 * portrait remains — "content-first," not a shrunk copy of the desktop composition.
 */
export function HeroWeb({ portrait, network }: HeroWebProps) {
  const points = PLACEMENTS.map((placement, i) => {
    const rad = (placement.angle * Math.PI) / 180;
    return {
      node: network[i],
      x: 50 + RADIUS_PERCENT * Math.cos(rad),
      y: 50 + RADIUS_PERCENT * Math.sin(rad),
      labelSide: placement.labelSide,
    };
  }).filter((point) => point.node);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[220px] sm:max-w-[380px] lg:max-w-[440px]">
      {/* Atmospheric background mesh (Phase 3's organic, self-drawing generator) —
          sm+ only, alongside the constellation it belongs with. */}
      <NetworkMesh
        seed={7}
        radials={10}
        rings={2}
        className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-60 sm:block"
      />

      {/* Foreground structural connectors + satellite technology nodes — sm+ only. */}
      <div className="absolute inset-0 hidden sm:block">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {points.map((point) => (
            <line
              key={point.node.id}
              x1={50}
              y1={50}
              x2={point.x}
              y2={point.y}
              stroke="var(--color-border)"
              strokeWidth={0.35}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {points.map((point) => (
          <div
            key={point.node.id}
            className="absolute"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform:
                point.labelSide === "bottom"
                  ? "translate(-50%, -50%)"
                  : point.labelSide === "right"
                    ? "translate(0%, -50%)"
                    : "translate(-100%, -50%)",
            }}
          >
            {point.labelSide === "bottom" ? (
              <div className="flex flex-col items-center gap-1.5">
                <Node variant={point.node.live ? "live" : "default"} size="sm" />
                <span className="font-mono text-label whitespace-nowrap text-muted">{point.node.label}</span>
              </div>
            ) : (
              <div className={`flex items-center gap-1.5 ${point.labelSide === "left" ? "flex-row-reverse" : ""}`}>
                <Node variant={point.node.live ? "live" : "default"} size="sm" />
                <span className="font-mono text-label whitespace-nowrap text-muted">{point.node.label}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Portrait: the hub. Layer recipe per PLANNING.md §4 — back plate, chamfered
          frame, grayscale image, tone-down overlay, static crimson edge, bounded tilt.
          Always visible: larger relative to its frame on mobile (no satellites to share
          space with), settling to the ~200-240px desktop target at lg. */}
      <div className="absolute top-1/2 left-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 sm:w-[48%] lg:w-[50%]">
        <div aria-hidden="true" className="surface surface--chamfered absolute inset-0 translate-x-2 translate-y-2" />
        <Surface chamfered accentEdge tilt className="relative p-2">
          <div className="surface--chamfered relative overflow-hidden">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              priority
              sizes="(min-width: 1024px) 220px, (min-width: 640px) 182px, 176px"
              className="block h-auto w-full grayscale contrast-[1.08] brightness-[0.92]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
            />
          </div>
        </Surface>
      </div>
    </div>
  );
}
