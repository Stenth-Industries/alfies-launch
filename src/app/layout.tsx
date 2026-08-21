import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AgeGate from "@/components/AgeGate";
import { STORE } from "@/data/store";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800", "900"],
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
    <html lang="en" className={archivo.variable}>
      <body>
        <AgeGate />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
