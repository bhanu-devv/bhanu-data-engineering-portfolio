import type { Certification } from "@/types/content";

/**
 * EXAMPLE CONTENT — entirely fictional issuers and credential IDs. Shows both states a
 * certification record can be in: fully filled in (all the optional fields present) or
 * name-and-issuer only (the fields after `kind` are simply omitted — never faked).
 */
export const certifications: Certification[] = [
  {
    id: "cloudcert-data-engineering-associate",
    name: "Cloud Data Engineering Associate",
    issuer: "CloudCert Institute",
    kind: "certification",
    issued: "2023-05",
    expires: "2026-05",
    credentialId: "CC-DE-88214",
    verifyUrl: "https://example.com/verify/CC-DE-88214",
  },
  {
    // No issued/expires/credentialId/verifyUrl/badge/kind — this is what an
    // unresolved-but-real certification looks like: it still renders, just with less.
    id: "opendata-streaming-foundations",
    name: "Streaming Systems Foundations",
    issuer: "OpenData Academy",
  },
];
