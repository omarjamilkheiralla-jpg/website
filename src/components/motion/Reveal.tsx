"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before this element animates in. */
  delay?: number;
  as?: ElementType;
  className?: string;
  /** Distance in px the element travels upward as it fades in. */
  offset?: number;
  /** Anchor target, so in-page links can point at a revealed block. */
  id?: string;
};

/**
 * Scroll-triggered fade + slight upward slide.
 * Motion collapses to a plain fade-free render when the visitor has asked for
 * reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
  offset = 24,
  id,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : offset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 0.61, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -80px 0px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
