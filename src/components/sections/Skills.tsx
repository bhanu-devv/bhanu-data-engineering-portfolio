import { Fragment } from "react";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/ui/Reveal";
import { TechTag } from "@/components/ui/TechTag";
import { Node } from "@/components/web/Node";
import { skills } from "@/lib/content";
import { getEvidencedSkills } from "@/lib/content-selectors";

/**
 * The Skills section (Phase 7): the five resume skill groups, each its own quiet
 * "hub" card, technologies rendered with the existing `TechTag` primitive rather than
 * a full per-skill node graph — up to nine skills per group would make a literal
 * constellation cramped and unreadable (Step 4's own "do not make every technology
 * equally visually loud" without a separate hierarchy mechanism). Hierarchy instead
 * comes from `getEvidencedSkills()`: a skill also named in Experience or Projects
 * renders as a filled tag — a factual relationship, not a self-scored rating (Step 6).
 */
export function Skills() {
  const evidenced = getEvidencedSkills();

  return (
    <SectionShell id="skills" className="border-t border-border-subtle">
      <Reveal>
        <SectionHeading
          id="skills-heading"
          eyebrow="05 — Skills"
          title="Where I work across the stack"
          lede="Five areas I build in. Filled tags are technologies also proven in my experience or projects above."
        />
      </Reveal>

      {/* A quiet connector across the five group hubs — no per-node labels (unlike
          About's strand), so there is nothing to collide or wrap at any width. */}
      <div aria-hidden="true" className="my-8 flex items-center gap-3">
        {skills.map((group, i) => (
          <Fragment key={group.id}>
            <Node size="sm" />
            {i < skills.length - 1 && <span className="h-px flex-1 bg-border" />}
          </Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.id} delayMs={i * 60}>
            <Surface chamfered tilt className="h-full p-6">
              <div className="flex items-center gap-2">
                <Node size="sm" />
                <h3 className="font-display text-heading text-foreground">{group.name}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <TechTag key={skill} emphasized={evidenced.has(skill)}>
                    {skill}
                  </TechTag>
                ))}
              </div>
            </Surface>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
