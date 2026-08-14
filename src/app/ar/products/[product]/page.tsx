import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductView from "@/components/pages/ProductView";
import { PRODUCT_SLUGS, productPages, type ProductSlug } from "@/content/products";

type Params = { params: Promise<{ product: string }> };

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((product) => ({ product }));
}

const isProduct = (value: string): value is ProductSlug =>
  (PRODUCT_SLUGS as string[]).includes(value);

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { product } = await params;
  if (!isProduct(product)) return {};
  const copy = productPages.ar[product];
  return { title: copy.metaTitle, description: copy.metaDescription };
}

export default async function ArabicProductPage({ params }: Params) {
  const { product } = await params;
  if (!isProduct(product)) notFound();
  return <ProductView locale="ar" slug={product} />;
}
