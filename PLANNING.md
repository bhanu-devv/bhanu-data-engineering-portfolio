# PLANNING.md — Bhanu Nagumothu Portfolio

Living plan for the project. Permanent rules are in [CLAUDE.md](CLAUDE.md). This document changes as phases complete and decisions are made.

**Status:** Phase 0 (planning) approved with amendments; decisions locked in §0 (plan v2). **Phase 1 (foundation) is complete** (see §11): local Git repo, Next.js scaffold, folder structure, content skeleton, and assets. **Phase 1.5** locked the public contact values and corrected the phone policy (§0, decisions 13 to 19) and corrected the Git author identity (D28). **Phase 2 (validated content architecture) is complete** (see §11): Zod schemas as the single source of shape for `/content` (§7.2), `npm run content:check` and `npm run resume:check` (§7.3, §8.2), the centralized resume helper, typed content selectors, and `content.example/`. **Phase 3 (visual foundation) is complete** (see §11): design tokens, typography, the surface/depth system, the original web/network geometry generator and its first components, the motion foundation, and foundational UI primitives, demonstrated on a temporary design-system specimen at `src/app/page.tsx`. No final sections exist yet. Nothing has been pushed or deployed. Pushing still requires Bhanu's explicit approval (Phase 11). Phase 4 begins only on Bhanu's explicit go-ahead.

**Contents**
0. Locked decisions (v2)
1. Executive summary
2. Reference portfolio analysis
3. Resume analysis and content hierarchy
4. Portrait usage
5. Design system
6. Animation and 3D interaction
7. Data architecture
8. Resume-update architecture
9. Information architecture and section plan
10. Code architecture and component plan
11. Development phases
12. Making the repository reusable
13. Quality plan (accessibility, performance, SEO)
14. Items requiring Bhanu's input
15. Decision log

---

## 0. Locked decisions (v2)

Approved by Bhanu after the Phase 0 review. These override anything elsewhere in this document that conflicts with them. Changing one requires Bhanu's explicit approval. The permanent-rule versions are in [CLAUDE.md](CLAUDE.md) §1 and §2.

| # | Decision | Locked outcome | Sections updated |
|---|---|---|---|
| 1 | Section order | Hero, About, Experience, Projects, Skills / Tech Stack, Certifications, Education, Leadership & Awards, Recommendations, GitHub / Links, Resume, Contact. Identity, then professional credibility, then technical proof. The proof strip is a band at the foot of the Hero, not a separate section. | §9.1, §9.2, §9.3, §10.3, §11 |
| 2 | Name | Display "Bhanudeepak Nagumothu" prominently; "Bhanu" as the short name in conversational/supporting copy | §7.2, §9.3 |
| 3 | Hero positioning | "Data Engineer building reliable cloud data platforms, pipelines, and automation that turn operational data into trusted systems." Supersedes the earlier draft line. No exaggerated seniority, no invented claims. | §7.2, §9.3, §14 |
| 4 | Public contact | Email, phone, and LinkedIn are public. **The phone number appears only in the Contact section** and may remain in the downloadable resume. *Revised in the Phase 1.5 correction (decision 19); originally locked as "no phone number on the website".* | §3.3, §7.2, §7.3, §8.5, §9.3, §14 |
| 5 | CSU / employer privacy | Describe CSU projects using only resume-approved information. Publish no internal CSU files, vendor documents, bills, account numbers, meter identifiers, operational screenshots, or confidential information. Architecture visuals are custom, sanitized diagrams. | §3.3, §9.4, §14 |
| 6 | Portrait | Current 400×400 image; grayscale by default; subtle depth; dimensional frame; restrained deep-crimson edge/glow; CSS treatment; source never edited; no replacement generated | §4, §5.1, §5.5 |
| 7 | Recommendations | Data-driven; automatically hidden with no approved records; never fabricated | §7.2, §7.3, §9.3 |
| 8 | Certifications | Never invent IDs, verification URLs, or issue dates; omit unsupplied values cleanly, with no placeholders on the live site | §7.3, §9.3, §14 |
| 9 | GitHub | Integration and featured repositories deferred until the repository and approved project links are confirmed; no invented repo URLs | §9.3, §11, §14 |
| 10 | Resume | Single stable path `/resume/bhanu-resume.pdf`; one central config module controls View and Download; replacement means replacing the PDF (or editing one config source) | §8 |
| 11 | Reusability | Public reusable template; Bhanu-specific content strictly separated from reusable presentation logic | §12 |
| 12 | Visual concept | "The Web Is the Pipeline"; sophisticated, abstract, professional, cinematic; no Marvel/Spider-Man logos, film artwork, copyrighted character illustrations, or fan-site aesthetics | §1, §5.4 |

The remaining proposals from the first version of this plan (concept, tech stack, folder architecture, motion budget, phases, decision-log items D1 to D5 and D8 to D10) are **approved as proposed** through the overall approval of the planning direction.

### Phase 1.5 amendments (confirmed by Bhanu)

| # | Decision | Locked outcome | Where it lives |
|---|---|---|---|
| 13 | Public professional email | `bittugsr@gmail.com`, the address shown and linked on the site. Set once. | `content/site.ts` (`contact.email`) |
| 14 | LinkedIn | `https://www.linkedin.com/in/bhanudeepaknagumothu` | `content/socials.ts` |
| 15 | GitHub | `https://github.com/bhanu-devv` (profile only; still no repository URLs, decision 9) | `content/socials.ts` |
| 16 | ~~Website phone policy (restated)~~ | **Superseded by decision 19.** The phone number may now be displayed publicly in the Contact section. | §7.2, §7.3; CLAUDE.md §2 rule 8 |
| 17 | Resume (architecture unchanged) | Architecture unchanged (§8). The phone-in-PDF question is now resolved by decision 19: the public PDF may keep the phone number. | §8.5, §11 Phase 11 |
| 18 | Git author privacy | **Resolved in the Phase 1.5 correction:** the repo-local Git identity is Bhanu's GitHub noreply address and the initial commit was amended so author and committer both use it. **Nothing is pushed.** Remaining action for Bhanu: enable GitHub's "Block command line pushes that expose my email" setting. | D28, §11 Phase 11 |
| 19 | Phone number policy (correction) | Bhanu approved showing the phone number publicly **in the Contact section**, and it may remain in the downloadable resume. The number is the one on the approved resume, stored once as `contact.phone` in `content/site.ts`. It is not placed in the hero, nav, footer, metadata, Open Graph, or JSON-LD. | §7.2, §7.3, §8.5, §9.3, §11, §14 |

---

## 1. Executive summary

**Concept (locked): "The Web Is the Pipeline."** A spider's web and a data platform are the same structure: nodes joined by strands that carry things. The site treats web geometry as a literal data graph. In the hero, strands are pipelines that link real technologies from the resume. In the skills section they are a constellation. In project modals they are the architecture diagram. Grayscale carries almost everything; deep crimson marks the one thing that is "live" or active at a time. The influence stays sophisticated, abstract, professional, and cinematic: **no Marvel or Spider-Man logos, no film artwork, no copyrighted character illustrations, no fan-site aesthetics.** All web geometry is original and generated by code.

**What makes it distinct from the reference portfolio:** it is a Next.js app with content fully separated from presentation, a real accessible modal system, a single-source resume, self-hosted fonts, and a motion budget. The reference is a 3,600-line single HTML file with inline styles, 38 inline `onclick` handlers, and content baked into markup.

**Approved direction (see §0 for the full locked list)**
- Final section order: identity, then professional credibility, then technical proof. See §9.
- Hero is typography-led with the approved positioning statement; the portrait appears as a small, framed "root node" in the hero web, treated in CSS. See §4.
- Public contact is email, phone, and LinkedIn. The phone number appears only in the Contact section and may remain in the downloadable resume (decision 19). See §8 and §14.
- Project visuals are custom, sanitized architecture diagrams built from resume facts, never internal CSU material. See §9.4.
- Project detail modals are state-driven (hash-synced), with per-project pages as a later option. See §15.

---

## 2. Reference portfolio analysis

**What it is:** a single-file (`index.html`, 3,623 lines, ~105 KB) portfolio for a supply-chain analyst, themed "Command Center" in dark green with lime/mint/cyan/violet accents. It ships with 30 images, several PDFs (resumes, certificates), and a stub `not_found.html`/`robots.txt`. It belongs to another person; it is inspiration only.

### 2.1 Worth preserving conceptually

| Idea | Why it works | How we reinterpret it |
|---|---|---|
| Section flow: hero, proof strip, about, experience, systems, projects, certifications, education, contact | Recruiter-friendly rhythm; proof arrives before the reader scrolls far | Same rhythm, our own order (§9) |
| Floating pill navigation with active-section highlight and a distinct Resume button | Always reachable, low visual weight | Angular-cornered bar plus a side section rail; crimson underline for active |
| Impact metrics strip right under the hero | Instant credibility | "Proof strip" of resume-sourced numbers with count-up once |
| Hero card that tilts toward the cursor | Adds depth without WebGL | Tilt the dimensional name and project cards; fine-pointer only; rAF-driven |
| Cursor-following light | Cheap cinematic lighting | One transform-only specular light layer |
| Scroll-progress bar | Orientation | Replaced by the section rail's progress thread |
| Reveal-on-scroll via IntersectionObserver | Efficient, no scroll listeners | Same technique, with no-JS-safe defaults |
| Modals for resume, certificates, images | Keeps a one-page flow | Accessible dialog primitive; deep-linkable |
| Timeline for experience | Scannable history | A "thread" with nodes; current role marked live |
| Copy-email button, no backend contact | Zero infrastructure | `mailto:` plus copy button, optional form endpoint |
| `pointer: fine` gating and a reduced-motion rule | Right instinct | Made stricter and complete (CLAUDE.md §5) |
| Responsive breakpoints at 1100/900/650 | Real mobile consideration | Tailwind breakpoints; QA at 360/768/1280/1920 |

### 2.2 What must NOT be copied

- All text, the name and initials brand mark ("SD"), the memoji/profile image, dashboard screenshots, certificates, resumes, and email address.
- The palette (lime, mint, cyan, amber, violet on dark green) and the "command center / supply chain" metaphor and vocabulary.
- The exact hero composition: a glass profile card with four floating flow nodes and three rotating concentric rings.
- The code itself. Everything is rebuilt from scratch in the new architecture.
- Its personal PDFs. They stay out of this repo entirely. (The extraction I made for analysis lives only in the session scratchpad and is deleted at the end of this step.)

### 2.3 What can be substantially improved (verified against the source)

| Finding in the reference | Evidence | Our approach |
|---|---|---|
| Resume filename hard-coded twice (iframe `src` and download `href`) and email hard-coded in JS | grep of `index.html` | Single `content/resume.ts` plus one helper (§8) |
| Content lives in markup; one 105 KB file | structure | Typed `/content` modules, components render from data (§7) |
| Modals are not accessible: 0 `role="dialog"`, 0 `aria-modal`, 0 focus management, no focus trap or return | grep counts | Radix Dialog via shadcn |
| Menu toggle is a "☰" text swap; 0 `aria-expanded`; only 3 `aria-label`s in the whole page | grep counts | Sheet menu with `aria-expanded`/`aria-controls` |
| 38 inline `onclick` handlers | grep count | React event handlers, typed |
| 19 `infinite` animations; three 520 px elements with `blur(170px)` fixed to the viewport, plus scanline, rings, marquee, animated text gradient | CSS | Motion budget: ≤ 1 ambient loop, no animated blur (CLAUDE.md §5) |
| 8 `backdrop-filter` uses including 22–28 px blur on many panels | CSS | Opaque graphite panels; blur only on the nav |
| Global `mousemove` handlers write styles without `requestAnimationFrame` | JS | rAF plus CSS variables, no re-renders |
| `html { scroll-behavior: smooth }` is unconditional; the reduced-motion rule kills animations/transitions but not smooth scroll | CSS | Smooth scroll only under `no-preference` |
| Text as small as 0.53–0.59 rem (8.5–9.5 px) used for labels | CSS | 12 px floor |
| 30 `<img>` with 0 `loading="lazy"`; PNG dashboards; fonts loaded from Google's CDN | grep | `next/image` (AVIF/WebP, lazy), `next/font` self-hosted |
| No Open Graph or Twitter metadata; no `<noscript>`; no structured data | grep | Full metadata, JSON-LD, sitemap/robots |
| PDFs embedded in iframes at load for each certificate | markup | Load viewer only on open; certificates use verify links and badges |
| Content hidden by `.reveal` until JS adds `.show` | CSS/JS | Server-visible defaults; enhancement only |

---

## 3. Resume analysis and content hierarchy

Source: `reference/Bhanu_Resume.pdf` (2 pages, text extracted directly; contents below are as written on the resume).

### 3.1 Inventory

**Identity:** Bhanudeepak Nagumothu, Cleveland, OH. LinkedIn `linkedin.com/in/bhanudeepaknagumothu`; GitHub `github.com/bhanu-devv`. Email and phone are on the resume; both are approved for public display, the phone only in the Contact section (decision 19).

**Summary:** Data Engineer, 4+ years combined across data engineering, database development, automation, analytics. Currently building an Azure utility data platform (Python, SQL/T-SQL, Azure Databricks, PySpark, ADLS Gen2, Delta Lake, Azure SQL) integrating billing and operational data across 20+ campus buildings. ETL/ELT, relational and dimensional modeling, incremental processing, data quality, reconciliation, REST APIs, Power BI.

**Experience (3)**
1. Data Analyst, Utilities Department, Cleveland State University, Aug 2025 to present. Multi-utility billing, meter, usage, cost data across 20+ buildings and 170+ monthly bill-related items; Azure SQL / SQL Server platform; Python+SQL ETL; data-quality controls; secure Azure SQL connectivity; Power BI support.
2. Cyber Data Review Analyst (Contract), Vipany Global Ltd, Hyderabad, India, Oct 2023 to Dec 2024. 1,000+ records reviewed daily; reliability across 80K+ records; validation for missing/inconsistent/duplicate data.
3. Business Data Analyst, Laxmi Precast Allied Products, Hyderabad, India, Jul 2020 to Dec 2022. Financial, sales, order, payment, operational analysis; reconciliation; recurring analyses.

**Projects (3)**
1. CSU Utilities Azure Data Engineering & Lakehouse Platform (in progress): ADLS Gen2, Medallion (Bronze/Silver/Gold), Databricks/PySpark/Spark SQL/Delta Lake, MERGE/upsert, SCD 1/2, reusable data-quality controls with rejected records routed for review, Gold dimensional models for Power BI, idempotent processing, audit logging, schema evolution, lineage, role-based access. Tech: Azure Databricks, PySpark, Spark SQL, ADLS Gen2, Delta Lake, Azure SQL, T-SQL, Unity Catalog, Power BI.
2. CSU ENERGY STAR Automation: Python ETL for ENERGY STAR Portfolio Manager; 6,854+ records validated before REST API transmission; ~3 workdays reduced to 5 minutes. Tech: Python, pandas, REST APIs, ETL, Data Validation.
3. Steam Bill Automation System: pdfplumber+openpyxl parsing of semi-structured utility PDFs into standardized Excel; ~1 hour reduced to under 2 minutes (97%); preserved existing formulas and business rules; automated validation/reconciliation. Tech: Python, pdfplumber, openpyxl, ETL.

