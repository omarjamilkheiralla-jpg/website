import type { Metadata } from "next";
import ShopView from "@/components/pages/ShopView";
import { shopCopy } from "@/content/shop";

export const metadata: Metadata = {
  title: shopCopy.ar.metaTitle,
  description: shopCopy.ar.metaDescription,
};

export default function ArabicShopPage() {
  return <ShopView locale="ar" />;
}
