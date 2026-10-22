# Abdullah Rubab — portfolio

Personal site for [abdullahrubab.me](https://abdullahrubab.me): medical-imaging AI research and shipped products.
One page, five acts — a water hero, product-coloured work cards, a light "paper" research sheet, editorial journey rows and a cobalt contact block.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, static export) · React 19 · TypeScript |
| Styling | Tailwind CSS v4 (tokens in `src/app/globals.css`) |
| Motion | [Motion](https://motion.dev) (`motion/react`) — scroll-linked, in-view and spring animation |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering) (off for reduced motion) |
| Water | Raw WebGL2 fragment shader — no 3D engine (`src/components/background/WaterCanvas.tsx`) |
| Fonts | Geist, Geist Mono, Instrument Serif via `next/font` |
| Hosting | GitHub Pages (`.github/workflows/deploy.yml`) |

### Design notes

- **Palette:** ink and warm ash neutrals, one ultramarine "water" colour, ember (from the AR logo) as a rare accent.
- **Glass is rare on purpose** — only the nav pill and the ⌘K menu. Everything else is solid surface.
- **The water renders behind the hero only.** It pauses when off-screen, steps its resolution down on slow devices,
  and becomes a single still frame for `prefers-reduced-motion`.
- **Project cards play recordings of the real, live sites** (`public/assets/projects/*.mp4`). Video only loads near the
  viewport, pauses off-screen, and is skipped for reduced-motion / data-saver users (poster shown instead).
- ⌘K / Ctrl K opens a command menu (sections, live projects, links, "Toggle water effects").

## Editing content

Everything shown on the site lives in **`src/content/data.ts`** — profile, links, projects, papers, roles, honours.
Change a paper's `status` and the pipeline bar, colours and counts update themselves.

To add a project: add an entry to `projects`, drop a recording and poster into `public/assets/projects/`
(1280×800 H.264 MP4 + a WebP poster), and give it an `accent` colour — its card is tinted from it.

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
    sections/     Hero, Ticker, Work, Research, Journey, Contact, Footer
    ui/           Panel, Button, Chip, BrowserFrame, Glyph, Cursor, SplitWords, Reveal, …
  content/data.ts all copy and data
  lib/            scroll helpers, cn, colour util
public/assets/    logos, portrait cut-out, project recordings
```

Old URLs (`/about`, `/projects`, `/publications`, `/experience`, `/cv`) redirect to the matching section or the CV PDF.
