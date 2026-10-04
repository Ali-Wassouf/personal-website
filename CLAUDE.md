# Project Context — Ali's Personal Website

Personal website for Ali Wassouf: software engineer + hip-hop artist. The site hosts engineering case studies, writing (thoughts on industry + personal essays), book reviews, and a music section linking to streaming platforms.

---

## Running locally

```bash
# Backend — port 3001
cd backend && npm run dev        # uses tsx watch

# Frontend — port 5173
cd frontend && npm run dev       # uses Vite 5

# Build check
cd frontend && npm run build
```

The frontend auto-fetches from `http://localhost:3001/api/v1`. To override: set `VITE_API_URL` in `frontend/.env.local`.

---

## Tech stack

### Frontend (`frontend/`)
- **React 18** + **TypeScript** — strict mode, `erasableSyntaxOnly: true` in tsconfig
- **Vite 5** — pinned to v5 because Node.js is v20.12.0; Vite 6+ requires Node 20.19+. Do not upgrade Vite.
- **Tailwind CSS v4** — configured via `@tailwindcss/vite` plugin (no `tailwind.config.js`); all theme tokens are declared in `src/index.css` using `@theme {}` blocks
- **React Router v6** — all routes defined in `src/App.tsx` under a single `<RootLayout>` outlet
- **Framer Motion** — used only for page transitions (`AnimatePresence` in `RootLayout`) and hero section entrance animations. Not used for everything.
- **react-markdown + remark-gfm + rehype-highlight** — markdown rendering in `PostBody.tsx`; highlight.js github-dark theme
- **lucide-react v0.394+** — social icons (Github, Twitter, Linkedin, Youtube) were removed in this version. Current replacements: `Code2` (GitHub), `MessageSquare` (Twitter), `Briefcase` (LinkedIn), `Music`/`PlayCircle` (music platforms)
- **@tanstack/react-query** — installed but not yet wired up; all data fetching currently uses `useEffect` + `useState` calling `src/lib/api.ts` directly. Migration to react-query is a future improvement.

### Backend (`backend/`)
- **Node.js + TypeScript** — compiled with `tsx` for local dev, Lambda handlers export a standard `APIGatewayProxyHandler`
- **No framework** — local dev server is a plain `http.createServer` in `src/server.ts`; production uses individual Lambda handlers per route
- **Flat-file content** — markdown files with YAML frontmatter in `src/data/`; parsed with `gray-matter`; no database
- **`tsx`** — used for local dev (`tsx watch src/server.ts`); not used in Lambda deployment

---

## Design system

### Philosophy
"Engineer first, artist always." Dark theme only. Calm, editorial, technical: a near-black canvas, translucent white surfaces, and colour used sparingly as signal. The look follows the reference mockup the redesign was based on (fixed blurred nav, kicker/title/description section headers, rounded-2xl translucent cards).

### Color palette
Colours are plain Tailwind utilities (no custom colour tokens):
```
Background:   #090b0e (page)  #07080b (footer)  #0d1017 (raised overlays)
Surfaces:     bg-white/[0.02–0.05] with border-white/[0.06–0.1]
Text:         #e6edf3 / text-white (primary)  text-zinc-300 (body)  text-zinc-400 (secondary)  text-zinc-500/600 (muted)
Cyan:         cyan-400 (engineering / primary actions — solid bg-cyan-400 + text-black buttons)
Indigo:       indigo-500 in gradients (cyan → indigo); indigo-300 marks "personal" writing
Amber:        amber-400 / amber-300 (music)
Platforms:    emerald (Spotify), red (YouTube), pink (Apple Music), orange (SoundCloud) — pills only
```
Cyan = engineering/technical. Amber = music. Do not introduce new accent colours without discussion.

