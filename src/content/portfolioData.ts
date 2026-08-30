import {
  ProfileData,
  Publication,
  Project,
  ResearchPillar,
  ExperienceRole,
  AwardItem,
  TrajectoryTarget,
  SkillCategory
} from './types';

export const profileData: ProfileData = {
  name: "Abdullah Rubab",
  title: "Medical AI & Uncertainty Quantification Researcher",
  tagline: "I build medical AI that knows what it doesn't know.",
  thesis: "Pioneering evidential deep learning, knowledge distillation, and uncertainty-governed triage cascades to transform black-box neural networks into trustworthy, explainable diagnostic systems for clinical medicine.",
  location: "Dhaka, Bangladesh",
  education: [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "Daffodil International University (DIU)",
      period: "2023 – Present (Final Year)",
      cgpa: "3.84 / 4.00",
      notes: "Research Track, Dean's Honor Roll. Team Lead at DIU GPU Infrastructure Platform, Research Associate at NBTC, and Member at HIRL."
    },
    {
      degree: "Higher Secondary Certificate (HSC) — Science",
      institution: "B.A.F. Shaheen College Kurmitola",
      period: "2019 – 2021",
      cgpa: "5.00 / 5.00",
      notes: "Academic Excellence Award; Executive Committee Member of IT Club & Atomic Science Club."
    }
  ],
  contacts: {
    academicEmail: "rubab2305101813@diu.edu.bd",
    personalEmail: "rubab2712@gmail.com",
    github: "https://github.com/ABRUBAB",
    linkedin: "https://www.linkedin.com/in/abdullah-rubab-1a947a200/",
    googleScholar: "https://scholar.google.com/citations?user=Tm83UVUAAAAJ",
    researchGate: "https://www.researchgate.net/profile/Abdullah-Rubab",
    orcid: "https://orcid.org/0009-0003-5063-9320",
    domain: "https://abdullahrubab.me"
  },
  stats: {
    publicationsCount: 7,
    topTierCount: 4,
    hackathonWins: 1,
    cgpa: "3.84"
  }
};

export const researchPillars: ResearchPillar[] = [
  {
    id: "evidential-dl",
    title: "Evidential Deep Learning",
    latinName: "Uncertainty Quantification",
    iconName: "ShieldCheck",
    tagline: "Dirichlet prior parameterization for single-pass epistemic uncertainty estimation.",
    description: "Standard softmax classifiers are notoriously overconfident on out-of-distribution clinical samples. We place Dirichlet distributions over class probabilities to explicitly compute epistemic vacuity and dissonance, enabling safe, autonomous triage.",
    mathematicalFoundation: "Dirichlet Evidence Framework: Computes class belief parameters and assigns an explicit uncertainty score to every diagnostic scan.",
    keyContributions: [
      "Formulated Dirichlet loss heads for Vision Transformers and CNNs.",
      "Uncertainty-governed triage cascades rejecting ambiguous samples to human specialists.",
      "Zero-latency single-pass inference suitable for resource-constrained edge clinical hardware."
    ],
    relatedPaperIds: ["msea-net", "ram-vit", "light-bloodnet"],
    metricHighlight: "98.33% accuracy @ 70% triage coverage (MSEA-Net)"
  },
  {
    id: "few-shot-distill",
    title: "Knowledge Distillation & Few-Shot Vision",
    latinName: "Model Compression",
    iconName: "Cpu",
    tagline: "Compressing heavyweight teacher ensembles into edge-deployable diagnostic backbones.",
    description: "Medical datasets in low-resource environments are sparse and imbalanced. We engineer multi-scale feature distillation pipelines and few-shot prototype alignment methods to achieve clinical-grade generalization with minimal computational overhead.",
    mathematicalFoundation: "Teacher-Student Distillation: Transfers deep contextual representations from high-capacity ensembles into ultra-efficient edge backbones.",
    keyContributions: [
      "DenseNet-121 + ResNet-50 teacher ensemble distilled into lightweight MobileNetV3-Large.",
      "Multi-Scale Feature Fusion (MSFF) capturing microscopic cellular anomalies.",
      "Cross-modal knowledge transfer between high-resolution pathology and edge scans."
    ],
    relatedPaperIds: ["braindistill", "cactus-vit", "light-bloodnet"],
    metricHighlight: "82% compute reduction with <0.4% loss in sensitivity"
  },
  {
    id: "xai-interpretability",
    title: "Explainable AI (XAI) & Interpretability",
    latinName: "Clinical Verification",
    iconName: "Eye",
    tagline: "Faithful gradient, perturbation, and manifold attribution for clinician trust.",
    description: "A prediction without explanation cannot be safely trusted in oncology. We implement end-to-end multi-method interpretability pipelines (Grad-CAM, LIME, Kernel SHAP, and UMAP latent topology) to verify that models attend to true histological biomarkers.",
    mathematicalFoundation: "Gradient & Attribution Mapping: Generates spatial heatmaps and biomarker overlays matching clinical regions of interest.",
    keyContributions: [
      "Multi-modal visual heatmaps matching radiologist anatomical regions of interest.",
      "Sensitivity perturbation bounds validating stability against scanner noise artifacts.",
      "UMAP embedding manifold verification ensuring distinct morphological separation."
    ],
    relatedPaperIds: ["puma-mil", "braindistill", "msea-net"],
    metricHighlight: "Validated anatomical agreement on BraTS 2021 & BloodMNIST"
  },
  {
    id: "federated-learning",
    title: "Federated Learning & Distributed AI",
    latinName: "Privacy-Preserving Systems",
    iconName: "Network",
    tagline: "Collaborative multi-center clinical modeling under strict differential privacy guarantees.",
    description: "Overcoming institutional data silos without transferring sensitive patient records. We build distributed training schemes with differential privacy injection, client drift mitigation, and fault-tolerant orchestration for healthcare networks.",
    mathematicalFoundation: "Decentralized Multi-Center Optimization: Trains models across hospital nodes with strict (ε, δ)-Differential Privacy guarantees.",
    keyContributions: [
      "Designed HealthSentinel AI: tri-modal federated diagnostic architecture with epidemiological prior injection.",
      "Designed and led DIU Distributed GPU Infrastructure platform to pool campus compute nodes.",
      "Adaptive gradient clipping preventing single-institution bias in multi-hospital setups."
    ],
    relatedPaperIds: ["healthsentinel", "aura-cluster", "diu-gpu-platform"],
    metricHighlight: "Tri-modal distributed synergy under (\\epsilon=1.2, \\delta=10^{-5}) privacy"
  }
];

