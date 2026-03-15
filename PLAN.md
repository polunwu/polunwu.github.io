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
- [ ] Visual relationship map across projects — Obsidian-style force graph
  - Not planned for implementation yet
- [ ] Collection detail page per item (`/collection/[slug]`)
  - [x] Extend `CollectionItem` type with detail fields (projectName, role, collaboration, descriptions, gallery, links)
  - [x] descriptions supports `text` and `code` block union types
  - [x] Implement detail page layout with TopNav, metadata, descriptions, tech tags, links, gallery
  - [x] Populate detail data for `3d-ar-experiences` (FDPG 2021)
  - [ ] Populate detail data for remaining items
- [x] TopNav shared component (fixed, transparent background with per-element white fill)
  - Used on detail pages; Sidebar remains on home and collection pages

## Prompts

### Portfolio project description writer

Use this prompt to generate `descriptions` and `tags.tech` for a `CollectionItem`.

```
You are helping me write portfolio project descriptions. Given a current project folder, read though the hole project, output the following three items in en-US:

1. **Project Overview** — A concise paragraph describing the project's goal, target audience, core user journey, and key outcomes. Write in past tense. Avoid bullet points.

2. **Technical Highlight** — A concise paragraph focusing on one specific technical area I specify. Describe the implementation approach, tools used, any non-obvious decisions or challenges, and the outcome. Include any cross-discipline collaboration if relevant. Write in past tense. Avoid bullet points.

3. **Tech Tags** — A JavaScript array of technology/tool names used in the project, based on the stack and libraries mentioned.

Keep the tone professional but human. Do not exaggerate. Only include what I provide — do not invent details.
```
