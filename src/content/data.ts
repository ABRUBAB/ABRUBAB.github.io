// Single source of truth for everything shown on the site.
// Publication statuses follow the CV (Europass, Oct 2026). If a status changes
// (e.g. RAM-ViT gets submitted), edit it here — the UI updates itself.

export const profile = {
  name: "Abdullah Rubab",
  shortName: "Rubab",
  role: "AI researcher & engineer",
  tagline: "Medical imaging, intelligent systems, and products that ship.",
  seeking: "Open to MSc · Sept 2027",
  seekingLong: "MSc admissions · Sept 2027 · Europe & Australia",
  location: "Dhaka, Bangladesh",
  timeZone: "Asia/Dhaka",
  email: "rubab2712@gmail.com",
  academicEmail: "rubab2305101813@diu.edu.bd",
  cv: "/Rubab_CV_1.pdf",
  site: "https://abdullahrubab.me",
} as const;

export const socials = [
  { id: "github", label: "GitHub", href: "https://github.com/ABRUBAB" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/abdullah-rubab-1a947a200/" },
  { id: "scholar", label: "Google Scholar", href: "https://scholar.google.com/citations?user=Tm83UVUAAAAJ" },
  { id: "orcid", label: "ORCID", href: "https://orcid.org/0009-0003-5063-9320" },
  { id: "researchgate", label: "ResearchGate", href: "https://www.researchgate.net/profile/Abdullah-Rubab" },
] as const;

export type SocialId = (typeof socials)[number]["id"];

/* ───────────────────────── Work ───────────────────────── */

export interface Project {
  id: string;
  title: string;
  blurb: string;
  accent: string; // sampled from each product's own UI
  badge?: string;
  role?: string;
  tags: string[];
  live: string;
  host: string;
  code: string;
  video: string;
  poster: string;
}

// Only products whose live UI was verified working (Oct 22, 2026).
export const projects: Project[] = [
  {
    id: "yinglong",
    title: "YINGLONG",
    blurb: "An AI agent that pays for you — and can't break your rules.",
    accent: "#9bc53d",
    badge: "Agent wallet · dual-chain",
    tags: ["Solidity", "FISCO BCOS", "Base Sepolia", "Passkeys", "Next.js"],
    live: "https://app.yinglong-agent.tech",
    host: "app.yinglong-agent.tech",
    code: "https://github.com/ABRUBAB/YINGLONG",
    video: "/assets/projects/yinglong.mp4",
    poster: "/assets/projects/yinglong-poster.webp",
  },
  {
    id: "neuralsched",
    title: "NeuralSched",
    blurb: "GPU-cluster middleware that places, greens and protects AI jobs.",
    accent: "#8b7cff",
    badge: "1st place · AI Hackathon 2026",
    role: "Team Leader & ML Architect",
    tags: ["GraphSAGE + PPO", "TCN forecasting", "Kubernetes / SLURM", "FastAPI"],
    live: "https://neuralsched.vercel.app",
    host: "neuralsched.vercel.app",
    code: "https://github.com/ABRUBAB/neuralsched",
    video: "/assets/projects/neuralsched.mp4",
    poster: "/assets/projects/neuralsched-poster.webp",
  },
  {
    id: "shadowastra",
    title: "ShadowAstra Atlas",
    blurb: "Rehearse Moon and Mars missions on Earth's best analog sites.",
    accent: "#e8c07a",
    badge: "NASA Space Apps 2026 · Dhaka",
    tags: ["React 19", "Three.js", "NASA + ESA data", "TypeScript"],
    live: "https://shadowastra-atlas.vercel.app",
    host: "shadowastra-atlas.vercel.app",
    code: "https://github.com/ABRUBAB/ShadowAstra_Atlas",
    video: "/assets/projects/shadowastra.mp4",
    poster: "/assets/projects/shadowastra-poster.webp",
  },
  {
    id: "uvera",
    title: "UVERA",
    blurb: "A trust layer that pauses mobile-money scams before the money moves.",
    accent: "#c8ff3d",
    badge: "4th place · AI DEV FEST 2026",
    tags: ["FastAPI", "Next.js 16", "Bangla + English", "Risk AI"],
    live: "https://uvera-ai.vercel.app",
    host: "uvera-ai.vercel.app",
    code: "https://github.com/ABRUBAB/takaresolve-ai-hackathon-2026",
    video: "/assets/projects/uvera.mp4",
    poster: "/assets/projects/uvera-poster.webp",
  },
];

export interface MoreBuild {
  id: string;
  title: string;
  line: string;
  href: string;
  kind: "brain" | "agents" | "xray" | "memory";
}

// Code-only repositories (no live UI to show).
export const moreBuilds: MoreBuild[] = [
  {
    id: "brain",
    title: "Brain Tumor MRI",
    line: "ConvNeXt · ViT · Grad-CAM++",
    href: "https://github.com/ABRUBAB/brain-tumor-mri-classification",
    kind: "brain",
  },
  {
    id: "researchforge",
    title: "ResearchForge-AI",
    line: "13-agent research system",
    href: "https://github.com/ABRUBAB/ResearchForge-AI",
    kind: "agents",
  },
  {
    id: "ur-protonet",
    title: "UR-ProtoNet",
    line: "Few-shot chest X-ray",
    href: "https://github.com/ABRUBAB/UR-ProtoNet",
    kind: "xray",
  },
  {
    id: "clbench",
    title: "clbench",
    line: "Continual-learning benchmark",
    href: "https://github.com/ABRUBAB/cl-benchmark",
    kind: "memory",
  },
];

/* ───────────────────────── Research ───────────────────────── */

export type PaperStatus = "published" | "presented" | "review" | "ready" | "preparing";
export type GlyphKind = "vit" | "mri" | "cells" | "xray" | "liver" | "gut" | "graph" | "bags";

export interface Paper {
  id: string;
  title: string;
  full: string;
  venue: string;
  year: number;
  status: PaperStatus;
  role: "First author" | "Co-author";
  glyph: GlyphKind;
  doi?: string;
  code?: string;
  /** shown in the detail view */
  venueFull: string;
  publisher?: string;
  pages?: string;
  /** exact wording for the status, with dates where the CV gives them */
  statusNote: string;
  authors: string;
  /** supervisor / collaborator */
  with?: string;
  /** plain-English summary, written from the abstract or the public repository */
  summary: string;
  ideas: string[];
}

export const statusMeta: Record<PaperStatus, { label: string; color: string }> = {
  published: { label: "Published", color: "#1b35bd" },
  presented: { label: "Presented", color: "#3d63ff" },
  review: { label: "Under review", color: "#e34400" },
  ready: { label: "Manuscript complete", color: "#464541" },
  preparing: { label: "In preparation", color: "#8a8984" },
};

export const papers: Paper[] = [
  {
    id: "cactus-vit",
    title: "Cactus ViT",
    full: "Sample-Efficient Fine-Grained Classification of Cactus Species Using Hybrid Vision Transformers and Knowledge Distillation",
    venue: "IEEE ICCIT 2025",
    venueFull: "2025 28th International Conference on Computer and Information Technology (ICCIT)",
    publisher: "IEEE",
    pages: "pp. 4837–4842",
    year: 2025,
    status: "published",
    statusNote: "Published",
    role: "First author",
    authors: "A. Rubab, M. T. Hasan",
    glyph: "vit",
    doi: "https://doi.org/10.1109/ICCIT68739.2025.11491549",
    summary:
      "Telling look-alike species apart is hard when there are few labelled photos. This paper builds a compact pipeline for cactus classification: a hybrid CNN–Vision Transformer teacher, pre-trained with a masked autoencoder, is distilled into a lightweight MobileViT student. Over three seeded runs the student reaches 99.4% accuracy with only a third of the teacher’s parameters.",
    ideas: ["Hybrid CNN–ViT", "Masked-autoencoder pre-training", "Knowledge distillation", "MobileViT", "Fine-grained recognition"],
  },
  {
    id: "braindistill",
    title: "BrainDistill",
    full: "Explainable Multi-Scale Knowledge Distillation with Uncertainty-Aware Inference for Efficient Brain Tumor MRI Classification",
    venue: "IEEE BECITHCON 2026",
    venueFull: "International Conference on Biomedical Engineering, Computer and Information Technology for Health (BECITHCON 2026) · IUBAT, Dhaka",
    year: 2026,
    status: "presented",
    statusNote: "Accepted and presented, 4–5 September 2026 · proceedings forthcoming",
    role: "First author",
    authors: "A. Rubab et al.",
    glyph: "mri",
    summary:
      "Large MRI classifiers are accurate but heavy. BrainDistill passes what a big model knows, at several feature scales, into a compact brain-tumour classifier, then explains its predictions and reports how uncertain it is on each scan.",
    ideas: ["Knowledge distillation", "Multi-scale features", "Explainable AI", "Uncertainty-aware inference", "Brain MRI"],
  },
  {
    id: "light-bloodnet",
    title: "Light-BloodNet",
    full: "An Efficient Attention-Guided Deep Learning Framework with Explainability for Blood Cell Classification",
    venue: "IEEE BECITHCON 2026",
    venueFull: "International Conference on Biomedical Engineering, Computer and Information Technology for Health (BECITHCON 2026) · IUBAT, Dhaka",
    year: 2026,
    status: "presented",
    statusNote: "Accepted and presented, 4–5 September 2026 · proceedings forthcoming",
    role: "First author",
    authors: "A. Rubab et al.",
    glyph: "cells",
    summary:
      "A lightweight, attention-guided network for classifying blood-cell images. Attention steers the model toward the informative parts of each cell so it can stay small and fast, and explanations show what it looked at.",
    ideas: ["Attention-guided CNN", "Blood-cell classification", "Explainability", "Efficiency"],
  },
  {
    id: "ur-protonet",
    title: "UR-ProtoNet",
    full: "UR-ProtoNet: Evidential Retrieval-Augmented Prototypical Networks for Uncertainty-Aware Few-Shot Chest X-Ray Classification Across Domain Shifts",
    venue: "Intelligence-Based Medicine · Elsevier",
    venueFull: "Intelligence-Based Medicine",
    publisher: "Elsevier",
    year: 2026,
    status: "review",
    statusNote: "Submitted · under review",
    role: "First author",
    authors: "A. Rubab et al.",
    glyph: "xray",
    code: "https://github.com/ABRUBAB/UR-ProtoNet",
    summary:
      "With only a handful of labelled chest X-rays, class prototypes are unstable, and models fail silently when a new hospital’s images look different. UR-ProtoNet retrieves matching examples from a curated memory bank, blends them with the few-shot prototypes through a learned gate, and returns an uncertainty score with every prediction, so it can say when it does not know.",
    ideas: ["Few-shot learning", "Retrieval memory", "Evidential deep learning", "Chest X-ray", "Domain shift"],
  },
  {
    id: "tace-hcc",
    title: "TACE response in HCC",
    full: "A Multimodal 3D Peritumoral Representation Learning Framework for Predicting Chemoembolization Resistance in Hepatocellular Carcinoma: An International Multi-Cohort Validation",
    venue: "Briefings in Bioinformatics · OUP",
    venueFull: "Briefings in Bioinformatics",
    publisher: "Oxford University Press",
    year: 2026,
    status: "review",
    statusNote: "Submitted · under review · NBTC project",
    role: "Co-author",
    authors: "NanoBio Technology Center (NBTC) research team, DIU · A. Rubab, co-author",
    with: "Dr. Md. Ali Hossain · Director, NBTC",
    glyph: "liver",
    summary:
      "Chemoembolization (TACE) does not work for every liver-cancer patient. This framework learns from 3D imaging of the tissue around the tumour, together with other data modalities, to predict who is likely to resist TACE, and is validated across international cohorts.",
    ideas: ["3D peritumoral features", "Multimodal learning", "Hepatocellular carcinoma", "TACE response", "Multi-cohort validation"],
  },
  {
    id: "msea-net",
    title: "MSEA-Net",
    full: "MSEA-Net: Uncertainty-Governed Selective Diagnosis through Multi-Scale Evidential Attention for Gastrointestinal Endoscopy",
    venue: "Elsevier journal · planned",
    venueFull: "Elsevier journal · submission planned",
    publisher: "Elsevier",
    year: 2026,
    status: "ready",
    statusNote: "Manuscript complete · submission planned",
    role: "First author",
    authors: "A. Rubab et al.",
    with: "Dr. Md. Zahid Hasan · Director, HIRL",
    glyph: "gut",
    code: "https://github.com/ABRUBAB/MSEA-Net",
    summary:
      "An endoscopy classifier that knows when to defer. Multi-scale attention and gated feature fusion feed an evidential head that outputs an uncertainty with every prediction; the most uncertain frames are handed to a clinician instead of guessed, with conformal calibration behind the confidence.",
    ideas: ["Multi-scale attention", "Evidential learning", "Conformal calibration", "Selective prediction", "GI endoscopy"],
  },
  {
    id: "ram-vit",
    title: "RAM-ViT",
    full: "RAM-ViT: Retrieval-Augmented Evidential Vision Transformer for Cross-Modal Glioma Grading",
    venue: "DIU-DoR Poster 2026",
    venueFull: "Presented as a poster at the DIU-DoR Annual Poster Presentation 2026 · manuscript in preparation",
    year: 2026,
    status: "preparing",
    statusNote: "Poster presented · manuscript in preparation",
    role: "First author",
    authors: "A. Rubab et al.",
    with: "Dr. Md. Ali Hossain · Director, NBTC",
    glyph: "graph",
    code: "https://github.com/ABRUBAB/ram_vit",
    summary:
      "Glioma MRI is read across several sequences, and models rarely say how sure they are. RAM-ViT feeds a frozen Vision Transformer with paired T1-CE and FLAIR slices, retrieves similar labelled examples from a small support memory, fuses the two sequences with cross-attention, and reports calibrated uncertainty so low-confidence slices can be set aside.",
    ideas: ["Vision Transformer", "Retrieval-augmented", "Cross-modal fusion", "Evidential learning", "Glioma MRI"],
  },
  {
    id: "puma-mil",
    title: "PUMA-MIL",
    full: "PUMA-MIL / PUMA-MIL-Lite: Multimodal Multiple Instance Learning for Glioma Detection with Clinical Interpretability",
    venue: "Manuscript",
    venueFull: "Manuscript in preparation",
    year: 2026,
    status: "preparing",
    statusNote: "Manuscript in preparation",
    role: "First author",
    authors: "A. Rubab et al.",
    with: "Dr. Md. Ali Hossain · Director, NBTC",
    glyph: "bags",
    code: "https://github.com/ABRUBAB/puma_mil",
    summary:
      "Finds tumour-bearing slices in multi-sequence brain MRI by reading each slice in the context of its neighbours. Learned reliability weights decide how much to trust each MRI sequence, a small Transformer models the slice neighbourhood, and prototype-anchored multiple-instance pooling copes with ambiguous boundary slices, with calibrated confidence.",
    ideas: ["Multiple-instance learning", "Multi-sequence MRI", "Slice context", "Prototype anchoring", "Calibrated confidence"],
  },
];

/* ───────────────────────── Experience ───────────────────────── */

export interface Role {
  id: string;
  title: string;
  org: string;
  period: string;
  now: boolean;
  logo: string;
  logoBg: "light" | "dark";
  tags: string[];
  /** supervisor / collaborator, shown as a quiet line */
  with?: string;
}

export const roles: Role[] = [
  {
    id: "nbtc",
    title: "Lead Research Assistant",
    org: "NanoBio Technology Center · DIU",
    period: "2024 → now",
    now: true,
    logo: "/assets/logos/nbtc.webp",
    logoBg: "light",
    tags: ["Multimodal oncology AI", "Self-powered sensors"],
    with: "Dr. Md. Ali Hossain · Director, NBTC",
  },
  {
    id: "hirl",
    title: "Member",
    org: "Health Informatics Research Lab · DIU",
    period: "2023 → now",
    now: true,
    logo: "/assets/logos/hirl.webp",
    logoBg: "light",
    tags: ["Clinical ML", "MSEA-Net"],
    with: "Dr. Md. Zahid Hasan · Director, HIRL",
  },
  {
    id: "gpu",
    title: "AI/ML Developer & Tester",
    org: "DIU Distributed AI Infrastructure Platform",
    period: "2025 → now",
    now: true,
    logo: "/assets/logos/diu_logo.svg",
    logoBg: "light",
    tags: ["AI/ML", "System testing", "Sustainable energy", "Presented to DIU leadership"],
  },
  {
    id: "keyoon",
    title: "AI/ML & Backend Developer",
    org: "Keyoon.com",
    period: "2026 → now",
    now: true,
    logo: "/assets/logos/keyoon.webp",
    logoBg: "dark",
    tags: ["FastAPI", "Django", "Model serving"],
  },
];

export interface School {
  id: string;
  level: string;
  org: string;
  place: string;
  period: string;
  grade: number;
  scale: number;
  gradeLabel: "CGPA" | "GPA";
  note: string;
  current?: boolean;
}

// Newest first, as in the CV.
export const schools: School[] = [
  {
    id: "bsc",
    level: "B.Sc. in Computer Science & Engineering",
    org: "Daffodil International University",
    place: "Daffodil Smart City, Savar, Dhaka",
    period: "2023 → now",
    grade: 3.8,
    scale: 4,
    gradeLabel: "CGPA",
    note: "EQF level 6",
    current: true,
  },
  {
    id: "hsc",
    level: "Higher Secondary Certificate · Science",
    org: "B.A.F. Shaheen College Kurmitola",
    place: "Dhaka",
    period: "2018 → 2020",
    grade: 5,
    scale: 5,
    gradeLabel: "GPA",
    note: "Academic Excellence Award",
  },
  {
    id: "dakhil",
    level: "Dakhil Certificate · Science",
    org: "Tanjimul Ummah Alim Madrasah",
    place: "Dhaka",
    period: "2016 → 2018",
    grade: 5,
    scale: 5,
    gradeLabel: "GPA",
    note: "SSC equivalent · Bangladesh Madrasah Education Board",
  },
];

// CEFR: A1 = 1 … C2 = 6. Levels are the CV's self-assessment for every skill (listening, reading, writing, speaking).
export interface Language {
  id: string;
  lang: string; // BCP 47, for the script
  name: string;
  script: string;
  level: string;
  step: number;
  caption: string;
}

export const languages: Language[] = [
  { id: "bn", lang: "bn", name: "Bengali", script: "বাংলা", level: "Native", step: 6, caption: "Mother tongue" },
  { id: "en", lang: "en", name: "English", script: "English", level: "C1", step: 5, caption: "Proficient user" },
  { id: "hi", lang: "hi", name: "Hindi", script: "हिन्दी", level: "B1", step: 3, caption: "Independent user" },
  { id: "es", lang: "es", name: "Spanish", script: "Español", level: "A2", step: 2, caption: "Basic user" },
];

export interface Honour {
  id: string;
  big: string;
  title: string;
  sub: string;
}

/** On-stage moments. Photos live in public/assets/photos/. */
export interface StageMoment {
  id: string;
  rank: string; // short chip text
  title: string; // big word
  event: string; // serif italic line
  sub: string;
  photo: string;
  project: { name: string; href: string };
}

export const stage: StageMoment[] = [
  {
    id: "champion",
    rank: "1st place",
    title: "Champion",
    event: "AI Hackathon 2026",
    sub: "Team ShadowForge · Daffodil International University × World AI Alliance",
    photo: "/assets/photos/champion.webp",
    project: { name: "NeuralSched", href: "https://neuralsched.vercel.app" },
  },
  {
    id: "fourth",
    rank: "4th place",
    title: "4th place",
    event: "AI DEV FEST 2026",
    sub: "Inter-University AI Hackathon · Daffodil International University · 7 Oct 2026",
    photo: "/assets/photos/fourth-place.webp",
    project: { name: "UVERA", href: "https://uvera-ai.vercel.app" },
  },
];

export const honours: Honour[] = [
  { id: "datathon", big: "48 / 196", title: "bKash × NSUCEC Datathon 2026", sub: "AUC 0.98525 · national teams" },
  { id: "poster", big: "Poster", title: "DIU-DoR Research Poster 2026", sub: "RAM-ViT · Directorate of Research" },
  { id: "nasa", big: "NASA", title: "Space Apps Challenge 2026", sub: "Dhaka · ShadowAstra Atlas" },
  { id: "uta", big: "Top 50", title: "Unlock the Algorithm 2024", sub: "DIU ACM Wing" },
  { id: "takeoff", big: "17th", title: "Take-Off Programming Contest 2023", sub: "DIU Computer Programming Club" },
  { id: "saifur", big: "1st", title: "Saifur's Web Design Competition", sub: "Champion · 2018" },
];

/* ───────────────────────── Extracurricular activities ───────────────────────── */

export type ActivityKind = "contest" | "olympiad" | "expo" | "conference" | "school" | "community" | "kaggle";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  when: string;
  title: string;
  org: string;
  note?: string;
}

