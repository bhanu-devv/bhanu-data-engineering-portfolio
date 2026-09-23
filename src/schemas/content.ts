import { z } from "zod";

/**
 * Zod schemas: the single runtime-validated definition of every content shape.
 * `src/types/content.ts` infers its TypeScript types from these schemas, so a shape is
 * defined exactly once (Phase 2; CLAUDE.md §7, PLANNING.md §7.2) — there is no second,
 * hand-maintained set of interfaces that could drift out of sync.
 *
 * These schemas check STRUCTURE and FORMAT (an email looks like an email, a "YYYY-MM"
 * string is actually "YYYY-MM"). Cross-content rules that need more than one record at a
 * time — the phone number appearing nowhere but here, an unapproved recommendation,
 * placeholder text, a leaked local path — live in scripts/content-check.ts, which calls
 * `.safeParse()` against everything exported here and adds those checks on top.
 */

// ---------------------------------------------------------------------------
// Utility: NeedsInput / Maybe<T>
// See src/lib/needs-input.ts for the needsInput() constructor that builds this shape.
// ---------------------------------------------------------------------------

export const needsInputSchema = z.object({
  __needsInput: z.literal(true),
  reason: z.string().min(1, "needsInput() reason must not be empty"),
});

export function maybeSchema<T extends z.ZodTypeAny>(schema: T) {
  return z.union([schema, needsInputSchema]);
}

// ---------------------------------------------------------------------------
// Utility: YearMonth ("YYYY-MM"). One regex is the only place the pattern is defined;
// the `.transform` cast makes the *inferred* TypeScript type the precise template
// literal `${number}-${number}` instead of plain `string`, so content authors still get
// the compile-time hint that a stray value like "not-a-date" doesn't have today.
// ---------------------------------------------------------------------------

export type YearMonth = `${number}-${number}`;

const YEAR_MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

export const yearMonthSchema = z
  .string()
  .regex(YEAR_MONTH_PATTERN, 'must be "YYYY-MM" (e.g. "2025-08")')
  .transform((value) => value as YearMonth);

const endDateSchema = z.union([yearMonthSchema, z.literal("present")]);

// ---------------------------------------------------------------------------
// Locked section order (CLAUDE.md §6 decision 1) — the id vocabulary is fixed here.
// ---------------------------------------------------------------------------

export const sectionIdSchema = z.enum([
  "hero",
  "about",
  "experience",
  "projects",
  "skills",
  "certifications",
  "education",
  "leadership-awards",
  "recommendations",
  "github-links",
  "resume",
  "contact",
]);

export const navSectionSchema = z.object({
  id: sectionIdSchema,
  label: z.string().min(1),
  inNav: z.boolean(),
  inRail: z.boolean(),
});

// ---------------------------------------------------------------------------
// Site / profile / contact / SEO
// ---------------------------------------------------------------------------

// Dialable form for tel: links: optional "+", then 7-15 digits, first digit non-zero.
// Loose on purpose (this is a format check, not a country-specific validator); the
// content-check script separately confirms this is the ONLY phone literal in /content.
const dialablePhoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{6,14}$/, "must be a dialable phone number (digits, optional leading +)");

export const siteSchema = z.object({
  name: z.object({
    full: z.string().min(1),
    short: z.string().min(1),
    monogram: z.string().min(1).max(4),
  }),
  // Approved hero positioning statement, verbatim. Do not strengthen or rephrase.
  positioning: z.string().min(1),
  location: z.string().min(1),
  contact: z.object({
    email: maybeSchema(z.string().email()),
    // Optional. Approved for display ONLY in the Contact section (CLAUDE.md §2 rule 8).
    phone: z
      .object({
        display: z.string().min(1),
        tel: dialablePhoneSchema,
      })
      .optional(),
  }),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    // Canonical site URL. Stays unresolved (needsInput) until a domain is chosen —
    // never invent one.
    url: maybeSchema(z.string().url()),
    ogImage: z.string().optional(),
  }),
  // Source image is never edited; grayscale/frame treatment happens in CSS at render time.
  portrait: z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  }),
});

export const resumeConfigSchema = z.object({
  // Stable public path. The ONLY place this string is meant to exist in the codebase;
  // content-check's "no competing resume paths" rule enforces that.
  file: z
    .string()
    .startsWith("/", 'resume file path must be a site-absolute path, e.g. "/resume/bhanu-resume.pdf"'),
  title: z.string().min(1),
  downloadName: z.string().min(1),
  label: z.string().optional(),
  inlineViewer: z.boolean(),
});

export const metricSchema = z.object({
  id: z.string().min(1),
  // Display value exactly as the resume states it, e.g. "6,854+".
  value: z.string().min(1),
  label: z.string().min(1),
  context: z.string().min(1),
  // Where in the resume this number comes from. Required for every metric (CLAUDE.md §2 rule 1).
  source: z.string().min(1, "every metric needs a source note"),
});

