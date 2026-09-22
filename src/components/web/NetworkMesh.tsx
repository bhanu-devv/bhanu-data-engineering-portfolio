"use client";

import { useEffect, useId, useRef } from "react";
import { generateWeb, type GenerateWebOptions } from "@/components/web/generate-web";

interface NetworkMeshProps {
  seed?: number;
  radials?: number;
  rings?: number;
  size?: number;
  sag?: number;
  jitter?: number;
  className?: string;
}

/**
 * A subtle decorative web/network mesh (CLAUDE.md §4 "The Web Is the Pipeline";
 * PLANNING.md §5.4, §6.2 "Web unfurl on load"). Purely decorative — `aria-hidden` and
 * `pointer-events: none` (CLAUDE.md §8) — text in front of it must stay the dominant
 * element, per the Phase 3 brief ("subtle enough that text remains dominant").
 *
 * Draws itself in once via `stroke-dashoffset` (CLAUDE.md §5 budget rule 1 explicitly
 * allows this on small SVGs) and then stays static: no continuous animation here, so
 * it doesn't compete with Node's single permitted ambient loop (budget rule 2).
 */
export function NetworkMesh({
  seed = 1,
  radials = 8,
  rings = 3,
  size = 600,
  sag = 0.12,
  jitter = 0.06,
  className,
}: NetworkMeshProps) {
  const geometry = generateWeb({ seed, radials, rings, size, sag, jitter } satisfies GenerateWebOptions);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gradientId = useId();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = svg.querySelectorAll<SVGPathElement>(".network-mesh__path");
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.setProperty("--path-length", String(Math.ceil(length)));
      path.dataset.unfurl = "pending";
      // Two rAFs: one to let the "pending" (dashed, offset) state paint, the next to
      // flip to "drawn" so the CSS transition actually animates from the offset state.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          path.dataset.unfurl = "drawn";
        });
      });
    });
  }, [seed, radials, rings, size, sag, jitter]);

  return (
    <svg
      ref={svgRef}
      className={`network-mesh ${className ?? ""}`}
      viewBox={`0 0 ${geometry.size} ${geometry.size}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="var(--color-grid)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-grid)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {geometry.ringPaths.map((d, i) => (
        <path key={`ring-${i}`} className="network-mesh__path" d={d} opacity={0.7 - i * 0.12} />
      ))}
      {geometry.spokePaths.map((d, i) => (
        <path key={`spoke-${i}`} className="network-mesh__path" d={d} opacity={0.5} />
      ))}
      <circle cx={geometry.hub.x} cy={geometry.hub.y} r={geometry.size * 0.12} fill={`url(#${gradientId})`} />
    </svg>
  );
}