export const publications: Publication[] = [
  {
    id: "cactus-vit",
    title: "Sample-Efficient Fine-Grained Classification of Cactus Species Using Hybrid Vision Transformers and Knowledge Distillation",
    shortTitle: "Cactus ViT: Hybrid Vision Transformers & KD",
    status: "published",
    statusLabel: "Published",
    venue: "2025 28th International Conference on Computer and Information Technology (ICCIT)",
    year: 2025,
    authors: ["A. Rubab", "M. T. Hasan"],
    rubabRole: "First Author & Lead Method Architect",
    doi: "10.1109/ICCIT68739.2025.11491549",
    details: "Cox's Bazar, Bangladesh, pp. 4837–4842. Published by IEEE. Combines hybrid ViT architectures with response and feature distillation to achieve high accuracy on fine-grained biological vision benchmarks under constrained sample regimes.",
    metrics: {
      accuracy: "97.4%",
      backbone: "Hybrid ViT + Distillation",
      coverage: "100%"
    },
    tags: ["Vision Transformers", "Knowledge Distillation", "Fine-Grained Classification", "IEEE ICCIT"],
    bibtex: `@inproceedings{rubab2025cactusvit,
  author    = {Rubab, Abdullah and Hasan, M. T.},
  title     = {Sample-Efficient Fine-Grained Classification of Cactus Species Using Hybrid Vision Transformers and Knowledge Distillation},
  booktitle = {2025 28th International Conference on Computer and Information Technology (ICCIT)},
  year      = {2025},
  pages     = {4837--4842},
  publisher = {IEEE},
  doi       = {10.1109/ICCIT68739.2025.11491549}
}`,
    featured: true
  },
  {
    id: "braindistill",
    title: "Explainable Multi-Scale Knowledge Distillation with Uncertainty-Aware Inference for Efficient Brain Tumor MRI Classification",
    shortTitle: "BrainDistill: Uncertainty-Aware MRI Distillation",
    status: "accepted",
    statusLabel: "Accepted",
    venue: "International Conference on Biomedical Engineering, Computer and Information Technology for Health (BECITHCON 2026)",
    year: 2026,
    paperId: "Paper ID 378",
    authors: ["Abdullah Rubab", "Co-Authors"],
    rubabRole: "Lead Researcher & First Author",
    details: "BECITHCON 2026. Employs a DenseNet-121 + ResNet-50 teacher ensemble distilled into a compact MobileNetV3-Large backbone, integrated with Monte Carlo Dropout uncertainty estimation and multi-layer Grad-CAM heatmaps for rapid, trustworthy neuro-oncology screening.",
    metrics: {
      accuracy: "96.8%",
      backbone: "MobileNetV3-Large (Distilled)",
      coverage: "Selective Triage"
    },
    tags: ["Brain Tumor MRI", "Knowledge Distillation", "MC Dropout", "XAI", "BECITHCON 2026"],
    bibtex: `@inproceedings{rubab2026braindistill,
  author    = {Rubab, Abdullah and et al.},
  title     = {Explainable Multi-Scale Knowledge Distillation with Uncertainty-Aware Inference for Efficient Brain Tumor MRI Classification},
  booktitle = {Proceedings of the International Conference on Biomedical Engineering, Computer and Information Technology for Health (BECITHCON)},
  year      = {2026},
  note      = {Paper ID 378, Accepted}
}`,
    featured: true
  },
  {
    id: "light-bloodnet",
    title: "An Efficient Attention-Guided Deep Learning Framework with Explainability for Blood Cell Classification",
    shortTitle: "Light-BloodNet: Attention-Guided Hematology AI",
    status: "accepted",
    statusLabel: "Accepted",
    venue: "International Conference on Biomedical Engineering, Computer and Information Technology for Health (BECITHCON 2026)",
    year: 2026,
    paperId: "Paper ID 560",
    authors: ["Abdullah Rubab", "Co-Authors"],
    rubabRole: "Primary Author & Model Designer",
    details: "BECITHCON 2026. Introduces an EfficientNetV2-S backbone enhanced with dual-position Convolutional Block Attention Modules (CBAM), Multi-Scale Feature Fusion (MSFF), and an Evidential Deep Learning classifier head evaluated on the BloodMNIST benchmark.",
    metrics: {
      accuracy: "98.1%",
      backbone: "EfficientNetV2-S + CBAM + EDL",
      coverage: "BloodMNIST 8-Class"
    },
    tags: ["Hematology", "Evidential DL", "CBAM Attention", "BloodMNIST", "BECITHCON 2026"],
    bibtex: `@inproceedings{rubab2026lightbloodnet,
  author    = {Rubab, Abdullah and et al.},
  title     = {An Efficient Attention-Guided Deep Learning Framework with Explainability for Blood Cell Classification},
  booktitle = {Proceedings of the International Conference on Biomedical Engineering, Computer and Information Technology for Health (BECITHCON)},
  year      = {2026},
  note      = {Paper ID 560, Accepted}
}`,
    featured: true
  },
  {
    id: "ram-vit",
    title: "RAM-ViT: Retrieval-Augmented Evidential Vision Transformer for Cross-Modal Glioma Grading",
    shortTitle: "RAM-ViT: Retrieval-Augmented Evidential ViT",
    status: "under_review",
    statusLabel: "Under Review (Q1 Target)",
    venue: "Target Q1 Medical Image Analysis Journal / DIU-DoR Poster Presentation 2026",
    year: 2026,
    authors: ["Abdullah Rubab", "NBTC Research Team"],
    rubabRole: "Principal Investigator & Pipeline Architect",
    details: "BraTS 2021 multi-parametric MRI dataset. Couples memory bank retrieval with Dirichlet evidential ViT tokens, allowing models to cross-reference ambiguous scans with historical confirmed pathologies and reject uncalibrated predictions.",
    metrics: {
      accuracy: "96.4% on BraTS",
      backbone: "Retrieval ViT + Dirichlet Prior",
      coverage: "Uncertainty-Guided"
    },
    tags: ["Glioma Grading", "BraTS 2021", "Retrieval-Augmented", "Evidential ViT", "Q1 Journal"],
    bibtex: `@article{rubab2026ramvit,
  author  = {Rubab, Abdullah and et al.},
  title   = {RAM-ViT: Retrieval-Augmented Evidential Vision Transformer for Cross-Modal Glioma Grading},
  journal = {Under Review (Q1 Target)},
  year    = {2026}
}`,
    featured: true
  },
  {
    id: "puma-mil",
    title: "PUMA-MIL / PUMA-MIL-Lite: Multimodal Multiple Instance Learning for Glioma Detection with Clinical Interpretability",
    shortTitle: "PUMA-MIL: Multimodal Multiple Instance Learning",
    status: "under_review",
    statusLabel: "Under Review (Q1 Target)",
    venue: "Target Q1 Medical Informatics / Oncology Journal",
    year: 2026,
    authors: ["Abdullah Rubab", "NBTC Research Group"],
    rubabRole: "Lead Algorithm Designer",
    details: "End-to-end weakly supervised multiple instance learning fusing whole slide pathology patches and radiomics features with complete Grad-CAM, LIME, and SHAP interpretability audits for neuro-pathologist consensus.",
    metrics: {
      auroc: "0.942 AUROC",
      backbone: "Attention-MIL + XAI Pipeline",
      coverage: "Whole Slide Imaging"
    },
    tags: ["Multiple Instance Learning", "Whole Slide Imaging", "Glioma", "SHAP", "LIME"],
    bibtex: `@article{rubab2026pumamil,
  author  = {Rubab, Abdullah and et al.},
  title   = {PUMA-MIL / PUMA-MIL-Lite: Multimodal Multiple Instance Learning for Glioma Detection with Clinical Interpretability},
  journal = {Under Review (Q1 Target)},
  year    = {2026}
}`,
    featured: false
  },
  {
    id: "msea-net",
    title: "MSEA-Net: Multi-Scale Evidential Attention Network with Uncertainty-Governed Triage for Trustworthy Gastrointestinal Endoscopy Classification",
    shortTitle: "MSEA-Net: Uncertainty-Governed GI Triage",
    status: "in_progress",
    statusLabel: "In Progress / Pre-Submission",
    venue: "Target Q1 Biomedical Engineering Journal",
    year: 2026,
    authors: ["Abdullah Rubab", "Research Collaborators"],
    rubabRole: "Lead Researcher & Theoretical Formulator",
    details: "Integrates Adaptive Channel-Spatial Attention (ACSA), Gated Feature Fusion (GFF), and Dirichlet evidential loss. Achieves 98.33% diagnostic accuracy at 70% patient coverage when filtering out high-epistemic-uncertainty scans for specialist consultation.",
    metrics: {
      accuracy: "98.33% @ 70% triage",
      coverage: "70% (Triage Governed)",
      backbone: "ACSA + GFF + Dirichlet Head"
    },
    tags: ["Endoscopy", "Evidential DL", "Selective Classification", "Dirichlet Distribution", "XAI"],
    bibtex: `@article{rubab2026mseanet,
  author  = {Rubab, Abdullah and et al.},
  title   = {MSEA-Net: Multi-Scale Evidential Attention Network with Uncertainty-Governed Triage for Trustworthy Gastrointestinal Endoscopy Classification},
  journal = {In Preparation for Q1 Submission},
  year    = {2026}
}`,
    featured: true
  },
  {
    id: "hcc-tace-seg",
    title: "HCC-TACE-Seg: Foundation Model Feature Distillation for Transarterial Chemoembolization Response Prediction",
    shortTitle: "HCC-TACE-Seg: TACE Response Prediction",
    status: "in_progress",
    statusLabel: "In Progress",
    venue: "Targeting Liver Oncology / Medical AI Workshop",
    year: 2026,
    authors: ["Abdullah Rubab", "Clinical Collaborators"],
    rubabRole: "Machine Learning Lead",
    details: "Analyzes ≈97-patient cohort with frozen vision foundation-model embeddings coupled with classical ML ensembles (XGBoost, Random Forest, SVM) to predict pre-operative TACE therapy efficacy in hepatocellular carcinoma.",
    metrics: {
      auroc: "0.785 Target AUROC",
      backbone: "Frozen Foundation Features + ML Ensembles",
      coverage: "97 Patient Cohort"
    },
    tags: ["Hepatocellular Carcinoma", "TACE Response", "Foundation Models", "Oncology"],
    bibtex: `@article{rubab2026hcctace,
  author  = {Rubab, Abdullah and et al.},
  title   = {HCC-TACE-Seg: Foundation Model Feature Distillation for Transarterial Chemoembolization Response Prediction},
  journal = {In Preparation},
  year    = {2026}
}`,
    featured: false
  }
];

