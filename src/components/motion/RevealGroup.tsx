"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const child = (reduceMotion: boolean, offset: number): Variants => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : offset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reduceMotion ? 0 : 0.55, ease: [0.22, 0.61, 0.36, 1] },
  },
});

type RevealGroupProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds between each child — the brief asks for ~80–120ms. */
  stagger?: number;
  delay?: number;
};

/** Wraps a list/grid so its children reveal one after another. */
export function RevealGroup({
  children,
  as = "div",
  className = "",
  stagger = 0.1,
  delay = 0,
}: RevealGroupProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      variants={container(stagger, delay)}
    >
      {children}
    </MotionTag>
  );
}

type RevealItemProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  offset?: number;
};

/** A single staggered child. Must be rendered inside a <RevealGroup>. */
export function RevealItem({
  children,
  as = "div",
  className = "",
  offset = 24,
}: RevealItemProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag className={className} variants={child(Boolean(reduceMotion), offset)}>
      {children}
    </MotionTag>
  );
}
