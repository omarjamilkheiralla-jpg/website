import type { Metadata } from "next";
import ShopView from "@/components/pages/ShopView";
import { shopCopy } from "@/content/shop";

export const metadata: Metadata = {
  title: shopCopy.en.metaTitle,
  description: shopCopy.en.metaDescription,
};

export default function ShopPage() {
  return <ShopView locale="en" />;
}
