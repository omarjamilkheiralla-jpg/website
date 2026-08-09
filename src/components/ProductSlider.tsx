"use client";

import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ArrowLink from "./ArrowLink";
import Media from "./Media";
import type { Locale } from "@/lib/i18n";

export type SliderProduct = {
  /** As printed on the bottle. */
  name: string;
  /** The line beneath it on the bottle. */
  sub: string;
  collection: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
};

const t = {
  en: {
    label: "Rosica products",
    previous: "Previous product",
    next: "Next product",
    position: (i: number, n: number) => `Product ${i} of ${n}`,
  },
  ar: {
    label: "منتجات روزيكا",
    previous: "المنتج السابق",
    next: "المنتج التالي",
    position: (i: number, n: number) => `المنتج ${i} من ${n}`,
  },
} as const;

/**
 * How much of the viewport one card occupies, expressed as the number of card
 * slots that fit across it. Four slots shows three cards whole with a half card
 * peeking either side, which is the framing asked for.
 */
function metricsFor(viewport: number) {
  const slots = viewport < 640 ? 1.4 : viewport < 1024 ? 2.4 : 4;
  const gap = viewport < 640 ? 16 : 24;
  const step = viewport / slots;
  return { step, gap, card: step - gap };
}

/**
 * Product carousel: three cards visible with the neighbours peeking in, moved
 * by the arrow buttons or by dragging.
 *
 * The track is transformed rather than scrolled. A scroll container would give
 * native dragging for free but hands the easing to the browser, and it cannot
 * wrap — with only four products the ends would sit against empty space instead
 * of a peeking card. Here the list is repeated and the index silently
 * re-centres, so there is always a card either side and the travel never ends.
 *
 * The track stays physically left-to-right in both languages and RTL is served
 * by reversing the running order, so the first product sits on the right and
 * the carousel advances leftward. Mirroring the track with a transform instead
 * looked equivalent but inverted the drag direction and fought with RTL flex
 * layout, which pushed the cards off screen entirely.
 */
export default function ProductSlider({
  products,
  locale = "en",
}: {
  products: SliderProduct[];
  locale?: Locale;
}) {
  const copy = t[locale];
  const rtl = locale === "ar";
  const count = products.length;

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState(0);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);

  // Enough copies that a card is always in view on both sides mid-wrap.
  const REPEATS = 5;
  const ordered = useMemo(() => (rtl ? [...products].reverse() : products), [products, rtl]);
  const cards = useMemo(
    () => Array.from({ length: REPEATS }, () => ordered).flat(),
    [ordered],
  );

  /** The one copy screen readers see; the others are visual padding. */
  const exposedFrom = Math.floor(REPEATS / 2) * count;
  // Start on the first product: last in the running order once reversed.
  const start = exposedFrom + (rtl ? count - 1 : 0);
  const [index, setIndex] = useState(start);
  const indexRef = useRef(start);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const sync = () => setViewport(el.clientWidth);
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { step, gap, card } = metricsFor(viewport || 1200);
  const restFor = useCallback(
    (i: number) => (viewport - card) / 2 - i * step,
    [viewport, card, step],
  );

  // Settle on the active card whenever it — or the available width — changes.
  useEffect(() => {
    if (!viewport) return;
    const controls = animate(
      x,
      restFor(index),
      reduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 90, damping: 20, mass: 0.9 },
    );
    return () => controls.stop();
  }, [index, viewport, restFor, reduceMotion, x]);

  /**
   * Steps the carousel. When the index leaves the middle copy it is pulled back
   * by one list length and the offset is moved by the matching distance, so the
   * card under the cursor does not shift — the wrap is invisible.
   */
  const go = useCallback(
    (delta: number) => {
      let next = indexRef.current + delta;
      if (next >= start + count) {
        next -= count;
        x.set(x.get() - count * step);
      } else if (next <= start - count) {
        next += count;
        x.set(x.get() + count * step);
      }
      indexRef.current = next;
      setIndex(next);
    },
    [count, start, step, x],
  );

  /** Under RTL the running order is reversed, so advancing walks backwards. */
  const forward = rtl ? -1 : 1;

  // cards[index] is ordered[index mod count]; map that back to the product.
  const orderedIndex = ((index % count) + count) % count;
  const active = rtl ? count - 1 - orderedIndex : orderedIndex;

  return (
    <div className="relative">
      {/* aria-roledescription only counts on an element with a real role. */}
      <div
        ref={viewportRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={copy.label}
        /*
          Images and links are natively draggable, and that native drag
          swallowed the pointer before the carousel ever saw it. Cancelling it
          here — on the container, so it catches the bubbling event — hands
          dragging back to the track.
        */
        onDragStart={(event) => event.preventDefault()}
        className="overflow-hidden"
      >
        <motion.ul
          /*
            The track lays out left-to-right in both languages so the offset
            maths is identical. Under RTL a flex row stacks its children from
            the right edge, which put every card thousands of pixels off screen.
            Reading order is handled by reversing the list instead; each card
            gets the page direction back so its own text still sets correctly.
          */
          dir="ltr"
          className="flex cursor-grab items-stretch select-none active:cursor-grabbing"
          style={{ x, gap }}
          drag="x"
          dragMomentum={false}
          dragElastic={0.08}
          onDragEnd={() => {
            // Snap to whichever card ended up nearest the centre.
            const landed = Math.round(((viewport - card) / 2 - x.get()) / step);
            go(landed - indexRef.current);
          }}
        >
          {cards.map((item, i) => {
            /*
              Only one copy of the list is real; the rest are visual padding.
              They are hidden from assistive tech and taken out of the tab
              order, but deliberately not `inert` — inert also removes them from
              hit testing, which stopped a drag that began on a peeking card.
            */
            const duplicate = i < exposedFrom || i >= exposedFrom + count;
            return (
            <li
              key={`${item.name}-${i}`}
              dir={rtl ? "rtl" : "ltr"}
              style={{ width: card }}
              className="group shrink-0"
              aria-hidden={duplicate || undefined}
            >
              <article className="card-lift flex h-full flex-col overflow-hidden rounded-md border border-gold/20 bg-linen hover:border-gold/60">
                <Media
                  src={item.image}
                  alt={item.imageAlt}
                  ratio="square"
                  bordered={false}
                  placeholderTone="cream"
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 340px"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow text-gold-deep">{item.collection}</p>
                  <h3 className="mt-3 font-serif text-xl leading-snug text-green">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.sub}</p>
                  <div className="mt-auto pt-6">
                    <ArrowLink
                      href={item.href}
                      label={`${item.cta} — ${item.name}`}
                      tabIndex={duplicate ? -1 : undefined}
                    >
                      {item.cta}
                    </ArrowLink>
                  </div>
                </div>
              </article>
            </li>
            );
          })}
        </motion.ul>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {copy.position(active + 1, count)}
      </p>

      {/* In RTL the row reverses, putting "next" on the left where it belongs. */}
      <div className="mt-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-forward)}
          aria-label={copy.previous}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-green transition-colors duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold-deep"
        >
          <svg
            viewBox="0 0 12 20"
            className="h-3.5 w-2.5 rtl:-scale-x-100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 1 2 10l8 9" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(forward)}
          aria-label={copy.next}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-green transition-colors duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold-deep"
        >
          <svg
            viewBox="0 0 12 20"
            className="h-3.5 w-2.5 rtl:-scale-x-100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m2 1 8 9-8 9" />
          </svg>
        </button>
      </div>
    </div>
  );
}
