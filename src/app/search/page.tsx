import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { NO_INDEX } from "@/lib/site";

export const metadata: Metadata = {
  ...NO_INDEX,
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
