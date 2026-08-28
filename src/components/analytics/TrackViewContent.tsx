"use client";

import { useEffect, useRef } from "react";
import { trackViewContent } from "@/lib/analytics/meta-pixel";

/**
 * Fires ViewContent once, for a product page.
 *
 * Rendered by ProductView, which is a Server Component and so cannot touch
 * `fbq` itself. The props are resolved on the server from the same Storefront
 * query that supplies the price, so the id and the value always describe the
 * same variant at the same moment.
 *
 * The ref guards against sending twice. React may run an effect more than once
 * for the same mount, and a duplicated ViewContent is a real inaccuracy in
 * Events Manager rather than a harmless retry.
 */
export default function TrackViewContent({
  contentId,
  value,
  currency,
}: {
  contentId: string;
  value: number;
  currency: string;
}) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackViewContent({ contentIds: [contentId], value, currency });
  }, [contentId, value, currency]);

  return null;
}
