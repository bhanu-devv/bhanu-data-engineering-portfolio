import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/content-selectors";

/**
 * Generated `/sitemap.xml` (CLAUDE.md §8). One entry: this is a single-page site, and
 * in-page section anchors are not separate URLs. Empty while no canonical site URL
 * exists — a sitemap requires absolute URLs, and none is invented.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return siteUrl ? [{ url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 }] : [];
}
