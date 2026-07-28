import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Rosica with questions about our premium natural beauty products, collections, or partnerships.",
};

export default function ContactPage() {
  return (
    <ComingSoon
      eyebrow="CONTACT"
      title="Get in Touch"
      body="We would be glad to hear from you. Reach out with questions about Rosica products, collections, or partnerships."
    />
  );
}
