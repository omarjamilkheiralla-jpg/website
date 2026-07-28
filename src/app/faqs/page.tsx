import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
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
