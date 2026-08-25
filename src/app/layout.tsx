import type { Metadata } from "next";
import { Anton, Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AgeGate from "@/components/AgeGate";
import { STORE } from "@/data/store";

/**
 * Three faces, three jobs.
 *
 * The wordmark is a warm brush script; nothing on the page can match it, so
 * the page contrasts with it instead — cold, printed, technical, like the
 * devices themselves. Anton is the price-board voice you see in a shop window
 * and carries the section titles. Archivo does the reading. Space Mono is
 * reserved for readouts — puff counts, hours, nicotine strength — because on
 * these devices those numbers genuinely are a digital display.
 */
const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const mono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${STORE.fullName} | ${STORE.city}, ${STORE.province}`,
    template: `%s | ${STORE.fullName}`,
  },
  description: `Your local vape store in ${STORE.city}, ${STORE.province}. Disposables, pods and e-liquids from Elfbar, STLTH, Vuse, Flavour Beast and more. 19+ only.`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${anton.variable} ${mono.variable}`}
    >
      <body>
        <AgeGate />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
