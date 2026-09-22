# PLANNING.md — Bhanu Nagumothu Portfolio

Living plan for the project. Permanent rules are in [CLAUDE.md](CLAUDE.md). This document changes as phases complete and decisions are made.

**Status:** Phase 0 (planning) approved with amendments; decisions locked in §0 (plan v2). **Phase 1 (foundation) is complete** (see §11): local Git repo, Next.js scaffold, folder structure, content skeleton, and assets. **Phase 1.5** locked the public contact values and corrected the phone policy (§0, decisions 13 to 19) and corrected the Git author identity (D28). **Phase 2 (validated content architecture) is complete** (see §11): Zod schemas as the single source of shape for `/content` (§7.2), `npm run content:check` and `npm run resume:check` (§7.3, §8.2), the centralized resume helper, typed content selectors, and `content.example/`. No design or visual sections exist yet. Nothing has been pushed or deployed. Pushing still requires Bhanu's explicit approval (Phase 11). Phase 3 begins only on Bhanu's explicit go-ahead.

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

### 5.1 Color tokens

Values proposed for approval. Contrast ratios below were computed (WCAG relative luminance), not estimated.

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

**Crimson budget (~8%):** primary CTA, the one live node/strand, active nav marker, focus-ring accent, selected-state indicators, the "in progress" badge, and the **restrained portrait edge/glow** (decision 6). At most **three** distinct crimson elements in one viewport and none a large fill; in the hero that is typically the primary CTA, the portrait edge, and the single live node. Glows are static; only the live node may pulse.

**Surfaces, metals, lighting**
- Metallic type gradient: off-white → mist → silver → steel-500 (top to bottom), with a narrow off-white specular band.
- Panels: graphite gradient (top-left `#191C21` → bottom-right `#111317`) with a 1 px `steel-700` border and a 1 px inner top highlight at low alpha. No glass blur.
- Shadows: layered, long, low-alpha black; light direction fixed top-left everywhere for consistency.
- Grain: one static noise texture (tiny, cached) at ≤ 5% for cinematic depth.

### 5.2 Typography (families confirmed in Phase 1 with a specimen page)

| Role | Proposal | Notes |
|---|---|---|
| Display (hero name, section titles) | Bricolage Grotesque (variable, width/optical-size axes) | Heavy, slightly condensed weights extrude well; alternatives to test: Sora, Unbounded, Big Shoulders Display |
| Body/UI | Inter | Neutral, excellent legibility |
| Mono (labels, tech tags, metrics captions) | JetBrains Mono | Technical voice |

Fluid type with `clamp()`. Hero name ≈ `clamp(3rem, 11vw, 9rem)` stacked on two lines. Body 16–18 px, line-height 1.6–1.7. 12 px minimum for any meaningful text. Numerals in metrics are tabular.

### 5.3 Layout and spacing

- 12-column grid, max content width 1200 px, 16/24/32 px gutters by breakpoint. Section vertical rhythm 96–160 px desktop, 64–96 px mobile.
- Breakpoints: 360 (min), 640, 768, 1024, 1280, 1536+.
- Angular language: 45° and 60° chamfers via `clip-path` on frames and buttons (a nod to mask geometry). Radii otherwise small (2–6 px). No pills.
- Section headers: mono index label, display title, one-sentence lede, a thin strand drawn from the label into the section.

### 5.4 The web geometry system

A pure, seeded generator `generateWeb({ radials, rings, sag, jitter, seed, size })` returns SVG path data and node coordinates.
- Radial spokes from a hub; concentric rings drawn as slightly sagging arcs (catenary-style curvature toward the hub) rather than perfect polygons, which is what makes it read as a web, not a target.
- Deterministic so SSR and client match; snapshot-tested.
- Variants: **hero web** (large, cropped, three parallax layers), **corner wedge** (card and section ornaments), **thread** (a single vertical strand for the timeline and section rail), **architecture graph** (nodes/edges from project data laid out on a web-like radial or layered arrangement).
- Every strand can carry a data label; nodes come from real content (technology names, pipeline stages), never invented labels.
- **Originality (decision 12):** the geometry is generated by our own code. No imported spider/web vector art, no traced character silhouettes, no film or comic artwork, no logos or emblems. Mask-eye angular shapes, when used, are abstract chamfered polygons, not a recognizable emblem.

