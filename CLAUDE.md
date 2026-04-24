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
"Engineer first, artist always." Dark theme only. Every element reads as intentional and technical, but the palette has warmth and personality.

### Color palette (all defined in `frontend/src/index.css` `@theme {}`)
```
Background:   #08080e (base)  #0f0f1a (surface)  #161625 (elevated)
Borders:      #1a1a2e (subtle)  #252540 (muted)
Text:         #eeeef5 (primary)  #8080a8 (secondary)  #44446a (muted)
Cyan:         #22d3ee  (engineering accent)
Violet:       #a855f7  (bridge / personal writing accent)
Amber:        #fb923c  (music accent)
Code bg:      #0d0d18
```

Cyan = engineering/technical. Violet = personal/creative bridge. Amber = music. These are consistent across every component — do not introduce new accent colors without discussion.

### Typography
- **JetBrains Mono** — loaded from Google Fonts, used for everything (headings, body, UI labels). Monospace is a deliberate identity choice, not a code aesthetic.
- Font defined in CSS: `font-family: 'JetBrains Mono', 'Space Mono', monospace`

### CSS utility classes (defined in `index.css`)
- `.gradient-text` — cyan → violet gradient text (used on hero name, nav logo)
- `.gradient-text-warm` — violet → amber gradient text (used for music-related headings)
- `.glow-cyan / .glow-violet / .glow-amber` — box-shadow glow on hover for cards
- `.accent-bar-cyan / .accent-bar-violet` — 2px gradient top border that fades in on card hover (uses `::before` pseudo-element; requires `overflow-hidden` on the card and `relative` on child content)
- `.prose` — article body styles; used in `PostBody.tsx`

### Background texture
`body::before` adds a subtle 28px dot grid pattern across the entire page background using CSS only. Do not remove this — it adds depth to what would otherwise be a flat black surface.

### Ambient glow orbs
The Home page hero uses three absolute-positioned blurred divs (cyan, violet, amber) to create colored light behind the content. This technique can be reused on other hero-style sections. Opacity is intentionally low (0.05–0.07) — increasing it risks looking garish.

---

## Component map

### Layout
- `RootLayout.tsx` — sticky Nav + AnimatePresence page transition + Footer
- `Nav.tsx` — logo is `~/` (muted) + `ali` (gradient-text); active links get cyan pill border
- `Footer.tsx` — social icon row

### UI primitives (`components/ui/`)
- `Badge.tsx` — variant prop: `eng` (cyan), `thoughts` (cyan), `personal` (violet), `music` (amber), `default` (muted)
- `Button.tsx` — variant: `primary` (gradient bg), `outline` (colored border + glow), `ghost`; accent: `eng` or `music`
- `Divider.tsx` — three colored dots (cyan · violet · amber) on faded gradient line
- `ScrollProgress.tsx` — fixed top progress bar for article pages; accent prop controls color
- `SectionHeader.tsx` — renders `// section-name` style heading
- `ExternalLink.tsx` — opens in new tab, `rel="noopener noreferrer"`

### Content components (`components/content/`)
- `PostCard.tsx` — color-adapts between cyan (thoughts) and violet (personal) using `isThoughts` flag
- `CaseStudyCard.tsx` — cyan glow + accent-bar-cyan; shows outcome stat block
- `BookCard.tsx` — grid card with cover image, `◆` star rating in amber
- `PlatformLink.tsx` — music platform links; platforms: `spotify`, `youtubeMusic`, `appleMusic`, `soundcloud`
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
tags: ["tag1", "tag2"]
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
tags: [...]
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
- **Tailwind v4** — there is no `tailwind.config.js`. All config (colors, fonts) lives in `src/index.css` `@theme {}`. Do not create a config file.
- **`erasableSyntaxOnly: true`** — TypeScript constructor parameter shorthand (`public foo: string`) is banned. Always declare class fields explicitly.
- **`verbatimModuleSyntax: true`** — All type-only imports must use `import type`. Inline `import('../types').Foo` in generics is also banned — import the type at the top of the file.
- **lucide-react** — No `Github`, `Twitter`, `Linkedin`, `Youtube` exports. Use `Code2`, `MessageSquare`, `Briefcase`, `PlayCircle` as substitutes.
- **`.accent-bar-*` CSS classes** — require `overflow-hidden` on the card wrapper AND `relative` on all child content; otherwise the `::before` pseudo-element bleeds out incorrectly.
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
- **Social links** — Footer and About hardcode `https://github.com`, `https://twitter.com`, etc.; these need to be replaced with real URLs
- **React Query migration** — replace `useEffect`+`useState` data fetching patterns with `useQuery` hooks
