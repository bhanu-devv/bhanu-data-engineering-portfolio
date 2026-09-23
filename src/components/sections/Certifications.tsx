import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/ui/Reveal";
import { Node } from "@/components/web/Node";
import { certifications } from "@/lib/content";
import { uiStrings } from "@/lib/ui-strings";
import type { Certification } from "@/types/content";

// `kind` labels — kept local to this component (same pattern as ProjectStatusBadge's
// own LABEL map), since nothing else in the codebase renders a certification kind.
// "Credential" is the honest fallback for a record with no `kind` set (Phase 7 Step
// 11: never upgrade a credential's nature — an unclassified one stays unclassified).
const KIND_LABEL: Record<NonNullable<Certification["kind"]> | "credential", string> = {
  certification: "Certification",
  "applied-skill": "Applied Skill",
  training: "Training",
  credential: "Credential",
};

/**
 * The Certifications section (Phase 7): smaller, quieter "credential nodes" than
 * Skills' hub cards (Step 15) — grayscale surfaces, issuer as quiet metadata, no
 * vendor logos or brand colors. Every `verifyUrl` is currently absent on the real
 * site (none of the 5 credentials has an approved public verification URL yet), so no
 * "Verify credential" action renders anywhere on the live site — self-hiding per
 * record, never a disabled or fake link.
 */
export function Certifications() {
  return (
    <SectionShell id="certifications" className="border-t border-border-subtle">
      <Reveal>
        <SectionHeading
          id="certifications-heading"
          eyebrow="06 — Certifications"
          title="Credentials"
          lede="Certifications, an applied skill, and training completions — kept as their own kinds, not blurred together."
        />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <Reveal key={cert.id} delayMs={i * 50}>
            <Surface chamfered className="h-full p-5">
              <div className="flex items-center gap-2">
                <Node size="sm" />
                <span className="font-mono text-label text-muted tracking-wide uppercase">
                  {KIND_LABEL[cert.kind ?? "credential"]}
                </span>
              </div>
              <h3 className="mt-3 font-display text-lede text-foreground text-balance">{cert.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-3 inline-flex font-mono text-label text-muted underline decoration-border decoration-1 underline-offset-4 hover:text-foreground hover:decoration-accent"
                >
                  {uiStrings.verifyCredential}
                </a>
              )}
            </Surface>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
