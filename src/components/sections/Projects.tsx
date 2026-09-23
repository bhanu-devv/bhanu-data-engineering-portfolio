import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Node } from "@/components/web/Node";
import { NetworkMesh } from "@/components/web/NetworkMesh";
import { ProjectCard } from "@/components/web/ProjectCard";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { getFeaturedProjects } from "@/lib/content-selectors";

/**
 * The Projects section (Phase 6). The flagship lakehouse project (first in
 * `content/projects.ts`, matching its resume order) spans the full grid width for
 * "the strongest visual emphasis" (Step 2); the two completed automations sit side by
 * side below it. Everything but the modal interaction itself is server-rendered —
 * `ProjectsGrid` (client) only owns hash-driven open/close state, and each
 * `ProjectCard` is passed into it as an already-rendered child (CLAUDE.md §6: push
 * `"use client"` as far down the tree as possible).
 */
export function Projects() {
  const featured = getFeaturedProjects();
  const [flagship, ...rest] = featured;

  return (
    <SectionShell id="projects" className="relative overflow-hidden border-t border-border-subtle">
      {/* Ambient backdrop (Phase 9.7 Part 3: "Projects transition area") — static,
          no continuous loop (NetworkMesh draws in once then stops; web.css), very low
          opacity so it never competes with the cards themselves. */}
      <NetworkMesh
        seed={21}
        radials={9}
        rings={2}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.14]"
      />

      <Reveal>
        <SectionHeading
          id="projects-heading"
          eyebrow="04 — Projects"
          title="What I've built"
          lede="Three processing nodes on the same system: a platform I'm building now, and two automations already delivering results."
        />
      </Reveal>

      {/* A quiet, purely decorative connector (Phase 6 Step 16) — no unique
          information of its own (every project is already named and described in its
          own card below), so it is aria-hidden rather than a semantic list. */}
      <div aria-hidden="true" className="my-8 flex items-center gap-3">
        <Node size="sm" />
        <span className="h-px flex-1 bg-border" />
        <Node size="sm" />
        <span className="h-px flex-1 bg-border" />
        <Node size="sm" />
      </div>

      <ProjectsGrid projects={featured}>
        {flagship && (
          <Reveal className="lg:col-span-2">
            <ProjectCard project={flagship} flagship />
          </Reveal>
        )}
        {rest.map((project, i) => (
          <Reveal key={project.slug} delayMs={(i + 1) * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ProjectsGrid>
    </SectionShell>
  );
}
