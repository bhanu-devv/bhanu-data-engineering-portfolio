import type { ReactNode } from "react";

interface SectionHeadingProps {
  /** Must match `${sectionId}-heading` for the enclosing SectionShell's aria-labelledby. */
  id: string;
  /** Mono index label, e.g. "02 — Experience" (PLANNING.md §5.3 "Section headers"). */
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Renders <h1> only for the page's one true heading (the Hero, in a later phase);
   *  every other section heading is <h2> (CLAUDE.md §8: "one <h1>, logical heading order"). */
  level?: "h1" | "h2";
}

/**
 * The heading block every section opens with (Phase 3 Step 8; PLANNING.md §5.3).
 * The thin strand under the eyebrow is decorative network language, not a rule —
 * `aria-hidden` (CLAUDE.md §8: "Decorative geometry is aria-hidden").
 */
export function SectionHeading({ id, eyebrow, title, lede, level = "h2" }: SectionHeadingProps) {
  const Title = level;
  return (
    <div className="max-w-(--container-narrow)">
      {eyebrow && (
        <div className="mb-3 flex items-center gap-3" aria-hidden="true">
          <span className="font-mono text-label tracking-[0.14em] text-muted uppercase">{eyebrow}</span>
          <span className="h-px flex-1 max-w-16 bg-border" />
        </div>
      )}
      <Title id={id} className="font-display text-display leading-[1.05] tracking-tight text-foreground text-balance">
        {title}
      </Title>
      {lede && <p className="mt-4 text-lede leading-relaxed text-muted-foreground">{lede}</p>}
    </div>
  );
}
