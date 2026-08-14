import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IngredientView from "@/components/pages/IngredientView";
import {
  INGREDIENT_SLUGS,
  ingredientPages,
  type IngredientSlug,
} from "@/content/ingredient-pages";

type Params = { params: Promise<{ ingredient: string }> };

export function generateStaticParams() {
  return INGREDIENT_SLUGS.map((ingredient) => ({ ingredient }));
}

const isIngredient = (value: string): value is IngredientSlug =>
  (INGREDIENT_SLUGS as string[]).includes(value);

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { ingredient } = await params;
  if (!isIngredient(ingredient)) return {};
  const copy = ingredientPages.ar[ingredient];
  return { title: copy.metaTitle, description: copy.metaDescription };
}

export default async function ArabicIngredientPage({ params }: Params) {
  const { ingredient } = await params;
  if (!isIngredient(ingredient)) notFound();
  return <IngredientView locale="ar" slug={ingredient} />;
}
