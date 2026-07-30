import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Rosica products, ingredients, and journal articles.",
};

export default function SearchPage() {
  return (
    <ComingSoon
      eyebrow="Search"
      title="Search Rosica"
      body="Search across products, the Ingredient Library, and the Journal is coming soon."
    />
  );
}
