interface TechTagProps {
  children: string;
  /** A filled, off-white variant (Phase 7 Skills section) for a skill that's also
   *  named in `experience[].tech`/`projects[].tech` — a factual, data-driven
   *  distinction (`getEvidencedSkills()`), not a proficiency rating. Grayscale only,
   *  by design: this is visual hierarchy, not an "active/live" state, so it doesn't
   *  spend any of the crimson budget (CLAUDE.md §4). */
  emphasized?: boolean;
}

/**
 * A single technology/skill label (Phase 3 Step 8). Mono, small, steel border, no fill
 * (PLANNING.md §5.5 "Tags: mono, 12px, steel border, no fill; hover raises to steel-900").
 */
export function TechTag({ children, emphasized = false }: TechTagProps) {
  return (
    <span
      className={`focus-ring inline-flex items-center rounded-sm border px-2.5 py-1 font-mono text-label transition-colors duration-150 hover:border-border hover:bg-surface-elevated hover:text-foreground ${
        emphasized ? "border-border bg-surface-elevated text-foreground" : "border-border text-muted"
      }`}
    >
      {children}
    </span>
  );
}
