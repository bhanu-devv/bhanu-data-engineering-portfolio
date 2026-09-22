"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useTilt } from "@/hooks/use-tilt";

interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  elevated?: boolean;
  chamfered?: boolean;
  /** Reserve for the one "live"/selected surface at a time (CLAUDE.md §4 crimson budget). */
  accentEdge?: boolean;
  /** Bounded pointer-tilt (CLAUDE.md §5 budget rule 3-4). No-op on touch/coarse pointers. */
  tilt?: boolean;
}

/**
 * The one card/panel primitive (Phase 3 Step 4, Step 8). Precision-engineered dark
 * surfaces, not glassmorphism: opaque graphite gradient, hairline border, layered
 * shadow (src/styles/depth.css `.surface`).
 */
export function Surface({
  children,
  elevated = false,
  chamfered = false,
  accentEdge = false,
  tilt = false,
  className = "",
  ...rest
}: SurfaceProps) {
  const tiltRef = useTilt<HTMLDivElement>();

  const classes = [
    "surface",
    elevated && "surface--elevated",
    chamfered && "surface--chamfered",
    accentEdge && "surface--accent-edge",
    tilt && "tilt",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={tilt ? tiltRef : undefined} className={classes} {...rest}>
      {children}
    </div>
  );
}
