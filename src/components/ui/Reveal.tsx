"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in ms for sibling Reveals (PLANNING.md §6.1 "Stagger sparingly"). */
  delayMs?: number;
  className?: string;
}

/**
 * Fade + translate-up once an element scrolls into view (PLANNING.md §6.2 "Reveal on
 * scroll"). The element is real content, present and fully visible in the DOM from
 * the very first server-rendered paint — see globals.css's `.js [data-reveal]` rule
 * for how the "start hidden" state only ever applies after JS has confirmed it can
 * run the reveal, and never for reduced-motion users (CLAUDE.md §5 "Progressive
 * enhancement").
 */
export function Reveal({ children, delayMs = 0, className = "" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const state = reducedMotion ? "visible" : inView ? "visible" : "pending";

  return (
    <div ref={ref} data-reveal={state} style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined} className={className}>
      {children}
    </div>
  );
}
