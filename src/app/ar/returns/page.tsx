import type { Metadata } from "next";
import LegalView from "@/components/pages/LegalView";
import { policyTitles, returnsDocument } from "@/content/legal-policies";

export const metadata: Metadata = {
  title: policyTitles.returns.ar.title,
  description: policyTitles.returns.ar.description,
};

export default function Page() {
  return (
    <LegalView locale="ar" title={policyTitles.returns.ar.title} document={returnsDocument} />
  );
}
