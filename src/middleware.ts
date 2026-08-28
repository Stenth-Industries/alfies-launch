import { NextResponse, type NextRequest } from "next/server";
import { AGE_COOKIE, AGE_GATE_PATH } from "@/lib/age-gate";

/**
 * Assets an unverified visitor is allowed to load, because the gate page
 * itself renders them. The wordmark of the shop is not a vaping product.
 */
const UNGATED_ASSETS = ["/logo-gold.png", "/logo-light.png", "/logo.png"];

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

  // Optimised images: allow through only the handful the gate itself needs.
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
