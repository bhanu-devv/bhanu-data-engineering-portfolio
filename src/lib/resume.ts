import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { resume } from "@/lib/content";

/**
 * Centralized resume asset resolution (CLAUDE.md §6 "One resume source"; PLANNING.md §8.2).
 *
 * This is the ONLY function that touches the resume file on disk. Every future "View
 * Resume" / "Download Resume" action (nav, hero, resume section, contact, footer) must
 * call this instead of hard-coding `content/resume.ts`'s path a second time. Server-side
 * only (reads the filesystem) — call it from a Server Component or a build-time script,
 * never from client code.
 */
export interface ResumeAsset {
  /** Href for the "View" action. Carries a content-hash query so a replaced PDF is
   *  never served stale from a browser or CDN cache. */
  viewHref: string;
  /** Href for the "Download" action — same file, same cache-busting hash as viewHref. */
  downloadHref: string;
  downloadName: string;
  title: string;
  label?: string;
  inlineViewer: boolean;
  /** ISO timestamp the PDF was last modified on disk. Undefined when the file is missing. */
  updatedAt?: string;
  /** Human-readable size, e.g. "109 KB". Undefined when the file is missing. */
  sizeLabel?: string;
  /** False when the configured PDF is not present on disk. Callers must not render a
   *  View/Download control when this is false — a dead link is worse than no link. */
  available: boolean;
}

export function getResumeAsset(): ResumeAsset {
  const absolutePath = path.join(process.cwd(), "public", resume.file);

  if (!existsSync(absolutePath)) {
    return {
      viewHref: resume.file,
      downloadHref: resume.file,
      downloadName: resume.downloadName,
      title: resume.title,
      label: resume.label,
      inlineViewer: resume.inlineViewer,
      available: false,
    };
  }

  const stats = statSync(absolutePath);
  const hash = createHash("sha256").update(readFileSync(absolutePath)).digest("hex").slice(0, 10);
  const href = `${resume.file}?v=${hash}`;

  return {
    viewHref: href,
    downloadHref: href,
    downloadName: resume.downloadName,
    title: resume.title,
    label: resume.label,
    inlineViewer: resume.inlineViewer,
    updatedAt: stats.mtime.toISOString(),
    sizeLabel: formatBytes(stats.size),
    available: true,
  };
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb < 10 ? 1 : 0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}