**Skills (5 groups, names kept verbatim):** Programming & Data Processing; Data Engineering; Cloud & Lakehouse; Data Modeling & Quality; Analytics & Engineering Tools.

**Education:** M.S. Information Systems, Cleveland State University, GPA 3.77, expected Dec 2026. B.Tech Electronics & Communication Engineering, Vaagdevi College of Engineering, India, CGPA 3.6, Aug 2019 to Aug 2023.

**Certifications & Training (5):** Microsoft Applied Skills: Migrate SQL Server Workloads to Azure SQL Database; Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate; Oracle Cloud Infrastructure 2025 Certified Foundations Associate; AWS Academy Cloud Foundations; AWS Academy Machine Learning Foundations.

**Honors & Awards:** Monte Ahuja College of Business Merit Scholarship ($6,000); Graduate and Professional Student Association Scholarship ($2,000).

**Leadership:** Vice President, Graduate and Professional Student Association (GPSA), Cleveland State University, Aug 2025 to present.

### 3.2 Portfolio content hierarchy

| Tier | Content | Where it appears |
|---|---|---|
| 1. First 5 seconds | Name; the approved positioning statement ("Data Engineer building reliable cloud data platforms…"); Cleveland, OH; primary CTAs | Hero |
| 2. Proof | 20+ buildings; 170+ monthly bill-related items; 6,854+ records validated; ~3 days to 5 min; ~1 hr to < 2 min (97%) | Proof strip, then repeated in context |
| 3. Depth | Flagship lakehouse project; current role; two automation projects | Experience, Projects |
| 4. Breadth | Skills groups; certifications; education | Skills, Certifications, Education |
| 5. Character | GPSA vice presidency; scholarships | Leadership & Awards |
| 6. Contact | Email, LinkedIn, GitHub, resume | Contact, Resume, footer, nav |

### 3.3 Things I noticed that affect content decisions

1. **Title vs. positioning.** The current title is "Data Analyst"; the summary positions Bhanu as a "Data Engineer." The hero headline can say Data Engineer; the experience entry must keep the real title.
2. **The flagship project is in progress.** Its bullets are present progressive. It gets an "In progress" badge and no outcome metrics.
3. **Resume-only metrics.** "4+ years combined" is stated, not computed; I will not compute it dynamically (it would drift). Metrics keep the resume's qualifiers ("approximately," "+").
4. **Education is "expected Dec 2026."** Today is 2026-09-21, so still expected. The content stores `expected: true`; it does not auto-flip. Bhanu updates it after graduating.
5. **No per-project links, screenshots, or diagrams** exist in the resume. Decision 5 settles the diagrams: they are custom, sanitized, portfolio-specific diagrams built from resume facts (§9.4). No screenshots are planned. Project links are omitted until Bhanu supplies approved ones.
6. **Certifications have no dates, IDs, or verification URLs.** Per decision 8 these are **omitted cleanly**, never faked; each certification shows only its name and issuer until real values are supplied. The AWS Academy items are training/course credentials while the Oracle items are named certifications; the resume groups them under "Certifications & Training," and so will the site, unless Bhanu prefers to split them.
7. **Personal phone and email are on the resume.** Decision 19: both are approved for public display. The phone number appears only in the Contact section and may remain in the downloadable resume.
8. **Sensitivity.** Projects describe university operational data. Decision 5: only resume-approved information is used; no internal files, vendor documents, bills, account numbers, meter identifiers, or operational screenshots; architecture visuals are sanitized custom diagrams.

---

## 4. Portrait usage

**Inspected (not modified):** `reference/bhanu-portrait.png`: 400 × 400 px, RGB, no alpha, 208 KB. A painterly digital illustration of Bhanu, shoulders-up, smiling, dark curly hair, short beard, deep maroon collared shirt, on a warm cream/amber background. Face is centered with ample margin.

**Locked decision (6):** the current 400 × 400 portrait is used for the initial implementation, treated in CSS, with the source file never edited. **No replacement portrait is generated.**

**Constraints**
- **Resolution is the limit.** At 400 px it stays sharp on a 2× display only up to ~200 CSS px, and is acceptable to ~240 CSS px. **Display cap: 240 CSS px wide.** It must not be used as a large hero background or full-bleed image, and must never be upscaled.
- **Warm background vs. grayscale theme.** The cream/amber field would break the 92% grayscale rule. It is neutralized at render time, not by editing the file.
- **`next/image` note.** The framework may emit resized/AVIF/WebP delivery variants from the untouched source. That is delivery optimization, not editing; the file in `public/` stays byte-identical to the approved portrait.

**Approved treatment: grayscale by default, dimensional frame, restrained crimson edge**

| Layer (back to front) | Technique | Notes |
|---|---|---|
| Back plate | Offset chamfered panel in `steel-900`, soft long shadow | Reads as depth behind the frame |
| Frame plate | Chamfered (45°) graphite panel, 1 px `steel-700` border, faint web-corner ornament (from the generator) | The "dimensional frame" |
| Portrait | `filter: grayscale(1) contrast(1.05–1.1) brightness(.85–.95)` on the image | Default state is grayscale, always |
| Tone-down overlay | Gradient from `void` (bottom and edges) to transparent, plus a soft top-left highlight | Sinks the bright cream-turned-gray background into the graphite UI; also acts as a vignette |
| Crimson edge | One thin `crimson-500` hairline along the frame's chamfered edge plus a low-alpha **static** crimson glow behind the frame | Restrained. Static, never animated. Counts toward the 8% crimson budget (§5.1) |
| Depth response | Optional ≤ ±4° tilt of the frame with the image counter-shifting a few px | Fine pointers only; off under reduced motion |

- **Fallback if the CSS result looks flat or too bright at Phase 4 review:** an SVG `feColorMatrix` duotone (shadows to graphite, highlights to silver), still render-time and non-destructive.
- **Not planned:** color reveal on hover, a selective-crimson-shirt derivative asset, or any masked or re-saved copy of the portrait. If CSS cannot achieve the look, the question goes to Bhanu before anything else is tried.
- **Alt text:** describes an illustrated portrait of Bhanudeepak Nagumothu (it is an illustration, and the alt should say so).

**Placement**
1. **Hero root node:** the framed portrait (≤ 240 CSS px) sits at the center of the hero web as the "person at the center of the connected system", with strands linking outward to technology nodes. The hero is otherwise typographic. Exact composition (circular hub vs. chamfered frame on the web) is confirmed in the Phase 4 visual review.
2. **Nav/footer avatar:** 36–44 px, same grayscale treatment.
3. **Open Graph image:** name plus a small grayscale portrait plate, composed at build time (Phase 9).
4. **JSON-LD `image`.**
5. **About:** no second large portrait; avoid showing the same face twice within two screens.

**Optional, not blocking:** if a ≥ 1200 × 1200 original ever becomes available, larger placements become possible. That is a future decision for Bhanu and requires no change to the initial build.

---

## 5. Design system

