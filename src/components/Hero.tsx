"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type HeroProps = {
  eyebrow?: string;
  title: string;
  body?: string | string[];
  /** Named products listed beneath the body copy. */
  bullets?: string[];
  actions?: ReactNode;
  /**
   * "full-bleed" places the copy on a Cream/Linen panel over a full-width
   * background image area. "panel" is the calmer inner-page treatment.
   */
  variant?: "full-bleed" | "panel";
  /** Describes the photography that belongs behind the hero. */
  imageLabel?: string;
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export default function Hero({
  eyebrow,
  title,
  body,
  bullets,
  actions,
  variant = "full-bleed",
  imageLabel = "Botanical still life photography",
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
          variant === "panel"
            ? "text-4xl leading-[1.1] sm:text-5xl lg:text-6xl"
            : "text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem]"
        }
      >
        {title}
      </motion.h1>

      {paragraphs.length > 0 ? (
        <motion.div
          variants={item}
          className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted sm:text-[1.0625rem]"
        >
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </motion.div>
      ) : null}

      {bullets && bullets.length > 0 ? (
        <motion.ul variants={item} className="mt-6 space-y-3 border-l border-gold/50 pl-5">
          {bullets.map((bullet) => (
            <li key={bullet} className="font-serif text-lg text-green sm:text-xl">
              {bullet}
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
        {/* TODO: replace with real hero photography */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(250deg,#c8cfbf_0%,#e3d9c6_55%,transparent_100%)] opacity-70 lg:block"
        />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-36 sm:px-8 sm:pb-28 sm:pt-44 lg:pb-36">
          <div className="max-w-3xl">{content}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden bg-linen">
      {/* TODO: replace with real hero photography (botanical / nature imagery) */}
      <div
        aria-hidden="true"
        title={imageLabel}
        className="absolute inset-0 -z-10 bg-[linear-gradient(150deg,#efe3d0_0%,#e3d9c6_38%,#c8cfbf_72%,#3f5a44_100%)]"
      >
        <motion.svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full opacity-20"
          fill="none"
          stroke="#3f5a44"
          strokeWidth="1"
          aria-hidden="true"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.06 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.6, ease: "easeOut" }}
        >
          <path d="M-40 520C120 470 200 380 240 240s10-220 10-220" />
          <path d="M120 620C260 560 340 470 400 320s60-260 60-260" />
          <path d="M320 660C470 590 560 480 620 330s80-300 80-300" />
          <circle cx="640" cy="140" r="90" />
          <circle cx="640" cy="140" r="140" />
        </motion.svg>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-48 lg:pb-40 lg:pt-52">
        <div className="max-w-2xl rounded-sm border border-gold/30 bg-cream/92 p-8 shadow-[0_30px_80px_-60px_rgba(30,30,26,0.6)] backdrop-blur-sm sm:p-12 lg:p-14">
          {content}
        </div>
      </div>
    </section>
  );
}