export const activities: ActivityItem[] = [
  {
    id: "cpc",
    kind: "contest",
    when: "2023 → 24",
    title: "Executive Member · ACM Wing",
    org: "DIU Computer Programming Club",
    note: "Examiner and organiser for Unlock the Algorithm and the Take-Off Programming Contest",
  },
  {
    id: "becithcon",
    kind: "conference",
    when: "Sept 2026",
    title: "Paper Presenter",
    org: "IEEE BECITHCON 2026 · IUBAT, Dhaka",
    note: "Presented two accepted papers; presentation and paper certificates received",
  },
  {
    id: "bdaio",
    kind: "olympiad",
    when: "2026",
    title: "Technical Volunteer & Proctor",
    org: "Bangladesh National AI Olympiad (BDAIO)",
    note: "Participant coordination and event management",
  },
  {
    id: "ddi",
    kind: "expo",
    when: "Jan 2026",
    title: "Volunteer · Guest Support",
    org: "Digital Device & Innovation Expo · BICC, Dhaka",
  },
  {
    id: "community",
    kind: "community",
    when: "Ongoing",
    title: "Community volunteering",
    org: "Mukafa Charity · Uttara Youth Society · Student Welfare Foundation Bangladesh",
    note: "Judging and management roles",
  },
  {
    id: "school",
    kind: "school",
    when: "2018 → 20",
    title: "Committee Member",
    org: "IT Club & Atomic Science Club · B.A.F. Shaheen College",
  },
  {
    id: "kaggle",
    kind: "kaggle",
    when: "Ongoing",
    title: "Kaggle practitioner",
    org: "Medical AI · tabular ML · NLP competitions",
  },
];

