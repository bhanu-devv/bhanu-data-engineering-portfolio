"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element first enters the viewport, then disconnects
 * (PLANNING.md §6.2 "Reveal on scroll... once per element, IntersectionObserver").
 * Used by Reveal and by Node's "live" pulse (which pauses again off-screen via
 * `animation-play-state`, so this hook stays subscribed there instead of
 * disconnecting — see the `once` option).
 */
export function useInView<T extends Element>(options?: IntersectionObserverInit & { once?: boolean }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const once = options?.once ?? true;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px", ...options },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- options is read once at mount, matching a one-shot observer
  }, []);

  return { ref, inView };
}
