import type { Metadata } from "next";
import LegalView from "@/components/pages/LegalView";
import { legalTitles, termsDocument } from "@/content/legal";

export const metadata: Metadata = {
  title: legalTitles.terms.ar.title,
  description: legalTitles.terms.ar.description,
};

export default function ArabicTermsPage() {
  return (
    <LegalView locale="ar" title={legalTitles.terms.ar.title} document={termsDocument} />
  );
}
