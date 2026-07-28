import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Rosica collects, uses, and protects the personal information you share with us.",
};

export default function PrivacyPage() {
  return (
    <ComingSoon
      eyebrow="LEGAL"
      title="Privacy Policy"
      body="How Rosica collects, uses, and protects the personal information you share with us."
    />
  );
}
