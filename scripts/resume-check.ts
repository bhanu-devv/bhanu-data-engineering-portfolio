#!/usr/bin/env -S npx tsx
/**
 * npm run resume:check
 *
 * Verifies the single-source resume architecture (CLAUDE.md §6 decision 10;
 * PLANNING.md §8) without ever writing to the PDF:
 *
 *   - the PDF that content/resume.ts points at exists locally
 *   - it is actually a PDF (checks the %PDF magic bytes, not just the extension)
 *   - the configured public path matches the locked path, /resume/bhanu-resume.pdf
 *   - no file under src/ or content/ hardcodes a second, competing resume path
 *   - no file under src/, content/, or content.example/ contains a reference/ path
 *
 * This script only reads files. It never modifies the resume PDF or anything else.
 * Exit code 0: no errors. Exit code 1: at least one error was found.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";
import { resume, site } from "../src/lib/content.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

type Level = "error" | "warn" | "info";
interface Finding {
  level: Level;
  location: string;
  message: string;
}
const findings: Finding[] = [];
const err = (location: string, message: string) => findings.push({ level: "error", location, message });
const info = (location: string, message: string) => findings.push({ level: "info", location, message });

// ---------------------------------------------------------------------------
// 1. The configured public path matches the locked path (CLAUDE.md §6 decision 10)
// ---------------------------------------------------------------------------

const LOCKED_RESUME_PATH = "/resume/bhanu-resume.pdf";
if (resume.file !== LOCKED_RESUME_PATH) {
  err(
    "content/resume.ts → resume.file",
    `is "${resume.file}", but the locked stable path is "${LOCKED_RESUME_PATH}" (CLAUDE.md §6 decision 10). Changing it needs Bhanu's explicit approval and a documentation update, not just a content edit.`,
  );
}

/** All the digit-only forms a phone number might legitimately appear as in plain text. */
function getPhoneDigitVariants(tel: string | undefined, display: string | undefined): string[] {
  const variants = new Set<string>();
  for (const raw of [tel, display]) {
    if (!raw) continue;
    const digits = raw.replace(/\D/g, "");
    if (digits.length === 0) continue;
    variants.add(digits);
    if (digits.length === 11 && digits.startsWith("1")) variants.add(digits.slice(1));
  }
  return [...variants];
}

/**
 * Concatenates the literal contents of every `(...)` string in a PDF content stream,
 * which is where `Tj`/`TJ` text-showing operators keep the actual glyphs — e.g.
 * `[-343(360-46)1(4-5093)]TJ` becomes "360-4644-5093" once the "-343"/"1" kerning
 * numbers (bare numbers outside parentheses) are correctly ignored rather than mixed
 * into the digits. Handles the PDF string escapes (`\(`, `\)`, `\\`, `\n`, `\r`, `\t`);
 * unrecognized escapes are passed through as-is.
 */
function extractParenStrings(streamText: string): string {
  let result = "";
  for (let i = 0; i < streamText.length; i++) {
    if (streamText[i] !== "(") continue;
    let depth = 1;
    i++;
    while (i < streamText.length && depth > 0) {
      const c = streamText[i];
      if (c === "\\") {
        const next = streamText[i + 1];
        if (next === "n") result += "\n";
        else if (next === "r") result += "\r";
        else if (next === "t") result += "\t";
        else if (next !== undefined) result += next;
        i += 2;
        continue;
      }
      if (c === "(") {
        depth++;
        result += c;
        i++;
        continue;
      }
      if (c === ")") {
        depth--;
        i++;
        if (depth > 0) result += c;
        continue;
      }
      result += c;
      i++;
    }
  }
  return result;
}

/**
 * Best-effort extraction of readable text from a PDF's content streams, using only
 * Node's built-in zlib (no PDF-parsing dependency). PDF content streams are almost
 * always FlateDecode-compressed; a raw byte scan alone would miss them and wrongly
 * suggest a text-based resume has no text layer. Returns the reconstructed glyph text
 * (see extractParenStrings) — this is what "does this PDF have a text layer" and
 * "does the PDF contain the phone number" are both checked against.
 */
function extractStreamText(buffer: Buffer): string {
  const raw = buffer.toString("latin1");
  const STREAM_RE = /stream\r?\n([\s\S]*?)endstream/g;
  let out = "";
  let match: RegExpExecArray | null;
  while ((match = STREAM_RE.exec(raw))) {
    const chunk = Buffer.from(match[1], "latin1");
    let inflated: string;
    try {
      inflated = zlib.inflateSync(chunk).toString("latin1");
    } catch {
      // Not zlib-compressed (or a different filter) — fall back to the raw bytes.
      inflated = match[1];
    }
    out += extractParenStrings(inflated);
  }
  return out;
}

