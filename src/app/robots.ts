import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/content-selectors";

/** Generated `/robots.txt` (CLAUDE.md §8). Points at the sitemap only when a canonical site URL exists. */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteUrl && { sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl }),
  };
}
