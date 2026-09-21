import type { Maybe, NeedsInput } from "@/types/content";

/**
 * Marks a value that Bhanu has not supplied yet, without inventing anything.
 * Unresolved values are dropped by selectors and never rendered (CLAUDE.md §2 rule 4).
 */
export function needsInput(reason: string): NeedsInput {
  return { __needsInput: true, reason };
}

export function isNeedsInput(value: unknown): value is NeedsInput {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as { __needsInput?: unknown }).__needsInput === true
  );
}

/** Returns the value, or undefined when it is still unresolved. */
export function resolve<T>(value: Maybe<T>): T | undefined {
  return isNeedsInput(value) ? undefined : value;
}
