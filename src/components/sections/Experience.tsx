import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ExperienceThread } from "@/components/web/ExperienceThread";
import { experience } from "@/lib/content";

/** The Experience section (Phase 5): a career-path connector, current role first. */
export function Experience() {
  return (
    <SectionShell id="experience" className="border-t border-border-subtle">
      <Reveal>
        <SectionHeading
          id="experience-heading"
          eyebrow="03 — Experience"
          title="The path to Data Engineering"
          lede="Three roles, one throughline: taking scattered operational data and making it trustworthy enough to act on."
        />
      </Reveal>
      <ExperienceThread roles={experience} />
    </SectionShell>
  );
}
