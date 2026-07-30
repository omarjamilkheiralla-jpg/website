"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ArrowLink from "./ArrowLink";
import Media from "./Media";

/**
 * Horizontal ingredient rail with the paging arrows from the approved design.
 * The arrows only appear once the track actually overflows, so the four launch
 * ingredients still read as a calm row on a wide screen while the component
 * keeps working as the Ingredient Library grows.
 */
export type Ingredient = { name: string; image: string; alt: string };

export default function IngredientCarousel({ ingredients }: { ingredients: Ingredient[] }) {
  const track = useRef<HTMLUListElement | null>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollOn, setCanScrollOn] = useState(false);

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollBack(el.scrollLeft > 4);
    setCanScrollOn(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    sync();
    el.addEventListener("scroll", sync, { passive: true });

    const observer = new ResizeObserver(sync);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [sync]);

  function page(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  const scrollable = canScrollBack || canScrollOn;

  return (
    <div className="relative">
      <ul
        ref={track}
        className="-mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {ingredients.map((ingredient) => (
          <li
            key={ingredient.name}
            className="group w-[62%] shrink-0 snap-start sm:w-[38%] lg:w-[calc((100%-4.5rem)/4)]"
          >
            <article className="card-lift flex h-full flex-col border border-gold/20 bg-cream p-4 hover:border-gold/60">
              <Media
                src={ingredient.image}
                alt={ingredient.alt}
                ratio="landscape"
                sizes="(max-width: 640px) 62vw, (max-width: 1024px) 38vw, 300px"
              />
              <h3 className="mt-5 text-center text-[0.6875rem] uppercase tracking-[0.18em] text-green">
                {ingredient.name}
              </h3>
              <div className="mt-4 flex justify-center">
                <ArrowLink href="/ingredients" label={`Explore ${ingredient.name}`}>
                  Explore
                </ArrowLink>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {scrollable ? (
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={!canScrollBack}
            aria-label="Previous ingredients"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-green transition-colors duration-300 hover:border-gold hover:text-gold disabled:opacity-30"
          >
            <svg
              viewBox="0 0 12 20"
              className="h-3 w-2"
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
            onClick={() => page(1)}
            disabled={!canScrollOn}
            aria-label="Next ingredients"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-green transition-colors duration-300 hover:border-gold hover:text-gold disabled:opacity-30"
          >
            <svg
              viewBox="0 0 12 20"
              className="h-3 w-2"
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
      ) : null}
    </div>
  );
}
