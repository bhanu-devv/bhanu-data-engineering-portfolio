"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe `matchMedia` subscription (CLAUDE.md §5 motion budget; §8 reduced-motion).
 * `useSyncExternalStore` avoids the classic hydration-mismatch trap of reading
 * `window` in a `useState` initializer: server and first client render both return
 * `false` (the query's `getServerSnapshot`), then React reconciles to the real value
 * on mount without an extra render flicker.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
