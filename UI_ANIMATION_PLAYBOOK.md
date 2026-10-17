# UI & Animation Playbook — world-class animated websites with Claude Code

*Personal guide for future projects. Written 2 Oct 2026 during the UVERA hackathon build.*
*Libraries change fast: before each new project, re-check versions and licenses (section 9).*

---

## 1. The five rules that matter most

1. **One tool per job.** One engine for UI motion, one for scroll storytelling, one for 3D, one for shaders. Two engines doing the same job fight each other and double the bundle size.
2. **Motion must explain something.** Before adding an animation, answer: *what does this tell the user?* If the answer is "it looks cool", cut it or make it smaller. (Emil Kowalski's main rule.)
3. **Colour means something.** Build on black/white/greys and keep colour for states and meaning. Then colour itself becomes a signal.
4. **3D must carry information.** The test: *"Could I replace this 3D object with a random glowing sphere without losing meaning?"* If yes, delete it.
5. **Claude must see its own work.** Never trust UI code that nobody looked at. Use screenshots, a design linter, and a motion review in a loop (section 6).

---

## 2. The stack — which tool for which job (React / Next.js)

| Job | Use this | License | Why this one | Use instead when… |
|---|---|---|---|---|
| Base components (buttons, forms, dialogs, tables) | **shadcn/ui** | MIT | You own the code (copied into your repo); accessible Radix base; the whole ecosystem plugs into its CLI | Vue → shadcn-vue |
| Fancy but tasteful pieces (counters, beams, bento, spotlight cards) | **Magic UI** | MIT | Same CLI as shadcn; clean, not too flashy | — |
| Extra effects (tracing beam, sticky scroll, spotlight, 3D card) | **Aceternity UI** (free tier) — pick 1–2 | MIT per listings; check each page | Unique scroll-story pieces | Many are neon/"AI-ish": restyle to your palette or skip |
| Text effects, backgrounds, micro-interactions | **React Bits** — pick 1–3 | MIT + Commons Clause | Biggest set of text animations and backgrounds; 4 variants (TS/JS × CSS/Tailwind) | You plan to **sell** components themselves (Commons Clause forbids that) |
| UI motion inside React (state changes, layout, gestures, page transitions) | **Motion** (`motion/react`) | MIT | Declarative, layout animations, `AnimatePresence`, `useReducedMotion` | — |
| Scroll storytelling (pin, scrub, timelines, split text) | **GSAP** + ScrollTrigger + SplitText | GSAP Standard "no charge" license (free incl. commercial since 2025; **not MIT**) | Best scroll choreography; all plugins free now | Small vanilla site → **Anime.js v4** |
| Smooth scrolling | **Lenis** | MIT | Smooth, syncs with ScrollTrigger | Apps/dashboards → native scroll (no Lenis) |
| Lightweight all-in-one engine (vanilla JS, SVG morph/draw, draggable) | **Anime.js v4** | MIT | ~24 KB modular, timeline + scroll observer + SVG tools | Don't mix it with GSAP in the same project |
| 3D scenes | **React Three Fiber** + **drei** + **@react-three/postprocessing** (three.js) | MIT | React-native 3D; huge helper library; instancing for thousands of objects | Non-React → plain three.js |
| Shader backgrounds, gradients, grain, dithering, liquid-metal logos | **Paper Shaders** (`@paper-design/shaders-react`) | Apache-2.0 | Zero-dependency, very light, ~30 shaders (GrainGradient, MeshGradient, Dithering, LiquidMetal, GodRays…), live playground gives you the code | Quick colourful 3D mesh gradient with a visual editor → **ShaderGradient** (MIT) |
| Liquid-metal logo | **LiquidMetal** shader (Paper Shaders) | Apache-2.0 | The engine behind paper-design/liquid-logo | Export a video/PNG from liquid.paper.design for non-web use |
| Apple-style liquid glass | Only for marketing pages over **static** backgrounds: CSS/SVG versions (shuding/liquid-glass, nikdelvin/liquid-glass) before WebGL ones (dashersw/liquid-glass-js) | MIT (check each) | SVG/CSS is lighter and accessible | Avoid on dashboards: it lowers text contrast and can't refract a live WebGL canvas reliably |
| Charts | shadcn charts (Recharts) | MIT | Matches shadcn styling | Heavy data → visx / ECharts |
| Graphs/networks | Cytoscape.js (2D), react-force-graph-3d (3D) | MIT | Mature layouts and events | — |
| Icons | lucide-react | ISC | Consistent stroke icons | — |
| Fonts | Geist + Geist Mono, Instrument Serif (display), a script-specific font (e.g. Anek Bangla for Bangla) | SIL OFL | Free, modern, good numerals | — |

**Paid libraries** (e.g. Animmaster Lib, Aceternity Pro): fine for private/commercial work **after you read the license**. Never put their source in a **public** repo unless the license clearly allows it.

---

## 3. Claude Code setup for design work (do once per project)

```bash
npx skills@latest add emilkowalski/skills
```
Emil Kowalski's design-engineering skills. The most useful ones are `emil-design-eng`, `animate`, `review-animations`, `improve-animations` and `find-animation-opportunities`.

In Claude Code, run `/plugin marketplace add pbakaus/impeccable`, then install the Impeccable plugin from that marketplace. Impeccable (Apache-2.0) gives Claude design commands (`init`, `craft`, `critique`, `audit`, `polish`, `typeset`, `layout`, `colorize`, `bolder`, `quieter`, `animate`…) and a **deterministic AI-slop detector** that needs no API key.

```bash
npx skills add https://github.com/Leonxlnx/taste-skill
```
Optional: the Taste skill (MIT) adds three dials (DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY, 1–10). Use it for the concept stage only, then let Impeccable govern, so two skills don't give conflicting advice.

```bash
npx shadcn@latest mcp
```
The shadcn MCP server lets Claude pull exact component code. The Magic UI MCP is the `@magicuidesign/mcp` package.

```bash
npm i -D @playwright/test @axe-core/playwright
```
Screenshots, E2E and accessibility checks, so Claude can look at its own output.

**Figma MCP** (`https://mcp.figma.com/mcp`): use it only when a designer gives you Figma files. It needs a **Dev or Full seat**; View/Collab seats get only a few calls per month.

**Before installing any skill, open its SKILL.md and read it.** Skills are instructions Claude will follow, so treat them like code you are adding to your project.

---

## 4. The workflow (brief → ship)

| Step | What you do | Tool | Done when |
|---|---|---|---|
| 0. Brief | One sentence: who, what feeling, what action. Pick 3 reference sites (section 8) and write what you like about each | — | Written in `product.md` |
| 1. Design system | Write `DESIGN.md`: tokens in YAML front matter (colours, type, spacing, radius, motion) + rationale + **don'ts** | Impeccable `init` | Tokens exist before any page |
| 2. Dials | Marketing page: variance 7, motion 6–7, density 3. App/dashboard: 3 / 3 / 7 | Taste (optional) | Written in DESIGN.md |
| 3. Structure | Real content, real layout, shadcn components, **no motion yet** | shadcn MCP | Every screen works on a phone |
| 4. Type & spacing pass | Scale, rhythm, line length, alignment, hierarchy | Impeccable `typeset`, `layout` | Detector is clean |
| 5. Motion pass | Find the 5–10 moments that deserve motion; write them; review them | Emil `find-animation-opportunities` → `animate` → `review-animations` | Every motion has a written purpose |
| 6. Hero / 3D pass | Only if it passes the sphere test. **Build the poster fallback first**, then the 3D | R3F + drei, Paper Shaders | 60 fps on a mid laptop, fallback works |
| 7. Review loop | Screenshots at 375 / 768 / 1440 px, dark + light, reduced motion → Claude reviews them → fix | Playwright, built-in browser, `npx impeccable detect <url>`, Lighthouse | No P1 issues left |
| 8. Gates | Performance + accessibility checklists (section 7) | Lighthouse, axe | All green |
| 9. Licenses | Every copied/installed resource recorded with its license | `docs/third_party.md` | Complete |

### Prompts that work well with Claude
- *"Read DESIGN.md. Build the `/pricing` page with shadcn components, no animation yet. Mobile first. Then take Playwright screenshots at 375, 768 and 1440 and review them against DESIGN.md."*
- *"Use the find-animation-opportunities skill on this page. List at most 6 candidates with purpose, trigger, duration and easing. Don't write code yet."*
- *"Run review-animations on `components/hero/*`. Be strict. Fix everything rated must-fix."*
- *"Run `npx impeccable detect http://localhost:3000` and fix every finding, or explain why it's intentional."*
- *"Make this quieter"* / *"bolder"* (Impeccable dials) when the page feels too loud or too flat.

---

## 5. Motion rules of thumb

| Rule | Value |
|---|---|
| UI transitions (hover, press, toggles) | 120–200 ms |
| Drawers, dialogs, menus | 200–300 ms |
| Page/section reveals (marketing) | 500–900 ms |
| Easing | **ease-out** for things entering (fast start, soft landing). Avoid ease-in for UI; it feels laggy. Use springs for gestures/drag |
| Never animate | High-frequency or keyboard-triggered actions (typing, tab switching via keys, list filtering), or anything the user does 50× a day |
| Scale from | 0.95–0.98, never from 0 |
| Animate only | `transform` and `opacity` (GPU-friendly). Never width/height/top/left in loops |
| Stagger | 30–80 ms between items; stop after ~8 items |
| Reduced motion | Respect `prefers-reduced-motion`: replace movement with instant state or a simple fade |
| Looping animation > 5 s | Must have a visible **pause** control (WCAG 2.2.2) |
| Uncertainty / errors / risk | Calm: no shake, no bounce, no drama |

---

## 6. Code recipes (Next.js App Router, React 19)

### 6.1 Install the stack
```bash
npx create-next-app@latest my-app --ts --tailwind --eslint --app --use-npm
cd my-app
npx shadcn@latest init
npx shadcn@latest add button card dialog sheet tabs form table badge tooltip sonner chart
npm i motion gsap @gsap/react lenis lucide-react
npm i three @react-three/fiber @react-three/drei @react-three/postprocessing
npm i -E @paper-design/shaders-react          # -E pins the exact version (0.0.x has breaking changes)
npx shadcn@latest add "https://magicui.design/r/number-ticker"
```
React Bits: copy the exact `npx shadcn@latest add @react-bits/...` command from each component's page.

### 6.2 Smooth scroll synced with GSAP (homepage only)
```tsx
'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
```

### 6.3 Scroll-triggered split-text reveal (GSAP 3.13+)
```tsx
'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export function RevealHeading({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const split = SplitText.create(ref.current!, { type: 'words', mask: 'words' });
      gsap.from(split.words, {
        yPercent: 100, opacity: 0, stagger: 0.04, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
      return () => split.revert();
    });
  }, { scope: ref });
  return <h2 ref={ref}>{children}</h2>;
}
```

### 6.4 Lazy-loaded 3D with a poster fallback
```tsx
'use client';
import dynamic from 'next/dynamic';

// The heavy three.js bundle loads after the page is visible; the poster shows meanwhile.
export const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <img src="/poster.webp" alt="" className="h-full w-full object-cover" />,
});
```
Inside `HeroScene`: `<Canvas dpr={[1, 1.75]} frameloop={onScreen ? 'always' : 'never'}>`, plus drei `<PerformanceMonitor>` (drop effects when fps falls) and `<AdaptiveDpr />`. Use **InstancedMesh** for many similar objects (1 draw call). Mark the canvas `aria-hidden` and give a text description next to it.

### 6.5 Calm state reveal with Motion
```tsx
'use client';
import { motion, useReducedMotion } from 'motion/react';

export function ReasonList({ reasons }: { reasons: { id: string; text: string }[] }) {
  const reduce = useReducedMotion();
  return (
    <motion.ul initial="hidden" animate="show"
      variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.06 } } }}>
      {reasons.map((r) => (
        <motion.li key={r.id}
          variants={{ hidden: { opacity: 0, y: reduce ? 0 : 8 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.2, ease: 'easeOut' }}>
          {r.text}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

### 6.6 Shader background (Paper Shaders)
```tsx
'use client';
import { GrainGradient } from '@paper-design/shaders-react';

// Copy the exact props from the live playground at shaders.paper.design — it generates the code.
export function Atmosphere() {
  return <GrainGradient style={{ position: 'absolute', inset: 0 }} />;
}
```

### 6.7 Playwright screenshot sweep (so Claude can review the UI)
```ts
// tests/visual.spec.ts
import { test } from '@playwright/test';
const pages = ['/', '/customer', '/ops'];
for (const width of [375, 768, 1440]) {
  for (const path of pages) {
    test(`shot ${path} @${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path);
      await page.screenshot({ path: `shots/${path.replace(/\//g, '_') || 'home'}-${width}.png`, fullPage: true });
    });
  }
}
```
Then tell Claude: *"Read every image in `shots/` and list visual problems by severity."*

---

## 7. Quality gates (check before every deploy)

**Performance**
- [ ] LCP < 2.5 s, INP < 200 ms, CLS < 0.1 (Lighthouse, mobile)
- [ ] The hero headline is HTML, not canvas or an image
- [ ] 3D, shaders and GSAP load lazily; the home route JS doesn't block first paint
- [ ] 60 fps on a mid laptop, ≥ 30 fps on a mid phone; effects scale down automatically
- [ ] Off-screen canvases stop rendering

**Accessibility**
- [ ] WCAG AA contrast for every text/background pair (check each token pair)
- [ ] Meaning never by colour alone (icon + label too)
- [ ] Full keyboard path, visible focus rings
- [ ] `prefers-reduced-motion` honoured everywhere; looping motion has a pause button
- [ ] Canvas `aria-hidden` + text alternative; axe shows 0 serious issues

**Design**
- [ ] `npx impeccable detect <url>` is clean (or each finding is consciously accepted)
- [ ] `review-animations` shows no must-fix items
- [ ] Every animation has a written purpose
- [ ] Every 3D element passes the sphere test

**Legal**
- [ ] Every copied component, shader, font and library is in `third_party.md` with its license
- [ ] No paid source code in a public repo; Commons Clause and GSAP terms respected

---

## 8. Where to study taste (inspiration only — never copy assets or code)

| Source | Use it for |
|---|---|
| **Awwwards** (Sites of the Day) | Ambitious layouts, motion, type |
| **Godly** | Curated modern web design, with motion previews |
| **Mobbin** | Real app UI patterns (dashboards, forms, onboarding) |
| **Codrops** (tympanus.net/codrops) | WebGL/shader/scroll techniques with code |
| **Paper Shaders gallery**, **React Bits**, **Magic UI**, **Aceternity** showcases | What each component looks like before you install it |
| Product sites known for craft: Linear, Vercel, Stripe, Apple | Restraint, rhythm, typography |

How to study: screenshot a section, write **one sentence** about *why* it works (spacing? contrast? a single accent colour?), and put that rule in your DESIGN.md. Taste is built by noticing, not by scrolling.

---

## 9. Freshness check (start of every new project)

1. `npm view <pkg> version` for Next.js, React, Motion, GSAP, three, R3F, drei, Paper Shaders.
2. Re-read the licenses of anything you copy (React Bits, Aceternity, shaders, fonts).
3. Check the security advisories for Next.js and patch first.
4. Re-check skill repos (Emil, Impeccable, Taste) for new versions; read the SKILL.md before updating.

---

## 10. Worked example — UVERA (AI DEV FEST 2026)

- **Theme:** "editorial monochrome", black/white + one Volt accent for the single key moment (the Pause); risk colours only for meaning.
- **Homepage:** R3F "Trust Field" (a 3-layer network built from real synthetic data, where the layers = the 3 user portals; a scam payment stops mid-edge and a pause ring holds), Paper Shaders GrainGradient atmosphere, LiquidMetal logo in the intro/footer only, GSAP SplitText + ScrollTrigger story with Lenis, Aceternity Tracing Beam as a "money trail", Magic UI NumberTicker/BentoGrid/MagicCard/AnimatedBeam.
- **Portals:** shadcn + Motion only (calm, fast). React Bits DecryptedText for trace IDs, BorderBeam while scoring.
- **Not used (and why):** Anime.js (duplicate engine), ShaderGradient (Paper Shaders covers it), liquid-glass-js (contrast + no React + glassmorphism), Animmaster (paid, unclear public-repo license), Figma MCP (no Figma source).
