export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

/**
 * Collections is intentionally modelled as a nested list so future categories
 * (Skin Care, Body Care) can be added without touching the Navbar component.
 */
export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Collections",
    href: "/collections",
    children: [
      { label: "Essentials", href: "/collections/essentials" },
      { label: "PURE", href: "/collections/pure" },
    ],
  },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Journal", href: "/journal" },
  { label: "Where to Buy", href: "/where-to-buy" },
  { label: "Contact", href: "/contact" },
];

/**
 * Footer link groups, matching the column structure in the approved designs.
 * Adding a Skin Care or Body Care collection is a one-line change here.
 */
export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Rosica",
    links: [
      { label: "About Rosica", href: "/about" },
      { label: "Our Philosophy", href: "/about#philosophy" },
      { label: "Sustainability", href: "/about#promise" },
      { label: "Quality Assurance", href: "/about#quality" },
    ],
  },
  {
    heading: "Collections",
    links: [
      { label: "Essentials", href: "/collections/essentials" },
      { label: "PURE", href: "/collections/pure" },
      { label: "All Products", href: "/collections" },
    ],
  },
  {
    heading: "Knowledge",
    links: [
      { label: "Ingredient Library", href: "/ingredients" },
      { label: "Journal", href: "/journal" },
      { label: "Hair Care Guide", href: "/journal" },
    ],
  },
  {
    heading: "Customer Care",
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  {
    heading: "Where to Buy",
    links: [
      { label: "Official Store", href: "/where-to-buy" },
      { label: "Retail Partners", href: "/where-to-buy" },
      { label: "Wholesale Inquiries", href: "/contact" },
    ],
  },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];
