# Build brief: Abdullah Rubab — 3D research portfolio

Hand this entire document to your AI coding agent as the build spec. Everything it needs — content, links, design system, 3D behavior, tech stack, and non-negotiable requirements — is here.

---

## 0. Mission

Build a visually distinctive, research-grade 3D portfolio website for Abdullah Rubab, a final-year Computer Science undergraduate targeting fully-funded master's/PhD scholarships in Europe (Spain primary) and Australia. The audience is scholarship committees (Erasmus Mundus, La Caixa, university admissions panels) and potential academic supervisors — not recruiters or general visitors.

**Governing concept: "Calibrated Confidence."** Rubab's research is about teaching AI models to know what they don't know (evidential deep learning, uncertainty quantification). The site should *perform* that idea, not just describe it: sections open with raw, unresolved visuals that sharpen into confident, clear ones as the visitor scrolls or interacts. Every 3D element must trace back to a real fact below — nothing purely decorative.

---

## 1. Person & identity

- **Name:** Abdullah Rubab
- **Location:** Uttara, Dhaka-1230, Bangladesh
- **Education:** B.Sc. in Computer Science & Engineering, Daffodil International University (DIU), 2023–present, CGPA 3.84/4.00. HSC (Science), B.A.F. Shaheen College Kurmitola, 2019–2021, GPA 5.00/5.00.
- **Current roles:**
  - Research Associate, NanoBio Technology Center (NBTC), DIU — HIRL Lab, under Dr. Md. Ali Hossain (Associate Professor, Dept. of CSE & Director, NBTC)
  - Team Lead & AI/ML Backend Developer — DIU GPU Cluster / Distributed AI Infrastructure Platform (an internal initiative to connect and operate DIU's existing GPUs as a shared campus resource)
  - Lead AI/ML & Backend Developer — Keyoon.com *(Rubab: add 1–2 lines on what Keyoon.com does and your specific contributions — the agent needs this to write an accurate project blurb; don't let it guess)*
- **Research focus:** uncertainty-aware medical AI — evidential deep learning, few-shot learning, explainable AI (XAI), multimodal fusion, knowledge distillation, applied to medical imaging.
- **Goal the site exists to serve:** a fully funded master's or PhD in Europe, Spain as primary target, targeting a September 2027 intake.

### Contact & links
- Email (academic): rubab2305101813@diu.edu.bd
- Email (personal): rubab2712@gmail.com
- Phone: +8801533460727 — *consider carefully whether to put this on the public site; most academic portfolios list only email + LinkedIn publicly and keep phone for the CV PDF only.*
- GitHub: https://github.com/ABRUBAB
- LinkedIn: https://linkedin.com/in/abdullah-rubab
- Google Scholar: https://scholar.google.com/citations?user=Tm83UVUAAAAJ
- ResearchGate: *(Rubab: paste your exact profile URL here)*

### Skills & tools (for a skills section, not a wall of badges — group meaningfully)
- Languages: Python, C++, Java
- Frameworks: PyTorch, TensorFlow, Django
- Medical AI: few-shot learning, medical image analysis (classification & segmentation), MONAI
- Advanced DL: evidential deep learning, uncertainty quantification, RAG, CBAM attention
- Federated learning: privacy-preserving distributed model training
- Explainability: Grad-CAM, LIME, SHAP, UMAP
- Tooling: Git/GitHub, Google Colab/Kaggle, MySQL, LaTeX, Weights & Biases, OpenCV, Albumentations, Hugging Face Transformers, Scikit-learn, XGBoost
- Spoken languages: Bengali (proficient), English (proficient), Hindi (intermediate), Spanish (elementary) — the Spanish is a nice, true detail to surface near the "why Spain" section.

---

## 2. Publications — display status with total clarity

Scholarship reviewers scan for exactly this: venue, indexing, and status. Never blur these together.

| Status | Paper | Details |
|---|---|---|
| **Published** | Cactus ViT — "Sample-Efficient Fine-Grained Classification of Cactus Species Using Hybrid Vision Transformers and Knowledge Distillation" | A. Rubab and M. T. Hasan, 2025 28th ICCIT, Cox's Bazar, Bangladesh, pp. 4837–4842. IEEE. DOI: 10.1109/ICCIT68739.2025.11491549 |
| **Accepted** | BrainDistill — "Explainable Multi-Scale Knowledge Distillation with Uncertainty-Aware Inference for Efficient Brain Tumor MRI Classification" | BECITHCON 2026, Paper ID 378. DenseNet-121 + ResNet-50 teacher ensemble distilled into MobileNetV3-Large; multi-scale KD, MC Dropout uncertainty, XAI |
| **Accepted** | Light-BloodNet — "An Efficient Attention-Guided Deep Learning Framework with Explainability for Blood Cell Classification" | BECITHCON 2026, Paper ID 560. EfficientNetV2-S with dual-position CBAM, MSFF, and Evidential Deep Learning, on BloodMNIST |
| **Under review (Q1)** | RAM-ViT — Retrieval-Augmented Evidential Vision Transformer for cross-modal glioma grading | BraTS 2021 dataset; uncertainty-guided selective prediction, calibrated confidence estimation. Presented as a poster at the DIU-DoR Poster Presentation 2026 |
| **Under review (Q1)** | PUMA-MIL / PUMA-MIL-Lite — Multimodal Multiple Instance Learning for glioma detection | Full interpretability pipeline (Grad-CAM, LIME, SHAP) and sensitivity analysis for clinical deployment |
| **In progress** | MSEA-Net — "Multi-Scale Evidential Attention Network with Uncertainty-Governed Triage for Trustworthy Gastrointestinal Endoscopy Classification" | Adaptive Channel-Spatial Attention (ACSA) module + Gated Feature Fusion (GFF) engine + Evidential Deep Learning head (Dirichlet distribution). Uncertainty-governed triage reaches 98.33% accuracy at 70% patient coverage. Validated with Grad-CAM, LIME, SHAP, and UMAP. *Note: confirm final co-author names before this is public — an early draft has placeholder co-author names.* |
| **In progress** | HCC-TACE-Seg — improving TACE response prediction | ≈97-patient dataset; frozen foundation-model features + classical ML classifiers; targeting 0.75–0.80 AUROC |

---

## 3. Flagship projects (for deep-dive cards)

- **HealthSentinel AI** — a federated, tri-modal (clinical text + imaging + tabular vitals), uncertainty-aware medical diagnostic platform with differential-privacy guarantees and epidemiological context injection, designed for resource-limited healthcare settings.
- **AI-Powered Brain Tumor MRI Classification** — ensemble deep learning system for brain tumor MRI classification, PyTorch, Grad-CAM explainability. github.com/ABRUBAB/brain-tumor-mri-classification
- **ResearchForge-AI** — an end-to-end multi-agent system designed to support Q1 research work. github.com/ABRUBAB/ResearchForge-AI
- **AURA-Cluster** — an evidential-deep-learning system for predicting GPU infrastructure failures. **Won the DIU AI Innovation Hackathon 2026.**
- **DIU Distributed AI Infrastructure Platform** — a proposal and working system for a campus-wide platform to connect, pool, and intelligently operate DIU's existing GPUs, shared with DIU's Chairman and senior leadership. Rubab is team lead and AI/ML backend developer. *Note: the source deck marks some figures "(audit)" — confirm these against DIU's actual hardware records before publishing any specific numbers on the site.*

---

## 4. Leadership & recognition

- **Winner**, DIU AI Innovation Hackathon 2026 (AURA-Cluster)
- bKash × NSUCEC Datathon (customer churn prediction) — public leaderboard rank 48/196 at 0.98525 AUC, LightGBM-led ensemble
- Poster presentation, DIU-DoR Poster Presentation 2026 (RAM-ViT)
- Executive Member, DIU CPC (Computer Programming Club), ACM Wing, 2024 — examiner/organizer for "Unlock the Algorithm" and "Take-Off Programming Contest"
- Volunteer, Bangladesh National AI Olympiad 2026 (BDAIO)
- Volunteer, DDI Expo 2026 (guest support team)
- Committee Member, B.A.F. Shaheen College Kurmitola IT Club (2020–2021) & Atomic Science Club (2019)
- Community volunteering — Mukafa Charity (Uttara, Dhaka), Uttara Youth Society, Student Welfare Foundation Bangladesh
- Finalist, Take-Off Programming Contest, Spring 2023 (17th position); Finalist, UTA Contest, Spring 2024 (Top 50); Champion, Saifur's Web Design Competition, 2019

---

## 5. Trajectory — why this scholarship push

- Primary target: **Spain** — Erasmus Mundus EMAI, UC3M, UPC, UPF, La Caixa INPhINIT (funding vehicle); long-term aspiration toward the Princess of Girona Foundation (FPdGi) award
- Also comparing: Germany, Netherlands, Sweden, Finland, France, Italy, and Australia
- Target intake: September 2027

---

## 6. Visual design system

**Palette — maroon, black, and gold.** This isn't arbitrary: it's the palette of academic regalia and crests, which reads as *scholarly gravitas* rather than "generic tech portfolio." Use it with restraint — three colors, used consistently, beats six colors used loosely.

| Role | Color | Hex |
|---|---|---|
| Background / base | Near-black charcoal | `#0B0A0C` |
| Primary accent (uncertainty, in-progress states) | Deep oxblood maroon | `#6E1423` |
| Secondary accent (**resolved / confident** states only) | Warm brass gold | `#C9A227` |
| Primary text | Warm off-white | `#EDE7DD` |
| Secondary text | Muted warm gray | `#A69C93` |
| Card surfaces | Slightly lifted charcoal | `#151316` |

Rule: **gold only appears at moments of resolution** — a node snapping into place, an "Accepted"/"Published" status pill, the arc landing on a target city. If gold is used everywhere, it stops meaning anything. Maroon carries everything still "in motion" or "in progress."

**Typography:**
- Display/headlines: a serif with gravitas — Fraunces, Newsreader, or Canela
- Body/data/UI: a clean grotesk — Inter, General Sans, or Söhne

**Motion motif:** every section entrance repeats a blur → sharp "resolving" transition (250–500ms), tying back to the concept without being sluggish.

---

## 7. The 3D system — one grammar, many scenes

Don't build a single hero splash and stop — build a small family of 3D moments that all share the same "evidence resolving into confidence" grammar, so the site feels deliberately designed rather than templated.

1. **Hero — portrait resolution.** This is the site's signature moment and its literal thesis. Rubab's own photo drives a particle-image-reveal: on load, a cloud of scattered points (colored maroon-to-gold, sampled from the photo's tones) hangs in space with no recognizable shape — "raw, uncertain evidence." As the visitor scrolls, the particles converge and lock into a sharp, recognizable portrait, with the identity statement resolving alongside it. The same particles then loosen slightly and drift outward into knowledge-graph nodes (papers/projects) connected by edges (shared methods: evidential DL, XAI, few-shot, federated learning) — so the portrait visually *becomes* the constellation, one continuous idea rather than two effects stitched together. Gold pulses travel along edges into "resolved" (published/accepted) nodes. See the implementation note just below the list.
2. **Research pillars — four rotating faceted forms** (icosahedra, or tetrahedra evoking a Dirichlet simplex), one per pillar: Evidential DL, Few-Shot Learning, XAI, Federated Learning. On hover/tap, the nearest facet lights gold and a label appears.
3. **Publications ladder.** A 3D staircase rising left to right; each step is one publication. Step finish encodes status — matte stone (in progress), brushed maroon (under review), gold-edged (accepted), solid gold (published). The camera glides along the staircase as the section scrolls.
4. **Project deep-dive cards.** Floating 3D slabs that tilt gently toward the cursor. Front face: project name and one-line summary. Back face (on tap): a real result image — a Grad-CAM overlay, an ROC/coverage curve, a screenshot — mapped as an actual texture, not a placeholder gradient.
5. **Systems & leadership — a minimal circuit/network lattice** representing the GPU cluster, with a few nodes pulsing to suggest live infrastructure. Deliberately more angular and "engineering" than the organic research-pillar shapes, to visually separate builder work from research work.
6. **Recognition shelf.** A simple plinth with a small number of abstract faceted gold forms (not literal trophy clip-art) for the hackathon win and datathon result.
7. **Trajectory globe.** A low-poly globe, maroon, with a glowing gold arc from Dhaka to Madrid/Barcelona, labeled with target programs (EMAI, UC3M, UPC, UPF) as it lands.

Reuse geometries and materials across scenes rather than authoring unique ones per section — this keeps bundle size and load time down. Target: every scene visible and interactive within ~1.5s on a mid-range laptop.

**Avatar implementation note (for the agent):**
- Draw the uploaded photo to an offscreen `<canvas>`, read its pixel data, and generate particle positions + colors from it (skip near-transparent or flat background pixels if the photo has a plain background — this gives a much cleaner silhouette). Feed that into a Three.js `Points` field via React Three Fiber.
- Two states: **scattered** (each particle offset from its true position by a large random amount) and **resolved** (each particle at its true image-mapped position). Interpolate between them with GSAP or a scroll-driven progress value from 0 to 1.
- Recolor every particle by mapping the pixel's luminance through the maroon-to-gold duotone gradient in §6, rather than keeping the photo's original colors — this is what makes the portrait feel like it belongs to the site instead of looking like a pasted-in photo.
- **Simpler fallback**, if the particle version is too heavy for a first pass: a static version of the same idea — the photo desaturated and run through the same maroon-to-gold duotone map, set inside a thin gold-bordered frame, with a subtle particle-dissolve effect only at the frame's edges. Less code, most of the visual payoff.
- **Photo spec to hand the agent:** one high-resolution headshot, 1500px+ on the short side, well-lit, ideally a plain or simply-blurred background (a busy background makes clean particle extraction much harder). A slight 3/4 angle usually reads better in a particle reveal than a dead-on passport-style shot, but either works.

---

## 8. Section-by-section blueprint

1. **Hero** — one-line identity statement ("I build medical AI that knows what it doesn't know") over the evidence-constellation scene.
2. **Why this work** — 2–3 sentences: black-box medical AI is dangerous in resource-limited settings, so the work is about models that report their own uncertainty.
3. **Research pillars** — the four pillar cards (§6.2 above).
4. **Publications** — the status ladder (§2), fully linked (DOI, venue).
5. **Flagship projects** — deep-dive cards (§3).
6. **Systems & leadership** — GPU cluster team lead role, NBTC Research Associate role, Keyoon.com role.
7. **Recognition** — hackathon win, datathon result, poster presentation.
8. **Trajectory: why Spain / Europe** — the globe scene (§7.7), naming the actual target programs.
9. **Footer** — CV download (PDF), Scholar, GitHub, LinkedIn, email.

---

## 9. Tech stack

- **Framework:** Next.js (App Router) + TypeScript
- **3D:** React Three Fiber + drei (skip physics libraries — nothing here needs real physics)
- **Scroll-linked animation:** GSAP + ScrollTrigger, or Framer Motion's `useScroll`
- **Styling:** Tailwind CSS, with the palette in §6 defined as CSS variables/theme tokens (never hardcode hex values inline)
- **Content:** a typed `content/` module (JSON or TS) holding every fact from sections 1–5, so no factual content is hardcoded inside components — this makes future updates (new papers, new status) a data edit, not a code edit
- **Deployment target:** Vercel (see §11)

---

## 10. Non-negotiable requirements

- **`prefers-reduced-motion` fallback:** replace scroll-linked 3D transitions with simple fades.
- **"Reviewer mode" toggle** in the header: swaps to a fast, static, text-first layout containing every fact (publications, projects, contact) with zero 3D dependency. This is the single most important accessibility/practicality feature — committee members often review on slow connections or old laptops, and the work must never be gated behind WebGL.
- **Lazy-load the 3D canvas** (dynamic import with `ssr:false` in Next.js) so it never blocks first paint.
- Every 3D element must trace to a real fact in the content module — no purely decorative geometry.
- Downloadable CV as a linked PDF; external links (Scholar, GitHub, LinkedIn) open in new tabs.
- Basic SEO/OpenGraph meta tags (name + the one-line identity statement) — committee members sometimes just paste the link and glance at the preview card.
- Target Lighthouse performance ≥ 85 on mobile for the Reviewer-mode path.

---

## 11. Assets checklist — what to hand your agent besides this brief

Along with this document, give the agent:

1. **Your headshot photo(s)** — see the avatar implementation note in §7 for exact specs (1500px+, plain background preferred).
2. **Your CV as a PDF** — for the direct-download link in the footer. The version you already have is fine.
3. **The domain name you've registered (or plan to)** — the agent needs the exact string for the metadata/OpenGraph tags in §10.
4. **Any institution or company logos you want displayed** — DIU, NBTC, Keyoon.com — as transparent PNG or SVG, only if you want a logo row (optional; plain text credits work fine without them).
5. **Your ResearchGate URL**, and your **ORCID iD** if you've minted one — small credibility signals that belong in the footer alongside Scholar and GitHub.
6. **The two open placeholders from this brief** — a real 1–2 line description of what Keyoon.com is and your role there (§1), and confirmation of MSEA-Net's final co-author names (§2). The agent shouldn't guess either.
7. **A decision on the contact method** — a plain `mailto:` link is the zero-maintenance default; a working contact form needs either a serverless function or a free service like Formspree. Tell the agent which you'd rather have.
8. *(Optional, strengthens the "Recognition" section)* a photo or screenshot proof of the hackathon win and the datathon leaderboard rank — good texture material for the recognition shelf, not required.

Everything else — every fact, link, color, and behavior — is already specified above.

---

## 12. Deployment & domain — for you, not the agent

**Hosting:** Deploy on **Vercel**. Its free "Hobby" tier is free forever for personal, non-commercial sites like this one — 100GB of bandwidth/month, automatic HTTPS, and it's the natural home for a Next.js + React Three Fiber app (zero-config builds, instant previews on every push). Connect your GitHub repo and every push auto-deploys.

**Domain registrar:** Buy the domain separately from hosting — don't bundle it with a registrar's own hosting plan, since that makes it harder to move later.
- **Porkbun** — simplest honest option: flat ~$11/year for `.com`, same price to register and renew (no bait-and-switch), free WHOIS privacy and SSL included. Good default if you want a normal registrar dashboard.
- **Cloudflare Registrar** — sells at true wholesale cost (~$10.44/year for `.com`, literally no markup), but it requires using Cloudflare's own DNS/nameservers, which is a small extra step if you're not already familiar with it.
- **Avoid GoDaddy** — as of early 2026 they reclassified all customers as "Business Customers" in their ToS, stripping consumer protections, on top of already having the highest renewal prices in the market.

**Domain name:** something like `abdullahrubab.com`, `rubab.dev`, or `arubab.me` — a `.dev` or `.me` reads well for an individual research portfolio and is usually available even when `.com` isn't. Once bought, point it at Vercel: add the domain in your Vercel project settings, then update the two DNS records it gives you at your registrar. Takes about 10 minutes; propagation is usually near-instant, sometimes up to a few hours.