// ---------------------------------------------------------------------------
// 2. The expected local PDF exists, and it is actually a PDF
// ---------------------------------------------------------------------------

const absolutePath = path.join(ROOT, "public", resume.file);
const relativeDisplay = path.join("public", resume.file);

if (!existsSync(absolutePath)) {
  err(relativeDisplay, "the resume PDF is missing locally. Copy the approved resume to this path — it is tracked in Git and expected to be present (decision 19, resolved in Phase 8; PLANNING.md §8.5).");
} else {
  const stats = statSync(absolutePath);
  if (!stats.isFile()) {
    err(relativeDisplay, "exists but is not a regular file");
  } else {
    // Read-only: check the %PDF magic bytes. Never write to this file.
    const fd = readFileSync(absolutePath);
    const header = fd.subarray(0, 5).toString("latin1");
    if (!header.startsWith("%PDF-")) {
      err(relativeDisplay, `does not look like a PDF (expected the file to start with "%PDF-", found "${header}")`);
    } else {
      info(relativeDisplay, `looks like a valid PDF, ${(stats.size / 1024).toFixed(0)} KB, last modified ${stats.mtime.toISOString().slice(0, 10)}`);

      // Informational only: whether the PDF has a text layer at all (relevant for ATS
      // readability). Most PDF generators compress each page's content stream with
      // FlateDecode and show text via `(...)Tj`/`[(...)...]TJ` operators — extractStreamText
      // inflates each content stream and pulls out just the parenthesized glyph text, so
      // a real, sizeable chunk of reconstructed text is good evidence of a genuine text
      // layer (as opposed to a scanned/image-only page, which yields none). Not a failure
      // either way — just a note.
      const decompressedText = extractStreamText(fd);
      const hasTextLayer = decompressedText.replace(/\s+/g, "").length > 40;
      info(
        relativeDisplay,
        hasTextLayer
          ? "appears to contain a text layer"
          : "could not confirm a text layer (may be a scanned/image-only PDF — not a failure, just worth checking manually)",
      );

      // Informational only: the phone number is approved to be in the resume PDF
      // (CLAUDE.md §2 rule 8, decision 19), so its presence is never flagged as an error.
      const digitsOnly = decompressedText.replace(/[^0-9]/g, "");
      const phoneDigitVariants = getPhoneDigitVariants(site.contact.phone?.tel, site.contact.phone?.display);
      if (phoneDigitVariants.some((variant) => digitsOnly.includes(variant))) {
        info(relativeDisplay, "the PDF's text layer appears to contain the approved public phone number — this is expected and approved (decision 19), not an issue.");
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 3. No file hardcodes a second, competing resume path
// ---------------------------------------------------------------------------

const RESUME_FILENAME_MARKER = "bhanu-resume.pdf";
// The one file allowed to mention the filename as a validation-message EXAMPLE, not a
// real path — src/schemas/content.ts's format-check message for resumeConfigSchema.file.
const COMPETING_PATH_EXCEPTIONS = new Set([path.join("src", "schemas", "content.ts"), path.join("content", "resume.ts")]);

// ---------------------------------------------------------------------------
// 4. No reference/ path anywhere in shipped source (src/, content/, content.example/)
// ---------------------------------------------------------------------------

const REFERENCE_MARKER = /reference\//;

function walkTsFiles(dir: string, visit: (absPath: string, relPath: string) => void) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") continue;
    const abs = path.join(dir, entry.name);
    const rel = path.relative(ROOT, abs);
    if (entry.isDirectory()) {
      walkTsFiles(abs, visit);
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      visit(abs, rel);
    }
  }
}

for (const scanRoot of ["src", "content", "content.example"]) {
  walkTsFiles(path.join(ROOT, scanRoot), (abs, rel) => {
    const text = readFileSync(abs, "utf8");

    if (!COMPETING_PATH_EXCEPTIONS.has(rel) && text.includes(RESUME_FILENAME_MARKER)) {
      err(rel, `hardcodes the resume filename ("${RESUME_FILENAME_MARKER}") outside content/resume.ts — this is the single source of truth (CLAUDE.md §6); reference the "resume" export from "@/lib/content" instead.`);
    }

    if (REFERENCE_MARKER.test(text)) {
      err(rel, 'contains a "reference/" path — this must never appear in shipped code (CLAUDE.md §3).');
    }
  });
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const icons: Record<Level, string> = { error: "✖", warn: "⚠", info: "ℹ" };
const order: Level[] = ["error", "warn", "info"];

console.log("\nresume:check\n");

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
if (errorCount === 0) {
  console.log("✔ No errors.\n");
  process.exitCode = 0;
} else {
  console.log(`✖ ${errorCount} error${errorCount === 1 ? "" : "s"} found.\n`);
  process.exitCode = 1;
}
