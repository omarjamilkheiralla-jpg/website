/**
 * The assistant's launcher: a slowly rotating wireframe sphere in gold.
 *
 * Built from real 3D transforms rather than a spinning flat graphic — a stack
 * of circles each hinged at a different angle around the Y axis, with the whole
 * cage turning inside a perspective. That is what gives the meridians their
 * changing width as they come round, which is the part that reads as a sphere
 * rather than as a spinning disc.
 *
 * Nothing here animates layout or paint: it is one transform on one element, so
 * the browser can keep it on the compositor and it costs nothing to leave
 * turning on every page. Under prefers-reduced-motion it simply stops, and the
 * cage still reads as a globe standing still.
 */

/**
 * Meridians, evenly spaced through a half turn. Six is the number that reads
 * as a sphere at 32px: with eight the rings pile into a solid gold rim as they
 * turn edge-on, and the whole thing muddies into a disc.
 */
const MERIDIANS = [0, 30, 60, 90, 120, 150];

/**
 * Latitudes, as {vertical offset, radius} in percent of the sphere. The radii
 * follow a circle's profile, so the rings sit on the surface rather than
 * floating inside it. The equator is left out — a meridian passes through it
 * every turn and the two overlap into a thick band.
 */
const LATITUDES = [
  { y: -32, r: 78 },
  { y: 32, r: 78 },
];

export default function BotanicalOrb({ className = "" }: { className?: string }) {
  return (
    <span className={`orb ${className}`} aria-hidden="true">
      <span className="orb-cage">
        {MERIDIANS.map((deg) => (
          <span
            key={`m${deg}`}
            className="orb-ring"
            style={{ transform: `rotateY(${deg}deg)` }}
          />
        ))}
        {LATITUDES.map(({ y, r }) => (
          <span
            key={`l${y}`}
            className="orb-ring orb-lat"
            style={{
              width: `${r}%`,
              height: `${r}%`,
              // Centre the smaller rings, then lift or drop them into place.
              insetInlineStart: `${(100 - r) / 2}%`,
              top: `${(100 - r) / 2}%`,
              transform: `rotateX(90deg) translateZ(${-y}%)`,
            }}
          />
        ))}
      </span>
    </span>
  );
}
