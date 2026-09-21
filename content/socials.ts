import type { Social } from "@/types/content";

/**
 * Public profile links, confirmed by Bhanu (Phase 1.5).
 *
 * Repository URLs are NOT listed: GitHub integration and featured repositories come
 * later, after the repository and approved project links are confirmed (Phase 12).
 */
export const socials: Social[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/bhanudeepaknagumothu",
    public: true,
  },
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/bhanu-devv",
    public: true,
  },
];
