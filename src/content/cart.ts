import type { Localised } from "@/lib/i18n";

/** Every string the cart shows. Ordinary site copy, so it is translated. */
export type CartCopy = {
  title: string;
  open: string;
  close: string;
  empty: string;
  emptyCta: string;
  subtotal: string;
  /** Sits under the subtotal — shipping and tax are settled at checkout. */
  atCheckout: string;
  checkout: string;
  addToCart: string;
  adding: string;
  soldOut: string;
  increase: string;
  decrease: string;
  removeLine: string;
  /** Shown when a request to Shopify fails. */
  error: string;
  itemCount: (n: number) => string;
};

export const cartCopy: Localised<CartCopy> = {
  en: {
    title: "Your bag",
    open: "Open bag",
    close: "Close bag",
    empty: "Your bag is empty.",
    emptyCta: "Explore the collections",
    subtotal: "Subtotal",
    atCheckout: "Shipping and taxes are calculated at checkout.",
    checkout: "Checkout",
    addToCart: "Add to Bag",
    adding: "Adding…",
    soldOut: "Sold Out",
    increase: "Increase quantity",
    decrease: "Decrease quantity",
    removeLine: "Remove",
    error: "Something went wrong. Please try again.",
    itemCount: (n) => (n === 1 ? "1 item" : `${n} items`),
  },
  ar: {
    title: "حقيبتك",
    open: "افتح الحقيبة",
    close: "أغلق الحقيبة",
    empty: "حقيبتك فارغة.",
    emptyCta: "استكشف المجموعات",
    subtotal: "المجموع الفرعي",
    atCheckout: "تُحتسب رسوم الشحن والضرائب عند إتمام الطلب.",
    checkout: "إتمام الطلب",
    addToCart: "أضف إلى الحقيبة",
    adding: "جارٍ الإضافة…",
    soldOut: "نفدت الكمية",
    increase: "زيادة الكمية",
    decrease: "إنقاص الكمية",
    removeLine: "إزالة",
    error: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    itemCount: (n) => (n === 1 ? "منتج واحد" : `${n} منتجات`),
  },
};
