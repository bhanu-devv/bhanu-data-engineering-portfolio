"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * True only for a mouse/trackpad-class pointer with real hover (CLAUDE.md §5 budget
 * rule 3). Gates tilt, cursor-follow, and other pointer-driven effects so touch
 * devices get static depth instead of a phantom hover state.
 */
export function usePointerFine(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
