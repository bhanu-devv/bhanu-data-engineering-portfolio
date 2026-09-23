import type { ResumeConfig } from "@/types/content";

/**
 * EXAMPLE CONTENT. Same single-source pattern as content/resume.ts (PLANNING.md §8):
 * to update your resume, replace the PDF at `file` and everything else keeps working.
 */
export const resume: ResumeConfig = {
  file: "/resume/example-resume.pdf",
  title: "Jordan A. Rivera Resume",
  downloadName: "Jordan-Rivera-Resume.pdf",
  inlineViewer: true,
  summary:
    "Data Engineer with experience across data engineering, streaming pipelines, and warehouse automation — currently leading a cloud lakehouse migration.",
};
