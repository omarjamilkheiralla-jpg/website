/**
 * Image catalogue.
 *
 * `generic` entries are licensed stock photography (Pexels licence: free for
 * commercial use, no attribution required) standing in for the botanical,
 * laboratory and editorial imagery in the approved designs. They are chosen to
 * match the art direction of the real Rosica product photography: cream and
 * travertine backdrops, olive and aloe botanicals, soft directional shadows.
 *
 * `product` entries are deliberately `undefined`. Rosica product photography is
 * brand-owned and cannot be substituted or recreated, so every product slot
 * renders the botanical placeholder until the real files are in `public/images/`.
 * Fill a value in here and it appears everywhere that slot is used — no
 * component changes needed.
 */

export const generic = {
  honey: "/images/ingredient-honey.jpg",
  propolis: "/images/ingredient-propolis.jpg",
  aloeVera: "/images/ingredient-aloe-vera.jpg",
  rosemary: "/images/ingredient-rosemary.jpg",
  chamomile: "/images/botanical-chamomile.jpg",
  leaves: "/images/botanical-leaves.jpg",
  foliage: "/images/botanical-foliage.jpg",
  oliveShadow: "/images/botanical-olive-shadow.jpg",
  oliveVase: "/images/botanical-olive-vase.jpg",
  shadowWall: "/images/botanical-shadow-wall.jpg",
  labGlassware: "/images/lab-glassware.jpg",
  labFlowerTube: "/images/lab-flower-tube.jpg",
  labTestTubes: "/images/lab-test-tubes.jpg",
  hairTexture: "/images/hair-texture.jpg",
  manufacturing: "/images/manufacturing.jpg",
  journal: "/images/journal-editorial.jpg",
} as const;

/** Alt text for the stock imagery, kept beside the paths so it stays in sync. */
export const genericAlt = {
  honey: "A glass jar of honey with a wooden dipper on a pale background",
  propolis: "Bees working across a golden honeycomb",
  aloeVera: "A fresh aloe vera plant against a plain, light background",
  rosemary: "A sprig of fresh rosemary on pale marble in soft light",
  chamomile: "Chamomile flowers in bloom",
  leaves: "Fresh green leaves arranged on a pale surface",
  foliage: "Soft green botanical foliage",
  oliveShadow: "Olive branch shadows falling across a warm neutral wall",
  oliveVase: "Olive branches arranged in a vase against a pale wall",
  shadowWall: "Soft botanical shadows cast on a pale wall",
  labGlassware: "Botanical stems in laboratory glassware in soft daylight",
  labFlowerTube: "A single flower suspended in a glass test tube",
  labTestTubes: "Laboratory test tubes holding botanical cuttings",
  hairTexture: "Close-up of long, healthy brown hair",
  manufacturing: "Laboratory glassware and equipment in a clean facility",
  journal: "An open book beside a jar of flowers in warm daylight",
} as const;

/**
 * Rosica product photography.
 *
 * TO ENABLE: drop the files into `public/images/` using exactly the filenames
 * commented beside each entry, then replace `undefined` with the path string.
 * Nothing else needs to change — the heroes, collection cards and product grids
 * all read from here.
 *
 * These must be the real brand photographs. Do not substitute stock imagery or
 * generate a stand-in: the packaging, label copy and finish are specific to the
 * product and cannot be approximated.
 */
export const product: Record<string, string | undefined> = {
  /** "product-range-group.jpg" — all four bottles together, landscape.
   *  Used by the homepage, About and Collections heroes. */
  rangeGroup: undefined,

  /** "product-essentials-group.jpg" — the three Essentials bottles together. */
  essentialsGroup: undefined,

  /** "product-pure-bottle.jpg" — Botanical Restore Shampoo, styled shot. */
  pureBottle: undefined,

  /** "product-honey-propolis-repair-shampoo.jpg" */
  honeyPropolisRepairShampoo: undefined,

  /** "product-purifying-fresh-cleanse-shampoo.jpg" */
  purifyingFreshCleanseShampoo: undefined,

  /** "product-deep-repair-conditioner.jpg" */
  deepRepairConditioner: undefined,

  /** "product-botanical-restore-shampoo.jpg" — the PURE single-product feature. */
  botanicalRestoreShampoo: undefined,
};
