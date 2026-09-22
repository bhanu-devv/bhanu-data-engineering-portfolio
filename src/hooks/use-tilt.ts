"use client";

import { useEffect, useRef } from "react";
import { usePointerFine } from "@/hooks/use-pointer-fine";

interface UseTiltOptions {
  /** Maximum rotation in degrees. CLAUDE.md §5 budget rule 4: cards ≤ ±8°. */
  max?: number;
  /** translateZ applied on hover, for a slight lift. */
  lift?: number;
}

/**
 * Bounded pointer-tilt for cards (CLAUDE.md §5 budget rule 3-4; PLANNING.md §6.2
 * "Project cards"). Writes CSS custom properties inside `requestAnimationFrame` —
 * never triggers a React re-render per mouse move — and only runs for fine pointers.
 * `.tilt` (src/styles/depth.css) consumes the variables this hook writes.
 */
export function useTilt<T extends HTMLElement>(options: UseTiltOptions = {}) {
  const ref = useRef<T | null>(null);
  const pointerFine = usePointerFine();
  const { max = 8, lift = 10 } = options;

  useEffect(() => {
    const node = ref.current;
    if (!node || !pointerFine) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        node.style.setProperty("--tilt-ry", `${(px * max * 2).toFixed(2)}deg`);
        node.style.setProperty("--tilt-rx", `${(-py * max * 2).toFixed(2)}deg`);
        node.style.setProperty("--tilt-tz", `${lift}px`);
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      node.style.setProperty("--tilt-rx", "0deg");
      node.style.setProperty("--tilt-ry", "0deg");
      node.style.setProperty("--tilt-tz", "0px");
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [pointerFine, max, lift]);

  return ref;
}
