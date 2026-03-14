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

## Deployment

The site deploys to **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`). Every push to `main` triggers a build and deploy automatically.

To set up for the first time:
1. Create a repo named `polunwu.github.io` on GitHub
2. In repo Settings → Pages, set Source to **GitHub Actions**
3. Add the remote and push:
   ```bash
   git remote add origin https://github.com/polunwu/polunwu.github.io.git
   git push -u origin main
   ```

The site will be live at `https://polunwu.github.io`.

### Branch strategy

- `staging` — development branch, push here does **not** trigger deploy
- `main` — production branch, merging `staging` → `main` triggers build and deploy

> Important: In GitHub repo Settings → Pages, Source must be set to **GitHub Actions** (not "Deploy from a branch"), otherwise GitHub will deploy on any branch push regardless of the workflow.

### Content Pattern

Section components (`src/components/sections/`) are purely presentational. Content data (experience entries, research items, etc.) is defined as typed arrays at the top of each section file — there is no CMS or external data fetching. To update content, edit the data arrays directly in the relevant section file.
