"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import Icon, { type IconName } from "./Icon";

export type HeroFeature = { icon: IconName; label: string };

type HeroProps = {
  eyebrow?: string;
  title: string;
  body?: string | string[];
  /** Named products listed beneath the body copy. */
  bullets?: string[];
  /** Small gold icon row under the heading (Protect / Strengthen / Balance). */
  features?: HeroFeature[];
  actions?: ReactNode;
  /**
   * "split" places the copy beside full-bleed photography, as in the approved
   * designs. "panel" is the calmer, copy-only treatment for utility pages.
   */
  variant?: "split" | "panel";
  /** Gold rule with a floret under the heading — used by the collection pages. */
  ornament?: boolean;
  /** Path under /public; falls back to the botanical wash when absent. */
  image?: string;
  /** Describes the photography that belongs in the hero. */
  imageLabel?: string;
  /** object-position for the hero photo; "center bottom" keeps bottles whole. */
  imagePosition?: string;
  /** "tall" is the homepage; "short" suits the inner pages. */
  height?: "tall" | "short";
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/**
 * Stand-in for the hero photography: a warm botanical wash with a soft
 * line-drawn sprig. Swap the whole block for <Image fill /> when art lands.
 */
function HeroMedia({
  label,
  src,
  priority = false,
  position = "center",
  className = "",
}: {
  label: string;
  src?: string;
  priority?: boolean;
  position?: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (src) {
    return (
      <div className={`relative overflow-hidden bg-shell ${className}`}>
        <Image
          src={src}
          alt={label}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 52vw"
          style={{ objectPosition: position }}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden bg-[linear-gradient(145deg,#f3ece0_0%,#e6dac4_45%,#cfd3c2_78%,#a9b3a0_100%)] ${className}`}
    >
      <motion.svg
        viewBox="0 0 600 700"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full text-green/25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        aria-hidden="true"
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.4, ease: "easeOut" }}
      >
        <path d="M300 700V210" />
        <path d="M300 320c0-70 46-118 130-134-8 70-54 118-130 134Z" />
        <path d="M300 430c0-70 46-118 130-134-8 70-54 118-130 134Z" />
        <path d="M300 375c0-70-46-118-130-134 8 70 54 118 130 134Z" />
        <path d="M300 485c0-70-46-118-130-134 8 70 54 118 130 134Z" />
        <circle cx="300" cy="170" r="46" />
        <circle cx="300" cy="170" r="76" />
      </motion.svg>
    </div>
  );
}

export default function Hero({
  eyebrow,
  title,
  body,
  bullets,
  features,
  actions,
  variant = "split",
  ornament = false,
  image,
  imageLabel = "Rosica botanical product photography",
  imagePosition = "center",
  height = "short",
}: HeroProps) {
  const reduceMotion = useReducedMotion();
  const paragraphs = typeof body === "string" ? [body] : (body ?? []);

  // Gentle fade + soft scale-in on load, staggered across the hero content.
  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.99 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduceMotion ? 0 : 0.7, ease: [0.22, 0.61, 0.36, 1] },
    },
  };

  const content = (
    <motion.div initial="hidden" animate="visible" variants={container}>
      {eyebrow ? (
        <motion.p variants={item} className="eyebrow mb-6 text-gold-deep">
          {eyebrow}
        </motion.p>
      ) : null}

      <motion.h1
        variants={item}
        className={
          height === "tall"
            ? "text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[3.5rem]"
            : "text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[3.25rem]"
        }
      >
        {title}
      </motion.h1>

      {ornament ? (
        <motion.span
          variants={item}
          aria-hidden="true"
          className="ornament-rule mt-7 max-w-sm"
        >
          <Icon name="sparkle" className="h-3.5 w-3.5" />
        </motion.span>
      ) : null}

      {paragraphs.length > 0 ? (
        <motion.div
          variants={item}
          className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-ink-muted"
        >
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </motion.div>
      ) : null}

      {bullets && bullets.length > 0 ? (
        <motion.ul variants={item} className="mt-6 space-y-2.5 border-l border-gold/50 pl-5">
          {bullets.map((bullet) => (
            <li key={bullet} className="font-serif text-lg text-green">
              {bullet}
            </li>
          ))}
        </motion.ul>
      ) : null}

      {features && features.length > 0 ? (
        <motion.ul variants={item} className="mt-9 flex flex-wrap items-start gap-x-8 gap-y-6">
          {features.map((feature) => (
            <li
              key={feature.label}
              className="flex min-w-[4.5rem] flex-col items-center gap-2.5 text-center"
            >
              <span className="text-gold">
                <Icon name={feature.icon} className="h-7 w-7" />
              </span>
              <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
                {feature.label}
              </span>
            </li>
          ))}
        </motion.ul>
      ) : null}

      {actions ? (
        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          {actions}
        </motion.div>
      ) : null}
    </motion.div>
  );

  if (variant === "panel") {
    return (
      <section className="relative overflow-hidden bg-linen">
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-36 sm:px-8 sm:pb-28 sm:pt-44">
          <div className="max-w-3xl">{content}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden bg-shell">
      {/* Product photography when supplied; botanical wash until then. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block">
        <HeroMedia
          label={imageLabel}
          src={image}
          priority
          position={imagePosition}
          className="h-full w-full"
        />
        {/* Soft wash so the copy column blends into the photography. */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-40 bg-[linear-gradient(90deg,var(--color-shell)_0%,transparent_100%)]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <div
            className={
              height === "tall"
                ? "pb-16 pt-32 sm:pt-40 lg:flex lg:min-h-[42rem] lg:flex-col lg:justify-center lg:py-28"
                : "pb-16 pt-32 sm:pt-40 lg:flex lg:min-h-[34rem] lg:flex-col lg:justify-center lg:py-24"
            }
          >
            {content}
          </div>
        </div>
      </div>

      {/* Stacked media for narrow screens. */}
      <HeroMedia
        label={imageLabel}
        src={image}
        position={imagePosition}
        className="aspect-[4/3] w-full lg:hidden"
      />
    </section>
  );
}
