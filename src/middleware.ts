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

/**
 * Paths that belong to the platform rather than to the site.
 *
 * These must never be challenged. Vercel's own Deployment Protection
 * authenticates by bouncing the browser out to an SSO page and back through
 * /_vercel/*; if that callback is met with a 401 the two gates deadlock, the
 * browser retries the handshake until it gives up, and Chrome reports
 * ERR_TOO_MANY_RETRIES — which looks like the site is down rather than locked.
 *
 * Nothing here serves site content, so letting it past costs no privacy.
 */
const PLATFORM_PATHS = ["/_vercel", "/.well-known"];

export function middleware(request: NextRequest) {
  const expected = process.env.SITE_PASSWORD;

  // No password configured: the site is public. This is the launched state.
  if (!expected) return NextResponse.next();

  /*
    Segment-wise, not a bare prefix: startsWith("/_vercel") would also wave
    through "/_vercel-anything", which is a hole for the sake of one character.
  */
  const { pathname } = request.nextUrl;
  const isPlatform = PLATFORM_PATHS.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (isPlatform) return NextResponse.next();

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

  return new NextResponse(CHALLENGE_PAGE, {
    status: 401,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
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

/**
 * What someone sees if they dismiss the password prompt, or if something
 * fetches the site without one — a link preview, a crawler, Vercel's own
 * deployment screenshotter.
 *
 * Worth more than the single line of text it replaced. A bare "not open yet" on
 * a blank white page is indistinguishable from a broken deployment, which is
 * precisely the moment someone panics and assumes the site is down. This says
 * what happened and how to get in.
 *
 * Inline styles, no assets: every asset on this site sits behind the same gate,
 * so a stylesheet here would 401 and leave the page unstyled.
 */
const CHALLENGE_PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Rosica &mdash; private preview</title>
<style>
  :root { color-scheme: light }
  body {
    margin: 0; min-height: 100vh; display: grid; place-items: center;
    background: #faf6ee; color: #1e1e1a; padding: 2rem;
    font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
  }
  main { max-width: 26rem; text-align: center }
  .rule { display: block; width: 3.5rem; height: 1px; background: #c6a15b; margin: 0 auto 1.75rem }
  h1 {
    font-family: ui-serif, Georgia, "Times New Roman", serif;
    font-weight: 400; font-size: 2rem; line-height: 1.2; color: #3f5a44; margin: 0 0 1.25rem;
  }
  p { line-height: 1.75; color: #57564e; margin: 0 0 1rem; font-size: 0.9375rem }
  .hint { font-size: 0.8125rem }
</style>
</head>
<body>
  <main>
    <span class="rule"></span>
    <h1>Rosica is not open yet</h1>
    <p>This is a private preview. Reload the page and enter the password you were given.</p>
    <p class="hint">The browser asks for a username too &mdash; it is ignored, so type anything there.</p>
  </main>
</body>
</html>`;

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
