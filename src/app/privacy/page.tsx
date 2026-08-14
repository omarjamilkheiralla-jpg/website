import type { Metadata } from "next";
import LegalView from "@/components/pages/LegalView";
import { legalTitles, privacyDocument } from "@/content/legal";

export const metadata: Metadata = {
  title: legalTitles.privacy.en.title,
  description: legalTitles.privacy.en.description,
};

export default function PrivacyPage() {
  return (
    <LegalView locale="en" title={legalTitles.privacy.en.title} document={privacyDocument} />
  );
}
