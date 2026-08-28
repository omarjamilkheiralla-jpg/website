"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { META_PIXEL_ID, trackPageView } from "@/lib/analytics/meta-pixel";

/**
 * The Meta Pixel, wired for the App Router.
 *
 * The part that catches people out: pasting the standard snippet into the
 * layout gives you exactly one PageView, ever. App Router navigations are
 * client-side — no document load, no re-execution of the snippet — so a
 * shopper going home -> shop -> product looks to Meta like a single page view
 * on a site with a 100% bounce rate. The route change has to be handled
 * explicitly, and it has to be handled in a Client Component, because the
 * layout itself is a Server Component and never runs in the browser.
 *
 * So the work is split:
 *
 *   - the snippet initialises the pixel and fires the FIRST PageView, which is
 *     the one that happens on a real document load;
 *   - the effect below fires every SUBSEQUENT PageView, on pathname change.
 *
 * The `first` ref is what keeps those from overlapping. The effect runs on
 * mount too, and firing there as well would double-count every entry to the
 * site — so the first run is skipped, because the snippet has already covered
 * it. Getting this wrong in either direction is invisible in the code and
 * obvious in Events Manager, which is why it is spelled out here.
 *
 * `usePathname` alone, deliberately: `useSearchParams` would opt every page
 * out of static rendering, and no page on this site varies by query string.
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      // The inline snippet already sent the PageView for this load.
      first.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);

  // Keep development traffic out of the pixel; it cannot be filtered out later.
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
        `}
      </Script>
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
    </>
  );
}
