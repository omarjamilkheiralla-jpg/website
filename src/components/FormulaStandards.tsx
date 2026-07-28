import Section from "./Section";
import { RevealGroup, RevealItem } from "./motion/RevealGroup";

/** Gold leaf mark used on each standards badge. */
function LeafMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-7 w-7 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16 28V13" />
      <path d="M16 18c0-6 4-11 11-12.5C26.5 12 22 17 16 18Z" />
      <path d="M16 23c0-5-3.2-9-8-10 .4 5.4 3.2 9 8 10Z" />
    </svg>
  );
}

/** Badge row of formula claims, shared by the collection pages. */
export default function FormulaStandards({ standards }: { standards: string[] }) {
  return (
    <Section tone="cream" spacing="tight">
      <h2 className="sr-only">Formula standards</h2>
      <RevealGroup
        as="ul"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.09}
      >
        {standards.map((standard) => (
          <RevealItem
            as="li"
            key={standard}
            className="flex flex-col items-center gap-3 border-t border-gold/30 pt-6 text-center"
          >
            <LeafMark />
            <span className="font-serif text-lg text-green">{standard}</span>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
