# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Build for static export (outputs to /out)
npm run lint     # Run ESLint
```

There are no tests in this project.

## Architecture

This is a personal portfolio site built with Next.js (App Router), TypeScript, and Tailwind CSS v4. It is configured for **static export** (`output: "export"` in `next.config.ts`), so there are no server-side features — avoid using `getServerSideProps`, API routes, or any Next.js server-only APIs.

### Layout

The single-page layout (`src/app/page.tsx`) uses a two-column CSS grid:
- **Left column** — fixed `Sidebar` with name, nav links, and contact links
- **Right column** — scrollable `<main>` stacking section components vertically
- **Floating** — `Clock` component pinned top-right

### Fonts & Design Tokens

Two Google Fonts are loaded via `next/font` in `layout.tsx`:
- `--font-cormorant` — Cormorant (serif, used for headings and the name/logo)
- `--font-mono` — IBM Plex Mono (monospace, used as the body default)

CSS custom properties defined in `globals.css` drive the color palette:
- `--background`, `--foreground`, `--muted`, `--border`, `--accent` (#1400ff blue)

All components reference these via Tailwind's `text-[var(--muted)]` syntax or inline `style` props.

### Content Pattern

Section components (`src/components/sections/`) are purely presentational. Content data (experience entries, research items, etc.) is defined as typed arrays at the top of each section file — there is no CMS or external data fetching. To update content, edit the data arrays directly in the relevant section file.
