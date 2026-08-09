"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
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

/** Furthest a card is pushed before its depth effects stop deepening. */
const FALLOFF = 2.2;
const clampAbs = (n: number, limit: number) => Math.max(-limit, Math.min(limit, n));

/**
 * One card, turned in 3D by how far it sits from the centre of the frame.
 *
 * The maths has to run per card, and hooks cannot be called inside a loop, so
 * each card owns its own derived motion values. They read straight off the
 * track offset, which means the turn tracks a drag continuously rather than
 * stepping between fixed states.
 */
function SliderCard({
  x,
  index,
  step,
  card,
  viewport,
  flat,
  dir,
  hidden,
  item,
}: {
  x: MotionValue<number>;
  index: number;
  step: number;
  card: number;
  viewport: number;
  /** Skips the depth effects for reduced-motion users. */
  flat: boolean;
  dir: "ltr" | "rtl";
  hidden: boolean;
  item: SliderProduct;
}) {
  // Distance from the centre of the frame, measured in whole cards.
  const distance = useTransform(x, (offset) => {
    if (!viewport) return 0;
    const centre = index * step + card / 2 + offset;
    return (centre - viewport / 2) / step;
  });

  /*
    Each card hinges on the edge nearest the centre and swings its outer edge
    away, so the row curves back like the face of a drum. Because the two
    hinges are mirror images, the same positive rotation sends the outer edge
    backwards on both sides — following the sign of the distance instead tipped
    one side towards the viewer, and those cards bloated over their neighbours.
    The origin slides through the centre rather than flipping, so nothing snaps
    as a card crosses.
  */
  const rotateY = useTransform(distance, (d) => (flat ? 0 : Math.min(Math.abs(d) * 19, 36)));
  const originX = useTransform(distance, (d) => (flat ? 0.5 : 0.5 - clampAbs(d, 1) * 0.5));
  /*
    No opacity falloff. Fading the outer cards looked right but took their text
    under the contrast floor — at the far end it measured about 2.9:1 against
    the page. The turn and the depth already read as distance, so the cards stay
    fully opaque.

    Depth alone shrinks the outer cards — the perspective on the track does the
    work, so there is no separate scale. Stacking one on top would compound into
    a shrink far steeper than the turn, and the cards would read as small rather
    than as far away.
  */
  const z = useTransform(distance, (d) => (flat ? 0 : -Math.min(Math.abs(d), FALLOFF) * 45));
  /*
    Only the photograph in focus is sharp; the rest soften as they turn away,
    which is what the distortion at the edges needed.

    The filter wraps the image alone rather than the whole card. It keeps the
    names legible, and it is a third less area to repaint. It also cannot go on
    the list item itself — a filter flattens that element's 3D rendering, and
    the turn would collapse back into a squash.
  */
  const blur = useTransform(distance, (d) => {
    const spread = Math.abs(d);
    // Off-frame cards get no filter at all: nothing there is visible, and a
    // blur is one of the more expensive things to composite.
    if (flat || spread > FALLOFF + 0.4) return "none";
    /*
      Quantised to half a pixel. A filter that changes every frame forces a
      repaint every frame on every card in view; in steps it repaints a handful
      of times per move instead, which is the difference between dropping
      frames and not. Half a pixel is far below what the eye resolves in a
      blur.
    */
    const px = Math.round(Math.min(spread, FALLOFF) * 6) / 2;
    return px < 0.25 ? "none" : `blur(${px}px)`;
  });
  /*
    Padding copies that are nowhere near the frame stop being painted. Under
    preserve-3d the browser keeps every child of the track alive as part of the
    same 3D scene, so being clipped is not enough to make them free — with all
    of them live the track dropped frames.

    Only the duplicates are culled. `visibility: hidden` also removes content
    from the accessibility tree, which would be wrong for the one real copy;
    those four stay painted wherever they are.
  */
  const visibility = useTransform(distance, (d) =>
    hidden && Math.abs(d) > FALLOFF + 0.6 ? "hidden" : "visible",
  );

  /*
    The turn lives on the list item itself. CSS perspective only reaches an
    element's *direct* children, so putting it on a wrapper inside the item left
    the rotation flat — an orthographic squash rather than a card turning away.
  */
  return (
    <motion.li
      dir={dir}
      aria-hidden={hidden || undefined}
      className="group shrink-0"
      style={{ width: card, rotateY, originX, z, visibility }}
    >
      <article className="card-lift flex h-full flex-col overflow-hidden rounded-md border border-gold/20 bg-linen hover:border-gold/60">
        <motion.div style={{ filter: blur }}>
          <Media
            src={item.image}
            alt={item.imageAlt}
            ratio="square"
            bordered={false}
            placeholderTone="cream"
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 340px"
          />
        </motion.div>
        <div className="flex flex-1 flex-col p-6">
          <p className="eyebrow text-gold-deep">{item.collection}</p>
          <h3 className="mt-3 font-serif text-xl leading-snug text-green">{item.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.sub}</p>
          <div className="mt-auto pt-6">
            <ArrowLink
              href={item.href}
              label={`${item.cta} — ${item.name}`}
              tabIndex={hidden ? -1 : undefined}
            >
              {item.cta}
            </ArrowLink>
          </div>
        </div>
      </article>
    </motion.li>
  );
}

