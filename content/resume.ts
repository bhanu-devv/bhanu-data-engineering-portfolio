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
};
