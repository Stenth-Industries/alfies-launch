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
 * that's all. There is deliberately no OG image; a product shot in a link
 * preview is a vaping advertisement shown to an unverified audience.
 */
export const metadata: Metadata = {
  title: {
    default: `${STORE.fullName} | ${STORE.city}, ${STORE.province}`,
    template: `%s | ${STORE.fullName}`,
  },
  description: `${STORE.fullName} is a specialty vape store in ${STORE.city}, ${STORE.province}. In-store only, ${STORE.minimumAge}+ with government-issued photo ID. Call ${STORE.phone} for hours and directions.`,
  robots: { index: true, follow: true },
  openGraph: {
    title: `${STORE.fullName} | ${STORE.city}, ${STORE.province}`,
    description: `Specialty vape store in ${STORE.city}. In-store only, ${STORE.minimumAge}+ with photo ID.`,
    type: "website",
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