/**
 * Product carousel: three cards visible with the neighbours turning away into
 * the distance either side, moved by the arrow buttons or by dragging.
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

  /*
    Five copies. The index roams one whole list either side of its home before
    wrapping, and two more cards past that fill the peeks, so the strip has to
    reach start ± (count + 2) without running out — three copies leaves a hole
    at the far edge, and four does under RTL, where home sits off-centre.
  */
  const REPEATS = 5;
  const ordered = useMemo(() => (rtl ? [...products].reverse() : products), [products, rtl]);
  const cards = useMemo(() => Array.from({ length: REPEATS }, () => ordered).flat(), [ordered]);

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

  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  /** Runs the track to the resting place of a given card. */
  const settle = useCallback(
    (i: number, immediate = false) => {
      if (!viewport) return;
      /*
        No explicit stop: `animate` already replaces any run in flight, and
        stopping first was leaving the offset a frame out of step — the source
        of the snap that survived the earlier fixes.
      */
      animationRef.current = animate(
        x,
        restFor(i),
        immediate || reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 90, damping: 20, mass: 0.9 },
      );
    },
    [viewport, restFor, reduceMotion, x],
  );

  // Reposition without animating when the available width changes.
  useEffect(() => {
    settle(indexRef.current, true);
    return () => animationRef.current?.stop();
  }, [settle]);

  /**
   * Steps the carousel.
   *
   * Once the index walks past the middle copy it is pulled back by one list
   * length. Renumbering alone would send the track flying back to where that
   * index used to sit, so the offset is moved by exactly the same distance in
   * the same direction — leaving the cards where they are on screen while the
   * numbering quietly resets underneath them.
   *
   * It has to be `jump`, not `set`. `set` records the teleport as a real
   * movement, so the spring that follows inherits a velocity of tens of
   * thousands of pixels per second and hurls the track several screens away
   * before hauling it back — which is exactly the rewind this was meant to
   * avoid. `jump` moves the value without writing history.
   *
   * The teleport and the new animation are issued in the same synchronous
   * block, so no frame can tick between them and nothing can overwrite the
   * re-centre.
   *
   * The bounds are loops rather than single checks so a hard fling, which can
   * land many cards away in one go, is folded back just the same.
   */
  const go = useCallback(
    (delta: number) => {
      let next = indexRef.current + delta;
      while (next >= start + count) {
        next -= count;
        x.jump(x.get() + count * step);
      }
      while (next <= start - count) {
        next += count;
        x.jump(x.get() - count * step);
      }
      indexRef.current = next;
      setIndex(next);
      settle(next);
    },
    [count, start, step, x, settle],
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

            The perspective here is what gives the cards their depth; without it
            the rotation on each one would read as a flat horizontal squash.
          */
          dir="ltr"
          className="flex cursor-grab items-stretch select-none active:cursor-grabbing"
          style={{
            x,
            gap,
            perspective: 2000,
            transformStyle: "preserve-3d",
          }}
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
              <SliderCard
                key={`${item.name}-${i}`}
                x={x}
                index={i}
                step={step}
                card={card}
                viewport={viewport}
                flat={Boolean(reduceMotion)}
                dir={rtl ? "rtl" : "ltr"}
                hidden={duplicate}
                item={item}
              />
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
