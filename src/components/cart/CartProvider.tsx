"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Cart } from "@/lib/shopify/types";

/**
 * Cart state.
 *
 * Shopify is the single source of truth: every mutation returns the whole cart
 * and we replace state with it, rather than keeping a local copy in step. That
 * makes the drawer a little less snappy than optimistic updates would, and in
 * exchange the number in the drawer is always the number Shopify will charge —
 * which is the trade to make when the subject is money.
 *
 * Only the cart *id* is stored locally; the contents are always refetched. A
 * stale line total sitting in localStorage is exactly the kind of thing that
 * shows one price and charges another.
 */

const STORAGE_KEY = "rosica.cart";

type Status = "idle" | "busy";

type CartContextValue = {
  cart: Cart | null;
  status: Status;
  /** Set when the last action failed, so the drawer can say so. */
  error: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (variantId: string, quantity?: number) => Promise<void>;
  setQuantity: (lineId: string, quantity: number) => Promise<void>;
  remove: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

type Response = { ok: boolean; cart?: Cart | null; expired?: boolean };

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const cartId = useRef<string | null>(null);

  /** Reads the id, sends the action, and folds the response back into state. */
  const send = useCallback(async (body: Record<string, unknown>): Promise<boolean> => {
    setStatus("busy");
    setError(false);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, cartId: cartId.current ?? undefined }),
      });

      // 503 is "no store configured" — not an error worth showing anyone.
      if (response.status === 503) {
        setCart(null);
        return false;
      }

      const data = (await response.json()) as Response;

      if (data.expired || (data.ok && data.cart === null)) {
        cartId.current = null;
        window.localStorage.removeItem(STORAGE_KEY);
        setCart(null);
        return false;
      }

      if (!data.ok || !data.cart) {
        setError(true);
        return false;
      }

      cartId.current = data.cart.id;
      window.localStorage.setItem(STORAGE_KEY, data.cart.id);
      setCart(data.cart);
      return true;
    } catch {
      setError(true);
      return false;
    } finally {
      setStatus("idle");
    }
  }, []);

  /*
    Rehydrate on load.

    Deliberately not routed through `send`: that marks the cart busy before it
    awaits anything, and a synchronous setState on mount both trips the
    compiler's cascading-render rule and flashes every quantity control
    disabled for the length of a network round trip. Here nothing touches state
    until the response is in hand.

    Failure is silent. An unrecoverable cart is an empty one, which is a
    perfectly good state to start from.
  */
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    cartId.current = stored;

    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "get", cartId: stored }),
        });
        if (cancelled || !response.ok) return;

        const data = (await response.json()) as Response;
        if (cancelled) return;

        if (data.ok && data.cart) {
          setCart(data.cart);
        } else {
          // Shopify has forgotten it — completed, or simply too old.
          cartId.current = null;
          window.localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        // Offline on first paint. The bag stays empty; nothing to tell anyone.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const add = useCallback(
    async (variantId: string, quantity = 1) => {
      const ok = await send({ action: "add", variantId, quantity });
      if (ok) setOpen(true);
    },
    [send],
  );

  const setQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      // Shopify treats zero as a removal, which is what the minus button at one
      // should do anyway.
      await send({ action: "update", lineId, quantity });
    },
    [send],
  );

  const remove = useCallback(
    async (lineId: string) => {
      await send({ action: "remove", lineId });
    },
    [send],
  );

  const value = useMemo(
    () => ({ cart, status, error, open, setOpen, add, setQuantity, remove }),
    [cart, status, error, open, add, setQuantity, remove],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Null outside a provider, so a component can render without a cart present. */
export function useCart() {
  return useContext(CartContext);
}
