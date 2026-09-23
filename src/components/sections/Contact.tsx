import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/ui/Reveal";
import { Node } from "@/components/web/Node";
import { site } from "@/lib/content";
import { getPublicSocials } from "@/lib/content-selectors";
import { resolve } from "@/lib/needs-input";

/**
 * The Contact section (Phase 8): the page's closing moment, not a second Hero — a
 * single centered Surface, one live `Node` standing in for "my contact node at the
 * end of the network path" (Step 13), the email as the clear primary action, phone
 * and social links as quieter secondary/tertiary actions. All four are real anchors
 * (`mailto:`, `tel:`, the approved LinkedIn/GitHub URLs from `content/socials.ts`) —
 * no contact form, no clipboard JS, no client component needed at all.
 */
export function Contact() {
  const socials = getPublicSocials();
  const phone = site.contact.phone;
  // `site.contact.email` is a `Maybe<string>` in the schema (a content module could in
  // principle leave it as `needsInput()`), even though content-check.ts already makes
  // an unresolved email a build-blocking ERROR (CLAUDE.md §2 rule 4) — resolving it
  // here keeps that "never render a placeholder" guarantee true at the type level too.
  const email = resolve(site.contact.email);

  return (
    <SectionShell id="contact" className="border-t border-border-subtle">
      <Reveal>
        <SectionHeading
          id="contact-heading"
          eyebrow="12 — Contact"
          title="Get in touch"
          lede="Open to Data Engineering and data-platform roles. Reach out directly — email, phone, LinkedIn, or GitHub."
        />
      </Reveal>

      <Reveal delayMs={60}>
        <Surface chamfered accentEdge className="mt-10 flex flex-col items-center p-10 text-center lg:p-16">
          <Node variant="live" size="md" />
          {email && (
            <a
              href={`mailto:${email}`}
              className="focus-ring mt-4 font-display text-heading break-all text-foreground transition-colors hover:text-muted"
            >
              {email}
            </a>
          )}

          {phone && (
            <a
              href={`tel:${phone.tel}`}
              className="focus-ring mt-4 inline-block font-mono text-lede text-muted transition-colors hover:text-foreground"
            >
              {phone.display}
            </a>
          )}

          {socials.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring font-mono text-label text-muted underline decoration-border decoration-1 underline-offset-4 hover:text-foreground hover:decoration-accent"
                >
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </Surface>
      </Reveal>
    </SectionShell>
  );
}
