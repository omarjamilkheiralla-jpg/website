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
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks: NavLink[] = [
  { label: "About Rosica", href: "/about" },
  { label: "Collections", href: "/collections" },
  { label: "Ingredient Library", href: "/ingredients" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];
