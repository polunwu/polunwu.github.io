export type CollectionItem = {
  slug: string;
  year: number;
  title: string;
  description: string;
  cover: string;
  tags: {
    type: "product" | "project" | "side-project" | "research";
    tech: string[];
    domain: string[];
  };
};

export const collection: CollectionItem[] = [
  {
    slug: "giloo-platform",
    year: 2024,
    title: "Giloo Streaming Platform",
    description: "Frontend modernization of a streaming platform serving 100K+ monthly active users.",
    cover: "",
    tags: {
      type: "product",
      tech: ["Next.js", "TypeScript", "TanStack Query", "Tailwind"],
      domain: ["streaming", "media"],
    },
  },
  {
    slug: "creator-system",
    year: 2023,
    title: "Content Creator System",
    description: "End-to-end system for video uploads, customizable content pages, and revenue management.",
    cover: "",
    tags: {
      type: "product",
      tech: ["React", "TypeScript"],
      domain: ["streaming", "creator-tools"],
    },
  },
  {
    slug: "3d-ar-experiences",
    year: 2021,
    title: "3D & AR Interactive Experiences",
    description: "Browser-based 3D visualizations and mobile AR experiences for clients.",
    cover: "",
    tags: {
      type: "project",
      tech: ["Three.js", "GSAP", "WebAR"],
      domain: ["creative", "interactive"],
    },
  },
  {
    slug: "peek-implants",
    year: 2019,
    title: "Customized PEEK Implants via 3D Printing",
    description: "Research on microporous surface modification for medical implants using precision 3D printing.",
    cover: "",
    tags: {
      type: "research",
      tech: ["3D Printing", "PEEK"],
      domain: ["biomedical", "manufacturing"],
    },
  },
  {
    slug: "portfolio-site",
    year: 2025,
    title: "Personal Portfolio",
    description: "This site — a minimal portfolio built with Next.js and Tailwind.",
    cover: "",
    tags: {
      type: "side-project",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      domain: ["web"],
    },
  },
];
