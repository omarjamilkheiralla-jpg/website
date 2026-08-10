import type { Metadata } from "next";
import { Amiri, Cormorant_Garamond, IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import LocaleShell from "@/components/LocaleShell";
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
  metadataBase: new URL("https://rosica.com"),
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
  // The site is a private work in progress behind Vercel's deployment
  // protection. noindex is belt-and-braces: if protection is ever lifted, search
  // engines still will not list it. REMOVE THIS BLOCK AT LAUNCH.
  robots: { index: false, follow: false, nocache: true },
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
            whether the assistant's launcher is rendered at all, and the value
            itself never leaves this process. */}
        <LocaleShell assistant={Boolean(process.env.ANTHROPIC_API_KEY)}>
          {children}
        </LocaleShell>
      </body>
    </html>
  );
}
