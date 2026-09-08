import { NextResponse, type NextRequest } from "next/server";
import { AGE_COOKIE, AGE_GATE_PATH } from "@/lib/age-gate";

/**
 * Assets an unverified visitor is allowed to load, because the gate page
 * itself renders them, or because a browser tab and a link preview ask for
 * them before anyone has been through the gate. The emblem of the shop is not
 * a vaping product, and neither the icons nor the share card show one.
 *
 * The icon and opengraph-image entries are Next file-convention routes, not
 * files in /public, but they are fetched by pathname just the same — by the
 * browser for the tab icon, and by a link unfurler that will never present a
 * cookie. Without them here both fall through to the catch-all rewrite and
 * return the gate's HTML with a 200, so the tab shows no icon and every shared
 * link previews with no image.
 *
 * These are matched against the raw pathname, not just `/_next/image`'s `url`
 * param: images are served unoptimised (see next.config.mjs), so the browser
 * asks for the file directly and the optimiser branch below never runs for
 * them. Without the raw check the gate's own logo falls through to the
 * catch-all rewrite and the <img> receives an HTML document.
 */
const UNGATED_ASSETS = [
  "/logo-gold.png",
  "/logo-light.png",
  "/logo.png",
  "/icon.png",
  "/apple-icon.png",
  "/opengraph-image.png",
];

/**
 * Product imagery in /public, which stays behind the gate. Page routes are not
 * listed here — /products is a page and must render the gate, not a 404.
 */
const GATED_ASSET_PREFIXES = [
  "/covers/",
  "/renders/",
  "/brands/",
  "/hero.png",
  "/home-page.png",
];

/**
 * Age gate, enforced before any product markup is generated.
 *
 * A *rewrite* rather than a redirect: the visitor keeps the URL they asked for,
 * so the gate can send them straight on to it once they confirm, and the
 * response body for that URL is the gate rather than the catalogue. Nothing
 * about the products reaches an unverified client — not in the HTML, not in the
 * RSC payload, not to a crawler with JavaScript disabled, and not by guessing
 * an image URL.
 */
export function middleware(req: NextRequest) {
  if (req.cookies.get(AGE_COOKIE)?.value === "1") return NextResponse.next();

  const { pathname, searchParams } = req.nextUrl;

  // The gate's own artwork, requested directly because images are unoptimised.
  if (UNGATED_ASSETS.includes(pathname)) return NextResponse.next();

  // Optimised images: allow through only the handful the gate itself needs.
  // Unreachable while images.unoptimized is set, kept so flipping that back on
  // does not silently reopen /_next/image as a back door to the renders.
  if (pathname === "/_next/image") {
    const target = searchParams.get("url") ?? "";
    return UNGATED_ASSETS.includes(target)
      ? NextResponse.next()
      : new NextResponse(null, { status: 404 });
  }

  // Raw asset requests get a 404 rather than a page — rewriting an <img> to
  // an HTML document would "succeed" with a broken image and muddy the logs.
  if (GATED_ASSET_PREFIXES.some((p) => pathname.startsWith(p))) {
    return new NextResponse(null, { status: 404 });
  }

  const url = req.nextUrl.clone();
  url.pathname = AGE_GATE_PATH;
  url.searchParams.set("next", pathname + (searchParams.size ? `?${searchParams}` : ""));
  return NextResponse.rewrite(url);
}

export const config = {
  /**
   * Next's build output and the gate route are excluded outright; /_next/image
   * is deliberately *not*, because it is a back door to the product renders.
   */
  matcher: [
    "/((?!_next/static|_next/webpack-hmr|age-check|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
