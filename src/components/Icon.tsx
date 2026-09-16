/**
 * Fine gold line icons used across the value strips, benefit rows and formula
 * standards, matching the hand-drawn botanical marks in the approved designs.
 *
 * All paths are drawn on a 32x32 grid with a 1.1 stroke so they stay delicate
 * at the small sizes the layouts call for.
 */

export type IconName =
  | "leaf"
  | "flask"
  | "mortar"
  | "globe"
  | "droplet"
  | "shield"
  | "scales"
  | "waves"
  | "molecule"
  | "sparkle"
  | "lotus"
  | "hair"
  | "honey"
  | "seedling"
  | "beaker"
  | "certificate"
  | "envelope"
  | "pin"
  | "clock"
  | "calendar"
  | "uaeMap"
  | "rosette"
  | "registered";

const paths: Record<IconName, string[]> = {
  /*
    The three provenance marks.

    uaeMap is a simplified outline of the country, not a survey: the Musandam
    exclave and the smaller coastal indentations are left out, because at 28px
    they close up into noise. It is drawn to read as "the UAE" at a glance and
    nothing more, and it is deliberately not a flag — a flag in a line-icon row
    would be the only full-colour thing on the page.
  */
  /*
    Plotted from the country's real extent — roughly 51.5°E–56.4°E and
    22.6°N–26.1°N — rather than drawn by eye, so the proportions are right:
    the Gulf coast running up from Ghuwaifat through Abu Dhabi and Dubai to
    the northern tip, the short east coast at Fujairah, and the long, near
    straight Saudi border closing it along the south.
  */
  uaeMap: [
    "M3.5 19.1 7.7 25.6 22.3 25.6 23.7 22.7 23.3 21.6 24 20.2 23.7 18.7 24.8 17.6 24.4 16.2 25.9 15.1 27 14 26.6 12.2 27.4 10.7 26.3 6.4 23.7 8.9 21.5 11.5 19.4 13.6 16.4 15.8 13.6 17.6 10.7 18.7 9.6 18.4 8.9 19.1 6.4 18.9 5.3 19.4Z",
  ],
  rosette: [
    /* Scalloped seal: twelve lobes, drawn as a closed path of arcs. */
    "M16 4.2a2.6 2.6 0 0 1 3.7-.5 2.6 2.6 0 0 0 2 .5 2.6 2.6 0 0 1 3.1 2.1 2.6 2.6 0 0 0 1.2 1.7 2.6 2.6 0 0 1 1.2 3.6 2.6 2.6 0 0 0 0 2.1 2.6 2.6 0 0 1-1.2 3.6 2.6 2.6 0 0 0-1.2 1.7 2.6 2.6 0 0 1-3.1 2.1 2.6 2.6 0 0 0-2 .5 2.6 2.6 0 0 1-3.7-.5 2.6 2.6 0 0 0-1.4 0 2.6 2.6 0 0 1-3.7.5 2.6 2.6 0 0 0-2-.5 2.6 2.6 0 0 1-3.1-2.1 2.6 2.6 0 0 0-1.2-1.7 2.6 2.6 0 0 1-1.2-3.6 2.6 2.6 0 0 0 0-2.1 2.6 2.6 0 0 1 1.2-3.6 2.6 2.6 0 0 0 1.2-1.7 2.6 2.6 0 0 1 3.1-2.1 2.6 2.6 0 0 0 2-.5A2.6 2.6 0 0 1 16 4.2Z",
    "M12.6 12.4l2.4 2.4 4.4-4.6",
  ],
  registered: [
    "M7 3.5h13l5 5v15.5a1.5 1.5 0 0 1-1.5 1.5H7a1.5 1.5 0 0 1-1.5-1.5V5A1.5 1.5 0 0 1 7 3.5Z",
    "M19.5 3.8V9h5.2",
    "M9.5 12h8",
    "M9.5 16h5",
    "M20.5 19a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z",
    "M18.4 24.8 17.6 29l2.9-1.4 2.9 1.4-.8-4.2",
  ],
  envelope: ["M4 8h24v16H4z", "M4 9.5 16 18 28 9.5"],
  pin: ["M16 29c6-7.2 9-12.1 9-16a9 9 0 1 0-18 0c0 3.9 3 8.8 9 16Z", "M16 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"],
  clock: ["M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24Z", "M16 9v7.5l5 3"],
  calendar: ["M5 8h22v20H5z", "M5 14h22", "M11 4v6", "M21 4v6"],
  leaf: ["M16 28V13", "M16 18c0-6 4-11 11-12.5C26.5 12 22 17 16 18Z", "M16 23c0-5-3.2-9-8-10 .4 5.4 3.2 9 8 10Z"],
  flask: [
    "M13 4h6",
    "M14 4v8.5L8.5 24a2.5 2.5 0 0 0 2.2 3.6h10.6A2.5 2.5 0 0 0 23.5 24L18 12.5V4",
    "M11 20h10",
  ],
  mortar: [
    "M7 13h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9Z",
    "M16 22v5",
    "M11 27h10",
    "M20 4c-3.5 1.4-5 4.2-5 9",
  ],
  globe: ["M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24Z", "M4 16h24", "M16 4c3.4 3.6 3.4 20.4 0 24", "M16 4c-3.4 3.6-3.4 20.4 0 24"],
  droplet: ["M16 4c5 6.4 8 10.6 8 14a8 8 0 0 1-16 0c0-3.4 3-7.6 8-14Z", "M12.5 19a3.6 3.6 0 0 0 3.5 3.4"],
  shield: ["M16 4l10 3.5v8c0 6.4-4.2 10.9-10 12.5-5.8-1.6-10-6.1-10-12.5v-8L16 4Z", "M11.5 15.5l3.2 3.2 6-6.2"],
  scales: ["M16 6v20", "M9 26h14", "M6 11h20", "M6 11 3 19a3.6 3.6 0 0 0 6 0Z", "M26 11l3 8a3.6 3.6 0 0 1-6 0Z"],
  waves: ["M4 11c3-2.4 5-2.4 8 0s5 2.4 8 0 5-2.4 8 0", "M4 18c3-2.4 5-2.4 8 0s5 2.4 8 0 5-2.4 8 0", "M4 25c3-2.4 5-2.4 8 0s5 2.4 8 0 5-2.4 8 0"],
  molecule: [
    "M16 13a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
    "M7 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
    "M25 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
    "M16 24a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
    "m9.4 9.6 4.4 3.6M22.6 9.6l-4.4 3.6M16 19v5",
  ],
  sparkle: ["M16 4l2.6 8.4L27 15l-8.4 2.6L16 26l-2.6-8.4L5 15l8.4-2.6L16 4Z", "M25.5 22.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z"],
  lotus: [
    "M16 26c-6 0-10-3.6-11-8 3-1.2 5.6-.6 7.6 1",
    "M16 26c6 0 10-3.6 11-8-3-1.2-5.6-.6-7.6 1",
    "M16 26c-3.4-3-4.6-6.6-3.6-10.4C13.6 11.4 15 8.4 16 6c1 2.4 2.4 5.4 3.6 9.6C20.6 19.4 19.4 23 16 26Z",
  ],
  hair: ["M6 27c-1.4-6.6-.8-12 1.8-16.2C10.4 6.6 13.4 4.6 17 4c5.6-.9 9 2.4 9 7.4 0 4-2 7-6 9", "M20 27c1.4-4.6.4-8-3-10.2"],
  honey: [
    "M16 4l8 4.6v9.2L16 22.4 8 17.8V8.6L16 4Z",
    "M16 12.2l3.4 2v4l-3.4 2-3.4-2v-4l3.4-2Z",
    "M16 22.4V28",
  ],
  seedling: ["M16 28V14", "M16 16c0-5 3.6-8.6 9-9-.4 5.4-4 9-9 9Z", "M16 21c0-4.4-3-7.6-8-8 .4 4.8 3.6 8 8 8Z", "M11 28h10"],
  beaker: ["M7 6h18", "M10 6v7.5L6.5 25a2.4 2.4 0 0 0 2.3 3h14.4a2.4 2.4 0 0 0 2.3-3L22 13.5V6", "M13 17.5h6", "M15 22h3"],
  certificate: [
    "M16 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z",
    "M13 12.2l2.2 2.2 4-4.2",
    "M11.4 19.4 9 29l7-3.2L23 29l-2.4-9.6",
  ],
};

type IconProps = {
  name: IconName;
  /** Tailwind sizing classes; defaults to the 40px mark used in the strips. */
  className?: string;
};

export default function Icon({ name, className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
