#!/usr/bin/env -S npx tsx
/**
 * npm run content:check
 *
 * Validates every module in /content: shape (via the Zod schemas in
 * src/schemas/content.ts — see that file for why TypeScript types and Zod schemas are
 * not hand-duplicated) plus a set of cross-content safety/privacy rules that a
 * per-field schema can't express on its own (CLAUDE.md §2, §9; PLANNING.md §7.3):
 *
 *   - required content is present (the public email; resume config shape)
 *   - malformed email addresses, invalid URLs, invalid phone data (schema-level)
 *   - accidental placeholder content ("lorem ipsum", "TODO", "TBD", ...)
 *   - reference/ paths or the reference-only resume filename leaking into content
 *   - private local filesystem paths (a pasted /Users/..., /home/..., C:\..., or a
 *     session scratch path) leaking into content
 *   - obvious secrets (API keys, tokens, private key headers)
 *   - a best-effort scan for internal CSU operational data (account/meter/invoice
 *     references, long unexplained digit runs) — a heuristic, not a guarantee; the real
 *     control is CLAUDE.md §2 rule 9, reviewed by a human before anything is published
 *   - the approved phone number appearing ONLY in site.contact.phone, and flags any
 *     duplicate phone literal scattered elsewhere instead of referencing it
 *   - recommendation records that exist without `approved: true`
 *   - the locked section order (content/navigation.ts) matching CLAUDE.md §6 decision 1
 *
 * Usage:
 *   npm run content:check                validates the real content/ (Bhanu's site)
 *   npm run content:check -- --example   validates content.example/ (the template's
 *                                        fictional demo content), same rules
 *
 * Exit code 0: no errors (informational notes, like the still-unresolved site URL, do
 * not fail the check). Exit code 1: at least one error was found.
 */
import { z } from "zod";
import { isNeedsInput } from "../src/lib/needs-input.ts";
import {
  siteSchema,
  navSectionSchema,
  resumeConfigSchema,
  metricSchema,
  experienceSchema,
  projectSchema,
  skillGroupSchema,
  educationSchema,
  certificationSchema,
  awardSchema,
  leadershipSchema,
  recommendationSchema,
  socialSchema,
  heroNetworkNodeSchema,
} from "../src/schemas/content.ts";
import type {
  Award,
  Certification,
  Education,
  Experience,
  HeroNetworkNode,
  Leadership,
  Metric,
  NavSection,
  Project,
  Recommendation,
  ResumeConfig,
  Site,
  SkillGroup,
  Social,
} from "../src/types/content.ts";

interface ContentSet {
  site: Site;
  navigation: NavSection[];
  resume: ResumeConfig;
  metrics: Metric[];
  heroNetwork: HeroNetworkNode[];
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education[];
  certifications: Certification[];
  awards: Award[];
  leadership: Leadership[];
  recommendations: Recommendation[];
  socials: Social[];
}

type Level = "error" | "warn" | "info";
interface Finding {
  level: Level;
  location: string; // e.g. "content/site.ts → site.contact.email"
  message: string;
}
interface MinimalIssue {
  path: PropertyKey[];
  message: string;
}