export const flagshipProjects: Project[] = [
  {
    id: "healthsentinel",
    title: "HealthSentinel AI",
    subtitle: "Federated Tri-Modal Diagnostic Platform for Low-Resource Healthcare",
    description: "A decentralized medical diagnostic platform orchestrating clinical notes, imaging, and tabular vitals under strict differential privacy guarantees.",
    longDescription: "Engineered for resource-limited hospital networks where central data pooling is prohibited by regulatory or bandwidth constraints. Incorporates evidential deep learning to flag diagnostic vacuity when encountering regional disease mutations not represented in local client weights.",
    tags: ["Federated Learning", "Multimodal AI", "Differential Privacy", "MONAI", "PyTorch"],
    methods: ["Dirichlet Evidence Loss", "Federated Averaging with DP-SGD", "Cross-Modal Attention Fusion", "Epidemiological Context Priors"],
    results: [
      { label: "Multimodal Synergy", value: "94.6%", sublabel: "F1-Score on Tri-Modal Cohort" },
      { label: "Privacy Guarantee", value: "(ε=1.2, δ=10⁻⁵)", sublabel: "Formal DP Bound" },
      { label: "Bandwidth Compression", value: "78%", sublabel: "Gradient Sparsification" }
    ],
    github: "https://github.com/ABRUBAB",
    visualType: "architecture",
    featured: true
  },
  {
    id: "brain-tumor-mri",
    title: "AI-Powered Brain Tumor MRI Classification",
    subtitle: "Multi-Scale Ensemble with Clinician-Facing Explainability",
    description: "Production-ready PyTorch neuro-oncology pipeline with Grad-CAM visual heatmaps, uncertainty bounds, and automated radiological reporting.",
    longDescription: "Trained on comprehensive MRI sequences (T1, T1Gd, T2, FLAIR) to classify gliomas, meningiomas, and pituitary tumors. Provides clinicians with confidence intervals derived from Monte Carlo dropout and attention-guided activation maps matching neurosurgical margins.",
    tags: ["PyTorch", "Grad-CAM", "Brain Tumor", "Medical Imaging", "MC Dropout"],
    methods: ["DenseNet & ResNet Teacher Ensemble", "Multi-Scale Knowledge Distillation", "Grad-CAM & SHAP Heatmaps", "FastAPI Serving"],
    results: [
      { label: "Diagnostic Accuracy", value: "96.8%", sublabel: "Test Set Accuracy" },
      { label: "Inference Latency", value: "14ms", sublabel: "Per Scan on Single T4 GPU" },
      { label: "Neurosurgical Agreement", value: "92.3%", sublabel: "Grad-CAM Boundary Overlap" }
    ],
    github: "https://github.com/ABRUBAB/brain-tumor-mri-classification",
    visualType: "gradcam",
    featured: true
  },
  {
    id: "aura-cluster",
    title: "AURA-Cluster",
    subtitle: "Evidential AI for Proactive GPU Failure Prediction — Hackathon Winner",
    description: "Real-time telemetry forecasting system for distributed deep learning clusters using evidential neural networks. Won 1st Place at DIU AI Innovation Hackathon 2026.",
    longDescription: "Monitors hardware health metrics (VRAM thermals, PCIe bus errors, power draw spikes, kernel timeout anomalies) to predict node failure 45 minutes before critical training job crash. Allows zero-loss checkpoint offloading.",
    tags: ["Evidential DL", "Distributed Systems", "GPU Telemetry", "Hackathon Champion", "PyTorch"],
    methods: ["Dirichlet Evidence Time-Series", "Proactive Checkpoint Migration", "Prometheus & DCGM Telemetry Integration"],
    results: [
      { label: "Hackathon Result", value: "1st Place", sublabel: "DIU AI Innovation Hackathon 2026" },
      { label: "Crash Lead Time", value: "45 mins", sublabel: "Pre-Failure Alert Window" },
      { label: "False Alarm Reduction", value: "64%", sublabel: "Governed by Evidence Thresholds" }
    ],
    award: "Winner — DIU AI Innovation Hackathon 2026",
    github: "https://github.com/ABRUBAB",
    visualType: "cluster",
    featured: true
  },
  {
    id: "diu-gpu-platform",
    title: "DIU Distributed AI Infrastructure Platform",
    subtitle: "Campus-Wide GPU Pooling & High-Performance Compute Orchestration",
    description: "Team Lead & AI/ML Backend Developer for the initiative connecting and pooling DIU's campus GPU resources into an elastic compute cloud.",
    longDescription: "Presented directly to DIU's Chairman and executive university leadership. Architected custom Slurm/Kubernetes scheduling middleware with automatic job batching, fair-share queue allocation, and low-latency dataset caching for student and faculty research laboratories.",
    tags: ["Distributed Compute", "Kubernetes", "Slurm", "System Architecture", "Backend Engineering"],
    methods: ["Dynamic GPU Virtualization", "Priority Queue Scheduler", "Slurm & Prometheus Integration", "Secure Multi-Tenancy"],
    results: [
      { label: "Campus Impact", value: "DIU-Wide", sublabel: "Shared Research Infrastructure" },
      { label: "Utilization Boost", value: "3.2x", sublabel: "Over Isolated Desktop Rigs" },
      { label: "Executive Backing", value: "Chairman Deck", sublabel: "Presented to Senior Leadership" }
    ],
    github: "https://github.com/ABRUBAB",
    visualType: "cluster",
    featured: true
  },
  {
    id: "researchforge-ai",
    title: "ResearchForge-AI",
    subtitle: "Multi-Agent System for High-Impact Q1 Academic Workflows",
    description: "Autonomous multi-agent orchestration framework for literature synthesis, mathematical formalization verification, and experiment tracking.",
    longDescription: "Coordinates specialized LLM agents (Literature Reviewer, Mathematical Prover, Code Auditor, LaTeX Generator) to rigorously accelerate the preparation of scientific manuscripts targeting top IEEE and Elsevier journals.",
    tags: ["Multi-Agent AI", "LangChain", "RAG", "Scientific Computing", "LaTeX Automation"],
    methods: ["Hierarchical Agent Supervision", "Dense Vector Semantic Retrieval", "BibTeX Cross-Validation", "Automated Reproducibility Testing"],
    results: [
      { label: "Workflow Speedup", value: "4.5x", sublabel: "Drafting & Formalization Cycle" },
      { label: "Citation Precision", value: "99.2%", sublabel: "Zero Hallucinated DOIs via Cross-Ref" },
      { label: "Architecture", value: "Multi-Agent", sublabel: "Orchestrated via LangGraph" }
    ],
    github: "https://github.com/ABRUBAB/ResearchForge-AI",
    visualType: "agent",
    featured: true
  }
];

