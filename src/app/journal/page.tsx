import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Expert articles on botanical ingredients, everyday beauty rituals, ingredient education, and practical care guides from Rosica.",
};

export default function JournalPage() {
  return (
    <ComingSoon
      eyebrow="JOURNAL"
      title="Knowledge for Better Care"
      body="Explore expert articles covering botanical ingredients, everyday beauty rituals, ingredient education, and practical care guides designed to help you get the most from every Rosica product."
    />
  );
}
