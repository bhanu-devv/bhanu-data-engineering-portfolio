import { site } from "@/lib/content";
import { getPublicSocials } from "@/lib/content-selectors";
import { resolve } from "@/lib/needs-input";

/**
 * JSON-LD `Person` structured data (Phase 9 Step 11). Built only from already-public
 * content fields — full name, the approved "Data Engineer" positioning, public email,
 * and public profile links. Deliberately omits:
 * - `telephone`: the phone number is approved for the Contact section only, never
 *   metadata or structured data (CLAUDE.md §2 rule 8, decision 19).
 * - `url`/`@id`: no canonical production URL exists yet (PLANNING.md §14.2 item 11);
 *   a schema.org `Person.url` is conventionally the subject's own canonical page, and
 *   inventing one here would be exactly the kind of placeholder CLAUDE.md prohibits.
 * - `image`: the portrait's only URL right now is relative (`/images/...`); schema.org
 *   consumers expect an absolute URL, which needs the same unresolved domain as `url`.
 * Revisit all three once a production domain exists (Phase 11).
 */
export function PersonJsonLd() {
  const email = resolve(site.contact.email);
  const socials = getPublicSocials();

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name.full,
    jobTitle: "Data Engineer",
    description: site.seo.description,
    ...(email && { email }),
    ...(socials.length > 0 && { sameAs: socials.map((social) => social.url) }),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />;
}
