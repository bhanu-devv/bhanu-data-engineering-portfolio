# CLAUDE.md — Permanent Project Rules

Portfolio website for **Bhanudeepak "Bhanu" Nagumothu**, Data Engineer.
Theme: **Premium Grayscale Spider-Inspired 3D Data Engineering Portfolio.**

This file is loaded every session. It holds the rules that do not change. The evolving plan, section specs, component list, and open questions live in [PLANNING.md](PLANNING.md). If the two ever disagree, this file wins for rules; PLANNING.md wins for the current phase and status.

---

## 1. Status and working agreements

- **Current status:** planning approved with amendments (decisions locked in the table below and in PLANNING.md §0). **Phase 1 (foundation) and Phase 1.5 (contact values, Git identity) are complete.** **Phase 2 (validated content architecture) is complete:** Zod schemas as the single source of shape for `/content`, `npm run content:check` and `npm run resume:check`, the centralized resume helper (`src/lib/resume.ts`), typed content selectors (`src/lib/content-selectors.ts`), and `content.example/` (a fictional, structurally complete template). **Phase 3 (visual foundation) is complete:** design tokens (`src/styles/tokens.css`, Tailwind v4 `@theme`), the type system (§4), the surface/depth system (`src/styles/depth.css`), the original web/network geometry generator and its components (`src/components/web/`), the motion foundation (`src/hooks/`, `src/components/ui/Reveal.tsx`), and foundational UI primitives (`src/components/ui/`). **Phase 4 (Hero and proof strip) is complete:** `src/app/page.tsx` now renders the real Hero (`src/components/sections/Hero.tsx`) — the temporary Phase 3 design-system specimen it held is fully removed. **Phase 5 (About and Experience) is complete:** `About.tsx` (a synthesized narrative, not the resume summary pasted in, plus a quiet decorative pipeline strand) and `Experience.tsx`/`ExperienceThread.tsx` (a career-path connector, current role first) now follow the Hero on the homepage. **Phase 6 (Projects) is complete:** `Projects.tsx` renders three project cards (the flagship lakehouse spanning full width) with a native-`<dialog>`-based, hash-synced case-study modal (`src/components/ui/Dialog.tsx`, `ProjectModalContent.tsx`, lazy-loaded); the flagship's in-progress status and its case-study `milestones` are honestly all `state: "in-progress"` (CLAUDE.md §2 rule 2), never upgraded to "implemented." **Phase 7 (Skills, Certifications, Education) is complete:** `Skills.tsx` (5 hub cards; a skill also named in Experience/Projects renders as a filled tag via `getEvidencedSkills()`, a factual distinction, never a proficiency rating), `Certifications.tsx` (compact credential nodes, each labeled Certification/Applied Skill/Training — read from the credential's own verbatim name, never invented), `Education.tsx` (a two-node chronological path). **Phase 7.5 (Leadership & Awards, Recommendations, GitHub / Links) is complete:** `LeadershipAwards.tsx`, `GithubLinks.tsx` (static "View GitHub/LinkedIn Profile" links only — no repo/star/activity stats, none are fetched), and `Recommendations.tsx`, which `return`s `null` — not an empty section — since `content/recommendations.ts` is still empty; it is entirely absent from the rendered page until a real, approved record exists. **Phase 8 (Resume and Contact) is complete:** `Resume.tsx` (a standalone summary card, distinct wording from the Hero's positioning statement, plus View/Download actions reading `getResumeAsset()`) and `Contact.tsx` (a single closing Surface with a live `Node`, the email as the primary `mailto:` action, phone as a `tel:` link, and quiet LinkedIn/GitHub links — no contact form, no client JS); `public/resume/bhanu-resume.pdf` is now Git-tracked after a full privacy review confirmed it contains only already-approved public facts (PLANNING.md §15 D67). Header/MobileMenu/SectionRail/Footer were **not** built in Phase 8 — deferred to Phase 9 (PLANNING.md §15 D68); the existing `getRenderableNavigation()` already represents the complete section set. The homepage now renders all 12 sections. **Phase 9 (polish and launch prep) is complete:** `Header.tsx`/`Navigation.tsx`/`Footer.tsx` are now built (a sticky header, a compact desktop nav plus a full mobile sheet mounted via `createPortal` to avoid the header's `backdrop-filter` containing-block trap — PLANNING.md §15 D70; no separate section rail — D69); production metadata was expanded (title template, robots, Open Graph/Twitter, a code-generated `opengraph-image.tsx`, and `PersonJsonLd` structured data that deliberately omits `url`/`image`/`telephone` until a production domain exists — D71); a branded `not-found.tsx` was added; the README was expanded into a full public-repo README, and `LICENSE` (MIT) plus `CONTENT-NOTICE.md` were added. Real Playwright-MCP QA (not the Claude_Browser substitute used in earlier phases) found and fixed two real bugs: a 768px header-crowding overflow, and a crimson-budget violation (the header's Resume link was crimson-filled, pushing the Hero's own viewport over the 3-element cap — D72). **Phase 9.5 (cinematic experience upgrade) is complete:** `Intro.tsx` (`src/components/intro/`) is a one-time cinematic opening layered on top of the finished Phase 9 site — nothing from Phase 9 was rebuilt or removed. Name/role/"Connect" → a small network (the same 5 curated `heroNetwork` technologies `HeroWeb` already uses, same angles) forms via staggered opacity/transform → the overlay crossfades away, revealing the already-rendered Header/Hero underneath (matching geometry + crossfade, not a literal DOM morph — PLANNING.md §15 D73). Shown once per browser session (`sessionStorage`), entirely skipped (never mounted) for `prefers-reduced-motion: reduce`, a meaningful deep-link hash, or a same-session return visit; a real, keyboard-accessible "Skip intro" control; total duration ≈1.1s. Two real bugs were found and fixed during implementation: a `stroke-dasharray`/`stroke-dashoffset` draw-in didn't reliably hide against a `preserveAspectRatio="none"` container (fixed by using opacity instead — D74), and marking the session "seen" at click-time raced with `useSyncExternalStore`'s re-invocation of `getSnapshot`, killing the animation before it could play (fixed by caching the decision once computed — D75). JS transfer +1,987 bytes over the Phase 9 baseline (146,951 vs. 144,964 bytes), no new dependency. **Phase 9.6 (content depth, credibility & scannability) is complete:** Experience and Leadership now follow the same scroll-for-overview/click-for-depth principle Projects established — each collapsed card shows only `summary` + one impact/scope line + tech, with the same already-approved `bullets` reorganized into readable `expanded` groups behind a native `<details>`/`<summary>` disclosure (zero new dependency, zero new client JS — PLANNING.md §15 D76/D77). The Hero proof strip's first item now reads "Azure Utility Data Platform" (still exactly four items — D83), and the flagship project's status badge now reads "Current Build" instead of "In Progress" (the underlying `status` enum is untouched — D84). **LinkedIn was used for the first time this phase, as an explicitly approved ADDITIONAL source, never authoritative over the existing validated resume/portfolio value on conflict** — GPSA leadership gained real event/scope detail (Graduate Gala Night, WhirlyBall, 100+ graduate students) with its dates deliberately left unchanged (D78); the Recommendations section now renders for the first time on the real site, with one real, approved manager recommendation from Joseph Minerd (verbatim `quote`, a literal-substring `excerpt`, and a clearly-labeled `summary` — D79); ENERGY STAR gained a confirmed GitHub link while Steam Bill Automation's stayed intentionally unset, no guessed URL (D80); both Oracle credentials gained real official verification links (D81). Every LinkedIn-vs-master conflict found (CSU/GPSA start dates, the master's program name, the 6,540-vs-6,854+ utility-record count) was left unresolved exactly as instructed — see D85. Real Playwright-MCP QA verified every disclosure by keyboard and mouse, the recommendation's exact 591-character match against the approved source, both Oracle URLs and the ENERGY STAR GitHub URL character-for-character, and full Phase 9/9.5 regression intact; JS transfer is effectively flat (+50 bytes). **Phase 9.7 (ambient motion and interaction polish) is complete:** a soft pointer-following light (`CursorGlow.tsx`, `src/components/effects/`) — gated to `pointer:fine` + no-reduced-motion, rendering `null` entirely otherwise, writing CSS custom properties inside `requestAnimationFrame` exactly like the existing `useTilt` hook does, never triggering a React re-render. A static (no continuous loop) `NetworkMesh` backdrop was added to Projects/Skills/Contact, reusing the same primitive `HeroWeb` already uses rather than building a new one (PLANNING.md §15 D86); two real bugs were found and fixed during implementation — a negative `z-index` painted the backdrop fully behind the page's own background (D87), and an initial opacity value was technically correct but visually imperceptible (D88). Project cards and Skills hub cards gained a quiet `:hover`/`:focus-within` crimson border response with keyboard focus receiving the identical treatment as mouse hover; the project case-study architecture diagram's connectors now activate once when the modal opens. JS transfer +246 bytes over the Phase 9.6 baseline (147,247 vs. 147,001 bytes), no dependency added. **Phase 11 (publish) is complete, with Bhanu's explicit approval:** only `main` is pushed to the public repo `bhanu-devv/bhanu-data-engineering-portfolio`, and the site is deployed on Vercel at `https://bhanu-data-engineering-portfolio.vercel.app` (no custom domain). That URL is set once as `site.seo.url` and every canonical/OG/JSON-LD/robots/sitemap URL derives from it via `getSiteUrl()`. The rejected Phase 10 experiment (`phase-10-signature-experiment` branch plus its stash) stays local only and must never be pushed or merged. A custom domain, analytics, and Vercel's GitHub auto-deploy integration each still require Bhanu's separate approval. The active phase is tracked in PLANNING.md §11.
- **Work in phases, stop at each gate.** Finish the phase, summarize what changed, list what is still needed from Bhanu, then wait for approval before starting the next phase.
- **Never do these without explicit approval in chat for that specific action:** `git init` on a remote, pushing anywhere, creating a GitHub repo, connecting GitHub or fetching from the GitHub API, deploying, publishing an artifact, buying/pointing a domain, adding analytics, installing a dependency not already listed in §7.
- **Locked decisions may be changed only with Bhanu's explicit approval.** If a task seems to require breaking one, stop and ask.

