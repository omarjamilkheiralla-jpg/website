import type { Metadata } from "next";
import LegalView from "@/components/pages/LegalView";
import { policyTitles, returnsDocument } from "@/content/legal-policies";

export const metadata: Metadata = {
  title: policyTitles.returns.en.title,
  description: policyTitles.returns.en.description,
};

export default function Page() {
  return (
    <LegalView locale="en" title={policyTitles.returns.en.title} document={returnsDocument} />
  );
}
