"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

/** True when the user has asked the OS to reduce motion (CLAUDE.md §5, §8). */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
