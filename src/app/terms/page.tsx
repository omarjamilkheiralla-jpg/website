import type { Metadata } from "next";
import LegalView from "@/components/pages/LegalView";
import { legalTitles, termsDocument } from "@/content/legal";

export const metadata: Metadata = {
  title: legalTitles.terms.en.title,
  description: legalTitles.terms.en.description,
};

export default function TermsPage() {
  return (
    <LegalView locale="en" title={legalTitles.terms.en.title} document={termsDocument} />
  );
}
