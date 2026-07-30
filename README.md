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
| `/journal`, `/ingredients`, `/contact`, `/faqs`, `/privacy`, `/terms`, `/where-to-buy`, `/search` | Placeholder routes so no nav or footer link dead-ends |
| `/ar` | Arabic placeholder — this release is LTR-only, but the navbar language toggle needs a destination, and the page doubles as a `dir="rtl"` render check |

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
| `--color-gold-soft` | `#D8BD8A` | Gold text on the deep forest footer |
| `--color-gold-pale` | `#E6D2A8` | Gold text on the Botanical Green bands — meets AA there, where `gold-soft` lands at 4.19:1 |
| `--color-linen` | `#EFE3D0` | Alternating section backgrounds, soft panels |
| `--color-shell` | `#F3ECE0` | Warmer panel tone between Cream and Linen |
| `--color-green` | `#3F5A44` | Headings, primary buttons, brand anchor |
| `--color-forest` | `#2C4433` | Footer band |
| `--color-cream` | `#FAF6EE` | Dominant page background |
| `--color-ink` | `#1E1E1A` | Body copy |
| `--color-ink-muted` | `#57564E` | Secondary body copy |

Headings use Cormorant Garamond, body copy uses Inter, both loaded through `next/font`.

### Where the reference designs overrode the brief

The brief says to prioritise the reference screenshots for visual and layout decisions and the
written spec for content and structure. Two places where that changed the outcome:

- **Footer background.** The spec calls for Botanical Black; every reference screenshot shows a
  deep forest green. The footer uses `--color-forest`, with `--color-ink` still carrying body
  copy. Switching it back is a one-line change in `Footer.tsx`.
- **Ingredient cards.** The references show a short description under each ingredient, but the
  brief supplies no copy for them and forbids inventing marketing copy. The cards therefore show
  the image, the name and an "Explore" link only. Descriptions belong in the Ingredient Library
  when that copy exists.

## Structure

```
src/
  app/                     routes, per-page metadata, global CSS, page-transition template
  components/
    Navbar, Footer         shared chrome (sticky nav with Collections dropdown, search,
                           language toggle and Buy Now; deep-green multi-column footer)
    BrandMark              wordmark lockup — botanical "i", rule-flanked tagline, Arabic line
    Hero                   split copy/photography hero, with optional feature icon row
    Section,
    SectionHeading, Card,
    CTAButton, ArrowLink   layout and content primitives
    Icon                   gold botanical line-icon set used across the strips
    ImagePlaceholder       botanical-toned stand-in for real photography
    BenefitStrip           four-cell benefit band on the collection pages
    PromiseBand            promise + formula standards + closing statement band
    IngredientCarousel     ingredient rail; paging arrows appear only when it overflows
    FormulaStandards,
    BrandStatement         standalone variants of the promise-band pieces
    NewsletterForm         email capture (not yet wired to a provider)
    ComingSoon             shell for routes with no content yet
    motion/                Reveal + RevealGroup scroll-reveal wrappers
  lib/navigation.ts        nav and footer link data
```

Grid containers set an explicit base column (`grid-cols-1`) before their `lg:` template. Without
it the single implicit column is auto-sized, and a wide child — the ingredient rail — drags the
whole page wider than the viewport on mobile.

## Imagery

All imagery goes through `<Media>`, which renders `next/image` when given a `src` and falls back
to the botanical placeholder when not. Paths and alt text live in `src/lib/media.ts`.

- **`generic`** — licensed stock photography in `public/images/` standing in for the botanical,
  laboratory and editorial shots in the designs. Pexels licence: free for commercial use, no
  attribution required. Swap for brand-shot photography whenever you like; only `media.ts`
  changes.
- **`product`** — every entry is `undefined`. Rosica product photography is brand-owned and
  cannot be substituted, so those slots still render the placeholder. **Fill in a path in
  `media.ts` and it appears everywhere that slot is used** — hero, collection cards, product
  grids — with no component changes.

The outstanding product slots are `rangeGroup` (all four bottles, used by the homepage, About and
Collections heroes), `essentialsGroup`, `pureBottle`, and one per named product.

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
3. Create `src/app/collections/<slug>/page.tsx`, reusing `Hero`, `BenefitStrip` and
   `PromiseBand`.
4. Add it to `footerColumns` in the same file if it should appear in the footer.

## Before launch

- Supply Rosica product photography and fill in the `product` map in `src/lib/media.ts`. This is
  the single largest visual gap against the reference designs — those layouts are carried by
  large product shots, and every one of those slots is currently a placeholder.
- Review the stock imagery in `public/images/` and replace with brand photography where it
  matters. `ingredient-propolis.jpg` is the weakest match: it shows bees on honeycomb rather than
  propolis resin itself, because usable propolis photography was not available.
- Wire `NewsletterForm` to the newsletter provider (marked `TODO`; it currently only shows a
  local confirmation).
- Point the footer social links at the real Rosica profiles and set the production URL in
  `metadataBase` (`src/app/layout.tsx`).
- Fill in the placeholder routes listed above, and build the Arabic locale behind the navbar
  language toggle (`/ar`, marked `TODO` in `Navbar.tsx`).
- Implement search behind the navbar search icon (`/search`).

## Accessibility

Audited with axe-core (WCAG 2.1 A/AA plus best-practice rules) across all seven rendered routes.
Heading order, landmarks and colour contrast pass.

One reported contrast item is left as-is by design: the **Rosica wordmark** is gold on cream
(2.06:1). WCAG 1.4.3 exempts "text that is part of a logo or brand name" from contrast
requirements, and gold-on-cream is the approved brand mark. axe cannot tell a logotype from body
copy, so it flags it. Do not "fix" this by recolouring the wordmark — every other gold text on a
light background already uses `--color-gold-deep`.

When auditing, let the scroll reveals finish before running axe. Mid-fade it measures blended
colours and reports contrast failures that do not exist at rest.
