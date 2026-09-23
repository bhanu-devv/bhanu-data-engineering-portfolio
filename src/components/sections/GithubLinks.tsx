import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/ui/Reveal";
import { Node } from "@/components/web/Node";
import { getPublicSocials } from "@/lib/content-selectors";
import { uiStrings } from "@/lib/ui-strings";
import type { Social } from "@/types/content";

// Generic, reusable copy for a known social id — not a fact about Bhanu (that's
// `social.label`/`social.url`, from content), so it lives here as UI chrome, same
// precedent as ProjectStatusBadge's/Certifications' local label maps.
const DESCRIPTION: Record<string, string> = {
  github: "Code, pipelines, and technical work.",
  linkedin: "Professional background and experience.",
};
const ACTION_LABEL: Record<string, string> = {
  github: uiStrings.viewGithubProfile,
  linkedin: uiStrings.viewLinkedinProfile,
};

/**
 * The GitHub / Links section (Phase 7.5 Steps 8-12): a concise professional-links
 * section, not a second Contact section — no email here (Phase 8). Static profile
 * links only; no repository counts, stars, or activity stats (Step 9 — none of that
 * is fetched, so none of it is claimed). Each social is one full-card link (no nested
 * interactive content inside it, so wrapping the whole `Surface` in the `<a>` is safe
 * — unlike Phase 6's project cards, which needed a separate "View Case Study" control
 * specifically because they had other real actions alongside it).
 *
 * Project-level GitHub links are untouched (Phase 6 policy, PLANNING.md §9.4/D-log):
 * none of the 3 real projects has an approved public repository URL, and this section
 * does not change that — it links to the GitHub *profile* only.
 */
export function GithubLinks() {
  const socials = getPublicSocials();
  if (socials.length === 0) return null;

  return (
    <SectionShell id="github-links" className="border-t border-border-subtle">
      <Reveal>
        <SectionHeading
          id="github-links-heading"
          eyebrow="10 — GitHub / Links"
          title="Find the work"
          lede="Where to see the code and the professional background behind it."
        />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {socials.map((social: Social, i) => (
          <Reveal key={social.id} delayMs={i * 60}>
            {/* An explicit aria-label, not the subtree's own computed name: the card
                wraps a heading (`social.label`) plus a description sentence plus the
                action label, which would otherwise concatenate into one run-on string
                for a screen-reader user tabbing to the link — found while auditing
                this link's accessible name during QA. The label alone ("View GitHub
                Profile") is concise and unambiguous on its own. */}
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ACTION_LABEL[social.id] ?? `View ${social.label}`}
              className="focus-ring block"
            >
              <Surface chamfered tilt className="h-full p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Node size="sm" />
                    <p className="font-display text-heading text-foreground">{social.label}</p>
                  </div>
                  <span aria-hidden="true" className="text-muted">
                    ↗
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{DESCRIPTION[social.id] ?? ""}</p>
                <span className="mt-4 inline-block font-mono text-label text-muted">
                  {ACTION_LABEL[social.id] ?? `View ${social.label}`}
                </span>
              </Surface>
            </a>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