export const experienceRoles: ExperienceRole[] = [
  {
    id: "nbtc-ra",
    title: "Research Associate",
    organization: "NanoBio Technology Center (NBTC), DIU",
    location: "Dhaka, Bangladesh",
    period: "2025 – Present",
    supervisor: "Dr. Md. Ali Hossain (Associate Professor, Dept. of CSE & Director, NBTC)",
    description: "Leading computational medical AI research in evidential deep learning, multimodal oncology detection, and uncertainty-governed triage algorithms.",
    bullets: [
      "Architected MSEA-Net, RAM-ViT, and PUMA-MIL research pipelines for brain MRI, blood smear, and gastrointestinal endoscopy datasets.",
      "Formulated Dirichlet uncertainty loss functions, resulting in two accepted BECITHCON 2026 papers and two Q1 target journal submissions.",
      "Collaborating on translational computational biology and diagnostic vision projects."
    ],
    skills: ["Evidential Deep Learning", "Medical Image Analysis", "PyTorch", "MONAI", "XAI (Grad-CAM/SHAP)", "Scientific Writing"],
    logo: "/assets/logos/NBTC_logo.jpg",
    type: "research"
  },
  {
    id: "hirl-member",
    title: "Member",
    organization: "Health Informatics Research Laboratory (HIRL), DIU",
    location: "Dhaka, Bangladesh",
    period: "2024 – Present",
    description: "Specialized student and faculty research group under the Department of Computer Science and Engineering at Daffodil International University (DIU), focused on health informatics, clinical datasets, and biomedical machine learning.",
    bullets: [
      "Collaborating with faculty researchers and student peers on biomedical informatics datasets and clinical machine learning benchmarks.",
      "Participating in research workshops, clinical dataset curation, and literature synthesis seminars under the Dept. of CSE."
    ],
    skills: ["Health Informatics", "Biomedical Data Analysis", "Machine Learning", "Clinical Datasets"],
    logo: "/assets/logos/hirl_logo.png",
    type: "research"
  },
  {
    id: "diu-gpu-lead",
    title: "Team Lead & AI/ML Backend Developer",
    organization: "DIU GPU Cluster / Distributed AI Infrastructure Platform",
    location: "Dhaka, Bangladesh",
    period: "2026 – Present",
    description: "Directing technical development for the campus-wide GPU pooling infrastructure presented to DIU Chairman and executive university leadership.",
    bullets: [
      "Designed distributed scheduler architecture to aggregate disparate lab workstations into an elastic compute cluster for AI researchers.",
      "Implemented automated node health monitoring and intelligent job dispatching algorithms.",
      "Authored the technical proposal deck and hardware audit analysis reviewed by DIU senior executive leadership."
    ],
    skills: ["Distributed Computing", "Linux System Administration", "GPU Virtualization", "Slurm", "FastAPI", "Prometheus"],
    logo: "/assets/logos/diu_logo.svg",
    type: "leadership"
  },
  {
    id: "keyoon",
    title: "Lead AI/ML & Backend Developer",
    organization: "Keyoon.com",
    location: "Dhaka, Bangladesh",
    period: "2026 – Present",
    description: "Engineering robust backend architecture and intelligent machine learning microservices for high-concurrency platforms.",
    bullets: [
      "Built production-grade REST APIs and asynchronous processing queues in Django and FastAPI.",
      "Deployed scalable machine learning inference pipelines with low-latency model serving and caching.",
      "Maintained database schemas, security protocols, and CI/CD automated deployment pipelines."
    ],
    skills: ["Python", "Django", "FastAPI", "PostgreSQL", "Docker", "Model Optimization"],
    logo: "/assets/logos/keyoon_logo.jpg",
    type: "engineering"
  }
];

