import type { Locale, Localised } from "./i18n";

export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

/**
 * Hrefs are authored in English throughout; `localePath` prefixes them with
 * /ar at render time, so the two language trees can never point at different
 * pages by accident.
 */
const nav: Localised<NavLink[]> = {
  en: [
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
    { label: "Where to Buy", href: "/where-to-buy" },
    { label: "Contact", href: "/contact" },
  ],
  ar: [
    { label: "الرئيسية", href: "/" },
    { label: "عن روزيكا", href: "/about" },
    {
      label: "المجموعات",
      href: "/collections",
      children: [
        { label: "إسينشالز", href: "/collections/essentials" },
        { label: "بيور", href: "/collections/pure" },
      ],
    },
    { label: "المكوّنات", href: "/ingredients" },
    { label: "أين تجدنا", href: "/where-to-buy" },
    { label: "تواصل معنا", href: "/contact" },
  ],
};

export const primaryNavFor = (locale: Locale) => nav[locale];

const footer: Localised<{ heading: string; links: NavLink[] }[]> = {
  en: [
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
        { label: "Ingredient Library", href: "/ingredients" },
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
  ],
  ar: [
    {
      heading: "روزيكا",
      links: [
        { label: "عن روزيكا", href: "/about" },
        { label: "فلسفتنا", href: "/about#philosophy" },
        { label: "الاستدامة", href: "/about#promise" },
        { label: "ضمان الجودة", href: "/about#quality" },
      ],
    },
    {
      heading: "المجموعات",
      links: [
        { label: "إسينشالز", href: "/collections/essentials" },
        { label: "بيور", href: "/collections/pure" },
        { label: "جميع المنتجات", href: "/collections" },
        { label: "مكتبة المكوّنات", href: "/ingredients" },
      ],
    },
    {
      heading: "خدمة العملاء",
      links: [
        { label: "الأسئلة الشائعة", href: "/faqs" },
        { label: "تواصل معنا", href: "/contact" },
        { label: "سياسة الخصوصية", href: "/privacy" },
        { label: "الشروط والأحكام", href: "/terms" },
      ],
    },
    {
      heading: "أين تجدنا",
      links: [
        { label: "المتجر الرسمي", href: "/where-to-buy" },
        { label: "متاجر التجزئة", href: "/where-to-buy" },
        { label: "طلبات الجملة", href: "/contact" },
      ],
    },
  ],
};

export const footerColumnsFor = (locale: Locale) => footer[locale];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];
