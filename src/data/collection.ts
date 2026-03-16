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
      tech: [
        "Next.js",
        "React",
        "TypeScript",
        "Nuxt.js",
        "Vue.js",
        "Tailwind CSS",
        "TanStack Query",
        "Zustand",
        "Radix UI",
        "Vuex",
        "Stripe",
        "next-intl",
        "Storybook",
        "Cypress",
        "Google Analytics 4",
        "PostHog",
        "Docker",
        "Kubernetes",
        "GitLab CI",
      ],
      domain: ["streaming", "media", "giloo"],
      capabilities: [
        "Platform-scale frontend engineering",
        "Internationalization architecture",
        "Incremental system migration",
        "Cross-stack product delivery",
      ],
    },
    detail: {
      projectName: "Giloo Streaming Platform",
      role: "Software Engineer",
      collaboration: "Built at Giloo with team members",
      descriptions: [
        {
          type: "text",
          content:
            "Giloo is a documentary streaming and crowdfunding platform serving primarily Taiwanese audiences, with a growing international presence. As a Software Engineer over 4.5 years — working closely with team members — contributions spanned continuous feature delivery on a live product serving 100K+ monthly active users: from search and notes to payment flows, NFT collections, donation, and public screening. The platform underwent several architectural milestones including a Cookie-based authentication migration, a centralized API factory rollout across all modules, and a full internationalization initiative covering 20+ modules. In 2025, the frontend was rebuilt from the ground up on Next.js 15 (App Router) with React 19 and TypeScript, re-implementing the core product on a new stack with Docker, Kubernetes, and a GitLab CI pipeline.",
        },
        {
          type: "heading",
          content: "Internationalization",
        },
        {
          type: "text",
          content:
            "Internationalization was introduced in late 2023 as a POC and scaled into a platform-wide initiative covering 20+ modules in Traditional Chinese, Simplified Chinese, and English. The Nuxt implementation required navigating SSR page caching constraints and locale-aware Sitemap generation, rolling out incrementally across the header, footer, video pages, payment flows, and member center. In the Next.js rebuild, i18n was re-architected on next-intl with a [locale] dynamic route pattern, locale-aware OG metadata, and a locale switcher with Safari-specific cookie compatibility handling. ESLint rules were configured to enforce correct use of the i18n routing APIs across the codebase. Translation management evolved toward direct locale file ownership, reducing external tooling overhead and keeping locale files versioned alongside the product.",
        },
        {
          type: "heading",
          content: "Notes System",
        },
        {
          type: "text",
          content:
            "The notes system was built in two distinct phases. The initial implementation introduced note creation with privacy controls, tag filtering, and a card component integrated into the video page. The more significant architectural change came when notes were decoupled from their episode bindings — enabling an independent note feed, a standalone note form, and a modal-based detail view that could surface across multiple product contexts. This unbinding required rethinking the data model, state management, and rendering strategy for a feature that had previously only existed in the context of a single video.",
        },
        {
          type: "heading",
          content: "Player Reconstruction",
        },
        {
          type: "text",
          content:
            "Led the Bitmovin player upgrade from end to end — beginning with a research phase evaluating options against the constraints of the existing legacy implementation, followed by a POC proposal and risk analysis presented to the team, and task planning before execution. The previous player layer had accumulated workarounds that made it increasingly difficult to maintain or extend. The reconstruction replaced the default control layer with a fully custom-built interface, resolving the legacy maintainability issues at the root. The new implementation included a redesigned seek bar, custom playback controls, a buffering animation, and DRM integration for protected content — all operating within Bitmovin's plugin and event API, with custom UI state kept in sync with the underlying player lifecycle. Later iterations added subtitle experience improvements, a report button embedded in the player UI, and region-based playback restriction enforcement.",
        },
        {
          type: "heading",
          content: "Next.js Rebuild — Architecture & Tech Selection",
        },
        {
          type: "text",
          content:
            "The Next.js 15 rebuild migrated the platform off Nuxt 2 (which had reached end-of-life) and established a foundation for the platform's next phase. The core architectural decision was a server/client isomorphic API pattern: Server Components use native fetch with Next.js per-call cache strategies, while client-side data fetching uses ky + React Query — with a unified API class that automatically detects execution environment and selects the appropriate HTTP client, along with centralized 401 interception and auth token cookie management. State management was rebuilt on Zustand with a bounded store and slice pattern, with selective localStorage persistence and SSR hydration synchronization to prevent client/server state mismatch. The deployment stack was established with Docker multi-stage builds, Kubernetes manifests, and a GitLab CI pipeline across dev, staging, and production environments.",
        },
        {
          type: "heading",
          content: "Multi-Currency & Checkout Flow",
        },
        {
          type: "text",
          content:
            "The new platform introduced currency as a first-class UI concern, backed by a dedicated CurrencySlice in the Zustand store with persistence and SSR hydration to prevent currency flicker on page load. The currency switcher propagates selection across product cards, checkout, and billing pages. The checkout flow supported both one-time and subscription purchase paths, with a payment method selector and an invoice carrier validation step covering phone barcode and unified business number formats. Account billing management was built as a multi-step dialog flow handling subscription cancellation and restoration with intermediate confirmation states.\n\nPrior to implementation, the existing payment flows across the Nuxt platform were audited and documented — producing flowcharts and scope definitions to support early-stage planning for the migration. This work was shared with the product manager and designer to help evaluate what to carry over, what to simplify, and where the new system could make different product decisions, directly informing the design direction of the new checkout system.",
        },
        {
          type: "heading",
          content: "SEO",
        },
        {
          type: "text",
          content:
            "SEO work spanned both the Nuxt and Next.js codebases. In the Nuxt era, contributions included video Sitemap generation, JSON-LD structured data, member page indexing configuration, and robots.txt tuning. In the Next.js rebuild, SEO was addressed structurally from the start: a dynamic sitemap.ts generates routes with locale alternates for all content types including project routes, while robots.ts is environment-aware to prevent staging content from being indexed. The navigation menu is server-rendered to ensure crawlability, and OG metadata is locale-aware with a consistent title template pattern.",
        },
        {
          type: "heading",
          content: "Page Caching",
        },
        {
          type: "text",
          content:
            "In the Nuxt codebase, page-level caching was a key constraint when rolling out internationalization — locale switching had to coexist with existing cache strategies without causing stale or mismatched content to be served. In the Next.js rebuild, caching was designed per-call at the data layer: each API request in Server Components specifies its own Next.js cache strategy (force-cache, no-store, or revalidate interval), enabling static-like performance for stable content such as category listings while ensuring user-specific or time-sensitive data is always fetched fresh.",
        },
        {
          type: "heading",
          content: "Testing",
        },
        {
          type: "text",
          content:
            "Testing infrastructure was established and maintained across both codebases. In the Nuxt era, Storybook was introduced to create a component documentation and visual testing environment, enabling isolated development and review of UI components independent of page context. Cypress E2E tests were maintained and upgraded from v10 to v12, modernizing the test infrastructure for core user flows. In the Next.js rebuild, unit tests were written alongside new features, establishing a testing baseline for the new codebase.",
        },
        {
          type: "heading",
          content: "Team & Documentation",
        },
        {
          type: "text",
          content:
            "Beyond feature work, contributed to team infrastructure — designing the frontend engineer interview process and question set, building an interview tracking board, and drafting the onboarding flow for new engineers. Wrote and maintained internal documentation covering the sprint workflow, code review process and guidelines, i18n translation workflow, and the web deployment process, giving new team members a clear reference for day-to-day engineering practices.",
        },
      ],
      gallery: [],
      links: [],
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
      projectName: "E-Commerce Site - Wassup Cat Litter",
      role: "Frontend Engineer",
      collaboration:
        "Built at Polish Design in collaboration with Backend Engineer and UI/UX Designer",
      descriptions: [
        {
          type: "text",
          content:
            "Wassup was a B2C e-commerce platform built for a Taiwanese cat litter brand, targeting cat owners looking for a convenient way to purchase or subscribe to recurring shipments. The core user journey spanned product discovery, cart management, shipping configuration, and payment processing — with a parallel subscription path that handled recurring order scheduling. The platform shipped with a full admin dashboard for product, order, and subscription management. As the primary frontend engineer on the team, the work covered the entire client-side experience: component architecture, UI interactions, animations, and responsive design across all pages.",
        },
        { type: "heading", content: "Technical Decisions" },
        {
          type: "text",
          content:
            "The site was built as a Vue-on-Rails hybrid — rather than rebuilding it as a full SPA, a lightweight event-based pattern bridged the static Rails pages and reactive Vue components, keeping the cart state centralized and always in sync with discount and shipping calculations. Interactions were treated as opportunities to reinforce the brand's personality: a sequenced GSAP timeline on the add-to-cart button gave the moment weight without slowing users down, with the cart drawer timed to open exactly as the animation resolved. \n\nThe checkout and member center were built as separate component sets for one-time and subscription flows, with inline discount feedback and URL-driven tab activation to support deep-linking from order notification emails.",
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
      tech: [
        "Next.js",
        "TypeScript",
        "Tailwind",
        "Radix UI",
        "Claude Code",
        "Context Engineering",
        "Figma",
      ],
      domain: ["web"],
    },
    detail: {
      projectName: "This site — Personal Portfolio",
      descriptions: [],
      role: "Software Engineer, Planner",
      gallery: [],
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
      tech: [
        "PEEK",
        "3D Printing",
        "Taguchi Method",
        "ANOVA",
        "SEM",
        "Thermal Imaging",
        "Hydroxyapatite Coating",
        "Cold Spray Technology",
        "Marlin Firmware",
        "C++",
        "Mechanical Engineering",
      ],
      domain: ["biomedical", "manufacturing", "master thesis"],
      capabilities: [
        "Experimental Design & Optimization",
        "Hardware Systems Development",
        "Research-Driven Problem Solving",
      ],
    },
    detail: {
      projectName: "Customized PEEK Implants via 3D Printing",
      role: "Researcher",
      collaboration:
        "Master's thesis at National Central University, under the supervision of Prof. Chao-Yaug Liao",
      descriptions: [
        {
          type: "text",
          content:
            "This research explored the feasibility of manufacturing patient-specific PEEK (polyetheretherketone) implants using fused deposition modeling (FDM) 3D printing, targeting orthopedic and spinal surgery applications. The core challenge was that PEEK — a high-performance polymer widely used in medical implants for its bone-like stiffness — requires processing temperatures far beyond the capability of off-the-shelf desktop printers. Starting from hardware modification, the project progressed through systematic process optimization, thermal behavior analysis, surface bioactivity enhancement, and load-bearing validation, ultimately producing functional spinal fusion cages and femur models that withstood clinical-level compression forces without fracture.",
        },
        {
          type: "text",
          content:
            "The research spanned the full development arc of a custom FDM system for PEEK, and ownership was held across hardware, process, materials, and analysis. The printer was built from an open-source Delta architecture, with the nozzle heating system upgraded to reach 380–400°C (versus a standard ceiling of ~250°C), and the heat bed rebuilt with aluminum and 300W elements to sustain 140–160°C — a critical range for maintaining crystallization conditions near PEEK's glass transition temperature. To navigate the enormous parameter space without exhaustive testing, a Taguchi L18 orthogonal array was applied, condensing 4,374 possible combinations into 18 structured experiments. ANOVA and signal-to-noise ratio analysis then identified infill density as the dominant factor (contributing ~40% to mechanical performance), followed by infill angle and nozzle temperature.\n\nA FLIR thermal imager was used to capture real-time thermal history during printing, revealing that the repeated heating-and-cooling cycles caused by nozzle traversal created unpredictable crystallinity gradients — insight that directly motivated the design of a post-print annealing protocol (ramping from 150°C to 200°C over ~10 hours) to stabilize and homogenize crystal structure. For surface bioactivity, a custom cold-spray module was designed and integrated to deposit hydroxyapatite (HA) powder onto printed surfaces without thermal degradation. Testing across different surface porosities revealed that HA adhesion was only effective on structured porous surfaces (~23% coverage at 30% porosity versus ~3% on smooth geometry), establishing a clear design guideline for future implant geometry. The finalized workflow produced implants that survived 2300N compressive loads with only 0.845mm displacement and no structural failure.",
        },
        {
          type: "text",
          content:
            "The thesis was recognized at two international and national conferences. The 2019 paper on customized PEEK implants with surface modification received the Best Paper 2nd Place Award at the ASME 13th International Conference on Micro and Nano Systems, while the 2018 process optimization study earned 3rd Place at the 35th Chinese Society of Mechanical Engineers Annual Conference.",
        },
      ],
      gallery: [
        { src: "images/peek/gallery/1.png", type: "image" },
        { src: "images/peek/gallery/2.png", type: "image" },
        { src: "images/peek/gallery/3.png", type: "image" },
        { src: "images/peek/gallery/4.png", type: "image" },
        { src: "images/peek/gallery/5.png", type: "image" },
      ],
      links: [
        {
          label: "ASME Paper",
          href: "https://asmedigitalcollection.asme.org/IDETC-CIE/proceedings-abstract/IDETC-CIE2019/59223/V004T08A013/1069946",
        },
      ],
    },
  },
];
