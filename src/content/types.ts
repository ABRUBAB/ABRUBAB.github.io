export type PublicationStatus = 'published' | 'accepted' | 'under_review' | 'in_progress';

export interface Publication {
  id: string;
  title: string;
  shortTitle: string;
  status: PublicationStatus;
  statusLabel: string;
  venue: string;
  year: number;
  authors: string[];
  rubabRole?: string;
  doi?: string;
  paperId?: string;
  details: string;
  metrics?: {
    accuracy?: string;
    coverage?: string;
    auroc?: string;
    backbone?: string;
  };
  tags: string[];
  bibtex?: string;
  pdfUrl?: string;
  codeUrl?: string;
  featured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  methods: string[];
  results: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  github?: string;
  demoUrl?: string;
  award?: string;
  visualType: 'gradcam' | 'coverage_curve' | 'architecture' | 'cluster' | 'agent';
  imagePlaceholder?: string;
  featured: boolean;
}

export interface ResearchPillar {
  id: string;
  title: string;
  latinName?: string;
  iconName: string;
  tagline: string;
  description: string;
  mathematicalFoundation: string;
  keyContributions: string[];
  relatedPaperIds: string[];
  metricHighlight: string;
}

export interface ExperienceRole {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  supervisor?: string;
  description: string;
  bullets: string[];
  skills: string[];
  logo?: string;
  type: 'research' | 'engineering' | 'leadership';
}

export interface AwardItem {
  id: string;
  title: string;
  event: string;
  issuer: string;
  year: string;
  details: string;
  category: 'hackathon' | 'datathon' | 'academic' | 'programming' | 'community';
  highlight?: boolean;
  image?: string;
  badgeText?: string;
}

export interface TrajectoryTarget {
  id: string;
  country: string;
  city: string;
  coordinates: [number, number]; // [lat, lng]
  institutions: string[];
  programs: string[];
  fundingVehicles: string[];
  focusAreas: string[];
  status: 'primary' | 'comparing' | 'aspirational';
  whyTarget: string;
}

export interface SkillCategory {
  category: string;
  items: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient' | 'Working';
    note?: string;
  }[];
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  thesis: string;
  location: string;
  education: {
    degree: string;
    institution: string;
    period: string;
    cgpa: string;
    gradeType?: 'CGPA' | 'GPA';
    notes?: string;
  }[];
  contacts: {
    academicEmail: string;
    personalEmail: string;
    github: string;
    linkedin: string;
    googleScholar: string;
    researchGate: string;
    orcid: string;
    domain: string;
  };
  stats: {
    publicationsCount: number;
    topTierCount: number;
    hackathonWins: number;
    cgpa: string;
  };
}
