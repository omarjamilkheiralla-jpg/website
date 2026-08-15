import { NextResponse } from "next/server";
import { shopifyConfigured, storefront } from "@/lib/shopify/client";
import {
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_REMOVE,
  CART_LINES_UPDATE,
  CART_QUERY,
} from "@/lib/shopify/queries";
import { toCart, type RawCart } from "@/lib/shopify/types";

/**
 * The cart.
 *
 * Every mutation goes through here rather than straight from the browser to
 * Shopify. The Storefront token is safe to expose, so this is not a secrecy
 * measure — it is so the token can be rotated without shipping a new bundle,
 * so Shopify's errors are normalised into one shape the drawer can render, and
 * so the payload is validated before it reaches the store.
 *
 * Unconfigured returns 503 with `reason: "unconfigured"`, matching /api/chat.
 * The cart UI hides itself and the Buy buttons fall back to plain store links,
 * so the site works exactly as it did before the store existed.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** A whole cart of one product is 99 bottles more than anyone needs. */
const MAX_QUANTITY = 24;
/** Shopify ids are opaque, but they are always gid:// and never enormous. */
const isGid = (value: unknown): value is string =>
  typeof value === "string" && value.startsWith("gid://shopify/") && value.length < 300;
/** Cart ids carry a ?key= suffix, so they are checked separately. */
const isCartId = (value: unknown): value is string =>
  typeof value === "string" && value.startsWith("gid://shopify/Cart/") && value.length < 300;

const quantityOf = (value: unknown) => {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n)) return null;
  return Math.min(Math.max(n, 0), MAX_QUANTITY);
};

type Action =
  | { action: "get"; cartId: string }
  | { action: "add"; cartId?: string; variantId: string; quantity: number }
  | { action: "update"; cartId: string; lineId: string; quantity: number }
  | { action: "remove"; cartId: string; lineId: string };

function parse(body: unknown): Action | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;

  switch (b.action) {
    case "get":
      return isCartId(b.cartId) ? { action: "get", cartId: b.cartId } : null;

    case "add": {
      const quantity = quantityOf(b.quantity ?? 1);
      if (!isGid(b.variantId) || quantity === null || quantity < 1) return null;
      if (b.cartId !== undefined && !isCartId(b.cartId)) return null;
      return { action: "add", cartId: b.cartId as string | undefined, variantId: b.variantId, quantity };
    }

    case "update": {
      const quantity = quantityOf(b.quantity);
      if (!isCartId(b.cartId) || !isGid(b.lineId) || quantity === null) return null;
      return { action: "update", cartId: b.cartId, lineId: b.lineId, quantity };
    }

    case "remove":
      if (!isCartId(b.cartId) || !isGid(b.lineId)) return null;
      return { action: "remove", cartId: b.cartId, lineId: b.lineId };

    default:
      return null;
  }
}

/** Every mutation returns `{ <field>: { cart, userErrors } }`. */
type MutationResponse = Record<string, { cart: RawCart | null; userErrors: { message: string }[] }>;

async function run(action: Action) {
  switch (action.action) {
    case "get": {
      const data = await storefront<{ cart: RawCart | null }>(
        CART_QUERY,
        { id: action.cartId },
        0,
      );
      // A cart that has been completed or expired comes back null, not an error.
      return { cart: data?.cart ?? null, errors: [] as string[], missing: !data?.cart };
    }

    case "add": {
      const lines = [{ merchandiseId: action.variantId, quantity: action.quantity }];
      const data = action.cartId
        ? await storefront<MutationResponse>(CART_LINES_ADD, { cartId: action.cartId, lines }, 0)
        : await storefront<MutationResponse>(CART_CREATE, { lines }, 0);
      const payload = data?.[action.cartId ? "cartLinesAdd" : "cartCreate"];
      return {
        cart: payload?.cart ?? null,
        errors: payload?.userErrors.map((e) => e.message) ?? [],
        missing: false,
      };
    }

    case "update": {
      // Zero is Shopify's own way of saying "remove this line".
      const data = await storefront<MutationResponse>(
        CART_LINES_UPDATE,
        { cartId: action.cartId, lines: [{ id: action.lineId, quantity: action.quantity }] },
        0,
      );
      const payload = data?.cartLinesUpdate;
      return {
        cart: payload?.cart ?? null,
        errors: payload?.userErrors.map((e) => e.message) ?? [],
        missing: false,
      };
    }

    case "remove": {
      const data = await storefront<MutationResponse>(
        CART_LINES_REMOVE,
        { cartId: action.cartId, lineIds: [action.lineId] },
        0,
      );
      const payload = data?.cartLinesRemove;
      return {
        cart: payload?.cart ?? null,
        errors: payload?.userErrors.map((e) => e.message) ?? [],
        missing: false,
      };
    }
  }
}

export async function POST(request: Request) {
  if (!shopifyConfigured()) {
    return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }

  const action = parse(body);
  if (!action) {
    return NextResponse.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }

  const result = await run(action);

  // A cart the browser remembers but Shopify has forgotten: tell the client to
  // drop its stored id and start over, rather than looping on a dead cart.
  if (result.missing) {
    return NextResponse.json({ ok: true, cart: null, expired: true });
  }

  if (!result.cart) {
    return NextResponse.json(
      { ok: false, reason: "upstream", messages: result.errors },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, cart: toCart(result.cart) });
}
