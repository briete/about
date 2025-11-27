# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site (briete.me) built with Astro and deployed on Cloudflare Pages.

## Commands

```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Type check + build + optimize with jampack
pnpm preview      # Preview production build

# Code Quality
pnpm lint         # Run ESLint
pnpm format       # Format with Prettier
pnpm format:check # Check formatting

# Astro
pnpm sync         # Sync Astro content collections
```

## Architecture

- **Framework**: Astro 5.x with React integration for interactive components
- **Styling**: Tailwind CSS v4 via Vite plugin (no separate tailwind.config - configured in `src/styles/base.css` using `@theme` directive)
- **Content**: Astro Content Collections in `src/content/` with Zod schemas defined in `src/content/config.ts`

### Path Aliases

Configured in `tsconfig.json`:
- `@assets/*` → `src/assets/*`
- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@styles/*` → `src/styles/*`
- `@utils/*` → `src/utils/*`
- `@config` → `src/config.ts`

### Key Files

- `src/config.ts` - Site configuration (title, description, social links)
- `src/types.ts` - TypeScript type definitions
- `src/styles/base.css` - Tailwind theme and base styles
- `src/pages/index.astro` - Main portfolio page

### OG Image Generation

Uses `satori` and `@resvg/resvg-js` for dynamic OG image generation. Templates in `src/utils/og-templates/`.