async function main() {
  // -------------------------------------------------------------------------
  // Loading the content set under test
  // -------------------------------------------------------------------------

  const useExample = process.argv.includes("--example");
  const rootLabel = useExample ? "content.example" : "content";

  const content: ContentSet = useExample
    ? await import("../content.example/index.ts")
    : await import("../src/lib/content.ts");

  const findings: Finding[] = [];
  const err = (location: string, message: string) => findings.push({ level: "error", location, message });
  const warn = (location: string, message: string) => findings.push({ level: "warn", location, message });
  const info = (location: string, message: string) => findings.push({ level: "info", location, message });

  const fileFor = (moduleName: string) => `${rootLabel}/${moduleName}.ts`;

  // -------------------------------------------------------------------------
  // 1. Shape/format validation via Zod
  // -------------------------------------------------------------------------

  function reportIssues(moduleName: string, path: string, issues: MinimalIssue[]) {
    for (const issue of issues) {
      const fieldPath = issue.path.length ? `.${issue.path.join(".")}` : "";
      err(`${fileFor(moduleName)} → ${path}${fieldPath}`, issue.message);
    }
  }

  function validateOne(moduleName: string, schema: z.ZodType, value: unknown) {
    const result = schema.safeParse(value);
    if (!result.success) reportIssues(moduleName, moduleName, result.error.issues);
  }

  function validateMany(moduleName: string, schema: z.ZodType, items: unknown[]) {
    items.forEach((item, i) => {
      const result = schema.safeParse(item);
      if (!result.success) reportIssues(moduleName, `${moduleName}[${i}]`, result.error.issues);
    });
  }

  validateOne("site", siteSchema, content.site);
  validateMany("navigation", navSectionSchema, content.navigation);
  validateOne("resume", resumeConfigSchema, content.resume);
  validateMany("metrics", metricSchema, content.metrics);
  validateMany("hero-network", heroNetworkNodeSchema, content.heroNetwork);
  validateMany("experience", experienceSchema, content.experience);
  validateMany("projects", projectSchema, content.projects);
  validateMany("skills", skillGroupSchema, content.skills);
  validateMany("education", educationSchema, content.education);
  validateMany("certifications", certificationSchema, content.certifications);
  validateMany("awards", awardSchema, content.awards);
  validateMany("leadership", leadershipSchema, content.leadership);
  validateMany("recommendations", recommendationSchema, content.recommendations);
  validateMany("socials", socialSchema, content.socials);

  // -------------------------------------------------------------------------
  // 2. Locked section order (CLAUDE.md §6 decision 1)
  // -------------------------------------------------------------------------

  const LOCKED_SECTION_ORDER = [
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
  ];
  const actualOrder = content.navigation.map((s) => s.id);
  const orderMatches = JSON.stringify(actualOrder) === JSON.stringify(LOCKED_SECTION_ORDER);
  if (!orderMatches) {
    const message = `section order does not match the locked order. Expected: ${LOCKED_SECTION_ORDER.join(" → ")}. Got: ${actualOrder.join(" → ")}`;
    if (useExample) {
      // content.example is a customization template — forks are free to reorder sections.
      // This is informational so the check still demonstrates the rule without failing.
      info(fileFor("navigation"), message + " (example content — reordering is expected to be customizable)");
    } else {
      err(fileFor("navigation"), message + " (CLAUDE.md §6 decision 1 — reorder only with Bhanu's approval)");
    }
  }

  // -------------------------------------------------------------------------
  // 3. Required content present
  // -------------------------------------------------------------------------

  if (isNeedsInput(content.site.contact.email)) {
    err(`${fileFor("site")} → site.contact.email`, "public email is required and must not be left unresolved");
  } else if (typeof content.site.contact.email !== "string" || content.site.contact.email.length === 0) {
    err(`${fileFor("site")} → site.contact.email`, "public email is required and must not be empty");
  }

  if (isNeedsInput(content.site.seo.url)) {
    info(`${fileFor("site")} → site.seo.url`, "canonical site URL not yet chosen — expected until a domain is picked; do not invent one");
  }

  // -------------------------------------------------------------------------
  // 4. String-tree walk for the remaining checks (placeholders, leaked paths, secrets,
  //    CSU keywords, phone confinement)
  // -------------------------------------------------------------------------

  function walkStrings(
    value: unknown,
    pathSoFar: string,
    visit: (value: string, path: string) => void,
    skipPaths: ReadonlySet<string>,
  ) {
    if (skipPaths.has(pathSoFar)) return;
    if (typeof value === "string") {
      visit(value, pathSoFar);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, i) => walkStrings(item, `${pathSoFar}[${i}]`, visit, skipPaths));
      return;
    }
    if (value && typeof value === "object") {
      // needsInput() sentinels carry a private note to Bhanu, not published content — skip it.
      if ((value as { __needsInput?: unknown }).__needsInput === true) return;
      for (const [key, v] of Object.entries(value)) {
        walkStrings(v, pathSoFar ? `${pathSoFar}.${key}` : key, visit, skipPaths);
      }
    }
  }

  const collections: [string, unknown][] = [
    ["site", content.site],
    ["navigation", content.navigation],
    ["resume", content.resume],
    ["metrics", content.metrics],
    ["experience", content.experience],
    ["projects", content.projects],
    ["skills", content.skills],
    ["education", content.education],
    ["certifications", content.certifications],
    ["awards", content.awards],
    ["leadership", content.leadership],
    ["recommendations", content.recommendations],
    ["socials", content.socials],
  ];

  // --- 4a. Placeholder content ---------------------------------------------

  const PLACEHOLDER_MARKERS: RegExp[] = [
    /lorem ipsum/i,
    /\btodo\b/i,
    /\btbd\b/i,
    /\bplaceholder\b/i,
    /\bfixme\b/i,
    /\bchange[\s_-]?me\b/i,
    /\bcoming soon\b/i,
    /\binsert (text|name|title) here\b/i,
    /\bsample text\b/i,
    /\byour (name|email|text) here\b/i,
  ];

  // --- 4b. reference/ paths --------------------------------------------------

  const REFERENCE_MARKERS: RegExp[] = [/reference\//i, /Bhanu_Resume\.pdf/i];

  // --- 4c. Private local filesystem paths -------------------------------------

  const PRIVATE_PATH_MARKERS: RegExp[] = [
    /\/Users\/[^/\s]+/,
    /\/home\/[^/\s]+/,
    /[A-Za-z]:\\\\?[^\s"]+/,
    /\/private\/tmp\//,
    /\/var\/folders\//,
  ];

  // --- 4d. Obvious secrets -----------------------------------------------------

  const SECRET_MARKERS: RegExp[] = [
    /sk-[A-Za-z0-9]{20,}/,
    /gh[pousr]_[A-Za-z0-9]{20,}/,
    /AKIA[0-9A-Z]{16}/,
    /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
    /\b(api[_-]?key|secret|password|passwd|access[_-]?token)\b\s*[:=]\s*\S{6,}/i,
  ];

  // --- 4e. Internal CSU / employer operational data (best-effort heuristic) ---

  const CSU_KEYWORD_MARKERS: RegExp[] = [
    /\baccount\s*#/i,
    /\bacct\.?\s*#/i,
    /\bmeter\s*#/i,
    /\bmeter\s*id\b/i,
    /\binvoice\s*#/i,
    /\brouting\s*number\b/i,
    /\bssn\b/i,
    /\bsocial security number\b/i,
    /\bpo\s*#/i,
    /\bpurchase order\s*#/i,
  ];
  const LONG_DIGIT_RUN = /\b\d{8,}\b/g;

  // --- 4f. Phone confinement ---------------------------------------------------

  const phone = content.site.contact.phone;
  const canonicalPhoneDigitSets: Set<string> = new Set();
  if (phone) {
    const telDigits = phone.tel.replace(/\D/g, "");
    const displayDigits = phone.display.replace(/\D/g, "");
    canonicalPhoneDigitSets.add(telDigits);
    canonicalPhoneDigitSets.add(displayDigits);
    if (telDigits.length === 11 && telDigits.startsWith("1")) {
      canonicalPhoneDigitSets.add(telDigits.slice(1));
    }
  }
  const PHONE_LIKE = /(\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/g;
  const phoneSkipPaths = new Set(["site.contact.phone.display", "site.contact.phone.tel"]);

  for (const [moduleName, value] of collections) {
    walkStrings(
      value,
      moduleName,
      (text, path) => {
        const location = `${fileFor(moduleName)} → ${path}`;

        if (PLACEHOLDER_MARKERS.some((marker) => marker.test(text))) {
          const message = `looks like accidental placeholder content ("${text.slice(0, 60)}")`;
          if (useExample) warn(location, message);
          else err(location, message);
        }

        if (REFERENCE_MARKERS.some((marker) => marker.test(text))) {
          err(location, `references the local reference/ material, which must never appear in shipped content ("${text.slice(0, 80)}")`);
        }

        if (PRIVATE_PATH_MARKERS.some((marker) => marker.test(text))) {
          err(location, `contains what looks like a private local filesystem path ("${text.slice(0, 80)}")`);
        }

        if (SECRET_MARKERS.some((marker) => marker.test(text))) {
          err(location, "contains what looks like a secret, API key, or token — remove it");
        }

        if (CSU_KEYWORD_MARKERS.some((marker) => marker.test(text))) {
          err(location, `contains a keyword associated with internal operational records ("${text.slice(0, 80)}") — CLAUDE.md §2 rule 9 prohibits account/meter/invoice-level data`);
        }
        for (const digitsMatch of text.matchAll(LONG_DIGIT_RUN)) {
          const digits = digitsMatch[0];
          if (!canonicalPhoneDigitSets.has(digits)) {
            warn(location, `contains a long, unexplained digit sequence ("${digits}") — confirm this is not an account, meter, or invoice number`);
          }
        }
      },
      new Set(), // placeholder/reference/secret/CSU checks apply everywhere, including the phone field itself
    );

    if (canonicalPhoneDigitSets.size > 0) {
      walkStrings(
        value,
        moduleName,
        (text, path) => {
          const location = `${fileFor(moduleName)} → ${path}`;
          for (const match of text.matchAll(PHONE_LIKE)) {
            const digits = match[0].replace(/\D/g, "");
            const bareDigits = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
            if (canonicalPhoneDigitSets.has(digits) || canonicalPhoneDigitSets.has(bareDigits)) {
              err(location, `duplicates the approved phone number as a literal — reference site.contact.phone via "@/lib/content" instead of repeating it`);
            } else if (digits.length >= 10) {
              err(location, `contains a phone-number-like value that is not the approved contact number — only one public phone number is approved, set once in content/site.ts (CLAUDE.md §2 rule 8)`);
            }
          }
        },
        phoneSkipPaths,
      );
    }
  }

  // -------------------------------------------------------------------------
  // 5. Unapproved recommendations
  // -------------------------------------------------------------------------

  content.recommendations.forEach((rec, i) => {
    if (rec.approved !== true) {
      err(
        `${fileFor("recommendations")} → recommendations[${i}]`,
        `recommendation from "${rec.author || "(no author)"}" is not approved (approved: true is required — CLAUDE.md §2 rule 5). Remove it or set approved: true only after Bhanu approved publishing and the author gave permission.`,
      );
    }
  });

  // -------------------------------------------------------------------------
  // 6. Hero network: every label must be a real, already-listed technology
  //    (Phase 4 Step 3 / Step 1: never hard-code — or invent — content the content
  //    layer doesn't already have), and at most one node may be "live".
  // -------------------------------------------------------------------------

  const knownTech = new Set<string>();
  for (const group of content.skills) for (const skill of group.skills) knownTech.add(skill);
  for (const project of content.projects) for (const tech of project.tech) knownTech.add(tech);

  content.heroNetwork.forEach((node, i) => {
    if (!knownTech.has(node.label)) {
      err(
        `${fileFor("hero-network")} → heroNetwork[${i}].label`,
        `"${node.label}" does not appear verbatim in any skills or projects tech list — the Hero network may only show technologies the content layer already states.`,
      );
    }
  });

  const liveCount = content.heroNetwork.filter((node) => node.live === true).length;
  if (liveCount > 1) {
    err(fileFor("hero-network"), `${liveCount} nodes are marked "live" — at most one is allowed (CLAUDE.md §4 crimson budget).`);
  }

  // -------------------------------------------------------------------------
  // Report
  // -------------------------------------------------------------------------

  const icons: Record<Level, string> = { error: "✖", warn: "⚠", info: "ℹ" };
  const order: Level[] = ["error", "warn", "info"];

  console.log(`\ncontent:check — validating ${rootLabel}/\n`);

  for (const level of order) {
    const items = findings.filter((f) => f.level === level);
    if (items.length === 0) continue;
    console.log(`${icons[level]} ${level.toUpperCase()} (${items.length})`);
    for (const item of items) {
      console.log(`  ${icons[level]} ${item.location}`);
      console.log(`     ${item.message}`);
    }
    console.log("");
  }

  const errorCount = findings.filter((f) => f.level === "error").length;
  const warnCount = findings.filter((f) => f.level === "warn").length;
  const infoCount = findings.filter((f) => f.level === "info").length;

  if (errorCount === 0) {
    console.log(`✔ No errors. (${warnCount} warning${warnCount === 1 ? "" : "s"}, ${infoCount} informational note${infoCount === 1 ? "" : "s"}.)\n`);
    process.exitCode = 0;
  } else {
    console.log(`✖ ${errorCount} error${errorCount === 1 ? "" : "s"} found. Fix the items above before this content ships.\n`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("content:check crashed:", error);
  process.exitCode = 1;
});
