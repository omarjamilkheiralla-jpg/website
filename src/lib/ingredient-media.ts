import { generic, genericAlt } from "./media";
import type { IngredientSlug } from "@/content/ingredient-pages";

/**
 * The photograph for each botanical, keyed by slug.
 *
 * The Ingredient Library, the home carousel and the ingredient pages all read
 * from here, so a botanical cannot end up illustrated one way in one place and
 * another way somewhere else.
 */
export const ingredientPhoto: Record<IngredientSlug, { src: string; alt: string }> = {
  honey: { src: generic.honey, alt: genericAlt.honey },
  propolis: { src: generic.propolis, alt: genericAlt.propolis },
  "aloe-vera": { src: generic.aloeVera, alt: genericAlt.aloeVera },
  rosemary: { src: generic.rosemary, alt: genericAlt.rosemary },
};
