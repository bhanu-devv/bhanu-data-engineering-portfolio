/**
 * Skip-to-content link (CLAUDE.md §8: "skip-to-content link"). First focusable element
 * on the page; invisible until keyboard-focused, then a real, visible, high-contrast
 * target — not a decorative afterthought.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="focus-ring fixed top-3 left-3 z-50 -translate-y-16 rounded-md bg-surface-elevated px-4 py-2 font-body text-sm text-foreground transition-transform duration-150 focus-visible:translate-y-0"
    >
      Skip to content
    </a>
  );
}
