import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { NO_INDEX } from "@/lib/site";

export const metadata: Metadata = {
  ...NO_INDEX,
  title: "FAQs",
  description:
    "Answers to frequently asked questions about Rosica products, ingredients, and care rituals.",
};

export default function FaqsPage() {
  return (
    <ComingSoon
      eyebrow="FAQS"
      title="Frequently Asked Questions"
      body="Answers to the questions we are asked most often about Rosica products, ingredients, and care rituals."
    />
  );
}
