"use client";

import dynamic from "next/dynamic";
import { useCallback, useId, useSyncExternalStore, type ReactNode } from "react";
import { Dialog } from "@/components/ui/Dialog";
import type { Project } from "@/types/content";

// Code-split: a project's richer case-study UI (and its own imports — the architecture
// diagram, the milestone list) only loads once a visitor actually opens one (Phase 6
// Step 21 "evaluate whether the richer case-study UI can be loaded lazily"). `ssr:
// false` because it only ever renders after a client-side hash match — there is never
// server-rendered HTML for it to produce.
const ProjectModalContent = dynamic(
  () => import("@/components/sections/ProjectModalContent").then((mod) => mod.ProjectModalContent),
  { ssr: false },
);

const HASH_PREFIX = "#project=";

function slugFromHash(hash: string): string | null {
  return hash.startsWith(HASH_PREFIX) ? decodeURIComponent(hash.slice(HASH_PREFIX.length)) : null;
}

function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function getHashSnapshot() {
  return slugFromHash(window.location.hash);
}

function getServerHashSnapshot() {
  // No hash reaches the server at all (fragments are never sent in an HTTP request),
  // so the only honest server/first-paint snapshot is "closed" — matches the rest of
  // this site's progressive-enhancement pattern (Reveal, NetworkMesh's unfurl).
  return null;
}

interface ProjectsGridProps {
  projects: Project[];
  /** The server-rendered cards, one per `projects` entry, in the same order — passed
   *  as children (not re-derived here) so this client component never needs to import
   *  `ProjectCard` or any of its content-rendering logic itself. */
  children: ReactNode;
}

/**
 * Owns the Projects section's one piece of client state: which project's case-study
 * modal (if any) is open, driven entirely by the URL hash (`#project=<slug>`,
 * PLANNING.md §9.4 / D5) rather than React state a card's click handler would set
 * directly — a card's "View Case Study" action is consequently a genuine `<a
 * href="#project=...">` link (Phase 6 Step 11: "must be a real interactive element"),
 * not a synthetic click handler, and the browser's own Back button already closes the
 * modal for free because it's just another hash-history entry.
 */
export function ProjectsGrid({ projects, children }: ProjectsGridProps) {
  const openSlug = useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerHashSnapshot);
  const titleId = useId();

  // Fires after the native dialog closes for ANY reason (Escape, a backdrop click, or
  // the close button — see ProjectModalContent). If the hash still names an open
  // project, this close was user/browser-initiated rather than a hash change we
  // already reacted to, so correct the hash to match; if the hash was already cleared
  // (e.g. the visitor pressed the browser's own Back button), do nothing — avoids a
  // second, redundant `history.back()`.
  const handleClosed = useCallback(() => {
    if (slugFromHash(window.location.hash)) history.back();
  }, []);

  const activeProject = openSlug ? (projects.find((project) => project.slug === openSlug) ?? null) : null;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">{children}</div>

      {/* `Dialog` stays mounted permanently (even while closed, `display: none` via
          dialog.css costs nothing) so closing always goes through its own native
          `.close()` call and 'close' event — conditionally mounting/unmounting the
          whole `Dialog` here instead would tear the real <dialog> element out of the
          DOM before that event (and the focus-restoration it drives) ever fires, a
          real bug found via Playwright QA: focus landed on <body> instead of back on
          the trigger link. Only the (lazy-loaded) content inside is conditional. */}
      <Dialog open={activeProject !== null} onClosed={handleClosed} titleId={titleId}>
        {activeProject && <ProjectModalContent project={activeProject} titleId={titleId} />}
      </Dialog>
    </>
  );
}
