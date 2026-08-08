type ImagePlaceholderProps = {
  /** Describes the photography that belongs here; also used as the a11y label. */
  label: string;
  ratio?: "square" | "portrait" | "landscape" | "wide";
  tone?: "linen" | "cream" | "shell" | "green";
  rounded?: boolean;
  /** Off for tiles that sit flush inside an already-ruled band. */
  bordered?: boolean;
  /** Drops the intrinsic aspect ratio so the tile can fill its grid cell. */
  fill?: boolean;
  /** Subtle zoom when an ancestor marked `group` is hovered. */
  zoom?: boolean;
  className?: string;
};

const ratios = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

const tones = {
  linen: "bg-linen text-green/45",
  cream: "bg-cream text-green/40",
  shell: "bg-shell text-green/40",
  green: "bg-green/90 text-cream/50",
};

/**
 * Soft botanical-toned stand-in for real photography.
 * The wrapper carries the accessible name; swap for <Image /> with real alt
 * text when art is ready.
 */
export default function ImagePlaceholder({
  label,
  ratio = "landscape",
  tone = "linen",
  rounded = true,
  bordered = true,
  fill = false,
  zoom = true,
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      title={label}
      className={`relative w-full overflow-hidden ${bordered ? "border border-gold/25" : ""} ${
        fill ? "" : ratios[ratio]
      } ${rounded ? "rounded-md" : ""} ${className}`}
    >
      <div
        className={`flex h-full w-full items-center justify-center transition-transform duration-500 ease-out ${
          tones[tone]
        } ${zoom ? "group-hover:scale-105 motion-reduce:group-hover:scale-100" : ""}`}
      >
        <svg
          viewBox="0 0 120 120"
          className="h-16 w-16 opacity-70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M60 104V44" />
          <path d="M60 60c0-16 10-30 26-34-1 17-10 30-26 34Z" />
          <path d="M60 82c0-13-8-24-21-27 1 14 8 24 21 27Z" />
        </svg>
      </div>
    </div>
  );
}