export const awardsAndLeadership: AwardItem[] = [
  {
    id: "hackathon-2026",
    title: "Champion / 1st Place Winner",
    event: "DIU AI Innovation Hackathon 2026",
    issuer: "Daffodil International University",
    year: "2026",
    details: "Awarded 1st place among 50+ competing engineering teams for 'AURA-Cluster', an evidential deep learning system for predictive GPU telemetry failure prevention.",
    category: "hackathon",
    highlight: true,
    image: "/assets/photos/hackathon_win_photo.jpg",
    badgeText: "1st Place Winner"
  },
  {
    id: "bkash-datathon",
    title: "Top-Tier Finalist (Rank 48/196, 0.98525 AUC)",
    event: "bKash × NSUCEC National Datathon 2026",
    issuer: "bKash Ltd. & NSU Computer and Engineering Club",
    year: "2026",
    details: "Achieved Rank 48 out of 196 competitive national machine learning teams on the public leaderboard with a 0.98525 AUC score utilizing a custom LightGBM + CatBoost ensemble.",
    category: "datathon",
    highlight: true,
    badgeText: "0.98525 AUC Rank 48/196"
  },
  {
    id: "poster-dor-2026",
    title: "Selected Poster Presenter",
    event: "DIU-DoR Annual Poster Presentation 2026",
    issuer: "DIU Directorate of Research (DoR)",
    year: "2026",
    details: "Selected to present 'RAM-ViT: Retrieval-Augmented Evidential Vision Transformer for Cross-Modal Glioma Grading' before university research faculty and international evaluators.",
    category: "academic",
    highlight: true,
    badgeText: "Selected Poster Presentation"
  },
  {
    id: "ddi-expo",
    title: "Technical Volunteer & Guest Support",
    event: "Digital Device & Innovation Expo 2026 (DDI Expo 2026)",
    issuer: "BICC / BCFCC, Sher-e-Bangla Nagar, Dhaka",
    year: "2026",
    details: "Served in the guest support and technical team at DDI Expo 2026 (Jan 28 – 31, 2026) at Bangabandhu Bangladesh-China Friendship Conference Center (BICC), assisting foreign delegates, academic researchers, and industry leaders.",
    category: "community",
    highlight: true,
    badgeText: "DDI Expo 2026"
  },
  {
    id: "cpc-acm",
    title: "Executive Member — ACM Wing",
    event: "DIU Computer Programming Club (CPC)",
    issuer: "DIU CPC",
    year: "2024 – 2025",
    details: "Problem curator, test case validator, and examiner for marquee national programming contests including 'Unlock the Algorithm' and 'Take-Off Programming Contest'.",
    category: "programming",
    highlight: false
  },
  {
    id: "ai-olympiad-vol",
    title: "Technical Volunteer & Proctor",
    event: "Bangladesh National AI Olympiad 2026 (BDAIO)",
    issuer: "Bangladesh AI Olympiad Committee",
    year: "2026",
    details: "Supported technical evaluation, environment setup, and proctoring for high-school and undergraduate national contestants in algorithmic AI challenges.",
    category: "community",
    highlight: false
  },
  {
    id: "take-off-finalist",
    title: "Contest Finalist (17th Position)",
    event: "Take-Off Programming Contest",
    issuer: "DIU CPC",
    year: "Spring 2023",
    details: "Ranked 17th among 300+ freshman and sophomore competitive programming contestants in algorithmic problem solving (C++ / Data Structures).",
    category: "programming",
    highlight: false
  },
  {
    id: "uta-finalist",
    title: "Top 50 Finalist",
    event: "Unlock the Algorithm (UTA) Contest",
    issuer: "DIU ACM Wing",
    year: "Spring 2024",
    details: "Advanced to the Top 50 Grand Finale in algorithmic optimization, dynamic programming, and graph algorithms.",
    category: "programming",
    highlight: false
  },
  {
    id: "saifurs-champion",
    title: "Champion",
    event: "Saifur's Web Design Competition",
    issuer: "Saifur's Education Group",
    year: "2019",
    details: "Awarded 1st place for responsive UI design and client-side architecture.",
    category: "programming",
    highlight: false
  }
];

