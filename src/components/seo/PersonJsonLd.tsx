import { site } from "@/lib/content";
import { getPublicSocials, getSiteUrl } from "@/lib/content-selectors";
import { resolve } from "@/lib/needs-input";

/**
 * JSON-LD `Person` structured data (Phase 9 Step 11; `url`/`image` added Phase 11).
 * Built only from already-public content fields — full name, the approved "Data
 * Engineer" positioning, public email, public profile links, and (once
 * `site.seo.url` is set) the canonical site URL and the absolute portrait URL.
 * Deliberately omits `telephone`: the phone number is approved for the Contact section
 * only, never metadata or structured data (CLAUDE.md §2 rule 8, decision 19). `url`
 * and `image` are omitted cleanly while the site URL is still `needsInput()`.
 */
export function PersonJsonLd() {
  const email = resolve(site.contact.email);
  const socials = getPublicSocials();
  const siteUrl = getSiteUrl();

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name.full,
    jobTitle: "Data Engineer",
    description: site.seo.description,
    ...(siteUrl && { url: siteUrl, image: `${siteUrl}${site.portrait.src}` }),
    ...(email && { email }),
    ...(socials.length > 0 && { sameAs: socials.map((social) => social.url) }),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />;
}
