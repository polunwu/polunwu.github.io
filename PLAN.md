# PLAN.md

## Goals

- Target audience: people who can offer work opportunities or collaborations
- Showcase a cross-domain background across product work, freelance, and side projects

## TODOs

### Collection page (`/collection`)

- [x] Build a Collection page aggregating all project experiences
  - Covers: product work, freelance, side projects
- [x] Tag system per project for future filtering
  - Multi-dimensional tags: type (product / project / side-project / research), tech stack, domain
- [x] Visual relationship map across projects — Obsidian-style force graph
  - Standalone page at `/graph`
  - Nodes: project (blue), tech (size by connection count), domain, capability
  - Edges with d3-force simulation, collision, per-type link distances
  - Hover tooltip, tag node highlight/dim, click project node → detail page
  - Sidebar nav: Waypoints icon (lucide-react); mobile nav simplified to Collection + icon
- [x] Collection detail page per item (`/collection/[slug]`)
  - [x] Extend `CollectionItem` type with detail fields (projectName, role, collaboration, descriptions, gallery, links)
  - [x] descriptions supports `heading`, `text`, and `code` block union types
  - [x] Implement detail page layout with TopNav, metadata, descriptions, tech tags, links, gallery
  - [x] Populate detail data for `3d-ar-experiences` (FDPG 2021)
  - [x] Populate detail data for `network-management-platform` (PIXIS)
  - [x] Populate detail data for `wassup-shopping`
  - [x] Populate detail data for `peek-implants`
  - [x] Populate detail data for `giloo-platform`
  - [x] Populate detail data for `creator-system`
  - [ ] Populate detail data for `portfolio-site` (pending — fill in when site is more complete)
- [x] TopNav shared component (fixed, transparent background with per-element white fill)
  - Used on detail pages; Sidebar remains on home and collection pages

### CV

- [x] Add a CV link that opens a PDF version of the CV
  - "Full CV" link added to Sidebar (desktop contact links) and TopNav (desktop right links)
  - PDF served from `public/polunwu_cv.pdf`

### About / Bio

- [ ] Rewrite About description to better reflect current direction, personality, and cross-domain background

### Copywriting

- [ ] Proofread all site text for grammar, consistency, and tone across all sections and collection detail pages

### Meta / SEO

- [ ] Update OG image
- [ ] Update favicon

### Theme

- [ ] Add dark/light mode toggle

### Experience & Research sections

- [x] Experience highlights link to corresponding collection detail pages
  - Hover effect: subtle bg tint + underline; company name turns accent blue on hover
- [x] Research papers link to `/collection/peek-implants`
  - Hover effect: award text turns accent blue; card bg tint on hover

### Graph (`/graph`)

- [ ] **Zoom controls** — Add zoom in/out UI controls for users without a touchpad, scroll wheel, or on mobile devices

### Navigation

- [ ] **Sidebar & TopNav refactor** — Unify structure and styles between Sidebar and TopNav for consistency and maintainability

### RWD (Mobile)

Design principle:
- **Desktop**: keep existing two-column layout (Sidebar left + main content right)
- **Mobile**: Sidebar collapses into a fixed top header bar (name left, nav links right); main content full-width
- Mobile Sidebar header should visually match TopNav style for consistency

- [ ] **Sidebar** — convert to fixed top header on mobile (name left, nav links right)
- [ ] **Home page** — grid to `grid-cols-1 md:grid-cols-[160px_1fr]`; single column on mobile
- [ ] **Collection page** — same grid fix; cards `columns-1 sm:columns-2 md:columns-3`
- [ ] **Collection detail page** — hide 160px spacer on mobile; verify TopNav nav links don't overflow
- [ ] **Sections** — verify Experience / Research / Education spacing on mobile
- [ ] **Clock** — verify no overlap with Sidebar header on mobile

## Prompts

### Portfolio project description writer

Use this prompt to generate `descriptions`, `tags.tech`, and `tags.capabilities` for a `CollectionItem`.

```
You are helping me write portfolio project descriptions. Given a current project folder, read though the hole project, output the following four items in en-US:

1. **Project Overview** — A concise paragraph describing the project's goal, target audience, core user journey, and key outcomes. Write in past tense. Avoid bullet points.

2. **Technical Highlights** — One or more concise paragraphs, each focusing on a specific technical area. Use a heading block before each highlight. Describe the implementation approach, tools used, any non-obvious decisions or challenges, and the outcome. Include any cross-discipline collaboration if relevant. Write in past tense. Avoid bullet points.

3. **Tech Tags** — A JavaScript array of technology/tool names used in the project, based on the stack and libraries mentioned.

4. **Capability Tags** — A JavaScript array of 2–4 short strings describing the abstract problem-solving capabilities demonstrated in this project. Focus on transferable skills that go beyond tools. Only include what is clearly evidenced by the project.

Keep the tone professional but human. Do not exaggerate. Only include what I provide — do not invent details.
```
