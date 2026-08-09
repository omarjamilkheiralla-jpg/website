import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "gold";
type Size = "sm" | "md";

/**
 * Squared, uppercase and letterspaced — the button treatment in the approved
 * designs. Deliberately not a pill.
 */
const base =
  "inline-flex items-center justify-center gap-2.5 rounded-md font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-[background-color,color,border-color,opacity] duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Botanical Green fill — the primary action.
  primary: "bg-green text-cream hover:bg-green-deep",
  // Hairline outline on the page ground, for the action beside a primary.
  secondary: "border border-ink/40 text-ink hover:border-green hover:text-green",
  // For use on the dark bands.
  light: "bg-cream text-ink hover:bg-gold hover:text-ink",
  gold: "bg-gold text-ink hover:bg-green hover:text-cream",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5",
  md: "px-7 py-3.5",
};

function Arrow() {
  return (
    /* Flipping the wrapper rather than the glyph keeps the hover nudge
       travelling in the reading direction under RTL. */
    <span className="inline-flex shrink-0 rtl:-scale-x-100">
      <svg
        viewBox="0 0 24 12"
        className="h-2 w-5 transition-transform duration-300 ease-out group-hover/cta:translate-x-1 motion-reduce:group-hover/cta:translate-x-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M0 6h22M17 1l5 5-5 5" />
      </svg>
    </span>
  );
}

type CTAButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  /** Primary actions carry an arrow in the designs; others do not. */
  arrow?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

export default function CTAButton({
  children,
  href,
  variant = "primary",
  size = "md",
  arrow,
  className = "",
  ...buttonProps
}: CTAButtonProps) {
  const showArrow = arrow ?? variant !== "secondary";
  const classes = `group/cta ${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow ? <Arrow /> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
