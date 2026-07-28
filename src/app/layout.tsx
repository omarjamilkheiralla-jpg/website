import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        {/* Reveal animations start at opacity 0; without JS they must stay visible. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
