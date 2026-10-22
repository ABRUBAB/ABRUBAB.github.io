import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (p: P): P => ({
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  ...p,
});

export const ArrowUpRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const ArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowDown = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);
export const Download = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3v12M7 11l5 5 5-5M5 20h14" />
  </svg>
);
export const Mail = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 8 8 6 8-6" />
  </svg>
);
export const Copy = (p: P) => (
  <svg {...base(p)}>
    <rect x="9" y="9" width="11" height="11" rx="3" />
    <path d="M5 15V7a3 3 0 0 1 3-3h8" />
  </svg>
);
export const Check = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const Search = (p: P) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </svg>
);
export const Menu = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 9h16M4 15h16" />
  </svg>
);
export const Close = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Lock = (p: P) => (
  <svg {...base(p)}>
    <rect x="5" y="11" width="14" height="9" rx="2.5" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);
export const Trophy = (p: P) => (
  <svg {...base(p)}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H5a2 2 0 0 0 2 4M16 6h3a2 2 0 0 1-2 4M12 13v4M9 20h6" />
  </svg>
);

/* Brand marks — filled, 24px grid */
const brand = (p: P): P => ({ width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, ...p });

export const GitHub = (p: P) => (
  <svg {...brand(p)}>
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.3 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
  </svg>
);
export const LinkedIn = (p: P) => (
  <svg {...brand(p)}>
    <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Zm1.8 13.1H3.6V9h3.5v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.200 0 22.200 0Z" />
  </svg>
);
export const Scholar = (p: P) => (
  <svg {...brand(p)}>
    <path d="M5.2 13.8 0 9.500 12 0l12 9.500-5.200 4.300A7 7 0 0 0 12 9.500a7 7 0 0 0-6.800 4.300ZM12 10a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z" />
  </svg>
);
export const Orcid = (p: P) => (
  <svg {...brand(p)}>
    <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24ZM7.400 4.400a.95.95 0 1 1 0 1.900.95.95 0 0 1 0-1.900ZM6.600 7.400h1.500v10H6.600v-10Zm3.600 0h3.900c3.700 0 5.300 2.700 5.300 5 0 2.600-2 5-5.300 5h-3.900v-10Zm1.400 1.300v7.400h2.300c3.300 0 4-2.500 4-3.700 0-2-1.300-3.700-4.100-3.700h-2.200Z" />
  </svg>
);
export const ResearchGate = (p: P) => (
  <svg {...brand(p)}>
    <rect x="1" y="1" width="22" height="22" rx="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <text x="12" y="16.200" textAnchor="middle" fontSize="9.500" fontWeight="700" fontFamily="ui-monospace, monospace" fill="currentColor">
      RG
    </text>
  </svg>
);

export const socialIcon = {
  github: GitHub,
  linkedin: LinkedIn,
  scholar: Scholar,
  orcid: Orcid,
  researchgate: ResearchGate,
} as const;