export const trajectoryTargets: TrajectoryTarget[] = [
  {
    id: "europe-graduate",
    country: "Europe",
    city: "European Research Centers",
    coordinates: [48.8566, 2.3522], // Central Europe
    institutions: [
      "Leading European AI & Medical Imaging Institutes",
      "European Biomedical Computing Laboratories",
      "Cross-Border Collaborative AI Consortia"
    ],
    programs: [
      "Fully-Funded Master's in Artificial Intelligence & Biomedical Computing",
      "Doctoral Research (PhD) in Medical AI, Evidential Deep Learning & Uncertainty",
      "European Fellowship & Research Grant Tracks"
    ],
    fundingVehicles: [
      "Full European Graduate Scholarships",
      "Doctoral Research Fellowships & Grants",
      "Institutional PhD Funding Packages"
    ],
    focusAreas: [
      "Evidential Deep Learning & Uncertainty Quantification",
      "Trustworthy & Explainable AI (XAI) in Oncology",
      "Resource-Constrained Edge Machine Learning"
    ],
    status: "primary",
    whyTarget: "European research institutions lead the world in trustworthy, ethically grounded, and clinically validated AI frameworks. My research in evidential deep learning directly aligns with European initiatives for safe, verifiable artificial intelligence in healthcare."
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages & Core",
    items: [
      { name: "Python", level: "Expert", note: "Primary research language, PyTorch core" },
      { name: "C++", level: "Advanced", note: "Algorithmic contests, memory-critical kernels" },
      { name: "Java", level: "Proficient", note: "Object-oriented systems & backend" },
      { name: "LaTeX", level: "Expert", note: "Publication manuscripts, mathematical proofs" },
      { name: "SQL (MySQL/Postgres)", level: "Advanced", note: "Relational modeling & query optimization" }
    ]
  },
  {
    category: "Medical AI & Advanced Deep Learning",
    items: [
      { name: "Evidential Deep Learning", level: "Expert", note: "Dirichlet prior, epistemic uncertainty triage" },
      { name: "Uncertainty Quantification", level: "Expert", note: "Dirichlet, MC Dropout, Deep Ensembles" },
      { name: "Few-Shot & Prototype Learning", level: "Advanced", note: "Metric learning on rare pathologies" },
      { name: "Knowledge Distillation", level: "Expert", note: "Multi-scale teacher-student compression" },
      { name: "Medical Image Segmentation", level: "Advanced", note: "MONAI, BraTS, 3D MRI volumes" },
      { name: "Vision Transformers (ViT)", level: "Advanced", note: "Hybrid attention, patch tokenization" }
    ]
  },
  {
    category: "Explainability & Interpretability",
    items: [
      { name: "Grad-CAM & Grad-CAM++", level: "Expert", note: "Gradient-weighted class activation maps" },
      { name: "SHAP (Kernel / Tree)", level: "Advanced", note: "Shapley additive explanations" },
      { name: "LIME", level: "Advanced", note: "Local interpretable model-agnostic explanations" },
      { name: "UMAP & t-SNE", level: "Expert", note: "Latent manifold topological visualization" }
    ]
  },
  {
    category: "Distributed & Systems Tooling",
    items: [
      { name: "PyTorch & TorchVision", level: "Expert", note: "Custom loss functions, autograd, CUDA" },
      { name: "TensorFlow & Keras", level: "Proficient", note: "Comparative validation & legacy models" },
      { name: "MONAI", level: "Advanced", note: "Medical Open Network for AI pipelines" },
      { name: "Federated Learning", level: "Advanced", note: "DP-SGD, FedAvg, multi-hospital modeling" },
      { name: "Weights & Biases", level: "Advanced", note: "Experiment tracking & hyperparameter tuning" },
      { name: "Django & FastAPI", level: "Advanced", note: "Model serving, asynchronous task queues" },
      { name: "Git / GitHub / CI", level: "Expert", note: "Collaborative research version control" }
    ]
  },
  {
    category: "Spoken Languages",
    items: [
      { name: "Bengali", level: "Expert", note: "Native proficiency" },
      { name: "English", level: "Expert", note: "Professional working / academic proficiency" },
      { name: "Hindi", level: "Proficient", note: "Conversational" }
    ]
  }
];
