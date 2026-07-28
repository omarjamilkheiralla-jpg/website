import type { ReactNode } from "react";

type Tone = "cream" | "linen" | "ink" | "green";

const tones: Record<Tone, string> = {
  cream: "bg-cream",
  linen: "bg-linen",
  ink: "bg-ink",
  green: "bg-green",
};

type SectionProps = {
  children: ReactNode;
  tone?: Tone;
  /** Generous by default — the brand asks for a calm, editorial rhythm. */
  spacing?: "default" | "loose" | "tight";
  id?: string;
  className?: string;
  /** Renders a hairline gold rule at the top of the section. */
  divider?: boolean;
};

const spacings = {
  tight: "py-16 sm:py-20",
  default: "py-20 sm:py-24 lg:py-28",
  loose: "py-24 sm:py-32 lg:py-40",
};

export default function Section({
  children,
  tone = "cream",
  spacing = "default",
  id,
  className = "",
  divider = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${tones[tone]} ${spacings[spacing]} ${
        divider ? "border-t border-gold/25" : ""
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">{children}</div>
    </section>
  );
}
