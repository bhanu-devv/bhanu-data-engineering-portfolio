import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { resume } from "@/lib/content";
import { getResumeAsset } from "@/lib/resume";

/**
 * The Resume section (Phase 8): one Surface, not a second Experience/Education/Skills
 * — a short, standalone summary (`content/resume.ts`'s `summary`, deliberately
 * different wording from `site.positioning`) plus View/Download actions, both reading
 * the single centralized `getResumeAsset()` helper (CLAUDE.md §6 "one resume source").
 * `accentEdge` (the same "trusted/current" crimson convention used elsewhere) frames
 * this as the professional record's canonical, trusted copy — Phase 8 Step 8's
 * "professional record → trusted output node."
 *
 * Self-hides entirely if the configured PDF isn't on disk — `getResumeAsset()` already
 * guarantees `available` is false rather than ever handing back a link to a missing
 * file, and a Resume section with no working action would be pointless to show.
 */
export function Resume() {
  const asset = getResumeAsset();
  if (!asset.available) return null;

  return (
    <SectionShell id="resume" className="border-t border-border-subtle">
      <Reveal>
        <SectionHeading id="resume-heading" eyebrow="11 — Resume" title="The complete record" />
      </Reveal>

      <Reveal delayMs={60}>
        <Surface chamfered accentEdge className="mt-10 p-8 lg:p-10">
          <p className="font-mono text-label text-muted tracking-wide uppercase">{resume.title}</p>
          <p className="mt-3 max-w-(--container-narrow) text-lede leading-relaxed text-foreground text-pretty">
            {resume.summary}
          </p>

          {(asset.updatedAt || asset.sizeLabel) && (
            <p className="mt-4 font-mono text-label text-muted">
              {asset.updatedAt &&
                `Updated ${new Date(asset.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}`}
              {asset.updatedAt && asset.sizeLabel && " · "}
              {asset.sizeLabel}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button href={asset.viewHref} variant="primary" target="_blank" rel="noopener noreferrer">
              View Resume
            </Button>
            <Button href={asset.downloadHref} variant="secondary" download={asset.downloadName}>
              Download Resume
            </Button>
          </div>
        </Surface>
      </Reveal>
    </SectionShell>
  );
}
