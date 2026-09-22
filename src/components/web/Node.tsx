"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

interface NodeProps {
  /** "live" marks the one active/selected node — spend the crimson budget carefully
   *  (CLAUDE.md §4: "at most three distinct crimson elements in any one viewport"). */
  variant?: "default" | "live";
  size?: "sm" | "md";
  label?: ReactNode;
  className?: string;
}

/**
 * A single network node marker (CLAUDE.md §4; PLANNING.md §5.4, §6.2 "Live node").
 * The "live" variant's glow is a static box-shadow (never animated — CLAUDE.md §5
 * budget rule 1) with a separate ring pseudo-element that pulses (web.css
 * `[data-node-variant="live"] .node__ring`) — the only continuous ambient loop a
 * section may run at once (budget rule 2). The ring's `animation-play-state` is tied
 * to IntersectionObserver here, in the primitive itself, so every "live" node pauses
 * off-screen automatically no matter which section composes it later.
 */
export function Node({ variant = "default", size = "md", label, className }: NodeProps) {
  const dimension = size === "sm" ? 8 : 12;
  const { ref, inView } = useInView<HTMLSpanElement>({ once: false, threshold: 0 });

  return (
    <span ref={ref} className={`relative inline-flex items-center gap-2 ${className ?? ""}`} data-node-variant={variant}>
      <span className="relative inline-flex items-center justify-center" style={{ width: dimension, height: dimension }}>
        {variant === "live" && (
          <span
            aria-hidden="true"
            className="node__ring absolute inset-[-6px] rounded-full border border-accent"
            style={{ animationPlayState: inView ? "running" : "paused" }}
          />
        )}
        <span
          aria-hidden="true"
          className={`absolute inset-0 rounded-full ${variant === "live" ? "bg-accent" : "bg-muted"}`}
          style={
            variant === "live"
              ? { boxShadow: "0 0 0 4px color-mix(in srgb, var(--color-glow) 18%, transparent)" }
              : undefined
          }
        />
      </span>
      {label && <span className="font-mono text-label uppercase tracking-wide text-muted">{label}</span>}
    </span>
  );
}
