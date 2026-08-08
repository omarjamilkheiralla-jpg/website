/**
 * Image catalogue.
 *
 * `generic` entries are licensed stock photography (Pexels licence: free for
 * commercial use, no attribution required) standing in for the botanical,
 * laboratory and editorial imagery in the approved designs. They are chosen to
 * match the art direction of the real Rosica product photography: cream and
 * travertine backdrops, olive and aloe botanicals, soft directional shadows.
 *
 * `product` entries are the real Rosica photographs. They are brand-owned and
 * must never be substituted or recreated.
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
  propolis: "A golden honeycomb filled with honey, seen close up",
  aloeVera: "Close-up of aloe vera leaves against a plain white background",
  rosemary: "A sprig of fresh rosemary on pale marble in soft light",
  chamomile: "Chamomile flowers in bloom",
  leaves: "A single green palm leaf resting on soft beige fabric",
  foliage: "A green leaf branch resting on a pale linen surface",
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
 * Rosica product photography — the real brand shots, resized from the supplied
 * masters (up to 11796px square) down to web sizes.
 *
 * Never substitute stock imagery or a generated stand-in here: the packaging,
 * label copy and finish are specific to the product.
 */
export const product = {
  /** All four bottles. Homepage, About and Collections heroes. */
  rangeGroup: "/images/product-range-group.jpg",
  /** Range shot with its backdrop extended upward, framed for the tall hero panel. */
  rangeGroupHero: "/images/product-range-group-hero.jpg",
  /** The three Essentials bottles — cropped from the range shot. */
  essentialsGroup: "/images/product-essentials-group.jpg",
  /** Botanical Restore Shampoo styled with olive and aloe — the PURE hero. */
  pureBottle: "/images/product-botanical-restore-shampoo.jpg",
  honeyPropolisRepairShampoo: "/images/product-honey-propolis-repair-shampoo.jpg",
  purifyingFreshCleanseShampoo: "/images/product-purifying-fresh-cleanse-shampoo.jpg",
  deepRepairConditioner: "/images/product-deep-repair-conditioner.jpg",
  botanicalRestoreShampoo: "/images/product-botanical-restore-shampoo.jpg",
} as const;

/** Alt text for the product photography. */
export const productAlt = {
  rangeGroup:
    "The four Rosica products on travertine with rosemary, olive leaves and blossom",
  rangeGroupHero:
    "The four Rosica products on travertine with rosemary, olive leaves and blossom",
  essentialsGroup:
    "The three Rosica Essentials products on travertine with rosemary and blossom",
  pureBottle:
    "Rosica PURE Botanical Restore Shampoo on travertine with olive branches and aloe vera",
  honeyPropolisRepairShampoo:
    "Rosica Essentials Honey & Propolis Repair Shampoo with yellow blossom and green leaves",
  purifyingFreshCleanseShampoo:
    "Rosica Essentials Purifying & Fresh Cleanse Shampoo with aloe vera, rosemary and a honey dipper",
  deepRepairConditioner:
    "Rosica Essentials Deep Repair Conditioner with dried blooms and olive branches",
  botanicalRestoreShampoo:
    "Rosica PURE Botanical Restore Shampoo on travertine with olive branches and aloe vera",
} as const;