### 5.5 Component styling principles

- Buttons: chamfered rectangle; primary = crimson-600 fill with off-white label and a top specular highlight; secondary = steel border, silver label, off-white on hover; tertiary = text with an underline strand.
- Focus ring: 2 px off-white outer, 2 px void gap, crimson-500 inner accent.
- Tags: mono, 12 px, steel border, no fill; hover raises to steel-900.
- Cards: graphite panel, web-corner ornament, depth layers for tilt (§6).
- Portrait frame: back plate, chamfered graphite frame, grayscale image, tone-down overlay, thin static crimson edge (§4).

---

## 6. Animation and 3D interaction

### 6.1 Principles
1. **Depth over movement.** Sense of dimension from layering, light, and shadow; motion is short and purposeful.
2. **Budgeted.** Compositor-only properties; ≤ 1 continuous ambient loop; pause off-screen; no animated blur or backdrop-filter (CLAUDE.md §5).
3. **Gated.** Pointer effects only for fine pointers; reduced-motion gives a complete static experience.
4. **Cheap by default.** CSS first; Framer Motion (`LazyMotion`, `domAnimation`) where orchestration or layout transitions are needed.

### 6.2 Effect catalog

| Effect | Technique | Cost / limits |
|---|---|---|
| **Dimensional hero name** | Real `<h1>` text on top of 6–10 stacked decorative duplicates offset along Z (or a layered `text-shadow` extrusion) with a metallic gradient face; specular band follows the pointer via CSS variables | Static extrusion is free; pointer tilt ≤ ±5° via rAF; duplicates are `aria-hidden` |
| **Hero web layers** | Three SVG layers (far/mid/near) with different parallax factors 0.2 / 0.5 / 0.8, moved by transform on pointer and lightly on scroll | Transform only; disabled for reduced-motion and touch |
| **Web "unfurl" on load** | One-time stroke-dashoffset draw, ~1.2 s, then static | Runs once |
| **Live node** | The single crimson node pulses gently (scale/opacity) as the only ambient loop | Pauses off-screen and on hidden tab |
| **Cursor light** | One radial-gradient element translated to the pointer (transform only) | Fine pointers only; lerped in rAF |
| **Project cards** | `perspective(1000px)`, rotateX/Y ≤ ±8°, children at `translateZ` (title 30 px, tags 20 px, ornament 10 px), specular highlight follows the pointer, shadow shifts opposite the tilt | rAF plus CSS vars; keyboard `:focus-visible` triggers the same lighting; touch gets static depth |
| **Modal transitions** | Card-to-modal shared-element (`layoutId`) or a simple scale/opacity rise; backdrop fade | Radix handles focus; transitions omitted in reduced-motion |
| **Reveal on scroll** | Small translate+fade, once per element, IntersectionObserver | Server-visible defaults; instant under reduced-motion |
| **Proof-strip count-up** | Number tween once when visible | Static under reduced-motion; final value is in the DOM from the start (screen readers read the real number) |
| **Section rail** | Vertical thread with a node per section, active node crimson, progress via transform | Passive IntersectionObserver |
| **Skills constellation** | Hover/focus on a category hub lights its strands and nodes | Highlight via opacity/stroke color; text list is the source of truth |

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
};
```

### 8.2 One helper, one component
- **`src/lib/resume.ts` (IMPLEMENTED, Phase 2):** server-side, reads the file's stats and a short SHA-256 content hash and returns `{ viewHref, downloadHref, downloadName, title, label, inlineViewer, updatedAt, sizeLabel, available }`. The hash is appended as `?v=<hash>` so browsers and CDNs never serve a stale copy after a replacement, with no manual version bump. If the file is missing, `available: false` (no dead links) — callers must check this before rendering View/Download controls.
- **`<ResumeActions>` (not built — Phase 8):** the only component that will render View/Download, used by the nav, hero, resume section, contact section, and footer. Phase 2 deliberately stops at the data helper; no UI yet.

### 8.3 Viewing and downloading
- **View (desktop):** dialog with the PDF in an `<object>`; the viewer mounts only when opened (lazy). A visible "Open in new tab" fallback link is always present.
- **View (touch/small screens):** opens the PDF in a new tab, because inline PDF rendering on mobile browsers is unreliable.
- **Download:** same-origin `<a href download="Bhanu-Nagumothu-Resume.pdf">`, so the saved filename is friendly and stable regardless of the source filename.
- **Headers:** `next.config` sets `Cache-Control: public, max-age=0, must-revalidate` for `/resume/*` on hosts that honor it; the hash query covers hosts that don't.

### 8.4 Update workflow (documented in README)
1. Export the new PDF.
2. Overwrite `public/resume/bhanu-resume.pdf` (same name).
3. Run `npm run resume:check` — IMPLEMENTED (Phase 2): confirms the file exists, starts with `%PDF-`, matches the locked public path, and that nothing hardcodes a second resume path; reports (informationally) whether it has a text layer and whether that text layer contains the approved phone number. **Not implemented: a maximum-size check.** Not required by any locked decision; add one later if a real oversized PDF becomes a problem.
4. Commit as `chore(resume): update resume` and deploy.

`docs/CUSTOMIZING.md` (Phase 10) will repeat this workflow for template users.

No component edits. No config edits, unless Bhanu wants a human-readable `label` (or, in the unlikely event the path itself must change, the single `file` field in `content/resume.ts`). Older versions stay in git history; nothing versioned sits in `public/`.

### 8.5 Privacy note (decisions 10 and 19)
- The **website** shows the phone number only in the Contact section, as a `tel:` link (decision 19). It does not appear in the hero, navigation, footer, page metadata, Open Graph data, or structured data.
- The **public resume PDF may keep** the phone number (decision 19). The architecture is indifferent to which edition is used: whichever PDF Bhanu chooses is simply placed at `public/resume/bhanu-resume.pdf`, and nothing else changes.
- **Git gate (updated):** the phone-number question that kept the PDF out of Git is resolved, so the PDF may be committed. It stays gitignored (D24) until Bhanu asks for it to be committed; then the single `public/resume/*.pdf` line in `.gitignore` is removed. Committing is separate from pushing, and **no push happens before the Git author identity is corrected (D28)**. Whatever is in `public/resume/` becomes public once the repository is pushed or the site is deployed.
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
| 1 | **Hero** | Identity, positioning, first impression | `site`, `socials`, `resume`, `metrics` | `<h1>` "Bhanudeepak Nagumothu" as stacked dimensional type. Lead statement, verbatim and approved: *"Data Engineer building reliable cloud data platforms, pipelines, and automation that turn operational data into trusted systems."* Small mono eyebrow with the location. CTAs: View Projects (primary), View Resume, Download Resume. Quiet icon links for email and LinkedIn. Hero web whose nodes are real technologies from the resume (Sources, ADLS Gen2, Delta Lake, Databricks, Power BI) around the framed portrait root node. **Proof strip band** at the foot (below). | Statement **approved**; eyebrow/CTA microcopy finalized in Phase 4 |
| 1 (band) | **Proof strip** | Immediate credibility | `metrics` | 4–5 mono-labeled figures: 20+ campus buildings; 170+ monthly bill-related items; 6,854+ records validated; ~3 workdays to 5 minutes; ~1 hour to under 2 minutes (97%). Each carries a `source` note in content. No seniority or scale claims added. | Ready (from resume) |
| 2 | **About** | Human summary and current focus | `site`, resume summary | Short first-person text that uses "Bhanu" naturally ("I'm Bhanu…") while the full name stays prominent elsewhere; quick facts (location, M.S. status "expected Dec 2026", focus stack); a "Now" line: building the CSU Utilities lakehouse (in progress). No second large portrait. | Drafted from the resume only; Bhanu reviews wording. Personal extras optional |
| 3 | **Experience** | Career story | `experience` | Vertical thread with nodes; current role expanded and marked live; older roles as native `<details>`, so no JS is required and all text stays in the DOM. Real titles only. | Ready |
| 4 | **Projects** | Depth and technical credibility | `projects` | Flagship lakehouse card large; two automation cards below; 3D tilt; "In progress" badge on the lakehouse; one key metric per card where the resume has one; opens the project modal (§9.4). **No screenshots. Visuals are custom sanitized architecture diagrams.** | Text ready; project links omitted until Bhanu supplies approved ones |
| 5 | **Skills / Tech Stack** | Technical proof, scannable | `skills` | Five resume groups as a constellation: category hubs, skill nodes; the semantic list is the source and the graph is enhancement; **no proficiency bars or percentages** (the resume gives none) | Ready |
| 6 | **Certifications** | Credentials | `certifications` | Cards grouped by issuer under "Certifications & Training" (the resume's own heading). Each shows **name and issuer only** unless real values are supplied. **IDs, verification URLs, issue dates, and badges appear only if provided; otherwise omitted with no placeholders** (decision 8). | Names and issuers ready; everything else optional |
| 7 | **Education** | Academic background | `education` | Two entries; M.S. marked "Expected Dec 2026" | Ready |
| 8 | **Leadership & Awards** | Character and recognition | `leadership`, `awards` | GPSA Vice President entry; two scholarships (amounts as on the resume unless Bhanu prefers otherwise) | Ready; more GPSA detail optional |
| 9 | **Recommendations** | Social proof | `recommendations` | Quote cards from **approved** records only. **Automatically hidden when no approved records exist.** Never fabricated, edited, or excerpted-and-altered. | Hidden at launch; real text arrives later |
| 10 | **GitHub / Links** | Code presence | `socials` | **Launch state:** compact profile card for the GitHub profile URL and LinkedIn URL that appear on the resume. **Deferred (decision 9):** featured repositories, repo metadata fetching, and any "view source" link for this portfolio, all added only after Bhanu confirms the repository and approved project links. The featured-repos block is hidden while its data is empty. **No invented repository URLs.** | Profile and LinkedIn ready; repos later |
| 11 | **Resume** | Easy access to the document | `resume` | Preview card with View/Download (`<ResumeActions>`), "Last updated" from the file, plain-text summary for ATS/no-JS. All actions read the single config (§8). | Ready (architecture in §8) |
| 12 | **Contact** | Convert interest to conversation | `site`, `socials` | **Email (with copy button), phone (a `tel:` link), and LinkedIn**, plus location. Conversational lead-in using "Bhanu". Optional third-party form endpoint via env var, off by default. **The phone number appears in this section and nowhere else on the site** (decision 19). | Email, phone, LinkedIn, and GitHub URLs confirmed (Phase 1.5) |
| – | **Footer** | Wayfinding, legal | all | Full name, section links, email and LinkedIn, resume, "last updated", MIT/content notice, back to top | Ready |

### 9.4 Project modal
Header (title, status, period), overview, a **custom, sanitized architecture diagram** rendered from `architecture` data, "What I built" bullets (resume facts only), technologies, measurable impact (resume metrics only), and previous/next project controls. GitHub/demo links appear only if Bhanu supplies real, approved ones; otherwise they are omitted. Dialog semantics per CLAUDE.md §8; state synced to the URL hash (`#project=csu-lakehouse`) so Back closes it and links are shareable.

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
   │  ├─ layout.tsx  page.tsx  globals.css  not-found.tsx
   │  ├─ sitemap.ts  robots.ts  opengraph-image.tsx  icon.svg
   │  └─ (dev)/design/page.tsx    # design-system specimen; notFound() in production
   ├─ components/                 # not started — Phase 3+
   │  ├─ ui/                      # shadcn primitives themed to tokens; content-agnostic
   │  ├─ layout/                  # Header, MobileMenu, SectionRail, Footer, SectionShell, SkipLink
   │  ├─ sections/                # Hero, ProofStrip, About, Experience, Projects, Skills, ...
   │  ├─ web/                     # SpiderWeb, WebLayer, ArchitectureGraph, Thread, SkillConstellation
   │  ├─ motion/                  # MotionProvider, Reveal, TiltSurface, ParallaxLayer, CursorLight, CountUp
   │  ├─ project/                 # ProjectCard, ProjectModal
   │  └─ resume/                  # ResumeActions, ResumeViewer
   ├─ hooks/                      # usePointerFine, useReducedMotion, useActiveSection, useHashState, useInView — Phase 3+
   ├─ lib/                        # content.ts (gateway), content-selectors.ts, resume.ts, needs-input.ts, ui-strings.ts — BUILT (Phase 1/2); web-geometry.ts, cn.ts, seo.ts — later
   ├─ schemas/content.ts          # Zod schemas — the single source of shape — BUILT (Phase 2)
   ├─ styles/                     # tokens.css, depth.css (extrusion, specular), web.css — Phase 3
   └─ types/content.ts            # types inferred from src/schemas/content.ts — BUILT (Phase 1, rebuilt schema-first in Phase 2)
```

### 10.2 Boundaries
`ui/` knows nothing about Bhanu. `sections/` compose `ui/` and read data through `lib/content.ts`. `web/` and `motion/` are content-agnostic and take data via props. `content/` imports only types.

### 10.3 Component inventory

| Group | Components | Notes |
|---|---|---|
| Primitives (`ui/`) | Button, Badge/Tag, Card, Dialog, Sheet, Tooltip, Separator, VisuallyHidden | shadcn (Radix), restyled to tokens |
| Layout | Header, MobileMenu, SectionRail, SectionShell, Footer, SkipLink | `SectionShell` renders `<section aria-labelledby>`, index label, title, lede |
| Web geometry | `SpiderWeb`, `WebLayer` (parallax wrapper), `Thread`, `ArchitectureGraph`, `SkillConstellation` | all driven by the seeded generator |
| Motion | `MotionProvider` (LazyMotion), `Reveal`, `TiltSurface`, `ParallaxLayer`, `CursorLight`, `CountUp` | each no-ops under reduced-motion or coarse pointer |
| Sections (in locked page order) | Hero (with ProofStrip band), About, ExperienceTimeline, ProjectsShowcase, Skills, Certifications, Education, LeadershipAwards, Recommendations, GithubLinks, ResumeSection, Contact | each renders nothing if its data is empty; order comes from `content/navigation.ts` |
| Project | ProjectCard, ProjectModal | modal code-split via `next/dynamic` |
| Resume | ResumeActions, ResumeViewer | see §8 |
| Dev-only | Design specimen page | not in production |

### 10.4 Tooling
npm; TypeScript strict; ESLint with `jsx-a11y`; Prettier; Zod 4.6.5 (**installed, Phase 2**); tsx 4.23.15 (**installed, Phase 2** — runs `content:check`/`resume:check`, never imported by the app); Vitest for unit tests (web generator determinism, content selectors); Playwright plus axe for e2e/a11y; Lighthouse CI budgets; GitHub Actions. Exact versions pinned at install (including Next.js, Tailwind 4, and the `motion` package that Framer Motion now ships under).

---

## 11. Development phases

Each phase ends with a summary, a verification list, open questions, and an approval gate.

| Phase | Name | Deliverables | Acceptance |
|---|---|---|---|
| **0** | Study and planning | CLAUDE.md, PLANNING.md (v2, decisions locked in §0) | **Approved with amendments.** Implementation not started; Phase 1 awaits Bhanu's explicit go-ahead (**current gate**) |
| **1** | Foundation (**complete**) | `.gitignore` first (incl. `reference/`); local `git init` (no remote); Next.js 16.3.5 + TS strict + Tailwind 4 + ESLint via npm; foundation folders; typed content skeleton (`content/*`, `src/types/content.ts`, `needsInput` helper, `@/lib/content` gateway); ESLint import-boundary rules; resume PDF and portrait copied into `public/`; minimal home page; README stub | Lint, typecheck, and build pass; dev server verified with Playwright; `reference/` untracked. **Moved out of Phase 1 by Bhanu's narrower scope:** tokens, `next/font` fonts, shadcn init, Prettier, type-specimen/palette page, base layout and skip link move to Phase 3; Zod moves to Phase 2; MIT license moves to Phase 10 |
| **2** | Content layer (**complete**) | Zod schemas as the single source of shape (`src/schemas/content.ts`); types inferred from them (`src/types/content.ts`); `npm run content:check` (shape + safety/privacy rules, human-readable, exit-code gated); the resume helper (`src/lib/resume.ts`) and `npm run resume:check`; typed content selectors (`src/lib/content-selectors.ts`); `content.example/` — a complete, structurally valid, entirely fictional mirror of `content/` | Lint, typecheck, `content:check` (both real and `--example`), `resume:check`, and build all pass; the validator was proven to fail on 4 deliberately introduced violations (malformed email, invalid URL, duplicate phone literal, a `reference/` path), each reverted afterward; dev server verified with Playwright — no leaked content, no new console errors. **Not built this phase (moved later, none required by Phase 2's own brief):** `<ResumeActions>` and any other UI (Phase 8); a `content:check` CI workflow (Phase 10); `npm run template:init` (Phase 10); a resume max-size check (no locked decision requires one) |
| **3** | Design system and primitives | UI primitives, Header/MobileMenu/SectionRail/Footer/SectionShell, motion providers and hooks, `generateWeb` plus tests, depth CSS | Keyboard-complete shell; reduced-motion verified; specimen page |
| **4** | Hero and proof strip | Dimensional name, approved positioning statement (verbatim), hero web layers, framed grayscale portrait root node with crimson edge (CSS only, source untouched), CTAs, email/LinkedIn quick links, proof strip band | Visual review with Bhanu (including portrait treatment and composition); LCP/CLS targets on hero |
| **5** | About and Experience | About (uses "Bhanu" naturally, full name stays prominent), Experience thread with native disclosure | Content matches resume exactly; no seniority inflation |
| **6** | Projects | Cards (tilt), modal, **custom sanitized architecture diagrams**, hash routing | Modal a11y test (focus, Esc, return, Back) passes; only resume-based content; a review confirms no CSU/vendor/bill/account/meter/operational data anywhere |
| **7** | Remaining sections, in page order | Skills / Tech Stack, Certifications (name and issuer; optional fields omitted cleanly), Education, Leadership & Awards, Recommendations (**hidden until approved records exist**), GitHub / Links (**profile and LinkedIn links only**; featured-repo block hidden) | Each section self-hides when empty; no placeholders anywhere; no invented URLs |
| **8** | Resume and contact | Resume section, viewer, Contact block (email, phone via `tel:` link, and LinkedIn), footer | Resume update workflow verified end to end (replace only the PDF); the phone number appears only inside the Contact section (hero, nav, footer, metadata, and JSON-LD contain none) |
| **9** | Polish and quality | Motion tuning, responsive QA (360/768/1280/1920), axe + keyboard + screen-reader pass, Lighthouse budgets, SEO/OG/JSON-LD/sitemap | All CLAUDE.md §8 targets met |
| **10** | Repo release | README, CUSTOMIZING/DEPLOYING/ARCHITECTURE/ASSETS docs, CONTENT-NOTICE, `.env.example`, CI, `content.example` complete, history review (no third-party or CSU material, no secrets, no unapproved resume PDF) | Fresh clone builds with zero env vars; presentation code contains no Bhanu-specific strings |
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
