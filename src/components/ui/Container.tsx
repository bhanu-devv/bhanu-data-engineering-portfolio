import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  /** Prose-width variant for reading blocks (About paragraphs, etc.), not the default
   *  full section width (PLANNING.md §5.3 "narrow reading width"). */
  narrow?: boolean;
  as?: ElementType;
  className?: string;
}

/**
 * The one page-width primitive (Phase 3 Step 3: "Do not allow every section to invent
 * its own arbitrary widths"). Max width and gutters are tokens, not per-usage guesses.
 */
export function Container({ children, narrow = false, as: Tag = "div", className = "" }: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-[var(--spacing-gutter)] ${narrow ? "max-w-(--container-narrow)" : "max-w-(--container-content)"} ${className}`}
    >
      {children}
    </Tag>
  );
}
