import type { Recommendation } from "@/types/content";

/**
 * EMPTY ON PURPOSE. The Recommendations section stays hidden until approved records exist.
 *
 * Add a record only with real recommendation text, the author's name, role, and
 * relationship, and `approved: true` (Bhanu approved publishing AND the author gave
 * permission). Never fabricate, paraphrase, or "improve" a recommendation.
 */
export const recommendations: Recommendation[] = [];
