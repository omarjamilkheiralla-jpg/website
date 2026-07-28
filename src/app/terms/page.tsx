import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that apply when you use the Rosica website and services.",
};

export default function TermsPage() {
  return (
    <ComingSoon
      eyebrow="LEGAL"
      title="Terms & Conditions"
      body="The terms that apply when you use the Rosica website and services."
    />
  );
}
