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
    year: 2025,
    status: "published",
    role: "First author",
    glyph: "vit",
    doi: "https://doi.org/10.1109/ICCIT68739.2025.11491549",
  },
  {
    id: "braindistill",
    title: "BrainDistill",
    full: "Explainable Multi-Scale Knowledge Distillation with Uncertainty-Aware Inference for Efficient Brain Tumor MRI Classification",
    venue: "IEEE BECITHCON 2026",
    year: 2026,
    status: "presented",
    role: "First author",
    glyph: "mri",
  },
  {
    id: "light-bloodnet",
    title: "Light-BloodNet",
    full: "An Efficient Attention-Guided Deep Learning Framework with Explainability for Blood Cell Classification",
    venue: "IEEE BECITHCON 2026",
    year: 2026,
    status: "presented",
    role: "First author",
    glyph: "cells",
  },
  {
    id: "ur-protonet",
    title: "UR-ProtoNet",
    full: "UR-ProtoNet: Evidential Retrieval-Augmented Prototypical Networks for Uncertainty-Aware Few-Shot Chest X-Ray Classification Across Domain Shifts",
    venue: "Intelligence-Based Medicine · Elsevier",
    year: 2026,
    status: "review",
    role: "First author",
    glyph: "xray",
    code: "https://github.com/ABRUBAB/UR-ProtoNet",
  },
  {
    id: "tace-hcc",
    title: "TACE response in HCC",
    full: "A Multimodal 3D Peritumoral Representation Learning Framework for Predicting Chemoembolization Resistance in Hepatocellular Carcinoma: An International Multi-Cohort Validation",
    venue: "Briefings in Bioinformatics · OUP",
    year: 2026,
    status: "review",
    role: "Co-author",
    glyph: "liver",
  },
  {
    id: "msea-net",
    title: "MSEA-Net",
    full: "MSEA-Net: Uncertainty-Governed Selective Diagnosis through Multi-Scale Evidential Attention for Gastrointestinal Endoscopy",
    venue: "Elsevier journal · planned",
    year: 2026,
    status: "ready",
    role: "First author",
    glyph: "gut",
    code: "https://github.com/ABRUBAB/MSEA-Net",
  },
  {
    id: "ram-vit",
    title: "RAM-ViT",
    full: "RAM-ViT: Retrieval-Augmented Evidential Vision Transformer for Cross-Modal Glioma Grading",
    venue: "DIU-DoR Poster 2026",
    year: 2026,
    status: "preparing",
    role: "First author",
    glyph: "graph",
    code: "https://github.com/ABRUBAB/ram_vit",
  },
  {
    id: "puma-mil",
    title: "PUMA-MIL",
    full: "PUMA-MIL / PUMA-MIL-Lite: Multimodal Multiple Instance Learning for Glioma Detection with Clinical Interpretability",
    venue: "Manuscript",
    year: 2026,
    status: "preparing",
    role: "First author",
    glyph: "bags",
    code: "https://github.com/ABRUBAB/puma_mil",
  },
];

/* ───────────────────────── Journey ───────────────────────── */

export interface Role {
  id: string;
  title: string;
  org: string;
  period: string;
  now: boolean;
  logo: string;
  logoBg: "light" | "dark";
  tags: string[];
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
  },
  {
    id: "gpu",
    title: "Team Lead · AI/ML & Backend",
    org: "DIU Distributed GPU Platform",
    period: "2025 → now",
    now: true,
    logo: "/assets/logos/diu_logo.svg",
    logoBg: "light",
    tags: ["Campus GPU pooling", "Presented to DIU leadership"],
  },
  {
    id: "keyoon",
    title: "Lead AI/ML & Backend Developer",
    org: "Keyoon.com",
    period: "2026 → now",
    now: true,
    logo: "/assets/logos/keyoon.webp",
    logoBg: "dark",
    tags: ["FastAPI", "Django", "Model serving"],
  },
];

export const education = {
  degree: "B.Sc. Computer Science & Engineering",
  school: "Daffodil International University",
  period: "2023 → now · Final year",
  cgpa: 3.8,
  scale: 4,
  earlier: [
    { label: "HSC", value: "5.00 / 5.00" },
    { label: "Dakhil", value: "5.00 / 5.00" },
  ],
  languages: [
    { label: "বাংলা", level: "Native" },
    { label: "English", level: "C1" },
    { label: "हिन्दी", level: "B1" },
    { label: "Español", level: "A2" },
  ],
};

export interface Honour {
  id: string;
  big: string;
  title: string;
  sub: string;
}

export const champion = {
  title: "Champion",
  event: "AI Hackathon 2026",
  sub: "Team ShadowForge · Daffodil International University × World AI Alliance",
  photo: "/assets/photos/champion.webp",
};

export const honours: Honour[] = [
  { id: "datathon", big: "48 / 196", title: "bKash × NSUCEC Datathon 2026", sub: "AUC 0.98525" },
  { id: "devfest", big: "4th", title: "AI DEV FEST 2026", sub: "UVERA" },
  { id: "poster", big: "Poster", title: "DIU-DoR Research Poster 2026", sub: "RAM-ViT" },
  { id: "uta", big: "Top 50", title: "Unlock the Algorithm 2024", sub: "DIU ACM Wing" },
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

