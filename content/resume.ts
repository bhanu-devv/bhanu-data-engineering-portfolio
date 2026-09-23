import type { ResumeConfig } from "@/types/content";

/**
 * SINGLE SOURCE OF TRUTH for the resume (PLANNING.md §8).
 *
 * Every "View Resume" and "Download Resume" action reads this one module.
 * To update the resume: replace the PDF at the path below. Nothing else changes.
 *
 * Do not add a version, date, or personal name to the file path, and do not
 * reference the path anywhere else in the codebase.
 */
export const resume: ResumeConfig = {
  file: "/resume/bhanu-resume.pdf",
  title: "Bhanudeepak Nagumothu Resume",
  downloadName: "Bhanudeepak-Nagumothu-Resume.pdf",
  inlineViewer: true,
  // Deliberately different wording from site.positioning (not a repeat of the Hero
  // statement) — every fact still traces to already-validated content (Professional
  // Summary, content/education.ts's M.S. entry).
  summary:
    "Data Engineer with 4+ years of combined experience across data engineering, database development, automation, and analytics — currently building an Azure-based data platform while completing a Master's in Information Systems.",
};
