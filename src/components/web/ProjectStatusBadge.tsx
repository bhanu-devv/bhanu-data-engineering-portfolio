import type { Project } from "@/types/content";

interface ProjectStatusBadgeProps {
  status: Project["status"];
}

const LABEL: Record<Project["status"], string> = {
  "in-progress": "In Progress",
  complete: "Complete",
};

/**
 * A professional, restrained status marker (Phase 6 Step 4) — never a plain color
 * dot: state is also carried by the text label itself, never by color alone (CLAUDE.md
 * §8). "In Progress" is the one status that uses crimson (the same "active/current"
 * convention as Experience's live node); "Complete" stays neutral steel, keeping the
 * section's crimson budget to this single badge on the flagship card.
 */
export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const isInProgress = status === "in-progress";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-label tracking-wide uppercase ${
        isInProgress ? "border-accent/40 text-accent" : "border-border text-muted"
      }`}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${isInProgress ? "bg-accent" : "bg-muted"}`} />
      {LABEL[status]}
    </span>
  );
}
