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
  /** Resolves true when Shopify accepted the line — analytics needs to know
      the difference between a click and an actual add. */
  add: (variantId: string, quantity?: number) => Promise<boolean>;
  setQuantity: (lineId: string, quantity: number) => Promise<void>;
  remove: (lineId: string) => Promise<void>;
  /**
   * The last successful add, for the confirmation.
   *
   * `seq` increments on every add so adding the same bottle twice is two
   * separate announcements rather than one unchanged object the toast cannot
   * tell apart.
   */
  added: { seq: number; title: string } | null;
  clearAdded: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type Response = { ok: boolean; cart?: Cart | null; expired?: boolean };

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState<{ seq: number; title: string } | null>(null);
  const cartId = useRef<string | null>(null);

  const clearAdded = useCallback(() => setAdded(null), []);

  /**
   * Reads the id, sends the action, and folds the response back into state.
   *
   * Returns the cart itself rather than a boolean: `add` needs the line it
   * just created to name it in the confirmation, and state set here is not
   * readable until the next render.
   */
  const send = useCallback(async (body: Record<string, unknown>): Promise<Cart | null> => {
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
        return null;
      }

      const data = (await response.json()) as Response;

      if (data.expired || (data.ok && data.cart === null)) {
        cartId.current = null;
        window.localStorage.removeItem(STORAGE_KEY);
        setCart(null);
        return null;
      }

      if (!data.ok || !data.cart) {
        setError(true);
        return null;
      }

      cartId.current = data.cart.id;
      window.localStorage.setItem(STORAGE_KEY, data.cart.id);
      setCart(data.cart);
      return data.cart;
    } catch {
      setError(true);
      return null;
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

  /*
    Adding confirms; it does not interrupt.

    This used to throw the drawer open on every add, which took the page away
    from someone who was still shopping and, on a phone, covered it entirely.
    The confirmation says the same thing without moving anyone, and the bag
    button appears in the navbar the moment the bag stops being empty, so the
    way through to checkout is still one tap.
  */
  const add = useCallback(
    async (variantId: string, quantity = 1) => {
      const next = await send({ action: "add", variantId, quantity });
      if (!next) return false;

      const line = next.lines.find((candidate) => candidate.variantId === variantId);
      setAdded((previous) => ({
        seq: (previous?.seq ?? 0) + 1,
        title: line?.productTitle ?? "",
      }));
      return true;
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
    () => ({ cart, status, error, open, setOpen, add, setQuantity, remove, added, clearAdded }),
    [cart, status, error, open, add, setQuantity, remove, added, clearAdded],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Null outside a provider, so a component can render without a cart present. */
export function useCart() {
  return useContext(CartContext);
}