### Typography (loaded in `index.css`, exposed as `@theme` font tokens)
- **Plus Jakarta Sans** (`font-sans`, default) — headings and body
- **JetBrains Mono** (`font-mono`) — kickers, metadata rows, labels, the `~/ali` wordmark, `systems thinker_` tagline
- **Newsreader** (`font-serif`) — italic pull quotes, post excerpts, English lyric translations, book titles
- **Amiri** (`.font-arabic`, sets `direction: rtl`) — Arabic titles and lyrics

### Recurring patterns
- Section/page header: mono kicker in accent colour → `text-3xl sm:text-4xl font-bold tracking-tight` title → `text-zinc-400` description (`PageHeader`)
- Metadata: mono `text-xs text-zinc-400` items separated by `·` (`MetaRow`)
- Cards: `rounded-2xl bg-white/[0.02–0.03] border border-white/[0.08]`, hover lifts bg to `0.05` and tints the border with the accent (`hover:border-cyan-500/30`)
- Content width `max-w-6xl` with `px-4 sm:px-6 lg:px-8`; articles use `max-w-3xl`
- Hero ambient glow: one blurred `from-cyan-600/10 via-indigo-600/10 to-amber-500/5` blob — keep it subtle
- `.prose` in `index.css` styles markdown article bodies (`PostBody.tsx`)

---

## Component map

### Layout
- `RootLayout.tsx` — fixed Nav + AnimatePresence page transition (`main` has `pt-16` to clear the nav) + Footer + ScrollToTopButton
- `Nav.tsx` — fixed; transparent at top, blurred `bg-[#090b0e]/85` once scrolled; `~/ali • wassouf` wordmark; active link has a cyan → indigo underline; copy-email button + "Get in touch" mailto
- `Footer.tsx` — name / tagline, social icons, nav links, back to top

### Shared config
- `lib/site.ts` — `SITE` (name, tagline, email, GitHub, LinkedIn) and `NAV_LINKS`; use these instead of hardcoding URLs
- `lib/useCopy.ts` — clipboard copy with a transient `copied` flag

### UI primitives (`components/ui/`)
- `PageHeader.tsx` — kicker / title / description; `accent` (`eng` | `music`), `as` (`h1` | `h2`), optional `aside` slot (filters)
- `SegmentedControl.tsx` — pill filter tabs (writing categories, book genres)
- `MetaRow.tsx` — `·`-separated mono metadata
- `BackLink.tsx` — `← label` link for detail pages
- `Button.tsx` — variant: `primary` (solid cyan, or amber with `accent="music"`), `secondary` (translucent), `ghost`
- `PageState.tsx` — `ArticleSkeleton` and `NotFoundState` for detail pages
- `ScrollProgress.tsx` — fixed top progress bar for article pages; accent prop controls colour
- `ScrollToTopButton.tsx`, `ExternalLink.tsx`

### Content components (`components/content/`)
- `PostCard.tsx` — full-width row card; cyan for `thoughts`, indigo for `personal`
- `CaseStudyCard.tsx` — meta row, outcome callout, `Stack: a / b / c`; `featured` prop for the larger variant
- `BookCard.tsx` — also exports `BookCover` (real cover, or a generated genre-tinted cover when `coverUrl` is missing) and `Rating` (`◆` in amber)
- `PlatformLink.tsx` — `pill` (brand-tinted) or `compact` variants; `activePlatforms()` returns platforms with URLs in a stable order
- `PostBody.tsx` — wraps ReactMarkdown with remark-gfm + rehype-highlight inside `.prose`

---

## Routes

```
/                    Home.tsx
/about               About.tsx
/engineering         EngineeringIndex.tsx
/engineering/:slug   CaseStudyDetail.tsx
/writing             WritingIndex.tsx         ?category=thoughts|personal
/writing/:slug       PostDetail.tsx
/books               BooksIndex.tsx           ?genre=novels|psychology|self-improvement
/books/:slug         BookDetail.tsx
/music               MusicIndex.tsx
*                    NotFound.tsx
```

---

## API

Backend base URL: `http://localhost:3001/api/v1` (dev). All responses use `{ data: T, meta?: {...} }` envelope. Errors use `{ error: { code, message } }`.

