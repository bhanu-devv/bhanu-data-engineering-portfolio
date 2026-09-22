/**
 * Content types: inferred from the Zod schemas in src/schemas/content.ts, so every
 * shape is defined exactly once (Phase 2; CLAUDE.md §7, PLANNING.md §7.2). Content
 * modules import types from here — never from src/schemas/content.ts directly.
 *
 * All imports below are `import type`, so they are erased at compile time: this file
 * pulls in no Zod code at runtime, and content modules that import from here stay
 * exactly as light as they were before Phase 2 (CLAUDE.md §6 "types only" boundary).
 *
 * Deliberate rules (CLAUDE.md §2):
 *  - `Site.contact.phone` is the ONLY phone field and is optional. Bhanu approved
 *    showing it publicly, but only in the Contact section. No other module, metadata,
 *    or structured data may carry it. scripts/content-check.ts enforces this at runtime.
 *  - Optional fields (certification IDs, project links, repo URLs, ...) are simply
 *    absent when unknown. The UI omits them; it never renders a placeholder.
 */
import type { z } from "zod";
import type {
  needsInputSchema,
  sectionIdSchema,
  navSectionSchema,
  siteSchema,
  resumeConfigSchema,
  metricSchema,
  experienceSchema,
  architectureNodeSchema,
  projectImageSchema,
  projectSchema,
  skillGroupSchema,
  educationSchema,
  certificationSchema,
  awardSchema,
  leadershipSchema,
  recommendationSchema,
  socialSchema,
} from "@/schemas/content";
export type { YearMonth } from "@/schemas/content";

/** A value that is required in principle but has not been supplied yet. See `needsInput()`. */
export type NeedsInput = z.infer<typeof needsInputSchema>;
export type Maybe<T> = T | NeedsInput;

/** Locked section order lives in content/navigation.ts; ids are fixed here. */
export type SectionId = z.infer<typeof sectionIdSchema>;

export type Site = z.infer<typeof siteSchema>;
export type NavSection = z.infer<typeof navSectionSchema>;
export type ResumeConfig = z.infer<typeof resumeConfigSchema>;
export type Metric = z.infer<typeof metricSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type ArchitectureNode = z.infer<typeof architectureNodeSchema>;
export type ProjectImage = z.infer<typeof projectImageSchema>;
export type Project = z.infer<typeof projectSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Award = z.infer<typeof awardSchema>;
export type Leadership = z.infer<typeof leadershipSchema>;
export type Recommendation = z.infer<typeof recommendationSchema>;
export type Social = z.infer<typeof socialSchema>;
