import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Where to Buy",
  description:
    "Find Rosica through our official store, retail partners, and wholesale enquiries.",
};

export default function WhereToBuyPage() {
  return (
    <ComingSoon
      eyebrow="Where to Buy"
      title="Find Rosica Near You"
      body="Our official store and retail partner listings are on their way. In the meantime, explore the collections and get in touch for wholesale enquiries."
    />
  );
}
