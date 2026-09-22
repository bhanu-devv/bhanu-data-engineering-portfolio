import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary";

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const base =
  "focus-ring surface--chamfered inline-flex min-h-11 items-center justify-center gap-2 px-5 font-body text-sm font-medium transition-[transform,background-color,border-color,color] duration-150 ease-brand";

// Primary's inset highlight is a static top specular line (PLANNING.md §5.5: "a top
// specular highlight") — an inset box-shadow, never animated (CLAUDE.md §5 budget
// rule 1 forbids animating box-shadow; a fixed one is fine).
const variants: Record<Variant, string> = {
  primary:
    "border border-transparent bg-accent text-accent-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] hover:bg-accent-hover active:bg-accent-pressed",
  secondary: "border border-border bg-transparent text-muted hover:border-border hover:text-foreground",
  tertiary: "min-h-0 gap-1 border-0 bg-transparent px-0 text-foreground underline decoration-border decoration-1 underline-offset-4 hover:decoration-accent",
};

/**
 * The one button primitive (Phase 3 Step 8), doubling as "LinkButton": renders an
 * `<a>` when `href` is given, a `<button>` otherwise, instead of shipping two
 * near-identical components. Three variants match PLANNING.md §5.5.
 */
export function Button({ variant = "primary", children, className = "", ...rest }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
