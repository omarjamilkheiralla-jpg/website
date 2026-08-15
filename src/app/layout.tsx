import type { Metadata } from "next";
import { Amiri, Cormorant_Garamond, IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import LocaleShell from "@/components/LocaleShell";
import { INDEXABLE, SITE_URL } from "@/lib/site";
import { shopifyConfigured } from "@/lib/shopify/client";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/*
  Arabic counterparts. Cormorant and Inter carry no Arabic glyphs, so without
  these the RTL pages fall back to whatever the OS offers and the script comes
  out uneven. Amiri is a Naskh revival that sits beside Cormorant's classical
  proportions; IBM Plex Sans Arabic is the body face.
*/
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rosica | Premium Natural Beauty",
    template: "%s | Rosica",
  },
  description:
    "Rosica is a premium natural beauty brand combining carefully selected botanical ingredients with modern cosmetic science for effective, elegant everyday care.",
  keywords: [
    "Rosica",
    "premium natural beauty",
    "botanical hair care",
    "natural cosmetics",
    "botanical ingredients",
  ],
  // Driven by ALLOW_INDEXING — see src/lib/site.ts for why it is off by default
  // and what has to be true before turning it on.
  robots: INDEXABLE ? undefined : { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    siteName: "Rosica",
    title: "Rosica | Premium Natural Beauty",
    description:
      "Beauty inspired by nature. Premium botanical formulations refined through modern cosmetic science.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${amiri.variable} ${plexArabic.variable}`}
    >
      <body>
        {/* Reveal animations start at opacity 0; without JS they must stay visible. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {/* Picks the locale off the route and sets dir/lang around the chrome.
            The key is read here, on the server, purely as a yes/no: it decides
            whether the assistant offers a text box as well as its prepared
            questions. The value itself never leaves this process.

            Note this is read at BUILD time — these pages are prerendered, so
            the answer is baked into the HTML. Adding the key to the hosting
            environment therefore needs a redeploy before it takes effect. That
            is deliberate rather than unfortunate: the alternative is either
            making every page dynamic, or a probe request on every page load.
            The failure is soft — without the flag the assistant still answers
            its prepared questions, it just doesn't invite free typing. */}
        <LocaleShell
          assistant={Boolean(process.env.ANTHROPIC_API_KEY)}
          shop={shopifyConfigured()}
        >
          {children}
        </LocaleShell>
      </body>
    </html>
  );
}
