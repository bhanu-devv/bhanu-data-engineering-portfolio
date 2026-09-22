interface TechTagProps {
  children: string;
}

/**
 * A single technology/skill label (Phase 3 Step 8). Mono, small, steel border, no fill
 * (PLANNING.md §5.5 "Tags: mono, 12px, steel border, no fill; hover raises to steel-900").
 */
export function TechTag({ children }: TechTagProps) {
  return (
    <span className="focus-ring inline-flex items-center rounded-sm border border-border px-2.5 py-1 font-mono text-label text-muted transition-colors duration-150 hover:border-border hover:bg-surface-elevated hover:text-foreground">
      {children}
    </span>
  );
}
