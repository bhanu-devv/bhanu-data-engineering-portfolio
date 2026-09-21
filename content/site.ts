import { needsInput } from "@/lib/needs-input";
import type { Site } from "@/types/content";

/**
 * Profile, positioning, public contact, and SEO defaults.
 * The phone number below is approved for public display in the Contact section ONLY
 * (not hero, nav, footer, metadata, or structured data). See CLAUDE.md §2 rule 8.
 */
export const site: Site = {
  name: {
    full: "Bhanudeepak Nagumothu",
    short: "Bhanu",
    // Proposed monogram; confirm at the design phase.
    monogram: "BN",
  },

  // Approved hero positioning, verbatim. Do not strengthen or rephrase.
  positioning:
    "Data Engineer building reliable cloud data platforms, pipelines, and automation that turn operational data into trusted systems.",

  location: "Cleveland, OH",

  contact: {
    // Confirmed by Bhanu (Phase 1.5) as the public professional email.
    email: "bittugsr@gmail.com",
    // Taken verbatim from the approved resume. Bhanu approved public display in Contact.
    // `tel` is the same number in dialable form (US/Canada country code +1).
    phone: { display: "360-464-5093", tel: "+13604645093" },
  },

  seo: {
    title: "Bhanudeepak Nagumothu | Data Engineer",
    description:
      "Bhanudeepak Nagumothu, Data Engineer building reliable cloud data platforms, pipelines, and automation that turn operational data into trusted systems.",
    url: needsInput("Canonical site URL (known once a domain is chosen)"),
  },

  portrait: {
    src: "/images/profile/bhanu-portrait.png",
    alt: "Illustrated portrait of Bhanudeepak Nagumothu",
    width: 400,
    height: 400,
  },
};
