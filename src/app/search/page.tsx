import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Rosica products and the Ingredient Library.",
};

export default function SearchPage() {
  return (
    <ComingSoon
      eyebrow="Search"
      title="Search Rosica"
      body="Search across products and the Ingredient Library is coming soon."
    />
  );
}
