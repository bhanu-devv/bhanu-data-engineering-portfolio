import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { Surface } from "@/components/ui/Surface";
import { TechTag } from "@/components/ui/TechTag";
import { Node } from "@/components/web/Node";
import { NetworkMesh } from "@/components/web/NetworkMesh";
import { site } from "@/lib/content";

/**
 * PHASE 3 — VISUAL SYSTEM SPECIMEN. This is not the final homepage: it exists to
 * evaluate the design tokens, typography, surfaces, web/network primitives, motion,
 * and focus states before the real Hero and later sections are built (Phase 4+).
 * The real name identifies the site; nothing here is final section content.
 */
export default function Home() {
  return (
    <main id="main" className="relative overflow-hidden">
      {/* ---------------------------------------------------------------
          Intro — identifies the site; NOT the final Hero (that's Phase 4).
      --------------------------------------------------------------- */}
      <div className="relative border-b border-border-subtle">
        <NetworkMesh
          seed={7}
          radials={9}
          rings={3}
          className="pointer-events-none absolute top-1/2 right-[-8%] h-[140%] w-[70%] max-w-[720px] -translate-y-1/2 opacity-60 sm:right-[-4%]"
        />
        <Container className="relative py-24 sm:py-32">
          <span className="mb-4 inline-flex items-center gap-2 rounded-sm border border-border px-3 py-1 font-mono text-label tracking-[0.14em] text-muted uppercase">
            <Node variant="live" size="sm" /> Design system specimen — Phase 3
          </span>
          <h1 className="max-w-3xl font-display text-hero leading-[0.98] tracking-tight text-foreground text-balance">
            {site.name.full}
          </h1>
          <p className="mt-5 max-w-(--container-narrow) text-lede leading-relaxed text-muted-foreground">
            This page evaluates the visual foundation — tokens, type, surfaces, the
            web/network language, motion, and focus states — before the real sections
            are built. Nothing below is final portfolio content.
          </p>
        </Container>
      </div>

      {/* ---------------------------------------------------------------
          Typography scale
      --------------------------------------------------------------- */}
      <SectionShell id="type">
        <Reveal>
          <SectionHeading id="type-heading" eyebrow="01 — Typography" title="Three roles, two primary families" />
        </Reveal>
        <div className="mt-10 space-y-6">
          <Reveal>
            <p className="font-display text-hero leading-[0.95] tracking-tight text-foreground">Hero display</p>
          </Reveal>
          <Reveal delayMs={60}>
            <p className="font-display text-display tracking-tight text-foreground">Section heading</p>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="text-lede text-foreground">
              Body copy in Inter — highly readable at paragraph sizes, the neutral partner to the display face.
              The quick brown fox jumps over a lazy Databricks cluster.
            </p>
          </Reveal>
          <Reveal delayMs={180}>
            <p className="font-mono text-sm text-muted">
              mono — technical metadata, tech tags, code-adjacent labels
            </p>
          </Reveal>
        </div>
      </SectionShell>

      {/* ---------------------------------------------------------------
          Palette
      --------------------------------------------------------------- */}
      <SectionShell id="palette" className="border-t border-border-subtle">
        <Reveal>
          <SectionHeading
            id="palette-heading"
            eyebrow="02 — Palette"
            title="92% grayscale, 8% crimson"
            lede="Crimson marks only the active, selected, or 'live' element — never a large fill."
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {(
            [
              ["Background", "bg-background", "border border-border-subtle"],
              ["Surface", "bg-surface", "border border-border"],
              ["Elevated", "bg-surface-elevated", "border border-border"],
              ["Border", "bg-border", ""],
              ["Muted", "bg-muted", ""],
              ["Foreground", "bg-foreground", ""],
              ["Accent", "bg-accent", ""],
            ] as const
          ).map(([label, bg, extra]) => (
            <div key={label} className="space-y-2">
              <div className={`aspect-square rounded-sm ${bg} ${extra}`} />
              <p className="font-mono text-label text-muted">{label}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ---------------------------------------------------------------
          Surfaces, buttons, tags
      --------------------------------------------------------------- */}
      <SectionShell id="surfaces" className="border-t border-border-subtle">
        <Reveal>
          <SectionHeading id="surfaces-heading" eyebrow="03 — Surfaces & controls" title="Precision-engineered panels" />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <Surface tilt className="p-6">
              <p className="font-display text-heading text-foreground">Standard surface</p>
              <p className="mt-2 text-sm text-muted-foreground">Hover for a bounded tilt (fine pointers only).</p>
            </Surface>
          </Reveal>
          <Reveal delayMs={60}>
            <Surface elevated chamfered tilt className="p-6">
              <p className="font-display text-heading text-foreground">Elevated · chamfered</p>
              <p className="mt-2 text-sm text-muted-foreground">The angular language: a chamfered corner, not a rounded one.</p>
            </Surface>
          </Reveal>
          <Reveal delayMs={120}>
            <Surface accentEdge className="p-6">
              <div className="flex items-center gap-2">
                <Node variant="live" size="sm" />
                <p className="font-display text-heading text-foreground">Live / selected</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">The restrained crimson edge — reserved for one active surface at a time.</p>
            </Surface>
          </Reveal>
        </div>

        <Reveal delayMs={180}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary link</Button>
          </div>
        </Reveal>

        <Reveal delayMs={220}>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Python", "Azure Databricks", "PySpark", "Delta Lake", "Power BI", "T-SQL"].map((tech) => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      {/* ---------------------------------------------------------------
          Web / network language
      --------------------------------------------------------------- */}
      <SectionShell id="network" className="border-t border-border-subtle">
        <Reveal>
          <SectionHeading
            id="network-heading"
            eyebrow="04 — Web / network language"
            title="Original geometry, generated by code"
            lede="A pure, seeded generator — spokes, sagging rings, and nodes. Purely decorative and aria-hidden; text stays dominant."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Surface elevated className="relative flex aspect-square items-center justify-center overflow-hidden p-8">
              <NetworkMesh seed={3} radials={7} rings={3} className="h-full w-full opacity-90" />
            </Surface>
          </Reveal>
          <Reveal delayMs={80}>
            <Surface className="flex aspect-square flex-col justify-center gap-6 p-8">
              <div className="flex items-center gap-3">
                <Node variant="default" label="node" />
              </div>
              <div className="flex items-center gap-3">
                <Node variant="live" label="live node" />
              </div>
              <p className="text-sm text-muted-foreground">
                The live node pulses gently — the one ambient animation loop a view is allowed at a time.
              </p>
            </Surface>
          </Reveal>
        </div>
      </SectionShell>

      {/* ---------------------------------------------------------------
          Focus / keyboard states
      --------------------------------------------------------------- */}
      <SectionShell id="focus" className="border-t border-border-subtle">
        <Reveal>
          <SectionHeading
            id="focus-heading"
            eyebrow="05 — Focus & keyboard"
            title="Tab through this row"
            lede="Off-white outer ring, void gap, crimson inner accent — visible on every interactive element, never removed."
          />
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button variant="primary">First</Button>
          <Button variant="secondary">Second</Button>
          <a href="#type" className="focus-ring rounded-sm px-2 py-1 text-foreground underline decoration-border underline-offset-4">
            A real link
          </a>
          <TechTag>Static tag (not interactive)</TechTag>
        </div>
      </SectionShell>

      <div className="border-t border-border-subtle py-10">
        <Container>
          <p className="font-mono text-label text-muted">
            {site.name.full} — Phase 3 specimen. Replaced by the real Hero in Phase 4.
          </p>
        </Container>
      </div>
    </main>
  );
}
