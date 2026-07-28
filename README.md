# Rosica

Marketing website for **Rosica**, a premium natural beauty brand. Built with Next.js (App
Router), TypeScript, Tailwind CSS v4 and Framer Motion.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Homepage |
| `/about` | About Rosica |
| `/collections` | Collections overview |
| `/collections/essentials` | Rosica Essentials |
| `/collections/pure` | Rosica PURE |
| `/journal`, `/ingredients`, `/contact`, `/faqs`, `/privacy`, `/terms` | Placeholder routes so no nav or footer link dead-ends |

Every page exports its own `metadata` (title + description) derived from its heading and body
copy. The root layout holds the shared title template, Open Graph defaults and keywords.

## Brand tokens

The palette and typography live as CSS variables in `src/app/globals.css` under Tailwind v4's
`@theme` block, so they are adjustable in one place and available as utilities
(`bg-cream`, `text-green`, `border-gold`, …).

| Token | Value | Use |
| --- | --- | --- |
| `--color-gold` | `#C6A15B` | Rule lines, icon strokes, borders, hover states, text on dark |
| `--color-gold-deep` | `#7A5D22` | Small gold text on Cream/Linen — meets WCAG AA (≥ 4.5:1) |
| `--color-gold-soft` | `#D8BD8A` | Gold text on the Botanical Black bands |
| `--color-linen` | `#EFE3D0` | Alternating section backgrounds, soft panels |
| `--color-green` | `#3F5A44` | Headings, primary buttons, brand anchor |
| `--color-cream` | `#FAF6EE` | Dominant page background |
| `--color-ink` | `#1E1E1A` | Body copy, footer and closing bands |
| `--color-ink-muted` | `#57564E` | Secondary body copy |

Headings use Cormorant Garamond, body copy uses Inter, both loaded through `next/font`.

## Structure

```
src/
  app/                     routes, per-page metadata, global CSS, page-transition template
  components/
    Navbar, Footer         shared chrome (sticky nav with Collections dropdown, dark footer)
    Hero, Section,
    SectionHeading, Card,
    CTAButton              layout and content primitives
    ImagePlaceholder       botanical-toned stand-in for real photography
    FormulaStandards,
    BrandStatement         shared collection-page sections
    NewsletterForm         email capture (not yet wired to a provider)
    ComingSoon             shell for routes with no content yet
    motion/                Reveal + RevealGroup scroll-reveal wrappers
  lib/navigation.ts        nav and footer link data
```

## Motion

Framer Motion drives the scroll reveals (fade + ~24px rise, children staggered ~90–120ms), the
hero load-in, and the cross-route fade in `src/app/template.tsx`. Hover states (button scale,
card lift, image zoom, gold underline sweep) are Tailwind/CSS transitions. Everything checks
`prefers-reduced-motion` and collapses to a static render when it is set; a `<noscript>` rule in
the root layout keeps revealed content visible without JavaScript.

## Adding a collection

Collections are data-driven, not hardcoded to hair care:

1. Add the entry to `primaryNav[].children` in `src/lib/navigation.ts` — the dropdown picks it up.
2. Add it to the `collections` array in `src/app/collections/page.tsx`; the grid renders each
   entry with identical visual weight.
3. Create `src/app/collections/<slug>/page.tsx`, reusing `Hero`, `Card`, `FormulaStandards` and
   `BrandStatement`.

## Before launch

- Replace the placeholder art. Every spot is marked `{/* TODO: replace with real product photo */}`
  and renders `<ImagePlaceholder>`; swap in `next/image` with real `alt` text.
- Wire `NewsletterForm` to the newsletter provider (marked `TODO`; it currently only shows a
  local confirmation).
- Point the footer social links at the real Rosica profiles and set the production URL in
  `metadataBase` (`src/app/layout.tsx`).
- Fill in the placeholder routes listed above.

## Accessibility

Audited with axe-core (WCAG 2.1 A/AA plus best-practice rules) across the five main pages — no
violations, including heading order, landmarks and colour contrast.
