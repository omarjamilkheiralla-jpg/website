import type { ElementType, ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  /** Each string renders as its own paragraph, preserving the copy's rhythm. */
  body?: string | string[];
  align?: "left" | "center";
  as?: ElementType;
  /** "light" inverts the colours for use on dark bands. */
  tone?: "dark" | "light";
  children?: ReactNode;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  as: Heading = "h2",
  tone = "dark",
  children,
  className = "",
}: SectionHeadingProps) {
  const paragraphs = typeof body === "string" ? [body] : (body ?? []);
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignment} max-w-3xl ${className}`}>
      {eyebrow ? (
        <p className={`eyebrow mb-5 ${tone === "light" ? "text-gold-soft" : "text-gold-deep"}`}>
          {eyebrow}
        </p>
      ) : null}

      <Heading
        className={`text-3xl sm:text-4xl lg:text-[2.75rem] ${
          tone === "light" ? "text-cream" : "text-green"
        }`}
      >
        {title}
      </Heading>

      {paragraphs.length > 0 ? (
        <div
          className={`mt-6 space-y-4 text-base leading-relaxed ${
            tone === "light" ? "text-linen/85" : "text-ink-muted"
          }`}
        >
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}

      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  );
}