### Locked decisions (approved by Bhanu)

| # | Decision | Where the detail lives |
|---|---|---|
| 1 | **Section order:** Hero, About, Experience, Projects, Skills / Tech Stack, Certifications, Education, Leadership & Awards, Recommendations, GitHub / Links, Resume, Contact. Intent: identity first, then professional credibility, then technical proof. | §6; PLANNING §9 |
| 2 | **Name:** display "Bhanudeepak Nagumothu" prominently; short name "Bhanu" for conversational/supporting copy. | §2 rule 10 |
| 3 | **Hero positioning (exact):** "Data Engineer building reliable cloud data platforms, pipelines, and automation that turn operational data into trusted systems." No exaggerated seniority, no invented claims. | §2 rule 3 |
| 4 | **Public contact:** email, phone, and LinkedIn (plus the GitHub profile link on the resume). **Bhanu approved showing the phone number publicly, only in the Contact section,** and it may remain in the downloadable resume. *(Revised in the Phase 1.5 correction; the original decision was "no phone".)* | §2 rule 8 |
| 5 | **CSU / employer data:** describe the CSU projects only with information already in the resume; publish no internal files, vendor documents, bills, account numbers, meter identifiers, operational screenshots, or confidential information. Architecture visuals are custom, sanitized diagrams. | §2 rules 6 and 9 |
| 6 | **Portrait:** use the current 400×400 image; grayscale by default, subtle depth, dimensional frame, restrained deep-crimson edge/glow; CSS treatment; source file never edited; no replacement portrait generated. | §4 |
| 7 | **Recommendations:** data-driven, hidden automatically until approved records exist; never fabricated. | §2 rule 5 |
| 8 | **Certifications:** never invent IDs, verification URLs, or issue dates; omit unsupplied values cleanly (no placeholders on the live site). | §2 rule 4 |
| 9 | **GitHub:** integration and featured repositories come later, after the repository and approved project links are confirmed; never invent repository URLs. | §2 rule 4; PLANNING §9, §11 |
| 10 | **Resume:** single stable path `/resume/bhanu-resume.pdf`, one central config module controls View and Download; replacing the resume means replacing the PDF (or editing one config source). The PDF may keep its phone number (decided in the Phase 1.5 correction). | §6; PLANNING §8 |
| 11 | **Reusability:** public reusable template; Bhanu-specific content strictly separated from reusable presentation logic. | §6, §9 |
| 12 | **Visual concept:** "The Web Is the Pipeline" (spider web → network graph → pipeline → connected data systems), sophisticated, abstract, professional, cinematic. No Marvel/Spider-Man logos, film artwork, copyrighted character illustrations, or fan-site aesthetics. | §4 |
| 13 | **Public contact values (Phase 1.5):** the public professional email and the approved public phone number are set once in `content/site.ts` (`contact.email`, `contact.phone`); the LinkedIn and GitHub profile URLs are set in `content/socials.ts`. The phone appears only in the Contact section. The public resume PDF may contain the phone number. | §2 rule 8; PLANNING §0 |
- **Ask before deciding when a choice belongs to Bhanu** (what to publish about their employer, contact details, wording of claims about themself). Decide alone on purely technical choices and note the decision.
- **Commits:** small, one concern each, Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `style:`, `test:`). Commit only when asked. Never commit `reference/`, `.env*` (except `.env.example`), `.DS_Store`, or anything containing secrets or another person's data. **Commit author and committer must be Bhanu's GitHub noreply address, never a personal email.** This repo's local `user.name` and `user.email` are set to that address, and the initial commit was amended to use it (PLANNING.md D28); do not change them to a personal address. Before any push, verify with `git log --format='%an <%ae> | %cn <%ce>'`, and advise enabling GitHub's "Block command line pushes that expose my email" setting. No reflog purge is required (local reflog data is never pushed). **Commit messages in this repository carry no `Co-Authored-By` trailer** — Bhanu asked for sole authorship of this repo's history; this overrides the harness's default attribution guidance for every commit here, not just the one it was first raised about.
- **Do not modify files in `reference/`.** They are read-only development material.

