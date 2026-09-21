/**
 * Content schema: the contract every module in /content must satisfy.
 * Types only. No content, no behavior. See PLANNING.md §7.2.
 *
 * Deliberate rules (CLAUDE.md §2):
 *  - `contact.phone` is the ONLY phone field and is optional. Bhanu approved showing it publicly,
 *    but only in the Contact section. No other module, metadata, or structured data may carry it.
 *  - Optional fields (certification IDs, project links, repo URLs, ...) are simply
 *    absent when unknown. The UI omits them; it never renders a placeholder.
 */

/** A value that is required in principle but has not been supplied yet. See `needsInput()`. */
export type NeedsInput = { readonly __needsInput: true; readonly reason: string };
export type Maybe<T> = T | NeedsInput;

/** Calendar month as "YYYY-MM". Day precision is never claimed. */
export type YearMonth = `${number}-${number}`;

/** Locked section order lives in content/navigation.ts; ids are fixed here. */
export type SectionId =
  | "hero"
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "certifications"
  | "education"
  | "leadership-awards"
  | "recommendations"
  | "github-links"
  | "resume"
  | "contact";

export interface Site {
  name: {
    /** Prominent: hero, page title, footer, JSON-LD. */
    full: string;
    /** Conversational and supporting copy only. */
    short: string;
    monogram: string;
  };
  /** Approved hero positioning statement, verbatim. Do not strengthen or rephrase. */
  positioning: string;
  location: string;
  contact: {
    email: Maybe<string>;
    /** Optional. Rendered only in the Contact section. `tel` is the dialable form for tel: links. */
    phone?: { display: string; tel: string };
  };
  seo: {
    title: string;
    description: string;
    /** Canonical site URL. Unknown until a domain is chosen. */
    url: Maybe<string>;
    ogImage?: string;
  };
  /** Source image is never edited; treatment is CSS at render time. */
  portrait: { src: string; alt: string; width: number; height: number };
}

export interface NavSection {
  id: SectionId;
  label: string;
  /** Appears as a link in the top bar. */
  inNav: boolean;
  /** Appears as a node on the section rail. */
  inRail: boolean;
}

export interface ResumeConfig {
  /** Stable public path. The ONLY place this string exists in the codebase. */
  file: string;
  title: string;
  /** Filename the browser saves as, independent of the file on disk. */
  downloadName: string;
  /** Optional human-readable version label. Not needed for cache-busting. */
  label?: string;
  inlineViewer: boolean;
}

export interface Metric {
  id: string;
  /** Display value exactly as the resume states it, e.g. "6,854+". */
  value: string;
  label: string;
  context: string;
  /** Where in the resume this number comes from. Required for every metric. */
  source: string;
}

export interface Experience {
  id: string;
  /** Verbatim job title. Never relabel a real title. */
  title: string;
  org: string;
  location: string;
  start: YearMonth;
  end: YearMonth | "present";
  employmentType?: string;
  /** Verbatim from the resume. */
  bullets: string[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Must be true: no internal or operational-data images are ever published. */
  sanitizedApproved: true;
}

export interface Project {
  slug: string;
  title: string;
  /** Composed only from facts stated in the resume. */
  summary: string;
  status: "in-progress" | "complete";
  tech: string[];
  /** Verbatim from the resume. */
  bullets: string[];
  /** Ids from content/metrics.ts (single source for every number). Omit for in-progress work. */
  metricIds?: string[];
  /** Custom sanitized diagram data (Phase 6). Labels: PLANNING.md §9.4. */
  architecture?: { nodes: ArchitectureNode[]; edges: [string, string][] };
  /** Only real, Bhanu-approved URLs. Never invented. */
  links?: { github?: string; demo?: string };
  images?: ProjectImage[];
  featured: boolean;
}

export interface SkillGroup {
  id: string;
  /** Group names are verbatim from the resume. */
  name: string;
  skills: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  location: string;
  start?: YearMonth;
  end: YearMonth;
  /** True while the end date is a future expectation. Never auto-flips. */
  expected?: boolean;
  gpa?: { label: "GPA" | "CGPA"; value: string };
}

export interface Certification {
  id: string;
  /** Verbatim from the resume. */
  name: string;
  issuer: string;
  /** Only when Bhanu classifies it. The resume does not. */
  kind?: "certification" | "applied-skill" | "training";
  // Everything below is omitted from the UI when absent. Never invented.
  issued?: YearMonth;
  expires?: YearMonth;
  credentialId?: string;
  verifyUrl?: string;
  badge?: string;
}

export interface Award {
  id: string;
  name: string;
  org?: string;
  amount?: string;
  date?: YearMonth;
}

export interface Leadership {
  id: string;
  role: string;
  org: string;
  institution: string;
  location: string;
  start: YearMonth;
  end: YearMonth | "present";
  bullets: string[];
}

export interface Recommendation {
  id: string;
  quote: string;
  author: string;
  role: string;
  org: string;
  relationship: string;
  url?: string;
  /** True only when Bhanu approved publishing AND the author gave permission. */
  approved: boolean;
}

export interface Social {
  id: string;
  label: string;
  url: string;
  public: boolean;
}