**IMPLEMENTED in Phase 3.** Two-layer token architecture: primitives (`--palette-*`, plain `:root` custom properties, never exposed as Tailwind utilities) and semantic tokens (`--color-*`/`--font-*`/`--text-*`/`--spacing-*`/`--radius-*`, defined via Tailwind v4's `@theme inline` in `src/styles/tokens.css`, which is what both Tailwind utility classes and bespoke CSS in `src/styles/depth.css`/`web.css` consume). Components use only the semantic layer (`bg-surface`, `text-muted`, `font-display`, ...) — this is what the Phase 3 brief's "semantic tokens rather than scattering raw color values everywhere" produced concretely.

### 5.1 Color tokens

Values proposed for approval in Phase 0, unchanged since (contrast ratios below were computed then via WCAG relative luminance, not estimated, and still hold — the hex values in code are copied verbatim from this table, not re-derived).

| Token | Hex | Role |
|---|---|---|
| `--void` | `#050506` | page background |
| `--carbon` | `#0C0D10` | raised background, header |
| `--graphite` | `#15171B` | cards, panels |
| `--steel-900` | `#1F2329` | hairline surfaces, hover fill |
| `--steel-700` | `#343A43` | borders, dividers |
| `--steel-500` | `#5B636F` | inactive web strands, decorative only |
| `--silver` | `#A9B0BA` | secondary text, web strands |
| `--mist` | `#D3D7DD` | tertiary highlights, metallic gradient mid |
| `--offwhite` | `#F3F4F6` | primary text, headlines |
| `--crimson-700` | `#8E1A2E` | pressed/shadow side of crimson fills |
| `--crimson-600` | `#A8203A` | primary CTA fill (with off-white text) |
| `--crimson-500` | `#C42340` | active stroke, node ring, glow |
| `--crimson-400` | `#E0405D` | active highlight on void only |

**Measured contrast**

| Pair | Ratio | Use |
|---|---|---|
| off-white on void | 18.5:1 | body and headings |
| off-white on graphite | 16.3:1 | text in cards |
| silver on void / graphite | 9.3:1 / 8.2:1 | secondary text |
| off-white on crimson-600 | 6.5:1 | CTA labels |
| off-white on crimson-700 | 8.2:1 | pressed CTA |
| crimson-500 on void / graphite | 3.55:1 / 3.13:1 | strokes, rings, large UI only, **never small text** |
| crimson-400 on void / graphite | 4.9:1 / 4.3:1 | possible large-text accent on void only |
| steel-500 on void / graphite | 3.36:1 / 2.96:1 | **decorative only, never text** |

**Crimson budget (~8%):** primary CTA, the one live node/strand, active nav marker, focus-ring accent, selected-state indicators, the "in progress" badge, and the **restrained portrait edge/glow** (decision 6). At most **three** distinct crimson elements in one viewport and none a large fill; in the hero that is typically the primary CTA, the portrait edge, and the single live node. Glows are static; only the live node may pulse. Verified in the Phase 3 specimen: the busiest single viewport (Surfaces & controls) shows exactly three — the live-surface edge, its live node, and the primary button.

**Semantic token names in code** (`src/styles/tokens.css`): `--color-background` (void), `--color-surface` (graphite), `--color-surface-elevated` (graphite-hi, `#191C21`), `--color-foreground` (off-white), `--color-muted` (silver), `--color-muted-foreground` (mist), `--color-border` (steel-700), `--color-border-subtle` (steel-900), `--color-accent`/`--color-accent-hover`/`--color-accent-pressed` (crimson-600/500/700), `--color-accent-foreground` (off-white), `--color-glow` (crimson-500), `--color-grid` (steel-500, decorative web strands). One deliberate small consolidation from the Phase 0 sketch: `TechTag`'s hover fill uses `--color-surface-elevated` rather than a separate steel-900-only token — the two are tonally close and a second near-duplicate semantic token wasn't worth adding for one component.

**Surfaces, metals, lighting**
- Metallic type gradient: off-white → mist → silver → steel-500 (top to bottom), with a narrow off-white specular band.
- Panels: graphite gradient (top-left `#191C21` → bottom-right `#111317`) with a 1 px `steel-700` border and a 1 px inner top highlight at low alpha. No glass blur.
- Shadows: layered, long, low-alpha black; light direction fixed top-left everywhere for consistency.
- Grain: one static noise texture (tiny, cached) at ≤ 5% for cinematic depth.

### 5.2 Typography — IMPLEMENTED in Phase 3 (confirmed via the specimen page)

The Phase 3 brief capped the system at "at most two primary font families." Reading:
mono for technical metadata/tags is a narrowly-scoped utility family, not a third
*primary* (prose/display) family, so it doesn't count against the cap — without it,
Step 2's own requirement to visually distinguish "technical metadata, code/technology
tags" from prose has no way to be met. Final choice, one swap from the Phase 0 sketch:

| Role | Family | Notes |
|---|---|---|
| Display (hero name, section titles) | **Space Grotesk** (swapped from the Phase 0 sketch's Bricolage Grotesque) | Geometric grotesque with real character at large sizes; reads as technical/premium without being a "sci-fi" display face; weights 500/600/700 loaded |
| Body/UI | Inter | Neutral, excellent legibility; weights 400/500/600/700 loaded |
| Mono (technical metadata, tech tags only) | JetBrains Mono | Technical voice; weights 400/500 loaded |

Self-hosted via `next/font/google` (`src/app/fonts.ts`), no runtime request to Google Fonts, no external `<link>`. Fluid type via `clamp()`, as tokens in `src/styles/tokens.css` rather than per-component values: `--text-hero: clamp(2.75rem, 6vw + 1rem, 6.5rem)`, `--text-display`, `--text-heading`, `--text-lede`, `--text-label` (the 12px floor). Numerals-are-tabular was not set explicitly in Phase 3 (no metric/number-heavy component exists yet to need it) — revisit when the Proof Strip (Phase 4) is built.

### 5.3 Layout and spacing — IMPLEMENTED in Phase 3

- Max content width 1200 px (`--container-content`), narrow reading width 42rem/~672px (`--container-narrow`), responsive gutter 16/24/32px by breakpoint (`--spacing-gutter`) — all tokens in `src/styles/tokens.css`, consumed by `Container`/`SectionShell` (`src/components/ui/`) so no section hand-picks its own width. Section vertical rhythm is a single fluid token, `--spacing-section: clamp(4rem, 3vw + 3rem, 10rem)` (64px-160px), applied by `SectionShell`. The 12-column grid itself is not yet needed (no component has required an explicit column grid) — deferred until a section actually needs one.
- Breakpoints: Tailwind v4's defaults (640/768/1024/1280/1536) already match the Phase 0 sketch's 640/768/1024/1280/1536 exactly, so none were redefined. 360px (the CLAUDE.md §10 minimum) and 1920px were verified as real viewport sizes in Playwright QA, not as breakpoint tokens.
- Angular language: `.surface--chamfered` (`src/styles/depth.css`) via `clip-path`, chamfer size `--layout-chamfer: 16px`. Radii otherwise small (`--radius-sm: 4px`, `--radius-md: 8px`). No pills.
- Section headers: `SectionHeading` (`src/components/ui/`) — mono eyebrow label, display title, optional lede, a thin `aria-hidden` strand line, exactly as specified.

### 5.4 The web geometry system — IMPLEMENTED in Phase 3 (foundation only)

`generateWeb({ seed, radials, rings, size, sag, jitter })` (`src/components/web/generate-web.ts`) returns node coordinates and SVG path strings, matching the sketch:
- Radial spokes from a hub; concentric rings drawn as slightly sagging arcs (quadratic Bézier segments bowed toward the hub) rather than perfect polygons — reads as a web, not a target.
- Deterministic: a small hand-written `mulberry32` PRNG (no dependency) seeded per call, so server and client render identically. Not yet snapshot-tested (Vitest isn't installed — PLANNING §10.4 lists it as still-future tooling); worth adding when the test suite exists.
- **Built this phase:** the generator itself, plus `NetworkMesh` (a decorative full-mesh renderer with a one-time `stroke-dashoffset` unfurl) and `Node` (a single node marker, default/live variants, the live variant's pulsing ring). **Not built this phase (deferred to the section that needs it):** the hero-specific composition with three parallax layers (Phase 4), the corner-wedge card ornament, the timeline/rail "thread" variant, and the architecture-graph variant for project diagrams (Phase 6) — Step 5's brief explicitly scoped Phase 3 to reusable primitives, not full compositions.
- Every strand can carry a data label; nodes come from real content, never invented labels — not yet exercised (the specimen's `NetworkMesh` instances are unlabeled decoration), applies once a real composition uses it.
- **Originality (decision 12):** the geometry is generated by our own code. No imported spider/web vector art, no traced character silhouettes, no film or comic artwork, no logos or emblems. Mask-eye angular shapes, when used, are abstract chamfered polygons, not a recognizable emblem. The Phase 3 brand mark (`src/app/icon.svg`) follows the same rule: three lines and four dots, no legs, no body silhouette.

### 5.5 Component styling principles — IMPLEMENTED in Phase 3 (`Button`, `Surface`, `TechTag`)

- Buttons (`src/components/ui/Button.tsx`, also doubles as "LinkButton" — renders `<a>` when `href` is given, `<button>` otherwise, instead of two near-identical components): chamfered rectangle; primary = crimson-600 fill, off-white label, a static inset top specular highlight; secondary = steel border, silver label, off-white on hover; tertiary = text with an underline strand.
- Focus ring (`.focus-ring`, `src/styles/depth.css`): 2px off-white outer, 2px void gap, crimson-500 inner accent — exactly as specified, verified visually and via keyboard tab order in Playwright QA.
- Tags (`TechTag`): mono, 12px, steel border, no fill; hover raises to `--color-surface-elevated` (see §5.1's note on this small consolidation).
- Cards (`Surface`): graphite gradient panel, optional `elevated`/`chamfered`/`accentEdge` props, optional bounded pointer-tilt (`useTilt`, CLAUDE.md §5 budget rules 3-4). The web-corner ornament isn't wired into `Surface` yet — no card usage so far has needed it; add it as an optional prop when one does, rather than on every card by default.
- Portrait frame: **not built in Phase 3.** The portrait's dimensional-frame treatment is specific to the Hero composition (Phase 4), where `Surface`'s `chamfered`/`accentEdge` props and `depth.css`'s layering give it what it needs; building the frame itself before the Hero exists would be building UI ahead of the section that uses it, which Phase 3's brief explicitly scoped out.

---

## 6. Animation and 3D interaction

### 6.1 Principles
1. **Depth over movement.** Sense of dimension from layering, light, and shadow; motion is short and purposeful.
2. **Budgeted.** Compositor-only properties; ≤ 1 continuous ambient loop; pause off-screen; no animated blur or backdrop-filter (CLAUDE.md §5).
3. **Gated.** Pointer effects only for fine pointers; reduced-motion gives a complete static experience.
4. **Cheap by default.** CSS first; Framer Motion (`LazyMotion`, `domAnimation`) where orchestration or layout transitions are needed — **Phase 3 needed none** (CLAUDE.md §5 rule 7, D36); revisit per effect below.

### 6.2 Effect catalog

Built as reusable foundation in Phase 3: **Reveal** (`Reveal.tsx`, generic — not hero/proof-strip-specific yet), **Web "unfurl" on load** (`NetworkMesh.tsx`), **Live node** (`Node.tsx`), and a generic **tilt** (`useTilt`, wired into `Surface` — not project-card-specific composition yet, that's Phase 6). Everything else in this table stays a Phase 4+ plan, built when the section that needs it is built.

| Effect | Technique | Cost / limits | Status |
|---|---|---|---|
| **Dimensional hero name** | Real `<h1>` text on top of 6–10 stacked decorative duplicates offset along Z (or a layered `text-shadow` extrusion) with a metallic gradient face; specular band follows the pointer via CSS variables | Static extrusion is free; pointer tilt ≤ ±5° via rAF; duplicates are `aria-hidden` | Phase 4 |
| **Hero web layers** | Three SVG layers (far/mid/near) with different parallax factors 0.2 / 0.5 / 0.8, moved by transform on pointer and lightly on scroll | Transform only; disabled for reduced-motion and touch | Phase 4 |
| **Web "unfurl" on load** | One-time stroke-dashoffset draw, ~1.2 s, then static | Runs once | **Built** (generic `NetworkMesh`) |
| **Live node** | The single crimson node pulses gently (scale/opacity) as the only ambient loop | Pauses off-screen and on hidden tab | **Built** (`Node` variant="live"; pauses off-screen via its own `useInView` — no composing section has to wire this up itself) |
| **Cursor light** | One radial-gradient element translated to the pointer (transform only) | Fine pointers only; lerped in rAF | Phase 4 |
| **Project cards** | `perspective(1000px)`, rotateX/Y ≤ ±8°, children at `translateZ` (title 30 px, tags 20 px, ornament 10 px), specular highlight follows the pointer, shadow shifts opposite the tilt | rAF plus CSS vars; keyboard `:focus-visible` triggers the same lighting; touch gets static depth | Generic tilt **built** (`useTilt`, `.tilt`); the per-layer translateZ composition and keyboard-triggered lighting are Phase 6 |
| **Modal transitions** | Card-to-modal shared-element (`layoutId`) or a simple scale/opacity rise; backdrop fade | Radix handles focus; transitions omitted in reduced-motion | Phase 6 |
| **Reveal on scroll** | Small translate+fade, once per element, IntersectionObserver | Server-visible defaults; instant under reduced-motion | **Built** (`Reveal.tsx`) |
| **Proof-strip count-up** | Number tween once when visible | Static under reduced-motion; final value is in the DOM from the start (screen readers read the real number) | Phase 4 |
| **Section rail** | Vertical thread with a node per section, active node crimson, progress via transform | Passive IntersectionObserver | Phase 3/4 boundary (§10.1) |
| **Skills hierarchy** | A skill also named in Experience/Projects renders as a filled `TechTag` | Static — grayscale fill vs. transparent, no hover/focus lighting; text list is the source of truth | **Built** (Phase 7) — simpler than this row's original sketch (no per-node hover-lit strands): up to 9 skills per group made a literal node-and-strand graph cramped and unreadable, so hierarchy is a static fill instead of an interaction |

### 6.3 Reduced-motion and low-power behavior
- `prefers-reduced-motion: reduce`: no parallax, tilt, count-up, unfurl, ambient loop, or smooth scroll; reveals become instant; web renders fully drawn and static.
- `prefers-reduced-data`/save-data: skip grain texture and optional portrait derivatives.
- Coarse pointers: no tilt/cursor light; tap states only.
- All pointer effects unmount their listeners when off-screen.

### 6.4 Explicitly out of scope
Three.js/WebGL scenes, GLB models, scroll-jacking, custom cursors, page-transition curtains, autoplay media, particle systems.

---

## 7. Data architecture

### 7.1 Principle
Presentation components render from typed content. A future user edits `/content` and `/public`; nothing else.

```
content/
  site.ts             profile, headline, seo defaults, public contact fields, location
  navigation.ts       ordered section list (id, label, in-nav, in-rail)
  resume.ts           single source of resume configuration (see §8)
  metrics.ts          proof-strip numbers, each with a source note
  experience.ts
  projects.ts
  skills.ts
  education.ts
  certifications.ts
  awards.ts
  leadership.ts
  recommendations.ts  empty until real text arrives
  socials.ts          GitHub, LinkedIn, others; each with visibility flag
  index.ts            re-exports typed collections
content.example/      built in Phase 2: fictional "Jordan A. Rivera" identity, same schema, same barrel shape (§12)
```

### 7.2 Core types — IMPLEMENTED in Phase 2, schema-first

The types below were originally sketched as hand-written TypeScript interfaces (Phase 0). In Phase 2 that plan changed: **`src/schemas/content.ts` defines every shape once, as a Zod schema, and `src/types/content.ts` infers its TypeScript types from those schemas** (`export type Site = z.infer<typeof siteSchema>`, etc.) — see that file's own header comment for why. This was the direct answer to "avoid unnecessary duplication between TypeScript types and Zod schemas": there is exactly one definition of each shape, not two that could drift apart. `NeedsInput`/`Maybe<T>` and `YearMonth` (the "YYYY-MM" template literal) are also derived from the schema file, via `z.infer` and a typed `.transform()` respectively, so even those keep a single source of truth instead of a hand-copied regex-shaped string type.

Implementation differs from the original conceptual sketch above in a few small, deliberate ways:
- `Metric` has no separate `qualifier` field — the qualifier is written directly into `value` (e.g. `"~3 days → 5 min"`), which is what the actual metrics needed.
- `Experience.end` is `YearMonth | "present"`, not `Date` (dates are never day-precise here). `Experience` has no `metrics`/`skills` fields — unused by any real content, dropped rather than shipped speculatively.
- `Project` has no `period` field (redundant with its bullets/dates) and uses `metricIds?: string[]` (references into `content/metrics.ts`) instead of embedding full `Metric` objects, so a number is still defined in exactly one place even when a project cites it.
- `Education` has no separate `field` — the field of study is already part of `degree` (e.g. "Master of Science in Information Systems").

Full types: `src/types/content.ts`. Full validation rules: `src/schemas/content.ts`.

### 7.3 "Needs input" mechanism — IMPLEMENTED in Phase 2 (`npm run content:check`)

- `needsInput("credential IDs and issue dates")` marks unknown values without inventing anything.
- **Omit cleanly (decisions 7, 8, 9).** Selectors drop unresolved or absent fields. The live site never renders placeholders such as "TBD", "N/A", dummy links, or fake IDs. A certification with no ID, date, or verify URL shows only its name and issuer. A section with no renderable items is omitted (`src/lib/content-selectors.ts`'s `isSectionRenderable`/`getRenderableNavigation`).
- **Two classes of gap**, both enforced by the same run of `npm run content:check` (there is no separate `--strict` flag — every `content:check` run is the strict one; the distinction is severity, not a mode):
  - *Required* (an ERROR, exit code 1): the public email must be resolved (it is). The resume file's existence is `resume:check`'s job, not `content:check`'s.
  - *Optional-omitted* (an INFO note, exit code 0): the canonical site URL staying `needsInput()` until a domain exists; certification IDs/dates/verify URLs/badges; project links; GitHub repository entries; recommendations; extra About details. These print but never fail the check.
- `npm run content:check` (Zod `safeParse` over every collection, plus custom rules) also reports as ERRORs: an unapproved recommendation (`approved !== true`); a locked-section-order mismatch (real content only — `content.example/` gets an INFO note instead, since forks may reorder); accidental placeholder content ("lorem ipsum", "TODO", "TBD", ...; a WARN instead of an ERROR when validating `content.example/`); a `reference/` path or the reference-only resume filename; a private local filesystem path; an obvious secret (API key/token/private-key pattern); a keyword associated with internal operational records (account/meter/invoice, best-effort); and **any phone-number-like literal found anywhere except `content/site.ts`'s `site.contact.phone`** (decision 19) — both an exact duplicate of the approved number and any other phone-shaped value are flagged, each with its own message. An unexplained long digit run (8+ digits, not the approved phone) is a WARN. Run `npm run content:check -- --example` to validate `content.example/` with the identical rules.
- `npm run resume:check` (§8.2) covers the resume PDF and path specifically: existence, real `%PDF-` header, the locked public path, no competing hardcoded resume path, and no `reference/` path in `src/`, `content/`, or `content.example/`. It never modifies the PDF. For information only, it also reports whether the PDF appears to carry a text layer and whether that text layer contains the approved phone number (decision 19 — never flagged as an issue).
- CI wiring (running these in GitHub Actions on every push) is Phase 10, not yet built.

### 7.4 Assets
`public/images/{profile,projects/<slug>,certifications,og}`, `public/resume/bhanu-resume.pdf`. Every asset is documented in `docs/ASSETS.md` (source, permission, whether it may be reused by forks).

---

## 8. Resume-update architecture

**Goal:** Bhanu replaces one PDF file and everything (view, download, metadata, cache) keeps working without editing components.

### 8.1 Single source of truth — IMPLEMENTED
`content/resume.ts` is the only file that mentions the resume path (`resume:check` enforces this — §7.3). The stable public path is `/resume/bhanu-resume.pdf`, so the PDF in `public/resume/` is always named `bhanu-resume.pdf` and versions are not encoded in filenames.

```ts
export const resume: ResumeConfig = {
  file: "/resume/bhanu-resume.pdf",
  title: "Bhanudeepak Nagumothu Resume",
  downloadName: "Bhanudeepak-Nagumothu-Resume.pdf",
  inlineViewer: true,
  summary: "…", // Phase 8: a short standalone blurb for the Resume section, distinct wording from `site.positioning`
};
```

### 8.2 One helper, one component
- **`src/lib/resume.ts` (IMPLEMENTED, Phase 2):** server-side, reads the file's stats and a short SHA-256 content hash and returns `{ viewHref, downloadHref, downloadName, title, label, inlineViewer, updatedAt, sizeLabel, available }`. The hash is appended as `?v=<hash>` so browsers and CDNs never serve a stale copy after a replacement, with no manual version bump. If the file is missing, `available: false` (no dead links) — callers must check this before rendering View/Download controls.
- **`<ResumeActions>` — not built as a separate component (Phase 8 decision, D68):** `Resume.tsx` renders its own View/Download `Button`s directly from `getResumeAsset()` instead. Only one section currently needs these actions (the Hero's "View Resume" CTA already existed independently since Phase 4 and also calls `getResumeAsset()` directly); a shared component is deferred until a second real call site would otherwise duplicate the JSX.

### 8.3 Viewing and downloading — View is a plain link, not a dialog (Phase 8 decision, D68)
- **View:** `<a href={viewHref} target="_blank" rel="noopener noreferrer">` — opens the PDF in a new tab using the browser's own PDF viewer, on every screen size. No in-app dialog, no `<object>` embed, no custom PDF viewer was built; §8.3's original dialog-based sketch was superseded once Step 6 of the Phase 8 brief ruled out a custom viewer.
- **Download:** same-origin `<a href={downloadHref} download={downloadName}>`, where `downloadName` is `content/resume.ts`'s `downloadName` (`Bhanudeepak-Nagumothu-Resume.pdf`) — the saved filename is friendly and stable regardless of the source filename on disk.
- **Headers:** `next.config` sets `Cache-Control: public, max-age=0, must-revalidate` for `/resume/*` on hosts that honor it; the hash query covers hosts that don't.

### 8.4 Update workflow (documented in README)
1. Export the new PDF.
2. Overwrite `public/resume/bhanu-resume.pdf` (same name).
3. Run `npm run resume:check` — IMPLEMENTED (Phase 2): confirms the file exists, starts with `%PDF-`, matches the locked public path, and that nothing hardcodes a second resume path; reports (informationally) whether it has a text layer and whether that text layer contains the approved phone number. **Not implemented: a maximum-size check.** Not required by any locked decision; add one later if a real oversized PDF becomes a problem.
4. Commit as `chore(resume): update resume` and deploy.

`docs/CUSTOMIZING.md` (Phase 10) will repeat this workflow for template users.

No component edits. No config edits, unless Bhanu wants a human-readable `label` (or, in the unlikely event the path itself must change, the single `file` field in `content/resume.ts`). Older versions stay in git history; nothing versioned sits in `public/`.

### 8.5 Privacy note (decisions 10 and 19) — Git gate lifted in Phase 8 (D67)
- The **website** shows the phone number only in the Contact section, as a `tel:` link (decision 19). It does not appear in the hero, navigation, footer, page metadata, Open Graph data, or structured data.
- The **public resume PDF may keep** the phone number (decision 19). The architecture is indifferent to which edition is used: whichever PDF Bhanu chooses is simply placed at `public/resume/bhanu-resume.pdf`, and nothing else changes.
- **Git gate — resolved and lifted (D67):** before removing the `public/resume/*.pdf` line from `.gitignore`, the full PDF text was read directly (not sampled) and checked against every already-validated content module (experience, education, projects, certifications, awards, leadership, skills) — confirmed byte-for-byte factual alignment and the complete absence of a street address, student ID, government identifier, private account/meter number, credential, password, or any third-party private contact detail. The gate block was then deleted from `.gitignore` and `public/resume/bhanu-resume.pdf` was committed deliberately in Phase 8. `reference/` remains gitignored throughout. Committing is separate from pushing, and **no push happens before the Git author identity is corrected (D28)**. Whatever is in `public/resume/` becomes public once the repository is pushed or the site is deployed.
- Because the file is named `bhanu-resume.pdf` (no version, no date), swapping editions never changes a URL or a component.

---

## 9. Information architecture and section plan

### 9.1 Final section order (locked, decision 1)

1. Hero
2. About
3. Experience
4. Projects
5. Skills / Tech Stack
6. Certifications
7. Education
8. Leadership & Awards
9. Recommendations
10. GitHub / Links
11. Resume
12. Contact

**Intent:** establish identity (Hero, About), then professional credibility (Experience, Projects), then technical proof (Skills), then supporting credentials and character (Certifications, Education, Leadership & Awards), then social proof and code presence (Recommendations, GitHub / Links), then the document and the call to action (Resume, Contact).

Notes on the locked order:
- The order lives in `content/navigation.ts` only. Components never assume a position.
- The **proof strip** (resume-sourced metrics) is a band at the foot of the Hero, part of section 1. It is not a separate section, has no nav entry, and does not change the order.
- Sections that render nothing are skipped without disturbing the rest of the order. **At launch Recommendations is hidden** (no approved records) and **GitHub / Links** renders only the profile links (see 9.3).
- Resume and Contact stay reachable at all times from the top bar regardless of scroll position.

### 9.2 Navigation
- **Top bar** (angular, translucent carbon, the one permitted `backdrop-filter`): brand (monogram plus "Bhanudeepak Nagumothu" at desktop widths, monogram only when narrow), then in-order links for the rendered sections that fit: About, Experience, Projects, Skills, Certifications, Education, Contact, plus a **Resume** button (crimson accent). Active section marked with a crimson underline strand and `aria-current`.
- **Section rail** (desktop ≥ 1024 px): a thin vertical thread at the right edge with one node per **rendered** section, in the locked order; hover/focus shows labels; active node crimson. It reaches the sections that don't fit the top bar (Leadership & Awards, GitHub / Links, Recommendations once it exists).
- **Mobile:** menu button opens a sheet listing every rendered section in order plus the resume actions; `aria-expanded`/`aria-controls`; focus trapped while open.
- Skip link first in tab order.
- Hidden sections never leave dead links, empty rail nodes, or empty headings.

### 9.3 Section specs

| # | Section | Purpose | Content source | Key design | Data status |
|---|---|---|---|---|---|
| 1 | **Hero (built, Phase 4)** | Identity, positioning, first impression | `site`, `socials`, `resume`, `heroNetwork`, `metrics` | `<h1>` "Bhanudeepak Nagumothu" with a metallic gradient + `text-shadow` extrusion (`.hero-name`). Lead statement, verbatim and approved: *"Data Engineer building reliable cloud data platforms, pipelines, and automation that turn operational data into trusted systems."* Mono eyebrow: role + location (no name repeat — the `<h1>` already carries it). CTAs (as built): **Explore My Work** (primary, `#projects`), **View Resume** (secondary, `getResumeAsset()`, hidden if unavailable), **Contact Me** (tertiary, `#contact`). Quiet text links for LinkedIn/GitHub (`getPublicSocials()`), not icons — no icon set was installed and CLAUDE.md §7 asks for a reason before adding one. `HeroWeb` — 5 curated technologies (`content/hero-network.ts`) hand-placed around the framed portrait root node; mobile (`<sm`) drops the constellation entirely, portrait only. **Proof strip band** at the foot (below). | **Built** |
| 1 (band) | **Proof strip (built, Phase 4)** | Immediate credibility | `metrics` | 4 of the 5 `metrics` records (all but "170+ monthly bill-related items", which restates the same scope as "20+ campus buildings"): 20+ campus buildings; 6,854+ records validated; ~3 workdays to 5 minutes; ~1 hour to under 2 minutes. Each carries a `source` note in content. No seniority or scale claims added. | **Built** |
| 2 | **About (built, Phase 5)** | Human summary and current focus | `site`, `about`, `education`, `projects` | One quiet `Surface` panel: 3 synthesized paragraphs (`content/about.ts`, not the resume summary pasted in) using "Bhanu" naturally; a "Now studying" / "Now building" quick-facts row (M.S. status via `education`, the in-progress lakehouse via `getInProgressProjects()`); a small decorative 4-node pipeline strand (Ingest → Validate → Transform → Trusted Output, `aria-hidden`, restates concepts the paragraphs already state in words). No second large portrait. Deliberately smaller/quieter than the Hero's constellation — the Hero stays visually dominant. | **Built** |
| 3 | **Experience (built, Phase 5)** | Career story | `experience` | `ExperienceThread` — a single hairline vertical connector with a `Node` per role (current CSU role: crimson "live" node, larger; Vipany/Laxmi: quiet gray, smaller), each anchored to a chamfered `Surface` card. Current-first order (matches `content/experience.ts`), graduated visual weight communicates "growing responsibility → current work" read top-to-bottom rather than left-to-right. Cards show `summary`/`highlights`/optional `impact`/optional `tech` (Phase 5 additions to the schema) — portfolio-synthesized copy, not resume bullets pasted verbatim; `bullets` stays in content as the untouched fidelity source. | **Built** |
| 4 | **Projects (built, Phase 6)** | Depth and technical credibility | `projects`, `metrics` | Flagship lakehouse card spans the full grid width (`lg:col-span-2`), tilt; the two completed automations sit side by side below it. Status badge ("In Progress" crimson / "Complete" neutral) on every card and in the modal. One headline metric per card where `metricIds` resolves one. A quiet, `aria-hidden` 3-node connector sits above the grid ("three processing nodes on the same system"). "View Case Study" opens the modal (§9.4); GitHub is a secondary action, shown only when `links.github` is set (none of the 3 real projects currently have one — see decision log D54-D58). **No screenshots. Visuals are custom sanitized architecture diagrams (`ArchitectureDiagram`).** | **Built** |
| 5 | **Skills / Tech Stack (built, Phase 7)** | Technical proof, scannable | `skills`, `experience`, `projects` | Five resume groups, each its own quiet hub card (`Node` + `SectionHeading`-style header), skills rendered with the existing `TechTag` primitive — not a per-skill node graph, which up to 9 skills per group would make cramped and unreadable. Hierarchy comes from `getEvidencedSkills()`: a skill also named in `experience[].tech`/`projects[].tech` renders as a filled tag, a factual relationship rather than a self-scored rating. **No proficiency bars or percentages** (the resume gives none). A quiet, unlabeled 5-node connector sits above the grid. | **Built** |
| 6 | **Certifications (built, Phase 7)** | Credentials | `certifications` | Compact "credential node" cards — deliberately smaller and quieter than Skills' hub cards, giving the three sections their own distinct visual weight (§15 D59) rather than one card layout reused three times. Each shows a `kind` badge (Certification / Applied Skill / Training, read off the credential's own verbatim name — Oracle's "Certified ... Associate," Microsoft's "Applied Skills," AWS's "Academy" — never invented), **name and issuer**, and a "Verify credential" link only when `verifyUrl` is set. **None of the 5 real credentials currently has one**, so no verification link renders anywhere on the live site; `content.example/` demonstrates the mechanism. IDs, issue dates, and badges remain omitted with no placeholders (decision 8). Grayscale only — no vendor logos or brand colors. | **Built** |
| 7 | **Education (built, Phase 7)** | Academic background | `education` | A two-node path, not a card grid — the third distinct visual identity of the three (§15 D59) — sorted chronologically (Bachelor's, then Master's) rather than the content array's current-first order, matching the "foundation → specialization" narrative. The Master's (in progress) carries the same crimson "live" `Node` convention as Experience's current role; the Bachelor's is not visually diminished. GPA/CGPA shown exactly as stored, no computation. | **Built** |
| 8 | **Leadership & Awards (built, Phase 7.5)** | Character and recognition | `leadership`, `awards` | One leadership `Surface` (GPSA Vice President of Programming — the specific title Bhanu confirmed this phase, GPSA has more than one VP role) flowing into a row of two compact award cards below it via a single, unconditionally-vertical connector ("professional growth → leadership → recognition," Step 4). Amounts exactly as on the resume; no invented dates/orgs for either award (both are absent in real content and stay omitted). | **Built** |
| 9 | **Recommendations (architecture built, Phase 7.5 — hidden on the live site)** | Social proof | `recommendations` | Quote cards (`<blockquote>`/`<cite>`) from **approved** records only. **`return null` when there are zero approved records — not an empty section** (Step 5/16: no accessibility artifact, no "coming soon"). Never fabricated, edited, or excerpted-and-altered. | `content/recommendations.ts` is still empty; the section renders nothing on the real site. Architecture is ready — the moment a real, approved record exists, it renders with no code changes |
| 10 | **GitHub / Links (built, Phase 7.5)** | Code presence | `socials` | Two full-card profile links (GitHub, LinkedIn) — not a repo browser, not a Contact duplicate. Static "View GitHub Profile" / "View LinkedIn Profile" only; **no repo counts, stars, or activity stats** (none are fetched, Step 9). **Deferred (decision 9):** featured repositories, repo metadata fetching, and any "view source" link for this portfolio, all added only after Bhanu confirms the repository and approved project links — unchanged this phase; none of the 3 real projects gained a `links.github`. | **Built** |
| 11 | **Resume** | Easy access to the document | `resume` | Preview card with View/Download (`<ResumeActions>`), "Last updated" from the file, plain-text summary for ATS/no-JS. All actions read the single config (§8). | Ready (architecture in §8) |
| 12 | **Contact** | Convert interest to conversation | `site`, `socials` | **Email (with copy button), phone (a `tel:` link), and LinkedIn**, plus location. Conversational lead-in using "Bhanu". Optional third-party form endpoint via env var, off by default. **The phone number appears in this section and nowhere else on the site** (decision 19). | Email, phone, LinkedIn, and GitHub URLs confirmed (Phase 1.5) |
| – | **Footer** | Wayfinding, legal | all | Full name, section links, email and LinkedIn, resume, "last updated", MIT/content notice, back to top | Ready |

### 9.4 Project modal — built, Phase 6

`ProjectModalContent.tsx`: status badge, title, summary, then `caseStudy`'s `problem` / `approach` / `responsibility` ("What I built") / optional `validation` sections, a `caseStudy.milestones` "Build status" list, the `architecture` diagram with its sanitization caption, resolved `metricIds` as an impact list, the full `tech` list, and an optional GitHub link. No previous/next controls were built — a hash-synced dialog has no inherent "next" ordering to expose, and nothing in the brief asked for one; revisit if a future phase wants project-to-project navigation.

Built on the **native `<dialog>` element** (`src/components/ui/Dialog.tsx`) rather than a hand-rolled focus trap or an added library (CLAUDE.md §7): `showModal()`/`close()` give a real focus trap, Escape-to-close, and inert background content natively. Two focus-management pieces are handled explicitly in JS rather than left to native defaults, because the modal's content is intentionally lazy-loaded (see §10.4) and native "focus the first focusable element" resolves *before* that content exists:
- **Focus in:** `ProjectModalContent` focuses its own Close button on mount.
- **Focus out:** `Dialog` captures `document.activeElement` itself (not relying on the browser's own capture, which the same lazy-load timing gap can undermine) before calling `showModal()`, and restores it explicitly on close.

Both gaps were found by Playwright-driven interaction testing (not by reasoning about the spec alone) — see decision log D56.

State is synced to the URL hash (`#project=<slug>`, decision D5) via `useSyncExternalStore` reading `location.hash` (not a `useEffect` + `setState`, which a stricter lint rule flags for exactly this "sync to an external browser API" case, and which briefly caused a real hydration-adjacent bug during development — see D57). A card's "View Case Study" action is consequently a genuine `<a href="#project=...">` link, not a synthetic `onClick`. Closing (Escape, backdrop click, or the Close button) always goes through `history.back()`, so the browser's own Back button already closes the modal for free and returns to the exact prior scroll position; a duplicate `history.back()` is guarded against by checking whether the hash still names an open project before calling it again.

**Sanitization policy for project content and diagrams (decision 5; CLAUDE.md §2 rules 6 and 9)**
- Allowed source material: **only information already in Bhanu's approved resume.**
- Never published: internal CSU files, vendor documents, utility bills, account numbers, meter identifiers, internal screenshots or exports containing operational data, or any confidential or sensitive university information. Not in `public/`, not in `content/`, not in alt text or image metadata, not in Git history, not in test fixtures.
- Diagrams are **built specifically for the portfolio**, as SVG/React from project data. They are not screenshots or exports of any real system.
- **Realistic labels are welcome, real records are not.** Use architecture vocabulary that reads naturally: layer names (Bronze / Silver / Gold), stage names (Ingest, Standardize, Validate, Reconcile, Publish), technology names the resume states, and entity names the resume uses (buildings, vendors, accounts, meters, bills, usage, charges, payments). Never use real table/column/schema/database/server/workspace/storage-account/pipeline names, real ID formats, real vendor or building names, or sample rows resembling real records.
- A label asserting an implementation detail the resume does not state (for example an orchestration tool, refresh schedule, or specific table name) needs Bhanu's confirmation first.
- Each diagram carries a small caption: "Simplified architecture illustration. Contains no operational data."
- Mock dashboards or synthetic sample-data screenshots are not planned. If Bhanu wants one later, it is a separate decision.

**Draft diagram content (all from the resume; labels generic):**
- *Lakehouse (in progress):* Sources (bills, spreadsheets, APIs, operational data) → ADLS Gen2 with Bronze → Silver → Gold, processed by Azure Databricks (PySpark, Spark SQL, Delta Lake), governed with Unity Catalog → Gold dimensional models → Power BI. Cross-cutting: validation and reconciliation with rejected records routed for review; incremental MERGE/upsert with SCD Type 1/2; audit logging and lineage.
- *ENERGY STAR Automation:* Extract → Transform → Validate/Reconcile → REST API → ENERGY STAR Portfolio Manager.
- *Steam Bill Automation:* Semi-structured utility PDFs → pdfplumber parsing → Standardize → Validate/Reconcile → Excel workbook (existing formulas and business rules preserved).

---

## 10. Code architecture and component plan

### 10.1 Folder structure (future)

```
bhanu-spider-portfolio/
├─ CLAUDE.md  PLANNING.md  README.md  LICENSE  CONTENT-NOTICE  .env.example
├─ .gitignore  .npmrc  .nvmrc  package.json  package-lock.json  next.config.ts  tsconfig.json
├─ reference/                     # local only, gitignored, never deployed
├─ content/                       # ALL personal content (typed TS modules)
├─ content.example/               # fictional "Jordan A. Rivera" identity, same schema — BUILT (Phase 2)
├─ public/
│  ├─ resume/bhanu-resume.pdf     # gitignored for now — D24
│  └─ images/{profile,projects,certifications,og}/
├─ docs/                          # ARCHITECTURE, CUSTOMIZING, DEPLOYING, ASSETS — Phase 10
├─ scripts/                       # content-check.ts, resume-check.ts — BUILT (Phase 2), run via tsx
├─ .github/workflows/ci.yml       # Phase 10
├─ tests/                         # unit + Playwright e2e + a11y — Phase 3+
└─ src/
   ├─ app/
   │  ├─ layout.tsx  page.tsx  globals.css  fonts.ts  icon.svg   — BUILT (Phase 3)
   │  │    (page.tsx now renders the real Hero — BUILT Phase 4; the Phase 3
   │  │    specimen it temporarily held has been fully removed)
   │  ├─ not-found.tsx  sitemap.ts  robots.ts  opengraph-image.tsx — later phases
   ├─ components/
   │  ├─ ui/                      # Container, SectionShell, SectionHeading, Button, Surface,
   │  │                             TechTag, Reveal, SkipLink, VisuallyHidden — BUILT (Phase 3)
   │  ├─ layout/                  # Header, Navigation, Footer — BUILT (Phase 9); no
   │  │                             separate SectionRail (§15 D69)
   │  ├─ sections/                # Hero, ProofStrip, About, Experience, Projects, Skills,
   │  │                             Certifications, Education — BUILT (Phase 4-7)
   │  ├─ web/                     # generate-web.ts, NetworkMesh, Node — BUILT (Phase 3);
   │  │                             HeroWeb — BUILT (Phase 4); ExperienceThread — BUILT
   │  │                             (Phase 5); ArchitectureDiagram, ProjectCard,
   │  │                             ProjectStatusBadge — BUILT (Phase 6, in place of this
   │  │                             sketch's separate "ArchitectureGraph"/"project/" folder
   │  │                             — §10.3); the Skills hierarchy needed no separate
   │  │                             "SkillConstellation" file either (§15 D60) — the
   │  │                             card-corner ornament remains the only item here still
   │  │                             unbuilt
   │  └─ resume/                  # ResumeActions, ResumeViewer — Phase 8
   ├─ hooks/                      # use-media-query, use-reduced-motion, use-pointer-fine,
   │                                 use-in-view, use-tilt — BUILT (Phase 3); use-active-section,
   │                                 use-hash-state — Phase 4+/6 (need a nav/modal to serve)
   ├─ lib/                        # content.ts (gateway), content-selectors.ts, resume.ts,
   │                                 needs-input.ts, ui-strings.ts — BUILT (Phase 1/2); cn.ts, seo.ts — later
   ├─ schemas/content.ts          # Zod schemas — the single source of shape — BUILT (Phase 2)
   ├─ styles/                     # tokens.css, depth.css, web.css — BUILT (Phase 3)
   └─ types/content.ts            # types inferred from src/schemas/content.ts — BUILT (Phase 1, rebuilt schema-first in Phase 2)
```

**Phase 3 folder-placement notes (three deliberate deviations from the sketch above, decided during implementation — §15 D37-D39):**
- There is no `components/motion/` folder (D37). A `MotionProvider` only earns its place once Framer Motion is actually installed (§6.1 rule 4; CLAUDE.md §5 rule 7); until then, the motion primitives live directly in `hooks/` and `components/ui/Reveal.tsx`.
- The web geometry generator lives in `components/web/generate-web.ts`, not `lib/web-geometry.ts` (D38) — it's tightly coupled to the components that render it (`NetworkMesh`, `Node`) and §10.3's own component inventory already groups "web geometry" as one unit, so co-locating the pure function with its consumers reads better than splitting them across `lib/` and `components/`.
- Step 9 of the Phase 3 brief asked to "evolve the current foundation page into a visual-system specimen" (D39) — so `src/app/page.tsx` (the real, single homepage route) is the specimen for now, not a separate `(dev)/design/page.tsx`. The original sketch's permanent, production-hidden design-system page is still a reasonable idea; it just isn't what this phase's explicit instruction asked for. `page.tsx` gets replaced outright when the real Hero is built in Phase 4.

### 10.2 Boundaries
`ui/` knows nothing about Bhanu. `sections/` compose `ui/` and read data through `lib/content.ts`. `web/` and `motion/` are content-agnostic and take data via props. `content/` imports only types.

### 10.3 Component inventory

| Group | Components | Notes |
|---|---|---|
| Primitives (`ui/`) | **Built (Phase 3):** `Container`, `SectionShell`, `SectionHeading`, `Button` (doubles as "LinkButton"), `Surface` (doubles as "Card"), `TechTag`, `Reveal`, `SkipLink`, `VisuallyHidden`. **Built (Phase 6):** `Dialog` — native `<dialog>` wrapper (§9.4, §10.4). **Not built:** Badge (distinct from TechTag — no use case yet), Sheet, Tooltip, Separator | Custom-built, not shadcn/ui — Phase 3 evaluated shadcn and declined it (§15 D40), and Phase 6 confirmed the same reasoning specifically for Dialog: native `<dialog>` already gives a real focus trap, Escape-close, and focus restoration, so Radix's version would duplicate, not add, capability. Revisit for Sheet/Tooltip only if a future phase genuinely needs them |
| Layout | **Built (Phase 9):** `Header` (server), `Navigation` (client — desktop bar + portaled mobile sheet, §15 D70), `Footer` (server). **Not built:** a separate `SectionRail` (§15 D69) | `SectionShell` (now in `ui/`, not `layout/` — it's a generic wrapper any section uses, not page chrome) renders `<section aria-labelledby>`; `SectionHeading` renders the index label, title, lede |
| Web geometry | **Built:** `generate-web.ts` (the seeded generator), `NetworkMesh`, `Node`, `HeroWeb` (Phase 4 — portrait hub + 5 hand-placed, curated technology nodes; hand-placed rather than derived from `generateWeb` because label placement for a small fixed node set needs per-node control the generic radial formula can't give), `ExperienceThread` (Phase 5 — the timeline/rail "thread" variant: a single hairline connector plus a `Node` per role, graduated size/color instead of identical dots, described further in §15 D50), `ArchitectureDiagram` (Phase 6 — the sanitized diagram variant: `nodes` rendered as a simple ordered sequence, horizontal at `sm`+ and a vertical stack below it, reusing both existing responsive patterns rather than inventing a third), `ProjectCard`, `ProjectStatusBadge`. **Built (Phase 7), no separate `SkillConstellation` file:** the Skills/Certifications/Education hub-and-connector treatment lives directly in each section component — `getEvidencedSkills()` (`content-selectors.ts`) plus `TechTag`'s `emphasized` prop replace the originally-sketched per-node hover-lit graph (§15 D60). **Not built:** the card-corner wedge ornament | Each remaining variant is built when its section is (Phase 7.5+) |
| Motion | **Built:** the hook set (`use-reduced-motion`, `use-pointer-fine`, `use-in-view`, `use-tilt`) plus `Reveal`. **Not built:** `MotionProvider`, `ParallaxLayer`, `CursorLight`, `CountUp` — none needed Framer Motion yet (§6.1 rule 4) | Each no-ops under reduced-motion or a coarse pointer |
| Sections (in locked page order) | **Built:** Hero with ProofStrip band (Phase 4); About, Experience (Phase 5); Projects (Phase 6); Skills, Certifications, Education (Phase 7); LeadershipAwards, Recommendations, GithubLinks (Phase 7.5). **Not built:** ResumeSection, Contact (Phase 8) | Each renders nothing if its data is empty; order comes from `content/navigation.ts`. `Recommendations` is the first section actually exercising this at launch: `content/recommendations.ts` is empty, so it `return`s `null` and is entirely absent from the rendered page |
| Project | **Built (Phase 6):** `ProjectCard`, `ProjectsGrid` (hash-sync + `Dialog` host, client), `ProjectModalContent` (lazy-loaded case-study view, client) | Modal content code-split via `next/dynamic({ ssr: false })` — §10.4 |
| Resume | ResumeActions, ResumeViewer — not built (Phase 8) | `src/lib/resume.ts` (the data helper) is already built — see §8 |
| Dev-only | Design specimen page | not in production |

### 10.4 Tooling
npm; TypeScript strict; ESLint with `jsx-a11y`; Prettier; Zod 4.6.5 (**installed, Phase 2**); tsx 4.23.15 (**installed, Phase 2** — runs `content:check`/`resume:check`, never imported by the app); Vitest for unit tests (web generator determinism, content selectors — the generator exists now, Phase 3, but Vitest itself is still not installed; still worth adding once a real test suite is warranted); Playwright plus axe for e2e/a11y; Lighthouse CI budgets; GitHub Actions. **Phase 3 added zero new dependencies** — `package.json` is byte-for-byte unchanged from Phase 2 (§15 D36). **Phase 6 also added zero new dependencies** — the project modal uses `next/dynamic` (already part of Next.js) to code-split `ProjectModalContent` with `ssr: false`, so its JS (the case-study rendering, `ArchitectureDiagram`) loads only once a visitor opens a project — confirmed via Playwright network inspection: a separate ~2.1 KB chunk appears only after the first "View Case Study" click, never on initial page load. Exact versions pinned at install (including Next.js, Tailwind 4, and the `motion` package that Framer Motion now ships under, whenever it is installed).

---

## 11. Development phases

Each phase ends with a summary, a verification list, open questions, and an approval gate.

| Phase | Name | Deliverables | Acceptance |
|---|---|---|---|
| **0** | Study and planning | CLAUDE.md, PLANNING.md (v2, decisions locked in §0) | **Approved with amendments.** Implementation not started; Phase 1 awaits Bhanu's explicit go-ahead (**current gate**) |
| **1** | Foundation (**complete**) | `.gitignore` first (incl. `reference/`); local `git init` (no remote); Next.js 16.3.5 + TS strict + Tailwind 4 + ESLint via npm; foundation folders; typed content skeleton (`content/*`, `src/types/content.ts`, `needsInput` helper, `@/lib/content` gateway); ESLint import-boundary rules; resume PDF and portrait copied into `public/`; minimal home page; README stub | Lint, typecheck, and build pass; dev server verified with Playwright; `reference/` untracked. **Moved out of Phase 1 by Bhanu's narrower scope:** tokens, `next/font` fonts, shadcn init, Prettier, type-specimen/palette page, base layout and skip link move to Phase 3; Zod moves to Phase 2; MIT license moves to Phase 10 |
| **2** | Content layer (**complete**) | Zod schemas as the single source of shape (`src/schemas/content.ts`); types inferred from them (`src/types/content.ts`); `npm run content:check` (shape + safety/privacy rules, human-readable, exit-code gated); the resume helper (`src/lib/resume.ts`) and `npm run resume:check`; typed content selectors (`src/lib/content-selectors.ts`); `content.example/` — a complete, structurally valid, entirely fictional mirror of `content/` | Lint, typecheck, `content:check` (both real and `--example`), `resume:check`, and build all pass; the validator was proven to fail on 4 deliberately introduced violations (malformed email, invalid URL, duplicate phone literal, a `reference/` path), each reverted afterward; dev server verified with Playwright — no leaked content, no new console errors. **Not built this phase (moved later, none required by Phase 2's own brief):** `<ResumeActions>` and any other UI (Phase 8); a `content:check` CI workflow (Phase 10); `npm run template:init` (Phase 10); a resume max-size check (no locked decision requires one) |
| **3** | Design system and primitives (**complete**) | Design tokens (`src/styles/tokens.css`, Tailwind v4 `@theme`); typography (`src/app/fonts.ts`); surface/depth system (`depth.css`); `generateWeb` plus `NetworkMesh`/`Node` (`web.css`); the motion foundation (hooks + `Reveal`, no Framer Motion); UI primitives (`Container`, `SectionShell`, `SectionHeading`, `Button`, `Surface`, `TechTag`, `SkipLink`, `VisuallyHidden`); the brand mark (`icon.svg`); `src/app/page.tsx` evolved into a design-system specimen | Lint, typecheck, `content:check` (both), `resume:check`, and build all pass with zero new dependencies; specimen verified with Playwright at 360/375/768/1280/1440/1920px (no horizontal overflow at any); keyboard tab order and focus rings verified; contrast re-verified (mist-on-void 14.1:1, button labels ≥5.2:1); heading order (one `<h1>`, sequential `<h2>`s), landmark, and `aria-hidden` decorative-element checks passed; zero console errors on both dev and production servers (one real hydration-mismatch bug was found and fixed — `suppressHydrationWarning` on `<html>` for the deliberate pre-hydration `.js` class script); ~134 KB gzipped JS transferred (budget: ~170 KB). **Not built this phase (deferred to the section that needs it, per the brief's explicit scope):** Header/MobileMenu/SectionRail/Footer, `generateWeb`'s unit tests (Vitest isn't installed yet), the hero/card/rail-specific web-geometry compositions, shadcn/ui (evaluated, declined — D40) |
| **4** | Hero and proof strip (**complete**) | `Hero.tsx`: asymmetric grid (identity/actions left, portrait-as-network-node right); dimensional `<h1>` via a metallic gradient fill plus a stepped `text-shadow` extrusion (`.hero-name`, `depth.css`) rather than stacked DOM clones; approved positioning statement verbatim; a small curated technology network (`content/hero-network.ts`, 5 nodes, source→processing→storage→trusted-output story, one `live` node) hand-placed around the existing portrait treatment (`HeroWeb.tsx`, reusing `Surface`/`NetworkMesh`/`Node` unmodified); CTAs "Explore My Work" / "View Resume" / "Contact Me" (`Button`, resume via `getResumeAsset()`, no hard-coded path); quiet LinkedIn/GitHub text links (`getPublicSocials()`); `ProofStrip.tsx` band (4 of the 5 `metrics` records) | Lint, typecheck, `content:check` (both), `resume:check`, and build all pass; Playwright-verified at 360/375/768/1280/1920px (no horizontal overflow, mobile drops the tech constellation to a portrait-only "content-first" composition below `sm`); keyboard focus ring confirmed on the primary CTA; one `<h1>`, no console/hydration errors; `page.tsx`'s Phase 3 specimen fully removed |
| **5** | About and Experience (**complete**) | `content/about.ts` (synthesized narrative) and schema additions to `experienceSchema` (`summary`/`highlights`/`impact`/`tech`); `About.tsx` (one Surface panel, quick facts, decorative pipeline strand); `ExperienceThread.tsx` (career-path connector, current role first, graduated visual weight) | Lint, typecheck, `content:check` (both), `resume:check`, and build all pass; a new `content:check` rule bans exaggerated-seniority language (senior/expert/architect/industry leader/...) in real content; Playwright-verified at 360/375/768/1280/1920px (a label-collision bug in the About pipeline strand at 375px was found and fixed — `whitespace-nowrap` was letting "Trusted Output" overflow into its neighbor; removing it lets the label wrap inside its own grid cell instead); zero console/hydration errors; JS transfer unchanged from the Phase 4 baseline (both new sections are Server Components composing only already-shipped client leaves) |
| **6** | Projects (**complete**) | `ProjectCard`/`ProjectsGrid`/`ProjectModalContent` (lazy-loaded, §10.4), `ArchitectureDiagram`, `ProjectStatusBadge`; schema additions (`caseStudy`, `projectMilestoneSchema`) so implemented/in-progress/planned distinctions live in structured content, never blurred in prose | Lint, typecheck, `content:check` (both, with 3 new project-integrity rules — see D54), `resume:check`, and build all pass; Playwright interaction QA (not just screenshots) verified open/close via link click, Escape, backdrop click, and the Close button, repeated open/close across all 3 projects, keyboard Tab containment, and — after fixing two real bugs found this way (D55, D56) — correct focus-in and focus-restoration; responsive-verified at 360/375/768/1280/1440/1920px; zero console/hydration errors; JS transfer +1.7 KB initial (143.0 KB vs. the 141.3 KB Phase 5 baseline), plus a separate 2.1 KB chunk confirmed to load only when a project is actually opened; a review confirmed no CSU/vendor/bill/account/meter/operational data anywhere in the new content |
| **7** | Skills, Certifications, and Education (**complete**) | `Skills.tsx` (5 hub cards, `getEvidencedSkills()` for hierarchy), `Certifications.tsx` (compact credential nodes, `kind` populated on all 5 real records), `Education.tsx` (2-node chronological path); a new `TechTag` `emphasized` prop | Lint, typecheck, `content:check` (both), `resume:check`, and build all pass; deliberately **no new content-check rules** — every new-content invariant (URL format, GPA shape, sourced-from-content skill labels) was already schema-enforced (§15 D60); Playwright-verified at 360/375/768/1280/1440/1920px, zero console/hydration errors, no new items in the tab order; JS transfer unchanged from the Phase 6 baseline (143.0 KB — all three sections are Server Components) |
| **7.5** | Leadership & Awards, Recommendations, GitHub / Links (**complete**) | `LeadershipAwards.tsx`, `Recommendations.tsx` (self-hiding, `return null`), `GithubLinks.tsx`; `content/leadership.ts`'s role title corrected to "Vice President of Programming" | Lint, typecheck, `content:check` (both), `resume:check`, and build all pass; Playwright-verified at 360/375/768/1280/1440/1920px — confirmed `#recommendations` is entirely absent from the DOM (no empty landmark, no gap) since `content/recommendations.ts` is still empty; a real accessible-name bug was found and fixed (the GitHub/LinkedIn link cards' computed name concatenated a heading, a sentence, and an action label into one run-on string — fixed with an explicit `aria-label`, see D63); zero console/hydration errors; JS transfer unchanged from the Phase 7 baseline (143.0 KB — all three sections are Server Components, and the hidden Recommendations section ships nothing at all) |
| **8** | Resume and contact (**complete**) | `Resume.tsx` (summary card + View/Download via `getResumeAsset()`, self-hides if the PDF is missing); `Contact.tsx` (email, phone via `tel:`, LinkedIn, GitHub — all direct anchors, no contact form); `content/resume.ts`'s new `summary` field; the resume PDF gate lifted in `.gitignore` after a full privacy review (D67) | Lint, typecheck, `content:check` (both), `resume:check`, and build all pass; Playwright-verified at 360/375/768/1280/1440/1920px, zero console/hydration errors, no duplicate section IDs; exact `mailto:`/`tel:`/LinkedIn/GitHub hrefs and `target`/`rel`/`download` attributes verified; resume PDF confirmed served at `/resume/bhanu-resume.pdf` with HTTP 200 (112,084 bytes, separate from page JS); JS transfer unchanged from the Phase 7.5 baseline (143.0 KB — both new sections are Server Components); the phone number appears only inside the Contact section (hero, nav, footer, metadata, and JSON-LD contain none). **Not built this phase (deferred to Phase 9, not explicitly assigned here — D68):** `Header`/`MobileMenu`/`SectionRail`/`Footer` — the existing `content/navigation.ts` and `getRenderableNavigation()`/`isSectionRenderable()` already correctly represent the full, final section set (including `resume`/`contact`, excluding hidden `recommendations`) with no code changes needed |
| **9** | Polish and launch prep (**complete**) | `Header.tsx`/`Navigation.tsx`/`Footer.tsx` (§10.3's long-deferred layout group, built now): a sticky header with a compact desktop nav (`inNav` sections only) plus a full mobile sheet (every renderable section, via a `createPortal`-mounted dialog so it isn't trapped by the header's own `backdrop-filter` containing block — D70), `useActiveSection` (one shared `IntersectionObserver`) driving the crimson active-link marker; expanded SEO metadata (title template, robots, OG/Twitter) and a code-generated `opengraph-image.tsx` (no photo, no dependency); `PersonJsonLd` (name, "Data Engineer," public email, `sameAs` — no phone, no url, no image, all three deferred and documented — D71); a branded `not-found.tsx`; README expanded to a full public-repo README, `LICENSE` (MIT) and `CONTENT-NOTICE.md` added, `package.json` given a `license` field | Lint, typecheck, `content:check` (both), `resume:check`, and build all pass; real Playwright-MCP QA (not the Claude_Browser substitute used in every earlier phase) covered keyboard tab order, the project-dialog regression suite (open/close/Escape/focus-restore, a valid deep link, and a graceful invalid-slug no-op), all 7 required breakpoints (360/375/768/1024/1280/1440/1920 — zero horizontal overflow at any), reduced-motion emulation (all 42 `Reveal` elements stay visible, zero running CSS animations, `scroll-behavior` correctly reverts to `auto`), and zero console/hydration errors throughout; a real crowding bug at exactly 768px (the full name wrapped to two lines and clipped the Resume button off-screen) was found and fixed by deferring the full name to `lg:` (1024px) and showing the monogram below it, matching §9.2's own "monogram only when narrow" sketch; a real crimson-budget violation was found and fixed — the header's Resume link was crimson-filled, which pushed the Hero's own viewport (already at its 3-element budget: primary CTA, live node, portrait edge) to four, so it was changed to the neutral secondary style (D72); JS transfer +1.9 KB over the Phase 8 baseline (144,964 vs. 143,035 bytes — the header/nav's only new client cost), still well under the ~170 KB budget; the resume PDF and the lazy project-modal chunk were both confirmed absent from initial page load in production, present only on demand; full repository privacy and git-history audits found no personal email, no absolute local paths, and no secrets anywhere in the tracked tree or any reachable commit |
| **10** | Repo release | `docs/CUSTOMIZING.md`, `docs/DEPLOYING.md`, `docs/ARCHITECTURE.md`, `docs/ASSETS.md`, `.env.example`, CI. **Moved out of Phase 10 by the Phase 9 brief's own Step 28/29 instructions:** the public-repo README, `LICENSE`, and `CONTENT-NOTICE.md` — all built in Phase 9 instead, since Step 28 explicitly asked for the README now | Fresh clone builds with zero env vars; presentation code contains no Bhanu-specific strings |
| **11** | Publish (approval per action) | Create GitHub repo, push, connect deployment, domain | **Pre-checks:** `git log --format='%an <%ae> | %cn <%ce>'` shows only the noreply address across all commits (identity already corrected, D28); Bhanu has enabled GitHub's "Block command line pushes that expose my email" setting. (The public-PDF phone question is resolved by decision 19.) Explicit go-ahead for each of: repo creation, push, deploy, domain |
| **12** | GitHub integration (deferred) | Featured repositories and approved project links in `content/`; optional build-time repo-metadata fetch; "view source" link for this portfolio | Starts only after the repository exists and Bhanu confirms the repositories and links; no invented URLs |

Real content (certification details, approved project links, featured repositories, recommendation text) can arrive at any time; the content layer absorbs it without code changes, and sections appear automatically when their data does. Project screenshots are not planned (sanitized diagrams instead); a higher-resolution portrait is optional and not needed for the initial build.

---

## 12. Making the repository reusable

1. **Content/presentation split** (§7) is the main reuse mechanism. A user edits `/content` and `/public`.
2. **`content.example/` (built, Phase 2)** ships a neutral, fictional identity ("Jordan A. Rivera," a data engineer at fictional companies) in the exact same schema and barrel shape as `content/`, so a fork can see the pattern immediately. It deliberately demonstrates every mechanism the real site uses: a `needsInput()` field left open (`seo.url`), a certification with every optional field filled in next to one with none, a project in each status, and an *approved* recommendation (the real `content/recommendations.ts` stays empty until real text exists — content.example's one entry exists purely to show the shape). It validates cleanly under the same `npm run content:check -- --example`.
3. **`npm run template:init`** (Phase 10, not yet built): copies `content.example/` over `content/`, replaces personal assets with neutral placeholders, and prompts before overwriting anything. Until then, the manual step is: copy each `content.example/*.ts` file's shape into the matching `content/*.ts` file.
4. **Theming in three places:** color tokens (`tokens.css`), font choices (`layout.tsx` via `next/font`), and the web generator parameters in `content/site.ts`. Re-skinning the accent is a few variables.
5. **Sections toggle by data.** Delete the contents of an array and the section (and its nav entry) disappears.
6. **Licensing clarity:** MIT for code; `CONTENT-NOTICE` states that Bhanu's text, photo, resume, and project write-ups are not licensed for reuse. Forks must replace them.
7. **Docs:** README (what/why, screenshots, quick start), CUSTOMIZING (step-by-step), DEPLOYING (Vercel, Netlify, Cloudflare Pages, GitHub Pages via static export), ARCHITECTURE (this document, distilled), ASSETS.
8. **Zero-config build:** `.env.example` lists optional variables (`NEXT_PUBLIC_SITE_URL`, optional contact form endpoint, optional analytics ID); the site builds with none set. No secrets anywhere.
9. **Alternative considered:** two repositories (personal site and clean template). Simpler for strict separation but doubles maintenance. Recommended: one repo with `content/` and `content.example/` plus the notice.
10. **Github template flag** enabled once public, so "Use this template" creates a clean history for forks.
11. **Strict content/presentation boundary (decision 11).** Components, hooks, `lib/`, styles, and tests contain no Bhanu-specific strings, links, numbers, or assets; tests and the design specimen use `content.example/` fixtures. ESLint already enforces the shape of this boundary for every `content/**/*.ts` and `content.example/**/*.ts` file (Phase 1/2); a CI check that greps `src/` and `tests/` for Bhanu-specific identifiers is still Phase 10.
12. **Privacy-safe by default for forks.** The phone field is optional (a fork can omit it entirely, or fill it in with a NANPA-reserved 555-01XX number as `content.example/site.ts` does), the schema has exactly one phone field so `content:check` can confirm nothing duplicates it, unapproved recommendations never render, optional fields omit cleanly, and image records require a `sanitizedApproved` flag. A fork inherits those guardrails, and `npm run content:check` re-verifies them for whatever content the fork writes.
13. **GitHub integration is optional data, not baked-in behavior.** Featured repositories are plain entries in `content/`; any build-time metadata fetch (Phase 12) is behind a flag that is off by default, so forks make no network calls unless they opt in.
14. **Neutral visual identity is not required for forks.** The web/pipeline concept and tokens are reusable as-is; the licensing notice (item 6) covers Bhanu's personal content, not the design system code.

---

## 13. Quality plan

**Accessibility (WCAG 2.2 AA):** semantic landmarks, one `h1`, logical headings, skip link; visible focus; accessible dialogs; 44 px targets; contrast per §5.1; decorative geometry hidden from assistive tech; state never by color alone. Verified with eslint-plugin-jsx-a11y, axe in Playwright, manual keyboard-only walkthrough, and VoiceOver spot checks.

**Performance:** LCP < 2.0 s, INP < 150 ms, CLS < 0.05, Lighthouse ≥ 95/100/100/100; ~170 KB gzipped first-load JS budget; lazy modal and viewer; `next/image` with AVIF/WebP; self-hosted subsetted fonts with `display: swap` and size-adjust; hero paints without waiting for JS; static export capable.

**SEO/sharing:** Metadata API, canonical, Open Graph and Twitter cards, generated OG image, `sitemap`, `robots`, JSON-LD `Person` (public fields only), descriptive alt text, human-readable anchors.

**Testing:** unit (web generator determinism, content selectors, `needsInput` handling); e2e (nav and rail, modal open/close/Esc/focus-return/Back, resume actions present, reduced-motion snapshot); Lighthouse CI on PRs; manual real-device checks (iOS Safari, Android Chrome).

---

## 14. Items requiring Bhanu's input

### 14.1 Resolved by the locked decisions (no longer open)
- Plan approval, concept, and **section order** (decision 1).
- **Name** usage (decision 2) and the first-person voice.
- **Hero positioning** statement (decision 3).
- **Phone number:** approved for public display in the Contact section and for the downloadable resume (decision 19, Phase 1.5 correction).
- **Permission to describe the CSU projects** from the resume, with the privacy limits in decision 5. No screenshots are being requested; diagrams are custom and sanitized.
- **Portrait** treatment and use of the current 400×400 file (decision 6), including dropping the selective-crimson-shirt derivative idea.
- **Recommendations** behavior (decision 7), **certification omission** behavior (decision 8), **GitHub deferral** (decision 9).
- **Public email, LinkedIn URL, and GitHub URL** (decisions 13 to 15, Phase 1.5).

### 14.2 Still open

**Decisions needed before anything is pushed or published (Phase 11 pre-checks; not blocking development)**
1. **Confirm which PDF becomes `public/resume/bhanu-resume.pdf`** (the copy of `reference/Bhanu_Resume.pdf` already in place locally is assumed final) **and when it may be committed** (D24). The phone-number question is resolved (decision 19).
2. **Enable GitHub's "Block command line pushes that expose my email" setting** (GitHub → Settings → Emails). The Git identity itself is corrected (D28); this setting is Bhanu's own action and is advised before the first push.

**Optional, any time (the site hides or omits cleanly until supplied)**
3. **Certifications:** for any of the five, issue date, expiry, credential ID, verification URL, badge image, and whether each is a certification, applied skill, or course training. Supply only real values; omit the rest.
4. **Recommendations:** real text with author name, role, relationship, link, and the author's permission, plus Bhanu's approval to publish. Section stays hidden until then.
5. **Approved project links and featured GitHub repositories:** only after the repository and links are confirmed (decision 9; Phase 12). One-line descriptions in Bhanu's own words.
6. **About extras:** anything personal that Bhanu wants public (interests, target roles, availability, start date, work authorization). About is otherwise drafted from the resume only.
7. **Leadership detail:** any additional GPSA detail (initiatives, scale). Only real facts.
8. **Awards:** keep the dollar amounts ($6,000; $2,000) on the site, or show the awards without amounts? Default is to show them as on the resume.

**Design and infrastructure**
9. **Typography** approval after the Phase 1 specimen.
10. **Spider-inspiration comfort level:** how overt should the abstract mask-eye angular geometry be (barely-there vs. visible motif)? Default is barely-there.
11. **Domain, hosting, and repository:** preferred domain, hosting target (Vercel assumed), GitHub repository name, and timing of making it public.
12. **Analytics:** none by default. Add privacy-friendly analytics later?
13. **Higher-resolution portrait (future, optional):** not needed for the initial build.

---

## 15. Decision log

| # | Decision | Status | Rationale |
|---|---|---|---|
| D1 | Content in root `/content` (typed TS), not MDX/JSON | Approved | Type safety, cheap validation, easy for template users |
| D2 | Package manager: **npm** | **Changed by Bhanu (Phase 1 instruction); supersedes pnpm** | Ubiquitous for forks and template users; no extra tooling to install |
| D3 | Tailwind 4 (CSS-first tokens) plus custom CSS for depth effects | Approved | Tokens live in one CSS layer; bespoke effects need real CSS |
| D4 | Framer Motion via `LazyMotion`, CSS for simple effects | Approved | Bundle control |
| D5 | Project modals use hash-synced state (not intercepting routes) for v1 | Approved | Simpler, static-export safe; project summaries are already in page HTML. Per-project pages can be added later for SEO |
| D6 | Hero is typographic; portrait is a small framed root node, grayscale with a restrained crimson edge | Locked (decision 6); composition confirmed at Phase 4 review | Stays within the 400 px source limit; ties person to the "network" idea |
| D7 | **Final section order** as in §9.1 | **Locked (decision 1)** | Identity, then professional credibility, then technical proof. Differs from both the original brief and the first proposal: Recommendations now precede GitHub / Links, and Resume and Contact close the page |
| D8 | Static-export compatible; no API routes | Approved | Deploy anywhere; template-friendly |
| D9 | Contact by `mailto:` plus copy, optional external form endpoint | Approved | No backend, no secrets |
| D10 | Resume cache-busting by content hash at build time | Approved | Replace-the-file workflow needs zero edits |
| D11 | Reference extraction deleted after analysis | Done | Contains another person's personal files |
| D12 | Name: "Bhanudeepak Nagumothu" prominent, "Bhanu" conversational; stored once in `content/site.ts` | Locked (decision 2) | Professional prominence with a natural voice |
| D13 | Hero positioning statement is fixed verbatim in `site.positioning`; `content:check` flags drift | Locked (decision 3) | Prevents inflated or drifting claims |
| D14 | Public contact is email, phone, and LinkedIn; `contact.phone` is the schema's only phone field and content is scanned for phone-like patterns anywhere else | **Revised (decision 19)**; originally locked as "no phone" | Keeps the phone confined to the Contact section structurally, not by habit |
| D15 | The public resume PDF may keep its phone number; nothing is pushed or deployed until the Git author identity is corrected (D28) | **Revised (decision 19)**; originally "decided later" | The architecture is indifferent to the PDF's contents; the remaining publication risk is the Git author email |
| D16 | Project visuals are custom sanitized diagrams; no screenshots or mock dashboards | Locked (decision 5) | Removes the main channel through which CSU data could leak |
| D17 | Portrait treatment is render-time CSS/SVG only; source untouched; no derived or generated portrait | Locked (decision 6) | Honors "no destructive editing" literally |
| D18 | Optional fields (certification details, project links, repos, recommendations) are omitted cleanly, never placeholder-filled | Locked (decisions 7, 8, 9) | The live site never shows fake or blank-looking data |
| D19 | GitHub integration deferred to Phase 12; launch shows profile and LinkedIn links only | Locked (decision 9) | No repo URLs exist yet to link to |
| D20 | Proof strip remains a band inside the Hero, not a 13th section | Proposed (interpretation of decision 1) | The locked order lists 12 sections and the metrics strip is the hero's base; easy to change if Bhanu prefers otherwise |
| D21 | Public email is rendered as a real link and text, not JS-assembled | Proposed | Works without JavaScript and for assistive tech; accepts some spam-scraping risk, revisit if abused |
| D22 | Content lives in root `content/` (not `src/content/`), reached via the `@content/*` alias and only through `@/lib/content`; ESLint enforces both boundaries | Decided in Phase 1 | Follows the approved plan and CLAUDE.md (§6) over the approximate tree in the Phase 1 brief; keeps "edit `/content` and `/public`" true for template users |
| D23 | `content/` may import the `needsInput` helper as well as types | Decided in Phase 1 | The plan requires `needsInput()` inside content modules; a runtime helper cannot live in a types-only import |
| D24 | `public/resume/*.pdf` stays gitignored. The original reason (phone-number question) is resolved by decision 19; the PDF is simply untracked until Bhanu asks for it to be committed, then delete that one `.gitignore` line. The PDF is present locally and the app can use it | Decided in Phase 1; reason resolved in the Phase 1.5 correction | Avoids committing an asset before Bhanu asks; reversible by deleting one line |
| D25 | `agentRules: false` in `next.config.ts` | Decided in Phase 1 | Next 16.3 `next dev` otherwise appends a block to CLAUDE.md on every run (observed and reverted) |
| D26 | Resume title/download name use the full name ("Bhanudeepak Nagumothu Resume") | Decided in Phase 1 | Consistent with locked decision 2 (full name prominent) |
| D27 | Public contact values locked: email and phone in `content/site.ts` (phone shown in Contact only); LinkedIn and GitHub profile URLs in `content/socials.ts` | Locked (Phase 1.5, decisions 13 to 15 and 19) | Replaces the earlier "to confirm" state; the resume-PDF phone question is resolved (decision 19) |
| D28 | Git author identity correction: the initial commit was authored and committed with a personal address. Repo-local `user.name` is "Bhanudeepak Nagumothu" and `user.email` is the GitHub noreply address `269264082+bhanu-devv@users.noreply.github.com`; the unpushed commit was amended (`--reset-author`) so author and committer both use it. No reflog purge is needed for GitHub privacy (local reflog data and unreachable objects are not pushed). **Still to do by Bhanu:** enable GitHub's "Block command line pushes that expose my email" | **Resolved** (identity); GitHub setting pending Bhanu | Author and committer emails become public in pushed history and cannot be reliably retracted |
| D29 | The phone number is approved for public display in the Contact section (as a `tel:` link) and for the downloadable resume. Placement is limited to Contact: not hero, nav, footer, metadata, Open Graph, or JSON-LD; extending it needs Bhanu's approval. No obfuscation is applied, so some spam-scraping risk is accepted | Locked (decision 19) | Bhanu's explicit approval; the Contact-only limit is my reading of "in the Contact section" and keeps exposure minimal |
| D30 | Zod schemas (`src/schemas/content.ts`) are the single source of shape for `/content`; TypeScript types (`src/types/content.ts`) are inferred via `z.infer`, not hand-duplicated. `YearMonth` uses a typed `.transform()` so the inferred type stays the precise template literal, not plain `string` | Decided in Phase 2 | Directly answers the brief's "avoid unnecessary duplication between TypeScript types and Zod schemas"; a second, hand-maintained interface set would drift from the schema over time |
| D31 | `tsx` runs `content:check`/`resume:check` (a new devDependency, never imported by the app); Node's own native TypeScript stripping was tried first and rejected because it does not resolve the `@/*`/`@content/*` tsconfig path aliases the scripts need | Decided in Phase 2 | The alternative (hand-rolling a path-alias resolver, or rewriting every content module to use relative imports) was more code and more fragile than one well-known, single-purpose dependency |
| D32 | `content:check` has no separate `--strict` CLI flag. Every run applies the same rules; the required/optional distinction is expressed as ERROR vs. INFO severity, not a mode | Decided in Phase 2 | Simpler mental model — "does it pass" is always the same question — and the original plan's `--strict` was really describing severity, not two different rule sets |
| D33 | `resume:check` does not enforce a maximum PDF size | Decided in Phase 2 | No locked decision specifies a limit; inventing an arbitrary threshold seemed worse than adding one later if a real oversized file becomes a problem |
| D34 | `content.example/`'s one recommendation record is `approved: true` (unlike the real, empty `content/recommendations.ts`) | Decided in Phase 2 | The template's job is to show the shape of every mechanism, including an approved recommendation; it is clearly fictional (a made-up author at a fictional company) so it cannot be mistaken for a real endorsement |
| D35 | `content.example/`'s phone number is filled in (206-555-0142, NANPA's reserved 555-01XX fictional range), rather than left out | Decided in Phase 2 | Shows a fork exactly how to set one up safely, including the reserved-range convention, instead of leaving the pattern to guesswork |
| D36 | Framer Motion is not installed in Phase 3. Every Phase 3 motion need (reveal, stagger, hover tilt, node pulse, one-time path draw-in) is CSS transitions/`@keyframes` plus four small hooks | Decided in Phase 3 | Matches the brief's own "use Framer Motion only if needed" test — nothing in Phase 3's scope needed it. Zero new dependencies added this phase; revisit when a later phase needs orchestration CSS can't do cleanly (candidate: the project modal's shared-element transition, Phase 6) |
| D37 | No `components/motion/` folder yet; motion primitives live in `hooks/` and `components/ui/Reveal.tsx` | Decided in Phase 3 | A `MotionProvider` (LazyMotion wrapper) has nothing to wrap until Framer Motion is installed (D36) |
| D38 | The web-geometry generator lives at `components/web/generate-web.ts`, not `lib/web-geometry.ts` as first sketched | Decided in Phase 3 | Tightly coupled to its consumers (`NetworkMesh`, `Node`); §10.3 already treats "web geometry" as one inventory group |
| D39 | `src/app/page.tsx` (the real homepage route) was evolved directly into the Phase 3 specimen, not a separate `(dev)/design/page.tsx` | Decided in Phase 3, per the phase's explicit instruction ("evolve the current foundation page") | Will be replaced outright by the real Hero in Phase 4; the earlier sketch's permanent hidden specimen page is still a reasonable idea for later if Bhanu wants one |
| D40 | shadcn/ui evaluated and declined for Phase 3 | Decided in Phase 3 | None of Button/Surface/TechTag need Radix's focus-trap/portal logic; revisit specifically for Dialog/Sheet/Tooltip in Phase 6+, per CLAUDE.md §7's "explain why before adding it" |
| D41 | Two primary type families (Space Grotesk, Inter) plus one narrowly-scoped mono utility (JetBrains Mono) for technical labels/tags only — read as satisfying the brief's "at most two primary families," with mono not counted as a third *primary* (prose/display) family | Decided in Phase 3 | Step 2 of the brief separately requires distinguishing "technical metadata, code/technology tags" from prose, which is unreachable without some monospace role; flagged for Bhanu to correct if this reading is wrong |
| D42 | Display face swapped from the Phase 0 sketch's Bricolage Grotesque to Space Grotesk | Decided in Phase 3 | Both are geometric grotesques; Space Grotesk is a more conservative, widely-proven choice for "premium tech," and reads clearly as "not sci-fi" per the brief's explicit warning |
| D43 | A new schema-backed content module, `content/hero-network.ts` (`HeroNetworkNode[]`), holds the Hero's curated technology set instead of hard-coding labels in `HeroWeb.tsx`. `content-check.ts` cross-validates every label against `skills`/`projects` (a Zod schema alone can't reference other content modules) and enforces at most one `live` node | Decided in Phase 4 | Keeps the "never invent/hardcode content the content layer already has" rule true for the Hero, the same as every other section; the cross-check is what actually prevents a future invented technology, not just convention |
| D44 | The dimensional `<h1>` uses a CSS metallic gradient (`background-clip: text`) plus a stepped `text-shadow` extrusion (`.hero-name` in `depth.css`), not 6-10 stacked, offset DOM clones as PLANNING's original sketch described | Decided in Phase 4 | CLAUDE.md §5 budget rule 1 explicitly allows a layered `text-shadow` as the extrusion technique; it reads as dimensional without extra ARIA-hidden clone elements, and degrades to a plain solid-color `<h1>` (via a `@supports` fallback) in the rare browser without `background-clip: text` — never invisible text |
| D45 | `HeroWeb`'s technology constellation and its background `NetworkMesh` are hidden below the `sm` (640px) breakpoint; only the framed portrait renders on mobile | Decided in Phase 4 | Five mono-font tech labels around a hub have no room to stay legible and uncrowded below 640px container width; a "content-first, simplified" mobile composition (the Phase 4 brief's own words) means dropping the constellation, not shrinking it into overlapping text |
| D46 | The proof strip shows 4 of the 5 `metrics` records; "170+ monthly bill-related items" is left out | Decided in Phase 4 | It restates the same operational scope "20+ campus buildings" already covers; a 4-item strip of genuinely distinct facts reads better than 5 with two versions of one fact |
| D47 | "View Resume" opens the PDF directly in a new tab (`target="_blank"`) rather than an inline modal/viewer | Decided in Phase 4 | `resume.inlineViewer: true` in content configures a future in-page viewer for the dedicated Resume section (Phase 8, per §8.3); the Hero is a quick-access CTA, not that section, and a direct link needs no new client code or dependency this phase |
| D48 | Hero's "Explore My Work" and "Contact Me" CTAs link via a new `getSectionHref(id: NavSection["id"])` helper (`src/lib/content-selectors.ts`) instead of the literal strings `"#projects"`/`"#contact"`; the anchors themselves are left pointing at sections that don't exist yet, rather than hidden or disabled | Decided in Phase 4.5 | Typing the href against the same `NavSection["id"]` union `content/navigation.ts` already defines means a future section-id rename is a compile error here, not a silently dead link — a small, permanent architectural fit, not throwaway phase-scoping logic. Hiding/disabling the CTAs until their sections exist was considered and rejected: it would need either a client-side DOM check (new client JS, against the Phase 4.5 instruction to keep client boundaries small) or a hardcoded "not built yet" flag (the kind of special-cased temporary logic Bhanu asked not to add); a `#anchor` with nothing to scroll to is standard, harmless browser behavior, not broken navigation |
| D49 | `experienceSchema` gained `summary` (required), `highlights` (required, 1-4 items), `impact` (optional), and `tech` (optional) alongside the untouched, verbatim `bullets`; a new `aboutSchema`/`content/about.ts` holds the About narrative. `content-check.ts` cross-validates every `experience[].tech` label against `skills`/`projects`, the same rule Phase 4 built for `heroNetwork` | Decided in Phase 5 | The brief asked for "portfolio-friendly," not resume-bullet-verbatim, copy for both sections — that copy is still "personal/professional text" under CLAUDE.md §6, so it has to live in `/content` like everything else, not be composed inline inside `About.tsx`/`ExperienceThread.tsx`. Keeping `bullets` alongside the new fields (rather than replacing it) preserves the resume-fidelity source the rest of the architecture already relies on |
| D50 | Experience's career-path connector (`ExperienceThread.tsx`) is a single straight hairline vertical line with graduated `Node` size/color per role (current CSU role: crimson "live," `size="md"`; Vipany/Laxmi: gray, `size="sm"`) and graduated `Surface` treatment (CSU alone gets `accentEdge` and larger padding), rather than a bent/organic connector or a `generateWeb`-driven path | Decided in Phase 5 | The brief's "significantly transformed... not a generic vertical timeline" is satisfied through the site's own dimensional language (chamfered cards, the `Node` primitive, the crimson-live convention) and graduated visual weight communicating "growing responsibility → current," not through bending the line itself — a bent connector would need the line's curve to track each dot's exact x-position to avoid looking broken, for a subtle payoff not worth the fragility. `generateWeb` (seeded/organic, built for decorative meshes) was considered and rejected for the same reason `HeroWeb` rejected it for its 5 fixed nodes: 3 fixed points need direct per-node placement, not a generic radial/ring generator |
| D51 | The About section's decorative pipeline strand (Ingest → Validate → Transform → Trusted Output) is presentational vocabulary defined as a constant inside `About.tsx`, not a `/content` module | Decided in Phase 5 | These four words are generic architecture/pipeline vocabulary — the same class of label PLANNING.md §9.4 already treats as reusable ("stage names such as Ingest, Standardize, Validate, Reconcile, Publish"), not a fact about Bhanu personally. `about.paragraphs` was written to state all four concepts in words first (Phase 5 Step 14: a decorative visual may only be `aria-hidden` if its information already exists in text), so the strand is a restatement, not new information |
| D52 | `content-check.ts` gained an exaggerated-seniority/scale-claim rule (senior/principal/expert/architect/"lead engineer"/"industry leader"/"world-class"/"10x engineer"/revolutionary/visionary/"enterprise-grade"/petabyte/"99.9%"), enforced as an ERROR on real content only — skipped entirely for `content.example/`, whose fictional "Senior Data Engineer" title is legitimate template demo data | Decided in Phase 5 | CLAUDE.md §2 rule 3 ("do not exaggerate seniority") was previously enforced only by manual review; About and Experience are the first sections with enough new freeform prose to make an automated, word-boundary-safe check worth adding. Verified against all existing content (including "Architecting" in `projects.ts`) before shipping the rule, specifically to confirm the regexes' word boundaries don't false-positive on already-approved copy |
| D53 | The Experience section's `TechTag` chips stay non-focusable `<span>`s (Phase 3's existing behavior, reused unchanged), and role `Surface` cards' hover-tilt has no separate keyboard-triggered equivalent | Decided in Phase 5 | Both are pre-existing Phase 3/4 patterns (the Phase 3 specimen page labelled a `TechTag` "Static tag (not interactive)"; the Hero portrait's `Surface` tilt has never had a keyboard equivalent either) — extending them to Experience's cards is consistency, not a new accessibility gap. All of a role's substantive content is plain server-rendered text with no hover/focus dependency; only the depth cosmetic itself is pointer-only |
| D54 | `content-check.ts` gained project-specific structural checks (Phase 6): `metricIds` must reference a real `content/metrics.ts` id; an in-progress project may carry no `metricIds` at all (CLAUDE.md §2 rule 2); `architecture.edges` may only reference ids present in that same project's `architecture.nodes`; a `links.github` value must actually start with `https://github.com/`. One rule is CRITICAL and was deliberately tested by introducing a real violation and confirming the check caught it (then reverting) before shipping: an in-progress project's `caseStudy.milestones` may not contain any `state: "implemented"` entry — this is Phase 6 Step 5's "never present a technique as implemented simply because it's in my planned architecture" enforced in code, not left to manual review | Decided in Phase 6 | A per-field Zod schema can validate shape but not cross-references or cross-field consistency (an in-progress project quietly gaining an "implemented" milestone later); these rules make the exact mistake CLAUDE.md §2 warns against fail the build instead of shipping silently |
| D55 | Every one of the flagship lakehouse project's `caseStudy.milestones` is `state: "in-progress"` — none are `"implemented"` or `"planned"` | Decided in Phase 6 | The resume's own bullets for this project are uniformly present-progressive ("Architecting", "Implementing", "Designing", "Building") and never distinguish one sub-component as further along than another; inventing a false "this part is done, that part is only planned" breakdown would be exactly the fabrication CLAUDE.md §2 prohibits, even though the brief's own schema supports a three-way distinction. Honest content beats a schema being "fully used" |
| D56 | The project modal (`Dialog.tsx` + `ProjectModalContent.tsx`) manages focus-in and focus-restoration explicitly in JS rather than relying solely on the native `<dialog>` spec behavior | Decided in Phase 6, found by Playwright interaction QA (not reasoning about the spec alone) | `ProjectModalContent` is lazy-loaded (`next/dynamic`, `ssr: false`) specifically to keep it out of the initial JS bundle (§10.4), which means at the exact moment `showModal()` runs there is nothing focusable inside the dialog yet — the browser's default "focus the first focusable descendant" has nothing to land on. Testing showed this left focus on an unhelpful element after open, and (because the "previously focused" capture is timing-sensitive too) on `<body>` instead of the trigger link after close. Fixed by having `Dialog` capture `document.activeElement` itself before calling `showModal()` and restore it explicitly on close, and having `ProjectModalContent` focus its own Close button once it actually mounts |
| D57 | `ProjectsGrid`'s open-project state reads `location.hash` via `useSyncExternalStore`, not `useState` + a `useEffect` that calls `setState` directly in the effect body | Decided in Phase 6 | The latter is exactly the "sync to an external browser API" case `useSyncExternalStore` was designed for, and the project's ESLint config's `react-hooks/set-state-in-effect` rule flags the naive version as an error (caught during this phase, not shipped). `useSyncExternalStore`'s `getServerSnapshot` also makes the SSR-safe "always closed on first paint" behavior explicit and spec-sanctioned, rather than an artifact of effect timing |
| D58 | `Dialog` stays permanently mounted in `ProjectsGrid` (rendered once, `open` prop toggled) rather than being conditionally rendered only while a project is open | Decided in Phase 6, found by Playwright interaction QA | Conditionally mounting `<Dialog>{...}</Dialog>` only when a project was active meant React unmounted the real `<dialog>` DOM node the instant `activeProject` became `null` — before the element's own `.close()` call or 'close' event (and the focus-restoration logic subscribed to it) ever ran. A closed-but-mounted native `<dialog>` costs nothing (`display: none` via `:not([open])`, dialog.css) and lets every close path — Escape, backdrop click, the Close button — go through the same real native close lifecycle |
| D59 | Skills, Certifications, and Education each get a visibly different layout rather than the same card component reused three times: Skills is a grid of larger hub cards; Certifications a grid of smaller, quieter credential cards; Education a two-node horizontal/vertical path, not a grid at all | Decided in Phase 7 | Phase 7 Step 15's own instruction ("do not reuse exactly the same card layout three times") — differentiated by genuine content shape (5 open-ended groups vs. 5 short credentials vs. 2 chronological milestones), not an arbitrary style variation for its own sake |
| D60 | Skills' "hierarchy" (Phase 7 Step 4's "create hierarchy," Step 6's "distinguish technologies demonstrated in current work/projects") is one mechanism, not two: `getEvidencedSkills()` (`content-selectors.ts`) marks a skill as visually emphasized (a filled `TechTag`, via a new `emphasized` prop) exactly when that same label already appears in `experience[].tech` or `projects[].tech`. No separate, hand-curated "anchor technologies" list was built | Decided in Phase 7 | A hand-picked anchor list would be a second, subjective classification to keep in sync by hand as content changes; deriving emphasis from data already cross-validated elsewhere (Phase 4/5's tech-label checks) is both more defensible ("this is factually named in my experience/projects," not "I judged this more important") and structurally can't drift out of sync, satisfying Step 6's explicit "do not invent a proficiency ranking" and its "if evidence-linking would require brittle duplication, prefer simpler" caution simultaneously |
| D61 | `certifications[].kind` (`certification` / `applied-skill` / `training`) is now set on all 5 real records — previously left unset because "the resume does not classify these" | Decided in Phase 7 | Each value is read directly off the credential's own verbatim name, not inferred or invented: Oracle's two entries literally say "Certified ... Associate"; Microsoft's says "Applied Skills"; both AWS entries say "AWS Academy." Structuring a category the name already states in words isn't a new claim about the credential — it satisfies Step 11's "do not present training as a professional certification" as an enforced, visible distinction rather than an implicit one a reader has to infer from the title text |
| D62 | No new `content-check.ts` rules were added in Phase 7, despite Step 20 inviting them | Decided in Phase 7 | Every genuinely checkable new-content invariant this phase introduced was already enforced: `verifyUrl`/`credentialId` format by the existing `.url()`/`.string()` schema constraints, GPA shape by the existing `z.enum(["GPA","CGPA"])` object, and skill/tech sourcing by the existing hero-network/experience-tech cross-checks (Skills renders `content/skills.ts` directly — nothing new to cross-reference). Adding a rule with nothing new to guard against would be checkbox-driven, not "genuinely useful" (Step 20's own qualifier) |
| D63 | The GitHub/LinkedIn profile-link cards (`GithubLinks.tsx`) get an explicit `aria-label` on the wrapping `<a>` (e.g. "View GitHub Profile") instead of relying on the browser's own name-from-content computation over the card's heading + description + action-label subtree | Decided in Phase 7.5, found during accessibility QA | The subtree's computed name concatenates a heading, a full sentence, and an action label into one run-on string with no natural pauses — technically present, but not "meaningful accessible link text" (Step 12) in the sense a screen-reader user tabbing to the link would find useful. The heading element was also changed to a plain `<p>`, since a `<h3>` nested inside a link (now redundant once `aria-label` is set) is an unusual pattern not worth keeping |
| D64 | `Recommendations.tsx` returns `null` (no DOM at all) when `getApprovedRecommendations()` is empty, rather than rendering an empty `<section>` with just a heading, or a "coming soon" placeholder | Decided in Phase 7.5 | CLAUDE.md §2 rule 5 and Phase 7.5 Step 5 both require the section to not visibly exist with zero approved records; an empty-but-present landmark is its own accessibility artifact (a screen reader's landmark list would show a "Recommendations" region with nothing inside it) — `return null` is the only option that creates neither a visual gap nor a phantom landmark. The component (and `getApprovedRecommendations()`, and the schema's `approved` gate) stay fully built, so a real approved record renders correctly with zero code changes the moment one exists |
| D65 | `content/leadership.ts`'s `role` field changed from "Vice President" to "Vice President of Programming" | Decided in Phase 7.5, per Bhanu's explicit confirmation this phase | GPSA has more than one Vice President role; this is the specific title, not a new claim about scope or seniority — CLAUDE.md §2's "never invent" concern doesn't apply to a title correction supplied directly by Bhanu |
| D66 | The GitHub / Links section is a static profile-link pair only — no repository count, star count, contribution graph, or any other GitHub-sourced statistic, and no GitHub API client was added | Decided in Phase 7.5 | Phase 7.5 Step 9's explicit rule: don't claim data that isn't actually fetched. A "View GitHub Profile" link needs no API client at all (PLANNING.md §12 item 13's optional build-time repo-metadata fetch stays a Phase 12 idea, not something this phase needed); this keeps the section's JS footprint at zero and avoids a dependency with nothing this phase actually required it for |
| D67 | The `public/resume/*.pdf` line was removed from `.gitignore` and `public/resume/bhanu-resume.pdf` was committed | Decided in Phase 8, gated on a full privacy review | The public phone-number decision (decision 19) already resolved *whether* the PDF may go public; Phase 8's own Step 19 required one more explicit check before Git-tracking it — the full PDF text was read directly and compared against every already-validated content module, confirming no street address, student ID, government identifier, private account/meter number, credential, password, or third-party private contact detail is present. `reference/` stays gitignored; only this one approved PDF was untracked-then-committed |
| D68 | `<ResumeActions>` (§8.2) was not built as a separate shared component, and the resume viewer is a plain new-tab link rather than the in-app dialog originally sketched in §8.3; separately, `Header`/`MobileMenu`/`SectionRail`/`Footer` were not built in Phase 8 | Decided in Phase 8 | (1) Only `Hero.tsx` (Phase 4) and `Resume.tsx` (Phase 8) call `getResumeAsset()`, and both needed different presentation (a single CTA vs. a two-button block with metadata) — extracting a shared component now would abstract over just two call sites with no real duplication yet. (2) A custom in-app PDF dialog was explicitly ruled out by the Phase 8 brief's Step 6 ("no custom PDF viewer/iframe"); the browser's own viewer in a new tab satisfies "View Resume" without one. (3) PLANNING.md never pinned Header/MobileMenu/SectionRail/Footer to a specific phase (only a non-binding "Phase 4+" sketch existed) and the Phase 8 brief's own fallback instruction was to not expand scope in that case — the existing `content/navigation.ts` plus `getRenderableNavigation()`/`isSectionRenderable()` already correctly represent all 12 sections (including `resume`/`contact`, excluding hidden `recommendations`) with no code change required, so nav/footer UI is deferred to Phase 9 |
| D69 | No separate `SectionRail` component was built. The compact desktop nav (`inNav` sections only) plus a mobile sheet listing *every* renderable section are the whole navigation surface; sections not in the desktop bar (Leadership & Awards, GitHub / Links, Resume) are reachable there and by scrolling | Decided in Phase 9 | §9.2's original sketch used a rail specifically to reach the sections that don't fit the top bar. With the mobile sheet already listing everything, a rail would only add value on wide viewports for sections that are a few scrolls away regardless — Phase 9 Step 4's own "choose the simplest premium approach" and "do not overcrowd the header" favored the smaller surface. Revisit if a future review finds those sections genuinely hard to reach |
| D70 | The mobile navigation sheet is mounted via `createPortal(..., document.body)` rather than as a plain nested child of `<Navigation>`/`<Header>` | Decided in Phase 9, found by direct DOM inspection (not visual review) — the sheet initially rendered with `height: 1px` and no visible content | `<header>` uses `backdrop-blur-md` (`backdrop-filter`), which — like `transform` — establishes a new *containing block* for any `position: fixed` descendant per the CSS spec. The sheet's `top`/`bottom` insets were resolving against the header's own 64px box, not the viewport, collapsing its height to ~0. Portaling it to `document.body` sidesteps the containing-block issue entirely rather than working around it (e.g. by removing the header's blur, which CLAUDE.md §5 rule 5 explicitly reserves for the nav) |
| D71 | `PersonJsonLd` omits `url`, `@id`, and `image` entirely, alongside the already-locked `telephone` omission | Decided in Phase 9 | No production domain exists yet (§14.2 item 11) — a schema.org `Person.url` is conventionally the subject's own canonical page, and `image` needs an absolute URL; inventing either now would be exactly the placeholder CLAUDE.md prohibits. Both are one-line additions once a domain exists (Phase 11) |
| D72 | The Header's "Resume" link uses the neutral secondary button style (steel border, silver label), not the crimson-filled primary style PLANNING §9.2's original sketch described | Decided in Phase 9, found via a direct screenshot count of crimson elements in the Hero's own viewport | The Header is visible in the exact same viewport as the Hero on first load, and the Hero already spends its full CLAUDE.md §4 crimson budget (3 elements: the primary CTA, the live node, the portrait edge glow) — a crimson Header button would make a fourth, violating "at most three distinct crimson elements in any one viewport." The mobile sheet's own "View Resume" button stays crimson-filled: it's shown in a full-bleed overlay where the Hero (and its 3 crimson elements) isn't simultaneously visible, so the budget resets for that view |
