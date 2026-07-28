import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "gold";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-wide transition-[background-color,color,border-color,transform] duration-300 ease-out hover:scale-[1.03] motion-reduce:hover:scale-100";

const variants: Record<Variant, string> = {
  // Botanical Green fill, gold on hover.
  primary: "bg-green text-cream hover:bg-gold hover:text-ink",
  // Outlined, for the lower-priority action beside a primary CTA.
  secondary:
    "border border-green/40 text-green hover:border-gold hover:text-ink hover:bg-gold/15",
  // For use on the dark (Botanical Black / Green) bands.
  light: "bg-cream text-ink hover:bg-gold hover:text-ink",
  gold: "bg-gold text-ink hover:bg-green hover:text-cream",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3.5 text-sm",
};

type CTAButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

export default function CTAButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  ...buttonProps
}: CTAButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