## 2. Content accuracy (highest-priority rule)

The resume is the single source of truth for professional facts. Currently that is `reference/Bhanu_Resume.pdf`; once the app exists, the live copy is `public/resume/bhanu-resume.pdf`.

**Never invent** jobs, titles, dates, metrics, technologies, certifications, credential IDs, degrees, awards, project results, recommendations, quotes, GitHub repositories, or links.

Specific rules:

1. **Every metric must trace to the resume.** Store it once in `content/` with a `source` note. Do not derive new percentages or rephrase numbers to sound bigger. Keep qualifiers: "approximately 3 workdays to 5 minutes", "6,854+ records", "20+ campus buildings".
2. **Respect tense and status.** The CSU Utilities Lakehouse project is written in the present progressive in the resume ("Architecting", "Implementing", "Building"). Present it as **in progress**; do not claim delivered outcomes or metrics for it.
3. **Use accurate titles and honest positioning.** The current title is "Data Analyst – Utilities Department." The headline "Data Engineer" is approved positioning taken from the resume summary; never relabel a past job title. The approved hero positioning statement is exactly: *"Data Engineer building reliable cloud data platforms, pipelines, and automation that turn operational data into trusted systems."* Do not exaggerate seniority: no "senior", "lead", "principal", "expert", "architect-level", no year counts beyond the resume's "4+ years combined", and no scale or reliability claims ("enterprise-grade", "petabyte", "99.9%") that the resume does not make. Supporting copy may echo the statement but may not strengthen it.
4. **Missing information is marked, not filled, and omitted cleanly.** Use the `needsInput("reason")` helper in content modules (see PLANNING.md §7). Anything unsupplied, including **certification IDs, verification URLs, issue dates, project links, GitHub repository URLs, and badge images**, is **omitted from the live website**. Never render a placeholder, "TBD", dummy link, or lorem text in production. Never invent repository URLs or link to a repo that Bhanu has not confirmed. `npm run content:check` lists every open item. Do not write plausible-sounding placeholder facts.
5. **Recommendations/testimonials** are data-driven and appear only from real, **approved** records: real text, author name, role, relationship, and `approved: true` (meaning Bhanu approved publishing it and the author's permission is confirmed). With zero approved records the section does not render and disappears from navigation, the section rail, and structured data. Never fabricate, paraphrase, "improve", or excerpt-and-alter a recommendation.
6. **No fabricated screenshots, dashboards, or code, and only sanitized architecture visuals.** Architecture diagrams are **custom SVG/React diagrams built specifically for the portfolio** from project data, never screenshots of internal systems. They may depict only components the resume names, connected in the order the resume describes, and are captioned as a simplified illustration. Labels should read as realistic architecture vocabulary (layer names such as Bronze/Silver/Gold, stage names such as Ingest, Validate, Reconcile, and entity names the resume uses such as buildings, meters, bills). Never use real table, column, schema, database, server, workspace, storage-account, or pipeline names, real ID formats, real vendor or building names, or sample rows that resemble real records. A label that asserts a specific implementation detail the resume does not state (for example an orchestration tool, a schedule, or a table name) requires Bhanu's confirmation first. Mock dashboards or synthetic "sample data" screenshots are not planned; do not create them without asking.
7. **Pronouns:** Bhanu's pronouns have not been provided. Write all site copy in first person ("I build…") or use the name. Never write "he/she/his/her" for Bhanu. Use they/them for anyone else whose pronouns are unknown.
8. **Public contact and privacy:** the public site shows **email, phone, and LinkedIn** (plus the GitHub profile link that appears on the resume). Bhanu approved showing the phone number publicly and keeping it in the downloadable resume (Phase 1.5 correction). The number is the one printed on the approved resume, never invented or altered, and is stored **once** in `content/site.ts` as `contact.phone`, the **only phone field in the schema**. It is rendered **only in the Contact section**, as a `tel:` link. It does **not** appear in the hero, navigation, footer, README, page metadata, Open Graph data, JSON-LD, or any other content module. `content:check` flags phone-number patterns anywhere except `contact.phone`, and `content.example/` uses a fictional number from a reserved range or none. Any additional placement needs Bhanu's approval. The public email is set once in `content/site.ts`. The resume PDF may keep its phone number; the resume architecture (§6) is unchanged.
9. **CSU and employer data privacy:** the public portfolio may describe the CSU projects **using only information already present in Bhanu's approved resume.** Never publish or bundle: internal CSU files, vendor documents, utility bills, account numbers, meter identifiers, internal screenshots or exports that contain operational data, or any confidential or sensitive university information. This applies to `public/`, `content/`, alt text, image metadata, Git history, and test fixtures. When unsure whether something is sensitive, leave it out and ask.
10. **Name usage:** the primary display name is **"Bhanudeepak Nagumothu"** (hero, page title, metadata, footer, JSON-LD `name`). The preferred short name is **"Bhanu"**, used naturally in conversational and supporting copy (About, Contact, calls to action), never as a replacement for the full name in prominent positions. The name is stored once in `content/site.ts` (`full`, `short`, `monogram`).

## 3. The reference portfolio (ZIP)

Used for **inspiration of layout quality, flow, and interaction polish only**. It belongs to a different person and contains that person's personal documents.

- Never copy its text, name, branding, colors, icons, images, certificates, resumes, PDFs, code, or its exact hero composition. Do not import anything from it.
- Rebuild any pattern from scratch to fit this design system.
- Its extracted contents must not enter this repo, `public/`, or any commit. Keep it local under `reference/` (gitignored).

## 4. Visual identity

**Concept (locked): "The Web Is the Pipeline."** Spider-web geometry *is* graph/network/pipeline geometry. Spider web → network graph → pipeline → connected data systems. The spider influence is abstract, sophisticated, professional, and cinematic, never fan-site.

**Palette: ~92% grayscale, ~8% deep crimson.**

| Token | Role |
|---|---|
| void black | page background |
| carbon | raised background |
| graphite | cards, panels |
| dark steel | borders, dividers, inactive geometry |
| silver | secondary text, web strands |
| off-white | primary text, headlines |
| deep crimson | **only** active/interactive states, focus emphasis, the single node/strand currently "live", primary CTA fill |

Exact hex values and contrast pairings live in PLANNING.md §5. All colors are defined once as design tokens (CSS variables consumed by Tailwind). **No raw hex/rgb values in components.**

**Crimson rules**
- Never dominant. If a screenshot looks red at a glance, it is wrong.
- Never for small body text (crimson on void black is ~3.5:1, below AA for small text). Use it as a fill behind off-white text, as a stroke, or a glow.
- Signals "active", "selected", "the pipeline is here", or the restrained portrait edge accent below. No other decorative use.
- At most **three** distinct crimson elements in any one viewport, and none may be a large fill. Glows are static (never animated `box-shadow`); at most one crimson element pulses.

**Portrait treatment (locked).** The current approved `bhanu-portrait.png` (400×400) is used for the initial implementation.
- **Grayscale by default**, via CSS (`filter`, overlay gradients, or an SVG filter). The warm cream background must never appear in color on the page.
- Subtle depth (layered plates and soft shadow) inside a **dimensional frame** in the site's angular language (chamfered corners, offset back plates, hairline steel borders), plus a **restrained deep-crimson edge/glow accent** (a thin crimson-500 hairline and a low-alpha static glow).
- **The source file is never edited, re-saved, cropped on disk, or replaced.** Do not generate a replacement portrait or a color-graded derivative asset. Treatment is CSS/SVG at render time.
- **Never display it larger than ~240 CSS px wide** and never as a full-bleed or background image; do not upscale.
- No color reveal on hover is planned. Any change to the treatment goes through Bhanu.

**Spider-inspiration guardrails**
- Allowed: radial/concentric web geometry with slight catenary sag, node-and-edge graphs, angular mask-eye shapes used sparingly as clip-paths or frames, layered depth, cinematic lighting, metallic/graphite surfaces.
- **Not allowed:** Marvel or Spider-Man logos, wordmarks, or emblems; any spider logo or emblem; literal spiders; copied film artwork, stills, posters, or promotional imagery; copyrighted character illustrations or silhouettes traced from them; Marvel or Spider-Man names in UI copy, metadata, alt text, or the README; red-and-blue suit color references; web-slinging puns; comic halftone or panel layouts; "superhero" language; anything that reads as a fan site. (Marvel and Spider-Man are third-party trademarks and copyrights. This is an inspired, abstract aesthetic, not a fan site.)
- Web geometry is original and generated by code (see PLANNING.md §5.4); do not import third-party web/spider vector art.
- The look should read as: cinematic, elegant, premium, technical, sophisticated, recruiter-friendly, memorable.

**Typography (locked, Phase 3):** two primary families plus one narrowly-scoped mono utility — **Space Grotesk** (display/headings — geometric, technical character, not sci-fi), **Inter** (body/UI — the readable neutral partner), **JetBrains Mono** (technical metadata and tech tags only; PLANNING.md §5.2 explains why this doesn't count against "at most two primary families"). Self-hosted through `next/font` (`src/app/fonts.ts`), exposed as `--font-display`/`--font-body`/`--font-mono` tokens. All real text stays real text (never text-in-image). Fluid sizes (`--text-hero`, `--text-display`, ...) are tokens in `src/styles/tokens.css`, not per-component magic numbers.

## 5. Motion and 3D principles

Moderate and elegant. Motion clarifies structure; it is never decoration for its own sake.

**3D comes from** dimensional hero typography, subtle cursor parallax, a layered hero composition, perspective project cards with hover tilt, lighting/shadow depth, smooth modal transitions, and layered web/network geometry. **No heavy 3D models or WebGL** unless a future need is approved and justified.

**Budget rules**
1. Animate only `transform` and `opacity` (plus `stroke-dashoffset` on small SVGs). Never animate `filter: blur`, `backdrop-filter`, `box-shadow` size, layout properties, or large blurred elements.
2. At most **one** continuous ambient loop visible at a time. It pauses when off-screen (IntersectionObserver) and when the tab is hidden.
3. Pointer-driven effects (tilt, parallax, light-follow) run only on `(hover: hover) and (pointer: fine)`, write CSS variables or motion values inside `requestAnimationFrame`, and never trigger React re-renders per mouse move.
4. Tilt limits: cards ≤ ±8°, hero title ≤ ±5°. Perspective ~900–1200px.
5. `backdrop-filter` is used on at most a couple of elements per viewport (e.g., the nav). Panels use opaque or gradient graphite instead of glass blur.
6. Durations: UI feedback 150–250 ms; entrances 500–800 ms; one shared easing curve defined as a token. Stagger sparingly.
7. **Framer Motion is not installed (Phase 3 decision, D36).** Every Phase 3 motion need (reveal, stagger, hover tilt, node pulse, one-time path draw-in) is plain CSS transitions/`@keyframes` plus small hooks (`src/hooks/use-reduced-motion.ts`, `use-pointer-fine.ts`, `use-in-view.ts`, `use-tilt.ts`) — CSS reads the reveal/unfurl state from a `data-*` attribute the hook sets, so there is no per-frame React re-render either way. Add Framer Motion only when a later phase genuinely needs it (e.g., the project modal's shared-element transition, Phase 6) and, per this rule, through `LazyMotion` with `domAnimation` when it is.
8. No autoplay sound or video. No scroll-jacking. No cursor replacement.

**`prefers-reduced-motion: reduce` is a first-class mode**, not an afterthought: no parallax, tilt, marquee, looping animation, or smooth scrolling; entrance animations become instant or a plain fade; the web geometry renders static; modals appear without transforms. Smooth scrolling is enabled only inside `@media (prefers-reduced-motion: no-preference)`.

**Progressive enhancement:** critical text (name, headings, project summaries) is server-rendered and visible without JavaScript and before hydration. Never hide meaningful content behind an animation start state that requires JS to reveal.

## 6. Architecture rules

**Separate content from presentation.** No personal or professional text, numbers, links, or dates inside React components.

- All content lives in `/content` as typed TypeScript modules: `site` (profile, SEO, contact), `navigation`, `resume`, `experience`, `projects`, `skills`, `education`, `certifications`, `awards`, `leadership`, `recommendations`, `socials`, `metrics`. The shape of every module is defined exactly once, as a Zod schema in `src/schemas/content.ts`; `src/types/content.ts` infers its TypeScript types from those schemas (never hand-duplicate a shape in both places). Run `npm run content:check` to validate content against the schemas plus the cross-content safety rules in §2 (a manual/CI step today, not yet wired into `npm run build`).
- Presentation code that needs more than the raw collections (only approved recommendations, only public social links, whether a section currently has content to render) uses the selectors in `src/lib/content-selectors.ts`, which itself goes through `@/lib/content` — never re-filter `@/lib/content`'s arrays inline in a component.
- All media lives in `/public`. A future user should mostly change only `/content` and `/public`.
- UI strings that are chrome (e.g., "Skip to content", "Close") are the only text allowed in components, and they live in one `src/lib/ui-strings.ts` so they can be localized or reworded in one place.
- **Section order is locked** and defined once in `content/navigation.ts`:
  1. Hero, 2. About, 3. Experience, 4. Projects, 5. Skills / Tech Stack, 6. Certifications, 7. Education, 8. Leadership & Awards, 9. Recommendations, 10. GitHub / Links, 11. Resume, 12. Contact.
  The order establishes identity first, then professional credibility (Experience, Projects), then technical proof (Skills). Do not reorder without Bhanu's approval. The **proof strip** (resume-sourced metrics) is a band at the foot of the Hero, not a thirteenth section, and has no nav entry.
- **Sections are data-driven and self-hiding.** A section with no renderable content does not render and does not appear in navigation, the section rail, the sitemap of anchors, or JSON-LD. Expected at launch: **Recommendations is hidden** (no approved records yet); **GitHub / Links** shows only the profile and LinkedIn links that appear on the resume, with its featured-repositories block hidden until Bhanu confirms repositories and approved project links.
- **Import boundaries (enforced by ESLint):** `content/` imports only types and the `needsInput` helper (`src/lib/needs-input.ts`). Files under `src/` import content only through `@/lib/content` selectors, never via the `@content/*` alias or deep paths. `components/ui` (shadcn primitives) know nothing about Bhanu's content. `components/sections` compose primitives and content.
- **One resume source.** All "View Resume" and "Download Resume" actions read `content/resume.ts` through one helper and one `<ResumeActions>` component. The filename `bhanu-resume.pdf` and the path `/resume/bhanu-resume.pdf` appear in exactly one place: `content/resume.ts`. Replacing the resume means replacing the PDF file (or, if truly necessary, editing that one config source); it must never require editing any component. Never add a version, date, or personal name to the public filename. See PLANNING.md §8.
- **Bhanu-specific content vs. reusable presentation stay separated.** Components, hooks, `lib/`, styles, and tests contain no Bhanu-specific strings, links, numbers, or assets. Anything that is "about Bhanu" lives in `content/` and `public/`; anything reusable lives in `src/`. Tests, the design specimen page, and any examples use `content.example/` fixtures, not Bhanu's content.
- Server Components by default. `"use client"` only for interaction (tilt, modal state, menu, pointer effects) and pushed as far down the tree as possible.
- Stay **static-export compatible**: no API routes, no server-only runtime features, so the site can deploy to Vercel, Netlify, Cloudflare Pages, or GitHub Pages. Contact is `mailto:` plus copy-to-clipboard, with an optional third-party form endpoint via env var.
- Generated geometry (the web) comes from a **pure, seeded** function so server and client render identically (no `Math.random()` at render time, no hydration mismatches).

## 7. Tech stack and conventions

**Installed (exact versions pinned, npm):** Next.js 16.3.5 (App Router, Turbopack), React 19.2.8, TypeScript 5.9.3 (strict), Tailwind CSS 4.3.3, ESLint 9.39.5 with `eslint-config-next` (Phase 1); Zod 4.6.5 for content schemas/validation (dependency — `src/schemas/content.ts` is genuinely part of the shipped source tree) and tsx 4.23.15 to run the path-alias-aware `content:check`/`resume:check` scripts (devDependency — never imported by the app) (Phase 2).

**Still planned (each installed only in the phase that needs it, after approval):** Framer Motion (`motion`) — evaluated in Phase 3 and deliberately not added yet, see §5 rule 7; shadcn/ui (Radix-based) — also evaluated in Phase 3 and not added: none of Phase 3's primitives (Button, Surface, TechTag) need Radix's focus-trap/portal logic, that question is revisited when Dialog/Sheet/Tooltip are built (Phase 6+); Prettier. Later, in the quality phase: Playwright + axe, Lighthouse CI. Pin exact versions at install time (`.npmrc` sets `save-exact=true`).

**Built in Phase 3 (custom, no new dependency):** `src/styles/{tokens,depth,web}.css` (design tokens; Tailwind v4 `@theme inline` mapping; surface/depth treatment; web-geometry motion); `src/app/fonts.ts` (`next/font/google`); `src/components/web/` (`generate-web.ts` — the pure seeded generator; `NetworkMesh.tsx`; `Node.tsx`); `src/components/ui/` (`Container`, `SectionShell`, `SectionHeading`, `Button`, `Surface`, `TechTag`, `Reveal`, `SkipLink`, `VisuallyHidden`); `src/hooks/` (`use-media-query`, `use-reduced-motion`, `use-pointer-fine`, `use-in-view`, `use-tilt`); `src/app/icon.svg` (the site's brand mark).

**Conventions**
- TypeScript `strict`; no `any` without a comment justifying it.
- Tailwind reads design tokens; bespoke effects (extruded type, specular light, web geometry) live in named CSS classes/CSS modules with comments explaining the technique.
- Components: named exports, one component per file, `PascalCase.tsx`; props typed; small and composable. Hooks in `src/hooks`, prefixed `use`.
- Match the surrounding code's naming and comment density. Comments explain *why*, not *what*.
- Add a dependency only with a written reason. Prefer the platform (CSS, IntersectionObserver, `<dialog>`-grade primitives via Radix) over a library. No icon pack sprawl; use one icon set and import icons individually.
- Use `next/image` for raster images with explicit `width`/`height` and meaningful `alt`; use `next/font` for fonts; no third-party font `<link>`s.
- Cross-platform paths and no absolute local paths in code or docs.

## 8. Accessibility, performance, SEO (requirements, not aspirations)

**Accessibility (target WCAG 2.2 AA)**
- Semantic landmarks (`header`, `nav`, `main`, `section` with headings, `footer`), one `<h1>`, logical heading order, skip-to-content link.
- Everything operable by keyboard with a **visible focus ring** (off-white/silver with a crimson accent; ≥ 3:1 against adjacent colors). Focus is never removed.
- Modals use an accessible dialog primitive: `role="dialog"`, `aria-modal`, labelled, focus trapped, `Esc` closes, focus returns to the trigger, background scroll locked, deep-linkable and closable with the browser Back button.
- Body text ≥ 4.5:1, large text/UI ≥ 3:1. **Minimum text size 12px (0.75rem)** for anything meaningful; no sub-12px microcopy.
- Decorative geometry is `aria-hidden` and `pointer-events: none`. Meaningful diagrams have text alternatives.
- Mobile menu button exposes `aria-expanded` and `aria-controls`. Touch targets ≥ 44×44 px.
- Never convey state by color alone (crimson "active" also gets an underline/marker/shape).

**Performance (targets, measured on mobile emulation)**
- LCP < 2.0 s, INP < 150 ms, CLS < 0.05, Lighthouse ≥ 95 Performance, 100 Accessibility, 100 Best Practices, 100 SEO.
- First-load JS budget ≈ 170 KB gzipped for the landing route. Anything that threatens it needs justification.
- Hero is above-the-fold and must not wait on JS to paint. Below-the-fold sections and modals are lazy (`next/dynamic`, `loading="lazy"`); the resume PDF viewer loads only when opened.
- Images: AVIF/WebP via `next/image`, correct `sizes`, no layout shift. The portrait must never be upscaled (see PLANNING.md §4).
- No JS whose only job is decoration and that cannot be turned off under reduced motion or data-saver.

**SEO / sharing**
- Metadata API for title, description, canonical, robots, Open Graph, Twitter card, theme-color; generated `sitemap` and `robots`; JSON-LD `Person` built only from public content fields (name, job title, email, and `sameAs` links to LinkedIn and the GitHub profile; **never a phone number**, which appears only in the Contact section; never a street address); a real OG image.
- Descriptions are written from resume facts, lead with the full name "Bhanudeepak Nagumothu", and use no pronouns. The approved hero positioning statement is the basis for the meta description.

## 9. Repository hygiene and reusability

This becomes a **public GitHub repo and a reusable template.**

- `reference/` is **gitignored and never deployed.** It contains the reference owner's personal files. `.gitignore` is the first file created in Phase 1, before `git init`.
- Nothing in `public/` is included by accident. Each asset is added deliberately and listed in `docs/ASSETS.md`. **No internal CSU files, vendor documents, utility bills, or screenshots containing operational data may ever be added to the repo,** not even temporarily (they would live in Git history forever).
- **GitHub integration is deferred.** Do not add GitHub API fetching, featured-repository data, or "view source" links until Bhanu confirms the repository and the approved project links. Until then the GitHub section uses only the profile URL that appears on the resume.
- No secrets, tokens, keys, or private URLs anywhere. `.env.example` documents every variable with safe defaults; the site must build with zero env vars set.
- **MIT license for code.** Bhanu's personal content and assets (`content/`, `public/images`, `public/resume`) are not licensed for reuse; state this plainly in README and a `CONTENT-NOTICE` so forks replace them.
- A future user customizes by editing `/content` and `/public` and following `docs/CUSTOMIZING.md`. A neutral `content.example/` with placeholder identity ships alongside so the template is usable without Bhanu's data.
- Docs to ship: README, `docs/CUSTOMIZING.md`, `docs/DEPLOYING.md`, `docs/ARCHITECTURE.md`, `docs/ASSETS.md`.
- CI (GitHub Actions): install, lint, typecheck, `content:check`, build.
- Sensible history: one concern per commit, no committed then deleted secrets or third-party files. If anything sensitive is ever committed, rewrite before the first push.

## 10. Definition of done (every change)

- [ ] No content hard-coded in components; new facts added to `/content` with a source.
- [ ] Nothing invented; anything unknown uses `needsInput()` and is **omitted** on the live site (no placeholders, no invented IDs, dates, URLs, or repos).
- [ ] The phone number appears only in the Contact section (from `content/site.ts`), and no CSU/vendor/bill/account/meter/operational data appears anywhere in the change.
- [ ] Section order and hero positioning text match the locked decisions.
- [ ] No Bhanu-specific strings in components; tests use `content.example/`.
- [ ] Tokens used; no raw colors; crimson ≤ ~8% and never small text.
- [ ] Works at 360 px, 768 px, 1280 px, and 1920 px widths; no horizontal scroll.
- [ ] Fully keyboard-operable; focus visible; screen-reader names correct.
- [ ] `prefers-reduced-motion` verified; pointer effects gated to fine pointers.
- [ ] Only compositor-friendly properties animated; no per-frame React re-renders.
- [ ] Lint, typecheck, `content:check`, and build pass.
- [ ] No console errors or hydration warnings.
- [ ] Summarized what changed, what was verified, and what is still needed from Bhanu.

## 11. Commands (filled in during Phase 1)

Package manager: **npm** (Bhanu's Phase 1 instruction; supersedes the earlier pnpm proposal).

| Command | Purpose |
|---|---|
| `npm run dev` | Development server (http://localhost:3000) |
| `npm run build` | Production build |
| `npm run lint` | ESLint, including the import-boundary rules |
| `npm run typecheck` | `next typegen` then `tsc --noEmit` (route types must be generated first) |
| `npm run content:check` | Validates `/content` against the Zod schemas plus safety/privacy rules (CLAUDE.md §2). Add `-- --example` to validate `content.example/` instead. |
| `npm run resume:check` | Verifies the resume PDF exists, is a real PDF, matches the locked public path, and that no file hardcodes a competing resume path or a `reference/` path. Read-only — never modifies the PDF. |

**Framework note:** `next.config.ts` sets `agentRules: false`. Without it, `next dev` appends an agent-instructions block to this file on every run. Do not remove that setting, and if this file ever shows a `nextjs-agent-rules` block, delete it.
