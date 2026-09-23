"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids is currently most in view, for the nav's
 * active-section crimson marker (PLANNING.md §9.2). Content-agnostic — takes ids as
 * props, same pattern as every other hook here (CLAUDE.md §6 "web/ and motion/ are
 * content-agnostic and take data via props").
 *
 * One IntersectionObserver, not one per section: cheaper, and avoids N separate
 * callbacks fighting over which section is "most" visible.
 */
export function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        // Prefer the entry closest to the top of the viewport band, matching reading order.
        const topmost = visible.reduce((a, b) => (a.boundingClientRect.top <= b.boundingClientRect.top ? a : b));
        setActiveId(topmost.target.id);
      },
      // A band near the top of the viewport, below a sticky header, rather than the
      // whole viewport — this is what makes "active" track naturally with reading order.
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
