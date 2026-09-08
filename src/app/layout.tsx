import type { Metadata } from "next";
import { Amiri, Cormorant_Garamond, IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import LocaleShell from "@/components/LocaleShell";
import MetaPixel from "@/components/analytics/MetaPixel";
import { META_PIXEL_ID, pixelSnippet } from "@/lib/analytics/meta-pixel";
import { INDEXABLE, SITE_URL } from "@/lib/site";
import { shopifyConfigured } from "@/lib/shopify/client";
import { getGiftBox } from "@/lib/shopify/products";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
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

/* Development traffic cannot be filtered out of a pixel after the fact. */
const PIXEL_ON = process.env.NODE_ENV === "production";

export default async function RootLayout({
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
        {/*
          Who this site belongs to, in the form Google reads. It is what
          attaches the gold wordmark to the brand rather than leaving search to
          pick an image off a page, and what a knowledge panel is built from.
        */}
        <script
          type="application/ld+json"
          // The payload is our own object, not user input.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema(), websiteSchema()]),
          }}
        />

        {/* Meta Pixel.
            Rendered inline and server-side so it runs during HTML parse: the
            queue stub then exists before any component mounts, and a product
            page's ViewContent effect can never fire into a missing `fbq`.
            MetaPixel below adds PageView on client-side navigation, which the
            snippet cannot see because those do not reload the document. */}
        {PIXEL_ON ? (
          <>
            <script dangerouslySetInnerHTML={{ __html: pixelSnippet() }} />
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                alt=""
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
            <MetaPixel />
          </>
        ) : null}

        <LocaleShell
          assistant={Boolean(process.env.ANTHROPIC_API_KEY)}
          shop={shopifyConfigured()}
          /* Read here rather than in the drawer because the drawer is a client
             component and this is the only server component that wraps every
             page — the bag can be opened from any of them. Null until the
             product exists in Shopify, and the toggle then does not render. */
          giftBox={await getGiftBox()}
        >
          {children}
        </LocaleShell>
      </body>
    </html>
  );
}