// Short professional narrative for the About section (Phase 5). Synthesized copy, not
// resume text pasted verbatim — content-check still scans it (like every other module)
// for placeholders, leaked paths, and exaggerated-seniority language.
export const aboutSchema = z.object({
  paragraphs: z.array(z.string().min(1)).min(2).max(4),
});

export const experienceSchema = z.object({
  id: z.string().min(1),
  // Verbatim job title. Never relabel a real title.
  title: z.string().min(1),
  org: z.string().min(1),
  location: z.string().min(1),
  start: yearMonthSchema,
  end: endDateSchema,
  employmentType: z.string().optional(),
  // Verbatim resume bullets — the fidelity source. Never edited to sound bigger.
  bullets: z.array(z.string().min(1)).min(1),
  // Portfolio-friendly synthesis of `bullets` (Phase 5 Step 5), not a verbatim repeat:
  // one-sentence problem-space framing.
  summary: z.string().min(1),
  // 2-4 condensed, portfolio-styled restatements of what was done/how/impact.
  highlights: z.array(z.string().min(1)).min(1).max(4),
  // Optional standalone concrete metric, only when the resume genuinely supports one
  // for this specific role (not restated from content/metrics.ts's Hero proof-strip set).
  impact: z.string().optional(),
  // Role-relevant technologies only (Phase 5 Step 11) — never every skill dumped onto
  // every role. content-check cross-validates every label against content/skills.ts.
  tech: z.array(z.string().min(1)).optional(),
});

export const architectureNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
});

export const projectImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  // Literal `true`: a project image cannot exist without explicit sanitization approval.
  sanitizedApproved: z.literal(true),
});

export const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  // Composed only from facts stated in the resume.
  summary: z.string().min(1),
  status: z.enum(["in-progress", "complete"]),
  tech: z.array(z.string().min(1)),
  bullets: z.array(z.string().min(1)).min(1),
  // Ids from content/metrics.ts, the single source for every number. Omit for in-progress work.
  metricIds: z.array(z.string().min(1)).optional(),
  // Custom sanitized diagram data (Phase 6). Labels: PLANNING.md §9.4.
  architecture: z
    .object({
      nodes: z.array(architectureNodeSchema),
      edges: z.array(z.tuple([z.string(), z.string()])),
    })
    .optional(),
  // Only real, Bhanu-approved URLs. Never invented.
  links: z
    .object({
      github: z.string().url().optional(),
      demo: z.string().url().optional(),
    })
    .optional(),
  images: z.array(projectImageSchema).optional(),
  featured: z.boolean(),
});

export const skillGroupSchema = z.object({
  id: z.string().min(1),
  // Group names are verbatim from the resume.
  name: z.string().min(1),
  skills: z.array(z.string().min(1)).min(1),
});

export const educationSchema = z.object({
  id: z.string().min(1),
  school: z.string().min(1),
  degree: z.string().min(1),
  location: z.string().min(1),
  start: yearMonthSchema.optional(),
  end: yearMonthSchema,
  // True while the end date is a future expectation. Never auto-flips.
  expected: z.boolean().optional(),
  gpa: z.object({ label: z.enum(["GPA", "CGPA"]), value: z.string().min(1) }).optional(),
});

export const certificationSchema = z.object({
  id: z.string().min(1),
  // Verbatim from the resume.
  name: z.string().min(1),
  issuer: z.string().min(1),
  // Only when Bhanu classifies it. The resume does not.
  kind: z.enum(["certification", "applied-skill", "training"]).optional(),
  // Everything below is omitted from the UI when absent. Never invented (decision 8).
  issued: yearMonthSchema.optional(),
  expires: yearMonthSchema.optional(),
  credentialId: z.string().optional(),
  verifyUrl: z.string().url().optional(),
  badge: z.string().optional(),
});

export const awardSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  org: z.string().optional(),
  amount: z.string().optional(),
  date: yearMonthSchema.optional(),
});

export const leadershipSchema = z.object({
  id: z.string().min(1),
  role: z.string().min(1),
  org: z.string().min(1),
  institution: z.string().min(1),
  location: z.string().min(1),
  start: yearMonthSchema,
  end: endDateSchema,
  bullets: z.array(z.string().min(1)).min(1),
});

export const recommendationSchema = z.object({
  id: z.string().min(1),
  quote: z.string().min(1),
  author: z.string().min(1),
  role: z.string().min(1),
  org: z.string().min(1),
  relationship: z.string().min(1),
  url: z.string().url().optional(),
  // True only when Bhanu approved publishing AND the author gave permission (decision 7).
  approved: z.boolean(),
});

export const socialSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  url: z.string().url(),
  public: z.boolean(),
});

// A small, curated subset of real technologies for the Hero's network visualization
// (Phase 4 Step 3). `label` must already appear in content/skills.ts or
// content/projects.ts — content-check.ts cross-checks this at runtime, since a Zod
// schema alone can't reference other content modules. Never a place to invent a
// technology the resume doesn't support.
export const heroNetworkNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  // Marks the single "trusted output" node (CLAUDE.md §4 crimson budget). At most one
  // true — content-check.ts enforces that too.
  live: z.boolean().optional(),
});
