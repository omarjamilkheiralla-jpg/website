import Link from "next/link";

/**
 * Small uppercase text link with a gold arrow that slides on hover — the
 * "DISCOVER MORE →" treatment used throughout the approved designs.
 */
export default function ArrowLink({
  href,
  children,
  tone = "dark",
  /** Overrides the accessible name where the visible text repeats on a page. */
  label,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`group/arrow inline-flex items-center gap-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
        tone === "light" ? "text-linen hover:text-gold" : "text-green hover:text-gold-deep"
      } ${className}`}
    >
      {children}
      <svg
        viewBox="0 0 24 12"
        className="h-2 w-5 transition-transform duration-300 ease-out group-hover/arrow:translate-x-1 motion-reduce:group-hover/arrow:translate-x-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M0 6h22M17 1l5 5-5 5" />
      </svg>
    </Link>
  );
}
