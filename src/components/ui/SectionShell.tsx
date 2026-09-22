import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

interface SectionShellProps {
  id: string;
  children: ReactNode;
  /** Renders a landmark <section> (the default) vs a plain <div> for sub-groupings
   *  that shouldn't add a second landmark to the page. */
  landmark?: boolean;
  className?: string;
}

/**
 * The one section wrapper every page section uses (CLAUDE.md §8 "semantic landmarks
 * ... section with headings"; Phase 3 Step 3/8). Pairs with SectionHeading by ID
 * convention: a SectionShell with `id="experience"` expects its heading to use
 * `id="experience-heading"`, which this component wires to `aria-labelledby`
 * automatically — every section is labelled for assistive tech without repeating the
 * wiring at each call site.
 */
export function SectionShell({ id, children, landmark = true, className = "" }: SectionShellProps) {
  const Tag: "section" | "div" = landmark ? "section" : "div";
  return (
    <Tag id={id} aria-labelledby={landmark ? `${id}-heading` : undefined} className={`relative py-(--spacing-section) ${className}`}>
      <Container>{children}</Container>
    </Tag>
  );
}
