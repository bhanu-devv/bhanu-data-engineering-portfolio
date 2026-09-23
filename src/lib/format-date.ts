import type { YearMonth } from "@/types/content";

/**
 * Presentation-only date formatting for `YearMonth` content values ("YYYY-MM") — pure,
 * reusable, and Bhanu-agnostic (CLAUDE.md §6), so it lives in `src/lib`, not `/content`.
 */
const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split("-").map(Number);
  return `${MONTH_LABELS[month - 1]} ${year}`;
}

export function formatDateRange(start: YearMonth, end: YearMonth | "present"): string {
  const startLabel = formatYearMonth(start);
  const endLabel = end === "present" ? "Present" : formatYearMonth(end);
  return `${startLabel} – ${endLabel}`;
}
