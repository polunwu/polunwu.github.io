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
    capabilities?: string[];
  };
  detail?: {
    projectName?: string;
    role: string;
    collaboration?: string;
    descriptions: (
      | { type: "heading"; content: string }
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
      capabilities: [
        "cross-discipline collaboration",
        "constraint-driven design",
        "iterative prototyping",
      ],
    },
    detail: {
      projectName: "FDPG 2021",
      role: "Frontend Engineer",
      collaboration:
        "Built at Polish Design in collaboration with Backend Engineer, Art Director and 3D Designer",
      descriptions: [
        {
          type: "text",
          content:
            "A time-gated interactive event platform built for Fourdesire's 2021 annual online gathering. The experience guided registered participants through a series of unlockable activities — from scanning a physical AR marker to reveal their exclusive character, to joining live sessions on Google Meet and Gather.Town. The platform tracked real-time attendance, enforced phase-based content unlocks tied to the event schedule, and concluded with a post-event survey that revealed a downloadable desktop wallpaper upon completion.",
        },
        {
          type: "text",
          content:
            "The AR character reveal was built as a standalone HTML page using A-Frame and AR.js with custom pattern marker detection. When the camera recognizes the physical marker included in the participant's physical kit, the corresponding character's animated 3D model (glTF/GLB format) is loaded and rendered directly over the marker in real time. Users can interact with the model via single-finger drag to rotate and two-finger pinch to scale, powered by custom A-Frame gesture components. A screenshot feature composites the live camera feed and the 3D scene into a single image using Canvas API and merge-images, which participants can save and share on Instagram with a pre-filled hashtag.\n\nAchieving the final result required close, iterative collaboration with the 3D designer — experimenting with different export settings, polygon counts, texture formats, and animation baking to balance visual quality against mobile rendering performance within the WebAR environment.",
        },
      ],
      gallery: [
        { src: "images/fdpg/gallery/1.webp", type: "image" },
        { src: "images/fdpg/gallery/2.PNG", type: "image" },
        { src: "images/fdpg/gallery/3.PNG", type: "image" },
        { src: "images/fdpg/gallery/4.JPG", type: "image" },
      ],
      links: [{ label: "GitHub", href: "https://github.com/polunwu/fdpg" }],
    },
  },
  {
    slug: "network-management-platform",
    yearStart: 2021,
    title: "Network Management Platform Refactor",
    description:
      "Restructured 40+ pages of a network management platform, introducing modern frontend stack and UI frameworks.",
    cover: "images/network-platform/cover.png",
    coverAspect: "aspect-square",
    tags: {
      type: "project",
      tech: [
        "Vue.js",
        "TypeScript",
        "Vuex",
        "Vue Router",
        "i18n",
        "Kendo UI",
        "ECharts",
        "GoJS",
        "Axios",
        "SCSS",
        "Vuedraggable",
        "Vue CLI",
        "Jest",
      ],
      domain: ["network", "enterprise", "polish"],
      capabilities: [
        "Legacy system modernization",
        "Scalable component architecture",
        "Interactive data visualization",
        "Design system implementation",
      ],
    },
    detail: {
      projectName: "PIXIS — Network Management System",
      role: "Frontend Engineer",
      collaboration:
        "Built at Polish Design in collaboration with Product Manager and UI/UX Designer, alongside the client's Engineers",
      descriptions: [
        {
          type: "text",
          content:
            "PIXIS is an enterprise network management system built for IT and network administrators overseeing complex, multi-site infrastructure. The platform provided a centralized interface for device discovery and inventory, network topology visualization, DHCP configuration, IP conflict detection, audit logging, and compliance rule enforcement across multiple organizational sites. Administrators could monitor switches, track host devices, and investigate security events from a customizable dashboard with draggable panels. The project was delivered as a fully functional frontend with mock API integration, dark/light theme support, and bilingual (English/Traditional Chinese) internationalization.",
        },
        {
          type: "text",
          content:
            "The previous version of PIXIS was built on a jQuery foundation with multiple ad-hoc UI libraries that frequently conflicted in CSS namespacing, event handling, and component lifecycle — making new feature development increasingly unpredictable and costly. The refactor adopted Vue 3 as the core framework and consolidated the UI layer around a single enterprise component library, Kendo UI, eliminating inter-library conflicts at the root. The Composition API enabled the extraction of over 37 reusable composables (e.g., useGrid, useFilter, useToggle), replacing scattered jQuery DOM manipulation with declarative, testable logic units organized by domain. TypeScript was introduced to enforce type contracts across API boundaries and component props, surfacing integration errors earlier in the development cycle. Theming was standardized through SCSS variables shared across light and dark variants, replacing the patchwork of per-library style overrides from the legacy codebase. The refactor covered over 40+ product pages across 9 functional areas, and as a result, new feature pages could be scaffolded by composing existing hooks and components rather than duplicating imperative jQuery logic, significantly reducing the cost of iteration.",
        },
      ],
      gallery: [
        { src: "images/network-platform/gallery/1.webp", type: "image" },
        { src: "images/network-platform/gallery/2.webp", type: "image" },
        { src: "images/network-platform/gallery/3.webp", type: "image" },
        { src: "images/network-platform/gallery/4.webp", type: "image" },
        { src: "images/network-platform/gallery/5.webp", type: "image" },
        { src: "images/network-platform/gallery/6.webp", type: "image" },
        { src: "images/network-platform/gallery/7.webp", type: "image" },
        { src: "images/network-platform/gallery/8.webp", type: "image" },
      ],
      links: [],
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
      tech: [
        "Ruby on Rails",
        "Vue.js",
        "Stimulus.js",
        "GSAP",
        "Axios",
        "SCSS",
        "Bootstrap",
        "PostgreSQL",
      ],
      domain: ["e-commerce"],
      capabilities: [
        "Cross-boundary frontend development",
        "Animation and interaction design",
      ],
    },
    detail: {
      projectName: "Wassup — Cat Litter E-Commerce",
      role: "Frontend Engineer",
      collaboration:
        "Built at Polish Design in collaboration with Backend Engineer and UI/UX Designer",
      descriptions: [
        {
          type: "text",
          content:
            "Wassup was a B2C e-commerce platform built for a Taiwanese cat litter brand, targeting cat owners looking for a convenient way to purchase or subscribe to recurring shipments. The core user journey spanned product discovery, cart management, shipping configuration, and payment processing — with a parallel subscription path that handled recurring order scheduling. The platform shipped with a full admin dashboard for product, order, and subscription management. As the primary frontend engineer on the team, the work covered the entire client-side experience: component architecture, UI interactions, animations, and responsive design across all pages.",
        },
        { type: "heading", content: "Shopping Cart System" },
        {
          type: "text",
          content:
            "The shopping cart was designed to feel live and responsive across a server-rendered site — a challenge that required bridging the gap between static Rails pages and a reactive Vue component. Rather than rebuilding the site as a full SPA, a lightweight event-based communication pattern was used to let the product page trigger cart updates without coupling the two sides together. Cart state was kept centralized and consistently reflected in the UI, including discount code validation and shipping fee calculation, so users always had an accurate view of their order before reaching checkout.",
        },
        { type: "heading", content: "GSAP Animation" },
        {
          type: "text",
          content:
            "Adding an item to the cart was treated as a moment worth acknowledging — not just a silent state update. A short animation played on button click, using a sequenced timeline to give the interaction a sense of weight and playfulness that matched the brand's personality. The challenge was making the animation feel fluid without it slowing users down, which was solved by timing the cart drawer to open exactly as the animation resolved, keeping the experience snappy while still letting the moment land.",
        },
        { type: "heading", content: "Checkout Flow" },
        {
          type: "text",
          content:
            "The checkout summary panel needed to clearly communicate order details, discounts, and totals — and stay in sync with user input like coupon codes — without overwhelming the page. Separate component sets were built for one-time purchases and subscriptions, since the two flows had meaningfully different information to surface. Each handled discount feedback inline, giving users immediate visual confirmation of whether a code worked, which reduced friction at one of the most drop-off-prone steps in the funnel.",
        },
      ],
      gallery: [
        { src: "images/wassup-shopping/gallery/1.webp", type: "image" },
        { src: "images/wassup-shopping/gallery/2.webp", type: "image" },
      ],
      links: [],
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
