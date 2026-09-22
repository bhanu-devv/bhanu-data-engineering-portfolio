import type { ElementType, ReactNode } from "react";

interface VisuallyHiddenProps {
  children: ReactNode;
  as?: ElementType;
}

/** Screen-reader-only content: visually hidden, still in the accessibility tree. */
export function VisuallyHidden({ children, as: Tag = "span" }: VisuallyHiddenProps) {
  return (
    <Tag className="absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)] [clip-path:inset(50%)]">
      {children}
    </Tag>
  );
}
