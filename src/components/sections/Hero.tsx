import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Node } from "@/components/web/Node";
import { HeroWeb } from "@/components/web/HeroWeb";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { site, metrics, heroNetwork } from "@/lib/content";
import { getPublicSocials, getSectionHref } from "@/lib/content-selectors";
import { getResumeAsset } from "@/lib/resume";

// The four most recruiter-relevant, non-overlapping resume metrics (Phase 4 Step 7).
// "170+ monthly bill-related items" is deliberately left out — it restates the same
// scope "20+ campus buildings" already covers, and a proof strip reads better as
// distinct facts than as two sizes of the same fact.
const PROOF_METRIC_IDS = ["campus-buildings", "energy-star-records", "energy-star-prep", "steam-bill-extraction"];

/**
 * The Hero section (Phase 4). Asymmetric composition: identity, positioning, and
 * actions on the left; the portrait-as-network-node on the right. The proof strip is
 * a band at the foot of this section, not a section of its own (CLAUDE.md §6).
 */
export function Hero() {
  const resumeAsset = getResumeAsset();
  const socials = getPublicSocials();
  const proofMetrics = metrics.filter((metric) => PROOF_METRIC_IDS.includes(metric.id));

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <Reveal>
              <p className="mb-6 flex items-center gap-2 font-mono text-label tracking-wide text-muted uppercase">
                <Node size="sm" />
                Data Engineer · {site.location}
              </p>
            </Reveal>

            <Reveal delayMs={80}>
              <h1
                id="hero-heading"
                className="hero-name font-display text-hero leading-[1.05] tracking-tight text-balance"
              >
                {site.name.full}
              </h1>
            </Reveal>

            <Reveal delayMs={160}>
              <p className="mt-6 max-w-prose font-body text-lede leading-relaxed text-muted text-pretty">
                {site.positioning}
              </p>
            </Reveal>

            <Reveal delayMs={240}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href={getSectionHref("projects")} variant="primary">
                  Explore My Work
                </Button>
                {resumeAsset.available && (
                  <Button href={resumeAsset.viewHref} variant="secondary" target="_blank" rel="noopener noreferrer">
                    View Resume
                  </Button>
                )}
                <Button href={getSectionHref("contact")} variant="tertiary">
                  Contact Me
                </Button>
              </div>
            </Reveal>

            {socials.length > 0 && (
              <Reveal delayMs={320}>
                <div className="mt-10 flex items-center gap-5 font-mono text-label text-muted">
                  {socials.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring underline decoration-border decoration-1 underline-offset-4 hover:text-foreground hover:decoration-accent"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delayMs={200} className="lg:pl-6">
            <HeroWeb portrait={site.portrait} network={heroNetwork} />
          </Reveal>
        </div>

        {proofMetrics.length > 0 && <ProofStrip metrics={proofMetrics} />}
      </Container>
    </section>
  );
}
