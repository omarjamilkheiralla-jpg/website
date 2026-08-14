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
  // Ingredient library — one photograph per botanical.
  honey: "/images/ingredient-honey.jpg",
  propolis: "/images/ingredient-propolis.jpg",
  aloeVera: "/images/ingredient-aloe-vera.jpg",
  rosemary: "/images/ingredient-rosemary.jpg",

  // Botanical still life.
  chamomile: "/images/botanical-chamomile.jpg",
  leaves: "/images/botanical-leaves.jpg",
  foliage: "/images/botanical-foliage.jpg",
  shadowWall: "/images/botanical-shadow-wall.jpg",
  vaseLinen: "/images/botanical-vase-linen.jpg",
  blossomWall: "/images/botanical-blossom-wall.jpg",
  spireaBeige: "/images/botanical-spirea-beige.jpg",

  // Laboratory and formulation.
  labGlassware: "/images/lab-glassware.jpg",
  labFlowerTube: "/images/lab-flower-tube.jpg",
  labFlaskFlower: "/images/lab-flask-flower.jpg",
  labFlatlay: "/images/lab-flatlay.jpg",
  labOverhead: "/images/lab-overhead.jpg",

  // Ritual and editorial.
  soapLinen: "/images/spa-soap-linen.jpg",
  hairTexture: "/images/hair-texture.jpg",
  hairWaves: "/images/hair-waves.jpg",
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
  shadowWall: "Soft botanical shadows cast across a warm cream wall",
  vaseLinen: "A slender flowering branch in a pale ceramic vase on draped linen",
  blossomWall: "A branch of white blossom in front of a warm cream wall",
  spireaBeige: "White spirea flowers in bloom against a soft beige wall",

  labGlassware: "Botanical stems in laboratory glassware in soft daylight",
  labFlowerTube: "A single flower suspended in a glass test tube",
  labFlaskFlower: "A white bloom standing inside a tall graduated glass cylinder",
  labFlatlay:
    "Pale blossoms, a round glass flask and petri dishes arranged on a white surface",
  labOverhead: "Clean laboratory glassware and petri dishes seen from above",

  soapLinen: "Amber botanical soap bars laid out on white linen with dried grasses",
  hairTexture: "Close-up of long, healthy brown hair",
  hairWaves:
    "Long, glossy waves seen from behind against a warm neutral wall",
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
  /** Range shot with its backdrop extended sideways, framed for the hero band. */
  rangeGroupHero: "/images/product-range-group-hero.jpg",
  /**
   * The RTL heroes are separate files, not a CSS flip: mirroring the photograph
   * would mirror the label text with it. The backdrop is extended to the right
   * instead of the left so the bottles sit opposite the Arabic copy.
   */
  rangeGroupHeroRtl: "/images/product-range-group-hero-rtl.jpg",
  /** The three Essentials bottles — cropped from the range shot. */
  essentialsGroup: "/images/product-essentials-group.jpg",
  /** Essentials group with the backdrop extended for the wide hero band. */
  essentialsGroupHero: "/images/product-essentials-group-hero.jpg",
  essentialsGroupHeroRtl: "/images/product-essentials-group-hero-rtl.jpg",
  /** Essentials group in a tall frame, for the Collections side panel. */
  essentialsGroupPanel: "/images/product-essentials-group-panel.jpg",
  /** Botanical Restore Shampoo styled with olive and aloe. */
  pureBottle: "/images/product-botanical-restore-shampoo.jpg",
  /** The same shot, backdrop extended for the wide hero band. */
  pureBottleHero: "/images/product-pure-bottle-hero.jpg",
  pureBottleHeroRtl: "/images/product-pure-bottle-hero-rtl.jpg",
  /** The same shot in a tall frame, for the Collections side panel. */
  pureBottlePanel: "/images/product-pure-bottle-panel.jpg",
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
  essentialsGroupHero:
    "The three Rosica Essentials products on travertine with rosemary and blossom",
  essentialsGroupPanel:
    "The three Rosica Essentials products on travertine with rosemary and blossom",
  pureBottle:
    "Rosica Pure Botanical Restore Shampoo on travertine with olive branches and aloe vera",
  pureBottleHero:
    "Rosica Pure Botanical Restore Shampoo on travertine with olive branches and aloe vera",
  pureBottlePanel:
    "Rosica Pure Botanical Restore Shampoo on travertine with olive branches and aloe vera",
  honeyPropolisRepairShampoo:
    "Rosica Essentials Honey & Propolis Repair Shampoo with yellow blossom and green leaves",
  purifyingFreshCleanseShampoo:
    "Rosica Essentials Purifying & Fresh Cleanse Shampoo with aloe vera, rosemary and a honey dipper",
  deepRepairConditioner:
    "Rosica Essentials Deep Repair Conditioner with dried blooms and olive branches",
  botanicalRestoreShampoo:
    "Rosica PURE Botanical Restore Shampoo on travertine with olive branches and aloe vera",
} as const;
