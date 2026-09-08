import type { Metadata, Viewport } from "next";
import { Anton, JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";
import HealthWarning from "@/components/HealthWarning";
import { STORE } from "@/data/store";

/**
 * Two faces, two jobs. Anton is the display cut — heavy, condensed, one weight
 * only — and it carries every headline, eyebrow-free and always upper case.
 * Poppins carries body copy and UI at 400/500/600; nothing on the page asks for
 * a heavier body weight, so nothing heavier is downloaded.
 *
 * The prescribed health warning is deliberately excluded from both: VPPR s. 21
 * fixes it to a standard sans serif, so `.health-warning` names Arial itself
 * and must keep doing so.
 */
const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
  display: "swap",
});

/**
 * The utility face, for machine-readable metadata only: puff counts, series
 * codes (GH20000, BC10000), flavour counts. Those are specifications, and
 * setting them in the same face as the prose was what made them read as
 * afterthoughts. It is never used for prose, headings or controls.
 */
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600"],
  display: "swap",
});

/**
 * Metadata renders in search results and social previews, which sit outside the
 * age gate entirely — a crawler and anyone reading a shared link sees it
 * without ever being asked their age. So nothing here names a brand, a product,
 * a flavour or a device: it says where the shop is and who may enter, and
 * that's all.
 *
 * The same rule governs the share image (`opengraph-image.png`): it is the shop
 * emblem, the city and the age line, and nothing else. No device, pod, flavour
 * or brand appears in it — a product shot in a link preview would be a vaping
 * advertisement shown to an unverified audience. The middleware already treats
 * the emblem as outside that category, ungating it so the age gate can render
 * its own logo.
 *
 * `metadataBase` has to be absolute or the OG image resolves against
 * localhost in every shared link. It reads from the environment first so a
 * preview deployment advertises itself rather than production.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "production"
    ? STORE.url
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : STORE.url);

const SHARE_DESCRIPTION = `Specialty vape store in ${STORE.city}, ${STORE.province}. In-store only, ${STORE.minimumAge}+ with government-issued photo ID.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${STORE.fullName} | ${STORE.city}, ${STORE.province}`,
    template: `%s | ${STORE.fullName}`,
  },
  description: `${STORE.fullName} is a specialty vape store in ${STORE.city}, ${STORE.province}. In-store only, ${STORE.minimumAge}+ with government-issued photo ID. Call ${STORE.phone} for hours and directions.`,
  applicationName: STORE.fullName,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    title: `${STORE.fullName} | ${STORE.city}, ${STORE.province}`,
    description: SHARE_DESCRIPTION,
    siteName: STORE.fullName,
    url: "/",
    locale: "en_CA",
    type: "website",
  },
  // No `images` key: Next fills og:image and twitter:image from the
  // opengraph-image.png file convention beside this file.
  twitter: {
    card: "summary_large_image",
    title: `${STORE.fullName} | ${STORE.city}, ${STORE.province}`,
    description: SHARE_DESCRIPTION,
  },
};

/** Tints the mobile browser chrome to the page ground so the two meet cleanly. */
export const viewport: Viewport = {
  themeColor: "#0c0c0c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${poppins.variable} ${jetbrains.variable}`}
    >
      <body>
        {/* First thing in the document on every route, including the age gate:
            VPPR s. 24 requires the warning at the beginning of an advertisement
            delivered by telecommunication. */}
        <HealthWarning />
        {children}
      </body>
    </html>
  );
}
