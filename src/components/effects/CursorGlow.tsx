"use client";

import { useEffect, useRef } from "react";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * A soft, pointer-following light (Phase 9.7 Parts 4-6) — "the cursor subtly reveals
 * the network surface underneath it," not a flashlight. One `position: fixed`
 * `aria-hidden` layer, mounted once (`src/app/page.tsx`), writing `--pointer-x`/
 * `--pointer-y` inside `requestAnimationFrame` exactly like `useTilt` already does
 * (CLAUDE.md §5 budget rule 3: "write CSS variables... inside requestAnimationFrame,
 * and never trigger React re-renders per mouse move") — no React state involved at
 * all here, so no re-render is even possible.
 *
 * Renders nothing (`null`) — not just CSS-hidden — for touch devices and
 * reduced-motion users (Parts 5, 18, 19): the component itself never mounts a
 * `pointermove` listener or the DOM node in those cases, so there is nothing to
 * disable, only something that was never there.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const pointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const enabled = pointerFine && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let hasMoved = false;

    const onMove = (event: PointerEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        el.style.opacity = "1"; // the glow only appears once the pointer actually moves
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--pointer-x", `${event.clientX}px`);
        el.style.setProperty("--pointer-y", `${event.clientY}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={ref} aria-hidden="true" className="cursor-glow" />;
}
