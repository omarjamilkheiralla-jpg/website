import Image from "next/image";
import ImagePlaceholder from "./ImagePlaceholder";

const ratios = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  tall: "aspect-[2/3]",
} as const;

type MediaProps = {
  /**
   * Path under /public. Leave undefined for slots still waiting on
   * photography — the component falls back to the botanical placeholder, so
   * dropping a real photo in later is a one-line change.
   */
  src?: string;
  /** Always required: real alt text when there is a photo, description when there is not. */
  alt: string;
  ratio?: keyof typeof ratios;
  /** Drops the intrinsic ratio so the image fills its grid cell instead. */
  fill?: boolean;
  /** Sizes hint for next/image; keep it roughly honest to avoid overfetching. */
  sizes?: string;
  /** Subtle zoom when an ancestor marked `group` is hovered. */
  zoom?: boolean;
  rounded?: boolean;
  bordered?: boolean;
  /** Renders above the fold — skips lazy loading. */
  priority?: boolean;
  /** Nudges the crop for portraits and off-centre subjects. */
  position?: string;
  className?: string;
  placeholderTone?: "linen" | "cream" | "shell" | "green";
};

/**
 * Single entry point for imagery. Real photos render through next/image with
 * the same framing, hover zoom and border treatment the placeholders used, so
 * the two can sit side by side while product photography is outstanding.
 */
export default function Media({
  src,
  alt,
  ratio = "landscape",
  fill = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  zoom = true,
  rounded = false,
  bordered = true,
  priority = false,
  position = "center",
  className = "",
  placeholderTone = "linen",
}: MediaProps) {
  if (!src) {
    return (
      <ImagePlaceholder
        label={alt}
        ratio={ratio === "tall" ? "portrait" : ratio}
        fill={fill}
        tone={placeholderTone}
        rounded={rounded}
        bordered={bordered}
        zoom={zoom}
        className={className}
      />
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${bordered ? "border border-gold/25" : ""} ${
        fill ? "h-full" : ratios[ratio]
      } ${rounded ? "rounded-md" : ""} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={90}
        style={{ objectPosition: position }}
        className={`object-cover transition-transform duration-500 ease-out ${
          zoom ? "group-hover:scale-105 motion-reduce:group-hover:scale-100" : ""
        }`}
      />
    </div>
  );
}
