import { NextResponse, type NextRequest } from "next/server";

/**
 * Private preview gate.
 *
 * While SITE_PASSWORD is set, every request to the site — pages, images, the
 * chat route, everything — must carry the password before anything is served.
 * Remove the variable and redeploy to open the site to the world; there is no
 * second switch to remember.
 *
 * This is deliberately built into the app rather than bought from the host:
 * Vercel's own password protection is a paid plan feature, and the free
 * alternative only admits people who have been added to the Vercel account,
 * which is no good for showing a colleague or a client.
 *
 * HTTP Basic rather than a login page, because it needs no cookie, no session
 * store and no second route, and every browser and phone already knows how to
 * render it. The username is ignored — only the password is checked — so
 * whoever you share it with can type anything in the first box.
 *
 * Worth being clear about what this is: a gate that keeps a work in progress
 * out of public view. It is not protecting anything secret, and Basic auth over
 * HTTPS is exactly the right weight for that job.
 */

/**
 * Compares in constant time. The Edge runtime has no timingSafeEqual, so this
 * is done by hand: every byte is examined whatever happens, and the lengths are
 * folded into the result rather than being allowed to return early.
 */
function matches(candidate: string, expected: string): boolean {
  const a = new TextEncoder().encode(candidate);
  const b = new TextEncoder().encode(expected);
  let difference = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
    difference |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return difference === 0;
}

export function middleware(request: NextRequest) {
  const expected = process.env.SITE_PASSWORD;

  // No password configured: the site is public. This is the launched state.
  if (!expected) return NextResponse.next();

  const header = request.headers.get("authorization");

  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      // Everything after the first colon, so a password may contain colons.
      const password = decoded.slice(decoded.indexOf(":") + 1);
      if (matches(password, expected)) return NextResponse.next();
    } catch {
      // Malformed base64 — fall through and ask again.
    }
  }

  return new NextResponse("This site is not open yet.", {
    status: 401,
    headers: {
      /*
        ASCII only. Header values are ByteStrings, so the em dash this realm
        used to contain threw at construction and turned the whole gate into a
        500 — which fails open-ish and looks like a broken site rather than a
        locked one.
      */
      "WWW-Authenticate": 'Basic realm="Rosica private preview", charset="UTF-8"',
      // Never let a proxy or the browser keep a page served behind the gate.
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  /*
    Every path, with nothing carved out — static assets and the API included. A
    gate that lets the photography through is not a gate: the product shots are
    precisely what should not be public before launch. Browsers resend Basic
    credentials to the same origin automatically, so once the first page is
    unlocked its scripts and images follow without a second prompt.
  */
  matcher: "/:path*",
};
