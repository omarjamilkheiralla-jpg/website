/**
 * Image catalogue.
 *
 * `generic` entries are licensed stock photography (Pexels licence: free for
 * commercial use, no attribution required) standing in for the botanical,
 * laboratory and editorial imagery in the approved designs.
 *
 * `product` entries are deliberately `undefined`. Rosica product photography is
 * brand-owned and cannot be substituted, so every product slot renders the
 * botanical placeholder until the real shots are supplied. Fill a value in here
 * and it appears everywhere that slot is used — no component changes needed.
 */

export const generic = {
  honey: "/images/ingredient-honey.jpg",
  propolis: "/images/ingredient-propolis.jpg",
  aloeVera: "/images/ingredient-aloe-vera.jpg",
  rosemary: "/images/ingredient-rosemary.jpg",
  chamomile: "/images/botanical-chamomile.jpg",
  leaves: "/images/botanical-leaves.jpg",
  foliage: "/images/botanical-foliage.jpg",
  labGlassware: "/images/lab-glassware.jpg",
  labFlowerTube: "/images/lab-flower-tube.jpg",
  labTestTubes: "/images/lab-test-tubes.jpg",
  hairTexture: "/images/hair-texture.jpg",
  manufacturing: "/images/manufacturing.jpg",
  journal: "/images/journal-editorial.jpg",
} as const;

/** Alt text for the stock imagery, kept beside the paths so it stays in sync. */
export const genericAlt = {
  honey: "Honeycomb filled with honey on a warm wooden surface",
  propolis: "Bees working across a golden honeycomb",
  aloeVera: "Fresh aloe vera plant with thick, thorned leaves",
  rosemary: "Close-up of fresh green rosemary sprigs",
  chamomile: "Chamomile flowers in bloom",
  leaves: "Fresh green leaves arranged on a pale surface",
  foliage: "Soft green botanical foliage",
  labGlassware: "Botanical stems in laboratory glassware in soft daylight",
  labFlowerTube: "A single flower suspended in a glass test tube",
  labTestTubes: "Laboratory test tubes holding botanical cuttings",
  hairTexture: "Close-up of long, healthy brown hair",
  manufacturing: "Laboratory glassware and equipment in a clean facility",
  journal: "An open book beside a jar of flowers in warm daylight",
} as const;

/**
 * Rosica product photography — supply these and the whole site picks them up.
 *
 * TODO: replace each `undefined` with a path under /public/images once the
 * brand product shots are available.
 */
export const product: Record<string, string | undefined> = {
  /** All four bottles together — homepage, About and Collections heroes. */
  rangeGroup: undefined,
  /** The three Essentials bottles together. */
  essentialsGroup: undefined,
  /** Botanical Restore Shampoo on its own. */
  pureBottle: undefined,
  honeyPropolisRepairShampoo: undefined,
  purifyingFreshCleanseShampoo: undefined,
  deepRepairConditioner: undefined,
  botanicalRestoreShampoo: undefined,
};
