# Bhanudeepak Nagumothu: Portfolio

A Data Engineer portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, and Zod.

> **Status:** foundation and content architecture only (Phases 1–2). No visual design yet.
> Rules and plan: [CLAUDE.md](CLAUDE.md), [PLANNING.md](PLANNING.md).

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint, including the import-boundary rules |
| `npm run typecheck` | TypeScript check |
| `npm run content:check` | Validate `/content` — shape, and privacy/safety rules |
| `npm run resume:check` | Verify the resume PDF and its single-source path |

## Content architecture

All personal content lives in **`/content`** as typed TypeScript modules (`site.ts`,
`experience.ts`, `projects.ts`, ...) — nothing personal is ever hard-coded in a
component. The shape of every module is defined exactly once, as a **Zod schema** in
`src/schemas/content.ts`; TypeScript types (`src/types/content.ts`) are inferred from
those schemas, so there is a single source of truth, not two definitions that can drift
apart.

Presentation code reaches content through one gateway, `src/lib/content.ts` (ESLint
enforces this), and reads it through typed selectors in `src/lib/content-selectors.ts`
(e.g. "only approved recommendations," "only public social links") rather than
re-filtering the raw arrays inline.

Anything not yet known uses `needsInput("reason")` instead of a placeholder — the field
stays visibly unresolved in code and is simply omitted from the rendered site.

Run **`npm run content:check`** to validate. It reports errors (must be fixed) and
informational notes (expected gaps, like an unpicked domain) separately, and checks
things a type alone can't: no phone number outside the one approved field, no
`reference/`-only material, no secrets, no unapproved recommendations, and more.

## Example content

**`content.example/`** is a complete, fictional mirror of `/content` — same files, same
shape, a made-up person ("Jordan A. Rivera") at fictional companies. It exists so anyone
forking this template can see exactly how to write their own content, including every
optional pattern (a fully-filled-in certification next to a bare one, a project in each
status, one approved recommendation). Validate it the same way:

```bash
npm run content:check -- --example
```

To start your own site from the template, copy the shape of each `content.example/*.ts`
file into the matching `content/*.ts` file and replace the fictional data with your own.

## Replacing the resume

The resume has one stable public path, `/resume/bhanu-resume.pdf`, set once in
`content/resume.ts`. To update it:

1. Export the new PDF.
2. Overwrite `public/resume/bhanu-resume.pdf` (same filename).
3. Run `npm run resume:check` — confirms it's a real PDF at the right path, and that
   nothing else in the codebase hardcodes a competing resume path.
4. Commit and deploy.

No component or config edit is needed. Every "View Resume" / "Download Resume" action
reads the same `content/resume.ts` config through one helper, `src/lib/resume.ts`.

## How it is organized

- `content/`: all personal content (edit this)
- `content.example/`: fictional example content (a customization reference, not used by the app)
- `src/schemas/content.ts`: Zod schemas — the source of truth for content shape
- `src/types/content.ts`: TypeScript types, inferred from the schemas above
- `src/lib/`: the content gateway, selectors, the resume helper, and UI strings
- `scripts/`: `content:check` and `resume:check` (run via `tsx`)
- `public/`: images and the resume PDF
- `src/app/`, `src/components/`: presentation code (not built yet)

Full setup, customization, and deployment documentation ships in Phase 10.
