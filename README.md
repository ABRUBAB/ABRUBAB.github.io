# Abdullah Rubab — portfolio

Personal site for [abdullahrubab.me](https://abdullahrubab.me): medical-imaging AI research and shipped products.
One page, six acts — a water hero, product-coloured work cards, a light "paper" research sheet, editorial journey rows, a charcoal extracurricular sheet and a cobalt contact block.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, static export) · React 19 · TypeScript |
| Styling | Tailwind CSS v4 (tokens in `src/app/globals.css`) |
| Motion | [Motion](https://motion.dev) (`motion/react`) — scroll-linked, in-view and spring animation |
| Scrolling | Native — no scroll-jacking; anchor links use a small eased helper (`src/lib/scroll.ts`) |
| Water | Raw WebGL2 fragment shader — no 3D engine (`src/components/background/WaterCanvas.tsx`) |
| Fonts | Geist, Geist Mono, Instrument Serif via `next/font` |
| Hosting | GitHub Pages (`.github/workflows/deploy.yml`) |

### Design notes

- **Palette:** ink and warm ash neutrals, one ultramarine "water" colour, ember (from the AR logo) as a rare accent.
- **Glass is rare on purpose** — only the nav pill and the ⌘K menu. Everything else is solid surface.
- **Loading screen** (home only): the AR mark with a real progress ring. It warms up what would otherwise stutter on
  first view — web fonts, the hero portrait, the first project poster and the water shader's first frames — and only
  then lifts. Repeat visits in a session get a short version; reduced-motion visitors a near-instant one. It never
  blocks for more than ~5 s and is hidden when JavaScript is off.
- **Fast by construction:** the page animates `transform`/`opacity` only; no custom cursor, no full-screen blend
  layers, no blur filters or masks; per-frame work (ticker, water, video) runs only while on screen.
- **The water renders behind the hero only.** It pauses when off-screen, steps its resolution down on slow devices,
  and becomes a single still frame for `prefers-reduced-motion`.
- **Project cards play recordings of the real, live sites** (`public/assets/projects/*.mp4`). Video only loads near the
  viewport, pauses off-screen, and is skipped for reduced-motion / data-saver users (poster shown instead).
- ⌘K / Ctrl K opens a command menu (sections, live projects, links, "Toggle water effects").
- **Photos:** `public/assets/photos/` holds the hero portrait (`portrait-lit.webp`, a graded cut-out with baked rim
  lights) and the two podium photos (`champion.webp`, `fourth-place.webp`, ~1000 px wide WebP). A missing podium photo
  degrades to a typographic panel instead of a broken image.

## Editing content

Everything shown on the site lives in **`src/content/data.ts`** — profile, links, projects, papers, roles, podium photos, honours, extracurriculars and the toolbox.
Change a paper's `status` and the pipeline bar, colours and counts update themselves.

To add a project: add an entry to `projects`, drop a recording and poster into `public/assets/projects/`
(960×600 H.264 MP4, a VP9 WebM fallback and a WebP poster), and give it an `accent` colour — its card is tinted from it.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static export → ./out
```

> This repo targets a newer Next.js than most documentation covers. `AGENTS.md` points at the version-matched docs
> in `node_modules/next/dist/docs/`.

## Layout

```
src/
  app/            layout, page, legacy-route redirects, 404, icons, share image
  components/
    background/   WaterCanvas (WebGL2)
    nav/          Nav (glass pill), CommandPalette
    providers/    Providers, Loader (loading screen), LoadedContext
    sections/     Hero, Ticker, Work, Research, Journey, Beyond, Contact, Footer
    ui/           Panel, Button, Chip, BrowserFrame, Glyph, SplitWords, Reveal, …
  content/data.ts all copy and data
  lib/            scroll helpers, cn, colour util
public/assets/    logos, photos, project recordings
```

Old URLs (`/about`, `/projects`, `/publications`, `/experience`, `/cv`) redirect to the matching section or the CV PDF.
