import type { Metadata } from "next";
import IngredientsView from "@/components/pages/IngredientsView";
import { ingredientsCopy } from "@/content/ingredients";

export const metadata: Metadata = {
  title: ingredientsCopy.ar.metaTitle,
  description: ingredientsCopy.ar.metaDescription,
};

export default function ArabicIngredientsPage() {
  return <IngredientsView locale="ar" />;
}