| Method | Path | Handler file |
|--------|------|-------------|
| GET | `/posts` | `handlers/posts/listPosts.ts` — query: `?category=thoughts\|personal&page&limit` |
| GET | `/posts/:slug` | `handlers/posts/getPost.ts` — searches both `thoughts/` and `personal/` dirs |
| GET | `/case-studies` | `handlers/caseStudies/listCaseStudies.ts` |
| GET | `/case-studies/:slug` | `handlers/caseStudies/getCaseStudy.ts` |
| GET | `/books` | `handlers/books/listBooks.ts` — query: `?genre=novels\|psychology\|self-improvement` |
| GET | `/books/:slug` | `handlers/books/getBook.ts` |
| GET | `/music` | `handlers/music/listMusic.ts` — reads `data/music.json` |

---

## Content format

### Markdown posts (thoughts + personal)
```yaml
---
title: "Post title"
slug: "url-slug"
category: "thoughts"   # or "personal"
publishedAt: "2025-01-08"
excerpt: "One paragraph shown in list views"
wordCount: 980
---
Body content in markdown...
```

### Case studies
```yaml
---
title: "..."
slug: "..."
publishedAt: "2024-10-02"
excerpt: "..."
techStack: ["Node.js", "AWS Lambda", "Redis"]
role: "Lead Engineer"
duration: "3 months"
outcome: "40% reduction in auth incidents"
wordCount: 2100
---
```

### Books
```yaml
---
title: "..."
slug: "..."
author: "..."
genre: "psychology"   # novels | psychology | self-improvement
rating: 5             # 1–5, rendered as ◆ diamonds
publishedAt: "2024-09-20"
excerpt: "..."
coverUrl: "/images/books/cover.jpg"   # optional
---
```

### Music (`data/music.json`)
```json
{
  "releases": [{
    "id": "001",
    "title": "Track Title",
    "type": "single",       // single | ep | album
    "releaseDate": "2025-06-01",
    "coverUrl": null,       // or URL string
    "platforms": {
      "spotify": null,       // or URL string
      "youtubeMusic": null,
      "appleMusic": null,
      "soundcloud": null
    },
    "featured": true        // first featured:true release shows in hero
  }]
}
```

---

## Known constraints and gotchas

- **Node 20.12.0** — Vite is pinned to v5. Do not run `npm install vite@latest`.
- **Tailwind v4** — there is no `tailwind.config.js`. All config (fonts) lives in `src/index.css` `@theme {}`. Do not create a config file.
- **`erasableSyntaxOnly: true`** — TypeScript constructor parameter shorthand (`public foo: string`) is banned. Always declare class fields explicitly.
- **`verbatimModuleSyntax: true`** — All type-only imports must use `import type`. Inline `import('../types').Foo` in generics is also banned — import the type at the top of the file.
- **lucide-react** — No `Github`, `Twitter`, `Linkedin`, `Youtube` exports. Use `Code2`, `MessageSquare`, `Briefcase`, `PlayCircle` as substitutes.
- **`@tanstack/react-query`** is installed but unused. Do not add `QueryClientProvider` unless explicitly asked to migrate the data layer.
- **`postcss` and `autoprefixer`** are installed but Tailwind v4 via `@tailwindcss/vite` does not require a `postcss.config.js`. Do not create one.

---

## What's not built yet

These are the natural next steps — do not implement speculatively:

- **Search** — full-text search across posts/case studies
- **RSS feed** — `/feed.xml` endpoint on the backend
- **OG image generation** — per-post social preview images
- **AWS deployment** — `serverless.yml` / SAM template for Lambda + API Gateway; CloudFront for the frontend
- **Contact / newsletter** — email capture or contact form
- **Real music data** — `music.json` currently has a placeholder "coming soon" entry; real release data + cover art need to be added
- **Profile photo** — referenced in About page design notes but not yet in the UI
- **React Query migration** — replace `useEffect`+`useState` data fetching patterns with `useQuery` hooks