/* ───────────────────────── Skills ───────────────────────── */

// Straight from the CV's Skills section.
export const skills: { group: string; items: string[] }[] = [
  {
    group: "Deep learning & medical AI",
    items: [
      "PyTorch", "TensorFlow", "Keras", "MONAI", "Hugging Face Transformers", "Vision Transformers", "Evidential deep learning",
      "Uncertainty quantification", "Knowledge distillation", "Few-shot & prototype learning", "Federated learning", "RAG",
      "Medical image classification", "Segmentation",
    ],
  },
  { group: "Explainable AI", items: ["Grad-CAM", "Grad-CAM++", "SHAP", "LIME", "UMAP", "t-SNE"] },
  {
    group: "ML & data tools",
    items: ["scikit-learn", "XGBoost", "LightGBM", "OpenCV", "Albumentations", "Weights & Biases", "Kaggle", "Google Colab"],
  },
  {
    group: "Backend & deployment",
    items: ["FastAPI", "Django", "Docker", "Git", "GitHub", "CI/CD", "Gradio", "Hugging Face Spaces"],
  },
  { group: "Programming", items: ["Python", "C++", "Java", "SQL · MySQL · PostgreSQL", "LaTeX"] },
  { group: "Office & design", items: ["Microsoft Excel", "Microsoft PowerPoint", "Canva"] },
];

// The CV's "Personal skills".
export const strengths: { title: string; line: string }[] = [
  { title: "Team leadership", line: "Led the winning team at AI Hackathon 2026" },
  { title: "Contest organising", line: "DIU Computer Programming Club · ACM Wing" },
  { title: "Research communication", line: "Conference and poster presentations" },
  { title: "Competitive programming", line: "Data structures and algorithms" },
  { title: "Kaggle", line: "Medical AI, tabular ML and NLP competitions" },
];

// Big-type ticker between hero and work.
export const ticker = [
  "Medical imaging",
  "Vision Transformers",
  "Explainable AI",
  "Distributed GPUs",
  "Full-stack",
  "Federated learning",
  "Knowledge distillation",
  "Shipping products",
];

