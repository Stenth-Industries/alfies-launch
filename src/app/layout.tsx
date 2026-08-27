import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import HealthWarning from "@/components/HealthWarning";
import { STORE } from "@/data/store";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800", "900"],
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable}>
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
