export type CollectionItem = {
  slug: string;
  yearStart: number;
  yearEnd?: number;
  title: string;
  description: string;
  cover: string;
  coverAspect:
    | "aspect-square"
    | "aspect-video"
    | "aspect-[3/4]"
    | "aspect-[4/3]"
    | "aspect-[2/3]";
  tags: {
    type: "product" | "project" | "side-project" | "research";
    tech: string[];
    domain: string[];
  };
  detail?: {
    projectName?: string;
    role: string;
    collaboration?: string;
    descriptions: (
      | { type: "text"; content: string }
      | { type: "code"; content: string; language?: string }
    )[];
    gallery: { src: string; type: "image" | "video" }[];
    links?: { label: string; href: string }[];
  };
};

export const collection: CollectionItem[] = [
  {
    slug: "giloo-platform",
    yearStart: 2021,
    yearEnd: 2026,
    title: "Giloo Streaming Platform",
    description:
      "Frontend modernization of a streaming platform serving 100K+ monthly active users.",
    cover: "images/giloo-platform/cover.mp4",
    coverAspect: "aspect-[4/3]",
    tags: {
      type: "product",
      tech: ["Next.js", "TypeScript", "TanStack Query", "Tailwind"],
      domain: ["streaming", "media", "giloo"],
    },
  },
  {
    slug: "creator-system",
    yearStart: 2023,
    yearEnd: 2026,
    title: "Content Creator System",
    description:
      "End-to-end creator platform for video uploads, content customization, and revenue management, featuring AI subtitle translation.",
    cover: "images/giloo-creator-platform/cover.jpg",
    coverAspect: "aspect-square",
    tags: {
      type: "product",
      tech: ["React", "TypeScript", "Redux Toolkit Query", "Material UI"],
      domain: ["streaming", "creator-tools", "giloo"],
    },
  },
  {
    slug: "3d-ar-experiences",
    yearStart: 2021,
    title: "3D & Web AR Interactive Experiences",
    description:
      "Browser-based 3D visualizations and mobile AR experiences for clients.",
    cover: "images/fdpg/cover.png",
    coverAspect: "aspect-square",
    tags: {
      type: "project",
      tech: ["Nuxt.js", "Vue.js", "A-Frame", "glTF / GLB", "GSAP", "WebAR"],
      domain: ["creative", "interactive", "polish"],
    },
    detail: {
      projectName: "FDPG 2021",
      role: "Frontend Engineer",
      collaboration: "Built at Polish Design in collaboration with Backend Engineer, Art Director and 3D Designer",
      descriptions: [
        { type: "text", content: "A time-gated interactive event platform built for Fourdesire's 2021 annual gathering. The experience guided registered participants through a series of unlockable activities — from scanning a physical AR marker to reveal their exclusive character, to joining live sessions on Google Meet and Gather.Town. The platform tracked real-time attendance, enforced phase-based content unlocks tied to the event schedule, and concluded with a post-event survey that revealed a downloadable desktop wallpaper upon completion." },
        { type: "text", content: "The AR character reveal was built as a standalone HTML page using A-Frame and AR.js with custom pattern marker detection. When the camera recognizes the physical marker included in the participant's physical kit, the corresponding character's animated 3D model (glTF/GLB format) is loaded and rendered directly over the marker in real time. Users can interact with the model via single-finger drag to rotate and two-finger pinch to scale, powered by custom A-Frame gesture components. A screenshot feature composites the live camera feed and the 3D scene into a single image using Canvas API and merge-images, which participants can save and share on Instagram with a pre-filled hashtag.\n\nAchieving the final result required close, iterative collaboration with the 3D designer — experimenting with different export settings, polygon counts, texture formats, and animation baking to balance visual quality against mobile rendering performance within the WebAR environment." },
      ],
      gallery: [],
      links: [
        { label: "GitHub", href: "https://github.com/polunwu/fdpg" },
      ],
    },
  },
  {
    slug: "network-management-platform",
    yearStart: 2021,
    title: "Network Management Platform Redesign",
    description:
      "Restructured 30+ pages of a network management platform, introducing modern frontend stack and UI frameworks.",
    cover: "images/network-platform/cover.png",
    coverAspect: "aspect-square",
    tags: {
      type: "project",
      tech: ["Vue3", "SCSS", "Javascript"],
      domain: ["network", "enterprise", "polish"],
    },
  },
  {
    slug: "wassup-shopping",
    yearStart: 2021,
    title: "E-Commerce Site - Wassup Cat Litter",
    description:
      "Collaborative frontend development of a shopping site, including cart and member center with full API integration.",
    cover: "images/wassup-shopping/cover.png",
    coverAspect: "aspect-video",
    tags: {
      type: "project",
      tech: ["Vue.js", "View in Rails", "GSAP", "SCSS"],
      domain: ["e-commerce"],
    },
  },
  {
    slug: "portfolio-site",
    yearStart: 2026,
    title: "Personal Portfolio",
    description:
      "This site — a minimal portfolio built with Next.js and Tailwind.",
    cover: "images/personal-portfolio/cover.png",
    coverAspect: "aspect-[2/3]",
    tags: {
      type: "side-project",
      tech: ["Next.js", "TypeScript", "Tailwind", "Radix UI"],
      domain: ["web"],
    },
  },
  {
    slug: "peek-implants",
    yearStart: 2019,
    title: "Customized PEEK Implants via 3D Printing",
    description:
      "Research on microporous surface modification for medical implants using precision 3D printing.",
    cover: "images/peek/cover.png",
    coverAspect: "aspect-[4/3]",
    tags: {
      type: "research",
      tech: ["3D Printing", "PEEK"],
      domain: ["biomedical", "manufacturing", "master thesis"],
    },
  },
];
