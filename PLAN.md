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
